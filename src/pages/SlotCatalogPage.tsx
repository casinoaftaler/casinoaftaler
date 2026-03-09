import { useParams, Link } from "react-router-dom";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { SITE_URL, buildArticleSchema, JONAS_SAME_AS } from "@/lib/seo";
import { slugifySlotName } from "@/lib/slugify";
import { PROVIDER_DISPLAY_NAMES } from "@/lib/slotProviderLinks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Gamepad2, ArrowLeft, BarChart3, Zap, Trophy, Hash, HelpCircle, Layers, Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CasinoCardDisclaimer } from "@/components/CasinoCardDisclaimer";
import type { ReactNode } from "react";

/** Reverse lookup: display name → provider slug */
const PROVIDER_NAME_TO_SLUG: Record<string, string> = {};
for (const [slug, name] of Object.entries(PROVIDER_DISPLAY_NAMES)) {
  PROVIDER_NAME_TO_SLUG[name] = slug;
}

/** Known guide slugs that have dedicated /casinospil/spillemaskiner/:slug pages */
const GUIDE_SLUGS = new Set([
  "sweet-bonanza", "gates-of-olympus", "the-dog-house", "wild-west-gold",
  "sugar-rush", "madame-destiny-megaways", "buffalo-king", "big-bass-bonanza",
  "wolf-gold", "starburst", "gonzos-quest", "dead-or-alive-2", "divine-fortune",
  "book-of-dead", "legacy-of-dead", "reactoonz", "fire-joker", "eye-of-horus",
  "joker-strike", "immortal-romance", "mega-moolah", "thunderstruck-ii",
  "bonanza", "extra-chilli-megaways", "chaos-crew", "wanted-dead-or-a-wild",
  "razor-shark", "jammin-jars", "money-train-3", "cleopatra",
]);

// ─── Hash-based variant selection ──────────────────────────

/** Simple deterministic hash from string → integer */
function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Pick a variant index from an array based on slot name hash */
function pickVariant<T>(variants: T[], slotName: string, salt = 0): T {
  return variants[(hashStr(slotName) + salt) % variants.length];
}

// ─── Data hooks ────────────────────────────────────────────

function useSlotBySlug(slug: string) {
  return useQuery({
    queryKey: ["slot-catalog-slug", slug],
    queryFn: async () => {
      // O(1) lookup via indexed slug column
      const { data, error } = await supabase
        .from("slot_catalog")
        .select("*")
        .eq("slug", slug)
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 300000,
  });
}

function useSlotBonusHuntData(slotName: string | null) {
  return useQuery({
    queryKey: ["slot-hunt-data", slotName],
    queryFn: async () => {
      if (!slotName) return null;
      const { data, error } = await supabase
        .from("bonus_hunt_archives")
        .select("hunt_number, vod_date, api_data")
        .order("hunt_number", { ascending: false })
        .limit(500);
      if (error) throw error;

      const appearances: { huntNumber: number; date: string | null }[] = [];
      for (const hunt of data || []) {
        const apiData = hunt.api_data as any;
        const slots = apiData?.data || apiData?.slots || [];
        if (Array.isArray(slots)) {
          const found = slots.some(
            (s: any) => s.name?.toLowerCase() === slotName.toLowerCase()
          );
          if (found) {
            appearances.push({ huntNumber: hunt.hunt_number, date: hunt.vod_date });
          }
        }
      }
      return appearances.slice(0, 10);
    },
    enabled: !!slotName,
    staleTime: 300000,
  });
}

function useSimilarSlots(provider: string | null, currentName: string | null, volatility: string | null) {
  return useQuery({
    queryKey: ["similar-slots", provider, currentName],
    queryFn: async () => {
      if (!provider || provider === "Unknown" || provider === "Custom Slot") return [];
      const { data, error } = await supabase
        .from("slot_catalog")
        .select("slot_name, rtp, volatility, bonus_count, highest_x, slug")
        .eq("provider", provider)
        .order("bonus_count", { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data || [])
        .filter((s) => s.slot_name !== currentName)
        .sort((a, b) => {
          const aMatch = a.volatility === volatility ? 1 : 0;
          const bMatch = b.volatility === volatility ? 1 : 0;
          if (aMatch !== bMatch) return bMatch - aMatch;
          return (b.bonus_count || 0) - (a.bonus_count || 0);
        })
        .slice(0, 8);
    },
    enabled: !!provider && !!currentName,
    staleTime: 300000,
  });
}

function useCasinosForSlot(provider: string | null) {
  return useQuery({
    queryKey: ["casinos-for-slot", provider],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casinos_public")
        .select("*")
        .eq("is_active", true)
        .order("position", { ascending: true });
      if (error) throw error;
      if (!data) return [];

      // Match casinos whose game_providers array contains this provider
      const matched = data.filter((casino: any) => {
        if (!provider || provider === "Unknown" || provider === "Custom Slot") return false;
        const providers = casino.game_providers as any[];
        if (!Array.isArray(providers)) return false;
        return providers.some((gp: any) => {
          const name = typeof gp === "string" ? gp : gp?.name;
          return name?.toLowerCase() === provider.toLowerCase();
        });
      });

      // If no match on provider, show top recommended casinos
      if (matched.length === 0) {
        return data
          .filter((c: any) => c.is_recommended)
          .slice(0, 5);
      }
      return matched.slice(0, 6);
    },
    enabled: true,
    staleTime: 3600000, // 1 hour
  });
}

// ─── H2 Variant Pools ─────────────────────────────────────

const H2_RTP = (name: string, slotName: string) => pickVariant([
  `RTP & Matematik: ${name}`,
  `Tilbagebetalingsprocent og House Edge for ${name}`,
  `${name} – Matematisk Analyse af RTP`,
  `Statistisk Gennemgang: RTP på ${name}`,
  `Hvad er RTP'en på ${name}? Komplet Analyse`,
], slotName, 0);

const H2_VOL = (name: string, slotName: string) => pickVariant([
  `Volatilitet & Risikoanalyse for ${name}`,
  `${name}: Risikovurdering og Variansanalyse`,
  `Hvor Volatil er ${name}? Dybdegående Gennemgang`,
  `Gevinstfordeling og Risikoprofil: ${name}`,
], slotName, 1);

const H2_BH = (name: string, slotName: string) => pickVariant([
  `Bonus Hunt Performance: ${name}`,
  `${name} i Bonus Hunts – Resultater og Data`,
  `Live-testede Resultater for ${name}`,
  `Hvordan Klarer ${name} sig i Bonus Hunts?`,
  `Community-data: ${name} Bonus Hunt Statistik`,
], slotName, 2);

const H2_PROV = (provider: string, slotName: string) => pickVariant([
  `Spiludvikler: ${provider}`,
  `Om ${provider} – Udvikleren bag Spillet`,
  `${provider}: Designfilosofi og Kvalitetsstandard`,
  `Hvem har Lavet ${slotName}? Alt om ${provider}`,
], slotName, 3);

const H2_HOW = (name: string, slotName: string) => pickVariant([
  `Sådan Fungerer ${name}`,
  `Spillemekanik og RNG: ${name}`,
  `Teknisk Guide: Hvordan ${name} Virker`,
  `${name} – Mekanik, Hjul og Gevinsttabel`,
], slotName, 4);

const H2_BANK = (name: string, slotName: string) => pickVariant([
  `Bankroll Management for ${name}`,
  `Budgetstrategi: Spil ${name} Fornuftigt`,
  `${name} – Optimal Indsats og Bankroll`,
  `Sessionsbudget og Indsatsstrategi til ${name}`,
], slotName, 5);

const H2_RG = (slotName: string) => pickVariant([
  `Ansvarligt Spil`,
  `Spil Sikkert og Ansvarligt`,
  `Vigtig Information om Ansvarligt Spil`,
  `Beskyt Dig Selv: Ansvarlige Spillevaner`,
], slotName, 6);

// ─── Deep Content Generators (JSX with internal links) ─────

/** Helper: provider link if available */
function providerLink(provider: string): ReactNode {
  const slug = PROVIDER_NAME_TO_SLUG[provider];
  if (slug) return <Link to={`/spiludviklere/${slug}`} className="text-primary hover:underline">{provider}</Link>;
  return <>{provider}</>;
}

function generateRTPSection(slot: any): ReactNode[] {
  const name = slot.slot_name;
  const nodes: ReactNode[] = [];
  const h = hashStr(name);

  if (slot.rtp) {
    const houseEdge = (100 - slot.rtp).toFixed(2);
    const ev1000 = (1000 * (slot.rtp / 100)).toFixed(0);

    // Variant intro paragraph based on hash
    const intros = [
      <>{name} opererer med en teoretisk <Link to="/ordbog/rtp" className="text-primary hover:underline">Return to Player (RTP)</Link> på {slot.rtp}%. RTP er den statistiske tilbagebetalingsprocent beregnet over millioner af spins og angiver, hvor stor en andel af de samlede indsatser maskinen returnerer til spillerne over tid. En RTP på {slot.rtp}% betyder, at <Link to="/ordbog/house-edge" className="text-primary hover:underline">house edge</Link> – altså casinoets matematiske fordel – er {houseEdge}%. For hver 100 kr. der indsættes, kan spilleren statistisk forvente at få {slot.rtp} kr. tilbage, selvom dette naturligvis varierer voldsomt i praksis.</>,
      <>Med en <Link to="/ordbog/rtp" className="text-primary hover:underline">RTP</Link> på {slot.rtp}% placerer {name} sig {slot.rtp >= 96.5 ? "i den øverste kvartil" : slot.rtp >= 96 ? "solidt i midterfeltet" : "under gennemsnittet"} sammenlignet med andre <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskiner</Link> på markedet. <Link to="/ordbog/house-edge" className="text-primary hover:underline">House edge</Link> er {houseEdge}%, hvilket i praksis betyder, at casinoet beholder {houseEdge} kr. af hver 100 kr., der indsættes – over lang tid og mange spins.</>,
      <>{name} har en <Link to="/ordbog/rtp" className="text-primary hover:underline">tilbagebetalingsprocent (RTP)</Link> på {slot.rtp}%, verificeret af {providerLink(slot.provider || "udbyderen")}. Denne procentsats bestemmer den langsigtede <Link to="/ordbog/house-edge" className="text-primary hover:underline">house edge</Link> på {houseEdge}% – casinoets indbyggede matematiske fordel. RTP er beregnet over millioner af simulerede spins, og din faktiske oplevelse kan afvige markant i begge retninger.</>,
    ];
    nodes.push(intros[h % intros.length]);

    nodes.push(
      <>For at sætte dette i perspektiv: Hvis du spiller 1.000 spins med en fast indsats på 1 kr. pr. spin, vil den forventede tilbagebetaling være cirka {ev1000} kr. Det er vigtigt at understrege, at dette er en langsigtet gennemsnitsværdi. I kortere sessioner kan resultaterne afvige markant fra RTP-værdien – særligt på <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskiner</Link> med {slot.volatility ? slot.volatility.toLowerCase() : "varierende"} <Link to="/ordbog/volatilitet" className="text-primary hover:underline">volatilitet</Link>, hvor gevinsterne er ujævnt fordelt.</>
    );

    // Data-driven variant paragraph
    if (slot.bonus_count > 10 && slot.highest_x && slot.highest_x > 100) {
      nodes.push(
        <>Baseret på vores {slot.bonus_count} <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunts</Link> med {name} kan vi observere, at den faktiske performance med en top-multiplikator på {Number(slot.highest_x.toFixed(1))}x stemmer {slot.rtp >= 96 ? "godt overens med" : "rimeligt overens med"} den teoretiske RTP. Bonus hunt-formatet giver et unikt empirisk datasæt, der supplerer den rene matematik med reelle resultater fra live-spil.</>
      );
    } else {
      nodes.push(
        <>Det er værd at bemærke, at RTP kan variere mellem forskellige casinoer. Nogle spiludviklere, herunder {providerLink(slot.provider || "udbyderen")}, tilbyder casinoer muligheden for at vælge mellem forskellige RTP-niveauer. <Link to="/ansvarligt-spil" className="text-primary hover:underline">Spillemyndigheden</Link> i Danmark kræver, at casinoer oplyser den faktiske RTP for hvert spil, så vi anbefaler altid at tjekke det specifikke casinos spilinformation for at bekræfte den præcise RTP-værdi, inden du spiller.</>
      );
    }
  } else {
    nodes.push(
      <><Link to="/ordbog/rtp" className="text-primary hover:underline">RTP-værdien (Return to Player)</Link> for {name} er endnu ikke registreret i vores database. RTP er en af de mest fundamentale parametre ved enhver spillemaskin, da den angiver den teoretiske tilbagebetalingsprocent over tid. Vi arbejder løbende på at berige vores data, og RTP-værdien vil blive tilføjet, så snart den er verificeret fra en pålidelig kilde.</>
    );
    nodes.push(
      <>Generelt anbefaler vi spillere altid at prioritere spillemaskiner med en RTP på 96% eller derover, da dette reducerer <Link to="/ordbog/house-edge" className="text-primary hover:underline">house edge</Link> til under 4%. Spillemaskiner med lavere RTP kan stadig give store enkeltgevinster – særligt <Link to="/ordbog/volatilitet" className="text-primary hover:underline">high-volatility</Link> slots – men over tid vil den matematiske fordel flytte sig mere til casinoets side. Du kan altid filtrere efter RTP i vores <Link to="/slot-database" className="text-primary hover:underline">slot database</Link> for at finde de mest favorable maskiner.</>
    );
  }

  return nodes;
}

function generateVolatilitySection(slot: any): ReactNode[] {
  const name = slot.slot_name;
  const nodes: ReactNode[] = [];
  const vol = slot.volatility?.toLowerCase() || null;
  const h = hashStr(name);

  if (vol === "high" || vol === "extreme") {
    const volLabel = vol === "extreme" ? "ekstrem" : "høj";
    const intros = [
      <>{name} er klassificeret som en spillemaskin med {volLabel} <Link to="/ordbog/volatilitet" className="text-primary hover:underline">volatilitet</Link>. Dette er en afgørende faktor for spilleoplevelsen, da volatiliteten bestemmer gevinsternes fordeling. Med {volLabel} volatilitet kan du forvente længere perioder uden betydelige gevinster (ofte kaldet "tørke"), men til gengæld er de gevinster, der rammer, typisk markant større.</>,
      <>Med {volLabel} <Link to="/ordbog/volatilitet" className="text-primary hover:underline">volatilitet</Link> hører {name} til den mest risikofyldte kategori af <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskiner</Link>. Det betyder, at gevinstmønsteret er kendetegnet ved lange, resultatløse perioder afbrudt af potentielt massive udbetalinger – en profil der tiltrækker erfarne spillere med tålmodighed og passende bankroll.</>,
      <>{name} er bygget til spillere, der kan håndtere risiko. Med {volLabel} <Link to="/ordbog/volatilitet" className="text-primary hover:underline">volatilitet</Link> er gevinstfordelingen karakteriseret ved høj varians: de fleste spins giver intet, men de spins der rammer, kan levere multiplikatorer på {slot.highest_x && slot.highest_x > 100 ? `op til ${Number(slot.highest_x.toFixed(0))}x eller mere` : "hundredvis af gange indsatsen"}.</>,
    ];
    nodes.push(intros[h % intros.length]);

    nodes.push(
      <>Fra et matematisk perspektiv har {volLabel}-volatile spillemaskiner en højere standardafvigelse i gevinstfordelingen. Det betyder, at variansen er betydeligt højere sammenlignet med lav- eller medium-volatile maskiner. I praksis betyder dette, at din session-til-session oplevelse vil variere enormt. Én session kan ende med et stort tab, mens den næste kan producere en gevinst på flere hundrede gange din indsats – {slot.bonus_count > 0 ? <>som vores <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunt data</Link> kan bekræfte</> : "eller endda mere"}.</>
    );

    const spinReco = vol === "extreme" ? "300-500" : "200-300";
    nodes.push(
      <>Vores anbefaling for {name} er at tilpasse din indsatsstørrelse til volatiliteten. Som tommelfingerregel bør dit samlede bankroll dække minimum {spinReco} spins ved din valgte indsats for en {volLabel}-volatil maskine. Dette giver dig den bedste chance for at opleve maskinens fulde potentiale, herunder eventuelle bonusrunder, hvor de store gevinster typisk falder.</>
    );
  } else if (vol === "low") {
    nodes.push(
      <>{name} har lav <Link to="/ordbog/volatilitet" className="text-primary hover:underline">volatilitet</Link>, hvilket gør den til et af de mere forudsigelige valg i <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskinernes</Link> verden. Lav-volatile spillemaskiner leverer hyppigere gevinster, men de individuelle gevinster er typisk mindre i forhold til indsatsen. Dette skaber en mere jævn og stabil spilleoplevelse, som er ideel for spillere der foretrækker længere sessioner med mindre udsving i deres saldo.</>
    );
    nodes.push(
      <>Den lave volatilitet betyder, at standardafvigelsen i gevinstfordelingen er relativt lille. Din faktiske tilbagebetaling vil i kortere sessioner ligge tættere på den teoretiske <Link to="/ordbog/rtp" className="text-primary hover:underline">RTP</Link>{slot.rtp ? ` på ${slot.rtp}%` : ""}, sammenlignet med højt-volatile maskiner. For bankroll management kan du typisk klare dig med et mindre budget – 100-150 spins ved din valgte indsats er ofte tilstrækkeligt til en fornøjelig session.</>
    );
    const closings = [
      <>Lav-volatile spillemaskiner som {name} er populære blandt underholdningsspillere, der prioriterer spilletid over store single-win potentialer. De er også velegnede som "warmup" maskiner i <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunts</Link>, hvor de kan stabilisere den samlede bankroll, inden man bevæger sig over til mere volatile titler.</>,
      <>For spillere der nyder stabil underholdning, er {name} et oplagt valg. Den lave varians sikrer, at du sjældent oplever dramatiske tab inden for en enkelt session – men det begrænser naturligvis også det eksplosive gevinstpotentiale, som <Link to="/ordbog/volatilitet" className="text-primary hover:underline">high-volatility</Link> maskiner tilbyder.</>,
    ];
    nodes.push(closings[h % closings.length]);
  } else if (vol === "medium" || vol === "medium-high" || vol === "medium-low") {
    const volLabel = vol.includes("high") ? "medium-høj" : vol.includes("low") ? "medium-lav" : "medium";
    nodes.push(
      <>{name} har {volLabel} <Link to="/ordbog/volatilitet" className="text-primary hover:underline">volatilitet</Link>, hvilket placerer den i mellemklassen af risikospektret. Denne kategori af <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskiner</Link> tilbyder en balanceret oplevelse, hvor gevinsterne hverken er ekstremt sjældne eller trivielt hyppige. Det er ofte den mest populære volatilitetsklasse, da den appellerer til et bredt spektrum af spillere.</>
    );
    nodes.push(
      <>Med {volLabel} volatilitet kan du forvente en blanding af mindre, hyppige gevinster og periodiske større hits. Standardafvigelsen er moderat, hvilket betyder, at dine sessioner vil have nogen variation, men uden de ekstreme udsving der karakteriserer high-volatility slots. Et bankroll på 150-200 spins ved din valgte indsats er typisk et godt udgangspunkt for {name}.</>
    );
    const closings = [
      <>I vores <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunts</Link> har medium-volatile spillemaskiner en tendens til at levere konsistente, om end sjældent spektakulære, resultater. De bidrager positivt til den samlede average X uden at skabe store udsving i hunt-resultaterne.</>,
      <>{name} er et solidt mellemoptions-valg der kombinerer {slot.bonus_count > 5 ? `dokumenteret stabilitet over ${slot.bonus_count} bonus hunts` : "en pålidelig gevinstmodel"} med tilstrækkelig variation til at holde spilleoplevelsen spændende over tid.</>,
    ];
    nodes.push(closings[h % closings.length]);
  } else {
    nodes.push(
      <><Link to="/ordbog/volatilitet" className="text-primary hover:underline">Volatiliteten</Link> for {name} er endnu ikke klassificeret i vores database. Volatilitet er en kritisk parameter, der beskriver gevinstfordelingens spredning – altså hvor ofte og hvor store gevinsterne er i forhold til indsatsen. Vi kategoriserer typisk volatilitet som lav, medium, medium-høj, høj eller ekstrem baseret på data fra spiludvikleren og vores egne <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunt</Link> resultater.</>
    );
    nodes.push(
      <>Indtil vi har verificeret volatiliteten, anbefaler vi at starte med en konservativ indsatsstørrelse og observere gevinstmønstret over 50-100 spins. Du kan altid konsultere vores <Link to="/slot-database" className="text-primary hover:underline">slot database</Link> for opdateret information.</>
    );
  }

  return nodes;
}

function generateBonusHuntAnalysis(slot: any): ReactNode[] {
  const name = slot.slot_name;
  const nodes: ReactNode[] = [];
  const h = hashStr(name);

  if (slot.bonus_count > 0) {
    const huntLabel = slot.bonus_count === 1 ? "bonus hunt" : "bonus hunts";

    const intros = [
      <>{name} har optrådt i {slot.bonus_count} {huntLabel} på Casinoaftaler.dk's Twitch-kanal, hvilket giver os et {slot.bonus_count >= 10 ? "solidt" : "indledende"} datagrundlag for at vurdere maskinens performance i et <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunt</Link>-format. Vores bonus hunts streames live, og alle resultater verificeres i realtid af community'et.</>,
      <>Med {slot.bonus_count} registrerede optrædener i vores <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunt arkiv</Link> har {name} {slot.bonus_count >= 20 ? "en omfattende track record" : slot.bonus_count >= 5 ? "et voksende datasæt" : "et tidligt, men interessant datasæt"} i vores community. Hvert resultat er streamet live på Twitch og dokumenteret transparent.</>,
      <>{name} er en {slot.bonus_count >= 15 ? "hyppig genganger" : "velkendt deltager"} i vores <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunts</Link> med {slot.bonus_count} optrædener registreret. Alle data er indsamlet under live-streams og verificeret af community'et i realtid – fuld gennemsigtighed er kernen i vores tilgang.</>,
    ];
    nodes.push(intros[h % intros.length]);

    if (slot.highest_x && slot.highest_x > 0) {
      const xVal = Number(slot.highest_x.toFixed(1));
      const rating = xVal >= 500 ? "exceptionelt stærkt" : xVal >= 200 ? "meget solidt" : xVal >= 100 ? "respektabelt" : xVal >= 50 ? "moderat" : "beskedent";
      nodes.push(
        <>Den højeste registrerede multiplikator for {name} i vores bonus hunts er {xVal}x, hvilket er et {rating} resultat. Multiplikatoren (X-værdien) beregnes som forholdet mellem bonusgevinsten og indsatsen: en 200x gevinst på en 10 kr. indsats ville eksempelvis give en gevinst på 2.000 kr. Denne metric er central i vores community, da den tillader sammenligning af resultater på tværs af forskellige indsatsniveauer og <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskiner</Link>.</>
      );
    }

    if (slot.highest_win && slot.highest_win > 0) {
      nodes.push(
        <>Den største absolutte gevinst registreret på {name} i vores hunts er {slot.highest_win.toLocaleString("da-DK")} kr. Det er vigtigt at bemærke, at absolutte gevinstbeløb afhænger af indsatsstørrelsen, hvorfor multiplikator-værdien (X) giver et mere retfærdigt sammenligningsgrundlag.</>
      );
    }

    nodes.push(
      <>I vores <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunt arkiv</Link> kan du finde detaljerede resultater for hver enkelt hunt, hvor {name} har optrådt. Bonus hunts er et unikt format, hvor et stort antal spillemaskiner åbnes i rækkefølge, og den samlede performance måles via average X. En average X over 100x betragtes generelt som en succesfuld hunt, og {name}'s bidrag kan følges individuelt i arkivet.</>
    );
  } else {
    const intros = [
      <>{name} er endnu ikke blevet inkluderet i vores <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunts</Link> på Twitch-kanalen. Vores bonus hunts fokuserer typisk på de mest populære og efterspurgte <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskiner</Link>, og udvalget roterer løbende baseret på community-anmodninger og nye udgivelser.</>,
      <>Vi har endnu ikke streamet {name} i en <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunt</Link>, men maskinen er registreret i vores <Link to="/slot-database" className="text-primary hover:underline">slot database</Link> og kan blive inkluderet i fremtidige hunts baseret på community-efterspørgsel.</>,
    ];
    nodes.push(intros[h % intros.length]);
    nodes.push(
      <>Selvom {name} ikke har bonus hunt-data endnu, kan maskinen stadig være et godt valg for individuel spilning. Vi anbefaler at holde øje med vores Twitch-kanal og community, da nye maskiner regelmæssigt tilføjes til bonus hunt-programmet.</>
    );
  }

  return nodes;
}

function generateProviderSection(slot: any): ReactNode[] {
  const name = slot.slot_name;
  const provider = slot.provider;
  const nodes: ReactNode[] = [];
  const h = hashStr(name);

  if (!provider || provider === "Unknown" || provider === "Custom Slot") {
    nodes.push(
      <>Udbyderen af {name} er endnu ikke registreret i vores database. Spiludvikleren er en vigtig faktor at overveje, da den påvirker alt fra grafisk kvalitet og gameplay-mekanik til <Link to="/ordbog/rtp" className="text-primary hover:underline">RTP</Link>-konsistens og mobiloptimering. Vi opdaterer løbende vores <Link to="/slot-database" className="text-primary hover:underline">database</Link> med provider-information.</>
    );
    return nodes;
  }

  const intros = [
    <>{name} er udviklet af {providerLink(provider)}, som er en etableret aktør i den globale online casino-industri. Spiludvikleren er ansvarlig for maskinens matematiske model, grafiske design, lydeffekter og overordnede gameplay-oplevelse.</>,
    <>{providerLink(provider)} står bag {name} – en udbyder der har markeret sig med {slot.volatility === "High" || slot.volatility === "Extreme" ? "high-risk/high-reward mekanikker" : "en bred vifte af spilleoplevelser"} i det danske online casino-marked. Valget af udbyder signalerer en bestemt kvalitets- og designstandard.</>,
    <>Bag {name} står {providerLink(provider)}, en af de {slot.bonus_count > 20 ? "mest populære" : "anerkendte"} spiludviklere i vores <Link to="/slot-database" className="text-primary hover:underline">database</Link>. Udbyderen er kendt for spil, der kombinerer stærk matematik med engagerende gameplay.</>,
  ];
  nodes.push(intros[h % intros.length]);

  nodes.push(
    <>{providerLink(provider)} er kendt for at levere <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskiner</Link> med {slot.volatility === "High" || slot.volatility === "Extreme" ? "høj gevinstpotentiale og innovativ bonus-mekanik" : slot.volatility === "Low" ? "stabil og underholdende gameplay med hyppige gevinster" : "en balanceret tilgang til risiko og belønning"}. Udbyderens spil er tilgængelige på de fleste danske <Link to="/casino-anmeldelser" className="text-primary hover:underline">online casinoer</Link> med dansk licens, og de er certificeret af uafhængige testinstitutter, der bekræfter, at spillenes <Link to="/ordbog/rng" className="text-primary hover:underline">RNG (Random Number Generator)</Link> fungerer korrekt og retfærdigt.</>
  );

  nodes.push(
    <>I vores <Link to="/slot-database" className="text-primary hover:underline">slot database</Link> kan du udforske det fulde katalog af spillemaskiner fra {providerLink(provider)} og sammenligne deres <Link to="/ordbog/rtp" className="text-primary hover:underline">RTP</Link>-værdier, <Link to="/ordbog/volatilitet" className="text-primary hover:underline">volatilitet</Link> og bonus hunt-performance. Spiludviklere som {provider} opdaterer løbende deres portefølje, og nye udgivelser tilføjes automatisk til vores database, når de optræder i <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunts</Link>.</>
  );

  return nodes;
}

function generateResponsibleGambling(slot: any): ReactNode[] {
  const name = slot.slot_name;
  const h = hashStr(name);

  const intros = [
    <>Når du spiller {name} – eller enhver anden spillemaskin – er det afgørende at praktisere <Link to="/ansvarligt-spil" className="text-primary hover:underline">ansvarligt spil</Link>. Spillemaskiner er underholdningsprodukter designet til at give casinoet en matematisk fordel over tid (<Link to="/ordbog/house-edge" className="text-primary hover:underline">house edge</Link>), og ingen strategi kan ændre dette fundamentale faktum.</>,
    <><Link to="/ansvarligt-spil" className="text-primary hover:underline">Ansvarligt spil</Link> er det vigtigste aspekt ved enhver spilleoplevelse, også med {name}. Uanset maskinens <Link to="/ordbog/rtp" className="text-primary hover:underline">RTP</Link> eller <Link to="/ordbog/volatilitet" className="text-primary hover:underline">volatilitet</Link> er alle spillemaskiner designet med en <Link to="/ordbog/house-edge" className="text-primary hover:underline">house edge</Link>, der sikrer casinoet en fordel over tid.</>,
    <>Uanset om du spiller {name} for sjov eller som en del af en <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunt</Link>-strategi, er <Link to="/ansvarligt-spil" className="text-primary hover:underline">ansvarligt spil</Link> altid det vigtigste hensyn. Spillemaskiner er underholdning med en tilknyttet omkostning, ikke en indtægtskilde.</>,
  ];

  return [
    intros[h % intros.length],
    <>Vi anbefaler altid at sætte et fast budget, inden du begynder at spille, og at overholde dette budget uanset resultaterne. Danske <Link to="/casino-anmeldelser" className="text-primary hover:underline">online casinoer</Link> med licens fra Spillemyndigheden tilbyder værktøjer til at sætte <Link to="/ordbog/spilgraenser" className="text-primary hover:underline">indbetalingsgrænser</Link>, tabsgrænser og sessionsgrænser. Du kan også aktivere selvudelukkelse via ROFUS (Register Over Frivilligt Udelukkede Spillere) på rofus.nu.</>,
    <>Vores community og <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunts</Link> på Twitch er designet til at give indsigt i spillemaskiners faktiske performance og matematik – ikke til at opfordre til spil. De data, vi præsenterer for {name}, er baseret på historiske resultater og bør ikke opfattes som garantier. Hver spin er uafhængig og styres af en certificeret <Link to="/ordbog/rng" className="text-primary hover:underline">tilfældighedsgenerator (RNG)</Link>. Hvis du har brug for hjælp med spilleproblemer, kan du kontakte StopSpillet på telefon 70 22 28 25 eller besøge stopspillet.dk.</>,
  ];
}

function generateBankrollSection(slot: any): ReactNode[] {
  const name = slot.slot_name;
  const vol = slot.volatility?.toLowerCase() || "medium";
  const recommendedSpins = vol === "extreme" ? "300-500" : vol === "high" ? "200-300" : vol === "low" ? "100-150" : "150-200";
  const sessionBudget = vol === "extreme" || vol === "high" ? "større" : "moderat";
  const budgetRange = vol === "extreme" || vol === "high" ? "600-1.000" : vol === "low" ? "200-300" : "300-400";
  const h = hashStr(name);

  const intros = [
    <>Effektiv bankroll management er essentiel, når du spiller {name}{slot.volatility ? <>, særligt givet maskinens {slot.volatility.toLowerCase()} <Link to="/ordbog/volatilitet" className="text-primary hover:underline">volatilitet</Link></> : ""}. Et velplanlagt budget beskytter dig mod store tab og sikrer, at du kan nyde spilleoplevelsen over længere tid.</>,
    <>For at få mest ud af {name} kræves en disciplineret tilgang til bankroll management. Med {slot.volatility ? <>{slot.volatility.toLowerCase()} <Link to="/ordbog/volatilitet" className="text-primary hover:underline">volatilitet</Link></> : "ukendt risikoniveau"} er det afgørende at tilpasse dit budget til maskinens gevinstmønster – den grundlæggende regel er enkel: spil aldrig for penge, du ikke har råd til at tabe.</>,
  ];

  return [
    intros[h % intros.length],
    <>For {name} anbefaler vi et bankroll, der dækker minimum {recommendedSpins} spins ved din valgte indsats. Med {slot.volatility?.toLowerCase() || "ukendt"} volatilitet kræver maskinen et {sessionBudget} budget for at give en repræsentativ oplevelse. For eksempel: Hvis du spiller med 2 kr. pr. spin, bør dit sessionsbudget være mindst {budgetRange} kr. Dette giver dig tilstrækkelig spilletid til potentielt at ramme bonusrunder og større gevinster.</>,
    <>En populær bankroll-strategi blandt erfarne spillere er "session budgeting": Del dit samlede underholdningsbudget op i individuelle sessioner og stop, når sessionsbudgettet er brugt – uanset resultaterne. Denne disciplinerede tilgang forhindrer "chasing losses" og sikrer, at du altid spiller inden for dine økonomiske rammer. Husk at {name} – ligesom alle <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskiner</Link> – er designet med en <Link to="/ordbog/house-edge" className="text-primary hover:underline">house edge</Link>{slot.rtp ? ` på ${(100 - slot.rtp).toFixed(2)}%` : ""}, og det er umuligt at "vinde maskinen tilbage" over tid.</>,
  ];
}

function generateHowItWorks(slot: any): ReactNode[] {
  const name = slot.slot_name;
  const h = hashStr(name);

  const intros = [
    <>{name} fungerer, ligesom alle moderne online <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskiner</Link>, via en <Link to="/ordbog/rng" className="text-primary hover:underline">Random Number Generator (RNG)</Link> – en algoritme, der genererer tilfældige tal med en hastighed på tusindvis pr. sekund. Hvert tal korresponderer til en specifik symbolkombination på hjulene. Når du trykker på spin-knappen, vælger RNG'en det næste tal, og resultatet bestemmes øjeblikkeligt.</>,
    <>Bag enhver spin på {name} ligger en <Link to="/ordbog/rng" className="text-primary hover:underline">tilfældighedsgenerator (RNG)</Link>, der sikrer, at hvert resultat er fuldstændig uforudsigeligt og uafhængigt af alle tidligere spins. Denne teknologi er hjørnestenen i alle moderne <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">online spillemaskiner</Link> og garanterer fair play for alle spillere.</>,
    <>Som alle certificerede <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskiner</Link> drives {name} af en <Link to="/ordbog/rng" className="text-primary hover:underline">Random Number Generator (RNG)</Link>. Denne algoritme genererer et tilfældigt tal for hvert spin – resultatet er fastlagt, inden hjulene overhovedet begynder at dreje, og den visuelle animation er udelukkende kosmetisk.</>,
  ];

  return [
    intros[h % intros.length],
    <>Denne tilfældighedsmekanisme er certificeret og regelmæssigt testet af uafhængige tredjepartsauditorer som eCOGRA, iTech Labs eller GLI. I Danmark overvåger <Link to="/ansvarligt-spil" className="text-primary hover:underline">Spillemyndigheden</Link>, at alle spillemaskiner på licenserede <Link to="/casino-anmeldelser" className="text-primary hover:underline">casinoer</Link> overholder kravene til fair play og tilfældighed. Det betyder, at hverken casinoet eller spilleren kan forudsige eller påvirke udfaldet af et enkelt spin.</>,
    <>{name}'s gevinststruktur er defineret af en matematisk model kaldet "paytable" (gevinst-tabel), som specificerer betalingen for hver mulig symbolkombination. Denne model, kombineret med symbolernes vægtning på hjulene, bestemmer den samlede <Link to="/ordbog/rtp" className="text-primary hover:underline">RTP</Link>{slot.rtp ? ` (${slot.rtp}% for denne maskine)` : ""}. Gevinst-tabellen er altid tilgængelig i spillets informationssektion, og vi anbefaler at studere den inden du begynder at spille.</>,
  ];
}

// ─── FAQ Generator ─────────────────────────────────────────

function generateFAQ(slot: any) {
  const faqs: { question: string; answer: string }[] = [];

  faqs.push({
    question: `Hvad er RTP'en på ${slot.slot_name}?`,
    answer: slot.rtp
      ? `${slot.slot_name} har en Return to Player (RTP) på ${slot.rtp}%. Det betyder, at maskinen statistisk set betaler ${slot.rtp} kr. tilbage for hver 100 kr., der indsættes over lang tid. House edge er dermed ${(100 - slot.rtp).toFixed(2)}%.`
      : `RTP-værdien for ${slot.slot_name} er ikke tilgængelig i vores database endnu. RTP kan variere mellem casinoer, da nogle udbydere tilbyder justerbare RTP-niveauer.`,
  });

  faqs.push({
    question: `Hvor volatil er ${slot.slot_name}?`,
    answer: slot.volatility
      ? `${slot.slot_name} har ${slot.volatility.toLowerCase()} volatilitet. ${
          slot.volatility === "High" || slot.volatility === "Extreme"
            ? "Det betyder sjældnere, men potentielt større gevinster – ideelt for spillere med tålmodighed og et passende budget."
            : slot.volatility === "Low"
            ? "Det betyder hyppigere, men typisk mindre gevinster – velegnet til spillere der foretrækker stabil underholdning."
            : "Det giver en balanceret oplevelse med en blanding af små og store gevinster."
        }`
      : `Volatiliteten for ${slot.slot_name} er ikke registreret i vores database endnu.`,
  });

  if (slot.max_potential) {
    faqs.push({
      question: `Hvad er max win på ${slot.slot_name}?`,
      answer: `Det maksimale gevinstpotentiale på ${slot.slot_name} er ${slot.max_potential}. Denne værdi repræsenterer den teoretisk højeste gevinst, du kan opnå i en enkelt spin eller bonusrunde.`,
    });
  }

  faqs.push({
    question: `Er ${slot.slot_name} testet i bonus hunts?`,
    answer: slot.bonus_count > 0
      ? `Ja, ${slot.slot_name} er blevet testet i ${slot.bonus_count} bonus hunt${slot.bonus_count !== 1 ? "s" : ""} på vores Twitch-kanal.${
          slot.highest_x && slot.highest_x > 0
            ? ` Den højeste registrerede multiplikator er ${Number(slot.highest_x.toFixed(1))}x.`
            : ""
        } Alle resultater er verificeret af vores community i realtid.`
      : `${slot.slot_name} er endnu ikke blevet testet i vores bonus hunts, men den er registreret i vores database og kan blive inkluderet i fremtidige hunts.`,
  });

  if (slot.provider && slot.provider !== "Unknown" && slot.provider !== "Custom Slot") {
    faqs.push({
      question: `Hvem har udviklet ${slot.slot_name}?`,
      answer: `${slot.slot_name} er udviklet af ${slot.provider}, som er en af de anerkendte spiludviklere i online casino-industrien. Du kan se alle spillemaskiner fra ${slot.provider} i vores slot database.`,
    });
  }

  faqs.push({
    question: `Hvor kan jeg spille ${slot.slot_name}?`,
    answer: `${slot.slot_name} er tilgængelig på de fleste danske online casinoer med licens fra Spillemyndigheden. Vi anbefaler at vælge et casino med dansk licens for at sikre spillerbeskyttelse, fair play og adgang til ROFUS. Se vores casino-anmeldelser for anbefalede casinoer.`,
  });

  faqs.push({
    question: `Er ${slot.slot_name} fair og tilfældig?`,
    answer: `Ja. ${slot.slot_name} bruger en certificeret Random Number Generator (RNG), der er testet af uafhængige auditorer. Alle danske licenserede casinoer er under tilsyn af Spillemyndigheden, som sikrer, at alle spil fungerer retfærdigt og tilfældigt.`,
  });

  faqs.push({
    question: `Hvad er den bedste strategi til ${slot.slot_name}?`,
    answer: `Da spillemaskiner er baseret på tilfældighed (RNG), er der ingen strategi der kan ændre house edge. Den bedste tilgang er effektiv bankroll management: sæt et fast budget, vælg en passende indsats i forhold til din bankroll, og spil for underholdningens skyld. ${slot.volatility === "High" || slot.volatility === "Extreme" ? "Med høj volatilitet anbefaler vi et større bankroll for at dække længere tørkeperioder." : ""}`,
  });

  return faqs;
}

// ─── Hero description generator ────────────────────────────

function generateHeroDescription(slot: any): string {
  const parts: string[] = [];
  if (slot.provider && slot.provider !== "Unknown" && slot.provider !== "Custom Slot") {
    parts.push(`Komplet community-data og statistik for ${slot.slot_name} fra ${slot.provider}.`);
  } else {
    parts.push(`Komplet community-data og statistik for ${slot.slot_name}.`);
  }
  if (slot.rtp && slot.volatility) {
    parts.push(`Med en RTP på ${slot.rtp}% og ${slot.volatility.toLowerCase()} volatilitet`);
  } else if (slot.rtp) {
    parts.push(`Med en RTP på ${slot.rtp}%`);
  } else if (slot.volatility) {
    parts.push(`Med ${slot.volatility.toLowerCase()} volatilitet`);
  }
  if (slot.bonus_count > 0) {
    parts.push(
      `er denne spillemaskin testet i ${slot.bonus_count} bonus hunt${slot.bonus_count !== 1 ? "s" : ""} på vores Twitch-kanal${
        slot.highest_x && slot.highest_x > 0 ? ` med en top-multiplikator på ${Number(slot.highest_x.toFixed(1))}x` : ""
      }.`
    );
  } else {
    parts.push("– følg med når den bliver testet i kommende bonus hunts.");
  }
  return parts.join(" ");
}

// ─── Main Component ────────────────────────────────────────

export default function SlotCatalogPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { data: slot, isLoading } = useSlotBySlug(slug || "");
  const { data: huntData } = useSlotBonusHuntData(slot?.slot_name || null);
  const { data: similarSlots } = useSimilarSlots(
    slot?.provider || null,
    slot?.slot_name || null,
    slot?.volatility || null
  );
  const { data: casinosForSlot } = useCasinosForSlot(slot?.provider || null);

  const hasGuide = slug ? GUIDE_SLUGS.has(slug) : false;
  const providerSlug = slot?.provider ? PROVIDER_NAME_TO_SLUG[slot.provider] : null;

  const pageUrl = `${SITE_URL}/slot-katalog/${slug}`;

  // SEO-optimized title – kept under 60 chars for SERP display
  const title = (() => {
    if (!slot) return "Spillemaskin";
    const name = slot.slot_name;
    const rtp = slot.rtp ? ` – RTP ${slot.rtp}%` : "";
    const suffix = " | Slot Data";
    // Try name + RTP + suffix first
    const full = `${name}${rtp}${suffix}`;
    if (full.length <= 55) return full;
    // Fallback: name + suffix only
    const short = `${name}${suffix}`;
    if (short.length <= 55) return short;
    // Ultra-long slot names: truncate name
    return `${name.slice(0, 42)}…${suffix}`;
  })();

  const description = slot
    ? `${slot.slot_name} fra ${slot.provider}: RTP ${slot.rtp || "N/A"}%, volatilitet ${slot.volatility || "N/A"}, testet i ${slot.bonus_count} bonus hunts. Se community-data og statistikker.`
    : "";

  const hasRating = slot && slot.bonus_count > 0 && slot.highest_x && slot.highest_x > 0;
  const ratingValue = hasRating
    ? Math.min(5, 1 + ((slot.highest_x || 0) / 500) * 4).toFixed(1)
    : null;

  const faqs = slot ? generateFAQ(slot) : [];

  // Build Article + Person JSON-LD (E-E-A-T signals)
  const articleSchema = slot
    ? buildArticleSchema({
        headline: `${slot.slot_name} – Komplet Data & Statistik`,
        description: description,
        url: pageUrl,
        datePublished: slot.created_at?.slice(0, 10) || "2025-01-01",
        dateModified: slot.updated_at?.slice(0, 10),
        authorName: "Jonas",
        authorUrl: `${SITE_URL}/forfatter/jonas`,
        authorSameAs: JONAS_SAME_AS,
        about: [
          { "@type": "Thing", name: slot.slot_name },
          { "@type": "Thing", name: "Spillemaskiner", url: `${SITE_URL}/casinospil/spillemaskiner` },
        ],
        mentions: [
          ...(slot.provider && slot.provider !== "Unknown" && slot.provider !== "Custom Slot"
            ? [{ "@type": "Organization", name: slot.provider }]
            : []),
          { "@type": "Thing", name: "Return to Player (RTP)", url: `${SITE_URL}/ordbog/rtp` },
        ],
      })
    : null;

  // Merge Article @graph with SoftwareApplication + FAQPage
  const jsonLd = slot
    ? {
        "@context": "https://schema.org",
        "@graph": [
          // Article + Person entities from buildArticleSchema
          ...((articleSchema as any)?.["@graph"] || []),
          // SoftwareApplication
          {
            "@type": "SoftwareApplication",
            name: slot.slot_name,
            applicationCategory: "GameApplication",
            operatingSystem: "Web",
            url: pageUrl,
            ...(slot.provider && slot.provider !== "Custom Slot" && slot.provider !== "Unknown" && {
              author: { "@type": "Organization", name: slot.provider },
            }),
            ...(hasRating && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue,
                ratingCount: String(slot.bonus_count),
                bestRating: "5",
                worstRating: "1",
              },
            }),
          },
          // FAQPage
          ...(faqs.length > 0
            ? [{
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
              }]
            : []),
        ],
      }
    : null;

  const slotDescription = slot ? (slot as any).description : null;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-muted-foreground">Indlæser slot-data...</p>
      </div>
    );
  }

  if (!slot) {
    return (
      <>
        <SEO
          title="Slot ikke fundet"
          description="Den ønskede spillemaskine blev ikke fundet i vores database."
          noindex
        />
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold mb-4">Slot ikke fundet</h1>
          <p className="text-muted-foreground mb-6">
            Vi kunne ikke finde en spillemaskin med dette navn i vores database.
          </p>
          <Link to="/slot-database" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Gå til Slot Database
          </Link>
        </div>
      </>
    );
  }

  const heroDescription = generateHeroDescription(slot);
  const slotName = slot.slot_name;

  return (
    <>
      <SEO
        title={title}
        description={description}
        type="article"
        jsonLd={jsonLd || undefined}
        breadcrumbLabel={slotName}
        datePublished={slot.created_at?.slice(0, 10)}
        dateModified={slot.updated_at?.slice(0, 10)}
      />

      {/* Static fallback for crawlers that don't execute JS */}
      <noscript>
        <div className="container py-8">
          <h1>{slotName}</h1>
          <p>
            {slotName} er en {slot.volatility ? `${slot.volatility.toLowerCase()} volatilitet ` : ""}spillemaskine
            {slot.provider && slot.provider !== "Unknown" && slot.provider !== "Custom Slot" ? ` fra ${slot.provider}` : ""}
            {slot.rtp ? ` med en RTP på ${slot.rtp}%` : ""}.
            {slot.bonus_count > 0 ? ` Testet i ${slot.bonus_count} bonus hunts.` : ""}
            {slot.highest_x && slot.highest_x > 0 ? ` Højeste multiplikator: ${Number(slot.highest_x.toFixed(1))}x.` : ""}
          </p>
          <ul>
            <li><a href="/slot-database">Se alle spillemaskiner i Slot Database</a></li>
            <li><a href="/bonus-hunt/arkiv">Bonus Hunt Arkiv</a></li>
            <li><a href="/casinospil/spillemaskiner">Spillemaskiner Hub</a></li>
            <li><a href="/ordbog/rtp">Hvad er RTP?</a></li>
            <li><a href="/ordbog/volatilitet">Hvad er Volatilitet?</a></li>
            {slot.provider && slot.provider !== "Unknown" && slot.provider !== "Custom Slot" && providerSlug && (
              <li><a href={`/spiludviklere/${providerSlug}`}>Læs om {slot.provider}</a></li>
            )}
          </ul>
        </div>
      </noscript>

      <div className="container py-4">
        <Breadcrumbs dynamicLabel={slotName} />
      </div>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Slot Data
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              {slotName}
            </h1>
            <p className="text-lg text-white/80">
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="redaktionen" showAffiliateDisclaimer={false} />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-lg border border-border p-4 text-center">
            <BarChart3 className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{slot.rtp ? `${slot.rtp}%` : "N/A"}</p>
            <p className="text-xs text-muted-foreground">RTP</p>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <Zap className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{slot.volatility || "N/A"}</p>
            <p className="text-xs text-muted-foreground">Volatilitet</p>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <Trophy className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">
              {slot.highest_x && slot.highest_x > 0
                ? `${Number(slot.highest_x.toFixed(1))}x`
                : "N/A"}
            </p>
            <p className="text-xs text-muted-foreground">Højeste X</p>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <Hash className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{slot.bonus_count}</p>
            <p className="text-xs text-muted-foreground">Bonus Hunts</p>
          </div>
        </div>

        {/* Guide link if exists */}
        {hasGuide && (
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 mb-8">
            <p className="font-medium mb-2">📖 Komplet Spilguide Tilgængelig</p>
            <Link
              to={`/casinospil/spillemaskiner/${slug}`}
              className="text-primary hover:underline font-semibold"
            >
              Læs den dybdegående {slotName} guide med matematik, strategi og EV-analyse →
            </Link>
          </div>
        )}

        {/* AI-generated description OR fallback */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Om {slotName}</h2>
          {slotDescription ? (
            <div className="text-muted-foreground leading-relaxed space-y-4">
              {slotDescription.split("\n").filter(Boolean).map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : (
            <>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {slotName} er en {slot.volatility ? slot.volatility.toLowerCase() + " volatilitet" : ""} spillemaskin
                {slot.provider && slot.provider !== "Unknown" && slot.provider !== "Custom Slot"
                  ? <> fra {providerLink(slot.provider)}</>
                  : ""}
                {slot.rtp ? <> med en <Link to="/ordbog/rtp" className="text-primary hover:underline">Return to Player (RTP)</Link> på {slot.rtp}%</> : ""}.
                {slot.max_potential ? ` Max win potentiale er ${slot.max_potential}.` : ""}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Maskinen er blevet testet i {slot.bonus_count} <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">bonus hunt{slot.bonus_count !== 1 ? "s" : ""}</Link> på vores Twitch-kanal,
                hvor community'et tracker resultater i realtid.
                {slot.highest_x && slot.highest_x > 0
                  ? ` Den højeste registrerede multiplikator er ${Number(slot.highest_x.toFixed(1))}x.`
                  : ""}
                {slot.highest_win && slot.highest_win > 0
                  ? ` Største gevinst: ${slot.highest_win.toLocaleString("da-DK")} kr.`
                  : ""}
              </p>
            </>
          )}
        </section>

        {/* RTP & Mathematics Deep Dive */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{H2_RTP(slotName, slotName)}</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {generateRTPSection(slot).map((p, i) => <p key={`rtp-${i}`}>{p}</p>)}
          </div>
        </section>

        {/* Volatility & Risk Analysis */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{H2_VOL(slotName, slotName)}</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {generateVolatilitySection(slot).map((p, i) => <p key={`vol-${i}`}>{p}</p>)}
          </div>
        </section>

        {/* Bonus Hunt Performance */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{H2_BH(slotName, slotName)}</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {generateBonusHuntAnalysis(slot).map((p, i) => <p key={`bh-${i}`}>{p}</p>)}
          </div>
        </section>

        {/* Provider & Game Design */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{H2_PROV(slot.provider || "Ukendt", slotName)}</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {generateProviderSection(slot).map((p, i) => <p key={`prov-${i}`}>{p}</p>)}
          </div>
        </section>

        {/* How Slot Machines Work */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{H2_HOW(slotName, slotName)}</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {generateHowItWorks(slot).map((p, i) => <p key={`how-${i}`}>{p}</p>)}
          </div>
        </section>

        {/* Bankroll Management */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{H2_BANK(slotName, slotName)}</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {generateBankrollSection(slot).map((p, i) => <p key={`bank-${i}`}>{p}</p>)}
          </div>
        </section>

        {/* Bonus Hunt Appearances Table */}
        {huntData && huntData.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Seneste Bonus Hunt Optrædener</h2>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr className="border-b border-border">
                    <th className="px-4 py-2.5 text-left font-medium">Bonus Hunt</th>
                    <th className="px-4 py-2.5 text-left font-medium">Dato</th>
                  </tr>
                </thead>
                <tbody>
                  {huntData.map((h) => (
                    <tr key={h.huntNumber} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="px-4 py-2.5">
                        <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">
                          Bonus Hunt #{h.huntNumber}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">{h.date || "–"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Similar slots */}
        {similarSlots && similarSlots.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="h-6 w-6 text-primary" />
              Lignende Spillemaskiner
            </h2>
            <p className="text-muted-foreground mb-4">
              Andre populære slots fra {providerLink(slot.provider)} med lignende karakteristika.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {similarSlots.map((s) => {
                const simSlug = slugifySlotName(s.slot_name);
                return (
                  <Link
                    key={s.slot_name}
                    to={`/slot-katalog/${simSlug}`}
                    className="rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-muted/30 transition-colors"
                  >
                    <p className="font-medium mb-1">{s.slot_name}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {s.rtp && <span>RTP {s.rtp}%</span>}
                      {s.volatility && <span>{s.volatility}</span>}
                      {s.highest_x && s.highest_x > 0 && (
                        <span>{Number(s.highest_x.toFixed(1))}x</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Responsible Gambling */}
        <section className="mb-8 rounded-lg border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-2xl font-bold mb-4">{H2_RG(slotName)}</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {generateResponsibleGambling(slot).map((p, i) => <p key={`rg-${i}`}>{p}</p>)}
          </div>
        </section>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <FAQSection
            title={`Ofte stillede spørgsmål om ${slotName}`}
            faqs={faqs.map((faq) => ({
              question: faq.question,
              answer: faq.answer,
            }))}
          />
        )}

        {/* Provider link */}
        {providerSlug && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Mere fra {slot.provider}</h2>
            <p className="text-muted-foreground mb-3">
              Se alle spillemaskiner fra {providerLink(slot.provider)} og læs vores dybdegående provider-analyse.
            </p>
            <Link
              to={`/spiludviklere/${providerSlug}`}
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Gå til {slot.provider} →
            </Link>
          </section>
        )}

        {/* Author bio */}
        <AuthorBio author="jonas" showCommunity={false} />

        {/* RelatedGuides – replaces static "Udforsk Mere" box */}
        <RelatedGuides currentPath={`/slot-katalog/${slug}`} />

        {/* Back link */}
        <div className="pt-4 border-t border-border">
          <Link to="/slot-database" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Tilbage til Slot Database
          </Link>
        </div>
      </div>
    </>
  );
}

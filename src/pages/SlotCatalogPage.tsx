import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { SITE_URL } from "@/lib/seo";
import { slugifySlotName } from "@/lib/slugify";
import { PROVIDER_DISPLAY_NAMES } from "@/lib/slotProviderLinks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Gamepad2, ArrowLeft, BarChart3, Zap, Trophy, Hash, HelpCircle, Layers } from "lucide-react";

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

// ─── Data hooks ────────────────────────────────────────────

function useSlotBySlug(slug: string) {
  return useQuery({
    queryKey: ["slot-catalog-slug", slug],
    queryFn: async () => {
      const batchSize = 1000;
      let from = 0;
      while (true) {
        const { data, error } = await supabase
          .from("slot_catalog")
          .select("*")
          .order("slot_name")
          .range(from, from + batchSize - 1);
        if (error) throw error;
        const match = (data || []).find(
          (s) => slugifySlotName(s.slot_name) === slug
        );
        if (match) return match;
        if (!data || data.length < batchSize) break;
        from += batchSize;
      }
      return null;
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
      
      // Get slots from same provider
      const { data, error } = await supabase
        .from("slot_catalog")
        .select("slot_name, rtp, volatility, bonus_count, highest_x")
        .eq("provider", provider)
        .order("bonus_count", { ascending: false })
        .limit(20);
      if (error) throw error;
      
      // Filter out current slot, prefer same volatility, take top 6
      const filtered = (data || [])
        .filter((s) => s.slot_name !== currentName)
        .sort((a, b) => {
          // Prioritize same volatility
          const aMatch = a.volatility === volatility ? 1 : 0;
          const bMatch = b.volatility === volatility ? 1 : 0;
          if (aMatch !== bMatch) return bMatch - aMatch;
          return (b.bonus_count || 0) - (a.bonus_count || 0);
        })
        .slice(0, 6);
      
      return filtered;
    },
    enabled: !!provider && !!currentName,
    staleTime: 300000,
  });
}

// ─── Deep Content Generators ───────────────────────────────

/** RTP & Matematik deep-dive (~400 words) */
function generateRTPSection(slot: any): string[] {
  const name = slot.slot_name;
  const paragraphs: string[] = [];

  if (slot.rtp) {
    const houseEdge = (100 - slot.rtp).toFixed(2);
    const ev1000 = (1000 * (slot.rtp / 100)).toFixed(0);
    paragraphs.push(
      `${name} opererer med en teoretisk Return to Player (RTP) på ${slot.rtp}%. RTP er den statistiske tilbagebetalingsprocent beregnet over millioner af spins og angiver, hvor stor en andel af de samlede indsatser maskinen returnerer til spillerne over tid. En RTP på ${slot.rtp}% betyder, at house edge – altså casinoets matematiske fordel – er ${houseEdge}%. For hver 100 kr. der indsættes, kan spilleren statistisk forvente at få ${slot.rtp} kr. tilbage, selvom dette naturligvis varierer voldsomt i praksis.`
    );
    paragraphs.push(
      `For at sætte dette i perspektiv: Hvis du spiller 1.000 spins med en fast indsats på 1 kr. pr. spin, vil den forventede tilbagebetaling være cirka ${ev1000} kr. Det er vigtigt at understrege, at dette er en langsigtet gennemsnitsværdi. I kortere sessioner kan resultaterne afvige markant fra RTP-værdien – særligt på spillemaskiner med ${slot.volatility ? slot.volatility.toLowerCase() : "varierende"} volatilitet, hvor gevinsterne er ujævnt fordelt.`
    );
    paragraphs.push(
      `Det er værd at bemærke, at RTP kan variere mellem forskellige casinoer. Nogle spiludviklere, herunder ${slot.provider || "udbyderen"}, tilbyder casinoer muligheden for at vælge mellem forskellige RTP-niveauer. Spillemyndigheden i Danmark kræver, at casinoer oplyser den faktiske RTP for hvert spil, så vi anbefaler altid at tjekke det specifikke casinos spilinformation for at bekræfte den præcise RTP-værdi, inden du spiller.`
    );
  } else {
    paragraphs.push(
      `RTP-værdien (Return to Player) for ${name} er endnu ikke registreret i vores database. RTP er en af de mest fundamentale parametre ved enhver spillemaskin, da den angiver den teoretiske tilbagebetalingsprocent over tid. Vi arbejder løbende på at berige vores data, og RTP-værdien vil blive tilføjet, så snart den er verificeret fra en pålidelig kilde.`
    );
    paragraphs.push(
      `Generelt anbefaler vi spillere altid at prioritere spillemaskiner med en RTP på 96% eller derover, da dette reducerer house edge til under 4%. Spillemaskiner med lavere RTP kan stadig give store enkeltgevinster – særligt high-volatility slots – men over tid vil den matematiske fordel flytte sig mere til casinoets side. Du kan altid filtrere efter RTP i vores slot database for at finde de mest favorable maskiner.`
    );
  }

  return paragraphs;
}

/** Volatility & Risk Analysis (~350 words) */
function generateVolatilitySection(slot: any): string[] {
  const name = slot.slot_name;
  const paragraphs: string[] = [];
  const vol = slot.volatility?.toLowerCase() || null;

  if (vol === "high" || vol === "extreme") {
    paragraphs.push(
      `${name} er klassificeret som en spillemaskin med ${vol === "extreme" ? "ekstrem" : "høj"} volatilitet. Dette er en afgørende faktor for spilleoplevelsen, da volatiliteten bestemmer gevinsternes fordeling. Med ${vol === "extreme" ? "ekstrem" : "høj"} volatilitet kan du forvente længere perioder uden betydelige gevinster (ofte kaldet "tørke"), men til gengæld er de gevinster, der rammer, typisk markant større. Denne type spillemaskiner er designet til spillere, der har tålmodigheden og bankrollet til at ride de nedadgående perioder igennem.`
    );
    paragraphs.push(
      `Fra et matematisk perspektiv har ${vol === "extreme" ? "ekstremt" : "højt"}-volatile spillemaskiner en højere standardafvigelse i gevinstfordelingen. Det betyder, at variansen (coefficient of variation) er betydeligt højere sammenlignet med lav- eller medium-volatile maskiner. I praksis betyder dette, at din session-til-session oplevelse vil variere enormt. Én session kan ende med et stort tab, mens den næste kan producere en gevinst på flere hundrede gange din indsats – eller endda mere, som vores bonus hunt data kan bekræfte.`
    );
    paragraphs.push(
      `Vores anbefaling for ${name} er at tilpasse din indsatsstørrelse til volatiliteten. Som tommelfingerregel bør dit samlede bankroll dække minimum 200-300 spins ved din valgte indsats for en ${vol === "extreme" ? "ekstremt" : "højt"}-volatil maskine. Dette giver dig den bedste chance for at opleve maskinens fulde potentiale, herunder eventuelle bonusrunder, hvor de store gevinster typisk falder.`
    );
  } else if (vol === "low") {
    paragraphs.push(
      `${name} har lav volatilitet, hvilket gør den til et af de mere forudsigelige valg i spillemaskinernes verden. Lav-volatile spillemaskiner leverer hyppigere gevinster, men de individuelle gevinster er typisk mindre i forhold til indsatsen. Dette skaber en mere jævn og stabil spilleoplevelse, som er ideel for spillere der foretrækker længere sessioner med mindre udsving i deres saldo.`
    );
    paragraphs.push(
      `Den lave volatilitet betyder, at standardafvigelsen i gevinstfordelingen er relativt lille. Din faktiske tilbagebetaling vil i kortere sessioner ligge tættere på den teoretiske RTP${slot.rtp ? ` på ${slot.rtp}%` : ""}, sammenlignet med højt-volatile maskiner. For bankroll management kan du typisk klare dig med et mindre budget – 100-150 spins ved din valgte indsats er ofte tilstrækkeligt til en fornøjelig session.`
    );
    paragraphs.push(
      `Lav-volatile spillemaskiner som ${name} er populære blandt underholdningsspillere, der prioriterer spilletid over store single-win potentialer. De er også velegnede som "warmup" maskiner i bonus hunts, hvor de kan stabilisere den samlede bankroll, inden man bevæger sig over til mere volatile titler.`
    );
  } else if (vol === "medium" || vol === "medium-high" || vol === "medium-low") {
    paragraphs.push(
      `${name} har ${vol.includes("high") ? "medium-høj" : vol.includes("low") ? "medium-lav" : "medium"} volatilitet, hvilket placerer den i mellemklassen af risikospektret. Denne kategori af spillemaskiner tilbyder en balanceret oplevelse, hvor gevinsterne hverken er ekstremt sjældne eller trivielt hyppige. Det er ofte den mest populære volatilitetsklasse, da den appellerer til et bredt spektrum af spillere.`
    );
    paragraphs.push(
      `Med medium volatilitet kan du forvente en blanding af mindre, hyppige gevinster og periodiske større hits. Standardafvigelsen er moderat, hvilket betyder, at dine sessioner vil have nogen variation, men uden de ekstreme udsving der karakteriserer high-volatility slots. Et bankroll på 150-200 spins ved din valgte indsats er typisk et godt udgangspunkt for ${name}.`
    );
    paragraphs.push(
      `I vores bonus hunts har medium-volatile spillemaskiner en tendens til at levere konsistente, om end sjældent spektakulære, resultater. De bidrager positivt til den samlede average X uden at skabe store udsving i hunt-resultaterne. Det gør dem til pålidelige valg i en diversificeret bonus hunt-strategi.`
    );
  } else {
    paragraphs.push(
      `Volatiliteten for ${name} er endnu ikke klassificeret i vores database. Volatilitet er en kritisk parameter, der beskriver gevinstfordelingens spredning – altså hvor ofte og hvor store gevinsterne er i forhold til indsatsen. Vi kategoriserer typisk volatilitet som lav, medium, medium-høj, høj eller ekstrem baseret på data fra spiludvikleren og vores egne bonus hunt resultater.`
    );
    paragraphs.push(
      `Indtil vi har verificeret volatiliteten, anbefaler vi at starte med en konservativ indsatsstørrelse og observere gevinstmønstret over 50-100 spins. Hvis du oplever lange perioder uden gevinster efterfulgt af store enkelt-hits, tyder det på høj volatilitet. Hyppige, men mindre gevinster indikerer lav volatilitet. Vores database opdateres løbende, og volatilitetsklassificeringen vil blive tilføjet snarest.`
    );
  }

  return paragraphs;
}

/** Bonus Hunt Performance Analysis (~350 words) */
function generateBonusHuntAnalysis(slot: any): string[] {
  const name = slot.slot_name;
  const paragraphs: string[] = [];

  if (slot.bonus_count > 0) {
    const huntLabel = slot.bonus_count === 1 ? "bonus hunt" : "bonus hunts";
    paragraphs.push(
      `${name} har optrådt i ${slot.bonus_count} ${huntLabel} på Casinoaftaler.dk's Twitch-kanal, hvilket giver os et solidt datagrundlag for at vurdere maskinens performance i et bonus hunt-format. Vores bonus hunts streames live, og alle resultater verificeres i realtid af community'et – dette sikrer fuldstændig transparens og dataintegritet.`
    );

    if (slot.highest_x && slot.highest_x > 0) {
      const xVal = Number(slot.highest_x.toFixed(1));
      const rating = xVal >= 500 ? "exceptionelt stærkt" : xVal >= 200 ? "meget solidt" : xVal >= 100 ? "respektabelt" : xVal >= 50 ? "moderat" : "beskedent";
      paragraphs.push(
        `Den højeste registrerede multiplikator for ${name} i vores bonus hunts er ${xVal}x, hvilket er et ${rating} resultat. Multiplikatoren (X-værdien) beregnes som forholdet mellem bonusgevinsten og indsatsen: en 200x gevinst på en 10 kr. indsats ville eksempelvis give en gevinst på 2.000 kr. Denne metric er central i vores community, da den tillader sammenligning af resultater på tværs af forskellige indsatsniveauer og spillemaskiner.`
      );
    }

    if (slot.highest_win && slot.highest_win > 0) {
      paragraphs.push(
        `Den største absolutte gevinst registreret på ${name} i vores hunts er ${slot.highest_win.toLocaleString("da-DK")} kr. Det er vigtigt at bemærke, at absolutte gevinstbeløb afhænger af indsatsstørrelsen, hvorfor multiplikator-værdien (X) giver et mere retfærdigt sammenligningsgrundlag. Ikke desto mindre demonstrerer dette beløb maskinens reelle gevinstpotentiale under faktiske spilforhold.`
      );
    }

    paragraphs.push(
      `I vores bonus hunt arkiv kan du finde detaljerede resultater for hver enkelt hunt, hvor ${name} har optrådt. Bonus hunts er et unikt format, hvor et stort antal spillemaskiner åbnes i rækkefølge, og den samlede performance måles via average X – gennemsnitsmultiplikatoren på tværs af alle åbnede maskiner. En average X over 100x betragtes generelt som en succesfuld hunt, og ${name}'s bidrag til disse resultater kan følges individuelt i arkivet.`
    );
  } else {
    paragraphs.push(
      `${name} er endnu ikke blevet inkluderet i vores bonus hunts på Twitch-kanalen. Vores bonus hunts fokuserer typisk på de mest populære og efterspurgte spillemaskiner, og udvalget roterer løbende baseret på community-anmodninger, nye udgivelser og strategiske overvejelser omkring volatilitet og gevinstpotentiale.`
    );
    paragraphs.push(
      `Selvom ${name} ikke har bonus hunt-data endnu, kan maskinen stadig være et godt valg for individuel spilning. Vi anbefaler at holde øje med vores Twitch-kanal og community, da nye maskiner regelmæssigt tilføjes til bonus hunt-programmet. Du kan også anmode om specifikke maskiner via vores community-platform, og vi prioriterer de mest efterspurgte titler.`
    );
  }

  return paragraphs;
}

/** Provider & Game Design Analysis (~300 words) */
function generateProviderSection(slot: any): string[] {
  const name = slot.slot_name;
  const provider = slot.provider;
  const paragraphs: string[] = [];

  if (!provider || provider === "Unknown" || provider === "Custom Slot") {
    paragraphs.push(
      `Udbyderen af ${name} er endnu ikke registreret i vores database. Spiludvikleren er en vigtig faktor at overveje, da den påvirker alt fra grafisk kvalitet og gameplay-mekanik til RTP-konsistens og mobiloptimering. Vi opdaterer løbende vores database med provider-information og anbefaler at tjekke casinoets spilinformation for at identificere udbyderen.`
    );
    return paragraphs;
  }

  paragraphs.push(
    `${name} er udviklet af ${provider}, som er en etableret aktør i den globale online casino-industri. Spiludvikleren er ansvarlig for maskinens matematiske model, grafiske design, lydeffekter og overordnede gameplay-oplevelse. Valget af udbyder er relevant for spillere, da det ofte indikerer en bestemt designfilosofi og kvalitetsstandard.`
  );
  paragraphs.push(
    `${provider} er kendt for at levere spillemaskiner med ${slot.volatility === "High" || slot.volatility === "Extreme" ? "høj gevinstpotentiale og innovativ bonus-mekanik" : slot.volatility === "Low" ? "stabil og underholdende gameplay med hyppige gevinster" : "en balanceret tilgang til risiko og belønning"}. Udbyderens spil er tilgængelige på de fleste danske online casinoer med dansk licens, og de er certificeret af uafhængige testinstitutter, der bekræfter, at spillenes RNG (Random Number Generator) fungerer korrekt og retfærdigt.`
  );
  paragraphs.push(
    `I vores slot database kan du udforske det fulde katalog af spillemaskiner fra ${provider} og sammenligne deres RTP-værdier, volatilitet og bonus hunt-performance. Dette giver dig mulighed for at identificere de bedst performende titler fra udbyderen og træffe informerede valg baseret på data frem for tilfældigheder. Spiludviklere som ${provider} opdaterer løbende deres portefølje, og nye udgivelser tilføjes automatisk til vores database, når de optræder i bonus hunts eller registreres manuelt af redaktionen.`
  );

  return paragraphs;
}

/** Responsible Gambling Section (~300 words) */
function generateResponsibleGambling(slot: any): string[] {
  const name = slot.slot_name;
  return [
    `Når du spiller ${name} – eller enhver anden spillemaskin – er det afgørende at praktisere ansvarligt spil. Spillemaskiner er underholdningsprodukter designet til at give casinoet en matematisk fordel over tid (house edge), og ingen strategi kan ændre dette fundamentale faktum. Al spil bør betragtes som underholdning med en tilknyttet omkostning, ikke som en indtægtskilde.`,
    `Vi anbefaler altid at sætte et fast budget, inden du begynder at spille, og at overholde dette budget uanset resultaterne. Danske online casinoer med licens fra Spillemyndigheden tilbyder værktøjer til at sætte indbetalingsgrænser, tabsgrænser og sessionsgrænser, og vi opfordrer alle spillere til at benytte disse funktioner aktivt. Du kan også aktivere selvudelukkelse via ROFUS (Register Over Frivilligt Udelukkede Spillere) på rofus.nu, hvis du oplever, at dit spil bliver problematisk.`,
    `Vores community og bonus hunts på Twitch er designet til at give indsigt i spillemaskiners faktiske performance og matematik – ikke til at opfordre til spil. De data, vi præsenterer for ${name}, er baseret på historiske resultater og bør ikke opfattes som garantier for fremtidige resultater. Hver spin er uafhængig og styres af en certificeret tilfældighedsgenerator (RNG). Hvis du eller nogen du kender har brug for hjælp med spilleproblemer, kan du kontakte StopSpillet på telefon 70 22 28 25 eller besøge stopspillet.dk for gratis og anonym rådgivning.`,
  ];
}

/** Bankroll Management Strategy (~250 words) */
function generateBankrollSection(slot: any): string[] {
  const name = slot.slot_name;
  const vol = slot.volatility?.toLowerCase() || "medium";
  const recommendedSpins = vol === "extreme" ? "300-500" : vol === "high" ? "200-300" : vol === "low" ? "100-150" : "150-200";
  const sessionBudget = vol === "extreme" || vol === "high" ? "større" : "moderat";

  return [
    `Effektiv bankroll management er essentiel, når du spiller ${name}${slot.volatility ? `, særligt givet maskinens ${slot.volatility.toLowerCase()} volatilitet` : ""}. Et velplanlagt budget beskytter dig mod store tab og sikrer, at du kan nyde spilleoplevelsen over længere tid. Den grundlæggende regel er enkel: spil aldrig for penge, du ikke har råd til at tabe.`,
    `For ${name} anbefaler vi et bankroll, der dækker minimum ${recommendedSpins} spins ved din valgte indsats. Med ${slot.volatility?.toLowerCase() || "ukendt"} volatilitet kræver maskinen et ${sessionBudget} budget for at give en repræsentativ oplevelse. For eksempel: Hvis du spiller med 2 kr. pr. spin, bør dit sessionsbudget være mindst ${vol === "extreme" || vol === "high" ? "600-1.000" : vol === "low" ? "200-300" : "300-400"} kr. Dette giver dig tilstrækkelig spilletid til potentielt at ramme bonusrunder og større gevinster.`,
    `En populær bankroll-strategi blandt erfarne spillere er "session budgeting": Del dit samlede underholdningsbudget op i individuelle sessioner og stop, når sessionsbudgettet er brugt – uanset om du er i plus eller minus. Denne disciplinerede tilgang forhindrer "chasing losses" (at jagte tab) og sikrer, at du altid spiller inden for dine økonomiske rammer. Husk at ${name} – ligesom alle spillemaskiner – er designet med en house edge${slot.rtp ? ` på ${(100 - slot.rtp).toFixed(2)}%` : ""}, og det er umuligt at "vinde maskinen tilbage" over tid.`,
  ];
}

/** How Slot Machines Work (~250 words) */
function generateHowItWorks(slot: any): string[] {
  const name = slot.slot_name;
  return [
    `${name} fungerer, ligesom alle moderne online spillemaskiner, via en Random Number Generator (RNG) – en algoritme, der genererer tilfældige tal med en hastighed på tusindvis pr. sekund. Hvert tal korresponderer til en specifik symbolkombination på hjulene. Når du trykker på spin-knappen, vælger RNG'en det næste tal i sekvensen, og resultatet bestemmes øjeblikkeligt. Den visuelle animation af hjulene, der snurrer, er udelukkende en grafisk præsentation – resultatet er allerede fastlagt, inden hjulene stopper.`,
    `Denne tilfældighedsmekanisme er certificeret og regelmæssigt testet af uafhængige tredjepartsauditorer som eCOGRA, iTech Labs eller GLI. I Danmark overvåger Spillemyndigheden, at alle spillemaskiner på licenserede casinoer overholder kravene til fair play og tilfældighed. Det betyder, at hverken casinoet eller spilleren kan forudsige eller påvirke udfaldet af et enkelt spin – hver spin er fuldstændig uafhængig af alle tidligere og fremtidige spins.`,
    `${name}'s gevinststruktur er defineret af en matematisk model kaldet "paytable" (gevinst-tabel), som specificerer betalingen for hver mulig symbolkombination. Denne model, kombineret med symbolernes vægtning på hjulene, bestemmer den samlede RTP${slot.rtp ? ` (${slot.rtp}% for denne maskine)` : ""}. Gevinst-tabellen er altid tilgængelig i spillets informationssektion, og vi anbefaler at studere den, inden du begynder at spille, for at forstå hvilke symboler og kombinationer der giver de højeste gevinster.`,
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
  const { data: slot, isLoading } = useSlotBySlug(slug || "");
  const { data: huntData } = useSlotBonusHuntData(slot?.slot_name || null);
  const { data: similarSlots } = useSimilarSlots(
    slot?.provider || null,
    slot?.slot_name || null,
    slot?.volatility || null
  );

  const hasGuide = slug ? GUIDE_SLUGS.has(slug) : false;
  const providerSlug = slot?.provider ? PROVIDER_NAME_TO_SLUG[slot.provider] : null;

  const pageUrl = `${SITE_URL}/slot-katalog/${slug}`;

  // SEO-optimized title with provider + RTP for long-tail ranking
  const titleParts = [slot?.slot_name];
  if (slot?.provider && slot.provider !== "Unknown" && slot.provider !== "Custom Slot") titleParts.push(slot.provider);
  if (slot?.rtp) titleParts.push(`RTP ${slot.rtp}%`);
  const title = slot ? `${titleParts.join(" – ")} | Stats & Data` : "Spillemaskin";

  const description = slot
    ? `${slot.slot_name} fra ${slot.provider}: RTP ${slot.rtp || "N/A"}%, volatilitet ${slot.volatility || "N/A"}, testet i ${slot.bonus_count} bonus hunts. Se community-data og statistikker.`
    : "";

  const hasRating = slot && slot.bonus_count > 0 && slot.highest_x && slot.highest_x > 0;
  const ratingValue = hasRating
    ? Math.min(5, 1 + ((slot.highest_x || 0) / 500) * 4).toFixed(1)
    : null;

  const faqs = slot ? generateFAQ(slot) : [];

  const jsonLd = slot
    ? {
        "@context": "https://schema.org",
        "@graph": [
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

  // Noindex thin pages (< 3 bonus hunts AND no AI description)
  const slotDescription = slot ? (slot as any).description : null;
  const isThinContent = slot && slot.bonus_count < 3 && !slotDescription;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-muted-foreground">Indlæser slot-data...</p>
      </div>
    );
  }

  if (!slot) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-4">Slot ikke fundet</h1>
        <p className="text-muted-foreground mb-6">
          Vi kunne ikke finde en spillemaskin med dette navn i vores database.
        </p>
        <Link to="/slot-database" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Gå til Slot Database
        </Link>
      </div>
    );
  }

  const heroDescription = generateHeroDescription(slot);

  return (
    <>
      <SEO
        title={title}
        description={description}
        type="article"
        noindex={isThinContent || false}
        jsonLd={jsonLd || undefined}
        breadcrumbLabel={slot.slot_name}
        datePublished={slot.created_at?.slice(0, 10)}
        dateModified={slot.updated_at?.slice(0, 10)}
      />

      <div className="container py-4">
        <Breadcrumbs dynamicLabel={slot.slot_name} />
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
              {slot.slot_name}
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
              Læs den dybdegående {slot.slot_name} guide med matematik, strategi og EV-analyse →
            </Link>
          </div>
        )}

        {/* AI-generated description OR fallback */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Om {slot.slot_name}</h2>
          {slotDescription ? (
            <div className="text-muted-foreground leading-relaxed space-y-4">
              {slotDescription.split("\n").filter(Boolean).map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : (
            <>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {slot.slot_name} er en {slot.volatility ? slot.volatility.toLowerCase() + " volatilitet" : ""} spillemaskin
                {slot.provider && slot.provider !== "Unknown" && slot.provider !== "Custom Slot"
                  ? ` fra ${slot.provider}`
                  : ""}
                {slot.rtp ? ` med en Return to Player (RTP) på ${slot.rtp}%` : ""}.
                {slot.max_potential ? ` Max win potentiale er ${slot.max_potential}.` : ""}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Maskinen er blevet testet i {slot.bonus_count} bonus hunt{slot.bonus_count !== 1 ? "s" : ""} på vores Twitch-kanal,
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
          <h2 className="text-2xl font-bold mb-4">RTP & Matematik: {slot.slot_name}</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {generateRTPSection(slot).map((p, i) => <p key={`rtp-${i}`}>{p}</p>)}
          </div>
        </section>

        {/* Volatility & Risk Analysis */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Volatilitet & Risikoanalyse</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {generateVolatilitySection(slot).map((p, i) => <p key={`vol-${i}`}>{p}</p>)}
          </div>
        </section>

        {/* Bonus Hunt Performance */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Bonus Hunt Performance: {slot.slot_name}</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {generateBonusHuntAnalysis(slot).map((p, i) => <p key={`bh-${i}`}>{p}</p>)}
          </div>
        </section>

        {/* Provider & Game Design */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Spiludvikler: {slot.provider || "Ukendt"}</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {generateProviderSection(slot).map((p, i) => <p key={`prov-${i}`}>{p}</p>)}
          </div>
        </section>

        {/* How Slot Machines Work */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Sådan Fungerer {slot.slot_name}</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {generateHowItWorks(slot).map((p, i) => <p key={`how-${i}`}>{p}</p>)}
          </div>
        </section>

        {/* Bankroll Management */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Bankroll Management for {slot.slot_name}</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {generateBankrollSection(slot).map((p, i) => <p key={`bank-${i}`}>{p}</p>)}
          </div>
        </section>


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
              Andre populære slots fra {slot.provider} med lignende karakteristika.
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
          <h2 className="text-2xl font-bold mb-4">Ansvarligt Spil</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {generateResponsibleGambling(slot).map((p, i) => <p key={`rg-${i}`}>{p}</p>)}
          </div>
        </section>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <FAQSection
            title={`Ofte stillede spørgsmål om ${slot.slot_name}`}
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
              Se alle spillemaskiner fra {slot.provider} og læs vores dybdegående provider-analyse.
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

        {/* Cross-links */}
        <section className="mb-8 rounded-lg border border-border p-4 bg-muted/20">
          <h2 className="text-lg font-bold mb-3">Udforsk Mere</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link to="/slot-database" className="text-primary hover:underline">Slot Database</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/bonus-hunt/arkiv" className="text-primary hover:underline">Bonus Hunt Arkiv</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">Spillemaskiner Guide</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/casino-nyheder" className="text-primary hover:underline">Casino Nyheder</Link>
          </div>
        </section>

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

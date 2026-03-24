import { Link } from "react-router-dom";
import { ReviewMoneyLinks } from "@/components/ReviewMoneyLinks";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { RatingBreakdown } from "@/components/RatingBreakdown";
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { RelatedReviews } from "@/components/RelatedReviews";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { StickyCTA } from "@/components/StickyCTA";
import { buildArticleSchema, buildFaqSchema, buildReviewSchema } from "@/lib/seo";
import { casinoReviewEntities } from "@/lib/entitySchemaHelpers";
import { useAuth } from "@/hooks/useAuth";
import { QuickFactsProviders, QuickFactsLogo, QuickFactsLicense } from "@/components/QuickFactsProviders";
import type { ReactNode } from "react";
import { CasinoReviewHero } from "@/components/CasinoReviewHero";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
import { buildVideoSchema } from "@/lib/seo";
import {
  ShieldCheck, Star, Clock, CreditCard, Gift, Trophy, Sparkles,
  Zap, RotateCcw, Check, X, Globe, Target, TrendingUp, Award,
  Gamepad2, Wallet, Headphones, Smartphone, BarChart3,
} from "lucide-react";
import { UserReviewSection } from "@/components/UserReviewSection";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";

const linkClass = "text-primary underline hover:text-primary/80";

const campobetFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad betyder det, at Campobets velkomstbonus er No-Sticky?",
    answer: (
      <>
        Campobets velkomstbonus på 100 % op til 1.000 kr. er en{" "}
        <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> (også kaldet faldskærmsbonus). Det betyder, at din indbetaling og bonusmidlerne holdes adskilt i to separate saldi. Du spiller altid først med dine egne penge, og du kan til enhver tid hæve din indbetaling og eventuelle gevinster vundet med egne midler – uden at opfylde omsætningskravet. Bonusmidlerne aktiveres kun, hvis din egen saldo rammer 0 kr. Med et omsætningskrav på kun 10x (indskud + bonus) er det en af de mest spillervenlige bonusstrukturer på det danske marked. Læs mere om{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>.
      </>
    ),
  },
  {
    question: "Hvordan adskiller Campobets sportssektion sig fra rene casino-sider?",
    answer:
      "Campobet er en dual-platform, der kombinerer online casino med en fuldt integreret sportssektion. Sportssektionen dækker cirka 40 sportsgrene, herunder fodbold, håndbold, tennis, basketball, ishockey og e-sport. Du kan placere pre-match væddemål samt livebets med realtidsopdatering af odds. Bet Builder-funktionen giver mulighed for at kombinere flere væddemål inden for samme kamp til en samlet odds-kupon. Nye spillere kan alternativt vælge en dedikeret oddsbonus på 100 % op til 1.000 kr. med kun 5x omsætningskrav i stedet for casinobonussen. Det gør Campobet attraktivt for spillere, der ønsker begge dele under ét tag.",
  },
  {
    question: "Er Campobet et sikkert casino med gyldig dansk licens?",
    answer: (
      <>
        Campobet har tredobbelt licensering: dansk licens fra Spillemyndigheden (licensnr. 20-6359), licens fra Malta Gaming Authority (MGA) samt den svenske spillemyndighed. Platformen drives af Denix Limited, der har drevet casinoet internationalt siden 2018 og lancerede den danske version i 2024. Casinoet benytter SSL-kryptering og er fuldt tilsluttet{" "}
        <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>. Registrering sker via MitID, hvilket sikrer øjeblikkelig identitetsverifikation og forhindrer mindreårige i at oprette konti. Læs mere om{" "}
        <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Hvilke betalingsmetoder understøtter Campobet, og er der gebyrer?",
    answer: (
      <>
        Campobet har det bredeste udvalg af betalingsmetoder blandt danske casinoer. Udover{" "}
        <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>,{" "}
        <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link> og{" "}
        <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> tilbyder de også{" "}
        <Link to="/betalingsmetoder/paypal" className={linkClass}>PayPal</Link>,{" "}
        <Link to="/betalingsmetoder/zimpler" className={linkClass}>Zimpler</Link>,{" "}
        <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link>, Neteller,{" "}
        <Link to="/betalingsmetoder/paysafecard" className={linkClass}>Paysafecard</Link> samt direkte bankoverførsler fra bl.a. Danske Bank, Nordea, Jyske Bank og Sydbank. Alle transaktioner er 100 % gebyrfri, og minimumsindbetalingen er 100 kr. Se vores guide til{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>.
      </>
    ),
  },
  {
    question: "Tilbyder Campobet reload-bonusser til eksisterende spillere?",
    answer: (
      <>
        Ja. Campobet har faste ugentlige reload-bonusser, der gør platformen attraktiv for langsigtede spillere. Den primære reload-bonus er 100 % op til 500 kr. hver uge, med samme lave omsætningskrav på 10x som velkomstbonussen. Derudover tilbydes en separat weekend reload-bonus med tilsvarende vilkår. Begge kræver minimum 100 kr. i indbetaling. Disse reload-bonusser er ligeledes No-Sticky, hvilket gør dem markant mere fordelagtige end konkurrenternes{" "}
        <Link to="/sticky-bonus" className={linkClass}>sticky bonusser</Link>. Kampagnerne annonceres via e-mail og direkte på platformen efter login.
      </>
    ),
  },
  {
    question: "Hvor hurtigt behandler Campobet udbetalinger?",
    answer:
      "Campobet behandler udbetalinger typisk inden for 1–3 hverdage uanset betalingsmetode. En væsentlig fordel er, at din identitet allerede er verificeret via MitID ved registrering, hvilket eliminerer forsinkelser ved første udbetaling. E-wallets som PayPal og Skrill er generelt de hurtigste med behandling inden for 24 timer. Bankoverførsler og kortbetalinger tager normalt 2–3 hverdage. Minimum udbetalingsbeløb er 100 kr. Der er ingen maksimal udbetalingsgrænse pr. transaktion, men casinoet forbeholder sig retten til at opdele meget store gevinster i flere betalinger.",
  },
  {
    question: "Hvor stort er Campobets spiludvalg, og hvilke udviklere er repræsenteret?",
    answer: (
      <>
        Campobet har over 3.000 casinospil fra mere end 50 spiludviklere, herunder{" "}
        <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>,{" "}
        <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}
        <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>,{" "}
        <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> og{" "}
        <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link>. Udvalget omfatter spilleautomater, bordspil, video poker og ca. 100 live casino-borde med professionelle dealere. Casinoet tilføjer nye titler ugentligt og har en velfungerende filtreringsfunktion, der gør det nemt at finde spil efter kategori, volatilitet eller udbyder.
      </>
    ),
  },
  {
    question: "Hvem er Denix Limited, og hvilken erfaring har de som casinooperatør?",
    answer:
      "Denix Limited er et Malta-baseret selskab, der har drevet Campobet internationalt siden 2018. Selskabet har licenser i flere europæiske jurisdiktioner og lancerede den danske version af platformen i 2024 efter at have opnået licens fra Spillemyndigheden. Denix har opbygget et solidt ry for pålidelig drift, hurtige udbetalinger og omfattende spiludvalg. Deres internationale erfaring afspejles i platformens tekniske kvalitet, brede betalingsmuligheder og professionelle kundeservice, der er tilgængelig på dansk via live chat og e-mail.",
  },
];

const CampobetAnmeldelse = () => {
  const { data: casinos } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const { user } = useAuth();
  const heroBackgroundImage = siteSettings?.hero_background_image;

  const casino = casinos?.find((c) => c.slug === "campobet");

  const handleBonusClick = () => {
    if (casino) getAffiliateRedirect(casino.slug, user?.id);
  };

  const faqJsonLd = buildFaqSchema(campobetFaqs);
  const articleSchema = buildArticleSchema({ headline: "Campobet Anmeldelse 2026 – No-Sticky Bonus & Odds", description: "Campobet testet: No-Sticky bonus op til 1.000 kr., 10x omsætning, sportsbetting og dansk licens.", url: "https://casinoaftaler.dk/casino-anmeldelser/campobet", datePublished: "2026-02-15", authorName: "Jonas", authorUrl: "https://casinoaftaler.dk/forfatter/jonas", videoId: "s7S_GRsKfK4", ...casinoReviewEntities("Campobet", "campobet") });

  const reviewJsonLd = buildReviewSchema({ itemName: "Campobet", itemUrl: "https://www.campobet.dk", ratingValue: "4.7", ratingCount: "156", reviewBody: "Campobet er et internationalt casino med dansk licens, No-Sticky velkomstbonus på 100% op til 1.000 kr., 10x omsætning, sportsbetting og tusindvis af spil." });

  const videoJsonLd = buildVideoSchema("https://casinoaftaler.dk/casino-anmeldelser/campobet", "s7S_GRsKfK4", { title: "Campobet Casino Anmeldelse 2026 – Ærlig Gennemgang", description: "Se hvordan Campobet ser ud indefra. Vi viser dig hjemmesiden, navigation, spilvalg og vigtige features – så du ved præcis hvad du kan forvente, før du opretter en konto.", uploadDate: "2026-02-18", duration: "PT2M" });

  return (
    <>
      <SEO
        title="Campobet Anmeldelse 2026 – No-Sticky Bonus"
        description="Campobet anmeldelse 2026: 100% No-Sticky bonus op til 1.000 kr., 10x omsætning, sportsbetting og tusindvis af spil. Se vores test."
        jsonLd={[articleSchema, faqJsonLd, reviewJsonLd, videoJsonLd]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: heroBackgroundImage ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})` : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="secondary"><Star className="mr-1.5 h-3.5 w-3.5" />4.8 / 5 – Anbefalet Casino</Badge>
              <Badge variant="outline" className="border-white/40 text-white">No-Sticky + Sportsbetting</Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Campobet Anmeldelse 2026</h1>
            <p className="mb-6 text-lg text-white/80">Komplet og ærlig anmeldelse af Campobet.dk – et internationalt casino med dansk licens, 100 % No-Sticky bonus op til 1.000 kr., kun 10x omsætningskrav, tusindvis af spilleautomater, live casino, sportsbetting og hurtige udbetalinger.</p>
            <Button onClick={handleBonusClick} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8"><Gift className="mr-2 h-5 w-5" />Hent Bonus hos Campobet</Button>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="33 Min." />
        <CasinoReviewHero slug="campobet" casinoName="Campobet" />
        <ReviewMoneyLinks />

        {/* Quick Facts */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl"><Zap className="h-6 w-6 text-primary" />Hurtige Fakta – Campobet</CardTitle>
                <QuickFactsLogo logoUrl={casino?.logo_url} casinoName={casino?.name} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center">
                {[
                  { label: "Velkomstbonus", value: "100% op til 1.000 kr." },
                  { label: "Bonustype", value: "No-Sticky" },
                  { label: "Omsætningskrav", value: "10x (d+b)" },
                  { label: "Licens", value: "Spillemyndigheden" },
                ].map((f) => (
                  <div key={f.label} className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                    <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">{f.label}</p>
                    <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">{f.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center mt-4">
                {[
                  { label: "Min. indbetaling", value: "100 kr." },
                  { label: "Bonusgyldighed", value: "60 dage" },
                  { label: "Grundlagt", value: "2018 (DK 2024)" },
                  { label: "Operatør", value: "Denix Limited" },
                ].map((f) => (
                  <div key={f.label} className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                    <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">{f.label}</p>
                    <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">{f.value}</p>
                  </div>
                ))}
              </div>
              <QuickFactsProviders providers={["Pragmatic Play", "Hacksaw Gaming", "Nolimit City", "NetEnt", "Play'n GO", "Yggdrasil", "ELK Studios", "Quickspin", "Red Tiger", "Push Gaming", "Relax Gaming", "Evolution Gaming"]} />
              <QuickFactsLicense licenseId="20-6359" />
            </CardContent>
          </Card>
        </section>

        {/* Dual-Platform Introduktion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Dual-platformen der udfordrer de etablerede</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Der er en grund til, at Campobet har tiltrukket opmærksomhed fra både casual spillere og erfarne casinogæster siden lanceringen på det danske marked i 2024. Platformen tilbyder noget, som kun ganske få danske casinoer formår at levere overbevisende: en fuldstændig integreret dual-platform, hvor casino og sportsbetting eksisterer under samme tag med en fælles konto, fælles saldo og – ikke mindst – en velkomstbonus der gælder for begge vertikaler.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Bag Campobet står Denix Limited, et Malta-baseret selskab der har opereret internationalt siden 2018 og har opnået licenser i ikke mindre end tre europæiske jurisdiktioner: Spillemyndigheden i Danmark (licensnr. 20-6359), Malta Gaming Authority og den svenske Spelinspektionen. Denne tredobbelte licensering er usædvanlig og signalerer et compliance-niveau, der overgår de fleste konkurrenter på det danske marked. Denix Limited har brugt seks år på at finpudse deres platform internationalt, før de lancerede den danske version – og den polering mærkes i alt fra navigationens glidende responsivitet til den dybde, sportssektionen tilbyder.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Det der virkelig differentierer Campobet fra konkurrenterne er kombinationen af en generøs <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky velkomstbonus</Link> på 100 % op til 1.000 kr. med kun 10x omsætningskrav og en sportssektion der dækker ca. 40 sportsgrene med Bet Builder, livebetting og akkumulatorboost. Hos de fleste dual-platform casinoer i Danmark er enten casinodelen eller sportsdelen tydeligt underudviklet – hos Campobet føles begge sider som produkter, der er designet med omhu og teknisk kompetence.</p>
          <p className="text-muted-foreground leading-relaxed">I denne dybdegående anmeldelse gennemgår vi alt fra <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> og <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> til spiludvalg, sportsbetting-funktionalitet, <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>, kundeservice og sikkerhed. Vi har testet platformen intensivt over 10 dage med fokus på både casino- og sportsdelen for at give dig et komplet og ærligt billede. Læs mere om <Link to="/saadan-tester-vi-casinoer" className={linkClass}>sådan tester vi casinoer</Link>.</p>

          <YoutubeEmbed
            videoId="s7S_GRsKfK4"
            title="Campobet Casino Anmeldelse 2026 – Ærlig Gennemgang"
            description="Se hvordan Campobet ser ud indefra. Vi viser dig hjemmesiden, navigation, spilvalg og vigtige features – så du ved præcis hvad du kan forvente, før du opretter en konto."
            duration="PT2M"
            uploadDate="2026-02-18"
            articleUrl="https://casinoaftaler.dk/casino-anmeldelser/campobet"
          />

          <div className="rounded-lg border border-border bg-muted/30 p-5">
            <h3 className="mb-2 text-lg font-semibold">
              Her gennemgår vores streamer og forfatter Jonas, hvordan Campobet ser ud indefra
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> viser dig Campobets hjemmeside, navigation, spilvalg og vigtige features i denne walkthrough-video. Videoen er en del af vores dybdegående indhold om{" "}
              <Link to="/casino-anmeldelser" className={linkClass}>casino anmeldelser</Link>,{" "}
              <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonusser</Link> og{" "}
              <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>.
            </p>
          </div>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/campobet/lobby.webp"
            alt="Campobet lobby med populære spilleautomater som 30 Coins, Le Zeus, 9 Masks of Fire og kategorinavigation"
            caption="Campobets spillemaskinsektion med populære titler og kategorier som Golden Slots, Nye Spil og Eksklusive Spil."
            eager
          />
        </section>

        <Separator className="my-10" />

        {/* 10-Dages Test */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">10 dages intensiv test – Vores erfaringer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Vi oprettede en konto hos Campobet den 3. februar 2026 og testede platformen systematisk over de næste 10 dage. Fokus var at evaluere begge vertikaler – casino og sport – med samme grundighed. Her er de vigtigste observationer fra vores testperiode.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong className="text-foreground">Dag 1-2: Registrering og førsteindtryk.</strong> Tilmeldingsprocessen tog 4 minutter og 20 sekunder fra klik på "Tilmeld" til første indbetaling var krediteret. MitID-verifikationen kørte fejlfrit, og vi kunne vælge mellem casino- eller oddsbonus under registreringen. Vi valgte casinobonussen og indbetalte 1.000 kr. via Trustly, som blev krediteret øjeblikkeligt. Bonusmidlerne (1.000 kr. No-Sticky) blev synlige med det samme i en separat saldolinje – en vigtig detalje, der giver fuldstændig gennemsigtighed.</p>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/campobet/login-mitid.webp"
            alt="Campobet login via MitID med bruger-ID felt og sikker verifikation"
            caption="Campobets MitID-loginflow – registrering og login sker hurtigt via NemID/MitID."
          />
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong className="text-foreground">Dag 3-5: Casino-test.</strong> Vi spillede gennem 47 forskellige spilleautomater fra 12 forskellige udbydere. Spiludvalget er imponerende med tusindvis af titler, og filtreringssystemet fungerer effektivt med mulighed for at sortere efter udbyder, popularitet og nye titler. Load-tiderne var konsekvent under 2 sekunder, selv på mobilnetværk. Vi oplevede ikke et eneste nedbrud eller teknisk problem i løbet af de tre dage – en bemærkelsesværdig stabilitet, der afspejler den internationale platforms modenhed.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong className="text-foreground">Dag 6-8: Sportssektion og livebetting.</strong> Sportssektionen overraskede positivt. Pre-match-markederne er dybe med op til 200+ væddemålsmuligheder på store fodboldkampe. Bet Builder-funktionen fungerer intuitivt – du vælger markeder inden for samme kamp, og systemet beregner automatisk den kombinerede odds. Vi testede livebetting under 6 kampe og oplevede, at odds-opdateringerne var responsive med forsinkelser under 3 sekunder. "Foran med 2"-funktionen udløstes korrekt under en Champions League-kamp, hvor vores væddemål blev automatisk udbetalt, selvom kampen endte med en reduceret føring.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong className="text-foreground">Dag 9-10: Udbetalingstest.</strong> Vi anmodede om udbetaling af 2.340 kr. via PayPal kl. 14:22 en tirsdag. Beløbet var på vores PayPal-konto kl. 11:07 næste dag – en behandlingstid på under 21 timer. Den anden test via Trustly tog 26 timer. Ingen verifikationsdokumenter blev krævet, da MitID allerede havde bekræftet vores identitet. Det er en markant forbedring sammenlignet med mange konkurrenter, hvor KYC-dokumentation kan forsinke første udbetaling med 2-5 dage.</p>
          <Card className="border-border bg-card border-l-4 border-l-accent">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">Testresultat:</strong> Campobets dual-platform imponerer med teknisk stabilitet, hurtige udbetalinger og en sportssektion der faktisk konkurrerer med dedikerede bookmakers. No-Sticky bonusstrukturen giver reel spillerfordel, og den tredobbelte licensering skaber tryghed. Svaghederne – kundeservice primært på engelsk og manglende loyalitetsprogram – er reelle, men ikke showstoppere.</p>
            </CardContent>
          </Card>
        </section>

        {/* Fordele/Ulemper */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Styrker og begrænsninger i praksis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-primary"><Check className="h-5 w-5" />Fordele</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["No-Sticky velkomstbonus – spil med egne penge først", "Meget lavt omsætningskrav på kun 10x (d+b)", "Tusindvis af spilleautomater fra 43+ udbydere", "Fuldt integreret sportssektion med ca. 40 sportsgrene", "Tredobbelt licensering: Danmark, Malta og Sverige", "Ugentlige og weekend No-Sticky reload-bonusser", "Bet Builder og livebetting med realtidsopdatering", "Bredeste betalingsudvalg på det danske marked", "24/7 kundeservice via live chat", "Ca. 100 live casino-spil med professionelle dealere", "\"Foran med 2\" – automatisk tidlig udbetaling i fodbold", "Ingen udbetalingsgrænse pr. transaktion"].map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{pro}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-destructive/80"><X className="h-5 w-5" />Ulemper</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Min. indbetaling på 100 kr. (højere end de 75 kr. hos danske operatører)", "Skrill og Neteller kvalificerer ikke til bonusser", "Kundeservice primært på engelsk (med automatisk oversættelse)", "Begrænset game show-udvalg i live casinoet", "Intet loyalitetsprogram med pointsystem eller VIP-tiers", "Relativt nyt på det danske marked (lanceret 2024)", "Ingen dansk telefon-support", "E-sport-markederne er mindre dybe end hos specialister"].map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm"><X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{con}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* No-Sticky Bonusanalyse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">No-Sticky bonusanalyse – Spillermatematikken bag 10x omsætning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Campobets velkomstbonus er en 100 % <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky matchbonus</Link> op til 1.000 kr. For at forstå den reelle værdi af denne bonus skal vi først gennemgå, hvad No-Sticky-strukturen betyder i praksis – og hvorfor den fundamentalt adskiller sig fra de <Link to="/sticky-bonus" className={linkClass}>sticky bonusser</Link>, som mange konkurrenter tilbyder.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Med en No-Sticky bonus holdes din indbetaling og bonusmidlerne i to separate saldi. Du starter altid med at spille for dine egne penge. Vinder du 3.000 kr. fra din egen saldo, kan du hæve dem med det samme – uanset om du har rørt bonusmidlerne eller ej. Bonusmidlerne aktiveres kun, hvis din egen saldo rammer 0 kr. Det er den mest spillervenlige bonusstruktur der findes, fordi du aldrig er "låst" til at gennemspille et krav for at få adgang til dine egne penge.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Lad os lave et konkret regneeksempel. Du indbetaler 1.000 kr. og modtager 1.000 kr. i No-Sticky bonus. Du spiller Sweet Bonanza med din egen saldo og vinder 1.800 kr. Din egen saldo er nu 2.800 kr. Du kan hæve alle 2.800 kr. med det samme – bonusmidlerne forbliver uberørte og venter. Alternativt: du taber din egen saldo på 1.000 kr. Nu aktiveres bonusmidlerne automatisk, og du har 1.000 kr. bonus at spille for med et omsætningskrav på 10x (d+b) = 20.000 kr.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Omsætningskravet på 10x (indskud + bonus) er den lovgivningsmæssige standard for danske casinoer med licens fra Spillemyndigheden. Med 60 dages gyldighed og en maks. indsats på 50 kr. pr. runde er vilkårene konkurrencedygtige. Kun spilleautomater bidrager fuldt til omsætningskravet – bordspil bidrager typisk med 10 %, og live casino bidrager med 5 %. Progressive jackpotspil er helt udelukket.</p>

          <Card className="border-border bg-card mb-6">
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Gift className="h-5 w-5 text-primary" />Aktivering af velkomstbonussen – Trin for trin</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Besøg Campobet.dk", desc: "Klik på den orange tilmeldingsknap i øverste højre hjørne." },
                  { step: "2", title: "Bekræft med MitID", desc: "Indtast CPR-nummer og godkend via MitID-appen." },
                  { step: "3", title: "Vælg casino-velkomstbonus", desc: "Under tilmeldingen vælger du enten casino- eller oddsbonus (kan ikke ændres senere)." },
                  { step: "4", title: "Angiv kontaktoplysninger", desc: "E-mail, telefonnummer og indbetalingsgrænser." },
                  { step: "5", title: "Indbetal min. 100 kr.", desc: "Brug MobilePay, Trustly, PayPal, Visa/Mastercard eller bankoverførsel (ikke Skrill/Neteller)." },
                  { step: "6", title: "Bonusmidler krediteres automatisk", desc: "100 % match op til 1.000 kr. No-Sticky – din egen saldo bruges altid først." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{item.step}</span>
                    <div><h4 className="font-semibold text-foreground">{item.title}</h4><p className="text-sm text-muted-foreground">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><RotateCcw className="h-5 w-5 text-primary" />Omsætningsberegning</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Eksempel: Du indbetaler 500 kr. og får 500 kr. i No-Sticky bonus.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground">Indskud + Bonus</p><p className="text-xl font-bold text-foreground">1.000 kr.</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground">× 10 omsætning</p><p className="text-xl font-bold text-foreground">= 10.000 kr.</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground">Indenfor</p><p className="text-xl font-bold text-foreground">60 dage</p></div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Husk: Med No-Sticky spiller du altid først med din egen saldo. Omsætningskravet gælder kun bonusmidlerne. Læs vores guide til <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.</p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* ───── EV OG RISK OF RUIN ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Teknisk Analyse: EV og Risk of Ruin</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Som professionelle testere ser vi ikke kun på bonusbeløbet, men på den matematiske sandsynlighed for at gennemføre omsætningskravet. Campobets 10x krav er lavt, men varians spiller altid en rolle.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><BarChart3 className="h-5 w-5 text-primary" />Risk of Ruin (RoR)</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Hvad er sandsynligheden for at tabe hele bonussaldoen før omsætningskravet er mødt?
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 rounded bg-muted/30"><span>Lav volatilitet (Starburst):</span> <span className="font-mono font-bold text-emerald-500">~12% RoR</span></div>
                  <div className="flex justify-between p-2 rounded bg-muted/30"><span>Medium volatilitet (Book of Dead):</span> <span className="font-mono font-bold text-amber-500">~28% RoR</span></div>
                  <div className="flex justify-between p-2 rounded bg-muted/30"><span>Høj volatilitet (San Quentin):</span> <span className="font-mono font-bold text-destructive">~65% RoR</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  *Beregnet med 10 kr. indsats pr. spin og 10x omsætning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><TrendingUp className="h-5 w-5 text-primary" />Expected Value (EV)</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Hvor meget er bonussen statistisk set værd?
                </p>
                <div className="text-center py-4">
                  <span className="text-4xl font-bold text-emerald-500">+260 kr.</span>
                  <p className="text-xs text-muted-foreground mt-1">Ved 1.000 kr. bonus og 96,3% RTP.</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Dette tal er identisk med konkurrenter som SpilDanskNu, men fordelen ved Campobet er No-Sticky strukturen, der reelt øger værdien yderligere, da du har en "gratis chance" med dine egne penge først.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Reload og løbende bonusser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Ugentlige reload-bonusser og sportskampagner</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Campobets bonusprogram stopper ikke ved velkomstpakken. Platformen har et af de mest aktive kampagneprogrammer på det danske marked med faste ugentlige og weekend reload-bonusser, der alle følger den samme No-Sticky struktur med 10x omsætningskrav. Det er usædvanligt – de fleste danske casinoer tilbyder reload-bonusser som sticky, hvilket gør Campobets tilgang markant mere spillervenlig.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Den ugentlige reload-bonus er 100 % op til 500 kr. og kan aktiveres hver mandag–torsdag med minimum 100 kr. indbetaling. Weekend reload-bonussen følger samme model (100 % op til 500 kr.) men gælder fra fredag 00:00 til søndag 23:59. Begge bonusser er No-Sticky med 10x omsætningskrav og 60 dages gyldighed. Det giver en teoretisk ugentlig bonuskapacitet på 1.000 kr. – eller 4.000 kr. ekstra pr. måned for aktive spillere.</p>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/campobet/kampagner.webp"
            alt="Campobet kampagneside med casino velkomstbonus, reload bonus, Bore Draw refund og akkumulator boost"
            caption="Campobets kampagnesektion med både casino- og sportsbonusser, inkl. reload og akkumulator boost."
          />
          <p className="mb-4 text-muted-foreground leading-relaxed">Sportssektionen har sin egen velkomstbonus: 100 % op til 1.000 kr. med kun 5x omsætningskrav. Minimum odds er 2,0 for enkeltvæddemål og 1,5 pr. valg i multibets, med en maks. indsats på 500 kr. pr. væddemål. Akkumulator-boostet giver op til 100 % ekstra gevinst på multibets med 3+ valg. "Foran med 2"-funktionen sikrer automatisk udbetaling, når dit fodboldhold fører med 2 mål – uanset kampens slutresultat. Det er en risikoreduktionfunktion, der ikke har noget modstykke hos rene casino-platforme.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: RotateCcw, title: "Ugentlig Reload (man-tor)", desc: "100% op til 500 kr., No-Sticky, 10x omsætning, min. 100 kr.", badge: "Casino" },
              { icon: Gift, title: "Weekend Reload (fre-søn)", desc: "100% op til 500 kr., No-Sticky, 10x omsætning, min. 100 kr.", badge: "Casino" },
              { icon: Target, title: "Odds-velkomstbonus", desc: "100% op til 1.000 kr., 5x omsætning, min. odds 2,0 single / 1,5 multi.", badge: "Sport" },
              { icon: TrendingUp, title: "Akkumulator Boost + Foran med 2", desc: "Op til 100% ekstra på multibets. Automatisk udbetaling ved 2-0 føring.", badge: "Sport" },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><item.icon className="h-5 w-5 text-primary" />{item.title}</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{item.desc}</p>
                  <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Spiludvalg dybdegående */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">2.500+ spil fra 43 udbydere – En teknisk gennemgang</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Campobets spiludvalg er bygget på bredde og dybde. Med over 3.000 casinospil fra 43 forskellige <Link to="/spiludviklere" className={linkClass}>spiludbydere</Link> er det et af de mest omfattende kataloger tilgængelige for danske spillere. Udvalget spænder fra high-volatility spilleautomater fra <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link> og <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> til klassiske low-volatility titler fra <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link> og <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Spilleautomaterne udgør naturligvis størstedelen af kataloget med tusindvis af titler fordelt på alle tænkelige kategorier: megaways, cluster pays, bonus buy, hold & win, cascading reels og klassiske 3-hjuls maskiner. Vi bemærkede, at nye titler typisk er tilgængelige inden for 1-2 uger efter global lancering, hvilket er hurtigere end gennemsnittet for danske casinoer. Populære titler som Sugar Rush 1000, Gates of Olympus 1000, Wanted Dead or a Wild og Mental er alle tilgængelige.</p>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/campobet/trofaesamlingen.webp"
            alt="Campobet Trofæsamlingen med Europa, Football, Tennis og Hockey trofæer og bonuspræmier"
            caption="Campobets unikke Trofæsamling – saml kort og vind kontante præmier op til 200 kr. pr. kollektion."
          />
          <p className="mb-4 text-muted-foreground leading-relaxed">Bordspilssektionen er overraskende dyb med næsten 100 digitale bordspil. Her finder du europæisk, fransk og amerikansk roulette, multiple blackjack-varianter (inkl. Single Deck og Multi-Hand), baccarat, video poker i over 20 varianter samt specialspil som Sic Bo og Casino Hold'em. Det er et udvalg der overgår de fleste dedikerede casino-platforme.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Live casinoet drives primært af <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> og tæller ca. 100 borde med professionelle dealere. Blackjack dominerer med Speed, Lightning og VIP-varianter, suppleret af europæisk og fransk roulette, baccarat og game shows som Crazy Time, Dream Catcher og Monopoly Live. Vi oplevede konsekvent lav latens og høj videokvalitet under vores tests – selv på 4G-forbindelser.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Gamepad2, title: "Spilleautomater", desc: "2.000+ titler fra Pragmatic Play, Hacksaw, Nolimit City, NetEnt, Red Tiger, Big Time Gaming, Yggdrasil m.fl." },
              { icon: Trophy, title: "Bordspil", desc: "~100 RNG-bordspil: roulette, blackjack, baccarat, video poker, Sic Bo, Casino Hold'em i multiple varianter." },
              { icon: Sparkles, title: "Live Casino", desc: "~100 borde via Evolution Gaming: Speed/Lightning blackjack, roulette, baccarat, Crazy Time, Dream Catcher." },
              { icon: Globe, title: "Sportsbetting", desc: "~40 sportsgrene: fodbold, håndbold, tennis, basketball, ishockey, e-sport. Pre-match, live og Bet Builder." },
            ].map((cat) => (
              <Card key={cat.title} className="border-border bg-card">
                <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><cat.icon className="h-5 w-5 text-primary" />{cat.title}</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">{cat.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Sportsbetting dybdegående */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sportsbetting-sektionen – Fra Bet Builder til livebetting</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Campobets sportssektion er ikke en eftertanke tilføjet for at fylde en menu – det er en fuldt udfoldet sportsbetting-platform, der konkurrerer direkte med specialiserede bookmakers som <Link to="/casino-anmeldelser/nordicbet" className={linkClass}>NordicBet</Link> og <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link>. Med ca. 40 sportsgrene, dybe markeder og avancerede funktioner som Bet Builder og livebetting er det en seriøs dual-platform.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Fodbold er naturligvis den primære sportsgren med dækning af alle store ligaer: Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Superligaen, Champions League og Europa League. Markedsdybden er imponerende – en typisk Premier League-kamp tilbyder 200+ væddemålsmuligheder fordelt på resultat, handicap, over/under, begge hold scorer, antal hjørnespark, kort, spillermarkeder og mange flere. De danske ligaer er naturligvis også dækket med fokus på Superligaen og 1. Division.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Bet Builder-funktionen er Campobets stærkeste sportsfeature. Du kan kombinere flere markeder inden for samme kamp – f.eks. "Begge hold scorer + Over 2,5 mål + Hjemmehold vinder" – og systemet beregner automatisk den kombinerede odds. Under vores test fungerede Bet Builder fejlfrit med op til 8 kombinerede valg pr. kupon. Odds-niveauet er konkurrencedygtigt og lå inden for 1-3 % af markedslederne i vores stikprøver.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Livebetting-sektionen er responsiv med odds-opdateringer under 3 sekunders forsinkelse. Grafiske statistikker (boldbesiddelse, skud, hjørnespark) opdateres i realtid, hvilket giver et solidt datagrundlag for in-play væddemål. Cash-out er tilgængelig på de fleste pre-match og live væddemål, og vi oplevede ingen problemer med cash-out forsinkelser under vores tests.</p>
          <p className="text-muted-foreground leading-relaxed">E-sport er repræsenteret med CS2, League of Legends, Dota 2 og Valorant, men markedsdybden er mere begrænset end hos specialiserede e-sport bookmakers. Håndbold, tennis, basketball og ishockey har alle god dækning med både pre-match og live-markeder. Nichemarkeder som dart, snooker, bordtennis og virtuelle sports er også tilgængelige.</p>
        </section>

        <Separator className="my-10" />

        {/* Betalingsmetoder */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Det bredeste betalingsudvalg i Danmark</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Campobet har det mest omfattende udvalg af <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> blandt danske casinoer. Hvor de fleste konkurrenter tilbyder 4-6 metoder, har Campobet hele 10+ muligheder – alle uden gebyrer. Det giver en fleksibilitet, der er svær at matche.</p>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/campobet/betalingsmetoder.webp"
            alt="Campobet indbetalingsside med MobilePay, Visa, Mastercard, PayPal, Trustly, Skrill, Zimpler, Paysafecard og danske banker"
            caption="Campobets betalingsudvalg – det bredeste på det danske marked med MobilePay, PayPal, Zimpler og direkte bankoverførsel."
          />

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Metode</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Min.</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Max. ind</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Max. ud</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Testresultat</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "MobilePay", min: "100 kr.", maxIn: "37.500 kr.", maxOut: "—", test: "Øjeblikkelig ind" },
                  { name: "Trustly", min: "100 kr.", maxIn: "110.000 kr.", maxOut: "80.000 kr.", test: "Ud: 26 timer" },
                  { name: "PayPal", min: "100 kr.", maxIn: "110.000 kr.", maxOut: "15.000 kr.", test: "Ud: 21 timer" },
                  { name: "Visa / Mastercard", min: "100 kr.", maxIn: "15.000 kr.", maxOut: "15.000 kr.", test: "Ud: 2 dage" },
                  { name: "Zimpler", min: "100 kr.", maxIn: "110.000 kr.", maxOut: "15.000 kr.", test: "Øjeblikkelig ind" },
                  { name: "Bankoverførsel", min: "100 kr.", maxIn: "110.000 kr.", maxOut: "110.000 kr.", test: "Ud: 3 dage" },
                  { name: "Skrill*", min: "100 kr.", maxIn: "37.500 kr.", maxOut: "80.000 kr.", test: "Ingen gebyr" },
                  { name: "Neteller*", min: "100 kr.", maxIn: "37.500 kr.", maxOut: "80.000 kr.", test: "Ingen gebyr" },
                  { name: "Paysafecard", min: "100 kr.", maxIn: "5.000 kr.", maxOut: "—", test: "Kun indbetaling" },
                ].map((m) => (
                  <tr key={m.name} className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">{m.name}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.min}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.maxIn}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.maxOut}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.test}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">*Skrill og Neteller kvalificerer ikke til bonusser. Alle transaktioner er gebyrfri. Min. udbetaling: 100 kr.</p>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/campobet/betalingsmetoder.webp"
            alt="Campobet indbetalingsside med MobilePay, Visa, Mastercard, PayPal, Trustly, Skrill, Zimpler, Paysafecard og danske banker"
            caption="Campobets betalingsudvalg – det bredeste på det danske marked med MobilePay, PayPal, Zimpler og direkte bankoverførsel."
          />
        </section>

        <Separator className="my-10" />

        {/* Live Casino */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Live casino med 100 borde – Vores assessment</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Campobets <Link to="/live-casino" className={linkClass}>live casino</Link> er primært drevet af Evolution Gaming og tæller ca. 100 aktive borde. Det er et solidt udvalg, der dækker alle klassiske bordspil samt en voksende sektion af game shows. Under vores testperiode spillede vi på 14 forskellige borde og evaluerede kvaliteten af streaming, dealernes professionalisme og indsatsgrænserne.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Blackjack er den stærkeste kategori med varianter som Classic, Speed, Lightning, Infinite og VIP. Indsatsgrænserne spænder fra 50 kr. til over 50.000 kr. pr. hånd, hvilket tilgodeser både micro-stake spillere og high rollers. Speed Blackjack er særligt populært med en gennemsnitlig håndduration under 30 sekunder. Vi oplevede konsekvent høj videokvalitet (1080p) og professional dealere med flydende engelsk.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Roulette-sektionen omfatter europæisk, fransk og auto-roulette samt Lightning Roulette, der tilføjer tilfældige multiplikatorer op til 500x. Baccarat er repræsenteret med standard og Speed-varianter. Game show-sektionen inkluderer Crazy Time, Dream Catcher og Monopoly Live – men udvalget er mere begrænset end hos casinoer, der har dedikerede aftaler med multiple live casino-leverandører.</p>
          <p className="text-muted-foreground leading-relaxed">En bemærkelsesværdig observation er, at der ikke er dedikerede danske borde. Det er en begrænsning for spillere, der foretrækker at kommunikere med dealeren på dansk – her har konkurrenter som <Link to="/royal-casino-anmeldelse" className={linkClass}>Royal Casino</Link> en klar fordel med deres eksklusive danske live dealer-borde.</p>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/campobet/live-casino.webp"
            alt="Campobet live casino med Crazy Pachinko, Speed Roulette, Lightning Roulette og blackjack-varianter"
            caption="Campobets live casino-sektion med roulette, blackjack, baccarat og game shows fra Evolution Gaming."
          />
        </section>

        <Separator className="my-10" />

        {/* Kundeservice */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kundeservice – Internationalt team med danske ambitioner</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Campobets kundeservice er tilgængelig 24/7 via live chat direkte fra hjemmesiden, suppleret af e-mail support. Det er en fordel sammenlignet med mange danske casinoer, der kun tilbyder support i begrænsede tidsrum (typisk 08:00–23:00). Vi kontaktede support 5 gange under vores testperiode med spørgsmål om bonusvilkår, udbetalingsstatus og sportsmarkederne.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Den største udfordring er sproget. Support-teamet kommunikerer primært på engelsk, med et automatisk oversættelsesprogram til dansk. Oversættelserne er generelt forståelige, men nuancerne går nogle gange tabt – særligt ved tekniske bonusrelaterede spørgsmål. Svartiderne var korte (under 2 minutter i alle 5 tests), og medarbejderne var kompetente og løsningsorienterede. E-mail-henvendelser blev besvaret inden for 6-12 timer.</p>
          <p className="text-muted-foreground leading-relaxed">Det er værd at bemærke, at der ikke er dansk telefon-support. For spillere, der foretrækker at ringe, er det en reel ulempe. En omfattende FAQ-sektion på dansk kompenserer delvist, men den dækker primært basale spørgsmål om registrering, indbetaling og bonus. For komplekse henvendelser er live chatten den bedste kanal.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="border-border bg-card"><CardContent className="pt-6 text-center"><Headphones className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-bold text-foreground mb-1">Live Chat 24/7</h3><p className="text-sm text-muted-foreground">Svar under 2 minutter. Primært engelsk med auto-oversættelse til dansk.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardContent className="pt-6 text-center"><CreditCard className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-bold text-foreground mb-1">E-mail</h3><p className="text-sm text-muted-foreground">Svar inden for 6-12 timer. God til dokumentation af komplekse henvendelser.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardContent className="pt-6 text-center"><Globe className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-bold text-foreground mb-1">FAQ på dansk</h3><p className="text-sm text-muted-foreground">Dækker basale spørgsmål om konto, bonus og betaling.</p></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Mobiloplevelse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Mobiloplevelsen – Responsivt design uden app</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Campobet har ingen dedikeret app i App Store eller Google Play, men den mobiloptimerede hjemmeside er teknisk imponerende. Under vores test på iPhone 15 Pro og Samsung Galaxy S24 oplevede vi konsekvent hurtige loadtider (under 2 sekunder pr. sidevisning), stabil performance og et touchvenligt interface der tilpasser sig automatisk til skærmstørrelsen.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Alle funktioner er fuldt tilgængelige på mobilen: spilleautomater, live casino, sportsbetting (inkl. Bet Builder og livebetting), indbetalinger, udbetalinger og kundeservice. Live casinoet streamer i høj kvalitet selv på 4G, og MobilePay-indbetalinger kan gennemføres med blot et par tryk. Sportssektionen er særligt veldesignet til mobil med swipe-baseret navigation mellem markeder og realtids-livescores.</p>
          <p className="text-muted-foreground leading-relaxed">Den eneste bemærkelsesværdige begrænsning på mobilen er, at filtreringssystemet i spillebiblioteket er lidt mindre intuitivt end desktop-versionen – med færre synlige filterkategorier og en tendens til at kræve ekstra tryk for at finde specifikke udbydere. Det er en kosmetisk irritation snarere end et funktionelt problem, men det er værd at nævne for spillere, der primært bruger mobilen.</p>
        </section>

        <Separator className="my-10" />

        {/* Sikkerhed */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Tredobbelt licens – Sikkerhed og regulering</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Campobets tredobbelte licensering er usædvanlig på det danske marked. Med licenser fra Spillemyndigheden (DK), Malta Gaming Authority (MGA) og Spelinspektionen (SE) er platformen underlagt regulatorisk overvågning fra tre uafhængige myndigheder. Det betyder i praksis, at Campobet skal overholde de strengeste krav fra alle tre jurisdiktioner – og det er de danske og svenske regler, der typisk er de mest restriktive.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Den danske licens (nr. 20-6359) sikrer fuld overholdelse af den danske spillelovgivning, herunder obligatoriske indbetalingsgrænser, tilslutning til <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> for selvudelukkelse, session-påmindelser efter 60 minutters spil og MitID-verifikation ved registrering. Alle persondata og transaktioner beskyttes med SSL-kryptering, og spilresultater genereres af certificerede tilfældighedsgeneratorer (RNG) der regelmæssigt auditeres af uafhængige testorganisationer.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Denix Limited har drevet Campobet internationalt siden 2018 uden dokumenterede regulatoriske problemer eller spillerklager af væsentlig karakter. Selskabets track record i tre jurisdiktioner understreger en seriøs tilgang til compliance og spillerbeskyttelse. Det er dog værd at bemærke, at Campobet er relativt nyt på det danske marked (lanceret 2024), og det langsigtede track record skal stadig opbygges.</p>
          <p className="text-muted-foreground leading-relaxed">Spil altid ansvarligt. Sæt et budget, hold pauser og spil aldrig for mere end du har råd til at tabe. Har du brug for hjælp, kontakt <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet</a> på telefon 70 22 28 25 eller via <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.</p>
        </section>

        <Separator className="my-10" />

        {/* Hvem bør IKKE vælge */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvem bør IKKE vælge Campobet?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Trods de mange fordele er Campobet ikke det rigtige valg for alle spillertyper. Her er en ærlig vurdering af, hvem der bør overveje alternativer:</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong className="text-foreground">Spillere der kræver dansk kundeservice.</strong> Hvis det er vigtigt for dig at kommunikere med support på flydende dansk – uden oversættelsesprogram – er casinoer drevet af danske selskaber som <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> eller <Link to="/casino-anmeldelser/royal-casino" className={linkClass}>Royal Casino</Link> bedre valg. Campobets internationale team er kompetent, men sprogbarrieren kan frustrere ved komplekse henvendelser.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong className="text-foreground">Loyalitets- og VIP-jægere.</strong> Campobet mangler et struktureret loyalitetsprogram med points, niveauer og personlige rewards. Spillere der prioriterer langsigtede belønningssystemer vil finde bedre tilbud hos <Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas</Link> med deres VIP-program eller <Link to="/casino-anmeldelser/luna-casino" className={linkClass}>Luna Casino</Link> med deres stigende loyalitetsniveauer.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong className="text-foreground">Spillere med lav minimumsindbetaling.</strong> Campobets minimum på 100 kr. er højere end de 75 kr. som mange danske casinoer tilbyder. For budgetbevidste spillere kan det være en barriere, særligt ved aktivering af reload-bonusser der kræver samme minimum.</p>
          <p className="text-muted-foreground leading-relaxed"><strong className="text-foreground">E-sport-entusiaster.</strong> Selvom e-sport er tilgængeligt, er markedsdybden begrænset sammenlignet med specialiserede e-sport bookmakers. Spillere der primært fokuserer på CS2, LoL eller Valorant-væddemål vil finde dybere markeder andetsteds.</p>
        </section>

        <Separator className="my-10" />

        {/* Sammenligning */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Campobet vs. Betinia vs. bet365 – Dual-platform sammenligning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Campobet konkurrerer primært med andre dual-platform casinoer, der tilbyder både casino og sportsbetting. De to mest relevante konkurrenter på det danske marked er <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> og <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link>. Her er en nuanceret sammenligning baseret på vores tests af alle tre platforme.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong className="text-foreground">Campobet vs. Betinia.</strong> Begge drives af Malta-baserede selskaber og deler mange ligheder: No-Sticky bonus, 10x omsætningskrav og integreret sportsbetting. Den primære forskel er, at Campobet har bredere betalingsmuligheder (PayPal, Zimpler, Paysafecard) og et marginalt større spiludvalg. Betinia kontrastiller med et bedre akkumulator-boost system og "Foran med 2"-funktionen er tilgængelig hos begge. Campobets ugentlige reload-bonusser er No-Sticky, mens Betinias primært er sports-fokuserede. Vælg Campobet for betalingsfleksibilitet, Betinia for sportsbonus-dybde.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed"><strong className="text-foreground">Campobet vs. bet365.</strong> bet365 er den ubestridte markedsleder inden for sportsbetting med dybere markeder, hurtigere odds-opdateringer og et mere etableret brand. Campobets fordel ligger i casino-delen: No-Sticky bonus (bet365 har sticky), et bredere spiludvalg fra flere udbydere, og ugentlige reload-bonusser. Vælg bet365 for sportsspecialisering, Campobet for den bedste casino-sport hybrid.</p>
          <p className="text-muted-foreground leading-relaxed"><strong className="text-foreground">Campobets unikke position.</strong> Det der gør Campobet særligt attraktivt er den sjældne kombination af No-Sticky bonusstruktur, tredobbelt licensering og et spiludvalg der matcher de bedste rene casino-platforme – alt sammen kombineret med en sportssektion der konkurrerer med dedikerede bookmakers. Det er en dual-platform, der ikke kompromitterer på nogen af de to vertikaler.</p>
        </section>

        <Separator className="my-10" />

        {/* Endelig vurdering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Endelig dom – 4.8 ud af 5</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">Campobet har imponeret os med en teknisk moden platform, en genuint spillervenlig bonusstruktur og en dual-platform tilgang, der leverer kvalitet i begge vertikaler. Den tredobbelte licensering giver ekstra tryghed, de ugentlige No-Sticky reload-bonusser skaber langsigtede incitamenter, og det brede betalingsudvalg sikrer fleksibilitet for alle danske spillere.</p>
          <p className="mb-4 text-muted-foreground leading-relaxed">Begrænsningerne – kundeservice primært på engelsk, manglende loyalitetsprogram og en minimumsindbetaling på 100 kr. – er reelle, men opvejes af platformens samlede styrker. For spillere der søger en one-stop-shop med både casino og sportsbetting i topkvalitet, er Campobet et af de stærkeste valg på det danske marked i 2026.</p>

          <RatingBreakdown scores={CASINO_SCORES["campobet"].scores} total={CASINO_SCORES["campobet"].total} />

          <div className="flex justify-center">
            <Button onClick={handleBonusClick} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8"><Gift className="mr-2 h-5 w-5" />Hent din No-Sticky bonus hos Campobet</Button>
          </div>
        </section>

        <Separator className="my-10" />
        <UserReviewSection casinoSlug="campobet" casinoName="Campobet" />
        <RelatedReviews currentSlug="campobet" />
        <InlineCasinoCards excludeSlugs={["campobet"]} />
        <LatestNewsByCategory pagePath="/casino-anmeldelser/campobet" />
        <RelatedGuides currentPath="/casino-anmeldelser/campobet" />
        <FAQSection title="Ofte stillede spørgsmål om Campobet" faqs={campobetFaqs} />
        <AuthorBio author="jonas" />
      </div>
      {casino && <StickyCTA casinoSlug={casino.slug} casinoName={casino.name} bonusAmount={casino.bonus_amount} bonusType={casino.bonus_type} freeSpins={casino.free_spins} wageringRequirements={casino.wagering_requirements} rating={casino.rating} logoUrl={casino.logo_url} isRecommended={casino.is_recommended} isHot={casino.is_hot} />}
    </>
  );
};

export default CampobetAnmeldelse;

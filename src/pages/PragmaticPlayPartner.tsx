import { Link } from "react-router-dom";
import pragmaticPlayLogo from "@/assets/providers/pragmatic-play-logo-transparent.png";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { AuthorBio } from "@/components/AuthorBio";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Scale,
  Search,
  Eye,
  BarChart3,
  Star,
  Trophy,
  Gamepad2,
  Sparkles,
  Globe,
  FileCheck,
  Users,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";

const partnerFaqs = [
  {
    question: "Hvad betyder det, at Casinoaftaler er officiel partner med Pragmatic Play?",
    answer: "Det betyder, at vi har en direkte aftale med Pragmatic Play, som giver os adgang til tidlig information om nye spil, teknisk dokumentation og direkte kontakt til deres team. Det styrker kvaliteten af vores anmeldelser og guides, men påvirker ikke vores redaktionelle vurderinger.",
  },
  {
    question: "Påvirker partnerskabet jeres anmeldelser af Pragmatic Play spil?",
    answer: "Nej. Vores redaktionelle linje er fuldstændig uafhængig af kommercielle samarbejder. Alle Pragmatic Play spil vurderes efter de samme kriterier som spil fra enhver anden udbyder – herunder RTP, volatilitet, gameplay og brugeroplevelse. Læs mere i vores redaktionelle politik.",
  },
  {
    question: "Hvilke Pragmatic Play spil anbefaler I mest?",
    answer: "Blandt de mest populære Pragmatic Play spil i vores testdata er Sweet Bonanza, Gates of Olympus, Big Bass Bonanza, The Dog House Megaways og Sugar Rush. Alle er testet med hundredvis af sessioner og dokumenteret i vores slot-katalog.",
  },
  {
    question: "Har I adgang til eksklusive data fra Pragmatic Play?",
    answer: "Ja, partnerskabet giver os adgang til officielle RTP-specifikationer, volatilitetsklassifikationer og teknisk dokumentation, som vi bruger til at validere vores egne testresultater. Det sikrer, at vores data er så præcise som muligt.",
  },
  {
    question: "Hvor kan jeg finde alle Pragmatic Play spil på Casinoaftaler?",
    answer: "Du kan finde en komplet oversigt over alle Pragmatic Play spillemaskiner på vores dedikerede Pragmatic Play slot hub, hvor du også kan se RTP, volatilitet og vores testresultater for hvert enkelt spil.",
  },
  {
    question: "Kan jeg stole på jeres vurderinger, når I har et kommercielt samarbejde?",
    answer: "Ja. Vi adskiller altid redaktionelt indhold fra kommercielle relationer. Vores forretningsmodel er transparent – vi tjener penge via affiliate-links, men vores ratings, test og anbefalinger er baseret udelukkende på data og reel gameplay-test. Det er dokumenteret i vores forretningsmodel.",
  },
];

const PragmaticPlayPartner = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const articleJsonLd = buildArticleSchema({
    headline: "Officiel Pragmatic Play Partner – Casinoaftaler.dk",
    description: "Casinoaftaler.dk er officiel affiliate partner med Pragmatic Play. Læs om partnerskabet, hvad det betyder for vores brugere, og hvordan vi tester Pragmatic Play spil.",
    url: `${SITE_URL}/pragmatic-play-partner`,
    datePublished: "2026-03-20",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
    about: [
      { "@type": "Organization", name: "Pragmatic Play", url: "https://www.pragmaticplay.com/" },
      { "@type": "Thing", name: "iGaming Partnerskab" },
    ],
  });

  const faqJsonLd = buildFaqSchema(partnerFaqs);

  return (
    <>
      <SEO
        title="Officiel Pragmatic Play Partner | Casinoaftaler"
        description="Casinoaftaler.dk er officiel affiliate partner med Pragmatic Play – verdens største spiludvikler. Læs om partnerskabet og hvad det betyder for dig."
        jsonLd={[articleJsonLd, faqJsonLd]}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 18% / 0.97), hsl(210 80% 22% / 0.95)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 18%), hsl(250 60% 15%) 40%, hsl(210 80% 20%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Award className="mr-1.5 h-3.5 w-3.5" />
              Officiel Partner
            </Badge>
            <div className="mb-6 flex justify-center">
              <img
                src={pragmaticPlayLogo}
                alt="Pragmatic Play logo"
                className="h-12 w-auto brightness-0 invert md:h-16"
                width={200}
                height={64}
              />
            </div>
            <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl" style={{ lineHeight: "1.1" }}>
              Officiel Pragmatic Play Partner
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/80">
              Casinoaftaler.dk er stolt officiel affiliate partner med Pragmatic Play – verdens førende spiludvikler med over 250 spillemaskiner og tilstedeværelse på det danske marked.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="20 min" />

        {/* ═══════════════════════════════════════════════════════════
            PARTNERSKABS-BEVIS (trust signal – højt placeret)
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div className="flex shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-background p-4">
              <img
                src={pragmaticPlayLogo}
                alt="Pragmatic Play officielt partner-logo"
                className="h-12 w-auto dark:brightness-0 dark:invert md:h-14"
                width={180}
                height={56}
              />
            </div>
            <div className="text-center md:text-left">
              <div className="mb-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <Badge variant="default" className="bg-green-600 text-white hover:bg-green-700">
                  <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                  Verificeret samarbejde
                </Badge>
                <Badge variant="outline" className="border-primary/30 text-primary">
                  <Award className="mr-1.5 h-3.5 w-3.5" />
                  Officiel Partner
                </Badge>
              </div>
              <h2 className="mb-2 text-xl font-bold md:text-2xl">Officielt samarbejde med Pragmatic Play</h2>
              <p className="text-muted-foreground">
                <strong>Casinoaftaler.dk er officielt listet som affiliate-partner hos Pragmatic Play.</strong>{" "}
                Det betyder, at vi har en direkte relation til en af verdens største spiludviklere, med adgang til officiel teknisk dokumentation, tidlig information om nye udgivelser og direkte kontakt til deres team. Partnerskabet er et tillidstegn, der understreger Casinoaftalers position som en seriøs aktør i det danske iGaming-landskab.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Officiel partner
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Direkte relation til spiludvikler
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Verificeret samarbejde
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEKTION 1: INTRODUKTION – HVAD PARTNERSKABET BETYDER
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Hvad betyder partnerskabet med Pragmatic Play?</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              I marts 2026 blev Casinoaftaler.dk officiel affiliate partner med <strong>Pragmatic Play</strong> – en af verdens absolut største og mest anerkendte spiludviklere inden for iGaming-industrien. Partnerskabet er et direkte resultat af vores redaktionelle arbejde med at teste, analysere og dokumentere online casinospil for det danske marked.
            </p>
            <p>
              For Casinoaftaler betyder partnerskabet, at vi nu har <strong>direkte adgang til Pragmatic Plays team</strong>, deres tekniske dokumentation og tidlig information om kommende spiludgivelser. Det giver os mulighed for at levere endnu mere præcise og dybdegående anmeldelser af Pragmatic Play spillemaskiner til vores brugere.
            </p>
            <p>
              Partnerskabet ændrer <em>ikke</em> vores redaktionelle uafhængighed. Vores vurderinger, ratings og anbefalinger er udelukkende baseret på data fra reel gameplay-test, RTP-analyse og brugeroplevelse. Det har altid været fundamentet for Casinoaftaler, og det forbliver det. Læs mere om vores principper i vores{" "}
              <Link to="/redaktionel-politik" className="text-primary hover:underline">redaktionelle politik</Link>.
            </p>
            <p>
              At være officiel partner med en udbyder af Pragmatic Plays kaliber er et tillidstegn, der understreger, at Casinoaftaler anses som en seriøs og troværdig aktør i det danske iGaming-landskab. Det placerer os i selskab med andre etablerede affiliates og medier, der har opbygget deres platforme over mange års dedikeret arbejde.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEKTION 2: HVORFOR PRAGMATIC PLAY?
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Hvorfor Pragmatic Play er en vigtig partner</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Pragmatic Play er ikke bare en blandt mange spiludviklere – de er en af de absolut dominerende kræfter i den globale iGaming-industri. Med hovedkvarter på Malta og kontorer i flere lande leverer Pragmatic Play spil til over <strong>500 operatører</strong> i mere end <strong>200 markeder</strong> verden over.
            </p>
            <p>
              Deres portefølje omfatter over <strong>250 spillemaskiner</strong>, et fuldt live casino-produkt drevet af deres eget studio, samt bingo og virtual sports. Pragmatic Play udgiver typisk <strong>6-8 nye spillemaskiner hver måned</strong>, hvilket gør dem til en af de mest produktive udviklere i branchen.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Gamepad2, label: "250+ spillemaskiner", desc: "En af branchens største kataloger" },
              { icon: Globe, label: "200+ markeder", desc: "Global tilstedeværelse inkl. Danmark" },
              { icon: Zap, label: "6-8 nye spil/måned", desc: "Konstant innovation og nye udgivelser" },
              { icon: Trophy, label: "Talrige branchempriser", desc: "Anerkendt for kvalitet og innovation" },
            ].map((item) => (
              <Card key={item.label} className="border-border">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <item.icon className="mb-3 h-8 w-8 text-primary" />
                  <p className="font-semibold">{item.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="prose prose-lg mt-8 max-w-none text-muted-foreground">
            <p>
              På det danske marked er Pragmatic Play særligt relevant, fordi deres spil er tilgængelige hos stort set alle{" "}
              <Link to="/top-10-casino-online" className="text-primary hover:underline">de bedste online casinoer</Link>{" "}
              med dansk licens. Titler som Sweet Bonanza, Gates of Olympus og Big Bass Bonanza er blandt de mest spillede spillemaskiner hos danske spillere, og deres live casino-produkter vinder stadigt større markedsandel.
            </p>
            <p>
              Pragmatic Plays succes bygger på en kombination af høj produktionskvalitet, innovative gameplay-mekanikker og en konstant strøm af nye udgivelser. Deres Tumble-mekanik (kendt fra Sweet Bonanza) og Multiplier-system (fra Gates of Olympus) har sat standarden for, hvad spillere forventer af moderne spillemaskiner. Du kan læse vores dybdegående guide om{" "}
              <Link to="/spiludviklere/pragmatic-play" className="text-primary hover:underline">Pragmatic Play som spiludvikler</Link>{" "}
              for en komplet gennemgang af deres historie, teknologi og spilkatalog.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEKTION 3: HVAD PARTNERSKABET GIVER VORES BRUGERE
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Hvad partnerskabet giver dig som bruger</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Partnerskabet med Pragmatic Play er ikke bare et logo i vores footer – det har konkrete fordele for dig som bruger af Casinoaftaler. Her er hvad det betyder i praksis:
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Eye,
                title: "Tidlig adgang til nye spil",
                desc: "Vi modtager information om nye Pragmatic Play udgivelser før den generelle offentliggørelse. Det betyder, at vi kan have anmeldelser og guides klar, når et nyt spil lanceres – ikke uger efter.",
              },
              {
                icon: BarChart3,
                title: "Dybere testdata",
                desc: "Adgang til officiel teknisk dokumentation giver os mulighed for at validere vores egne RTP- og volatilitetstest mod Pragmatic Plays egne specifikationer. Det sikrer, at vores data er så præcise som muligt.",
              },
              {
                icon: Users,
                title: "Direkte kontakt til udviklerteam",
                desc: "Ved spørgsmål om specifikke spilmekanikker, bonus-features eller tekniske detaljer kan vi henvende os direkte til Pragmatic Plays team for at få verificeret information.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border">
                <CardContent className="p-6">
                  <item.icon className="mb-3 h-7 w-7 text-primary" />
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="prose prose-lg mt-8 max-w-none text-muted-foreground">
            <p>
              Disse fordele oversættes direkte til bedre indhold for dig. Når vi skriver om en ny Pragmatic Play spillemaskine, kan vi levere mere præcise RTP-data, bedre forklaringer af bonus-mekanikker og mere informerede anbefalinger – fordi vi har adgang til den tekniske dokumentation direkte fra kilden.
            </p>
            <p>
              Det gælder også for vores{" "}
              <Link to="/spillemaskiner/pragmatic-play" className="text-primary hover:underline">Pragmatic Play slot hub</Link>, hvor du kan se hele kataloget af Pragmatic Play spillemaskiner med vores testresultater, RTP-data og volatilitetsklassifikationer.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEKTION 4: SÅDAN TESTER VI PRAGMATIC PLAY SPIL
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Badge variant="outline" className="border-green-600/30 text-green-700 dark:text-green-400">
              <ShieldCheck className="mr-1 h-3 w-3" />
              Verificeret af officiel partner
            </Badge>
          </div>
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Sådan tester vi Pragmatic Play spil</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Uanset partnerskab gennemgår alle Pragmatic Play spil den samme grundige testproces som spil fra enhver anden udbyder. Vores testmetode er systematisk, datadrevet og dokumenteret. Du kan læse den fulde metodik i vores guide{" "}
              <Link to="/saadan-tester-vi-casinoer" className="text-primary hover:underline">Sådan tester vi casinoer</Link>.
            </p>
            <p>
              For Pragmatic Play spil specifikt fokuserer vi på følgende områder:
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {[
              {
                icon: Target,
                title: "RTP-verifikation",
                desc: "Vi sammenholder den officielle RTP (Return to Player) med vores egne sessionsdata. For Pragmatic Play spil kan vi nu validere dette mod deres officielle tekniske dokumentation, hvilket giver et ekstra lag af præcision. De fleste Pragmatic Play slots har en standard RTP mellem 96,48% og 96,53%, men mange tilbyder også en Ante Bet-funktion, der ændrer RTP-profilen.",
              },
              {
                icon: BarChart3,
                title: "Volatilitetsanalyse",
                desc: "Pragmatic Play klassificerer selv deres spil på en volatilitetsskala fra 1-5. Vi tester dette i praksis ved at køre hundredvis af spins og dokumentere gevinstfrekvens, tørperioder og gevinstfordelingsmønstre. Spil som Gates of Olympus (volatilitet 5/5) opfører sig markant anderledes end The Dog House (volatilitet 4/5), og den forskel skal være tydeligt kommunikeret.",
              },
              {
                icon: Sparkles,
                title: "Bonus Buy-evaluering",
                desc: "Mange af Pragmatic Plays mest populære spillemaskiner tilbyder Bonus Buy (Feature Drop) – muligheden for at købe direkte adgang til bonus-runden. Vi evaluerer, om Bonus Buy-prisen (typisk 100x indsatsen) giver rimelig værdi sammenlignet med at triggere bonussen organisk. Dette er særligt relevant for Sweet Bonanza, Gates of Olympus og Big Bass serien.",
              },
              {
                icon: Search,
                title: "Sessionstest og dokumentation",
                desc: "Hver spillemaskine testes med minimum 200-500 spins i reelle sessioner. Vi dokumenterer gevinstfrekvens, gennemsnitlig gevinst, bonus-trigger hyppighed og maksimale gevinster. Disse data danner grundlaget for vores anmeldelser og for de statistikker, du kan finde i vores slot-katalog.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                <item.icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="mb-1 font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="prose prose-lg mt-8 max-w-none text-muted-foreground">
            <p>
              Partnerskabet med Pragmatic Play forbedrer denne proces, fordi vi nu kan krydsvalidere vores egne testresultater mod officielle data. Hvis vi observerer en RTP, der afviger fra den officielle specifikation, kan vi kontakte Pragmatic Play direkte for afklaring. Det er et kvalitetssikringsredskab, som ikke-partnere ikke har adgang til.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEKTION 5: POPULÆRE PRAGMATIC PLAY SPIL
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Populære Pragmatic Play spil vi har testet</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Pragmatic Plays katalog rummer over 250 spillemaskiner, men en håndfuld titler har opnået ikonisk status blandt danske spillere. Her er de mest populære Pragmatic Play spil, som vi har testet og dokumenteret grundigt:
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Sweet Bonanza",
                rtp: "96,48%",
                volatility: "Høj (4/5)",
                desc: "Cluster pays med Tumble-mekanik og multiplier-bolsjer. En af de mest spillede slots globalt. Bonus Buy tilgængelig.",
                link: "/slot-katalog/sweet-bonanza",
              },
              {
                title: "Gates of Olympus",
                rtp: "96,50%",
                volatility: "Meget høj (5/5)",
                desc: "Tumble-mekanik med tilfældige multipliers op til 500x. Populær for sit eksplosive gevinstpotentiale.",
                link: "/slot-katalog/gates-of-olympus",
              },
              {
                title: "Big Bass Bonanza",
                rtp: "96,71%",
                volatility: "Høj (4/5)",
                desc: "Fisketema med Fisherman-wild i free spins. Starten på den enormt succesfulde Big Bass-serie.",
                link: "/slot-katalog/big-bass-bonanza",
              },
              {
                title: "The Dog House Megaways",
                rtp: "96,55%",
                volatility: "Høj (4/5)",
                desc: "Megaways-version med sticky wilds og multipliers i free spins. Op til 117.649 gevinstlinjer.",
                link: "/slot-katalog/the-dog-house-megaways",
              },
              {
                title: "Sugar Rush",
                rtp: "96,50%",
                volatility: "Høj (4/5)",
                desc: "Cluster pays med stigende multiplier-positioner. Progressiv multiplier-mekanik i bonus.",
                link: "/slot-katalog/sugar-rush",
              },
              {
                title: "Wild West Gold",
                rtp: "96,51%",
                volatility: "Meget høj (5/5)",
                desc: "Western-tema med sticky wilds og re-spins i free spins. Klassisk Pragmatic Play volatilitet.",
                link: "/slot-katalog/wild-west-gold",
              },
            ].map((slot) => (
              <Link
                key={slot.title}
                to={slot.link}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold group-hover:text-primary">{slot.title}</h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <div className="mb-2 flex gap-3 text-xs text-muted-foreground">
                  <span>RTP: {slot.rtp}</span>
                  <span>Volatilitet: {slot.volatility}</span>
                </div>
                <p className="text-sm text-muted-foreground">{slot.desc}</p>
              </Link>
            ))}
          </div>

          <div className="prose prose-lg mt-8 max-w-none text-muted-foreground">
            <p>
              Se den komplette oversigt over alle Pragmatic Play spillemaskiner i vores{" "}
              <Link to="/spillemaskiner/pragmatic-play" className="text-primary hover:underline">Pragmatic Play slot hub</Link>, hvor du kan filtrere efter RTP, volatilitet og se vores detaljerede testresultater. Du kan også finde dem blandt vores{" "}
              <Link to="/casino-bonus" className="text-primary hover:underline">aktuelle casino bonusser</Link>, der ofte inkluderer free spins på Pragmatic Play-titler.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            MID-CONTENT CTA-BLOK (konverteringsfokus)
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-8">
            <h2 className="mb-2 text-xl font-bold md:text-2xl">Spil Pragmatic Play hos de bedste casinoer</h2>
            <p className="mb-5 text-muted-foreground">
              Find de bedste danske casinoer med det største udvalg af Pragmatic Play spillemaskiner – inkl. bonusser og free spins.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                to="/top-10-casino-online"
                className="group flex items-center justify-between rounded-lg border border-primary/30 bg-primary px-5 py-3.5 font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                <span>Se bedste Pragmatic Play casinoer</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/casino-bonus"
                className="group flex items-center justify-between rounded-lg border border-border bg-background px-5 py-3.5 font-medium text-primary transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <span>Få bonus på Pragmatic Play slots</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/free-spins-i-dag"
                className="group flex items-center justify-between rounded-lg border border-border bg-background px-5 py-3.5 font-medium text-primary transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <span>Spil Pragmatic Play slots med bonus</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEKTION 6: PRAGMATIC PLAYS TEKNISKE STANDARDER
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Badge variant="outline" className="border-green-600/30 text-green-700 dark:text-green-400">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Direkte relation til spiludvikler
            </Badge>
          </div>
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Pragmatic Plays tekniske standarder og licensering</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              En af grundene til, at vi har valgt at indgå partnerskab med Pragmatic Play, er deres høje tekniske standarder og omfattende licensering. Pragmatic Play opererer under nogle af de strengeste regulatoriske rammer i iGaming-industrien:
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Scale,
                title: "Multi-jurisdiktionel licensering",
                desc: "Pragmatic Play er licenseret af Malta Gaming Authority (MGA), UK Gambling Commission (UKGC), Gibraltar Gambling Commissioner og adskillige andre jurisdiktioner. Deres spil er certificerede til brug hos operatører med dansk licens fra Spillemyndigheden.",
              },
              {
                icon: ShieldCheck,
                title: "Uafhængig fairness-certificering",
                desc: "Alle Pragmatic Play spil certificeres af uafhængige testlaboratorier (herunder BMM Testlabs og GLI), der verificerer, at RNG (Random Number Generator) fungerer korrekt, og at de publicerede RTP-værdier er nøjagtige.",
              },
              {
                icon: FileCheck,
                title: "ISO 27001 certificeret",
                desc: "Pragmatic Play er ISO 27001 certificeret, hvilket er den internationale standard for informationssikkerhed. Det sikrer, at spillerdata og transaktioner behandles med det højeste sikkerhedsniveau.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border">
                <CardContent className="p-6">
                  <item.icon className="mb-3 h-7 w-7 text-primary" />
                  <h3 className="mb-2 font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="prose prose-lg mt-8 max-w-none text-muted-foreground">
            <p>
              For danske spillere er det vigtigst at vide, at Pragmatic Play spil er godkendt til brug hos alle casinoer med{" "}
              <Link to="/casino-licenser" className="text-primary hover:underline">dansk spillelicens</Link>. Det betyder, at spillene er underlagt{" "}
              <Link to="/spillemyndigheden" className="text-primary hover:underline">Spillemyndighedens</Link>{" "}
              tilsyn, og at du som spiller er beskyttet af dansk lovgivning, herunder ROFUS-registret og spillegrænsesystemet.
            </p>
            <p>
              Pragmatic Plays tekniske platform er bygget til at håndtere millioner af samtidige spillere og leverer stabil performance på tværs af desktop, tablet og mobil. Deres spil er udviklet i HTML5 og kræver ingen download eller plugin – de kører direkte i browseren hos alle de{" "}
              <Link to="/top-10-casino-online" className="text-primary hover:underline">bedste online casinoer i Danmark</Link>.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEKTION 7: REDAKTIONEL UAFHÆNGIGHED
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-8 w-8 shrink-0 text-primary" />
              <div>
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">Redaktionel uafhængighed – partnerskab ≠ bias</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Det er vigtigt for os at understrege: <strong>et kommercielt partnerskab ændrer ikke vores redaktionelle linje</strong>. Casinoaftaler er bygget på principper om gennemsigtighed, uafhængighed og datadrevet analyse. Disse principper er ikke til forhandling – heller ikke med vores partnere.
                  </p>
                  <p>
                    Konkret betyder det:
                  </p>
                  <ul className="space-y-2">
                    <li><strong>Ratings er uafhængige:</strong> Pragmatic Play spil vurderes efter præcis de samme kriterier som spil fra NetEnt, Play'n GO, Hacksaw Gaming eller enhver anden udbyder.</li>
                    <li><strong>Negative aspekter rapporteres:</strong> Hvis et Pragmatic Play spil har lav RTP, problematiske bonus-mekanikker eller dårlig brugeroplevelse, dokumenterer vi det ligesom med alle andre spil.</li>
                    <li><strong>Anbefalinger er datadrevne:</strong> Vores "bedste spil"-lister baseres udelukkende på testdata, brugervenighed og objektive kriterier – ikke på kommercielle aftaler.</li>
                    <li><strong>Affiliate-links er tydeligt markeret:</strong> Alle partnerlinks på Casinoaftaler er tydeligt markeret i overensstemmelse med dansk lovgivning og god markedsføringsskik.</li>
                  </ul>
                  <p>
                    Du kan læse mere om, hvordan vi finansierer Casinoaftaler, og hvordan vi sikrer redaktionel uafhængighed i vores{" "}
                    <Link to="/forretningsmodel" className="text-primary hover:underline">forretningsmodel</Link>{" "}
                    og{" "}
                    <Link to="/redaktionel-politik" className="text-primary hover:underline">redaktionelle politik</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEKTION 8: PRAGMATIC PLAY I DANSK KONTEKST
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Pragmatic Play hos danske casinoer</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Pragmatic Play er en af de mest udbredte spiludviklere på det danske marked. Deres spil er tilgængelige hos stort set alle licenserede danske online casinoer, og de er konsekvent blandt de mest populære titler hos danske spillere.
            </p>
            <p>
              I vores{" "}
              <Link to="/casino-anmeldelser" className="text-primary hover:underline">casino anmeldelser</Link>{" "}
              dokumenterer vi, hvilke spiludviklere der er tilgængelige hos hvert enkelt casino. Pragmatic Play er typisk repræsenteret med 150-200+ titler hos de større operatører, hvilket afspejler deres position som en af markedets førende leverandører.
            </p>
            <p>
              Nogle af de danske casinoer, der tilbyder det bredeste udvalg af Pragmatic Play spil, inkluderer:
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "LeoVegas", path: "/casino-anmeldelser/leovegas" },
              { name: "Unibet", path: "/casino-anmeldelser/unibet" },
              { name: "bet365", path: "/casino-anmeldelser/bet365" },
              { name: "ComeOn", path: "/casino-anmeldelser/comeon" },
              { name: "Betinia", path: "/casino-anmeldelser/betinia" },
              { name: "Mr Green", path: "/casino-anmeldelser/mr-green" },
            ].map((casino) => (
              <Link
                key={casino.name}
                to={casino.path}
                className="group flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <span className="font-medium group-hover:text-primary">{casino.name}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>

          <div className="prose prose-lg mt-8 max-w-none text-muted-foreground">
            <p>
              Pragmatic Play tilbyder desuden et komplet <Link to="/live-casino" className="text-primary hover:underline">live casino</Link>-produkt, der inkluderer blackjack, roulette, baccarat og game shows – alle streamet fra deres egne studier. Deres live casino-løsning vinder stadigt større markedsandel hos danske operatører og giver et seriøst alternativ til Evolution Gamings dominans i segmentet.
            </p>
            <p>
              Uanset om du foretrækker spillemaskiner, live casino eller begge dele, er Pragmatic Play en udbyder, du næsten uundgåeligt vil støde på, når du spiller hos danske online casinoer. Vores partnerskab sikrer, at vi kan give dig den mest præcise og opdaterede information om deres spil og produkter.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEKTION 9: PARTNERSKABETS FREMTID
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Hvad partnerskabet betyder fremadrettet</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Partnerskabet med Pragmatic Play er ikke en statisk aftale – det er et løbende samarbejde, der udvikler sig i takt med, at både Pragmatic Play og Casinoaftaler vokser. Fremadrettet planlægger vi at udnytte partnerskabet til:
            </p>
            <ul className="space-y-2">
              <li><strong>Hurtigere dækning af nye udgivelser:</strong> Med tidlig adgang til information kan vi have anmeldelser og guides klar ved lanceringsdagen for nye Pragmatic Play spil.</li>
              <li><strong>Dybere tekniske analyser:</strong> Adgang til officiel dokumentation giver os mulighed for at lave mere detaljerede analyser af spilmekanikker, matematiske modeller og gevinstpotentiale.</li>
              <li><strong>Eksklusive indsigter:</strong> Vi forventer at kunne dele eksklusive indsigter om kommende funktioner, nye spilserier og Pragmatic Plays strategi for det danske marked.</li>
              <li><strong>Community-integration:</strong> Vi undersøger muligheder for at integrere Pragmatic Play-indhold i vores community-aktiviteter, herunder bonus hunts og turneringer, hvor Pragmatic Play-titler allerede er blandt de mest populære.</li>
            </ul>
            <p>
              Casinoaftaler er mere end et traditionelt anmeldelsessite – vi er et{" "}
              <Link to="/community" className="text-primary hover:underline">aktivt community</Link>{" "}
              med daglige bonus hunts, live streaming, turneringer og direkte dialog med vores brugere. Partnerskabet med Pragmatic Play styrker vores position som en af de mest troværdige og velunderbyggede casino-platforme i Danmark.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEKTION 10: INTERNE LINKS – CTA
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-12">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-xl font-bold">Udforsk mere om Pragmatic Play</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Pragmatic Play spiludvikler-guide", path: "/spiludviklere/pragmatic-play", icon: BookOpen },
                { label: "Pragmatic Play spillemaskiner", path: "/spillemaskiner/pragmatic-play", icon: Gamepad2 },
                { label: "Bedste online casinoer", path: "/top-10-casino-online", icon: Star },
                { label: "Casino bonusser", path: "/casino-bonus", icon: TrendingUp },
                { label: "Sådan tester vi casinoer", path: "/saadan-tester-vi-casinoer", icon: Search },
                { label: "Vores forretningsmodel", path: "/forretningsmodel", icon: Scale },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 transition-all hover:border-primary/40 hover:shadow-sm"
                >
                  <item.icon className="h-5 w-5 shrink-0 text-primary" />
                  <span className="font-medium group-hover:text-primary">{item.label}</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection title="Spørgsmål om partnerskabet" faqs={partnerFaqs} />

        <LatestNewsByCategory pagePath="/pragmatic-play-partner" />
        <RelatedGuides currentPath="/pragmatic-play-partner" maxLinks={5} />

        <AuthorBio author="jonas" showCommunity={false} />
      </div>
    </>
  );
};

export default PragmaticPlayPartner;

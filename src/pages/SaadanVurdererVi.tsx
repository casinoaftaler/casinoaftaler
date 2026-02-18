import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Gamepad2,
  Shield,
  CreditCard,
  Headphones,
  Smartphone,
  Gift,
  Scale,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import heroImage from "@/assets/heroes/rating-metodologi-hero.jpg";

const ratingKategorier = [
  {
    icon: Gamepad2,
    title: "Spiludvalg",
    vaegt: "20%",
    description: "Antal spil, udbydere, variation og eksklusivitet. Vi vurderer om casinoet tilbyder et bredt udvalg fra anerkendte udbydere som NetEnt, Pragmatic Play og Evolution Gaming.",
    eksempel: "Et casino med 3.000+ spil fra 50+ udbydere scorer 4.5–5.0. Under 500 spil fra få udbydere giver 3.0–3.5.",
  },
  {
    icon: Shield,
    title: "Sikkerhed & Licens",
    vaegt: "20%",
    description: "Dansk licens fra Spillemyndigheden, SSL-kryptering, KYC-processer og ansvarligt spil-værktøjer. Dette er en ufravigelig minimumsstandard.",
    eksempel: "Alle casinoer vi anmelder har dansk licens. Forskellen ligger i kvaliteten af KYC-processen og ansvarligt spil-værktøjerne.",
  },
  {
    icon: Gift,
    title: "Bonusstruktur",
    vaegt: "15%",
    description: "Velkomstbonus, omsætningskrav, bonustype (sticky vs. non-sticky), og løbende kampagner. Vi vægter fair vilkår over store tal.",
    eksempel: "100% op til 1.000 kr. med 10x omsætning scorer højere end 200% op til 5.000 kr. med 50x omsætning.",
  },
  {
    icon: CreditCard,
    title: "Betalingsmetoder & Hastighed",
    vaegt: "15%",
    description: "Udvalg af indbetalingsmetoder, udbetalingshastighed og eventuelle gebyrer. Vi tester reelle udbetalingstider med dokumentation.",
    eksempel: "MobilePay-udbetaling på under 2 timer = 5.0. Over 48 timer = 3.0.",
  },
  {
    icon: Headphones,
    title: "Kundeservice",
    vaegt: "10%",
    description: "Tilgængelighed (live chat, e-mail, telefon), svartider, dansk support og kvaliteten af hjælpen.",
    eksempel: "24/7 dansk live chat med under 2 minutters ventetid = 5.0. Kun e-mail med 48+ timers svar = 3.0.",
  },
  {
    icon: Smartphone,
    title: "Mobiloplevelse",
    vaegt: "10%",
    description: "Responsivt design, dedikeret app, indlæsningshastighed og funktionalitet på mobile enheder.",
    eksempel: "Dedikeret app med fuld funktionalitet og hurtig indlæsning = 5.0. Langsom mobilside med manglende funktioner = 3.0.",
  },
  {
    icon: Scale,
    title: "Fairness & Gennemsigtighed",
    vaegt: "10%",
    description: "Klarhed i vilkår og betingelser, RTP-information, og generel gennemsigtighed i casinoets drift.",
    eksempel: "Tydeligt oplyste omsætningskrav og RTP-data = 5.0. Skjulte vilkår og utilgængelig information = 3.0.",
  },
];

const ratingSkala = [
  { score: "4.8 – 5.0", label: "Exceptionelt", beskrivelse: "Best-in-class på næsten alle parametre. Anbefales ubetinget.", color: "text-primary" },
  { score: "4.5 – 4.7", label: "Fremragende", beskrivelse: "Stærkt på alle områder med få forbedringspunkter.", color: "text-primary" },
  { score: "4.2 – 4.4", label: "Meget godt", beskrivelse: "Solidt casino med tydelige styrker, men også identificerbare svagheder.", color: "text-muted-foreground" },
  { score: "4.0 – 4.1", label: "Godt", beskrivelse: "Acceptabelt niveau, men med væsentlige områder der kræver forbedring.", color: "text-muted-foreground" },
  { score: "Under 4.0", label: "Under standard", beskrivelse: "Frarådes. Væsentlige problemer med sikkerhed, vilkår eller brugeroplevelse.", color: "text-destructive" },
];

const faqs = [
  {
    question: "Hvorfor er ingen casinoer rated 5.0?",
    answer: "Vi forbeholder 5.0-scoren til et hypotetisk perfekt casino. Selv de bedste casinoer har forbedringspotentiale – det kan være kundeservicens tilgængelighed, mobiloplevelsen eller bonusvilkårene. En 4.8-rating er exceptionel og vores højeste faktiske score.",
  },
  {
    question: "Hvordan undgår I bias fra affiliate-partnerskaber?",
    answer: (
      <>
        Vores ratings er fuldstændig uafhængige af kommercielle aftaler. Vi anmelder casinoer med og uden affiliate-partnerskab med samme metodologi. Læs mere om vores{" "}
        <Link to="/forretningsmodel" className="text-primary hover:underline">forretningsmodel</Link> og{" "}
        <Link to="/redaktionel-politik" className="text-primary hover:underline">redaktionelle politik</Link>.
      </>
    ),
  },
  {
    question: "Hvor ofte opdateres ratings?",
    answer: "Vi gennemgår alle ratings kvartalsvis og opdaterer dem, når casinoer foretager væsentlige ændringer – nye betalingsmetoder, bonusændringer, eller ændrede vilkår. Dato for seneste opdatering fremgår altid af anmeldelsen.",
  },
  {
    question: "Kan et casino's rating ændre sig over tid?",
    answer: "Ja. Ratings er dynamiske. Et casino kan stige i score ved at forbedre service, tilføje betalingsmetoder eller sænke omsætningskrav. Omvendt kan dårligere vilkår eller langsommere udbetalinger sænke scoren.",
  },
  {
    question: "Hvad er forskellen på denne side og 'Sådan tester vi'?",
    answer: (
      <>
        <Link to="/saadan-tester-vi-casinoer" className="text-primary hover:underline">Sådan tester vi casinoer</Link>{" "}
        beskriver vores testproces – hvordan vi opretter konti, tester spil og dokumenterer oplevelsen. Denne side forklarer den matematiske model bag vores ratings og hvordan de syv kategorier vægtes til en samlet score.
      </>
    ),
  },
  {
    question: "Tager I højde for danske spilleres behov specifikt?",
    answer: "Ja. Vi vægter danske betalingsmetoder (MobilePay, Trustly), dansk kundeservice, MitID-integration og overholdelse af dansk lovgivning som defineret af Spillemyndigheden. Casinoer uden dansk licens anmeldes ikke.",
  },
];

const SaadanVurdererVi = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Sådan Vurderer Vi Casinoer – Vores Rating-Metodologi",
    description: "Forstå præcist hvordan vi beregner casino-ratings. 7 kategorier, vægtede scores og transparent metodologi.",
    url: `${SITE_URL}/saadan-vurderer-vi`,
    datePublished: "2026-02-18",
    dateModified: "2026-02-18",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Sådan Vurderer Vi Casinoer – Rating-Metodologi"
        description="Forstå præcist hvordan vi beregner casino-ratings. 7 kategorier, vægtede scores og transparent metodologi bag alle vores anmeldelser."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <BarChart3 className="mr-1.5 h-3.5 w-3.5" />
              Transparens
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Sådan Vurderer Vi Casinoer
            </h1>
            <p className="text-lg text-white/80">
              Vores rating-metodologi – 7 kategorier, vægtede scores og fuldstændig gennemsigtighed i hvordan vi når vores vurderinger.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="18-02-2026" readTime="8 Min." showAffiliateDisclaimer={false} />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={heroImage}
            alt="Rating-metodologi – sådan vurderer vi casinoer"
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvorfor Har Vi En Rating-Metodologi?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når vi vurderer online casinoer, bruger vi en struktureret og transparent metodologi for at sikre, at alle anmeldelser er konsistente, fair og sammenlignelige. Vores ratings er ikke baseret på mavefornemmelse – de er resultatet af en systematisk evaluering på tværs af syv nøglekategorier med foruddefinerede vægtninger.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne side dokumenterer præcist, hvordan vi beregner vores ratings, så du som læser kan vurdere, om vores prioriteringer matcher dine egne. Gennemsigtighed er fundamentet for troværdighed, og vi mener, at enhver seriøs anmeldelsesplatform bør offentliggøre sin metodologi.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Alle casinoer vi anmelder har en gyldig dansk licens fra{" "}
            <a href="https://www.spillemyndigheden.dk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Spillemyndigheden</a>
            {" "}– det er en ufravigelig forudsætning, ikke en scoringsparameter.
          </p>
        </section>

        <Separator className="my-10" />

        {/* De 7 kategorier */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Star className="h-7 w-7 text-primary" />
            De 7 Rating-Kategorier
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Hver kategori vurderes på en skala fra 1.0 til 5.0. Den samlede rating er et vægtet gennemsnit baseret på nedenstående vægtninger:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {ratingKategorier.map((kat) => (
              <Card key={kat.title}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    <span className="flex items-center gap-2">
                      <kat.icon className="h-5 w-5 text-primary" />
                      {kat.title}
                    </span>
                    <Badge variant="secondary">{kat.vaegt}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{kat.description}</p>
                  <p className="text-xs text-muted-foreground/70 italic">
                    <strong>Eksempel:</strong> {kat.eksempel}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Beregningsformel */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Beregning af Samlet Rating</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den samlede rating beregnes som et vægtet gennemsnit af de syv kategorier. Formlen er:
          </p>
          <Card className="bg-muted/30 mb-6">
            <CardContent className="p-6">
              <p className="font-mono text-sm text-center text-foreground">
                Rating = (Spiludvalg × 0.20) + (Sikkerhed × 0.20) + (Bonus × 0.15) + (Betaling × 0.15) + (Kundeservice × 0.10) + (Mobil × 0.10) + (Fairness × 0.10)
              </p>
            </CardContent>
          </Card>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Resultatet afrundes til én decimal. Vi anvender ingen "boost" eller "straf" baseret på kommercielle relationer. Alle casinoer – uanset om vi har et affiliate-partnerskab – evalueres med identisk metodik.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Læs om vores testproces i detaljer på{" "}
            <Link to="/saadan-tester-vi-casinoer" className="text-primary hover:underline font-medium">Sådan Tester Vi Casinoer</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Rating-skala */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Rating-Skalaen Forklaret</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Vores skala spænder fra 1.0 til 5.0, men i praksis vil ingen casinoer score under 3.5 – da vi ikke anmelder casinoer uden dansk licens eller med fundamentale sikkerhedsproblemer. Her er, hvad de forskellige niveauer betyder:
          </p>
          <div className="space-y-3">
            {ratingSkala.map((niveau) => (
              <Card key={niveau.score}>
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex-shrink-0">
                    <Badge variant="outline" className={`font-mono font-bold ${niveau.color}`}>
                      {niveau.score}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{niveau.label}</p>
                    <p className="text-sm text-muted-foreground">{niveau.beskrivelse}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Uafhængighed */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Uafhængighed og Objektivitet
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  Det gør vi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" /><span>Tester alle casinoer med egne midler</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" /><span>Dokumenterer udbetalingstider med timestamps</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" /><span>Opdaterer ratings ved væsentlige ændringer</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" /><span>Offentliggør vores metodologi (denne side)</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" /><span>Kryds-faktatjekker alle anmeldelser</span></li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Det gør vi ikke
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" /><span>Sælger højere ratings til casinoer</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" /><span>Justerer scores baseret på affiliate-aftaler</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" /><span>Skjuler negative aspekter ved partnere</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" /><span>Anmelder casinoer uden dansk licens</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" /><span>Kopierer tekst fra casinoernes egne sider</span></li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Vores kommercielle model er beskrevet i detaljer på{" "}
            <Link to="/forretningsmodel" className="text-primary hover:underline font-medium">vores forretningsmodel-side</Link>. Vores redaktionelle standarder er dokumenteret i vores{" "}
            <Link to="/redaktionel-politik" className="text-primary hover:underline font-medium">redaktionelle politik</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Ansvarligt spil */}
        <section className="mb-12">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 space-y-3 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Ansvarligt Spil er Altid Vigtigst
              </p>
              <p>
                Uanset et casino's rating opfordrer vi altid til ansvarligt spil. Sæt personlige grænser, og søg hjælp hvis spillet bliver problematisk via{" "}
                <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>{" "}
                eller{" "}
                <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>.
                Læs mere om{" "}
                <Link to="/ansvarligt-spil" className="text-primary hover:underline font-medium">ansvarligt spil</Link>. 18+ | Spil ansvarligt.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/saadan-vurderer-vi" />

        <FAQSection title="Ofte Stillede Spørgsmål om Vores Rating-Metodologi" faqs={faqs} />

        <AuthorBio author="jonas" showCommunity={false} />
      </div>
    </>
  );
};

export default SaadanVurdererVi;

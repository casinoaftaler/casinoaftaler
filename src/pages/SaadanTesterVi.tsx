import { Link } from "react-router-dom";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { RelatedGuides } from "@/components/RelatedGuides";
import { TestMetodeSeoContent } from "@/components/test-metode/TestMetodeSeoContent";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, AJSE_SAME_AS } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Gamepad2,
  Gift,
  Scale,
  CreditCard,
  Headphones,
  Smartphone,
  CheckCircle2,
  ClipboardList,
  BarChart3,
  Eye,
  RefreshCw,
  User,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import testMetodeHero from "@/assets/heroes/test-metode-hero.jpg";

const testKriterier = [
  {
    icon: Gamepad2,
    title: "Spiludvalg",
    items: [
      "Antal tilgængelige spil og variation i udbuddet",
      "Kvaliteten og bredden af spiludbydere som NetEnt, Pragmatic Play og Evolution Gaming",
      "Live casino-udvalget og kvaliteten af streams",
      "RTP-gennemsigtighed – om casinoet oplyser Return to Player-procenter tydeligt",
    ],
  },
  {
    icon: Gift,
    title: "Bonus & vilkår",
    items: [
      "Omsætningskrav – vi vurderer om kravene er realistiske og fair",
      "Maksimal gevinst fra bonusmidler og eventuelle begrænsninger",
      "Gennemsigtighed i vilkår – er betingelserne lette at finde og forstå?",
      "Realistiske krav – kan en gennemsnitlig spiller reelt opfylde dem?",
    ],
  },
  {
    icon: Scale,
    title: "Licens & sikkerhed",
    items: [
      "Gyldig dansk licens fra Spillemyndigheden er et absolut krav",
      "SSL-kryptering og databeskyttelse af personlige oplysninger",
      "Ansvarligt spil-værktøjer som indbetalingsgrænser og selvudelukkelse",
      "Alderskontrol og identitetsverifikation inden udbetaling",
    ],
  },
  {
    icon: CreditCard,
    title: "Ind- og udbetaling",
    items: [
      "Behandlingstid for udbetalinger – vi tester den reelle ventetid",
      "Eventuelle gebyrer ved ind- og udbetalinger",
      "Udvalget af betalingsmetoder inkl. MobilePay, Trustly og kortbetalinger",
      "Vi gennemfører en faktisk udbetalingstest for at verificere processen",
    ],
  },
  {
    icon: Headphones,
    title: "Kundeservice",
    items: [
      "Vi tester live chat med reelle spørgsmål om bonusvilkår",
      "Vi måler responstiden og kvaliteten af svarene",
      "Vi tjekker om der er dansktalende support tilgængelig",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobiloplevelse",
    items: [
      "Om casinoet tilbyder en dedikeret app eller optimeret mobil-browser",
      "Performance og indlæsningstider på mobile enheder",
      "Generel brugeroplevelse og navigation på smartphone og tablet",
    ],
  },
];

const testProcess = [
  "Vi opretter en reel konto med vores egne oplysninger",
  "Vi gennemfører fuld identifikation og verifikation (KYC)",
  "Vi indbetaler vores egne midler – aldrig testkonti fra casinoet",
  "Vi aktiverer og tester bonussen under reelle vilkår",
  "Vi gennemfører en udbetaling og måler den faktiske behandlingstid",
  "Vi kontakter kundeservice med reelle spørgsmål og vurderer svarkvaliteten",
  "Vi spiller en bred vifte af spil – slots, bordspil og live casino",
];

const scoringModel = [
  { label: "Sikkerhed & Licens", pct: 30, color: "hsl(var(--primary))" },
  { label: "Spiludvalg", pct: 20, color: "hsl(var(--chart-2))" },
  { label: "Bonus & Vilkår", pct: 20, color: "hsl(var(--chart-3))" },
  { label: "Udbetaling", pct: 15, color: "hsl(var(--chart-4))" },
  { label: "Brugeroplevelse", pct: 15, color: "hsl(var(--chart-5))" },
];

const faqs = [
  {
    question: "Tester I virkelig alle casinoer selv?",
    answer:
      "Ja. Vi opretter reelle konti, indbetaler egne midler og gennemfører hele processen fra registrering til udbetaling. Ingen casino får en anmeldelse baseret på pressemateriale alene.",
  },
  {
    question: "Kan jeg stole på jeres vurderinger, når I modtager affiliate-provision?",
    answer:
      "Vores vurderinger er baseret på faste testkriterier og reel erfaring. Provisionen påvirker ikke vores scores eller anbefalinger – kun casinoer der lever op til vores standarder bliver anbefalet.",
  },
  {
    question: "Hvor ofte opdaterer I jeres anmeldelser?",
    answer:
      "Vi kontrollerer løbende bonusvilkår og opdaterer vores anmeldelser, når casinoer ændrer betingelser. Dato for seneste opdatering vises altid på siden.",
  },
  {
    question: "Hvad sker der, hvis et casino får en dårlig vurdering?",
    answer:
      "Vi offentliggør anmeldelsen med den ærlige score. Casinoer med lav score anbefales ikke, og vi fraråder aktivt casinoer uden gyldig dansk licens eller med urimelige vilkår.",
  },
  {
    question: "Hvorfor er sikkerhed det vigtigste kriterium?",
    answer:
      "Uden gyldig licens og ordentlig sikkerhed er alt andet ligegyldigt. En bonus på 500% er værdiløs, hvis casinoet ikke er reguleret og dine midler ikke er beskyttet.",
  },
  {
    question: "Tester I også mobil-versionen af casinoer?",
    answer:
      "Ja. Vi tester altid mobiloplevelsen separat, da mange danske spillere primært spiller på mobilen. Vi vurderer indlæsningstid, navigation og spiludvalg på mobil.",
  },
  {
    question: "Hvem er Jonas, og hvad er hans erfaring?",
    answer: (
      <>
        Jonas er grundlæggeren af Casinoaftaler.dk og har over 4 års erfaring som casino-streamer på Twitch. Han tester personligt alle anmeldte casinoer. Læs mere på hans{" "}
        <Link to="/forfatter/jonas" className="text-primary underline hover:text-primary/80">
          forfatterprofil
        </Link>.
      </>
    ),
  },
];

const faqJsonLd = buildFaqSchema(faqs);

const articleJsonLd = buildArticleSchema({
  headline: "Sådan tester vi casinoer",
  description: "Se hvordan vi tester og vurderer online casinoer i Danmark. Læs om vores testkriterier, vurderingsmodel og gennemsigtige metode.",
  url: "https://casinoaftaler.dk/saadan-tester-vi-casinoer",
  datePublished: "2026-02-15",
  authorName: "Ajse",
  authorUrl: "https://casinoaftaler.dk/forfatter/ajse",
  authorSameAs: AJSE_SAME_AS,
});

const SaadanTesterVi = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  return (
    <>
      <SEO
        title="Sådan tester vi casinoer | Vores testmetode | Casinoaftaler"
        description="Se hvordan vi tester og vurderer online casinoer i Danmark. Læs om vores testkriterier, vurderingsmodel og gennemsigtige metode."
        jsonLd={[articleJsonLd, faqJsonLd]}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <ClipboardList className="mr-1.5 h-3.5 w-3.5" />
              Testmetode
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Sådan tester vi casinoer
            </h1>
            <p className="text-lg text-white/80">
              Gennemsigtighed og reel erfaring er grundlaget for alle vores anmeldelser. Her kan du læse præcis, hvordan vi evaluerer hvert casino.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="ajse" date="15-02-2026" readTime="12 Min." showAffiliateDisclaimer={false} />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={testMetodeHero}
            alt="Casinoaftaler testmetode – systematisk evaluering af online casinoer"
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* 1. Introduktion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvorfor vi tester casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Markedet for online casinoer i Danmark er stort og kan virke uoverskueligt. Der dukker konstant nye casinoer op med tilbud, der lyder for gode til at være sande – og det er de ofte også. Derfor tester vi hvert enkelt casino, inden vi anbefaler det til vores læsere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle anmeldelser bygger på praktisk erfaring. Vi opretter reelle konti, indbetaler egne midler og gennemfører hele spilleoplevelsen fra start til slut. Ingen anmeldelse skrives udelukkende på baggrund af pressematerialer eller markedsføringstekster.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bag testene står <Link to="/forfatter/jonas" className="text-primary underline hover:text-primary/80">Jonas</Link>, grundlæggeren af Casinoaftaler.dk, som har over 4 års erfaring som casino-streamer. Hans daglige erfaring med at spille live foran hundredvis af seere giver et unikt indblik i, hvad der fungerer i praksis – og hvad der ikke gør.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores mål er enkelt: at give dig den information, du har brug for, til at vælge det rigtige casino. Læs vores{" "}
            <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">casino anmeldelser</Link>{" "}
            for at se resultaterne af vores tests.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 2. Testkriterier */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores testkriterier</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Hvert casino evalueres ud fra seks hovedområder. Denne systematiske tilgang sikrer, at ingen vigtige aspekter overses, og at alle casinoer vurderes på lige vilkår.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testKriterier.map((krit) => (
              <Card key={krit.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <krit.icon className="h-5 w-5 text-primary" />
                    {krit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {krit.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 3. Sådan tester vi i praksis */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sådan tester vi i praksis</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Vores testproces er konkret og realistisk. Vi følger de samme trin, som enhver dansk spiller ville – ingen specialbehandling eller testkonti fra casinoerne. Alle RTP-værdier verificeres mod udviklernes officielle data, og licensstatus kontrolleres direkte i{" "}
            <a href="https://www.spillemyndigheden.dk/tilladelsesindehavere" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">Spillemyndighedens licensregister</a>.
          </p>
          <div className="space-y-3">
            {testProcess.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Denne proces gentages for hvert casino, vi anmelder. Det sikrer, at vores{" "}
            <Link to="/casino-anmeldelser" className="text-primary underline hover:text-primary/80">anmeldelser</Link>{" "}
            altid afspejler den reelle oplevelse.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 4. Vurderingsmodel */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurderingsmodel</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Den samlede score for hvert casino beregnes ud fra en vægtet model med fem kategorier. Sikkerhed vejer tungest, fordi det er grundlaget for en tryg spilleoplevelse.
          </p>
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                {scoringModel.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium">{item.label}</span>
                      <span className="font-bold">{item.pct}%</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                Den samlede score (ud af 5.0) beregnes som et vægtet gennemsnit af disse fem kategorier. Et casino kan score højt på spiludvalg, men trækkes ned af lange udbetalingstider eller urimelige bonusvilkår.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* 5. Transparens */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Transparens & uafhængighed</h2>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Eye className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <p className="mb-3 text-muted-foreground leading-relaxed">
                    Casinoaftaler.dk modtager kommission fra nogle casinoer via affiliate-aftaler. Dette er en del af vores forretningsmodel og gør det muligt for os at drive sitet og fortsætte med at producere uafhængigt indhold.
                  </p>
                  <p className="mb-3 text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Dette påvirker dog ikke vores vurderinger.</strong> Alle anmeldelser baseres på faste testkriterier og reel erfaring. Et casino får ikke en højere score, fordi det betaler mere i provision. Casinoer, der ikke lever op til vores standarder, anbefales ikke – uanset samarbejdets økonomiske værdi.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Læs mere om vores værdier og tilgang på vores{" "}
                    <Link to="/om" className="text-primary underline hover:text-primary/80">Om os</Link>-side.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* 6. Opdateringspolitik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Opdateringspolitik</h2>
          <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <RefreshCw className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bonusser og vilkår i casino-branchen ændrer sig løbende. Derfor kontrollerer vi regelmæssigt alle vores anmeldelser og opdaterer dem, når casinoer ændrer betingelser, lancerer nye kampagner eller foretager væsentlige ændringer i deres platform.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dato for seneste opdatering vises altid tydeligt på hver anmeldelsesside, så du altid ved, hvor aktuelle oplysningerne er. Vi opfordrer også vores læsere til at kontakte os, hvis de oplever afvigelser fra vores beskrivelser.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Autor-boks */}
        <section className="mb-12">
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    Testet og vurderet af{" "}
                    <Link to="/forfatter/jonas" className="text-primary underline hover:text-primary/80">
                      Jonas – Grundlægger & Casino-streamer
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    4+ års erfaring med live casino-streaming og systematisk test af danske online casinoer.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Deep SEO content: case studies, aggregerede data, scoring-metodik */}
        <TestMetodeSeoContent />

        <Separator className="my-10" />

        {/* Intern linking */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Udforsk vores anmeldelser</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nu hvor du ved, hvordan vi tester, kan du udforske resultaterne:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/nye-casinoer"
              className="flex items-center gap-2 rounded-lg border border-border bg-card p-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Gamepad2 className="h-4 w-4 text-primary" />
              Nye Casinoer
            </Link>
            <Link
              to="/casino-anmeldelser"
              className="flex items-center gap-2 rounded-lg border border-border bg-card p-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              <BarChart3 className="h-4 w-4 text-primary" />
              Casino Anmeldelser
            </Link>
            <Link
              to="/ansvarligt-spil"
              className="flex items-center gap-2 rounded-lg border border-border bg-card p-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Shield className="h-4 w-4 text-primary" />
              Ansvarligt Spil
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection faqs={faqs} />

        <LatestNewsByCategory pagePath="/saadan-tester-vi-casinoer" />
        <RelatedGuides currentPath="/saadan-tester-vi-casinoer" maxLinks={5} />

        <AuthorBio author="ajse" showCommunity={false} />
      </div>
    </>
  );
};

export default SaadanTesterVi;

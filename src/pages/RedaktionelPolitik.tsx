import { Link } from "react-router-dom";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import spillemyndighedenForside from "@/assets/screenshots/spillemyndigheden-dk-forside.png";
import spillemyndighedenLicens from "@/assets/screenshots/spillemyndigheden-licensliste-onlinekasino.png";
import { AuthorBio } from "@/components/AuthorBio";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  RefreshCw,
  Scale,
  Search,
  Eye,
  Pen,
  Users,
  Bot,
  AlertTriangle,
  Globe,
  BookMarked,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { RelatedGuides } from "@/components/RelatedGuides";
import { buildArticleSchema } from "@/lib/seo";
import redaktionelPolitikHero from "@/assets/heroes/redaktionel-politik-hero.jpg";

const RedaktionelPolitik = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const articleJsonLd = buildArticleSchema({
    headline: "Redaktionel politik – Casinoaftaler.dk",
    description: "Læs om vores redaktionelle retningslinjer, hvordan vi producerer indhold, og hvordan vi sikrer uafhængighed og kvalitet.",
    url: "https://casinoaftaler.dk/redaktionel-politik",
    datePublished: "2025-06-01",
    authorName: "Ajse",
    authorUrl: "https://casinoaftaler.dk/forfatter/ajse",
  });

  const editorialSteps = [
    { icon: Search, title: "Research & registrering", desc: "Vi opretter en reel konto, verificerer identitet og gennemfører hele registreringsprocessen som enhver anden spiller." },
    { icon: Pen, title: "Praktisk test", desc: "Vi indbetaler, spiller og tester bonusser, kundeservice og udbetalingsprocesser med rigtige penge." },
    { icon: Eye, title: "Analyse & dokumentation", desc: "Alle observationer dokumenteres systematisk efter faste kriterier. Vi vurderer brugeroplevelse, spiludvalg, bonusvilkår og sikkerhed." },
    { icon: RefreshCw, title: "Løbende opdatering", desc: "Anmeldelser og guides opdateres løbende, når vilkår ændres, nye funktioner lanceres, eller casinoer forbedrer deres tilbud." },
  ];

  const guidelines = [
    "Alt indhold er baseret på førstehåndserfaring – ikke pressemeddelelser eller marketing",
    "Alle bonusvilkår verificeres manuelt og opdateres løbende",
    "Kommercielle samarbejder oplyses tydeligt og påvirker aldrig vurderinger",
    "Faktatjek udføres af en anden redaktør end forfatteren",
    "Alle anmeldelser følger en standardiseret, dokumenteret vurderingsmetode",
    "Indhold der ikke længere er aktuelt, fjernes eller opdateres",
  ];

  return (
    <>
      <SEO
        title="Redaktionel politik – Sådan produceres indhold | Casinoaftaler"
        description="Læs om vores redaktionelle retningslinjer, hvordan vi producerer indhold, og hvordan vi sikrer uafhængighed og kvalitet i alle anmeldelser."
        jsonLd={[articleJsonLd]}
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
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              Kvalitetssikring
            </Badge>
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
              Redaktionel Politik
            </h1>
            <p className="text-lg text-white/80">
              Sådan producerer, kvalitetssikrer og opdaterer vi indhold på Casinoaftaler.dk.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-10 md:py-14">
        <AuthorMetaBar author="ajse" readTime="10 min" showAffiliateDisclaimer={false} />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={redaktionelPolitikHero} alt="Redaktionel politik – faktatjek og kvalitetssikring" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Vores redaktionelle proces */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Vores redaktionelle proces
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Alt indhold på Casinoaftaler.dk gennemgår en struktureret proces fra research til 
            publicering. Vi tror på, at kvalitetsindhold kræver tid, praktisk erfaring og 
            systematisk dokumentation.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {editorialSteps.map((step, i) => (
              <Card key={step.title} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                      {i + 1}
                    </div>
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <ReviewScreenshot
          src={spillemyndighedenForside}
          alt="Spillemyndighedens hjemmeside – vi krydsverificerer alle casinoinformationer mod denne officielle kilde"
          caption="Spillemyndigheden er vores primære kilde til faktatjek af casinolicenser og bonusvilkår"
        />

        <Separator className="my-10" />

        {/* Faktatjek & krydsverifikation */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Faktatjek & krydsverifikation
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Alle faktuelt indhold på Casinoaftaler.dk gennemgår en krydsverifikationsproces, hvor mindst 
            to uafhængige kilder konsulteres for hver kritisk påstand. Vi faktatjekker specifikt:
          </p>
          <div className="rounded-xl border border-border bg-card p-6 space-y-3 mb-6">
            {[
              "Licensstatus – verificeres direkte i Spillemyndighedens offentlige register over tilladelsesindehavere",
              "Bonusbeløb og omsætningskrav – sammenholdes med casinoets egne vilkår og bekræftes via reel test",
              "RTP-værdier – kontrolleres mod spiludviklernes officielle data (f.eks. NetEnt, Pragmatic Play)",
              "Lovgivningsmæssige krav – krydstjekkes med BEK nr. 1494 og Spillemyndighedens vejledninger",
              "Udbetalingstider – baseres på reelle tests, ikke casinoets egne angivelser",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Faktatjek udføres af en anden redaktør end den, der har skrevet indholdet. For juridisk 
            indhold er det altid{" "}
            <Link to="/forfatter/ajse" className="text-primary underline hover:text-primary/80">Ajse</Link>{" "}
            (juridisk redaktør), der verificerer korrekthed. For teknisk indhold som RTP og spiludvalg 
            er det{" "}
            <Link to="/forfatter/kevin" className="text-primary underline hover:text-primary/80">Kevin</Link>{" "}
            (casino-streamer & IT), der sikrer præcision.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Anmeldelser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Search className="h-7 w-7 text-primary" />
            Sådan udformes anmeldelser
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vores casino-anmeldelser følger en standardiseret metode, der sikrer konsistens og 
            sammenlignelighed. Hver anmeldelse vurderer casinoet på tværs af følgende områder:
          </p>
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            {[
              "Bonusstruktur og omsætningskrav",
              "Spiludvalg og softwarekvalitet",
              "Udbetalingshastighed og betalingsmetoder",
              "Kundeservice og supportkvalitet",
              "Mobiloplevelse og brugervenlighed",
              "Licensforhold og sikkerhed",
              "Ansvarligt spil-funktioner",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link to="/saadan-tester-vi-casinoer">
              <Button variant="outline" size="sm">
                <ShieldCheck className="mr-1.5 h-4 w-4" />
                Læs mere om vores testmetode
              </Button>
            </Link>
          </div>
        </section>

        <Separator className="my-10" />

        {/* AI-indhold & menneskelig kontrol */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Bot className="h-7 w-7 text-primary" />
            AI-indhold & menneskelig kontrol
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi bruger AI-assisterede værktøjer som en del af vores redaktionelle workflow. 
            Det er vigtigt for os at være gennemsigtige om, hvordan og hvornår AI anvendes:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Hvor AI bruges
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Nyheder baseret på verificerede kilder med redaktionel gennemgang</li>
                  <li>• Dataanalyse og statistikberegninger</li>
                  <li>• Grundlæggende research og kildeindsamling</li>
                  <li>• Teknisk implementering af sitet</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Hvor AI aldrig bruges alene
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Casino-anmeldelser – kræver reel testning og personlig erfaring</li>
                  <li>• Bonusvurderinger – kræver manuel verifikation af vilkår</li>
                  <li>• Licensoplysninger – kræver direkte kontrol i offentlige registre</li>
                  <li>• Redaktionelle vurderinger og anbefalinger</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Alle AI-genererede nyheder gennemgår en guardrail-proces, der validerer kilder, tjekker 
            for duplikat-indhold og sikrer, at artiklen er baseret på faktisk nyhedsværdi. Artikler, 
            der ikke passerer kvalitetstjekket, publiceres ikke. Vi bruger aldrig AI til at 
            "opfinde" indhold eller skabe falske anmeldelser.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Kildepolitik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Globe className="h-7 w-7 text-primary" />
            Kildepolitik & referencer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi prioriterer primære, autoritative kilder i alt vores indhold. Vores kildehierarki er:
          </p>
          <div className="space-y-3 mb-6">
            {[
              { rank: "1.", source: "Officielle myndigheder", example: "Spillemyndigheden, Retsinformation, EU-direktiver" },
              { rank: "2.", source: "Casinoernes egne vilkår", example: "Bonusvilkår, AGB, FAQ-sektioner" },
              { rank: "3.", source: "Spiludviklernes data", example: "RTP-specifikationer, volatilitetsdata fra NetEnt, Pragmatic Play osv." },
              { rank: "4.", source: "Brancheorganisationer", example: "EGBA, iGaming-rapporter, markedsanalyser" },
              { rank: "5.", source: "Førsteparts testdata", example: "Vores egne tests, udbetalingstider, screenshot-dokumentation" },
            ].map((item) => (
              <div key={item.rank} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.rank}
                </div>
                <div>
                  <p className="font-medium text-sm">{item.source}</p>
                  <p className="text-xs text-muted-foreground">{item.example}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Vi linker altid til primærkilder, hvor det er muligt. Alle regulatoriske referencer 
            peger direkte til Spillemyndighedens offentlige register eller relevante lovbekendtgørelser. 
            Du kan se vores kildeangivelser i bunden af hver anmeldelse og guide.
          </p>
        </section>

        <ReviewScreenshot
          src={spillemyndighedenLicens}
          alt="Spillemyndighedens licensliste – vores redaktion verificerer regelmæssigt casinoers licensstatus her"
          caption="Licensverifikation er en central del af vores redaktionelle proces – vi tjekker regelmæssigt Spillemyndighedens register"
        />

        <Separator className="my-10" />

        {/* Opdateringspolitik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <RefreshCw className="h-7 w-7 text-primary" />
            Opdateringspolitik
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Online casino-branchen ændrer sig hurtigt. Bonusser justeres, nye spil lanceres, og 
            vilkår opdateres løbende. Derfor har vi en aktiv opdateringspolitik:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Anmeldelser gennemgås minimum kvartalsvis og opdateres ved væsentlige ændringer",
              "Bonusguides opdateres løbende, når vilkår ændres",
              "Dato for seneste opdatering vises tydeligt på alle sider",
              "Forældet indhold fjernes eller markeres tydeligt",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <Separator className="my-10" />

        {/* Korrektionspolitik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookMarked className="h-7 w-7 text-primary" />
            Korrektionspolitik
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi tager fejl alvorligt. Hvis vi opdager en faktuel fejl i et publiceret indhold – 
            eller en læser gør os opmærksom på en – handler vi hurtigt:
          </p>
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            {[
              "Mindre fejl (stavning, formateringstal) rettes straks og uden markering",
              "Faktuelle fejl (forkert bonusbeløb, forkert omsætningskrav) rettes straks, og rettelsen noteres med opdateret dato",
              "Væsentlige fejl (forkert licensstatus, misvisende anbefaling) rettes straks med en synlig korrektionsnotits i toppen af artiklen",
              "Vi sletter aldrig indhold for at skjule fejl – vi korrigerer gennemsigtigt",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Har du fundet en fejl? Vi vil gerne høre fra dig. Kontakt os via vores{" "}
            <Link to="/kontakt" className="text-primary underline hover:text-primary/80">kontaktside</Link>,
            og vi retter det hurtigst muligt.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Skelnen mellem kommercielt og redaktionelt */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Kommercielt vs. redaktionelt
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Vi skelner altid klart mellem kommercielle samarbejder og redaktionelt indhold. 
            Vores affiliate-partnerskaber finansierer platformen, men påvirker aldrig vores 
            vurderinger eller anbefalinger.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Læs mere om vores forretningsmodel og hvordan vi sikrer denne adskillelse:
          </p>
          <Link to="/forretningsmodel">
            <Button variant="outline" size="sm">
              <Scale className="mr-1.5 h-4 w-4" />
              Vores forretningsmodel
            </Button>
          </Link>
        </section>

        <Separator className="my-10" />

        {/* Retningslinjer */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Redaktionelle retningslinjer
          </h2>
          <div className="rounded-xl border border-border bg-card p-6">
            {guidelines.map((g) => (
              <div key={g} className="flex items-start gap-3 py-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="font-medium">{g}</span>
              </div>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/redaktionel-politik" />
        <RelatedGuides currentPath="/redaktionel-politik" maxLinks={5} />

        <AuthorBio author="ajse" showCommunity={false} />
      </div>
    </>
  );
};

export default RedaktionelPolitik;
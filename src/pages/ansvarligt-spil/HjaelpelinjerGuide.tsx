import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { AnsvarligtSpilResources } from "@/components/AnsvarligtSpilResources";
import { FAQSection } from "@/components/FAQSection";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import hjaelpelinjerHero from "@/assets/heroes/hjaelpelinjer-guide-hero.jpg";
import {
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Lock,
  Scale,
  BarChart3,
  BookOpen,
  ExternalLink,
  HelpCircle,
  Phone,
  Globe,
  Gavel,
  ArrowRight,
  Heart,
  MessageCircle,
  Mail,
  Info,
  HandHeart,
  Headphones,
  Calendar,
  UserCheck,
  MapPin,
  Building,
  Ban,
} from "lucide-react";

// ────────────────────────────────────────────────────────────────
// FAQ Data
// ────────────────────────────────────────────────────────────────
const hjaelpelinjerFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Er det gratis at kontakte StopSpillet?",
    answer: (
      <>
        Ja, StopSpillet er 100% gratis og fortroligt. Tjenesten er finansieret af Spillemyndigheden
        (via afgifter fra licenserede casinoer) og drives af Center for Ludomani. Du kan ringe på{" "}
        <a href="tel:70222825" className="text-primary underline hover:text-primary/80">70 22 28 25</a>,
        chatte via{" "}
        <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
          stopspillet.dk
        </a>{" "}
        eller skrive en e-mail. Der er ingen ventetid for telefonisk rådgivning i åbningstiden.
        Læs mere i vores{" "}
        <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">
          dedikerede StopSpillet-guide
        </Link>.
      </>
    ),
  },
  {
    question: "Kan pårørende også få hjælp?",
    answer: "Ja, absolut. Alle de nævnte hjælpelinjer tilbyder også rådgivning til pårørende. StopSpillet har dedikerede rådgivere for familiemedlemmer og partnere. Center for Ludomani tilbyder parterapi og familiebehandling. Anonyme Gamblere har grupper specifikt for pårørende (Gam-Anon). Du behøver ikke vente, til den spilleafhængige selv søger hjælp – pårørende kan og bør søge støtte uafhængigt.",
  },
  {
    question: "Hvad er forskellen på StopSpillet og Center for Ludomani?",
    answer: (
      <>
        <strong>StopSpillet</strong> er en akut rådgivningstjeneste med fokus på øjeblikkelig støtte
        (telefon, chat, e-mail). De tilbyder korte rådgivningsforløb og henviser videre til behandling.{" "}
        <strong>Center for Ludomani</strong> er en behandlingsinstitution, der tilbyder længerevarende
        terapiforløb (typisk 10-15 sessioner over 3-6 måneder). Begge er gratis. I praksis starter
        mange med at kontakte StopSpillet og bliver derefter henvist til Center for Ludomani for et
        struktureret behandlingsforløb.
      </>
    ),
  },
  {
    question: "Hvornår har StopSpillet åbent?",
    answer: "StopSpillet har åbent for telefonisk rådgivning mandag-torsdag kl. 9-21 og fredag kl. 9-15. Chat-funktionen følger samme åbningstider. E-mails besvares inden for 1-2 hverdage. Uden for åbningstiden kan du efterlade en besked, og de ringer tilbage. I akutte situationer uden for åbningstiden kan du kontakte din praktiserende læge eller psykiatrisk skadestue.",
  },
  {
    question: "Tilbyder Center for Ludomani online-behandling?",
    answer: "Ja, Center for Ludomani tilbyder online-behandling via video (Skype/Teams) som supplement til fysiske sessioner. Under og efter COVID-19-pandemien er online-behandling blevet en fast del af tilbuddet. Det gør behandling tilgængeligt uanset bopæl i Danmark. Selve behandlingsforløbet – typisk kognitiv adfærdsterapi (KAT) – er det samme, uanset om det foregår fysisk eller online.",
  },
  {
    question: "Hvad er Anonyme Gamblere (GA), og hvordan fungerer møderne?",
    answer: "Anonyme Gamblere (GA) er en selvhjælpsgruppe baseret på 12-trins-programmet (samme model som Anonyme Alkoholikere). Møderne er gratis, anonyme og uformelle – du behøver ikke tilmelde dig på forhånd. Typisk varer et møde 1-1,5 time og foregår i aftentimerne. Deltagere deler deres erfaringer, og der er ingen professionelle terapeuter til stede. GA er et supplement til – ikke en erstatning for – professionel behandling.",
  },
  {
    question: "Kan min læge hjælpe med spilleproblemer?",
    answer: "Ja. Din praktiserende læge kan vurdere din situation, screene for komorbide tilstande (angst, depression) og henvise dig til behandling. Lægen kan også udskrive medicin, hvis der er samtidige psykiske lidelser. I Danmark er spillebehandling gratis via det offentlige sundhedssystem, men du kan også gå direkte til Center for Ludomani uden lægehenvisning. Kontakt din læge, hvis du oplever fysiske symptomer som søvnproblemer, hjertebanken eller stress.",
  },
  {
    question: "Findes der hjælp specifikt til unge spillere?",
    answer: "Ja. Headspace Danmark tilbyder gratis rådgivning for unge op til 25 år, herunder om spilleproblemer. StopSpillet og Center for Ludomani modtager også henvendelser fra unge. Ungdommens Røde Kors har peer-to-peer støttegrupper. For forældre, der er bekymrede for deres barns spillevaner (herunder gaming-relateret gambling), tilbyder StopSpillet specifik vejledning.",
  },
  {
    question: "Hvad koster behandling for spilleafhængighed i Danmark?",
    answer: "Behandling er gratis i Danmark. Center for Ludomani tilbyder gratis behandlingsforløb financieret af offentlige midler. Kommunale misbrugscentre tilbyder også gratis behandling under Servicelovens § 101. Anonyme Gamblere er gratis (frivillige bidrag). Private psykologer kan koste 800-1.500 kr. pr. session, men der er mulighed for tilskud via sygesikringen med lægehenvisning (op til 60% tilskud ved alvorlige tilfælde).",
  },
  {
    question: "Hvad gør jeg i en akut krise relateret til spilleproblemer?",
    answer: (
      <>
        I en akut krise (selvmordstanker, panikangst, desperat økonomisk situation):<br />
        1. Ring 112 eller kontakt psykiatrisk skadestue ved akut fare.<br />
        2. Livslinjen: <a href="tel:70201201" className="text-primary underline">70 20 12 01</a> (døgnåben).<br />
        3. StopSpillet: <a href="tel:70222825" className="text-primary underline">70 22 28 25</a> (åbningstid).<br />
        4. Gældsrådgivning: <a href="tel:70121316" className="text-primary underline">70 12 13 16</a> (Dansk Folkehjælp).<br />
        Du er ikke alene, og der er professionelle, der kan hjælpe dig igennem krisen.
      </>
    ),
  },
];

const HjaelpelinjerGuide = () => {
  const { data: settings } = useSiteSettings();

  const articleSchema = buildArticleSchema({
    headline: "Hjælpelinjer for Spilleproblemer – Komplet Oversigt over Danske Hjælpemuligheder",
    description: "Samlet oversigt over alle danske hjælpelinjer for spilleproblemer: StopSpillet, Center for Ludomani, Anonyme Gamblere, kommunale tilbud og pårørendestøtte.",
    url: `${SITE_URL}/ansvarligt-spil/hjaelpelinjer`,
    datePublished: "2026-03-08",
    authorName: "Ajse",
    authorUrl: `${SITE_URL}/forfatter/ajse`,
  });

  const faqSchema = buildFaqSchema(
    hjaelpelinjerFaqs.map((f) => ({
      question: f.question,
      answer: typeof f.answer === "string" ? f.answer : "",
    }))
  );

  return (
    <>
      <SEO
        title="Hjælpelinjer – Alle Danske Hjælpemuligheder for Spilleproblemer"
        description="Danske hjælpelinjer for spilleproblemer: StopSpillet, Center for Ludomani, Anonyme Gamblere og pårørendestøtte. Gratis og fortrolig rådgivning."
        type="article"
        image={`${SITE_URL}/og-image.png`}
        jsonLd={[articleSchema, faqSchema]}
        breadcrumbLabel="Hjælpelinjer"
        datePublished="2026-03-08"
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Shield className="mr-1.5 h-3.5 w-3.5" />
              Ansvarligt Spil
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Hjælpelinjer for Spilleproblemer – Alle Danske Hjælpemuligheder
            </h1>
            <p className="text-lg text-white/80">
              Samlet oversigt over StopSpillet, Center for Ludomani, Anonyme Gamblere, kommunale tilbud og pårørendestøtte.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="ajse" readTime="25 Min." showAffiliateDisclaimer={false} />
        <p className="text-sm text-muted-foreground mt-2 mb-6">Juridisk gennemgået og opdateret af Ajse, juridisk redaktør hos Casinoaftaler.dk.</p>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={hjaelpelinjerHero}
            alt="Hjælpelinjer for spilleproblemer i Danmark"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* ── Intro ── */}
        <section className="mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Hvis du eller en person tæt på dig kæmper med spilleproblemer, er det vigtigt at vide, at der findes professionel, gratis hjælp i Danmark. Denne guide samler alle tilgængelige hjælpemuligheder – fra telefonlinjer og chatfunktioner til behandlingscentre og selvhjælpsgrupper.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Danmark har et stærkt netværk af hjælpetjenester for spillere og pårørende, og alle de vigtigste er gratis. Det første skridt er ofte det sværeste, men blot at læse denne side er allerede et positivt tegn. Du fortjener støtte, og der er mennesker, der er uddannet til at hjælpe.
          </p>

          {/* Quick-access CTA */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Har du brug for hjælp nu?
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href="tel:70222825">
                    <Phone className="mr-2 h-4 w-4" />
                    StopSpillet: 70 22 28 25
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat med StopSpillet
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:70201201">
                    <Heart className="mr-2 h-4 w-4" />
                    Livslinjen: 70 20 12 01
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* ── StopSpillet ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Headphones className="h-7 w-7 text-primary" />
            StopSpillet – Akut Rådgivning
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            StopSpillet er Danmarks primære rådgivningstjeneste for spilleproblemer. Tjenesten er gratis, fortrolig og tilgængelig for både spillere og pårørende. StopSpillet er finansieret af Spillemyndigheden og drives af Center for Ludomani.
          </p>

          <Card className="border-border bg-card mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm"><strong>Telefon:</strong> <a href="tel:70222825" className="text-primary hover:underline">70 22 28 25</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm"><strong>Chat:</strong> <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">stopspillet.dk</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm"><strong>E-mail:</strong> info@stopspillet.dk</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm"><strong>Åbningstid:</strong></span>
                  </div>
                  <div className="text-sm text-muted-foreground pl-6 space-y-1">
                    <p>Mandag–torsdag: 9:00–21:00</p>
                    <p>Fredag: 9:00–15:00</p>
                    <p>Lørdag–søndag: Lukket</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg border border-border p-4 bg-muted/30 mb-4">
            <p className="text-sm font-medium mb-2">StopSpillet tilbyder:</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Øjeblikkelig telefonisk rådgivning uden ventetid</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Anonym chat via hjemmesiden</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Korte rådgivningsforløb (3-5 sessioner)</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Henvisning til behandling ved behov</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Dedikeret rådgivning for pårørende</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Hjælp til ROFUS-tilmelding</li>
            </ul>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Læs vores{" "}
            <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">
              komplette StopSpillet-guide
            </Link>{" "}
            for en dybere gennemgang af tjenesten og rådgivernes kvalifikationer.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Center for Ludomani ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Building className="h-7 w-7 text-primary" />
            Center for Ludomani – Behandling og Terapi
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Center for Ludomani er Danmarks førende behandlingscenter for spilleafhængighed. De tilbyder gratis, professionelle behandlingsforløb baseret på kognitiv adfærdsterapi (KAT) og motiverende samtaler.
          </p>

          <Card className="border-border bg-card mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm"><strong>Telefon:</strong> <a href="tel:70111810" className="text-primary hover:underline">70 11 18 10</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="text-sm"><strong>Website:</strong> <a href="https://ludomani.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ludomani.dk</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm"><strong>E-mail:</strong> info@ludomani.dk</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm"><strong>Lokationer:</strong></span>
                  </div>
                  <div className="text-sm text-muted-foreground pl-6 space-y-1">
                    <p>København, Odense, Aarhus, Aalborg</p>
                    <p>+ Online-behandling (hele Danmark)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3 mb-6">
            {[
              { title: "Individuel terapi", desc: "10-15 sessioner over 3-6 måneder med en uddannet terapeut. Baseret på kognitiv adfærdsterapi (KAT) tilpasset spilleafhængighed." },
              { title: "Parterapi", desc: "Behandling for spilleren og partneren sammen. Fokus på genopbygning af tillid, kommunikation og fælles økonomistyring." },
              { title: "Gruppebehandling", desc: "Terapeutisk gruppe med 6-8 deltagere, der deler erfaringer og støtter hinanden. Faciliteret af professionel terapeut." },
              { title: "Online-behandling", desc: "Videosessioner for klienter, der ikke kan møde fysisk. Samme kvalitet og indhold som fysiske sessioner." },
              { title: "Pårørendebehandling", desc: "Individuel rådgivning for familiemedlemmer, partnere og venner til personer med spilleproblemer." },
              { title: "Forebyggende indsats", desc: "Undervisning og workshops for skoler, arbejdspladser og organisationer om spilleproblemer og tidlige tegn." },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardContent className="pt-4 pb-4">
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            <strong>Ventetid:</strong> Typisk 1-3 uger fra første henvendelse til opstart af behandling. I akutte tilfælde kan der arrangeres hurtigere opstart. Der kræves ingen lægehenvisning. Læs vores{" "}
            <Link to="/ansvarligt-spil/ludomani" className="text-primary underline hover:text-primary/80">guide til ludomani</Link>{" "}
            for mere om spilleafhængighed som diagnose.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Anonyme Gamblere ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Anonyme Gamblere (GA) – Selvhjælpsgrupper
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Anonyme Gamblere (GA) er en international selvhjælpsorganisation baseret på 12-trins-programmet. I Danmark findes der GA-grupper i flere større byer, og møderne er gratis og anonyme.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4 mb-6">
            <h3 className="font-bold text-base">Praktisk information om GA-møder:</h3>
            {[
              { icon: Clock, text: "Møderne varer typisk 1-1,5 time og foregår i aftentimerne (kl. 19-21)" },
              { icon: Users, text: "Ingen tilmelding nødvendig – du møder bare op" },
              { icon: Shield, text: "Fuld anonymitet – du behøver kun oplyse dit fornavn" },
              { icon: Heart, text: "Ingen professionelle terapeuter – deltagerne støtter hinanden" },
              { icon: MapPin, text: "Grupper i København, Aarhus, Odense, Aalborg og flere byer" },
              { icon: Globe, text: "Online-møder tilgængelige for hele Danmark" },
              { icon: HandHeart, text: "Gam-Anon: Parallelle grupper specifikt for pårørende" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            GA er et supplement til professionel behandling – ikke en erstatning. Mange deltagere kombinerer GA-møder med individuel terapi hos Center for Ludomani for den mest effektive recovery-strategi. Find mødetidspunkter på <a href="https://www.telefonhjoernetdk.dk/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">telefonhjoernetdk.dk</a> eller kontakt StopSpillet for hjælp til at finde en lokal gruppe.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Kommunale tilbud ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Building className="h-7 w-7 text-primary" />
            Kommunale tilbud og misbrugscentre
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Alle danske kommuner er forpligtet til at tilbyde behandling for ludomani under Servicelovens § 101. Behandlingen er gratis og foregår typisk via kommunale misbrugscentre.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4 mb-6">
            {[
              { title: "Behandlingsgaranti", desc: "Du har ret til behandling inden for 14 dage efter henvendelse til kommunen (behandlingsgaranti under Serviceloven)." },
              { title: "Ingen lægehenvisning", desc: "Du kan henvende dig direkte til dit kommunale misbrugscenter uden at gå via din læge." },
              { title: "Terapiformer", desc: "Kommunerne tilbyder typisk kognitiv adfærdsterapi, motiverende samtaler og gruppebehandling." },
              { title: "Gratis behandling", desc: "Al behandling under Servicelovens § 101 er gratis for borgeren. Der er ingen egenbetaling." },
              { title: "Fortrolighed", desc: "Kommunale misbrugscentre har tavshedspligt. Oplysninger deles ikke med andre kommunale afdelinger (fx jobcenter) uden dit samtykke." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            For at finde dit lokale misbrugscenter kan du kontakte din kommunes borgerservice eller søge på kommunens hjemmeside under "misbrugsbehandling" eller "social service". StopSpillet kan også hjælpe med at henvise dig til det rette sted.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Pårørendestøtte ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <HandHeart className="h-7 w-7 text-primary" />
            Hjælp til pårørende
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Spilleproblemer påvirker ikke kun spilleren, men hele familien. Som pårørende kan du føle dig magtesløs, vred eller skyldig. Det er vigtigt at vide, at der findes hjælp specifikt rettet mod dig.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: Phone,
                title: "StopSpillet for pårørende",
                desc: "Dedikerede rådgivere med erfaring i at støtte familiemedlemmer og partnere. Ring 70 22 28 25.",
              },
              {
                icon: Users,
                title: "Gam-Anon (GA for pårørende)",
                desc: "Selvhjælpsgrupper specifikt for familiemedlemmer til spilleafhængige. Anonyme og gratis.",
              },
              {
                icon: Heart,
                title: "Center for Ludomani – Parterapi",
                desc: "Gratis parterapi med fokus på genopbygning af tillid og fælles økonomihåndtering.",
              },
              {
                icon: Building,
                title: "Kommunale familietilbud",
                desc: "Mange kommuner tilbyder familierådgivning under Serviceloven. Kontakt din kommunes borgerservice.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <item.icon className="h-5 w-5 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="rounded-lg border border-border p-4 bg-muted/30">
            <p className="text-sm font-medium mb-2">Tips til pårørende:</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Søg hjælp for dig selv – uanset om spilleren vil have hjælp</li>
              <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Undgå at overtage kontrollen over spillerens økonomi uden deres samtykke</li>
              <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Sæt klare grænser for, hvad du accepterer – og hold fast i dem</li>
              <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Lån aldrig penge ud til en person med spilleproblemer</li>
              <li className="flex items-start gap-2"><ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Pas på dig selv – pårørende til spilleafhængige har øget risiko for stress og depression</li>
            </ul>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ── Sammenligningstabel ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Sammenligning: Hvem hjælper med hvad?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Her er en oversigt over de vigtigste hjælpetjenester i Danmark og hvad de tilbyder.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium">Tjeneste</th>
                  <th className="text-center py-3 px-2 font-medium">Telefon</th>
                  <th className="text-center py-3 px-2 font-medium">Chat</th>
                  <th className="text-center py-3 px-2 font-medium">Terapi</th>
                  <th className="text-center py-3 px-2 font-medium">Pårørende</th>
                  <th className="text-center py-3 px-2 font-medium">Gratis</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { name: "StopSpillet", telefon: true, chat: true, terapi: false, paarørende: true, gratis: true },
                  { name: "Center for Ludomani", telefon: true, chat: false, terapi: true, paarørende: true, gratis: true },
                  { name: "Anonyme Gamblere", telefon: false, chat: false, terapi: false, paarørende: true, gratis: true },
                  { name: "Kommunalt misbrugscenter", telefon: true, chat: false, terapi: true, paarørende: true, gratis: true },
                  { name: "Praktiserende læge", telefon: true, chat: false, terapi: false, paarørende: false, gratis: true },
                  { name: "Livslinjen", telefon: true, chat: true, terapi: false, paarørende: true, gratis: true },
                ].map((row) => (
                  <tr key={row.name} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-2 px-2 font-medium">{row.name}</td>
                    <td className="text-center py-2 px-2">{row.telefon ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <Ban className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
                    <td className="text-center py-2 px-2">{row.chat ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <Ban className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
                    <td className="text-center py-2 px-2">{row.terapi ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <Ban className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
                    <td className="text-center py-2 px-2">{row.paarørende ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <Ban className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
                    <td className="text-center py-2 px-2">{row.gratis ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <Ban className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Separator className="my-10" />

        {/* ── Gældsrådgivning ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Scale className="h-7 w-7 text-primary" />
            Gældsrådgivning og økonomisk støtte
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Spilleproblemer fører ofte til gældsproblemer. Hvis du eller din pårørende har akkumuleret gæld på grund af gambling, er der gratis hjælp at finde.
          </p>

          <div className="space-y-3 mb-6">
            {[
              { title: "Dansk Folkehjælp – Gældsrådgivning", desc: "Gratis, uvildig gældsrådgivning for privatpersoner. Hjælper med budgetlægning, kreditoforhandling og gældssanering. Telefon: 70 12 13 16.", url: "https://www.telefonhjoernetdk.dk/" },
              { title: "Kommunal gældsrådgivning", desc: "Mange kommuner tilbyder gratis gældsrådgivning via borgerservice. Kontakt din kommunes borgerservice for at høre om tilbuddet." },
              { title: "Gældssanering via Skifteretten", desc: "Hvis gælden er uoverskuelig, kan du søge om gældssanering via Skifteretten. Kontakt en advokat eller Retshjælpen for vejledning." },
              { title: "Forsikring og pension", desc: "Undersøg om din forsikring eller pension dækker behandling for spilleafhængighed. Nogle sundhedsforsikringer inkluderer psykologhjælp." },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardContent className="pt-4 pb-4">
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ── CTA ── */}
        <section className="mb-12">
          <Card className="bg-muted/50">
            <CardContent className="p-8 text-center">
              <h3 className="mb-4 text-xl font-bold">Du er ikke alene</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Spilleproblemer rammer mennesker på tværs af alder, køn, uddannelse og indkomst. Der er ingen skam i at bede om hjælp – det kræver mod og styrke. Det første skridt er at række ud. Alle ovenstående tjenester er fortrolige og professionelle.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <a href="tel:70222825">
                    <Phone className="mr-2 h-4 w-4" />
                    StopSpillet: 70 22 28 25
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://ludomani.dk/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Center for Ludomani
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.spillemyndigheden.dk/rofus" target="_blank" rel="noopener noreferrer">
                    <Shield className="mr-2 h-4 w-4" />
                    Tilmeld dig ROFUS
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* ── Hub-links ── */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Udforsk mere om ansvarligt spil</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Hjælpelinjerne er ét element i den samlede danske spillerbeskyttelse. Udforsk vores andre guides for at lære mere om grænseværktøjer, selvudelukkelse og lovgivning.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/ansvarligt-spil", title: "Ansvarligt Spil", desc: "Komplet guide til ansvarligt casinospil" },
              { to: "/ansvarligt-spil/rofus", title: "ROFUS Guide", desc: "Alt om selvudelukkelse via ROFUS" },
              { to: "/ansvarligt-spil/selvudelukkelse-guide", title: "Selvudelukkelse Guide", desc: "Alle former for selvudelukkelse" },
              { to: "/ansvarligt-spil/spillegraenser", title: "Spillegrænser", desc: "Guide til alle typer grænseværktøjer" },
              { to: "/ansvarligt-spil/ludomani", title: "Ludomani Guide", desc: "Alt om spilleafhængighed i Danmark" },
              { to: "/ansvarligt-spil/stopspillet", title: "StopSpillet Guide", desc: "Gratis rådgivning for spillere" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:bg-muted"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/ansvarligt-spil/hjaelpelinjer" />
        <AnsvarligtSpilResources currentPath="/ansvarligt-spil/hjaelpelinjer" />
        <RelatedGuides currentPath="/ansvarligt-spil/hjaelpelinjer" />
        <FAQSection title="Ofte Stillede Spørgsmål om Hjælpelinjer" faqs={hjaelpelinjerFaqs} />
        <AuthorBio author="ajse" showCommunity={false} />
      </div>
    </>
  );
};

export default HjaelpelinjerGuide;

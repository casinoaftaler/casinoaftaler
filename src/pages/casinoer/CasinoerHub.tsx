import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import casinoerHubHero from "@/assets/heroes/casinoer-hub-hero.jpg";
import {
  Zap, ShieldCheck, Monitor, Globe, Calculator, Smartphone,
  ChevronRight, Trophy, Star, Layers,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const SUBCATEGORIES = [
  {
    title: "Hurtig Udbetaling Casino",
    href: "/casinoer/hurtig-udbetaling",
    icon: Zap,
    badge: "Populær",
    badgeVariant: "default" as const,
    description:
      "Danske casinoer med udbetaling på under 24 timer. Sammenlign Trustly, MobilePay og e-wallet hastigheder baseret på reelle tests.",
  },
  {
    title: "Casino med Høj RTP",
    href: "/casinoer/hoej-rtp",
    icon: Star,
    badge: "High EV",
    badgeVariant: "secondary" as const,
    description:
      "Find casinoer med de bedste RTP-gennemsnit. Lær at identificere løse vs. stramme huse og beregn din forventede returnering.",
  },
  {
    title: "Crypto Casino Danmark",
    href: "/casinoer/crypto-casino",
    icon: Globe,
    badge: "Niche",
    badgeVariant: "outline" as const,
    description:
      "Oversigt over Bitcoin- og kryptocasinoer tilgængelige fra Danmark. Licenskrav, anonymitet, gebyrer og crypto-bonus vilkår.",
  },
  {
    title: "Licenserede Casinoer",
    href: "/licenserede-casinoer",
    icon: ShieldCheck,
    badge: "Vigtig",
    badgeVariant: "default" as const,
    description:
      "Kun Spillemyndighed-licenserede operatører er lovlige i Danmark. Se hvad licensen kræver, og hvordan du tjekker et casino.",
  },
  {
    title: "VR Casinoer",
    href: "/casinoer/vr-casinoer",
    icon: Monitor,
    badge: "Fremtid",
    badgeVariant: "outline" as const,
    description:
      "Virtual Reality-casinoer er stadig i opbygningsfasen. Her er et realistisk billede af VR-casinoteknologiens aktuelle stand og potentiale.",
  },
  {
    title: "Mobil Casino",
    href: "/casinoer/mobil-casinoer",
    icon: Smartphone,
    badge: "Mobil",
    badgeVariant: "secondary" as const,
    description:
      "Alle moderne danske casinoer er mobiloptimerede – men kvaliteten varierer. Se hvad der adskiller et godt mobil-casino fra et middelmådigt.",
  },
  {
    title: "Spil Casino For Sjov",
    href: "/casinoer/spil-casino-for-sjov",
    icon: Trophy,
    badge: "Gratis",
    badgeVariant: "outline" as const,
    description:
      "Spil spillemaskiner gratis i demoversion uden at oprette konto. Ideel til at lære et spil at kende, inden du indsætter penge.",
  },
  {
    title: "Casino og Skat i Danmark",
    href: "/casinoer/casino-og-skat",
    icon: Calculator,
    badge: "Juridisk",
    badgeVariant: "secondary" as const,
    description:
      "Gevinster fra licenserede casinoer er skattefrie i Danmark. Læs de præcise regler, undtagelser og hvornår SKAT alligevel er relevant.",
  },
];

const faqs = [
  {
    question: "Hvilke casinoer er lovlige i Danmark?",
    answer: "Kun casinoer med en dansk spillelicens udstedt af Spillemyndigheden er lovlige at bruge fra Danmark. Du kan tjekke et casinoes licens direkte på spillemyndigheden.dk. Alle casinoer vi anbefaler på Casinoaftaler.dk har dansk licens.",
  },
  {
    question: "Hvad er forskellen på hurtig udbetaling og normal udbetaling?",
    answer: "Hurtig udbetaling refers typisk til udbetalingstider under 24 timer – ofte endda 0–2 timer via Trustly eller MobilePay. Normal udbetaling via bankoverførsel tager 1–5 hverdage. Valget af betalingsmetode er den primære faktor.",
  },
  {
    question: "Skal jeg betale skat af casino-gevinster i Danmark?",
    answer: "Nej. Gevinster fra Spillemyndighed-licenserede casinoer er 100% skattefrie for den danske spiller. Casinoet betaler afgiften til staten. Eneste undtagelse er hvis du systematisk spiller professionelt – men det er en ekstremt sjælden juridisk edge case.",
  },
  {
    question: "Hvad er RTP og hvorfor er det vigtigt?",
    answer: "RTP (Return to Player) er den procentdel af alle indskudte penge, et spil statistisk set returnerer over tid. En spillemaskine med 96% RTP returnerer i gennemsnit 96 kr. for hver 100 kr. sat ind. Casinoer med høj RTP tilbyder bedre odds på tværs af deres spilbibliotek.",
  },
];

const jsonLd = [
  buildArticleSchema({
    headline: "Casinoer – Komplet Guide til Hurtig Udbetaling, RTP, Licens og Mere",
    description: "Hub-side for alle casinoguides: hurtig udbetaling, høj RTP, crypto, licenserede casinoer, VR, mobil, gratis spil og skat i Danmark.",
    url: `${SITE_URL}/casinoer`,
    datePublished: "2026-02-20",
    dateModified: "2026-02-20",
  }),
  buildFaqSchema(faqs),
];

export default function CasinoerHub() {
  return (
    <>
      <SEO
        title="Casinoer – Guide til Hurtig Udbetaling, RTP og Licens"
        description="Komplet oversigt over alle casinotyper og temaer: hurtig udbetaling, høj RTP, crypto, licenserede casinoer, VR, mobil og skatteforhold i Danmark."
        jsonLd={jsonLd}
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Layers className="mr-1.5 h-3.5 w-3.5" />
              Casino Guide Hub
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casinoer – Alt du skal vide
            </h1>
            <p className="text-lg text-white/80">
              Denne hub samler alle vores dybdegående guides om specifikke casino-kategorier.
              Uanset om du leder efter hurtig udbetaling, høj RTP eller information om skat på gevinster – her finder du det analytiske fundament.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar
          author="jonas"
          date="2026-02-20"
          readTime="5 min"
        />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={casinoerHubHero}
            alt="Casino guide hub – kompas med casino chips og spillekort"
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* Intro Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Alle Casino-Kategorier</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Nedenfor finder du alle vores specialguides opdelt efter tema. Hver guide dækker en specifik casino-kategori med
            dybdegående analyser, sammenligninger og konkrete anbefalinger baseret på reelle tests. Fra{" "}
            <Link to="/casinoer/hurtig-udbetaling" className={linkClass}>hurtig udbetaling</Link> til{" "}
            <Link to="/casinoer/hoej-rtp" className={linkClass}>høj RTP</Link> og{" "}
            <Link to="/casinoer/casino-og-skat" className={linkClass}>skat på gevinster</Link>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUBCATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.href} to={cat.href}>
                  <Card className="h-full hover:shadow-md transition-shadow hover:border-primary/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                          <CardTitle className="text-base leading-snug">{cat.title}</CardTitle>
                        </div>
                        <Badge variant={cat.badgeVariant} className="text-xs flex-shrink-0">
                          {cat.badge}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {cat.description}
                      </p>
                      <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium">
                        Læs guide <ChevronRight className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Editorial context */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Hvad adskiller et godt dansk casino fra et middelmådigt?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det er let at falde for et flashy design og en stor velkomstbonus. Men det der reelt definerer et
            kvalitetscasino er tre ting: <strong>licens</strong>, <strong>udbetalingshastighed</strong> og <strong>RTP-transparens</strong>.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Et casino med dansk licens fra Spillemyndigheden er underlagt løbende kontrol. Det betyder at din indbetaling
            er i sikre hænder, at bonusvilkårene overholder de lovpligtige 10x-loft på omsætningskrav, og at casinoet
            kan rapporteres og sanktioneres ved overtrædelser. Læs mere i vores guide til{" "}
            <Link to="/casino-licenser" className={linkClass}>licenserede casinoer i Danmark</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Udbetalingshastighed er den anden kritiske faktor. Vi tester reelle udbetalingstider på de casinoer vi
            anbefaler. Casinoer som ikke kan udbetale inden for 24 timer via e-wallet havner langt nede på vores liste.
            Se vores{" "}
            <Link to="/casinoer/hurtig-udbetaling" className={linkClass}>guide til hurtig udbetaling</Link> for en
            fuld sammenligning.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            RTP (Return to Player) angiver den matematiske returnering af et spil over tid. Et casino der aktivt
            promoverer spil med RTP under 94% uden at oplyse det, prioriterer ikke din oplevelse. Vores{" "}
            <Link to="/casinoer/hoej-rtp" className={linkClass}>RTP-guide</Link> giver dig de konkrete tal og de
            casinoer der tilbyder det bedste langsigtede EV.
          </p>
        </section>

        <InlineCasinoCards title="Anbefalede Casinoer" />

        <FAQSection
          title="Ofte stillede spørgsmål om casinoer"
          faqs={faqs}
        />

        <div className="mt-10">
          <AuthorBio author="jonas" />
        </div>

        <div className="mt-8">
          <RelatedGuides currentPath="/casinoer" />
        </div>
      </div>
    </>
  );
}

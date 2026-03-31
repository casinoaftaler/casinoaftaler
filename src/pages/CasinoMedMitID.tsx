import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Fingerprint,
  Smartphone,
  Clock,
  Zap,
  Eye,
  Users,
  AlertTriangle,
  Shield,
  Key,
  Star,
  Timer,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";
import { ReviewMoneyLinks } from "@/components/ReviewMoneyLinks";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import type { ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er MitID, og hvorfor bruger casinoer det?",
    answer: (
      <>
        MitID er Danmarks nationale digitale identitetsløsning, der erstattede NemID i 2022. Alle casinoer med <Link to="/casino-med-dansk-licens" className={linkClass}>dansk licens</Link> er lovmæssigt forpligtede til at bruge MitID til aldersverifikation (18+) og identitetskontrol (<Link to="/ordbog/kyc" className={linkClass}>KYC</Link>). Det sikrer at kun godkendte spillere kan oprette konti, og er en central del af <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>-lovgivningen.
      </>
    ),
  },
  {
    question: "Hvor lang tid tager det at oprette en casinokonto med MitID?",
    answer: "Kontooprettelse med MitID tager typisk 2-5 minutter. Du åbner MitID-appen, godkender din identitet, og casinoet opretter automatisk din konto med dine verificerede oplysninger. Hos de bedste casinoer kan du spille inden for 3 minutter fra du starter registreringen. Det er langt hurtigere end traditionel registrering med manuel verifikation.",
  },
  {
    question: "Er det sikkert at bruge MitID på online casinoer?",
    answer: (
      <>
        Ja, MitID er ekstremt sikkert. Det anvender stærk to-faktor-autentificering (biometri + enhed), og casinoet modtager kun de nødvendige oplysninger (navn, CPR-nummer, alder). Dine bankoplysninger og passwords deles aldrig via MitID. <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> regulerer hvordan casinoer håndterer dine data, og alle licenserede operatører overholder GDPR og dansk databeskyttelseslovgivning.
      </>
    ),
  },
  {
    question: "Kan jeg spille på casino uden MitID i Danmark?",
    answer: (
      <>
        Nej, ikke hos casinoer med dansk licens. MitID-verifikation er lovkrav for alle <Link to="/casino-med-dansk-licens" className={linkClass}>danske licenserede casinoer</Link>. Casinoer uden MitID-krav er ulicenserede og opererer uden <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighedens</Link> godkendelse – hvilket indebærer <Link to="/casino-uden-rofus" className={linkClass}>betydelige risici</Link> for spilleren.
      </>
    ),
  },
  {
    question: "Hvad sker der, hvis MitID-appen ikke virker?",
    answer: "Hvis din MitID-app ikke fungerer, kan du: 1) Opdatere appen til nyeste version, 2) Genstarte din telefon, 3) Tjekke internetforbindelsen, 4) Bruge MitID-kodeviseren som alternativ. Kontakt MitID-support på 72 68 86 00 for teknisk hjælp. Casinoets kundeservice kan ikke hjælpe med MitID-problemer direkte, da det er et eksternt system.",
  },
  {
    question: "Kan udlændinge bruge MitID til at spille på danske casinoer?",
    answer: "MitID er kun tilgængeligt for personer med dansk CPR-nummer. Udlændinge uden dansk CPR kan ikke oprette MitID og dermed ikke spille hos danske licenserede casinoer. Det er en del af den danske regulering, der sikrer at kun personer med tilknytning til Danmark kan spille – og at aldersverifikation og ROFUS-tilslutning fungerer korrekt.",
  },
];

const mitidFordele = [
  {
    icon: Fingerprint,
    title: "Sikker identitetskontrol",
    description: "To-faktor-autentificering med biometri sikrer at ingen kan oprette en konto i dit navn. Din identitet verificeres øjeblikkeligt mod det danske CPR-register.",
    tag: "Sikkerhed",
  },
  {
    icon: Zap,
    title: "Hurtig kontooprettelse (2-5 min)",
    description: "Ingen manuel indtastning af personoplysninger – MitID udfylder automatisk navn, adresse og fødselsdato. Du kan spille inden for minutter efter registrering.",
    tag: "Hastighed",
  },
  {
    icon: Shield,
    title: "Automatisk ROFUS-tjek",
    description: "MitID-verifikation kontrollerer automatisk din ROFUS-status. Er du selvudelukket, blokeres kontooprettelsen – en vigtig beskyttelse mod impulsspil.",
    tag: "Beskyttelse",
  },
  {
    icon: Lock,
    title: "GDPR-sikret datahåndtering",
    description: "Casinoet modtager kun nødvendige oplysninger. Dine bankoplysninger og passwords deles aldrig via MitID. Alt datahåndtering følger dansk og EU-lovgivning.",
    tag: "Privatliv",
  },
];

const CasinoMedMitID = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Casino med MitID – Sikker Kontooprettelse og Verifikation 2026",
    description: "Alt om MitID på danske casinoer: hurtig kontooprettelse, sikker verifikation og automatisk ROFUS-tjek. Find de bedste casinoer med MitID-login.",
    url: `${SITE_URL}/casino-med-mitid`,
    datePublished: "2026-03-31",
  });

  return (
    <>
      <SEO
        title="Casino med MitID – Sikker Registrering på 2 Minutter 2026 | Casinoaftaler"
        description="Casino med MitID: Hurtig og sikker kontooprettelse med to-faktor-autentificering. Automatisk ROFUS-tjek og aldersverifikation hos alle danske licenserede casinoer."
        jsonLd={[faqJsonLd, articleJsonLd]}
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
              <Fingerprint className="mr-1.5 h-3.5 w-3.5" />
              Sikker verifikation & login
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casino med MitID
            </h1>
            <p className="text-lg text-white/80">
              MitID sikrer hurtig og tryg kontooprettelse hos danske casinoer – med automatisk aldersverifikation, ROFUS-kontrol og to-faktor-autentificering på under 2 minutter.
            </p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="frederik" readTime="11 Min." />

        <SnippetAnswer answer="Alle danske licenserede casinoer bruger MitID til sikker identitetskontrol og aldersverifikation. Kontooprettelse tager 2-5 minutter med automatisk ROFUS-tjek og to-faktor-autentificering via biometri." />

        <QuickComparisonTable count={3} title="Bedste casinoer med MitID-login" prioritySlugs={["spilleautomaten", "leovegas", "comeon"]} />

        {/* Intro */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Hvad er MitID på casino?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MitID er Danmarks nationale digitale identitetsløsning, og alle casinoer med <Link to="/casino-med-dansk-licens" className={linkClass}>dansk spillelicens</Link> er forpligtede til at bruge det. Når du opretter en konto hos et dansk online casino, bruger du MitID-appen til at bekræfte din identitet – præcis som når du logger ind på din netbank eller borger.dk.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MitID-verifikation sikrer tre ting: at du er den, du siger du er (identitetskontrol), at du er over 18 (aldersverifikation), og at du ikke er registreret i <Link to="/ansvarligt-spil/rofus" className={linkClass}>ROFUS</Link> (selvudelukkelseskontrol). Det er en automatisk og øjeblikkelig proces, der typisk tager under 30 sekunder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For spilleren betyder MitID en markant hurtigere og mere sikker kontooprettelse sammenlignet med traditionel manuel verifikation. Du slipper for at uploade ID-dokumenter og vente på manuel godkendelse – alt verificeres øjeblikkeligt via det danske CPR-register.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Fordele */}
        <section className="mb-10">
          <h2 className="mb-6 text-3xl font-bold">4 fordele ved MitID på casino</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {mitidFordele.map((item) => (
              <Card key={item.title} className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <item.icon className="h-6 w-6 text-primary" />
                    <Badge variant="outline" className="text-xs">{item.tag}</Badge>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Trin-for-trin guide */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Sådan opretter du en casinokonto med MitID</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Processen er enkel og tager typisk under 5 minutter fra start til du kan spille:
          </p>
          <div className="space-y-3">
            {[
              { step: "1", title: "Vælg et casino", desc: "Find et dansk licenseret casino fra vores anbefalinger. Tjek bonus, spiludvalg og udbetalingstider." },
              { step: "2", title: "Klik 'Opret konto'", desc: "Angiv din email og vælg en adgangskode. Casinoet vil bede dig verificere via MitID." },
              { step: "3", title: "Åbn MitID-appen", desc: "Godkend anmodningen med fingeraftryk, ansigtsgenkendelse eller pinkode. Dine oplysninger overføres automatisk." },
              { step: "4", title: "Automatisk verifikation", desc: "Casinoet verificerer din identitet, alder og ROFUS-status øjeblikkeligt. Ingen ventetid." },
              { step: "5", title: "Indbetal og spil", desc: "Vælg betalingsmetode (Trustly er hurtigst), indbetal og begynd at spille. Hele processen tager 2-5 minutter." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 rounded-lg border border-border p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* MitID og sikkerhed */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">MitID og datasikkerhed</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mange spillere er bekymrede for at dele personoplysninger med online casinoer. Her er hvad du skal vide om MitID-sikkerhed:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <p className="font-semibold mb-2">Hvad deler MitID med casinoet?</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• <strong>Deles:</strong> Fulde navn, CPR-nummer (til aldersverifikation), adresse</li>
                  <li>• <strong>Deles IKKE:</strong> Bankoplysninger, passwords, sundhedsdata, skatteoplysninger</li>
                  <li>• Casinoet bruger kun oplysningerne til kontooprettelse og <Link to="/ordbog/kyc" className={linkClass}>KYC</Link>-verifikation</li>
                  <li>• Al datahåndtering reguleres af GDPR og <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighedens</Link> krav</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* MitID vs. uden MitID */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Casino med MitID vs. casino uden verifikation</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casinoer der <strong>ikke</strong> kræver MitID-verifikation har ikke dansk licens og opererer uden <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighedens</Link> godkendelse. Det indebærer <Link to="/casino-uden-rofus" className={linkClass}>betydelige risici</Link>:
          </p>
          <div className="space-y-3">
            {[
              { icon: AlertTriangle, title: "Ingen alderskontrol", desc: "Uden MitID er der ingen garanti for at mindreårige forhindres i at spille – et alvorligt problem for spillerbeskyttelse." },
              { icon: AlertTriangle, title: "Ingen ROFUS-beskyttelse", desc: "Selvudelukkede spillere kan omgå ROFUS og spille videre – hvilket underminerer et vigtigt værktøj mod ludomani." },
              { icon: AlertTriangle, title: "Skattemæssige konsekvenser", desc: "Gevinster fra ulicenserede casinoer beskattes som personlig indkomst (op til 52%), modsat skattefrie gevinster hos danske casinoer." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-destructive/30 p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <InlineCasinoCards title="Casinoer med hurtig MitID-kontooprettelse" />

        <LatestNewsByCategory pagePath="/casino-med-mitid" />
        <ReviewMoneyLinks />
        <RelatedGuides currentPath="/casino-med-mitid" />
        <FAQSection title="Ofte stillede spørgsmål om casino med MitID" faqs={faqs} />
        <AuthorBio author="frederik" />
      </ContentPageLayout>
      <StickyCtaBySlug slug="leovegas" />
    </>
  );
};

export default CasinoMedMitID;

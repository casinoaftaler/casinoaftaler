import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Sparkles, CheckCircle2, XCircle, AlertTriangle, Scale, FileText, Users, TrendingUp, Gavel } from "lucide-react";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad kræver en dansk casinolicens fra Spillemyndigheden?",
    answer: "En dansk casinolicens kræver opfyldelse af omfattende betingelser: bankgaranti på minimum 750.000 kr. som sikkerhed for spillernes indeståender, fuld implementering af ROFUS-tilslutning, RNG-certificering af samtlige spil via akkrediterede testlaboratorier som eCOGRA eller iTech Labs, SSL-kryptering (minimum TLS 1.2), grundigt baggrundstjek af ejere og ledelse (fit & proper test), compliance-audit af hele platformens tekniske infrastruktur, og dokumenteret erfaring med spilledrift. Processen tager typisk 3–6 måneder fra komplet ansøgning til godkendelse og koster operatøren betydelige beløb i gebyrer og compliance-omkostninger.",
  },
  {
    question: "Hvordan verificerer jeg, at et nyt casino har dansk licens?",
    answer: (
      <>
        Du kan verificere et casinos licensstatus direkte på <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighedens</Link> hjemmeside under sektionen 'Tilladelsesindehavere'. Her finder du en komplet, opdateret liste over alle aktive licensindehavere med deres tilladelsesnumre og licenstype. Alternativt kan du tjekke casinoets bundtekst (footer), hvor licensnummeret typisk er angivet som "Reg. nr. XX-XXXXXX". Vær opmærksom på, at nogle ulovlige casinoer viser falske licensnumre – verifikation direkte hos Spillemyndigheden er den eneste sikre metode.
      </>
    ),
  },
  {
    question: "Hvilke fordele giver dansk licens sammenlignet med udenlandske?",
    answer: (
      <>
        Dansk licens giver fem afgørende fordele: skattefri gevinster, max 10x <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, ROFUS-selvudelukkelse, klageadgang via Spillemyndigheden og bankgaranti på min. 750.000 kr. Ingen MGA-, Curaçao- eller Gibraltar-licens matcher disse rettigheder for danske spillere.
      </>
    ),
  },
  {
    question: "Kan et nyt casino miste sin danske licens?",
    answer: "Ja. Spillemyndigheden kan tilbagetrække, suspendere eller begrænse en licens ved overtrædelse. Typiske årsager: manglende ROFUS-compliance, overtrædelse af markedsføringsregler, fejl i RNG-systemer eller utilstrækkelige kapitalkrav. Vi monitorerer løbende licensstatus og fjerner øjeblikkeligt casinoer, der mister deres licens.",
  },
  {
    question: "Hvad er forskellen på en dansk licens og en MGA-licens?",
    answer: (
      <>
        Nøgleforskellene for danske spillere: dansk licens = skattefri gevinster, max 10x omsætningskrav, ROFUS-tilslutning, dansk klageadgang. MGA-licens = gevinster er skattepligtige i Danmark, intet omsætningsloft (ofte 30–60x), ingen ROFUS og klageadgang kun på Malta. Se vores guide til <Link to="/nye-casinoer/uden-rofus" className={linkClass}>casinoer uden ROFUS</Link> for mere om risici.
      </>
    ),
  },
  {
    question: "Hvad koster en dansk casinolicens?",
    answer: "Ansøgningsgebyret er 286.500 kr. (2026-sats). Dertil kommer årlige tilsynsafgifter baseret på bruttospilindtægt, typisk 0,75% af BSI. Operatøren skal også stille bankgaranti på minimum 750.000 kr. og investere i compliance-infrastruktur (KYC/AML-systemer, ROFUS-integration, RNG-certificering). Den samlede etableringsinvestering for en ny dansk licensindehaver ligger typisk på 2–5 mio. kr.",
  },
  {
    question: "Hvor lang tid tager det at få dansk licens?",
    answer: "Fra komplet ansøgning til godkendelse tager det typisk 3–6 måneder. Perioden omfatter fit & proper-test af ejerkreds (4–8 uger), teknisk audit af spilplatform (2–4 uger), compliance-gennemgang af ansvarligt spil-procedurer (2–3 uger) og endelig godkendelse med eventuelle betingelser. Ufuldstændige ansøgninger kan forlænge processen med yderligere 2–3 måneder.",
  },
  {
    question: "Hvad sker der med mine penge, hvis et licenseret casino lukker?",
    answer: "Bankgarantien på minimum 750.000 kr. er øremærket til spillernes indeståender og kan ikke bruges til operatørens drift. Ved konkurs eller licenstilbagekaldelse sikrer garantien, at spillere får deres indestående udbetalt. Historisk set har ingen dansk licenseret operatør lukket uden at spillere har fået deres penge. Spillemyndigheden overvåger alle operatørers finansielle sundhed løbende.",
  },
];

const NyeCasinoerDanskLicens = () => {
  const articleSchema = buildArticleSchema({
    headline: "Nye Casinoer med Dansk Licens 2026",
    description: "Find nye casinoer med gyldig dansk licens fra Spillemyndigheden. Sikre spillesteder med skattefri gevinster og ROFUS-tilslutning.",
    url: `${SITE_URL}/nye-casinoer/dansk-licens`,
    datePublished: "2026-01-20",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SEO
        title="Nye Casinoer med Dansk Licens – Sikre Spillesteder 2026"
        description="Komplet liste over nye casinoer med gyldig dansk licens fra Spillemyndigheden. Skattefri gevinster, ROFUS og max 10x omsætningskrav."
        jsonLd={[articleSchema, faqSchema]}
      />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ background: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))' }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><ShieldCheck className="mr-1.5 h-3.5 w-3.5" />Licenserede Spillesteder</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Nye Casinoer med Dansk Licens</h1>
            <p className="text-lg text-white/80">Find de nyeste online casinoer med gyldig licens fra Spillemyndigheden. Alle casinoer er verificerede, sikre og tilbyder skattefri gevinster.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="20 Min." />


        <SnippetAnswer answer="Nye casinoer med dansk licens fra Spillemyndigheden sikrer ROFUS-tilslutning, skattefri gevinster og fuld spillerbeskyttelse." />

        <QuickComparisonTable count={3} title="Nye Licenserede Casinoer – Top 3" prioritySlugs={["spildansknu", "betinia", "swift-casino"]}} />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvorfor dansk licens er afgørende for nye casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når du vælger et nyt casino, er dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> det absolutte minimumskrav. Licensen er din juridiske garanti for, at casinoet opererer lovligt i Danmark og overholder strenge regler om spillerbeskyttelse, fairness, databeskyttelse og <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>. Uden dansk licens har du ingen af de rettigheder, som dansk lovgivning giver dig som spiller – og dine gevinster bliver skattepligtige.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hos <Link to="/nye-casinoer" className={linkClass}>Casinoaftaler.dk</Link> anbefaler vi udelukkende nye casinoer med dansk licens. Det sikrer dig som spiller fem afgørende fordele: alle gevinster er skattefri (casinoet betaler 28% afgift), <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> på bonusser er lovmæssigt begrænset til maksimalt 10x, du har adgang til ROFUS-selvudelukkelse, du kan klage til Spillemyndigheden ved tvister, og dine penge er sikret via bankgaranti.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den danske licensmodel er anerkendt som en af Europas mest spillervenlige. Med et lovmæssigt omsætningsloft på 10x – sammenlignet med 30–60x hos MGA-licenserede casinoer – har danske spillere markant bedre odds for at realisere bonusgevinster. Denne guide fokuserer på, hvad en dansk licens specifikt indebærer for nye casinoer, og hvordan vi verificerer dem. For en bredere sammenligning af alle licenstyper, se vores <Link to="/casino-licenser" className={linkClass}>guide til casino-licenser</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I 2026 er adgangskravene til det danske marked blevet skærpet yderligere, hvilket betyder, at nye casinoer med dansk licens gennemgår en endnu mere grundig screening end tidligere. Det er en fordel for dig som spiller – kun de mest seriøse og kapitalstærke operatører slipper igennem nåleøjet.
          </p>
        </section>

        <InlineCasinoCards title="Nye Licenserede Casinoer i Danmark" />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">De 6 lovmæssige rettigheder ved dansk licens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En dansk casinolicens giver dig som spiller seks konkrete, lovmæssigt forankrede rettigheder. Disse rettigheder er unikke for det danske marked og findes ikke i nogen anden jurisdiktion i præcis denne kombination:
          </p>
          <div className="space-y-3">
            {[
              { title: "1. Skattefri gevinster (Spilleafgiftsloven §6)", desc: "Alle gevinster fra casinoer med dansk licens er skattefri for danske spillere. Casinoet betaler 28% afgift af bruttospilindtægten til SKAT. Du skal aldrig selvangive casinogevinster fra danske licenserede casinoer – uanset beløbet. Vinder du 1 mio. kr., er det hele dit. Til sammenligning: gevinster fra udenlandske casinoer er skattepligtige med op til 45%." },
              { title: "2. Maksimalt 10x omsætningskrav (Bekendtgørelse §8)", desc: "Dansk lovgivning begrænser omsætningskrav på bonusser til 10x – det laveste lovmæssige loft i Europa. Til sammenligning tillader MGA-licenser op til 60x. En dansk bonus på 1.000 kr. med 10x krav kræver 10.000 kr. i spil. En MGA-bonus på 1.000 kr. med 50x krav kræver 50.000 kr. Den danske bonus har 5x højere sandsynlighed for reel udbetaling." },
              { title: "3. ROFUS-selvudelukkelse (Spilleloven §27a)", desc: "Alle licenserede casinoer er tilsluttet ROFUS-registret, der giver mulighed for frivillig selvudelukkelse i 24 timer, 1, 3 eller 6 måneder, eller permanent. Registreringen gælder alle danske spillesteder og er et centralt værktøj for ansvarligt spil. Over 35.000 danske spillere har benyttet ROFUS." },
              { title: "4. Dansk klageadgang (Spilleloven §41)", desc: "Oplever du problemer med et licenseret casino, kan du klage direkte til Spillemyndigheden. De kan mægle i tvister, pålægge casinoet at handle, og i yderste konsekvens sanktionere operatøren. Du har denne ret uanset tvistens størrelse – en ret du ikke har ved udenlandske casinoer." },
              { title: "5. Bankgaranti og indskydergaranti (Spilleloven §36)", desc: "Alle licensindehavere skal stille en bankgaranti på minimum 750.000 kr. hos et dansk pengeinstitut. Garantien er øremærket til spillernes indeståender og kan ikke bruges til operatørens drift. Det sikrer dine penge selv ved konkurs – en unik dansk beskyttelse." },
              { title: "6. Dansk kundesupport og kommunikation", desc: "Nye casinoer med dansk licens tilbyder typisk support på dansk via live chat og e-mail. Spillemyndigheden kræver, at alle væsentlige vilkår, bonusbetingelser og ansvarligt spil-informationer er tilgængelige på dansk. Det eliminerer sprogbarrierer og misforståelser." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spillemyndighedens licensproces – trin for trin</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> er den danske tilsynsmyndighed under Skatteministeriet, der udsteder og overvåger casinolicenser. Licensprocessen er designet til at sikre, at kun seriøse, kapitalstærke operatører med dokumenteret kompetence får adgang til det danske marked. For dig som spiller er det en kvalitetsgaranti. Her er processen i detaljer:
          </p>
          <div className="space-y-3">
            {[
              { step: "Fase 1: Formel ansøgning (uge 1–2)", desc: "Operatøren indsender en komplet ansøgning med selskabsdokumentation, ejerskabsstruktur, forretningsplan for det danske marked, teknisk dokumentation for spilplatformen og en detaljeret compliance-plan. Ansøgningsgebyret på 286.500 kr. betales ved indsendelse. Ufuldstændige ansøgninger returneres." },
              { step: "Fase 2: Fit & proper-test (uge 3–10)", desc: "Spillemyndigheden gennemfører grundige baggrundstjek af alle ejere, bestyrelsesmedlemmer og nøglepersoner. Det inkluderer straffeattester fra alle relevante lande, finansielle baggrundstjek, verifikation af erhvervserfaring og vurdering af professionel integritet. Enhver involvering i ulovligt spil eller økonomisk kriminalitet er diskvalificerende." },
              { step: "Fase 3: Teknisk audit (uge 8–14)", desc: "En uafhængig teknisk revision af spilplatformen gennemføres parallelt med fit & proper-testen. Auditen dækker: server-infrastruktur og redundans, RNG-systemer og certificering (eCOGRA/iTech Labs), SSL/TLS-implementering, ROFUS-integrationstest, databehandling og GDPR-compliance, og penetrationstest af hele platformen." },
              { step: "Fase 4: Compliance-gennemgang (uge 12–18)", desc: "Spillemyndigheden evaluerer operatørens compliance-plan for ansvarligt spil, hvidvaskforebyggelse (AML/KYC-procedurer), markedsføringspraksis og klagebehandlingsprocedurer. Operatøren skal demonstrere fungerende systemer – ikke blot dokumentation. Testscenarier gennemspilles." },
              { step: "Fase 5: Finansiel verifikation (uge 14–20)", desc: "Bankgarantien på minimum 750.000 kr. skal stilles hos et dansk pengeinstitut. Operatørens driftskapital verificeres, og der skal demonstreres tilstrækkelig likviditet til minimum 6 måneders drift uden indtægt. Det sikrer, at nye operatører kan overleve en langsom opstart." },
              { step: "Fase 6: Godkendelse og lancering (uge 18–24)", desc: "Spillemyndigheden udsteder licensen med eventuelle specifikke betingelser. Operatøren har typisk 30 dage til at gennemføre en 'soft launch' med begrænset adgang, efterfulgt af fuld lancering. Spillemyndigheden overvåger tæt i de første 90 dage og gennemfører uanmeldte compliance-audits." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">{i + 1}</span>
                <div>
                  <h3 className="font-semibold">{item.step}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-primary">286.500 kr.</p>
              <p className="text-xs text-muted-foreground">ansøgningsgebyr</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-primary">3–6 mdr.</p>
              <p className="text-xs text-muted-foreground">behandlingstid</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-primary">750.000 kr.</p>
              <p className="text-xs text-muted-foreground">min. bankgaranti</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-primary">5 år</p>
              <p className="text-xs text-muted-foreground">licensperiode</p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Løbende tilsyn og compliance-overvågning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En dansk licens er ikke en engangsgodkendelse – det er en løbende forpligtelse. Spillemyndigheden gennemfører systematisk tilsyn med alle licensindehavere for at sikre fortsat compliance. For nye casinoer er tilsynsfrekvensen højere i de første 12 måneder. Her er de vigtigste tilsynsmekanismer:
          </p>
          <div className="space-y-3">
            {[
              { title: "Uanmeldte compliance-audits", desc: "Spillemyndigheden gennemfører uanmeldte inspektioner af casinoets drift, herunder gennemgang af transaktionsdata, AML-procedurer og ansvarligt spil-værktøjer. Nye casinoer inspiceres typisk 2–4 gange i det første år, derefter årligt. Auditresultater er fortrolige, men alvorlige overtrædelser offentliggøres." },
              { title: "Månedlig rapportering", desc: "Alle licensindehavere skal indsende månedlige rapporter til Spillemyndigheden med data om: bruttospilindtægt, antal aktive spillere, ROFUS-henvendelser, klager og deres behandling, og eventuelle tekniske fejl eller nedbrud. Manglende eller forsinkede rapporter kan udløse sanktioner." },
              { title: "RNG-recertificering", desc: "Random Number Generator-systemer recertificeres af akkrediterede testlaboratorier (eCOGRA, iTech Labs, BMM Testlabs) mindst én gang årligt. Certifikatet skal dokumentere, at alle spil returnerer resultater inden for det deklarerede RTP-interval. Afvigelser kan udløse øjeblikkelig suspension af berørte spil." },
              { title: "Finansielt tilsyn", desc: "Spillemyndigheden overvåger alle operatørers finansielle sundhed via kvartalsregnskaber, verifikation af bankgarantiens gyldighed og vurdering af likviditetsposition. Operatører der viser tegn på finansiel ustabilitet, kan pålægges forstærkede rapporteringskrav eller øget bankgaranti." },
              { title: "Spillerklagebehandling", desc: "Alle klager fra spillere registreres og monitoreres af Spillemyndigheden. Et mønster af klager inden for samme område (f.eks. forsinkede udbetalinger, ugennemsigtige bonusvilkår) kan udløse en fokuseret undersøgelse. Operatører der ikke behandler klager rettidigt, risikerer sanktioner." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Gavel className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Dansk licens vs. udenlandsk licens – detaljeret sammenligning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Forskellen mellem en dansk licens og en udenlandsk licens er afgørende for din oplevelse og sikkerhed som dansk spiller. Her er en direkte, punkt-for-punkt sammenligning med de tre mest almindelige udenlandske licenstyper:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg"><ShieldCheck className="h-5 w-5 text-primary" />Dansk Licens</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Gevinster er <strong>skattefri</strong> (operatøren betaler 28% BSI-afgift)</p>
                <p>• Max 10x omsætningskrav (lovmæssigt loft)</p>
                <p>• ROFUS-selvudelukkelse (24h, 1/3/6 mdr., permanent)</p>
                <p>• Klageadgang via Spillemyndigheden (dansk lov)</p>
                <p>• Bankgaranti min. 750.000 kr. (øremærket spillere)</p>
                <p>• MitID-verifikation (hurtig, sikker KYC)</p>
                <p>• Dansk kundesupport og kommunikation</p>
                <p>• Årlig RNG-recertificering via akkrediterede labs</p>
                <p>• Uanmeldte compliance-audits af Spillemyndigheden</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card border-l-4 border-l-destructive">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg"><AlertTriangle className="h-5 w-5 text-destructive" />Udenlandsk Licens (MGA/Curaçao/Gibraltar)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Gevinster er <strong>skattepligtige</strong> (op til 45% i DK)</p>
                <p>• Ingen omsætningsloft (typisk 30–60x, op til 99x)</p>
                <p>• Ingen ROFUS-beskyttelse (kun evt. operatørens eget)</p>
                <p>• Klage kun til udenlandsk myndighed (Malta/Curaçao)</p>
                <p>• Varierende kapitalkrav (Curaçao: minimale)</p>
                <p>• Manuel dokumentverifikation (dage, ikke minutter)</p>
                <p>• Sjældent dansk support (typisk engelsk)</p>
                <p>• RNG-krav varierer (Curaçao: ofte ingen)</p>
                <p>• Tilsynsfrekvens varierer markant efter jurisdiktion</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Sammenligningen er entydig: dansk licens giver markant bedre beskyttelse på alle parametre. Den eneste "fordel" ved udenlandske licenser er typisk højere nominelle bonusbeløb – men med omsætningskrav på 40–60x er den reelle værdi ofte lavere end en dansk bonus med 10x krav. Se vores detaljerede <Link to="/nye-casinoer/lav-wagering" className={linkClass}>EV-beregninger for bonusser</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sanktioner og håndhævelse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spillemyndigheden har et bredt sanktionsarsenal til rådighed, når licensindehavere overtræder vilkårene. Sanktionernes alvor afspejler overtrædelsens karakter og omfang. Her er de vigtigste sanktionstyper rangeret efter alvor:
          </p>
          <div className="space-y-3">
            {[
              { title: "Påtale og henstilling (mindst alvorlig)", desc: "Ved mindre overtrædelser, f.eks. manglende opdatering af bonusvilkår eller forsinkede rapporter, udsteder Spillemyndigheden en skriftlig påtale med frist for udbedring. Typisk 14–30 dages frist. Ingen offentliggørelse." },
              { title: "Bøde og tvangsbøder", desc: "Ved gentagne eller mere alvorlige overtrædelser kan Spillemyndigheden pålægge bøder. Størrelsen afhænger af overtrædelsens karakter og operatørens omsætning. Tvangsbøder kan pålægges for hver dag, overtrædelsen fortsætter. Bøder offentliggøres typisk." },
              { title: "Licensbetingelser og indskrænkninger", desc: "Spillemyndigheden kan tilføje specifikke betingelser til licensen, f.eks. forbud mod at tilbyde bestemte spiltyper, krav om forstærket overvågning eller begrænsninger i markedsføring. Operatøren skal acceptere betingelserne for at beholde licensen." },
              { title: "Suspension af licens", desc: "Ved alvorlige overtrædelser kan licensen suspenderes midlertidigt. Casinoet må ikke acceptere nye spillere eller indbetalinger under suspensionen. Eksisterende spillere skal have adgang til deres indestående. Suspensioner offentliggøres altid." },
              { title: "Tilbagekaldelse af licens (mest alvorlig)", desc: "I de mest alvorlige tilfælde kan licensen tilbagekaldes permanent. Det sker ved: systematisk ROFUS-overtrædelse, dokumenteret spillermanipulation, hvidvask, finansiel insolvens eller gentagne grove overtrædelser. Tilbagekaldelse er endelig og offentliggøres bredt." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Vi monitorerer alle Spillemyndighedens offentliggjorte afgørelser og opdaterer vores casinovurderinger i overensstemmelse. Et casino der modtager en bøde eller suspension, vil omgående blive nedgraderet eller fjernet fra vores anbefalingsliste, afhængigt af overtrædelsens karakter.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Ansvarligt spil og spillerbeskyttelse hos nye licenserede casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den danske licensmodel lægger stor vægt på <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>. Alle nye casinoer med dansk licens skal implementere en række spillerbeskyttelsesværktøjer som betingelse for licensen. I 2026 er kravene skærpet yderligere sammenlignet med tidligere år:
          </p>
          <div className="space-y-3">
            {[
              { title: "Obligatoriske indbetalingsgrænser", desc: "Nye spillere skal sætte en indbetalingsgrænse ved kontooprettelse. Grænsen kan sættes dagligt, ugentligt eller månedligt. Sænkning af grænsen træder i kraft øjeblikkeligt, mens forhøjelse kræver en 24-timers afkølingsperiode." },
              { title: "Session-timere og realitetspåmindelser", desc: "Casinoer skal vise, hvor længe du har spillet, og sende påmindelser med jævne mellemrum (typisk hver 60. minut). Påmindelserne skal vise både tid og nettoresultat." },
              { title: "AI-baseret adfærdsovervågning (nyt i 2026)", desc: "Spillemyndigheden har i 2026 indført krav om automatiseret overvågning af spilleadfærd. Systemer skal identificere tegn på problematisk spil (pludselige stigninger i indsats, jagning af tab, lange sessioner) og trigge proaktive interventioner." },
              { title: "Dedikerede ansvarligt spil-teams", desc: "Alle licensindehavere skal have dedikeret personale med uddannelse i ansvarligt spil. Disse teams skal være tilgængelige for spillere, der søger hjælp, og skal proaktivt kontakte spillere med risikoadfærd." },
              { title: "Forbud mod gamification af tab", desc: "Nye retningslinjer forbyder funktioner der 'belønner' tab – f.eks. cashback-programmer der motiverer til fortsat spil efter tab. Cashback-bonusser er stadig tilladt, men de må ikke markedsføres som en grund til at spille mere." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sådan verificerer du en dansk casinolicens – 4-trins guide</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi anbefaler altid, at du selv verificerer et nyt casinos licensstatus, før du opretter en konto. Processen tager under 2 minutter og beskytter dig mod potentielt svigagtige operatører:
          </p>
          <div className="space-y-3">
            {[
              "Gå til Spillemyndighedens hjemmeside (spillemyndigheden.dk) og naviger til 'Tilladelsesindehavere' – her finder du den komplette liste over alle aktive licensindehavere med tilladelsesnumre",
              "Søg efter casinoets navn eller det selskab, der driver casinoet – husk, at casinoets brand-navn og det juridiske selskabsnavn kan være forskellige",
              "Bekræft, at licensen er aktiv og dækker 'online kasino' (andre licenstyper som væddemål eller lotteri giver ikke tilladelse til casinodrift)",
              "Tjek casinoets footer/bundtekst for licensnummeret og sammenlign med Spillemyndighedens register – de skal matche præcist",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">{i + 1}</span>
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
              <p className="text-sm text-muted-foreground">
                <strong>Advarsel:</strong> Nogle ulovlige casinoer viser falske eller forældede licensnumre. Stol aldrig på casinoets egne påstande – verificér altid direkte hos Spillemyndigheden. Hvis et casino ikke fremgår af listen, bør du ikke oprette en konto uanset hvor attraktive <Link to="/casino-bonus" className={linkClass}>bonusserne</Link> måtte virke.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Regulatoriske ændringer i 2026</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det danske regulatoriske landskab udvikler sig løbende. I 2026 har Spillemyndigheden introduceret flere vigtige ændringer, der påvirker nye casinoer direkte:
          </p>
          <div className="space-y-3">
            {[
              { title: "Skærpede markedsføringsregler", desc: "Nye retningslinjer begrænser aggressiv bonusmarkedsføring. Casinoer må ikke længere markedsføre bonusser uden samtidig at vise omsætningskrav og væsentlige vilkår. Push-notifikationer med bonustilbud kræver forudgående samtykke. Influencer-samarbejder skal tydeligt mærkes som reklame." },
              { title: "Forbedrede ROFUS-funktioner", desc: "ROFUS er udvidet med nye selvudelukkelsesperioder (24 timer, 48 timer, 1 uge) ud over de eksisterende. Derudover testes et nyt 'cool-down' system, der automatisk tilbyder en pause til spillere med høj aktivitet." },
              { title: "Øget fokus på kryptobetalinger", desc: "Spillemyndigheden har præciseret, at kryptovalutaer ikke er godkendt som betalingsmetode hos danske licensindehavere. Casinoer der accepterer krypto, kan miste deres licens. Det forhindrer hvidvaskmuligheder og styrker transaktionsgennemsigtigheden." },
              { title: "Skærpet tilsyn med nye operatører", desc: "Nye licensindehavere er nu underlagt forstærket tilsyn i de første 18 måneder (tidligere 12 måneder). Det inkluderer hyppigere uanmeldte audits, månedlige compliance-rapporter og tættere monitorering af spillerklager." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Udforsk flere guides om nye casinoer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { to: "/nye-casinoer", label: "Nye Casinoer – Hovedside", desc: "Komplet hub med alle nye casinoer" },
              { to: "/nye-casinoer/2026", label: "Nye Casinoer 2026", desc: "Alle nye casinoer lanceret i 2026" },
              { to: "/nye-casinoer/uden-rofus", label: "Uden ROFUS", desc: "Risici ved casinoer uden ROFUS" },
              { to: "/casino-licenser", label: "Alle Casino-licenser", desc: "Komplet licenssammenligning" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50">
                <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm">{link.label}</h3>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/nye-casinoer/dansk-licens" />
        <RelatedGuides currentPath="/nye-casinoer/dansk-licens" />
        <FAQSection title="Ofte stillede spørgsmål om nye casinoer med dansk licens" faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="campobet" />
    </>
  );
};

export default NyeCasinoerDanskLicens;

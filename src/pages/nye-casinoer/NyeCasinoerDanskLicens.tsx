import { Link } from "react-router-dom";
import danskLicensHero from "@/assets/heroes/nye-casinoer-dansk-licens-hero.jpg";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Sparkles, CheckCircle2, XCircle, AlertTriangle, Scale } from "lucide-react";
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
        Dansk licens giver fem afgørende fordele, som ingen udenlandsk licens matcher: 1) Skattefri gevinster – casinoet betaler afgiften, ikke du. 2) Maksimalt 10x <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> på bonusser – Europas laveste lovmæssige loft. 3) ROFUS-tilslutning til frivillig selvudelukkelse – beskyttelse mod problematisk spil. 4) Klageadgang via Spillemyndigheden – din ret som forbruger ved tvister. 5) Bankgaranti på min. 750.000 kr. – dine penge er beskyttet selv ved konkurs. Ingen MGA-, Curaçao- eller Gibraltar-licens tilbyder disse rettigheder for danske spillere.
      </>
    ),
  },
  {
    question: "Kan et nyt casino miste sin danske licens?",
    answer: "Ja, Spillemyndigheden har beføjelse til at tilbagetrække, suspendere eller begrænse en licens ved overtrædelse af vilkårene. Typiske årsager inkluderer: manglende ROFUS-compliance, utilstrækkelig implementering af ansvarligt spil-værktøjer, overtrædelse af markedsføringsregler, manglende opfyldelse af kapitalreserver, eller fejl i RNG-systemer. Spillemyndigheden gennemfører både planlagte og uanmeldte tilsyn. Vi monitorerer løbende licensstatus for alle casinoer på vores liste og fjerner øjeblikkeligt casinoer, der mister eller får suspenderet deres licens.",
  },
  {
    question: "Er nye casinoer med dansk licens lige så sikre som etablerede?",
    answer: (
      <>
        Ja, sikkerhedsniveauet er identisk, da alle casinoer – nye som etablerede – skal opfylde præcis de samme krav fra Spillemyndigheden. Der er ingen forskel i licensbetingelser baseret på operatørens alder. Mange nye casinoer drives desuden af erfarne operatørselskaber, der allerede har licenser på andre europæiske markeder. Se vores detaljerede <Link to="/nye-casinoer/vs-etablerede" className={linkClass}>sammenligning af nye og etablerede casinoer</Link> for en dybdegående analyse.
      </>
    ),
  },
  {
    question: "Hvad sker der med mine penge, hvis et nyt casino lukker?",
    answer: "Spillemyndighedens krav om bankgaranti på minimum 750.000 kr. sikrer, at spillernes indeståender er beskyttet, selv hvis operatøren går konkurs eller trækker sig fra det danske marked. Bankgarantien administreres af et uafhængigt pengeinstitut og kan ikke bruges til operatørens daglige drift. I tilfælde af lukning vil Spillemyndigheden overvåge afviklingsprocessen og sikre, at alle spillere får deres saldoer udbetalt. Historisk set har ingen dansk licenseret operatør lukket uden at spillere har fået fuld kompensation.",
  },
  {
    question: "Hvor mange aktive danske casinolicenser findes der i 2026?",
    answer: "I starten af 2026 har Spillemyndigheden udstedt licenser til ca. 30–35 aktive online casinooperatører. Antallet svinger, da nye licenser udstedes og enkelte operatører vælger at trække sig fra markedet. Spillemyndighedens liste over tilladelsesindehavere opdateres løbende og er den mest pålidelige kilde til aktuel information.",
  },
  {
    question: "Hvad er forskellen på en dansk licens og en MGA-licens?",
    answer: (
      <>
        En dansk licens fra Spillemyndigheden giver danske spillere markant bedre beskyttelse end en Malta Gaming Authority (MGA)-licens. Nøgleforskellene: dansk licens = skattefri gevinster, max 10x omsætningskrav, ROFUS-tilslutning, dansk klageadgang. MGA-licens = gevinster er skattepligtige i Danmark, ingen omsætningsloft (ofte 30–60x), ingen ROFUS, klageadgang kun på Malta. Se vores guide til <Link to="/nye-casinoer/uden-rofus" className={linkClass}>casinoer uden ROFUS</Link> for mere information om risici ved udenlandske licenser.
      </>
    ),
  },
];

const NyeCasinoerDanskLicens = () => {
  const articleSchema = buildArticleSchema({
    headline: "Nye Casinoer med Dansk Licens 2026",
    description: "Find nye casinoer med gyldig dansk licens fra Spillemyndigheden. Sikre spillesteder med skattefri gevinster og ROFUS-tilslutning.",
    url: `${SITE_URL}/nye-casinoer/dansk-licens`,
    datePublished: "2026-01-20",
    dateModified: "2026-02-16",
    authorName: "Kevin",
    authorUrl: `${SITE_URL}/forfatter/kevin`,
  });

  const faqSchema = buildFaqSchema(faqs.map(f => ({ question: f.question, answer: typeof f.answer === "string" ? f.answer : f.question })));

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
        <AuthorMetaBar author="kevin" date="16-02-2026" readTime="15 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={danskLicensHero} alt="Nye casinoer med dansk licens fra Spillemyndigheden" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvorfor dansk licens er afgørende for nye casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når du vælger et nyt casino, er dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> det absolutte minimumskrav. Licensen er din juridiske garanti for, at casinoet opererer lovligt i Danmark og overholder strenge regler om spillerbeskyttelse, fairness, databeskyttelse og <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>. Uden dansk licens har du ingen af de rettigheder, som dansk lovgivning giver dig som spiller.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hos <Link to="/nye-casinoer" className={linkClass}>Casinoaftaler.dk</Link> anbefaler vi udelukkende nye casinoer med dansk licens. Det sikrer dig som spiller fem afgørende fordele: alle gevinster er skattefri (casinoet betaler 28% afgift), <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> på bonusser er lovmæssigt begrænset til maksimalt 10x, du har adgang til ROFUS-selvudelukkelse, du kan klage til Spillemyndigheden ved tvister, og dine penge er sikret via bankgaranti.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den danske licensmodel er anerkendt som en af Europas mest spillervenlige. Med et lovmæssigt omsætningsloft på 10x – sammenlignet med 30–60x hos MGA-licenserede casinoer – har danske spillere markant bedre odds for at realisere bonusgevinster. Læs vores komplette <Link to="/casino-licenser" className={linkClass}>guide til casino-licenser</Link> for en dybdegående sammenligning af dansk licens, MGA, Curaçao og UK-licenser.
          </p>
        </section>

        <InlineCasinoCards title="Nye Licenserede Casinoer i Danmark" />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Fordele ved nye casinoer med dansk licens</h2>
          <div className="space-y-3">
            {[
              { title: "Skattefri gevinster", desc: "Alle gevinster fra casinoer med dansk licens er skattefri for danske spillere. Casinoet betaler 28% afgift af bruttospilindtægten til SKAT. Du skal aldrig selvangive casinogevinster fra danske licenserede casinoer." },
              { title: "Maksimalt 10x omsætningskrav", desc: "Dansk lovgivning begrænser omsætningskrav på bonusser til 10x – det laveste lovmæssige loft i Europa. Til sammenligning tillader MGA-licenser op til 60x. Det gør danske bonusser markant mere værdifulde i reel udbetalingsværdi." },
              { title: "ROFUS-tilslutning og selvudelukkelse", desc: "Alle licenserede casinoer er tilsluttet ROFUS-registret, der giver mulighed for frivillig selvudelukkelse i 24 timer, 1, 3 eller 6 måneder, eller permanent. Registreringen gælder alle danske spillesteder og er et vigtigt værktøj for ansvarligt spil." },
              { title: "Dansk kundesupport", desc: "Nye casinoer med dansk licens tilbyder typisk support på dansk via live chat og e-mail. Mange tilbyder support 16–24 timer dagligt med gennemsnitlige svartider på under 3 minutter via chat." },
              { title: "Klageadgang via Spillemyndigheden", desc: "Oplever du problemer med et licenseret casino, kan du klage direkte til Spillemyndigheden. Det giver dig en uafhængig instans, der kan mægle og træffe afgørelser – en ret du ikke har ved udenlandske casinoer." },
              { title: "Bankgaranti og indskydergaranti", desc: "Alle licensindehavere skal stille en bankgaranti på minimum 750.000 kr. hos et dansk pengeinstitut. Garantien er øremærket til spillernes indeståender og kan ikke bruges til operatørens drift, hvilket sikrer dine penge selv ved konkurs." },
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
          <h2 className="mb-4 text-3xl font-bold">Spillemyndighedens licensproces for nye casinoer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> er den danske tilsynsmyndighed under Skatteministeriet, der udsteder og overvåger casinolicenser. Licensprocessen er designet til at sikre, at kun seriøse, kapitalstærke operatører med dokumenteret kompetence får adgang til det danske marked. For dig som spiller er det en kvalitetsgaranti.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Licensansøgningen kræver: 1) Fit & proper-test af alle ejere, bestyrelsesmedlemmer og nøglepersoner – inkl. straffeattester og finansielle baggrundstjek. 2) Teknisk audit af spilplatformen, herunder server-infrastruktur, RNG-systemer og datasikkerhed. 3) Dokumentation for finansiel stabilitet, herunder bankgaranti og driftskapital. 4) Compliance-plan for ansvarligt spil, hvidvaskforebyggelse og GDPR. 5) Aftaler med certificerede spiludbydere og betalingsleverandører.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Processen tager typisk 3–6 måneder fra komplet ansøgning til endelig godkendelse. Ansøgningsgebyret er 286.500 kr. (2026-sats), og den årlige tilsynsafgift er baseret på operatørens bruttospilindtægt. Disse omkostninger sikrer, at kun seriøse operatører investerer i en dansk licens.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vi anbefaler, at du altid verificerer et nyt casinos licensstatus direkte på Spillemyndighedens hjemmeside. Hvis et casino ikke fremgår af listen over aktive tilladelsesindehavere, bør du ikke oprette en konto – uanset hvor attraktive <Link to="/casino-bonus" className={linkClass}>bonusserne</Link> måtte virke.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Dansk licens vs. udenlandsk licens – sammenligning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Forskellen mellem en dansk licens og en udenlandsk licens (typisk MGA, Curaçao eller Gibraltar) er afgørende for din oplevelse og sikkerhed som dansk spiller. Her er en direkte sammenligning:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg"><ShieldCheck className="h-5 w-5 text-primary" />Dansk Licens</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Gevinster er <strong>skattefri</strong></p>
                <p>• Max 10x omsætningskrav</p>
                <p>• ROFUS-selvudelukkelse</p>
                <p>• Klageadgang via Spillemyndigheden</p>
                <p>• Bankgaranti min. 750.000 kr.</p>
                <p>• Dansk kundesupport</p>
                <p>• MitID-verifikation (hurtig KYC)</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card border-l-4 border-l-destructive">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg"><AlertTriangle className="h-5 w-5 text-destructive" />Udenlandsk Licens</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Gevinster er <strong>skattepligtige</strong></p>
                <p>• Ofte 30–60x omsætningskrav</p>
                <p>• Ingen ROFUS-beskyttelse</p>
                <p>• Klage kun til udenlandsk myndighed</p>
                <p>• Varierende krav til kapitalsikring</p>
                <p>• Sjældent dansk support</p>
                <p>• Manuel dokumentverifikation</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Ansvarligt spil og spillerbeskyttelse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den danske licensmodel lægger stor vægt på <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>. Alle nye casinoer med dansk licens skal implementere en række spillerbeskyttelsesværktøjer som betingelse for licensen. Disse inkluderer: obligatoriske indbetalingsgrænser som spilleren selv kan sætte, session-timere der viser hvor længe du har spillet, mulighed for midlertidig eller permanent selvudelukkelse via ROFUS, og automatiserede advarsler ved mønstre der indikerer risikoadfærd.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I 2026 har Spillemyndigheden yderligere skærpet kravene med nye retningslinjer for proaktiv spillerbeskyttelse. Nye casinoer skal nu implementere AI-baserede overvågningssystemer, der identificerer potentielt problematisk spilleadfærd, og skal have dedikerede ansvarligt spil-teams. Det er et markant skridt frem for spillerbeskyttelsen i Danmark.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sådan vælger du det rigtige nye licenserede casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med alle nye casinoer der opfylder de samme licensbetingelser, handler valget om at finde det casino der matcher dine præferencer. Her er vores anbefaling i fire trin:
          </p>
          <div className="space-y-3">
            {[
              "Verificer licensen direkte på Spillemyndighedens hjemmeside – stol aldrig blindt på et casinos egne påstande",
              "Sammenlign bonusvilkår: fokuser på omsætningskrav (jo lavere, jo bedre) frem for det nominelle bonusbeløb",
              "Test udbetalingshastigheden med en lille udbetaling, før du indbetaler større beløb",
              "Kontakt kundeservice med et testspørgsmål for at vurdere svartid og kompetence",
              "Tjek spiludvalget: har casinoet dine foretrukne spiludbydere og tilstrækkelig dybde i kataloget?",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">{tip}</p>
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
              { to: "/licenserede-casinoer", label: "Licenserede Casinoer", desc: "Alle licenserede danske casinoer" },
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

        <AuthorBio author="kevin" />
        <RelatedGuides currentPath="/nye-casinoer/dansk-licens" />
        <FAQSection title="Ofte stillede spørgsmål om nye casinoer med dansk licens" faqs={faqs} />
      </div>
    </>
  );
};

export default NyeCasinoerDanskLicens;

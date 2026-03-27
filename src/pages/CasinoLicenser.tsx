import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";

import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, AlertTriangle, Sparkles, CheckCircle2, XCircle, Scale, Globe, Landmark } from "lucide-react";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import kapowMitidRegistrering from "@/assets/screenshots/kapow-mitid-registrering.png";
import spillemyndighedenLicensliste from "@/assets/screenshots/spillemyndigheden-licensliste-onlinekasino.png";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er forskellen på dansk licens og Curaçao-licens?",
    answer: (
      <>
        Forskellen er markant. En dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> giver skattefri gevinster, max 10x omsætningskrav, ROFUS-tilslutning og klageadgang i Danmark. En Curaçao-licens giver ingen af disse fordele – gevinster er skattepligtige, omsætningskrav kan nå 60x+, og du har ingen dansk forbrugerbeskyttelse. Vi anbefaler altid <Link to="/nye-casinoer/dansk-licens" className={linkClass}>casinoer med dansk licens</Link>.
      </>
    ),
  },
  {
    question: "Hvordan påvirker licenstypen skatten på casinogevinster?",
    answer: "Licenstypen er afgørende for dine skatteforhold. Med dansk licens er gevinster skattefri – casinoet betaler 28% afgift af bruttospilindtægten til SKAT på dine vegne. Med udenlandsk licens (MGA, Curaçao, UK) er gevinster skattepligtige efter personskattelovens § 4, og skattesatsen kan nå op til 45%. Over et år kan forskellen udgøre tusindvis af kroner – licensen er den afgørende faktor.",
  },
  {
    question: "Er en MGA-licens (Malta) sikker for danske spillere?",
    answer: (
      <>
        MGA-licensen er den mest respekterede udenlandske licens med god regulering og klageadgang via Malta Gaming Authority. Dog giver den ikke danske spillere de samme rettigheder som dansk licens: gevinster er skattepligtige, der er ingen ROFUS-tilslutning, og omsætningskrav kan nå 30-60x. MGA er bedre end Curaçao, men markant ringere end dansk licens for danske spillere.
      </>
    ),
  },
  {
    question: "Kan man bruge ROFUS på et udenlandsk casino?",
    answer: (
      <>
        Nej, ROFUS gælder udelukkende for casinoer med dansk licens. <Link to="/nye-casinoer/uden-rofus" className={linkClass}>Casinoer uden dansk licens</Link> er ikke tilsluttet ROFUS-registret, hvilket betyder, at du ikke kan selvudelukke dig fra disse spillesteder. Det er en af de væsentligste risici ved at spille hos udenlandske casinoer – du mister et vigtigt værktøj til <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Hvilken licens er mest sikker for danske spillere?",
    answer: "En dansk licens fra Spillemyndigheden er uden tvivl den sikreste for danske spillere. Den er den eneste licens, der giver skattefri gevinster, ROFUS-beskyttelse, dansk klageadgang og et lovmæssigt omsætningsloft på 10x. Rangering af sikkerhed: 1) Dansk licens, 2) MGA (Malta), 3) UK Gambling Commission, 4) Gibraltar, 5) Curaçao. Vi anbefaler altid dansk licens.",
  },
  {
    question: "Hvad sker der, hvis et casino mister sin licens?",
    answer: "Hvis et casino mister sin danske licens, overvåger Spillemyndigheden afviklingsprocessen og sikrer, at alle spillere får deres saldoer udbetalt via bankgarantien. Casinoet må ikke længere tilbyde spil til danske spillere. Vi fjerner øjeblikkeligt casinoer fra vores anbefalinger, hvis de mister eller får suspenderet deres licens.",
  },
  {
    question: "Hvordan verificerer jeg et casinos licensstatus?",
    answer: (
      <>
        Du kan verificere dansk licens direkte på <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighedens hjemmeside</Link> under 'Tilladelsesindehavere'. For MGA-licenser kan du søge i Malta Gaming Authority's offentlige register. Curaçao-licenser kan verificeres via GCB (Gaming Control Board) eller den udstedende master-licensindehaver. Vær opmærksom på, at falske licensnumre forekommer – verifikation direkte hos myndigheden er den eneste sikre metode.
      </>
    ),
  },
  {
    question: "Gælder en UK-licens i Danmark?",
    answer: "Nej, en UK-licens fra Gambling Commission gælder kun i Storbritannien. Den har ingen juridisk gyldighed i Danmark og giver ikke danske spillere nogen rettigheder under dansk lovgivning. Et casino, der kun har UK-licens, opererer ulovligt, hvis det retter sig mod danske spillere. UK-licensen er dog anerkendt som en af verdens strengeste og signalerer høj operatør-kvalitet.",
  },
];

const CasinoLicenser = () => {
  const articleSchema = buildArticleSchema({
    headline: "Casino Licenser – Dansk og Udenlandske Licenser Forklaret",
    description: "Casino-licenser forklaret: Dansk licens, MGA, Curaçao og UK. Forstå forskellen og hvad det betyder for din sikkerhed.",
    url: `${SITE_URL}/casino-licenser`,
    datePublished: "2026-02-16",
    authorName: "Ajse",
    authorUrl: `${SITE_URL}/forfatter/ajse`,
  });

  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SEO
        title="Casino Licenser i Danmark – Dansk, MGA & Curaçao Guide"
        description="Casino-licenser forklaret: Dansk licens, MGA, Curaçao og UK – forstå forskellen og hvad det betyder for din sikkerhed og skat."
        jsonLd={[articleSchema, faqSchema]}
      />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ background: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))' }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><ShieldCheck className="mr-1.5 h-3.5 w-3.5" />Autoritetsguide</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Casino Licenser – Dansk og Udenlandske Licenser Forklaret</h1>
            <p className="text-lg text-white/80">Alt du behøver at vide om casino-licenser. Hvad de betyder for din sikkerhed, dine rettigheder og dine gevinster som dansk spiller.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="ajse" readTime="14 Min." />
        
        <p className="text-sm text-muted-foreground mt-2 mb-6">Juridisk gennemgået og opdateret af Ajse, juridisk redaktør hos Casinoaftaler.dk.</p>

        <SnippetAnswer answer="Dansk licens fra Spillemyndigheden giver skattefri gevinster, max 10x omsætningskrav, ROFUS-beskyttelse og dansk klageadgang. MGA og Curaçao tilbyder ingen af disse fordele." />

        <QuickComparisonTable count={3} title="Hurtig sammenligning – Top 3" prioritySlugs={["spildansknu", "betinia", "spilleautomaten"]} />

{/* ── Introduktion ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvad er en casino-licens?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En casino-licens er en officiel tilladelse udstedt af en regulerende myndighed, der giver en operatør lov til at udbyde online casinospil. Licensen sikrer, at casinoet overholder specifikke regler om <Link to="/ordbog/fairness-audit" className={linkClass}>fairness</Link>, spillerbeskyttelse, hvidvaskforebyggelse og datasikkerhed. For dig som spiller er casinoets licens den vigtigste indikator for troværdighed og sikkerhed.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ikke alle licenser er lige gode. Forskellen mellem en dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> og en Curaçao-licens er enorm – både hvad angår din juridiske beskyttelse, dine skatteforhold og dine rettigheder som forbruger. Et casino med dansk licens giver dig skattefri gevinster, ROFUS-selvudelukkelse og dansk klageadgang. Et casino med Curaçao-licens giver dig ingen af disse fordele.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne guide gennemgår vi de fire mest relevante licenstyper for danske spillere: dansk licens, Curaçao, Malta (MGA) og UK. Vi forklarer, hvad hver licens indebærer, og hjælper dig med at forstå, hvorfor licensvalget har direkte konsekvenser for din pengepung og din sikkerhed.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Dansk Licens ── */}
        <section id="dansk-licens" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Dansk licens fra Spillemyndigheden</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den danske licens udstedes af <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>, som er den regulerende myndighed under Skatteministeriet. Det er den eneste licens, der giver fuld juridisk beskyttelse for danske spillere. Alle <Link to="/nye-casinoer/dansk-licens" className={linkClass}>nye casinoer med dansk licens</Link> skal gennemgå en omfattende godkendelsesproces, der typisk tager 3–6 måneder.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Licensprocessen kræver: fit &amp; proper-test af ejere og ledelse, bankgaranti på minimum 750.000 kr., teknisk audit af spilplatformen, <Link to="/ordbog/rng" className={linkClass}>RNG</Link>-certificering fra akkrediterede laboratorier (eCOGRA, iTech Labs), dokumenteret compliance-plan for ansvarligt spil og hvidvaskforebyggelse, samt ROFUS-integration og <Link to="/nye-casinoer/mitid" className={linkClass}>MitID-verifikation</Link>.
          </p>
          <div className="space-y-3 mb-6">
            {[
              { title: "Skattefri gevinster", desc: "Casinoet betaler 28% afgift af bruttospilindtægten til SKAT. Du skal aldrig selvangive gevinster fra danske licenserede casinoer." },
              { title: "Max 10x omsætningskrav", desc: "Europas laveste lovmæssige loft. Bonusser hos danske casinoer har markant højere reel værdi end udenlandske." },
              { title: "ROFUS-tilslutning", desc: "Frivillig selvudelukkelse i 24 timer, 1-6 måneder eller permanent. Gælder alle danske licenserede spillesteder." },
              { title: "Klageadgang via Spillemyndigheden", desc: "Ved tvister kan du klage direkte til en uafhængig dansk myndighed, der har beføjelse til at træffe bindende afgørelser." },
              { title: "Bankgaranti min. 750.000 kr.", desc: "Dine indeståender er beskyttet selv ved operatørens konkurs. Garantien administreres af et uafhængigt pengeinstitut." },
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
          <div className="rounded-lg border border-primary/30 bg-accent/30 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Se alle nye licenserede casinoer:</strong> Vores <Link to="/nye-casinoer/dansk-licens" className={linkClass}>guide til nye casinoer med dansk licens</Link> opdateres løbende med de seneste tilskud til det danske marked.
            </p>
          </div>
        </section>

        <ReviewScreenshot
          src={kapowMitidRegistrering}
          alt="MitID-verifikation som del af licenskrav – danske casinoer kræver digital identitetskontrol"
          caption="Dansk licens kræver MitID-verifikation – her ses trinnet fra et dansk licenseret casino"
          size="full"
        />

        <Separator className="my-10" />

        {/* ── Curaçao Licens ── */}
        <section id="curacao" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Curaçao-licens (eGaming)</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Curaçao-licensen er den mest udbredte og billigste online casino-licens i verden. Den udstedes af{" "}
            <a href="https://www.curacao-egaming.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">Curaçao Gaming Control Board (GCB)</a> og dækker alle former for online gambling under én enkelt licens. Historisk har Curaçao været kendt for minimal regulering, men i 2023-2024 gennemgik jurisdiktionen en reform med skærpede krav.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For danske spillere er Curaçao-licensen problematisk: den giver ingen af de rettigheder, som dansk licens sikrer. Gevinster er skattepligtige, der er ingen ROFUS-tilslutning, og klageadgang er begrænset til Curaçao – en jurisdiktion med begrænset erfaring i at beskytte europæiske forbrugere. Casinoer, der opererer mod danske spillere med kun Curaçao-licens, er ulovlige i Danmark.
          </p>
          <div className="space-y-3 mb-6">
            {[
              "Gevinster er skattepligtige i Danmark – op til 45% i skat",
              "Ingen ROFUS-tilslutning – ingen selvudelukkelsesbeskyttelse",
              "Ingen dansk klageadgang – tvister afgøres efter lokal lovgivning",
              "Omsætningskrav typisk 30-60x – markant dårligere end danske 10x",
              "Begrænset tilsyn og håndhævelse af spillerbeskyttelse",
            ].map((risk) => (
              <div key={risk} className="flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                <XCircle className="h-5 w-5 flex-shrink-0 text-destructive" />
                <p className="text-sm text-muted-foreground">{risk}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            <Link to="/nye-casinoer/uden-rofus" className={linkClass}>Casinoer uden ROFUS</Link> bruger typisk Curaçao-licensen, da den er billigst og stiller færrest krav til operatøren. Vi fraråder stærkt at spille hos disse casinoer.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── MGA Licens ── */}
        <section id="mga" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Malta Gaming Authority (MGA) licens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <a href="https://www.mga.org.mt/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">Malta Gaming Authority (MGA)</a> er en af verdens mest respekterede gambling-regulatorer. Som EU-medlemsstat er Malta underlagt europæisk lovgivning, og MGA-licensen anses for at være den gyldne standard blandt udenlandske licenser. MGA regulerer over 300 licensindehavere og har en dokumenteret track record for spillerbeskyttelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MGA-licensen kræver: kapitalkrav og finansiel stabilitet, RNG-certificering, ansvarligt spil-værktøjer, hvidvaskforebyggelse, klagebehandlingssystem og regelmæssige compliance-audits. MGA har beføjelse til at pålægge bøder, suspendere eller inddrage licenser ved overtrædelser.
          </p>
          <div className="space-y-3">
            {[
              { title: "EU-reguleret myndighed", desc: "Underlagt europæisk lovgivning og samarbejder med andre EU-regulatorer. Højere standard end Curaçao." },
              { title: "Klageadgang via MGA", desc: "Spillere kan indgive klager direkte til Malta Gaming Authority, som fungerer som uafhængig mægler. Processen er gratis." },
              { title: "Spillerbeskyttelsesværktøjer", desc: "MGA kræver implementering af indbetalingsgrænser, session-timere og selvudelukkelsesmuligheder – dog ikke ROFUS." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            <strong>Vigtigt for danske spillere:</strong> MGA-licensen giver ikke skattefrihed i Danmark, ingen ROFUS-beskyttelse og intet omsætningsloft. Selvom MGA er væsentligt bedre end Curaçao, er dansk licens stadig det overlegne valg for danske spillere.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── UK Licens ── */}
        <section id="uk" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">UK Gambling Commission licens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            UK Gambling Commission (UKGC) er anerkendt som verdens strengeste gambling-regulator. UKGC har udstedt nogle af de største bøder i branchen og har konsekvent håndhævet spillerbeskyttelse. Operatører med UKGC-licens er underlagt ekstremt strenge krav til ansvarligt spil, reklameadfærd og anti-hvidvask.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Dog er UKGC-licensen kun gyldig i Storbritannien og har ingen juridisk gyldighed i Danmark. Et casino, der kun har UK-licens og retter sig mod danske spillere, opererer ulovligt. UKGC-licensen er dog et stærkt signal om operatør-kvalitet – casinoer med UKGC-licens har typisk højere standarder end gennemsnittet.
          </p>
          <div className="space-y-3">
            {[
              { title: "Strengeste regulering", desc: "UKGC har udstedt bøder på hundredvis af millioner pund til store operatører. De tager håndhævelse alvorligt." },
              { title: "Ingen gyldighed i DK", desc: "UK-licensen er territorial. Den beskytter kun spillere i Storbritannien og giver ingen rettigheder for danske spillere." },
              { title: "Kvalitetssignal", desc: "Operatører med UKGC-licens har investeret tungt i compliance. Det signalerer seriøsitet, selv om licensen ikke dækker DK." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Globe className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ── Sammenligningstabel ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sammenligning af casino-licenser</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Her er en direkte sammenligning af de fire mest relevante licenstyper for danske spillere:
          </p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Parameter</th>
                  <th className="px-4 py-3 text-left font-semibold">Dansk 🇩🇰</th>
                  <th className="px-4 py-3 text-left font-semibold">MGA 🇲🇹</th>
                  <th className="px-4 py-3 text-left font-semibold">UKGC 🇬🇧</th>
                  <th className="px-4 py-3 text-left font-semibold">Curaçao 🇨🇼</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium">Regulering</td>
                  <td className="px-4 py-3">Meget streng</td>
                  <td className="px-4 py-3">Streng</td>
                  <td className="px-4 py-3">Strengest</td>
                  <td className="px-4 py-3">Lav</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium">ROFUS</td>
                  <td className="px-4 py-3">✅ Ja</td>
                  <td className="px-4 py-3">❌ Nej</td>
                  <td className="px-4 py-3">❌ Nej</td>
                  <td className="px-4 py-3">❌ Nej</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium">Skat for danskere</td>
                  <td className="px-4 py-3">Skattefri</td>
                  <td className="px-4 py-3">Skattepligtig</td>
                  <td className="px-4 py-3">Skattepligtig</td>
                  <td className="px-4 py-3">Skattepligtig</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium">Omsætningsloft</td>
                  <td className="px-4 py-3">Max 10x</td>
                  <td className="px-4 py-3">Intet loft</td>
                  <td className="px-4 py-3">Intet loft</td>
                  <td className="px-4 py-3">Intet loft</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium">Klageadgang</td>
                  <td className="px-4 py-3">Dansk myndighed</td>
                  <td className="px-4 py-3">Malta (MGA)</td>
                  <td className="px-4 py-3">UK (UKGC)</td>
                  <td className="px-4 py-3">Begrænset</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium">Bankgaranti</td>
                  <td className="px-4 py-3">Min. 750.000 kr.</td>
                  <td className="px-4 py-3">Ja (varierende)</td>
                  <td className="px-4 py-3">Ja (streng)</td>
                  <td className="px-4 py-3">Varierende</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Sikkerhedsniveau</td>
                  <td className="px-4 py-3 font-semibold text-foreground">⭐⭐⭐⭐⭐</td>
                  <td className="px-4 py-3">⭐⭐⭐⭐</td>
                  <td className="px-4 py-3">⭐⭐⭐⭐⭐</td>
                  <td className="px-4 py-3">⭐⭐</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <ReviewScreenshot
          src={spillemyndighedenLicensliste}
          alt="Spillemyndighedens officielle licensliste over godkendte onlinekasino-udbydere i Danmark med tilladelsestyper og domæner"
          caption="Spillemyndighedens licensliste – alle godkendte udbydere med tilladelsestyper og tilknyttede domæner"
        />

        <Separator className="my-10" />

        {/* ── Hvad betyder licensen for dig ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvad betyder licensen for dig som spiller?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casinoets licens har direkte konsekvenser for din hverdag som spiller. Her er de fem vigtigste områder, hvor licenstypen gør en konkret forskel:
          </p>
          <div className="space-y-3">
            {[
              { title: "Skatteforhold", desc: "Med dansk licens er alle gevinster skattefri. Med udenlandsk licens skal du selvangive gevinster, og skattesatsen kan nå op til 45%. Over et år kan forskellen udgøre tusindvis af kroner." },
              { title: "Forbrugerbeskyttelse", desc: "Dansk licens giver adgang til Spillemyndighedens klagesystem, forbrugerrettigheder efter dansk lov og bankgaranti for dine indeståender. Udenlandske licenser giver markant svagere beskyttelse." },
              { title: "Selvudelukkelse via ROFUS", desc: "Kun danske licenserede casinoer er tilsluttet ROFUS. Selvudelukkelse er et vigtigt værktøj for ansvarligt spil og er ikke tilgængeligt hos udenlandske casinoer." },
              { title: "Indbetalingsgrænser", desc: "Danske casinoer skal tilbyde mulighed for at sætte daglige, ugentlige og månedlige indbetalingsgrænser. Det er et krav fra Spillemyndigheden og beskytter mod overforbrug." },
              { title: "Bonusværdi", desc: "Det danske omsætningsloft på 10x gør bonusser markant mere værdifulde. En 1.000 kr. bonus med 5x omsætning har en reel værdi på ca. 800 kr. – sammenlignet med ca. 200 kr. ved 40x omsætning hos et udenlandsk casino." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Landmark className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ── Vores anbefaling ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores klare anbefaling</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Anbefalingen er entydig: vælg altid et casino med dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>. Det er det eneste valg, der giver fuld juridisk beskyttelse, skattefri gevinster og adgang til ROFUS. Uanset hvor attraktive udenlandske bonusser måtte virke, opvejer risiciene aldrig fordelene ved dansk licens.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Se vores opdaterede liste over <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> – alle med dansk licens og verificeret af vores team. Husk altid at spille <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Udforsk relaterede guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { to: "/nye-casinoer/dansk-licens", label: "Nye Casinoer med Dansk Licens", desc: "Alle nye licenserede casinoer i Danmark" },
              { to: "/nye-casinoer/uden-rofus", label: "Casinoer uden ROFUS", desc: "Risici og alternativer forklaret" },
              { to: "/spillemyndigheden", label: "Spillemyndigheden", desc: "Den danske regulerende myndighed" },
              { to: "/ansvarligt-spil", label: "Ansvarligt Spil", desc: "Guide til ansvarlig gambling" },
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

        <InlineCasinoCards title="Anbefalede licenserede casinoer" count={4} />

        <LatestNewsByCategory pagePath="/casino-licenser" />
        <RelatedGuides currentPath="/casino-licenser" />
        <FAQSection title="Ofte stillede spørgsmål om casino-licenser" faqs={faqs} />
        <AuthorBio author="ajse" />
      </div>
      <StickyCtaBySlug slug="campobet" />
    </>
  );
};

export default CasinoLicenser;
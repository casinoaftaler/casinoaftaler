import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import udenRofusHero from "@/assets/heroes/nye-casinoer-uden-rofus-hero.jpg";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, AlertTriangle, Sparkles, XCircle, CheckCircle2, Scale, Calculator, FileText, Users, Ban } from "lucide-react";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import type { ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er ROFUS, og hvorfor er det vigtigt?",
    answer: (
      <>
        ROFUS (Register Over Frivilligt Udelukkede Spillere) er det danske register til selvudelukkelse fra gambling, administreret af Spillemyndigheden. Alle casinoer med dansk licens er lovmæssigt forpligtet til at kontrollere ROFUS ved kontooprettelse og login. Registret er et centralt værktøj til <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>, da det giver spillere mulighed for at udelukke sig selv midlertidigt (24 timer, 1, 3 eller 6 måneder) eller permanent fra alle danske licenserede spillesteder. Over 35.000 danske spillere har benyttet ROFUS siden oprettelsen, hvilket understreger dets betydning for spillerbeskyttelsen.
      </>
    ),
  },
  {
    question: "Er nye casinoer uden ROFUS lovlige i Danmark?",
    answer: "Nej. ROFUS-tilslutning er et ufravigeligt krav for dansk licens. Casinoer uden ROFUS-tilslutning opererer per definition uden dansk licens og er derfor ulovlige for danske spillere at benytte. Spillemyndigheden kan blokere adgangen til ulovlige casinoer via DNS-blokering, og der arbejdes løbende på at udvide denne liste. Det er dog vigtigt at bemærke, at det ikke er strafbart for spilleren at spille hos ulovlige casinoer – men du mister alle beskyttelser, og dine gevinster bliver skattepligtige.",
  },
  {
    question: "Hvilke risici er der ved at spille hos casinoer uden ROFUS?",
    answer: "Risiciene er konkrete og betydelige: 1) Gevinster er skattepligtige – du skal selvangive og betale op til 45% i skat. 2) Ingen klageadgang via dansk myndighed – tvister afgøres efter udenlandsk lovgivning. 3) Ingen garanti for udbetaling – uden bankgaranti kan operatøren nægte udbetaling uden konsekvens. 4) Ingen ROFUS-selvudelukkelse – du har intet sikkerhedsnet ved problematisk spil. 5) Ingen RNG-garanti – spillene kan potentielt være manipulerede. 6) Omsætningskrav typisk 30–60x mod danske 10x. Vi fraråder stærkt at spille hos casinoer uden dansk licens.",
  },
  {
    question: "Kan jeg registrere mig i ROFUS for at udelukke mig selv?",
    answer: (
      <>
        Ja, du kan registrere dig i ROFUS på rofus.nu via <Link to="/nye-casinoer/mitid" className={linkClass}>MitID</Link>. Du vælger mellem midlertidig udelukkelse (24 timer, 1 måned, 3 måneder eller 6 måneder) eller permanent udelukkelse. Midlertidig udelukkelse udløber automatisk. Permanent udelukkelse kan tidligst ophæves efter 1 år ved henvendelse til Spillemyndigheden. Registreringen gælder for alle danske licenserede spillesteder – online casinoer, væddemål og fysiske kasinoer. Har du brug for hjælp, kontakt StopSpillet på 70 22 28 25.
      </>
    ),
  },
  {
    question: "Hvorfor anbefaler Casinoaftaler.dk kun casinoer med ROFUS?",
    answer: (
      <>
        Vi anbefaler udelukkende casinoer med dansk licens og ROFUS-tilslutning, fordi spillersikkerhed er vores absolutte prioritet. Vores <Link to="/redaktionel-politik" className={linkClass}>redaktionelle politik</Link> fastslår, at vi aldrig vil anbefale et casino, vi ikke selv ville spille hos med vores egne penge. ROFUS-tilslutning er en grundpille i dansk spilleregulering, og casinoer uden den mangler de fundamentale beskyttelser, som danske spillere har krav på.
      </>
    ),
  },
  {
    question: "Hvad gør Spillemyndigheden for at stoppe ulovlige casinoer?",
    answer: "Spillemyndigheden anvender flere værktøjer: DNS-blokering af ulovlige hjemmesider (listen udvides løbende – over 150 domæner blokeret pr. marts 2026), samarbejde med internationale myndigheder om at lukke ulovlige operatører, informationskampagner rettet mod danske spillere, og samarbejde med betalingsudbydere for at blokere transaktioner til og fra ulovlige casinoer. Derudover arbejdes der på lovændringer der vil give Spillemyndigheden endnu stærkere håndhævelsesværktøjer.",
  },
  {
    question: "Kan ulovlige casinoer tilbyde bedre bonusser end danske?",
    answer: (
      <>
        Nominelt kan ulovlige casinoer tilbyde højere bonusbeløb, men den reelle værdi er typisk lavere. En udenlandsk bonus på 5.000 kr. med 50x omsætningskrav kræver 250.000 kr. i spil, før du kan hæve. Til sammenligning kræver en dansk bonus på 1.000 kr. med 10x omsætning (d+b) kun 20.000 kr. i spil. Den danske bonus har markant højere sandsynlighed for at resultere i reel udbetaling – og er skattefri. Se vores <Link to="/nye-casinoer/lav-wagering" className={linkClass}>EV-beregninger for bonusser</Link>.
      </>
    ),
  },
  {
    question: "Hvad skal jeg gøre, hvis jeg allerede spiller hos et casino uden ROFUS?",
    answer: "Vi anbefaler, at du hæver din saldo hurtigst muligt og lukker din konto. Overfør derefter til et dansk licenseret casino, hvor dine rettigheder er beskyttet. Husk at selvangive eventuelle gevinster fra det ulovlige casino til SKAT. Hvis du oplever problemer med udbetaling fra et ulovligt casino, har du desværre begrænset klageadgang. Se vores detaljerede migrationsguide længere nede på denne side.",
  },
  {
    question: "Er VPN-brug til at omgå DNS-blokering strafbart?",
    answer: "Nej, det er ikke strafbart for dig som spiller at bruge VPN for at tilgå blokerede casinoer. Men det ændrer ikke de grundlæggende risici: dine gevinster er fortsat skattepligtige, du har ingen klageadgang, og din spillerbeskyttelse er ikke-eksisterende. VPN-brug kan desuden udløse kontofrysning hos det ulovlige casino, da mange operatører har vilkår mod VPN-brug. Vi fraråder det stærkt.",
  },
];

const NyeCasinoerUdenRofus = () => {
  const articleSchema = buildArticleSchema({
    headline: "Nye Casinoer uden ROFUS – Hvad du skal vide",
    description: "Alt om nye casinoer uden ROFUS-tilslutning. Forstå risici, lovgivning og hvorfor vi anbefaler danske licenserede casinoer.",
    url: `${SITE_URL}/nye-casinoer/uden-rofus`,
    datePublished: "2026-01-25",
    dateModified: "2026-03-02",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      <SEO
        title="Nye Casinoer uden ROFUS – Risici og Alternativer 2026"
        description="Alt om nye casinoer uden ROFUS. Forstå risiciene, lovgivningen og hvorfor danske licenserede casinoer med ROFUS er det sikre valg."
        jsonLd={[articleSchema, faqSchema]}
      />

      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ background: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))' }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><AlertTriangle className="mr-1.5 h-3.5 w-3.5" />Informationsguide</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Nye Casinoer uden ROFUS</h1>
            <p className="text-lg text-white/80">Hvad du bør vide om nye casinoer uden ROFUS-tilslutning, de tilknyttede risici og hvorfor vi altid anbefaler licenserede alternativer.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="02-03-2026" readTime="20 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={udenRofusHero} alt="Casino uden ROFUS – advarsler og risici" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        <Card className="mb-8 border-l-4 border-l-destructive">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
              <div>
                <p className="font-semibold">Vigtig advarsel</p>
                <p className="text-sm text-muted-foreground">Casinoaftaler.dk anbefaler udelukkende casinoer med dansk licens og ROFUS-tilslutning. Denne guide er informativ og har til formål at oplyse om risici ved ulovlige spillesteder, så du kan træffe et informeret valg.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvad er nye casinoer uden ROFUS?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nye casinoer uden ROFUS er spillesteder, der opererer uden dansk licens fra <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>. Da ROFUS-tilslutning er et ufravigeligt krav for dansk licens, betyder mangel på ROFUS automatisk, at casinoet opererer uden lovlig tilladelse til at udbyde spil til danske spillere. Det er en binær distinktion – der er ingen "mellemvej".
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Disse casinoer har typisk udenlandske licenser – oftest fra <Link to="/casino-licenser#curacao" className={linkClass}>Curaçao</Link> (billigst og mindst reguleret), <Link to="/casino-licenser#mga" className={linkClass}>Malta Gaming Authority</Link> (mere velrenommeret, men uden dansk beskyttelse) eller helt ulicenserede operatører. De markedsfører sig aggressivt mod danske spillere med tilsyneladende attraktive bonusser og løfter om "ingen begrænsninger", men bag facaden mangler de fundamentale spillerbeskyttelser.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vores standpunkt er klart og ufravigeligt: casinoer uden dansk licens anbefales aldrig. Missionen er at beskytte danske spillere og fremme <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>. Søger du et sikkert nyt casino, se listen over <Link to="/nye-casinoer/dansk-licens" className={linkClass}>nye casinoer med dansk licens</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I det følgende gennemgår vi de konkrete risici med dokumenterede beregninger, den juridiske ramme, håndhævelsesmekanismer, og et detaljeret migrationsforløb for spillere der ønsker at skifte fra ulovlige til lovlige casinoer.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kvantificeret risikoanalyse: Hvad koster det at spille uden ROFUS?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Risiciene ved at spille hos casinoer uden dansk licens er ikke blot teoretiske – de kan kvantificeres i kroner og ører. Vi har beregnet den faktiske økonomiske forskel baseret på tre typiske spillerprofiler. Beregningerne viser, at casinoer uden ROFUS er markant dyrere for danske spillere:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">Scenarie</th>
                  <th className="text-right p-3 font-semibold">Dansk casino</th>
                  <th className="text-right p-3 font-semibold">Ulovligt casino</th>
                  <th className="text-right p-3 font-semibold">Forskel</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="p-3">Gevinst 10.000 kr. (efter skat)</td>
                  <td className="text-right p-3 text-primary font-semibold">10.000 kr.</td>
                  <td className="text-right p-3">5.500 kr.</td>
                  <td className="text-right p-3 text-destructive font-semibold">−4.500 kr.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3">Bonus 1.000 kr. (reel EV)</td>
                  <td className="text-right p-3 text-primary font-semibold">~650 kr. (10x)</td>
                  <td className="text-right p-3">~85 kr. (50x)</td>
                  <td className="text-right p-3 text-destructive font-semibold">−565 kr.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3">Gevinst 50.000 kr. (efter skat)</td>
                  <td className="text-right p-3 text-primary font-semibold">50.000 kr.</td>
                  <td className="text-right p-3">27.500 kr.</td>
                  <td className="text-right p-3 text-destructive font-semibold">−22.500 kr.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3">Bonus 5.000 kr. (reel EV)</td>
                  <td className="text-right p-3 text-primary font-semibold">~3.250 kr. (10x)</td>
                  <td className="text-right p-3">~425 kr. (50x)</td>
                  <td className="text-right p-3 text-destructive font-semibold">−2.825 kr.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3">Gevinst 100.000 kr. (efter skat)</td>
                  <td className="text-right p-3 text-primary font-semibold">100.000 kr.</td>
                  <td className="text-right p-3">55.000 kr.</td>
                  <td className="text-right p-3 text-destructive font-semibold">−45.000 kr.</td>
                </tr>
                <tr>
                  <td className="p-3">Årlig spiller (total EV-forskel)</td>
                  <td className="text-right p-3 text-primary font-semibold">Baseline</td>
                  <td className="text-right p-3">−15–30%</td>
                  <td className="text-right p-3 text-destructive font-semibold">Markant tab</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Beregninger: Skattefrihed vs. 45% topskattesats. Bonus-EV beregnet med RTP 96%, spilbidrag 100% på slots. Ulovligt casino antaget med 50x omsætningskrav (deposit+bonus). Se vores <Link to="/nye-casinoer/lav-wagering" className={linkClass}>detaljerede EV-modeller</Link> for metodebeskrivelse.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">De 8 konkrete risici ved nye casinoer uden ROFUS</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Risiciene ved at spille hos casinoer uden dansk licens er dokumenterede og har ramt tusindvis af danske spillere. Her er en detaljeret gennemgang af de otte mest alvorlige risikofaktorer, rangeret efter konsekvens:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Skattepligtige gevinster (op til 45%)", desc: "Gevinster fra ulovlige casinoer er skattepligtige i Danmark efter personskattelovens § 4. Du skal selvangive alle gevinster, og skattesatsen kan nå op til 45%. SKAT har øget fokus på udenlandske casinotransaktioner og kan indhente oplysninger fra betalingsudbydere. Manglende selvangivelse kan resultere i strafbøde og tillægsskat. En gevinst på 100.000 kr. giver dig reelt kun 55.000 kr." },
              { title: "Ingen spillerbeskyttelse eller klageadgang", desc: "Uden dansk licens har du ingen klageadgang via Spillemyndigheden. Tvister afgøres efter operatørens hjemlands lovgivning – typisk Curaçao eller Malta. I praksis er det næsten umuligt at vinde en klagesag mod en Curaçao-licenseret operatør. Curaçaos tilsynsmyndighed (GCB) behandler sjældent individuelle klager og har ingen håndhævelsesmekanismer mod operatører." },
              { title: "Ingen bankgaranti – dine penge er ubeskyttede", desc: "Ulovlige casinoer stiller ingen bankgaranti i Danmark. Dine indeståender er ikke beskyttet, hvis operatøren lukker, går konkurs eller beslutter ikke at udbetale. Der er talrige dokumenterede tilfælde, hvor spillere har mistet deres saldo ved pludselige lukninger. Ingen dansk myndighed kan hjælpe dig med at få pengene tilbage." },
              { title: "Ingen ROFUS-selvudelukkelse", desc: "Uden ROFUS-tilslutning kan du ikke benytte den danske selvudelukkelsesordning. Det fjerner et vigtigt sikkerhedsnet for spillere med risikoadfærd. Selvom nogle ulovlige casinoer tilbyder egne selvudelukkelsesværktøjer, er de typisk lette at omgå og dækker kun det enkelte casino – ikke alle spillesteder som ROFUS gør." },
              { title: "Omsætningskrav 40–60x (mod danske 10x)", desc: "Dansk lovgivnings 10x-loft gælder ikke for ulovlige casinoer. Vi ser regelmæssigt krav på 40–60x. En bonus på 5.000 kr. med 50x krav kræver 250.000 kr. i spil – med et house edge på 4% mister du statistisk 10.000 kr. blot for at omsætte bonussen. Det gør bonussen til en netto-negativ proposition." },
              { title: "Tvivlsom RNG og fairness", desc: "Uden dansk tilsyn er der ingen uafhængig garanti for, at spillenes tilfældighedsgenerator (RNG) er fair. Certificering fra akkrediterede testlaboratorier er sjælden hos Curaçao-licenserede casinoer. Dokumenterede tilfælde af manipulerede RTP-procenter og riggede bonus-triggere er rapporteret hos ulicenserede operatører." },
              { title: "Identitetstyveri og databrud", desc: "Ulovlige casinoer har ofte svagere datasikkerhed end danske licensindehavere, der skal overholde GDPR og Spillemyndighedens sikkerhedskrav. Uploadede ID-dokumenter og finansielle oplysninger kan potentielt misbruges. Flere databrud hos Curaçao-licenserede casinoer er dokumenteret de seneste år." },
              { title: "Betalingsproblemer og blokerede transaktioner", desc: "Danske banker og betalingsudbydere blokerer i stigende grad transaktioner til og fra ulovlige casinoer. Det kan resultere i, at du ikke kan hverken indbetale eller udbetale. Spillemyndighedens samarbejde med betalingssektoren intensiveres i 2026." },
            ].map((risk) => (
              <div key={risk.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <div>
                  <h3 className="font-semibold">{risk.title}</h3>
                  <p className="text-sm text-muted-foreground">{risk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Den juridiske ramme: Dansk spillelovgivning i detaljer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den danske spillelov (Lov om spil, LOV nr. 848 af 01/07/2010 med senere ændringer) regulerer alt online gambling rettet mod danske spillere. Forståelse af den juridiske ramme er vigtig for at vurdere de reelle konsekvenser ved at spille hos ulovlige casinoer:
          </p>
          <div className="space-y-3">
            {[
              { title: "Spillerens juridiske position", desc: "Det er ikke strafbart for dig som spiller at benytte et ulovligt casino. Du risikerer ikke bøde eller fængsel for at spille. Men du mister alle de rettigheder og beskyttelser, som dansk lovgivning giver dig: skattefrihed, klageadgang, ROFUS-beskyttelse og bankgaranti. Du er juridisk på egen hånd." },
              { title: "Operatørens ansvar", desc: "For operatøren er det strafbart at tilbyde online casinospil til danske spillere uden dansk licens. Straffen kan inkludere bøde og fængsel. Spillemyndigheden kan anmelde ulovlige operatører til politiet og samarbejder med internationale myndigheder om håndhævelse." },
              { title: "DNS-blokering (Spillelovens §59a)", desc: "Spillemyndigheden kan pålægge danske internetudbydere at blokere adgangen til ulovlige casinodomæner. Pr. marts 2026 er over 150 domæner blokeret. Listen opdateres løbende, og nye blokeringer kan implementeres inden for 5 hverdage efter afgørelse. Blokering kan omgås med VPN, men det ændrer ikke de juridiske og økonomiske risici." },
              { title: "Betalingsblokering", desc: "Spillemyndigheden samarbejder med danske banker og betalingsudbydere om at identificere og blokere transaktioner til og fra ulovlige casinoer. Betalingsblokering er frivillig for bankerne, men flere store danske banker (Danske Bank, Nordea, Jyske Bank) har implementeret automatiske blokeringer." },
              { title: "Skattemæssige konsekvenser", desc: "Gevinster fra casinoer uden dansk licens er skattepligtige efter personskattelovens § 4. Skattesatsen afhænger af din samlede indkomst og kan nå op til 45%. Du har pligt til at selvangive gevinster. SKAT kan indhente oplysninger om udenlandske transaktioner via banksamarbejde og internationale informationsudvekslingsaftaler." },
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
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sådan genkender du et ulovligt casino – 8 advarselstegn</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ulovlige casinoer bliver stadig mere sofistikerede i deres forsøg på at fremstå som legitime. Her er otte konkrete advarselstegn, der kan hjælpe dig med at identificere casinoer uden dansk licens, før du opretter en konto:
          </p>
          <div className="space-y-3">
            {[
              { title: "Ingen MitID-krav ved registrering", desc: "Danske casinoer kræver altid MitID ved registrering. Hvis et casino lader dig oprette en konto med kun e-mail og kodeord, har det ikke dansk licens. Det er det mest pålideligt advarselstegn." },
              { title: "Omsætningskrav over 10x", desc: "Det danske lovmæssige loft er 10x. Ser du krav på 20x, 40x eller 60x, opererer casinoet under udenlandsk licens. Ingen undtagelser." },
              { title: "Ingen ROFUS-information på hjemmesiden", desc: "Alle danske casinoer har ROFUS-information synligt på deres hjemmeside – typisk i footeren og under 'Ansvarligt spil'. Mangler det, er det et klart advarselstegn." },
              { title: "Kryptovaluta som betalingsmetode", desc: "Casinoer der accepterer Bitcoin, Ethereum eller andre kryptovalutaer har aldrig dansk licens. Spillemyndigheden har eksplicit forbudt kryptovalutaer som betalingsmetode." },
              { title: "Bonusser over 1.000 kr. med høje omsætningskrav", desc: "Hvis bonusbeløbet er markant højere end gennemsnittet (f.eks. 10.000 kr.+) med omsætningskrav over 10x, er det sandsynligvis et ulovligt casino. Danske operatører holder sig typisk inden for 100–2.000 kr. med max 10x krav." },
              { title: "Manglende Spillemyndighedens logo i footeren", desc: "Alle danske licensindehavere skal vise Spillemyndighedens logo og licensnummer i deres footer. Tjek altid for dette mærke – og verificér nummeret hos Spillemyndigheden." },
              { title: "Hjemmesiden er på engelsk med dansk oversættelse", desc: "Mange ulovlige casinoer bruger automatisk oversatte hjemmesider. Sprog-kvaliteten er typisk lav med uidiomatisk dansk. Danske licensindehavere har professionelt dansk indhold som standard." },
              { title: "Aggressiv markedsføring via sociale medier", desc: "Ulovlige casinoer bruger ofte aggressiv markedsføring via uregulerede kanaler: Telegram-grupper, Discord, Instagram-annoncer fra anonyme profiler og spam-mails. Danske operatører markedsfører sig via godkendte kanaler og overholder strenge markedsføringsregler." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Ban className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
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
          <h2 className="mb-4 text-3xl font-bold">Migrationsguide: Skift fra ulovligt til lovligt casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvis du aktuelt spiller hos et casino uden dansk licens og ønsker at skifte til et lovligt alternativ, anbefaler vi følgende trin-for-trin migrationsforløb. Processen tager typisk 1–3 dage og sikrer, at du bevarer dine midler og får en problemfri overgang:
          </p>
          <div className="space-y-3">
            {[
              { step: "Trin 1: Hæv din saldo", desc: "Log ind på det ulovlige casino og anmod om udbetaling af hele din saldo. Vælg den hurtigste tilgængelige metode (typisk e-wallet). Dokumentér transaktionen med screenshots inkl. beløb og tidspunkt. Hvis casinoet nægter udbetaling, dokumentér afslaget – det kan være relevant for en eventuel klage." },
              { step: "Trin 2: Luk din konto", desc: "Kontakt kundeservice og anmod om permanent kontolukning. Bed om skriftlig bekræftelse via e-mail. Slet eventuelle gemte betalingsoplysninger. Gem alle korrespondance for din egen arkiv." },
              { step: "Trin 3: Selvangiv eventuelle gevinster", desc: "Husk, at gevinster fra ulovlige casinoer er skattepligtige. Beregn dit nettoresultat (samlede udbetalinger minus samlede indbetalinger) og selvangiv beløbet i rubrik 20 på din årsopgørelse. Gem dokumentation for transaktioner i minimum 5 år." },
              { step: "Trin 4: Vælg et dansk licenseret casino", desc: "Gennemse vores liste over nye casinoer med dansk licens. Sammenlign bonusser, spiludvalg og betalingsmetoder. Vi anbefaler at starte med et casino fra vores topliste – de har gennemgået vores grundige testproces og lever op til alle kvalitetskrav." },
              { step: "Trin 5: Registrer dig med MitID", desc: "Opret en konto hos det valgte danske casino. Verifikation via MitID tager under 2 minutter og sikrer, at din identitet er bekræftet fra dag ét. Du undgår dermed KYC-forsinkelser ved fremtidige udbetalinger." },
              { step: "Trin 6: Sæt ansvarligt spil-grænser", desc: "Ved kontooprettelse skal du sætte indbetalingsgrænser. Vi anbefaler, at du sætter realistiske grænser fra starten – det er lettere at forhøje dem senere (med 24 timers afkøling) end at sænke dem retrospektivt." },
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
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Det sikre alternativ: nye casinoer med dansk licens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I stedet for at risikere dine penge hos ulovlige casinoer, anbefaler vi, at du vælger blandt de mange nye casinoer med dansk licens. Disse spillesteder tilbyder konkurrencedygtige bonusser, moderne platforme og et bredt spiludvalg – men med den fulde beskyttelse, som dansk lovgivning giver dig. Forskellen i reel bonusværdi er ofte til danske casinoers fordel pga. det lave omsætningsloft:
          </p>
          <div className="space-y-3">
            {[
              "Skattefri gevinster – spar potentielt tusindvis af kroner i skat (45% forskel ved store gevinster)",
              "Maksimalt 10x omsætningskrav – bonusser du faktisk kan omsætte med positiv EV",
              "ROFUS-selvudelukkelse – beskyt dig selv mod problematisk spil med nationale dækning",
              "Klageadgang via Spillemyndigheden – din ret som forbruger under dansk lov",
              "Bankgaranti min. 750.000 kr. – dine penge er juridisk sikrede",
              "MitID-verifikation – hurtig KYC uden manuel dokumenthåndtering",
              "Dansk kundesupport – hjælp på dit eget sprog, af folk der kender danske regler",
              "Certificerede RNG-systemer – garanteret fairness verificeret af uafhængige laboratorier",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hjælperessourcer ved spilleproblemer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvis du eller en du kender har problemer med gambling – uanset om det er hos lovlige eller ulovlige casinoer – er der hjælp at hente. Alle nedenstående tjenester er gratis, fortrolige og tilgængelige for alle:
          </p>
          <div className="space-y-3">
            {[
              { title: "StopSpillet – 70 22 28 25", desc: "Danmarks nationale rådgivningstjeneste for spilleproblemer. Åbent alle hverdage. Tilbyder anonym rådgivning, behandlingshenvisning og støtte til pårørende. Kan også kontaktes via chat på stopspillet.dk." },
              { title: "ROFUS – rofus.nu", desc: "Registér dig for selvudelukkelse fra alle danske licenserede spillesteder. Tilgængelig via MitID. Midlertidig (24 timer–6 måneder) eller permanent udelukkelse." },
              { title: "Center for Ludomani", desc: "Tilbyder gratis ambulant behandling af ludomani i hele Danmark. Har behandlingscentre i København, Odense, Aarhus og Aalborg. Henvisning via praktiserende læge eller direkte kontakt." },
              { title: "Spillemyndighedens klageinstans", desc: "Hvis du har en tvist med et dansk licenseret casino, kan du klage til Spillemyndigheden. Klagen er gratis og behandles upartisk. Casinoet er forpligtet til at følge Spillemyndighedens afgørelse." },
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
          <h2 className="mb-4 text-3xl font-bold">Udforsk sikre nye casinoer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { to: "/nye-casinoer", label: "Nye Casinoer – Hovedside", desc: "Alle nye casinoer med dansk licens" },
              { to: "/nye-casinoer/dansk-licens", label: "Med Dansk Licens", desc: "Kun licenserede nye casinoer" },
              { to: "/casino-licenser", label: "Licenserede Casinoer", desc: "Alle licenserede casinoer" },
              { to: "/ansvarligt-spil", label: "Ansvarligt Spil", desc: "Guide til ansvarligt spil" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm">{link.label}</h3>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <InlineCasinoCards title="Licenserede alternativer vi anbefaler" count={4} />

        <RelatedGuides currentPath="/nye-casinoer/uden-rofus" />
        <FAQSection title="Ofte stillede spørgsmål om casinoer uden ROFUS" faqs={faqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

export default NyeCasinoerUdenRofus;

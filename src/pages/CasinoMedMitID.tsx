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
import { Ban, Cpu, Dog, Fingerprint, Play, Scan, Settings, Timer } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";
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
        MitID er Danmarks nationale digitale identitetsløsning, der erstattede NemID i 2022. Alle casinoer med <Link to="/casino-med-dansk-licens" className={linkClass}>dansk licens</Link> er lovmæssigt forpligtede til at bruge MitID til aldersverifikation (18+) og identitetskontrol (<Link to="/ordbog/kyc" className={linkClass}>KYC</Link>). MitID bruger to-faktor-autentificering (biometri + enhed) og er koblet til CPR-registret, hvilket sikrer at kun godkendte spillere kan oprette konti. Det er en central del af <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>-lovgivningen og muliggør automatisk <Link to="/ansvarligt-spil/rofus" className={linkClass}>ROFUS</Link>-kontrol.
      </>
    ),
  },
  {
    question: "Hvor lang tid tager det at oprette en casinokonto med MitID?",
    answer: "Kontooprettelse med MitID tager typisk 2-5 minutter. Du åbner MitID-appen, godkender din identitet med fingeraftryk eller ansigtsgenkendelse, og casinoet opretter automatisk din konto med dine verificerede oplysninger. Hos de bedste casinoer kan du spille inden for 3 minutter fra du starter registreringen. Det er langt hurtigere end traditionel registrering med manuel verifikation, der kan tage 24-72 timer.",
  },
  {
    question: "Er det sikkert at bruge MitID på online casinoer?",
    answer: (
      <>
        Ja, MitID er ekstremt sikkert. Det anvender stærk to-faktor-autentificering (biometri + enhed), og casinoet modtager kun de nødvendige oplysninger (navn, CPR-nummer, alder). Dine bankoplysninger, passwords og sundhedsdata deles aldrig via MitID. <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> regulerer hvordan casinoer håndterer dine data, og alle licenserede operatører overholder GDPR og dansk databeskyttelseslovgivning. MitID-kommunikationen er krypteret med TLS 1.3 og bruger NIST-godkendte krypteringsalgoritmer.
      </>
    ),
  },
  {
    question: "Kan jeg spille på casino uden MitID i Danmark?",
    answer: (
      <>
        Nej, ikke hos casinoer med dansk licens. MitID-verifikation er lovkrav for alle <Link to="/casino-med-dansk-licens" className={linkClass}>danske licenserede casinoer</Link>. Casinoer uden MitID-krav er ulicenserede og opererer uden <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighedens</Link> godkendelse – hvilket indebærer <Link to="/casino-uden-rofus" className={linkClass}>betydelige risici</Link> for spilleren, herunder skattepligtige gevinster, ingen klageinstans og svagere spillerbeskyttelse.
      </>
    ),
  },
  {
    question: "Hvad sker der, hvis MitID-appen ikke virker?",
    answer: "Hvis din MitID-app ikke fungerer, kan du: 1) Opdatere appen til nyeste version i App Store/Google Play, 2) Genstarte din telefon og prøve igen, 3) Tjekke at du har en stabil internetforbindelse, 4) Bruge MitID-kodeviseren som alternativ autentificeringsmetode, 5) Nulstille din MitID-app via mitid.dk. Kontakt MitID-support på 72 68 86 00 for teknisk hjælp – de er tilgængelige hverdage 8-20 og weekender 10-16. Casinoets kundeservice kan ikke hjælpe med MitID-problemer direkte, da det er et eksternt system.",
  },
  {
    question: "Kan udlændinge bruge MitID til at spille på danske casinoer?",
    answer: "MitID er kun tilgængeligt for personer med dansk CPR-nummer. Udlændinge uden dansk CPR kan ikke oprette MitID og dermed ikke spille hos danske licenserede casinoer. Det er en del af den danske regulering, der sikrer at kun personer med tilknytning til Danmark kan spille – og at aldersverifikation og ROFUS-tilslutning fungerer korrekt. Nordiske statsborgere med dansk CPR kan dog oprette MitID.",
  },
  {
    question: "Hvad er forskellen mellem MitID og NemID?",
    answer: "NemID blev udfaset i 2023 og erstattet af MitID. De primære forskelle er: 1) MitID bruger biometrisk autentificering (fingeraftryk/ansigt) i stedet for nøglekort eller nøglefil, 2) MitID er app-baseret og kræver ikke fysiske enheder, 3) MitID har stærkere kryptering og følger de nyeste sikkerhedsstandarder (eIDAS), 4) MitID er hurtigere – godkendelse tager 2-5 sekunder mod 10-15 sekunder med NemID, 5) MitID understøtter flere samtidige enheder.",
  },
  {
    question: "Deler MitID mine bankoplysninger med casinoet?",
    answer: "Nej, absolut ikke. MitID deler udelukkende identitetsoplysninger: dit fulde navn, CPR-nummer og adresse. Dine bankoplysninger, kontonumre, passwords og andre følsomme data deles aldrig via MitID. Når du indbetaler til et casino, sker det via en separat betalingstransaktion (f.eks. via Trustly eller kort), som er helt adskilt fra MitID-verifikationen. De to systemer kommunikerer ikke med hinanden.",
  },
  {
    question: "Kan jeg bruge MitID på flere casinoer samtidig?",
    answer: "Ja, du kan oprette konti hos flere danske licenserede casinoer med det samme MitID. Der er ingen begrænsning på antal konti. Hver registrering er uafhængig, og casinoerne deler ikke information om dine konti indbyrdes. Dog kontrolleres din ROFUS-status ved hvert login, så en selvudelukkelse gælder automatisk på alle danske casinoer samtidig.",
  },
  {
    question: "Hvad gør MitID med mine data efter registrering?",
    answer: (
      <>
        MitID fungerer som en verifikationstjeneste – de opbevarer ikke dine casino-relaterede data. Casinoet modtager dine oplysninger i forbindelse med kontooprettelse og opbevarer dem i henhold til GDPR og <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighedens</Link> krav. Casinoer er forpligtede til at slette dine data inden for rimelig tid efter kontoafslutning, medmindre lovgivning kræver længere opbevaring (typisk 5 år for anti-hvidvask). Du kan altid anmode om en kopi af dine data eller bede om sletning via casinoets GDPR-kontaktperson.
      </>
    ),
  },
];

const mitidFordele = [
  {
    iconName: "fingerprint",
    title: "Sikker identitetskontrol",
    description: "To-faktor-autentificering med biometri sikrer at ingen kan oprette en konto i dit navn. Din identitet verificeres øjeblikkeligt mod det danske CPR-register med bank-niveau kryptering.",
    tag: "Sikkerhed",
  },
  {
    iconName: "zap",
    title: "Hurtig kontooprettelse (2-5 min)",
    description: "Ingen manuel indtastning af personoplysninger – MitID udfylder automatisk navn, adresse og fødselsdato. Du kan spille inden for minutter efter registrering, mod timer med traditionel verifikation.",
    tag: "Hastighed",
  },
  {
    iconName: "shield",
    title: "Automatisk ROFUS-tjek",
    description: "MitID-verifikation kontrollerer automatisk din ROFUS-status ved hver kontooprettelse og hvert login. Er du selvudelukket, blokeres adgangen – en vigtig beskyttelse mod impulsspil.",
    tag: "Beskyttelse",
  },
  {
    iconName: "lock",
    title: "GDPR-sikret datahåndtering",
    description: "Casinoet modtager kun nødvendige oplysninger via en krypteret kanal. Bankoplysninger og passwords deles aldrig. Alt følger dansk databeskyttelseslov og EU's GDPR-forordning.",
    tag: "Privatliv",
  },
  {
    iconName: "scan",
    title: "Aldersverifikation (18+)",
    description: "Automatisk kontrol mod CPR-registret sikrer at kun personer over 18 kan oprette konti. Det eliminerer risikoen for at mindreårige får adgang til online gambling – et krav som ulicenserede casinoer ikke overholder.",
    tag: "Compliance",
  },
  {
    iconName: "circle-check",
    title: "Anti-hvidvask (AML)",
    description: "MitID opfylder KYC-kravene i hvidvasklovgivningen (4. og 5. AML-direktiv). Casinoet kan verificere din identitet uden at du skal uploade ID-dokumenter manuelt – hurtigere og sikrere for begge parter.",
    tag: "Regulering",
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
        <AuthorMetaBar author="ajse" readTime="50 Min." />

        <SnippetAnswer answer="Alle danske licenserede casinoer bruger MitID til sikker identitetskontrol og aldersverifikation. Kontooprettelse tager 2-5 minutter med automatisk ROFUS-tjek og to-faktor-autentificering via biometri. MitID deler aldrig bankoplysninger med casinoet." />

        <QuickComparisonTable count={3} title="Bedste casinoer med MitID-login" prioritySlugs={["spilleautomaten", "leovegas", "comeon"]} />

        {/* Intro */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Hvad er MitID på casino?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MitID er Danmarks nationale digitale identitetsløsning, og alle casinoer med <Link to="/casino-med-dansk-licens" className={linkClass}>dansk spillelicens</Link> er forpligtede til at bruge det til identitetskontrol. Når du opretter en konto hos et dansk online casino, bruger du MitID-appen til at bekræfte din identitet – præcis som når du logger ind på din netbank, borger.dk eller e-Boks. Det er den samme sikre teknologi der bruges af alle offentlige myndigheder og finansielle institutioner i Danmark.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MitID erstattede det ældre NemID-system i 2022-2023 og medbragte markante forbedringer i sikkerhed, hastighed og brugervenlighed. Mens NemID krævede fysiske nøglekort eller en separat nøglefil, er MitID helt app-baseret og bruger biometrisk autentificering – fingeraftryk eller ansigtsgenkendelse – til at bekræfte din identitet. Det gør kontooprettelse hos danske casinoer hurtigere og sikrere end nogensinde.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MitID-verifikation sikrer tre kritiske ting ved casino-registrering: at du er den, du siger du er (identitetskontrol mod CPR-registret), at du er over 18 år (aldersverifikation), og at du ikke er registreret i <Link to="/ansvarligt-spil/rofus" className={linkClass}>ROFUS</Link> (selvudelukkelseskontrol). Alle tre tjek sker automatisk og øjeblikkeligt – typisk under 30 sekunder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For spilleren betyder MitID en markant hurtigere og mere sikker kontooprettelse sammenlignet med traditionel manuel verifikation. Du slipper for at uploade ID-dokumenter, vente på manuel godkendelse og gennemgå tidskrævende verifikationsprocesser. Alt verificeres øjeblikkeligt via det danske CPR-register, og du kan typisk begynde at spille inden for 2-5 minutter fra du starter registreringen.
          </p>
        </section>

        <Separator className="my-8" />

        {/* 6 Fordele */}
        <section className="mb-10">
          <h2 className="mb-6 text-3xl font-bold">6 fordele ved MitID på casino</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            MitID er ikke bare et lovkrav – det er en reel fordel for dig som spiller. Systemet kombinerer sikkerhed, hastighed og spillerbeskyttelse på en måde som ingen anden verifikationsmetode kan matche. Her gennemgår vi de seks vigtigste fordele:
          </p>
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

        {/* Trin-for-trin guide – udvidet */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Sådan opretter du en casinokonto med MitID – trin for trin</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Processen er enkel og intuitiv, men vi gennemgår hvert trin i detaljer, så du ved præcis hvad du kan forvente. Fra start til du kan spille tager det typisk under 5 minutter:
          </p>
          <div className="space-y-3">
            {[
              { step: "1", title: "Vælg et dansk licenseret casino", desc: "Find et casino fra vores anbefalinger baseret på dine præferencer – bonus, spiludvalg, udbetalingstider eller live casino-kvalitet. Tjek at casinoet har en gyldig dansk licens (licensnummer i footer). Brug vores sammenligningsværktøj til at finde det bedste match." },
              { step: "2", title: "Klik 'Opret konto' eller 'Registrér'", desc: "På casinoets hjemmeside finder du typisk en 'Opret konto'-knap i øverste højre hjørne. Du vil blive bedt om at angive en email-adresse og vælge en adgangskode. Nogle casinoer beder også om et mobilnummer til verifikation." },
              { step: "3", title: "Godkend med MitID-appen", desc: "Casinoet sender en MitID-anmodning til din telefon. Åbn MitID-appen og godkend med fingeraftryk, ansigtsgenkendelse eller pinkode. Processen tager 2-5 sekunder. Sørg for at din telefon har internetforbindelse og at MitID-appen er opdateret." },
              { step: "4", title: "Automatisk verifikation (under 30 sek.)", desc: "Når du godkender MitID-anmodningen, overføres dine verificerede oplysninger til casinoet: fulde navn, fødselsdato og adresse. Casinoet kontrollerer automatisk din alder (18+) og ROFUS-status. Hele verifikationen tager typisk under 30 sekunder." },
              { step: "5", title: "Sæt spillegrænser (anbefalet)", desc: "Inden du indbetaler, anbefaler vi at sætte indbetalings- og tabsgrænser. Det er et vigtigt værktøj for ansvarligt spil, og alle danske casinoer er forpligtede til at tilbyde det. Du kan altid justere grænserne senere – nedsættelse sker øjeblikkeligt, forhøjelse efter 24 timer." },
              { step: "6", title: "Indbetal og begynd at spille", desc: "Vælg din foretrukne betalingsmetode. Trustly (bank-til-bank) er typisk den hurtigste med øjeblikkelig overførsel. Kreditkort, MobilePay og andre metoder er også tilgængelige afhængigt af casinoet. Din indbetaling krediteres øjeblikkeligt, og du kan begynde at spille med det samme." },
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

        {/* MitID teknisk arkitektur */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Sådan fungerer MitID teknisk</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at forstå sikkerheden ved MitID er det nyttigt at kende den tekniske arkitektur bag systemet. MitID er udviklet af Nets (nu Nexi Group) på vegne af Digitaliseringsstyrelsen og er bygget på internationale standarder for elektronisk identifikation (eIDAS-forordningen).
          </p>

          <div className="space-y-4">
            <div className="rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                Autentificeringsflow ved casino-registrering
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Når du registrerer dig på et casino med MitID, sker følgende tekniske proces: Casinoet sender en autentificeringsanmodning til MitID-brokeren (en mellemmand der forbinder casinoet med MitID-infrastrukturen). Brokeren videresender anmodningen til MitID-serverne, som sender en push-notifikation til din MitID-app. Du godkender med biometri, og MitID-serveren bekræfter din identitet og returnerer dine verificerede oplysninger til casinoet via brokeren – alt krypteret med TLS 1.3.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hele flowet tager typisk 2-5 sekunder fra du åbner appen til casinoet har dine verificerede oplysninger. Casinoet modtager et signeret token med dine data og kan verificere at oplysningerne er autentiske og ikke manipulerede. Det er teknisk umuligt for casinoet eller en tredjepart at forfalske denne verifikation.
              </p>
            </div>

            <div className="rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MenuIcon iconName="lock" className="h-5 w-5 text-primary" />
                Kryptering og datasikkerhed
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                MitID bruger AES-256 kryptering for data i hvile og TLS 1.3 for data under transport. Biometriske data (fingeraftryk/ansigtsmodel) forlader aldrig din telefon – de gemmes lokalt i telefonens sikre enhed (Secure Enclave på iPhone, Trusted Execution Environment på Android). Casinoet modtager aldrig dine biometriske data. MitID-infrastrukturen er ISO 27001-certificeret og undergår regelmæssige sikkerhedsaudits af uafhængige tredjeparter.
              </p>
            </div>

            <div className="rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MenuIcon iconName="shield" className="h-5 w-5 text-primary" />
                Beskyttelse mod svindel
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                MitID inkluderer flere lag af svindelbeskyttelse: enhedsbinding (din MitID er låst til din specifikke telefon), biometrisk verifikation (forhindrer brug af stjålet telefon), transaktionssignering (du kan se præcis hvad du godkender), og anomalidetektion (systemet reagerer på usædvanlige mønstre). For casinoer betyder dette at identitetstyveri og kontoovertag er praktisk talt umuligt sammenlignet med traditionelle KYC-metoder.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* MitID og datasikkerhed – udvidet */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">MitID, GDPR og din dataprivatliv</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mange spillere er med rette bekymrede for hvordan deres personoplysninger håndteres af online casinoer. MitID er designet med "privacy by design"-principper, og den danske lovgivning giver dig stærke rettigheder i forhold til dine data. Her er en komplet gennemgang af hvad der deles, hvem der har adgang, og hvilke rettigheder du har:
          </p>

          <div className="rounded-lg border border-border overflow-hidden mb-6">
            <div className="grid grid-cols-3 gap-0 bg-muted/50 p-3 text-sm font-semibold">
              <span>Datatype</span>
              <span className="text-center">Deles med casino?</span>
              <span className="text-center">Formål</span>
            </div>
            {[
              ["Fulde navn", "✅ Ja", "Identitetskontrol"],
              ["CPR-nummer", "✅ Ja", "Aldersverifikation"],
              ["Adresse", "✅ Ja", "KYC-verifikation"],
              ["Fødselsdato", "✅ Ja", "18+ kontrol"],
              ["Bankoplysninger", "❌ Nej", "–"],
              ["Passwords", "❌ Nej", "–"],
              ["Fingeraftryk/ansigt", "❌ Nej", "Kun lokal verifikation"],
              ["Sundhedsdata", "❌ Nej", "–"],
              ["Skatteoplysninger", "❌ Nej", "–"],
              ["Browsing-historik", "❌ Nej", "–"],
            ].map(([type, deles, formaal]) => (
              <div key={type} className="grid grid-cols-3 gap-0 border-t border-border p-3 text-sm">
                <span className="text-muted-foreground">{type}</span>
                <span className="text-center">{deles}</span>
                <span className="text-center text-muted-foreground">{formaal}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {[
              { iconName: "eye", title: "Indsigtsret (GDPR art. 15)", desc: "Du har ret til at se alle de personoplysninger casinoet opbevarer om dig. Anmod via casinoets GDPR-kontaktperson eller kundeservice. De skal svare inden for 30 dage." },
              { iconName: "ban", title: "Ret til sletning (GDPR art. 17)", desc: "Du kan bede om sletning af dine data efter kontoafslutning. Dog er casinoer forpligtede til at opbevare visse data i 5 år iht. hvidvasklovgivningen. Herefter slettes alt automatisk." },
              { iconName: "refresh-cw", title: "Ret til dataportabilitet (GDPR art. 20)", desc: "Du kan anmode om at modtage dine data i et maskinlæsbart format. Det kan være relevant, hvis du ønsker at skifte casino og vil dokumentere din spilhistorik." },
              { iconName: "settings", title: "Ret til begrænsning (GDPR art. 18)", desc: "Du kan bede casinoet om at begrænse behandlingen af dine data under specifikke omstændigheder, f.eks. hvis du bestrider nøjagtigheden af de opbevarede oplysninger." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* MitID vs. uden MitID – udvidet */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Casino med MitID vs. casino uden verifikation – komplet sammenligning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casinoer der <strong>ikke</strong> kræver MitID-verifikation har ikke dansk licens og opererer uden <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighedens</Link> godkendelse. Forskellen i spillerbeskyttelse er fundamental og handler om din sikkerhed, dine penge og dine rettigheder:
          </p>

          <div className="rounded-lg border border-border overflow-hidden mb-6">
            <div className="grid grid-cols-3 gap-0 bg-muted/50 p-3 text-sm font-semibold">
              <span>Egenskab</span>
              <span className="text-center">Med MitID (DK-licens) ✅</span>
              <span className="text-center">Uden MitID ❌</span>
            </div>
            {[
              ["Identitetskontrol", "✅ CPR-verificeret", "❌ Ofte selvdeklaret"],
              ["Aldersverifikation", "✅ Automatisk (18+)", "❌ Svag/manuel"],
              ["ROFUS-kontrol", "✅ Automatisk", "❌ Ikke tilsluttet"],
              ["Kontooprettelse", "✅ 2-5 minutter", "❌ 24-72 timer (KYC)"],
              ["Gevinster skattefrie", "✅ Ja, altid", "❌ Op til 52% skat"],
              ["Klageinstans", "✅ Spillemyndigheden", "❌ Ingen i DK"],
              ["Spillerbeskyttelse", "✅ Dansk lov", "❌ Udenlandsk/ingen"],
              ["Databeskyttelse", "✅ GDPR + DK-lov", "❌ Varierer"],
              ["Anti-hvidvask", "✅ Automatisk KYC", "❌ Manuel/svag"],
              ["Bankgaranti", "✅ Min. 5 mio. DKK", "❌ Ingen garanti"],
            ].map(([label, med, uden]) => (
              <div key={label} className="grid grid-cols-3 gap-0 border-t border-border p-3 text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="text-center">{med}</span>
                <span className="text-center">{uden}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {[
              { iconName: "alert-triangle", title: "Ingen alderskontrol", desc: "Uden MitID er der ingen garanti for at mindreårige forhindres i at spille. Ulicenserede casinoer bruger typisk selvdeklaret alder ved registrering – et system der er trivielt at omgå og som ingen reel beskyttelse tilbyder. Det er et alvorligt problem for unge menneskers sikkerhed." },
              { iconName: "alert-triangle", title: "Ingen ROFUS-beskyttelse", desc: "Selvudelukkede spillere kan omgå ROFUS og oprette konti uhindret hos ulicenserede casinoer. Det underminerer formålet med ROFUS og udsætter sårbare spillere for risiko. Casinoer der aktivt markedsfører sig mod ROFUS-registrerede spillere handler uetisk." },
              { iconName: "alert-triangle", title: "Skattemæssige konsekvenser", desc: "Gevinster fra ulicenserede casinoer beskattes som personlig indkomst (op til 52%), modsat skattefrie gevinster hos danske casinoer. En gevinst på 10.000 kr. reduceres til ca. 4.800 kr. efter skat. Manglende selvangivelse kan medføre bøder og tillæg fra SKAT." },
              { iconName: "alert-triangle", title: "Identitetstyveri-risiko", desc: "Uden MitID's sikre verifikation er der øget risiko for at dine personoplysninger kompromitteres. Ulicenserede casinoer har ikke de samme krav til datasikkerhed og kryptering som danske operatører, og din data kan potentielt misbruges eller sælges til tredjepart." },
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

        <Separator className="my-8" />

        {/* MitID fra NemID – historisk kontekst */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Fra NemID til MitID – hvad ændrede sig for casinospillere?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Overgangen fra NemID til MitID i 2022-2023 var den største ændring i dansk digital identitet i over et årti. For casinospillere medførte skiftet en række konkrete forbedringer der har gjort kontooprettelse og verifikation hurtigere, sikrere og mere brugervenlig.
          </p>

          <div className="rounded-lg border border-border overflow-hidden mb-6">
            <div className="grid grid-cols-3 gap-0 bg-muted/50 p-3 text-sm font-semibold">
              <span>Funktion</span>
              <span className="text-center">NemID (udgået)</span>
              <span className="text-center">MitID (nuværende)</span>
            </div>
            {[
              ["Autentificering", "Nøglekort/nøglefil", "Biometri (finger/ansigt)"],
              ["Godkendelsestid", "10-15 sekunder", "2-5 sekunder"],
              ["Fysisk enhed", "Krævet (kort/dongle)", "Kun smartphone"],
              ["Sikkerhedsniveau", "Godt", "Fremragende (eIDAS)"],
              ["Samtidige enheder", "1 enhed", "Flere enheder"],
              ["App-design", "Funktionelt", "Intuitivt og moderne"],
              ["Svindelbeskyttelse", "Standard", "Avanceret (anomalidetektion)"],
            ].map(([funktion, nemid, mitid]) => (
              <div key={funktion} className="grid grid-cols-3 gap-0 border-t border-border p-3 text-sm">
                <span className="text-muted-foreground">{funktion}</span>
                <span className="text-center">{nemid}</span>
                <span className="text-center">{mitid}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Den mest mærkbare forbedring for casinospillere er hastigheden. Med NemID skulle du finde dit nøglekort, indtaste et engangskodeord og vente på verifikation – en proces der typisk tog 30-60 sekunder. Med MitID trykker du på en push-notifikation, bekræfter med fingeraftryk, og er verificeret inden for 5 sekunder. Over tid akkumulerer den tidsbesparelse sig, særligt for spillere der logger ind dagligt.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Fejlfinding */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">MitID fejlfinding – løsninger på de mest almindelige problemer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selvom MitID generelt er stabilt og pålideligt, kan der opstå tekniske problemer. Her er en guide til de mest almindelige problemer og deres løsninger, baseret på MitID-supports egne anbefalinger:
          </p>

          <div className="space-y-4">
            {[
              {
                problem: "MitID-appen reagerer ikke",
                loesning: "1) Tving luk appen og åbn den igen, 2) Genstart din telefon, 3) Tjek at appen er opdateret til nyeste version, 4) Sørg for stabil internetforbindelse (WiFi eller mobildata). Hvis problemet fortsætter, afinstallér og geninstallér appen – du mister ikke din MitID.",
                severity: "Almindelig",
              },
              {
                problem: "Push-notifikation modtages ikke",
                loesning: "1) Tjek at push-notifikationer er aktiveret for MitID i telefonens indstillinger, 2) Sørg for at telefonen ikke er i 'Forstyr ikke'-tilstand, 3) Tjek internetforbindelsen, 4) Vent 30 sekunder og prøv igen – der kan være forsinkelse. Du kan også åbne MitID-appen manuelt for at se ventende anmodninger.",
                severity: "Almindelig",
              },
              {
                problem: "Biometrisk godkendelse fejler",
                loesning: "1) Rengør fingeraftrykssensoren, 2) Sørg for godt lys ved ansigtsgenkendelse, 3) Brug pinkode som alternativ (du har 5 forsøg), 4) Hvis alt fejler, brug MitID-kodeviseren (chipkort) som backup-metode. Kontakt MitID-support på 72 68 86 00 hvis problemet er vedvarende.",
                severity: "Sjælden",
              },
              {
                problem: "Casino viser 'MitID-verifikation fejlede'",
                loesning: "1) Vent 2 minutter og prøv igen (midlertidig serverfejl), 2) Ryd browserens cache og cookies, 3) Prøv en anden browser eller inkognito-tilstand, 4) Kontakt casinoets kundeservice med fejlbeskeden. Hvis MitID fungerer andre steder (netbank etc.) er problemet sandsynligvis på casinoets side.",
                severity: "Sjælden",
              },
              {
                problem: "MitID er spærret",
                loesning: "MitID spærres efter 5 forkerte pinkode-forsøg. Du kan genaktivere via mitid.dk med dit nødkodeord, eller kontakte MitID-support på 72 68 86 00. Du kan også besøge et borgerservicecenter med gyldig ID for personlig hjælp. Genaktivering tager typisk 5-10 minutter.",
                severity: "Kritisk",
              },
            ].map((item) => (
              <div key={item.problem} className="rounded-lg border border-border p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{item.problem}</h3>
                  <Badge variant={item.severity === "Kritisk" ? "destructive" : item.severity === "Sjælden" ? "secondary" : "outline"} className="text-xs">
                    {item.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.loesning}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-border bg-muted/30 p-5">
            <div className="flex items-start gap-3">
              <MenuIcon iconName="phone" className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <p className="font-semibold mb-1">MitID-support kontaktinfo</p>
                <p className="text-sm text-muted-foreground">
                  Telefon: <strong>72 68 86 00</strong> (hverdage 8-20, weekender 10-16). Online: <strong>mitid.dk/support</strong>. Borgerservice: Personlig hjælp med gyldig ID. Casinoets kundeservice kan ikke hjælpe med MitID-problemer direkte, da MitID er et eksternt system administreret af Digitaliseringsstyrelsen.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* MitID og ansvarligt spil */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">MitID som værktøj for ansvarligt spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MitID spiller en central rolle i Danmarks system for <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>. Udover identitetskontrol og aldersverifikation muliggør MitID en række beskyttelsesmekanismer der gør det danske gambling-marked til et af verdens sikreste for spillere:
          </p>

          <div className="space-y-3">
            {[
              { iconName: "shield", title: "ROFUS-integration", desc: "MitID er koblet direkte til ROFUS-registret. Selvudelukkede spillere blokeres automatisk og øjeblikkeligt ved ethvert loginforsøg eller kontooprettelse hos alle danske licenserede casinoer. Det er teknisk umuligt at omgå inden for det danske system." },
              { iconName: "timer", title: "Realtids-kontrol ved login", desc: "I modsætning til mange internationale systemer der kun kontrollerer ved registrering, kontrollerer danske casinoer din ROFUS-status ved hvert eneste login. Det betyder at en ROFUS-registrering der oprettes midt i en session, træder i kraft ved næste login." },
              { iconName: "users", title: "Mindreårige forhindres", desc: "MitID's kobling til CPR-registret giver en vandtæt aldersverifikation. Det er teknisk umuligt for en person under 18 at oprette en konto hos et dansk licenseret casino – i modsætning til internationale casinoer der kun kræver selvdeklaret alder." },
              { iconName: "eye", title: "Sporing og analyse", desc: "MitID-verifikation sikrer at casinoet kan spore individuelle spillemønstre nøjagtigt. Det gør det muligt at identificere tidlige tegn på problematisk spilleadfærd og gribe ind proaktivt – f.eks. ved at foreslå spillegrænser eller midlertidig pause." },
              { iconName: "heart", title: "Spillegrænser bundet til identitet", desc: "Fordi MitID sikrer entydig identifikation, kan indbetalingsgrænser og tabsgrænser håndhæves effektivt. En spiller der har sat en grænse på ét casino, kan ikke omgå den ved at oprette en konto under et andet navn – CPR-nummeret sikrer konsistens." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Internationale sammenligninger */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Danmark vs. verden: Hvordan sammenligner MitID-verifikation?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danmarks brug af MitID til casino-verifikation er unik i international sammenhæng og betragtes som best practice inden for gambling-regulering. Her sammenligner vi det danske system med andre landes tilgange:
          </p>

          <div className="space-y-4">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MenuIcon iconName="globe" className="h-5 w-5 text-primary" />
                  Sverige (BankID)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sveriges system ligner det danske mest. Svenske casinoer bruger BankID til identitetskontrol og er tilsluttet Spelpaus (Sveriges ROFUS-equivalent). BankID fungerer teknisk lignende MitID med app-baseret biometrisk autentificering. Den svenske model er ofte sammenlignet med den danske, men Danmark har en stærkere integration med CPR-registret, hvilket giver en mere robust aldersverifikation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MenuIcon iconName="globe" className="h-5 w-5 text-muted-foreground" />
                  Storbritannien (GamStop + manuel KYC)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  UK bruger GamStop til selvudelukkelse men har ingen central digital identitetsløsning tilsvarende MitID. Casinoer udfører KYC manuelt via ID-dokumenter og adressebevis, hvilket tager 24-72 timer. Det er langsommere, lettere at omgå (falske ID'er) og giver en dårligere brugeroplevelse sammenlignet med det danske system. UK Gambling Commission arbejder på at digitalisere verifikationen, men er flere år bag Danmark.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MenuIcon iconName="globe" className="h-5 w-5 text-muted-foreground" />
                  Malta (manuel KYC)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  MGA-licenserede casinoer udfører KYC via upload af ID-dokumenter (pas/kørekort) og adressebevis (forsyningsregning). Processen tager typisk 24-48 timer og kræver manuel verifikation af casino-personale. Det er markant langsommere og mindre sikkert end MitID. Malta har intet centralt selvudelukkelsesprogram, hvilket gør spillerbeskyttelsen svagere end i Danmark og Sverige.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            Samlet set er Danmark – sammen med Sverige – førende i verden inden for digital identitetsverifikation på gambling-markedet. MitID's integration med CPR-registret, automatisk ROFUS-kontrol og biometrisk to-faktor-autentificering sætter en standard som andre jurisdiktioner stræber mod at opnå. Det er en af grundene til at vi hos Casinoaftaler udelukkende anbefaler danske licenserede casinoer.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Konklusion */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Konklusion: MitID er din garanti for et sikkert casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MitID er langt mere end en teknisk formalitet – det er din garanti for at du spiller på et reguleret, sikkert og ansvarligt casino. Systemet beskytter dig mod identitetstyveri, sikrer at mindreårige ikke kan spille, og håndhæver ROFUS-udelukkelse automatisk. Alt sammen uden at det koster dig mere end 30 sekunders tid ved kontooprettelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casinoer der ikke kræver MitID-verifikation har ikke dansk licens og tilbyder fundamentalt svagere spillerbeskyttelse – læs mere om <Link to="/casino-uden-rofus" className={linkClass}>risiciene ved casino uden ROFUS</Link>. Gevinster beskattes, der er ingen klageinstans, og din dataprivatliv er ikke garanteret. Det er ikke en risiko der er værd at tage, når Danmark har over 30 licenserede casinoer der tilbyder fremragende bonusser, spiludvalg og brugeroplevelser – alt med fuld MitID-sikkerhed.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Brug vores <Link to="/casino-anmeldelser" className={linkClass}>casinoanmeldelser</Link> til at finde det danske casino der passer bedst til dig. Vil du prøve spil risikofrit først? Se vores guide til <Link to="/gratis-casino-spil" className={linkClass}>gratis casino spil</Link> med demotilstand. Og når du er klar til rigtige penge, sørg for at vælge et casino med <Link to="/hurtig-udbetaling" className={linkClass}>hurtige udbetalinger</Link> – alle med MitID-verifikation og ROFUS-tilslutning.
          </p>
        </section>

        <InlineCasinoCards title="Casinoer med hurtig MitID-kontooprettelse" />

        <LatestNewsByCategory pagePath="/casino-med-mitid" />
        <ReviewMoneyLinks />
        <RelatedGuides currentPath="/casino-med-mitid" />
        <FAQSection title="Ofte stillede spørgsmål om casino med MitID" faqs={faqs} />
        <AuthorBio author="ajse" />
      </ContentPageLayout>
      <StickyCtaBySlug slug="leovegas" />
    </>
  );
};

export default CasinoMedMitID;

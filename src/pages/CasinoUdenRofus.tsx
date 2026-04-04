import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
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
import { Ban, Dog, DollarSign, FileWarning, Fingerprint, Gavel } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";
import { ReviewMoneyLinks } from "@/components/ReviewMoneyLinks";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import type { ReactNode } from "react";
import rofusMobil from "@/assets/screenshots/rofus-mobil-registrering-mitid.webp";
import rofusForside from "@/assets/screenshots/rofus-forside-login-mitid.webp";
import rofusKontakt from "@/assets/screenshots/rofus-kontakt-telefon.webp";
import spillemyndighedenBlokering from "@/assets/screenshots/spillemyndigheden-blokering-ulovlige-sider.webp";
import rofusRegistrering from "@/assets/screenshots/rofus-registrering-udelukkelsesperiode.webp";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er ROFUS, og hvad betyder det for online casino?",
    answer: (
      <>
        <Link to="/ansvarligt-spil/rofus" className={linkClass}>ROFUS</Link> (Register Over Frivilligt Udelukkede Spillere) er det danske register, hvor spillere kan udelukke sig selv fra alle casinoer med <Link to="/casino-med-dansk-licens" className={linkClass}>dansk licens</Link>. Registrering i ROFUS blokerer adgang til alle danske online casinoer i den valgte periode (1 måned, 3 måneder, 6 måneder eller permanent). Det er et værktøj til <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> administreret af Spillemyndigheden og kobles automatisk til <Link to="/casino-med-mitid" className={linkClass}>MitID</Link>-verifikation ved kontooprettelse.
      </>
    ),
  },
  {
    question: "Er det lovligt at spille på casino uden ROFUS i Danmark?",
    answer: "Teknisk set er det ikke ulovligt for spilleren at spille hos udenlandske casinoer uden ROFUS. Dog er det ulovligt for casinoer uden dansk licens at markedsføre sig mod danske spillere. Spillemyndigheden kan blokere adgangen til sådanne sider via danske internetudbydere (DNS-blokering). Gevinster fra ulicenserede casinoer er desuden skattepligtige som personlig indkomst (op til 52%), modsat skattefrie gevinster fra danske licenserede casinoer. Spillemyndigheden har siden 2020 blokeret over 120 udenlandske gambling-sider.",
  },
  {
    question: "Hvilke risici er der ved at spille casino uden ROFUS?",
    answer: (
      <>
        De primære risici inkluderer: ingen <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighed</Link>-beskyttelse, beskatning af gevinster (op til 52%), ingen klageinstans ved tvister, risiko for svindel, manglende ROFUS-beskyttelse for sårbare spillere, potentielt blokerede sider og ingen garanti for udbetalinger. Derudover har ulicenserede casinoer typisk omsætningskrav på 30-50x (mod max 10x hos danske), ingen bankgaranti for spillermidler, og svagere KYC-procedurer der øger risikoen for identitetstyveri. Vi anbefaler kun at spille hos casinoer med <Link to="/casino-med-dansk-licens" className={linkClass}>gyldig dansk licens</Link>.
      </>
    ),
  },
  {
    question: "Hvorfor søger folk efter casino uden ROFUS?",
    answer: (
      <>
        Der er primært tre årsager: 1) Spillere der har udelukket sig via ROFUS men ønsker at spille videre (et tegn på problematisk spilleadfærd der kræver professionel hjælp), 2) Spillere der tror de kan finde bedre bonusser uden den danske 10x omsætningsgrænse (men glemmer skattekonsekvenserne der ofte udligner forskellen), 3) Spillere der søger spil eller udbydere der ikke tilbydes i Danmark. Hvis du har udelukket dig via ROFUS, anbefaler vi at kontakte <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> på 70 22 28 25 for gratis, anonym rådgivning.
      </>
    ),
  },
  {
    question: "Kan jeg omgå ROFUS og spille alligevel?",
    answer: (
      <>
        Ja, teknisk set kan man spille hos udenlandske operatører uden dansk licens, da ROFUS kun gælder for danske licenserede casinoer. Men ROFUS eksisterer for at beskytte dig. Hvis du har registreret dig i ROFUS, er det fordi du på et tidspunkt vurderede, at du havde brug for en pause fra gambling. At aktivt søge veje udenom er et tydeligt faresignal for <Link to="/ansvarligt-spil/ludomani" className={linkClass}>ludomani</Link> og problemspil. Ring til <Link to="/ansvarligt-spil/hjaelpelinjer" className={linkClass}>hjælpelinjen</Link> på 70 22 28 25 – det er gratis, anonymt og tilgængeligt 24/7.
      </>
    ),
  },
  {
    question: "Hvad er alternativerne til casino uden ROFUS?",
    answer: (
      <>
        I stedet for at søge ulicenserede alternativer anbefaler vi: 1) Kontakt <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> for professionel rådgivning, 2) Brug <Link to="/ansvarligt-spil/spillegraenser" className={linkClass}>spillegrænser</Link> på licenserede casinoer, 3) Overvej om din ROFUS-registrering var berettiget, 4) Vent til din udelukkelsesperiode udløber og vend tilbage med et budget og klare grænser. Du kan også bruge ventetiden på at læse om <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> og opbygge sunde spillevaner.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på ROFUS og GameStop (UK)?",
    answer: "ROFUS er det danske system for selvudelukkelse, mens GameStop (tidligere GamStop) er det tilsvarende britiske register. Begge systemer blokerer spillere fra licenserede casinoer i den pågældende jurisdiktion. Den primære forskel er at ROFUS er integreret med MitID og CPR-registret, hvilket giver en stærkere identitetsverifikation. GameStop bruger navn, fødselsdato og adresse, hvilket er lettere at omgå. Ingen af systemerne dækker casinoer uden lokal licens.",
  },
  {
    question: "Hvornår kan jeg afmelde ROFUS igen?",
    answer: "Det afhænger af din udelukkelsestype. Ved midlertidig udelukkelse (1, 3 eller 6 måneder) ophæves udelukkelsen automatisk efter periodens udløb. Ved permanent udelukkelse (\"ubestemt tid\") skal du aktivt kontakte ROFUS via rofus.nu og anmode om ophævelse. Der er en obligatorisk 24-timers betænkningsperiode efter anmodning, og du skal godkende ophævelsen via MitID. Det er designet til at forhindre impulsive beslutninger.",
  },
  {
    question: "Betaler man skat af gevinster fra casino uden ROFUS?",
    answer: (
      <>
        Ja. Gevinster fra casinoer uden dansk licens beskattes som personlig indkomst. Afhængigt af din samlede indkomst kan skattesatsen være op til 52%. Til sammenligning er gevinster fra casinoer med <Link to="/casino-med-dansk-licens" className={linkClass}>dansk licens</Link> 100% skattefrie, fordi operatøren betaler 28% afgift af bruttospilleindtægten. Det er din pligt at selvangive gevinsterne – SKAT modtager ikke automatisk oplysninger fra udenlandske casinoer, men manglende selvangivelse kan medføre bøder og tillæg.
      </>
    ),
  },
  {
    question: "Hvor mange sider har Spillemyndigheden blokeret?",
    answer: "Spillemyndigheden vedligeholder en løbende opdateret blokeringsliste over udenlandske gambling-sider uden dansk licens. Siden 2020 har de blokeret over 120 domæner via DNS-blokering hos danske internetudbydere. Listen opdateres regelmæssigt, og nye sider tilføjes når de identificeres. Blokeringen kan teknisk omgås med VPN, men det anbefales kraftigt ikke, da det fjerner enhver form for spillerbeskyttelse.",
  },
];

const risici = [
  {
    iconName: "banknote",
    title: "Skattepligtige gevinster",
    description: "Gevinster fra casinoer uden dansk licens beskattes som personlig indkomst (op til 52%). Hos licenserede casinoer er dine gevinster 100% skattefrie – en forskel der hurtigt løber op i tusindvis af kroner.",
    tag: "Økonomisk",
  },
  {
    iconName: "shield",
    title: "Ingen spillerbeskyttelse",
    description: "Uden dansk licens er du ikke beskyttet af Spillemyndighedens regler om bankgaranti, bonusloft (max 10x omsætning), eller indbetalingsgrænser. Casinoet kan ændre vilkår uden varsel.",
    tag: "Juridisk",
  },
  {
    iconName: "x-circle",
    title: "Ingen klageinstans",
    description: "Hvis et ulicenseret casino nægter at udbetale dine gevinster, har du ingen klageinstans. Hos danske casinoer kan Spillemyndigheden gribe ind og beskytte dine interesser.",
    tag: "Retssikkerhed",
  },
  {
    iconName: "ban",
    title: "Blokerede sider",
    description: "Spillemyndigheden kan pålægge danske internetudbydere at blokere adgangen til ulicenserede gambling-sider. Du risikerer at miste adgang – og potentielt indeståender – uden varsel.",
    tag: "Teknisk",
  },
  {
    iconName: "fingerprint",
    title: "Svagere identitetskontrol",
    description: "Ulicenserede casinoer bruger ikke MitID og har svagere KYC-procedurer. Det øger risikoen for identitetstyveri, kontoovertag og at mindreårige kan oprette konti uhindret.",
    tag: "Sikkerhed",
  },
  {
    iconName: "globe",
    title: "Udenlandsk jurisdiktion",
    description: "Tvister afgøres efter udenlandsk lovgivning – typisk Curaçao eller Malta. Som dansk forbruger har du ingen rettigheder, og det er praktisk umuligt at føre en retssag mod en udenlandsk operatør.",
    tag: "Juridisk",
  },
];

const CasinoUdenRofus = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Casino uden ROFUS – Risici, Lovgivning og Anbefalinger 2026",
    description: "Alt om casino uden ROFUS: juridiske risici, skattekonsekvenser og hvorfor danske licenserede casinoer altid er det sikre valg. Objektiv analyse fra Casinoaftaler.",
    url: `${SITE_URL}/casino-uden-rofus`,
    datePublished: "2026-03-31",
  });

  return (
    <>
      <SEO
        title="Casino uden ROFUS – Risici og Hvorfor Du Bør Vælge Dansk Licens 2026 | Casinoaftaler"
        description="Casino uden ROFUS: Forstå risici ved ulicenserede casinoer – skat på gevinster, ingen spillerbeskyttelse og blokerede sider. Vi anbefaler kun dansk licens."
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
              <MenuIcon iconName="shield-check" className="mr-1.5 h-3.5 w-3.5" />
              Sikkerhed & regulering
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casino uden ROFUS
            </h1>
            <p className="text-lg text-white/80">
              Hvad er risikoen ved at spille hos casinoer uden ROFUS? Vi gennemgår lovgivning, skatteforhold og spillerbeskyttelse – og forklarer hvorfor dansk licens altid er det sikre valg.
            </p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="ajse" readTime="55 Min." />

        <SnippetAnswer answer="Casino uden ROFUS er ulicenserede casinoer der ikke er tilsluttet det danske selvudelukkelsesprogram. Gevinster beskattes op til 52%, du har ingen klageinstans, og Spillemyndigheden kan blokere adgangen. Vi anbefaler udelukkende casinoer med dansk licens." />

        <QuickComparisonTable count={3} title="Anbefalede casinoer med dansk licens" prioritySlugs={["spilleautomaten", "leovegas", "betinia"]} />

        {/* Intro */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Hvad er casino uden ROFUS?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            "Casino uden ROFUS" refererer til online casinoer der opererer uden <Link to="/casino-med-dansk-licens" className={linkClass}>dansk spillelicens</Link> og derfor ikke er tilsluttet <Link to="/ansvarligt-spil/rofus" className={linkClass}>ROFUS</Link> (Register Over Frivilligt Udelukkede Spillere). Disse casinoer er typisk licenseret i jurisdiktioner som Malta (MGA), Curaçao (GCB), Gibraltar eller Isle of Man og henvender sig til et internationalt marked. De opererer lovligt i deres hjemland men har ingen godkendelse fra den danske <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighed</Link>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Søger du efter casino uden ROFUS, er det vigtigt at forstå de juridiske, økonomiske og personlige risici det indebærer. ROFUS-systemet blev etableret i 2012 som en central del af den danske spillelovgivning og er designet til at beskytte sårbare spillere. Alle casinoer med dansk licens er forpligtede til at kontrollere nye kunders ROFUS-status ved kontooprettelse – et tjek der sker automatisk via <Link to="/casino-med-mitid" className={linkClass}>MitID</Link>-integration.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hos Casinoaftaler anbefaler vi <strong>udelukkende</strong> casinoer med gyldig <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighed</Link>-licens, da de tilbyder den bedste spillerbeskyttelse, skattefrihed på gevinster og retssikkerhed. Denne artikel er skrevet som en objektivinformationsressource – vi linker ikke til, promoverer ikke eller anbefaler ikke ulicenserede casinoer.
          </p>
          <div className="rounded-lg border-2 border-destructive/50 bg-destructive/5 p-5">
            <div className="flex items-start gap-3">
              <MenuIcon iconName="alert-triangle" className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
              <div>
                <p className="font-semibold text-destructive mb-1">Casinoaftaler fraråder spil hos ulicenserede casinoer</p>
                <p className="text-sm text-muted-foreground">
                  Denne artikel er informativ og advarer mod risiciene ved ulicenserede casinoer. Vi linker ikke til, anbefaler ikke og promoverer ikke casinoer uden dansk licens. Har du problemer med spil, kontakt <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> på 70 22 28 25 – gratis, anonymt og døgnåbent.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Hvad er ROFUS – dybdegående */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">ROFUS – det danske selvudelukkelsesregister</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/ansvarligt-spil/rofus" className={linkClass}>ROFUS</Link> (Register Over Frivilligt Udelukkede Spillere) blev lanceret den 1. januar 2012 som en del af den danske spillelov. Formålet er at give spillere med problematisk spilleadfærd et konkret værktøj til at begrænse deres adgang til online og landbaseret gambling i Danmark. Registrering sker frivilligt via rofus.nu og kræver <Link to="/casino-med-mitid" className={linkClass}>MitID</Link>-godkendelse for at sikre identiteten.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når du registrerer dig i ROFUS, vælger du en udelukkelsesperiode: 24 timer (midlertidig "cooling-off"), 1 måned, 3 måneder, 6 måneder eller permanent (ubestemt tid). I udelukkelsesperioden kontrollerer alle danske licenserede casinoer automatisk din status ved hvert loginforsøg og ved kontooprettelse. Er du registreret, blokeres du øjeblikkeligt. Det gælder online casinoer, spillehaller, væddemålsudbydere og online bingo med dansk licens.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            ROFUS administreres af <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> under Skatteministeriet og er en central søjle i dansk spillerregulering. Systemet håndterer over 50.000 aktive registreringer og har siden 2012 forhindret millioner af loginforsøg fra selvudelukkede spillere. Det er internationalt anerkendt som et af de mest effektive selvudelukkelsessystemer i verden – netop fordi det er koblet til CPR-registret via MitID.
          </p>

          <div className="grid gap-3 sm:grid-cols-2 mt-6">
            {[
              { period: "24 timer", desc: "Midlertidig cooling-off periode. Ideel hvis du har brug for en kort pause efter en tabsrække.", type: "Midlertidig" },
              { period: "1 måned", desc: "Kortere udelukkelse. Giver tid til eftertanke uden at det føles permanent. Ophæves automatisk.", type: "Midlertidig" },
              { period: "3 måneder", desc: "Mellemlang udelukkelse. Anbefales ved tidlige tegn på problematisk spilleadfærd.", type: "Midlertidig" },
              { period: "6 måneder", desc: "Længere udelukkelse. Giver reel tid til at opbygge nye vaner og bryde spillemønstre.", type: "Midlertidig" },
              { period: "Permanent", desc: "Ubestemt udelukkelse. Kræver aktiv anmodning og 24-timers betænkning for ophævelse.", type: "Permanent" },
            ].map((item) => (
              <div key={item.period} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{item.period}</span>
                  <Badge variant={item.type === "Permanent" ? "destructive" : "outline"} className="text-xs">{item.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* 6 Risici */}
        <section className="mb-10">
          <h2 className="mb-6 text-3xl font-bold">6 kritiske risici ved casino uden ROFUS</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            At spille hos casinoer uden ROFUS-tilslutning indebærer en række konkrete risici, som du bør forstå fuldt ud, inden du overvejer at oprette en konto. Herunder gennemgår vi de seks mest kritiske risikofaktorer baseret på dansk lovgivning, internationale erfaringer og dokumenterede cases.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {risici.map((risk) => (
              <Card key={risk.title} className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <MenuIcon iconName={risk.iconName} className="h-6 w-6 text-destructive" />
                    <Badge variant="outline" className="text-xs">{risk.tag}</Badge>
                  </div>
                  <CardTitle className="text-lg">{risk.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{risk.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Skattemæssig dybdegående */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Skattekonsekvenser ved casino uden dansk licens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En af de mest oversete konsekvenser ved at spille hos ulicenserede casinoer er beskatningen af gevinster. Danske skattelovgivning sondrer klart mellem gevinster fra licenserede og ulicenserede operatører, og forskellen er betydelig. Ifølge den danske spilleafgiftslov er alle gevinster fra casinoer med dansk licens skattefrie for spilleren, fordi operatøren betaler 28% afgift af bruttospilleindtægten direkte til den danske stat.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Gevinster fra udenlandske, ulicenserede casinoer er derimod skattepligtig indkomst. De skal selvangives som "anden personlig indkomst" og beskattes med din marginale skattesats – typisk mellem 37% og 52% afhængigt af din samlede indkomst. Det betyder, at en gevinst på 10.000 kr. hos et ulicenseret casino reelt kun er 4.800-6.300 kr. værd efter skat, mens den samme gevinst hos et dansk casino er 10.000 kr. skattefrit i lommen.
          </p>

          <div className="rounded-lg border border-border overflow-hidden mt-6">
            <div className="grid grid-cols-3 gap-0 bg-muted/50 p-3 text-sm font-semibold">
              <span>Gevinst</span>
              <span className="text-center">Dansk licens (skattefri)</span>
              <span className="text-center">Uden licens (52% skat)</span>
            </div>
            {[
              ["1.000 kr.", "1.000 kr.", "480 kr."],
              ["5.000 kr.", "5.000 kr.", "2.400 kr."],
              ["10.000 kr.", "10.000 kr.", "4.800 kr."],
              ["25.000 kr.", "25.000 kr.", "12.000 kr."],
              ["50.000 kr.", "50.000 kr.", "24.000 kr."],
              ["100.000 kr.", "100.000 kr.", "48.000 kr."],
            ].map(([gevinst, dansk, uden]) => (
              <div key={gevinst} className="grid grid-cols-3 gap-0 border-t border-border p-3 text-sm">
                <span className="text-muted-foreground font-medium">{gevinst}</span>
                <span className="text-center text-green-600 dark:text-green-400 font-semibold">{dansk}</span>
                <span className="text-center text-destructive font-semibold">{uden}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            <strong>Vigtigt:</strong> Manglende selvangivelse af gevinster fra ulicenserede casinoer kan medføre skattetillæg, bøder og i grove tilfælde strafforfølgning. SKAT modtager ikke automatisk indberetninger fra udenlandske operatører, men ved revision kan kontoudtog afsløre uberettigede indsættelser. Det er altid din pligt som skatteyder at selvangive alle indtægter – uanset kilden.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Dansk licens vs. ulicenseret – udvidet tabel */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Dansk licens vs. casino uden ROFUS – komplet sammenligning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Forskellen mellem et dansk licenseret casino og et ulicenseret casino uden ROFUS er fundamental. Det handler ikke kun om bonusvilkår eller spiludvalg – det handler om din retssikkerhed, dine penge og din beskyttelse som forbruger. Herunder en komplet sammenligning af de vigtigste forskelle:
          </p>
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-3 gap-0 bg-muted/50 p-3 text-sm font-semibold">
              <span>Egenskab</span>
              <span className="text-center">Dansk licens ✅</span>
              <span className="text-center">Uden ROFUS ❌</span>
            </div>
            {[
              ["Gevinster skattefrie", "✅ Ja, altid", "❌ Op til 52% skat"],
              ["Spillerbeskyttelse", "✅ Spillemyndigheden", "❌ Ingen dansk"],
              ["Maks. bonusomsætning", "✅ 10x (lovkrav)", "❌ Ofte 30-50x"],
              ["ROFUS selvudelukkelse", "✅ Tilsluttet", "❌ Ikke tilsluttet"],
              ["Klageinstans", "✅ Spillemyndigheden", "❌ Ingen i DK"],
              ["Bankgaranti", "✅ Lovkrav", "❌ Ingen garanti"],
              ["Blokering af side", "❌ Nej, lovlig", "✅ Risiko for DNS-blok"],
              ["MitID-verifikation", "✅ Sikker 2FA", "❌ Svagere KYC"],
              ["Indbetalingsgrænser", "✅ Obligatorisk", "❌ Valgfrit"],
              ["Udbetalingsgaranti", "✅ Bankgaranti", "❌ Ingen"],
              ["Ansvarlighed-værktøjer", "✅ Lovkrav", "❌ Varierer"],
              ["Dansk kundeservice", "✅ Typisk ja", "❌ Sjældent"],
            ].map(([label, dansk, uden]) => (
              <div key={label} className="grid grid-cols-3 gap-0 border-t border-border p-3 text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="text-center">{dansk}</span>
                <span className="text-center">{uden}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Sammenligning baseret på krav i den danske spillelov (L 848) og <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighedens</Link> regulering pr. 2026. Ulicenserede casinoers vilkår varierer, men ingen tilbyder samme beskyttelsesniveau som dansk regulering.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Bonusvilkår – myten om bedre bonusser */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Myten om "bedre bonusser" hos casino uden ROFUS</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et af de hyppigste argumenter for at spille hos ulicenserede casinoer er muligheden for "bedre bonusser". Og ja – på papiret ser bonusserne ofte mere attraktive ud. Udenlandske casinoer tilbyder typisk velkomstbonusser op til 200-500% match med omsætningskrav på 30-50x, mens danske casinoer er begrænset til max 10x omsætning. Men denne sammenligning er vildledende af flere årsager:
          </p>

          <div className="space-y-4">
            <div className="rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MenuIcon iconName="circle-dollar-sign" className="h-5 w-5 text-primary" />
                Omsætningskravets reelle effekt
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                En bonus på 1.000 kr. med 10x omsætning kræver 10.000 kr. i væddemål. En tilsvarende bonus med 40x omsætning kræver 40.000 kr. Med en gennemsnitlig RTP på 96% taber du statistisk set 4% pr. gennemspillet krone. På 10.000 kr. i omsætning er dit statistiske tab 400 kr. På 40.000 kr. er tabet 1.600 kr. Den "større" bonus udligner altså ikke det højere omsætningskrav – du taber mere undervejs.
              </p>
            </div>

            <div className="rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Skatteeffekten eliminerer fordelen
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Selv hvis du gennemfører omsætningskravet og vinder, beskattes gevinsten med op til 52% hos ulicenserede casinoer. En gevinst på 5.000 kr. efter en bonusrunde bliver til ca. 2.400 kr. efter skat. Hos et dansk casino er de samme 5.000 kr. skattefrie. Når du kombinerer højere omsætningskrav med beskatning, er den reelle værdi af udenlandske bonusser næsten altid lavere end danske.
              </p>
            </div>

            <div className="rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <FileWarning className="h-5 w-5 text-primary" />
                Skjulte bonusbetingelser
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ulicenserede casinoer har ofte komplekse bonusvilkår med maks. indsatsgrænser under omsætning (typisk 50 kr. pr. spin), spilvægtning der ekskluderer bordspil, og tidsfrister på 7-14 dage. Danske casinoer er underlagt Spillemyndighedens transparenskrav, der sikrer at alle bonusvilkår er klart kommunikeret og rimelige. Det er ikke ualmindeligt at udenlandske operatører annullerer bonusser og tilhørende gevinster på baggrund af obskure vilkår.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Spillemyndighedens blokering */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Spillemyndighedens blokeringsindsats</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> har siden spillelovens ikrafttrædelse i 2012 aktivt bekæmpet ulicenserede gambling-operatører der henvender sig til danske spillere. Den primære metode er DNS-blokering, hvor danske internetudbydere (TDC, Telenor, Telia m.fl.) pålægges at blokere adgangen til specifikke domæner. Processen fungerer således:
          </p>

          <div className="space-y-3">
            {[
              { step: "1", title: "Identifikation", desc: "Spillemyndigheden identificerer udenlandske gambling-sider der markedsfører sig mod danske spillere – via dansk sprog, DKK-valuta, danske betalingsmetoder eller målrettet reklame." },
              { step: "2", title: "Varsling", desc: "Operatøren kontaktes og informeres om at de overtræder dansk lovgivning. De gives typisk 14 dage til at ophøre med aktiviteten mod det danske marked." },
              { step: "3", title: "Retskendelse", desc: "Hvis operatøren ikke reagerer, anmoder Spillemyndigheden om en retskendelse der pålægger danske ISP'er at blokere domænet." },
              { step: "4", title: "DNS-blokering", desc: "Domænet tilføjes den nationale blokeringsliste. Alle danske internetudbydere er forpligtede til at implementere blokeringen inden for en fastsat frist." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 rounded-lg border border-border p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            Siden 2020 har Spillemyndigheden blokeret over 120 domæner. Blokeringslisten opdateres løbende, og nye sider tilføjes typisk kvartalsvist. Det er værd at bemærke, at DNS-blokering kan omgås teknisk med VPN-tjenester, men dette anbefales kraftigt ikke – dels fordi det fjerner enhver form for spillerbeskyttelse, dels fordi det kan komplicere eventuelle udbetalingstvister yderligere.
          </p>
        </section>

        <Separator className="my-8" />

        {/* ROFUS og psykologien bag */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Psykologien bag søgningen "casino uden ROFUS"</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Søgningen efter "casino uden ROFUS" er i sig selv et vigtigt faresignal, som vi ønsker at adressere ærligt og direkte. Forskning i spilleadfærd fra Vidensråd for Forebyggelse og Center for Ludomani viser, at ønsket om at omgå selvudelukkelse er et af de mest pålidelige indikatorer for problematisk spilleadfærd – også kaldet "chasing"-adfærd.
          </p>

          <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-5 mb-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MenuIcon iconName="book-open" className="h-5 w-5 text-primary" />
              Tre typiske profiler der søger "casino uden ROFUS"
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-sm">Profil 1: Den selvudelukkede spiller</p>
                <p className="text-sm text-muted-foreground">Har registreret sig i ROFUS men fortryder og søger alternative muligheder. Dette er den mest bekymrende profil – personen har allerede erkendt et problem men forsøger nu at omgå sin egen beslutning. Det er klassisk "chasing"-adfærd der kræver professionel hjælp, ikke adgang til flere casinoer.</p>
              </div>
              <div>
                <p className="font-medium text-sm">Profil 2: Bonusjægeren</p>
                <p className="text-sm text-muted-foreground">Søger ulicenserede casinoer i troen på bedre bonusvilkår uden det danske 10x-omsætningsloft. Som dokumenteret ovenfor er denne antagelse fejlagtig, når skattekonsekvenser og reelle omsætningskrav medregnes. Disse spillere bør i stedet fokusere på at maksimere værdien af danske bonusser eller prøve <Link to="/gratis-casino-spil" className={linkClass}>gratis casino spil</Link> for at finde det rette spil uden risiko.</p>
              </div>
              <div>
                <p className="font-medium text-sm">Profil 3: Spil-entusiasten</p>
                <p className="text-sm text-muted-foreground">Ønsker adgang til spil eller udbydere der ikke er tilgængelige hos danske operatører. Danske casinoer tilbyder dog et bredt udvalg – tjek vores <Link to="/gratis-casino-spil" className={linkClass}>gratis demospil</Link> for at teste udvalget. Vær også opmærksom på at ulicenserede casinoer ikke tilbyder <Link to="/hurtig-udbetaling" className={linkClass}>hurtige udbetalinger</Link> med dansk bankgaranti.</p>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Uanset hvilken profil du identificerer dig med, er det vigtigt at forstå at ROFUS og den danske regulering eksisterer for at beskytte dig – ikke for at begrænse din frihed. De casinoer der aktivt markedsfører sig som "uden ROFUS" henvender sig bevidst til sårbare spillere, og det bør i sig selv være et advarselssignal om deres forretningsmodel og etiske standarder.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Lovgivning og regulering */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Dansk spillelovgivning og international regulering</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den danske spillelov (Lov om spil, L 848) trådte i kraft den 1. januar 2012 og liberaliserede det danske gambling-marked. Loven etablerede et licenssystem administreret af <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> under Skatteministeriet. For at opnå dansk licens skal operatører opfylde en række krav der sikrer spillerbeskyttelse, forebygger hvidvask og garanterer fair spil.
          </p>

          <div className="space-y-3">
            {[
              { iconName: "gavel", title: "Licenskrav", desc: "Operatører skal dokumentere økonomisk stabilitet, have en bankgaranti på minimum 5 mio. DKK, implementere ansvarligt spil-værktøjer og tilslutte sig ROFUS. Licensen koster en årlig afgift og kræver løbende rapportering til Spillemyndigheden." },
              { iconName: "scale", title: "Bonusregulering", desc: "Danske bonusser er begrænset til max 10x omsætningskrav (effektivt en af de laveste i verden). Bonusvilkår skal være klart kommunikeret, og casinoer må ikke tilbyde bonusser der tilskynder til overdrevent spil. Der må desuden ikke tilbydes velkomstbonusser til spillere under 21 år (skærpet krav fra 2025)." },
              { iconName: "eye", title: "Overvågning og håndhævelse", desc: "Spillemyndigheden overvåger aktivt markedet for ulicenserede operatører, gennemfører uanmeldte audits af licenserede casinoer, og kan udstede bøder, tilbagekalde licenser og blokere domæner. I 2025 blev der udstedt bøder for over 12 mio. DKK for overtrædelser." },
              { iconName: "landmark", title: "EU-ramme", desc: "Danmark opererer inden for EU's ramme for online gambling-regulering, men spillelovgivning er primært et nationalt anliggende. EU-domstolen har gentagne gange bekræftet medlemsstaternes ret til at regulere gambling-markedet af hensyn til folkesundhed og offentlig orden." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <MenuIcon iconName={item.iconName} className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Internationale licenser – Curaçao, Malta, Gibraltar */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Internationale licenser: Curaçao, Malta og Gibraltar</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casinoer uden ROFUS opererer typisk under en international licens. Det er vigtigt at forstå at disse licenser varierer dramatisk i kvalitet og spillerbeskyttelse. Herunder en gennemgang af de mest almindelige jurisdiktioner:
          </p>

          <div className="space-y-4">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MenuIcon iconName="globe" className="h-5 w-5 text-primary" />
                  Malta Gaming Authority (MGA)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  MGA er den mest respekterede internationale gambling-licens og regulerer over 500 operatører globalt. MGA-licenserede casinoer skal overholde strenge krav til spillerbeskyttelse, anti-hvidvask og fair spil. Dog giver en MGA-licens <strong>ingen rettigheder</strong> i Danmark – operatøren skal stadig have dansk licens for at lovligt operere mod danske spillere. Flere danske licenserede casinoer har også en MGA-licens for deres internationale operationer.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MenuIcon iconName="globe" className="h-5 w-5 text-destructive" />
                  Curaçao Gaming Control Board (GCB)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Curaçao-licensen har historisk set haft den laveste standard for spillerbeskyttelse. Licensgebyret er minimalt, tilsynet er begrænset, og klageprocessen er praktisk talt ikke-eksisterende for spillere. I 2024 implementerede Curaçao en ny reguleringsramme med strengere krav, men implementeringen er stadig i sin vorden. Casinoer med Curaçao-licens udgør størstedelen af de operatører der markedsfører sig som "casino uden ROFUS" mod danske spillere.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MenuIcon iconName="globe" className="h-5 w-5 text-muted-foreground" />
                  Gibraltar Gambling Commissioner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Gibraltar har en solid reguleringsramme men licenserer primært store, etablerede operatører som bet365 og 888. Gibraltar-licenserede operatører der ønsker at operere i Danmark skal stadig ansøge om dansk licens. Jurisdiktionen er generelt velanset men tilbyder ikke dansk spillerbeskyttelse, ROFUS-tilslutning eller skattefrihed på gevinster for danske spillere.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Ansvarligt spil og hjælp */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Hjælp og ressourcer til ansvarligt spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvis du har søgt efter "casino uden ROFUS" fordi du har udelukket dig selv og ønsker at spille videre, er det vigtigt at stoppe op og reflektere. Din ROFUS-registrering var en beslutning du tog for at beskytte dig selv – og det var en modig og klog beslutning. At søge veje udenom er et faresignal der fortjener opmærksomhed, ikke handling.
          </p>

          <div className="space-y-3">
            {[
              { iconName: "phone", title: "StopSpillet – 70 22 28 25", desc: "Gratis og anonym rådgivningslinje drevet af Center for Ludomani. Tilgængelig alle hverdage 10-22, weekender 10-18. Professionelle rådgivere med erfaring i spilleproblemer hjælper dig med at finde vejen videre – uden fordømmelse." },
              { iconName: "heart", title: "ROFUS – Selvudelukkelse", desc: "Registrér dig eller tjek din status på rofus.nu. Hvis du endnu ikke er registreret men overvejer det, er det i sig selv et positivt tegn. ROFUS er et stærkt værktøj der fjerner fristelsen helt og giver dig rum til at genvinde kontrollen." },
              { iconName: "users", title: "Ludomanibehandling", desc: "Center for Ludomani tilbyder gratis behandlingsforløb i hele Danmark. Behandlingen er evidensbaseret (kognitiv adfærdsterapi) og tilgængelig både fysisk og online. Ventetiden er typisk 1-3 uger. Kontakt dem på 33 17 73 13 eller via ludomani.dk." },
              { iconName: "book-open", title: "Spillegrænser på danske casinoer", desc: "Alle danske licenserede casinoer tilbyder indbetalingsgrænser, tabsgrænser, sessionsgrænser og mulighed for midlertidig selvudelukkelse direkte i din konto. Brug disse værktøjer proaktivt – det er et tegn på styrke, ikke svaghed." },
              { iconName: "shield", title: "Pårørenderådgivning", desc: "Er du pårørende til en person med spilleproblemer? StopSpillet tilbyder også rådgivning til familie og venner. Det kan være lige så belastende at være pårørende som at have problemet selv. Ring 70 22 28 25 – hjælpen gælder også dig." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <MenuIcon iconName={item.iconName} className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Sådan vælger du et sikkert dansk casino */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Sådan vælger du et sikkert dansk casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I stedet for at søge efter casinoer uden ROFUS, bør du fokusere på at finde det bedste danske licenserede casino til dine behov. Her er de vigtigste faktorer du bør vurdere, baseret på vores erfaring med at anmelde og sammenligne danske casinoer:
          </p>

          <div className="space-y-3">
            {[
              { title: "Verificér licensen", desc: "Tjek altid at casinoet har en gyldig dansk licens på Spillemyndighedens hjemmeside. Licensnummeret skal være synligt i casinoets footer. Et gyldigt licensnummer har formatet '18-xxxxxxxx'. Vores anmeldelser verificerer altid licensstatus." },
              { title: "Sammenlign bonusvilkår", desc: "Se ikke kun på bonusbeløbet – fokusér på omsætningskravet (max 10x i Danmark), gyldighedsperioden og spilvægtning. En bonus på 500 kr. med 5x omsætning er bedre end 2.000 kr. med 10x. Læs vores detaljerede bonusanmeldelser for vejledning." },
              { title: "Vurdér udbetalingstider", desc: "Hurtige udbetalinger er et kvalitetstegn. De bedste danske casinoer udbetaler via Trustly inden for 1-2 timer. Tjek vores guide til hurtige udbetalinger for en komplet oversigt over gennemsnitlige udbetalingstider per casino." },
              { title: "Tjek spiludvalget", desc: "Sørg for at casinoet tilbyder de spil du foretrækker – slots, bordspil, live casino eller specialspil. Alle danske casinoer bruger certificerede spiludbydere, men udvalget varierer. Tjek om dine favoritspil er tilgængelige før du opretter en konto." },
              { title: "Læs anmeldelser", desc: "Læs uafhængige anmeldelser (som vores) og brugeranmeldelser. Vær opmærksom på kommentarer om udbetalingshastighed, kundeservice og bonusvilkår. Et casino med 4+ stjerner og hundredvis af anmeldelser er generelt et sikkert valg." },
              { title: "Test kundeservicen", desc: "Kontakt kundeservicen med et spørgsmål inden du opretter en konto. Danske casinoer skal tilbyde kundeservice på dansk, og svartiden bør være under 5 minutter på live chat. Kvaliteten af kundeservice afspejler casinoets overordnede professionalisme." },
            ].map((item, i) => (
              <div key={item.title} className="flex items-start gap-4 rounded-lg border border-border p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {i + 1}
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

        {/* Konklusion */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Konklusion: Dansk licens er altid det sikre valg</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Casino uden ROFUS er ikke en "frihed" – det er et fravalg af den beskyttelse der er designet til at holde dig sikker. Ulicenserede casinoer tilbyder hverken skattefrihed, klageinstans, bankgaranti eller ROFUS-beskyttelse. De bonusser der ser attraktive ud på overfladen, udvandes af højere omsætningskrav og beskatning. Og vigtigst af alt: de henvender sig bevidst til spillere der har udelukket sig selv – en praksis der er uetisk uanset jurisdiktion.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danmark har et af verdens bedst regulerede gambling-markeder med over 30 licenserede online casinoer der konkurrerer på bonusser, spiludvalg og brugeroplevelse. Du behøver ikke at gå uden for det danske system for at finde et fremragende casino – du behøver bare at vælge det rigtige.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hos Casinoaftaler anmelder og sammenligner vi alle danske licenserede casinoer med fokus på bonusværdi, udbetalingstider, spiludvalg og spillerbeskyttelse. Brug vores <Link to="/casino-anmeldelser" className={linkClass}>casinoanmeldelser</Link> og <Link to="/casino-bonus" className={linkClass}>bonusoversigt</Link> til at finde det casino der passer bedst til dig – sikkert, skattefrit og med fuld beskyttelse.
          </p>
        </section>

        <InlineCasinoCards title="Sikre danske casinoer med ROFUS-tilslutning" />

        <LatestNewsByCategory pagePath="/casino-uden-rofus" />
        <ReviewMoneyLinks />
        <RelatedGuides currentPath="/casino-uden-rofus" />
        <FAQSection title="Ofte stillede spørgsmål om casino uden ROFUS" faqs={faqs} />
        <AuthorBio author="ajse" />
      </ContentPageLayout>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

export default CasinoUdenRofus;

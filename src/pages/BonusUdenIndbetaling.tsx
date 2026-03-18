import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, buildVideoSchema, SITE_URL } from "@/lib/seo";
import bonusUdenIndbetalingHero from "@/assets/heroes/bonus-uden-indbetaling-hero.jpg";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Gift,
  Clock,
  Target,
  Gamepad2,
  DollarSign,
  Lock,
  TrendingUp,
  CreditCard,
  Scale,
  Ban,
  BarChart3,
  Percent,
  Coins,
  Users,
  Star,
  Zap,
  Calculator,
  BookOpen,
  Eye,
  Flame,
  Trophy,
  ArrowRight,
  Info,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";
import { BonusMoneyLinks } from "@/components/BonusMoneyLinks";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
import type { ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const bonusUdenIndbetalingFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er den matematiske forventningsværdi af en no deposit bonus på 50 kr.?",
    answer: (
      <>
        Med en typisk no deposit bonus på 50 kr. og 10x omsætningskrav skal du satse for 500 kr. Med en gennemsnitlig <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> på 96% taber du statistisk 20 kr. under omsætningen, hvilket efterlader dig med 30 kr. i forventet værdi – men det er før gevinstloftet. Med et loft på 500 kr. og variansen fra slots er den reelle EV typisk 15-25 kr. Til sammenligning har en <Link to="/indskudsbonus" className={linkClass}>indskudsbonus</Link> en højere nominel værdi, men kræver din egen indbetaling. No deposit bonussens EV er lavere, men risikoen er nul.
      </>
    ),
  },
  {
    question: "Kan man leve af no deposit bonusser?",
    answer: (
      <>
        Nej, det er hverken realistisk eller tilsigtet. Selv med optimal strategi – det vil sige at oprette konti hos alle danske casinoer med no deposit tilbud – vil den samlede forventede indtjening være 500-2.000 kr. totalt (engangsbonusser). No deposit bonusser er et markedsføringsværktøj, ikke en indtægtskilde. Du kan kun modtage én bonus per casino via MitID-verifikation. Se dem som en risikofri måde at teste <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> – ikke som en forretningsmodel.
      </>
    ),
  },
  {
    question: "Hvorfor er gevinstloftet den vigtigste faktor ved no deposit bonusser?",
    answer: (
      <>
        Gevinstloftet begrænser den maksimale udbetaling fra din bonus. Selv hvis du vinder 10.000 kr. med dine gratis spins, kan du typisk kun hæve 500-1.000 kr. Loftet reducerer bonussens EV markant: en bonus med 1.000 kr. gevinstloft er matematisk dobbelt så værdifuld som en med 500 kr. loft (alt andet lige). Kombiner altid loft-vurderingen med <Link to="/omsaetningskrav" className={linkClass}>omsætningskravene</Link> – et lavt loft med høj omsætning er det dårligste scenarie.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på no deposit bonuspenge og no deposit free spins?",
    answer: (
      <>
        No deposit bonuspenge (f.eks. 50 kr. gratis) giver fleksibilitet – du vælger selv spil og indsats inden for vilkårene. No deposit <Link to="/free-spins" className={linkClass}>free spins</Link> er fastlåst til én specifik automat med en fast spinværdi (typisk 1-2 kr.). Free spins har ofte lavere omsætningskrav (5-10x på gevinsten) end bonuspenge (10x på hele beløbet). Matematisk har bonuspenge højere EV på grund af fleksibiliteten, men free spins er enklere at forstå og bruge. Valget afhænger af din erfaring og spillestil.
      </>
    ),
  },
  {
    question: "Skal man afgive kortoplysninger for at modtage en bonus uden indbetaling?",
    answer: "Det varierer. Nogle danske casinoer kræver at du tilknytter en betalingsmetode under registreringen, selvom du ikke indbetaler. Andre kræver kun MitID-verifikation. Kravet om betalingsmetode er dels for aldersverifikation, dels for at forenkle fremtidige indbetalinger. Du bliver aldrig debiteret automatisk – en indbetaling kræver altid dit aktive samtykke. Brug Trustly eller MobilePay som bekræftelse, da disse metoder ikke gemmer kortoplysninger hos casinoet.",
  },
  {
    question: "Hvornår udløber en no deposit bonus typisk?",
    answer: (
      <>
        No deposit bonusser har typisk en kort gyldighedsperiode: 24 timer til 7 dage efter aktivering. Free spins-versioner har ofte endnu kortere frister – nogle skal bruges inden for 24 timer. <Link to="/omsaetningskrav" className={linkClass}>Omsætningskravene</Link> skal også opfyldes inden for denne periode. Sæt en påmindelse, så du ikke mister din bonus. Den korte frist er et bevidst designvalg: casinoet ønsker hurtig aktivitet og konvertering til indbetalende spiller.
      </>
    ),
  },
  {
    question: "Er no deposit bonusser bedre hos nye casinoer end hos etablerede?",
    answer: (
      <>
        Generelt ja. <Link to="/nye-casinoer" className={linkClass}>Nye casinoer</Link> bruger no deposit bonusser aggressivt som kundeakkviseringsværktøj, hvilket typisk giver bedre vilkår: lavere omsætningskrav (1-5x vs. 10x), højere gevinstlofter og flere free spins. Etablerede casinoer har sjældnere no deposit tilbud, da de allerede har en kundebase. Se vores guide til <Link to="/nye-casinoer/bonus-uden-indbetaling" className={linkClass}>nye casinoer med bonus uden indbetaling</Link> for de seneste tilbud.
      </>
    ),
  },
  {
    question: "Hvad siger Spillemyndigheden om no deposit bonusser?",
    answer: (
      <>
        Spillemyndigheden regulerer no deposit bonusser under de generelle bonusregler: max 10x omsætningskrav, klar markedsføring og gennemsigtige vilkår. Casinoet skal tydeligt angive alle betingelser før du accepterer. Vildledende markedsføring af "gratis" bonusser uden at nævne begrænsninger kan resultere i bøder. Danske no deposit bonusser er derfor mere gennemsigtige end udenlandske, men du skal stadig selv læse vilkårene grundigt.
      </>
    ),
  },
];

const BonusUdenIndbetaling = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(bonusUdenIndbetalingFaqs);

  const articleJsonLd = buildArticleSchema({
    headline: "Bonus uden Indbetaling – No Deposit Bonus Guide 2026",
    description: "Komplet teknisk guide til bonus uden indbetaling hos danske casinoer. EV-analyse, regneeksempler, strategier og juridisk perspektiv.",
    url: `${SITE_URL}/bonus-uden-indbetaling`,
    datePublished: "2025-06-01",
    videoId: "XhbLda1HyOs",
  });

  const videoJsonLd = buildVideoSchema(`${SITE_URL}/bonus-uden-indbetaling`, "XhbLda1HyOs", {
    title: "Bonus uden Indbetaling – No Deposit Bonus forklaret",
    description: "Jonas forklarer hvad en bonus uden indbetaling er, hvordan den aktiveres, og hvad du skal være opmærksom på for at undgå faldgruber.",
    uploadDate: "2026-02-20",
    duration: "PT1M20S",
  });

  return (
    <>
      <SEO
        title="Bonus uden Indbetaling – No Deposit Bonus Guide (2026)"
        description="Komplet teknisk guide til no deposit bonus hos danske casinoer. EV-analyse, regneeksempler, faldgruber og strategier for at maksimere din bonus uden indbetaling."
        jsonLd={[faqJsonLd, articleJsonLd, videoJsonLd]}
      />

      {/* Hero Section */}
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
              <Calculator className="mr-1.5 h-3.5 w-3.5" />
              Teknisk Analyse – Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Bonus uden Indbetaling
            </h1>
            <p className="text-lg text-white/80">
              Nul risiko, reel gevinst? Vi dissekerer no deposit bonussens matematik, afslører gevinstloftets skjulte effekt og viser dig præcis, hvornår en gratis bonus faktisk er pengene værd.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="niklas" readTime="18 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={bonusUdenIndbetalingHero} alt="Bonus uden indbetaling – teknisk analyse af no deposit bonusser i Danmark 2026" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Cross-link to nye casinoer sub */}
        <div className="mb-8 rounded-lg border border-primary/30 bg-accent/30 p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Leder du efter nye casinoer med bonus uden indbetaling?</strong>{" "}
            Se vores dedikerede guide til <Link to="/nye-casinoer/bonus-uden-indbetaling" className={linkClass}>nye casinoer med bonus uden indbetaling</Link>, hvor vi fokuserer specifikt på de nyeste spillesteder med gratis no-deposit bonusser.
          </p>
        </div>

        {/* === SEKTION 1: Hvad er en no deposit bonus – mekanisk breakdown === */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad er en bonus uden indbetaling – og hvordan fungerer mekanikken?
          </h2>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            En bonus uden indbetaling – også kaldet no deposit bonus – er et casinotilbud, hvor du modtager gratis spillemidler blot ved at oprette en konto. Du skal ikke indsætte penge. Konceptet er enkelt: casinoet tager den fulde risiko, og du får en risikofri prøvetur. Men bag den simple facade gemmer sig en præcis mekanisk struktur, som afgør bonussens reelle værdi.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Teknisk set fungerer en no deposit bonus via en bonuskonto, der er adskilt fra din rigtige saldo. Når du opretter din konto og verificerer via MitID, krediteres bonusmidlerne automatisk – eller du aktiverer dem med en bonuskode. Fra dette øjeblik starter tidsfristen, og alle vilkår træder i kraft. Dine indsatser trækkes fra bonuskontoen, og gevinster tilføjes samme konto. Først når <Link to="/omsaetningskrav" className={linkClass}>omsætningskravene</Link> er opfyldt, overføres midlerne til din udbetalbare saldo.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I modsætning til en <Link to="/indskudsbonus" className={linkClass}>indskudsbonus</Link> eller <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> kræver en no deposit bonus ingen indbetaling overhovedet. Det adskiller den fundamentalt fra alle andre bonustyper: din egen saldo er altid nul, så du kan aldrig tabe egne penge. Til gengæld kompenserer casinoet med strammere vilkår – især gevinstlofter, som vi analyserer nedenfor.
          </p>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            Forskellen til en <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonus</Link> er også vigtig at forstå: ved en no-sticky bonus indbetaler du og har to separate saldi (din egen + bonus). Ved en no deposit bonus eksisterer kun bonussaldoen. Det betyder at hele din spilaktivitet sker på casinoets penge – en unik mekanisme i bonusverdenen.
          </p>

          <YoutubeEmbed
            videoId="XhbLda1HyOs"
            title="Hvad er en bonus uden indbetaling?"
            description="Vi gennemgår hvad en bonus uden indbetaling (no deposit bonus) er, de fire varianter, EV-analyse af gevinstlofter og omsætningskrav, og hvordan du finder og aktiverer de bedste tilbud hos danske casinoer i 2026."
            duration="PT51S"
            viewCount={4}
            uploadDate="2026-02-20"
            articleUrl="https://casinoaftaler.dk/bonus-uden-indbetaling"
          />

          <div className="rounded-lg border border-border bg-muted/30 p-5">
            <h3 className="mb-2 text-lg font-semibold">
              Her gennemgår vores streamer og forfatter Jonas, hvad en bonus uden indbetaling er
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> dissekerer no deposit bonus-mekanikken – gevinstloftets skjulte effekt, de fire varianter og præcis hvornår en gratis bonus er pengene værd. Videoen er del af vores bonusunivers med guides om{" "}
              <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>bonus uden omsætningskrav</Link>,{" "}
              <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> og{" "}
              <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
            </p>
          </div>
        </section>

        <InlineCasinoCards title="Casinoer med no deposit bonus" count={6} />

        <Separator className="my-10" />

        {/* === SEKTION 2: Aktiveringsprocessen step-by-step === */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Aktiveringsprocessen: fra oprettelse til bonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Processen for at modtage en no deposit bonus er standardiseret på det danske marked, men der er nuancer, som kan koste dig bonussen, hvis du overser dem:
          </p>

          <div className="space-y-4">
            {[
              { step: "1", title: "Opret konto via MitID", desc: "Alle danske casinoer kræver MitID-verifikation ved oprettelse. Det sikrer at du er 18+ og bosiddende i Danmark. Processen tager 2-5 minutter. Vigtigt: nogle casinoer krediterer bonussen automatisk efter MitID-godkendelse, mens andre kræver at du aktivt accepterer bonussen i din profil." },
              { step: "2", title: "Bonusaktivering", desc: "Enten krediteres bonussen automatisk, eller du skal indtaste en bonuskode. Tjek altid om der er en kode – springer du dette trin over, kan du miste bonussen permanent. Nogle casinoer kræver at du kontakter kundeservice for at aktivere no deposit tilbud." },
              { step: "3", title: "Tidsfristen starter", desc: "Fra aktiveringsøjeblikket tæller uret. Typisk 24 timer til 7 dage for no deposit bonusser – markant kortere end de 30-60 dage ved indskudsbonusser. Alt skal gennemspilles inden fristen, inklusive omsætningskrav." },
              { step: "4", title: "Spil og omsætning", desc: "Du spiller med bonusmidlerne og forsøger at opfylde omsætningskravene (typisk 1-10x i Danmark). Kun godkendte spil tæller med. Hvis du overskrider maks-indsatsen, kan casinoet konfiskere bonussen og alle gevinster." },
              { step: "5", title: "Udbetaling eller indbetaling", desc: "Når omsætningen er opfyldt, kan du hæve op til gevinstloftet. Nogle casinoer kræver en minimumsindbetaling (typisk 50-100 kr.) før første udbetaling – selv fra en no deposit bonus. Tjek dette i vilkårene." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
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

        <Separator className="my-10" />

        {/* === SEKTION 3: Typer af no deposit bonusser – teknisk dybde === */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Fire varianter af no deposit bonusser – og deres matematiske profiler
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Ikke alle no deposit bonusser er skabt lige. Hver variant har sin egen risiko/reward-profil, og det er afgørende at forstå forskellen for at vælge korrekt. Her er de fire hovedtyper og deres tekniske karakteristika:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  No deposit free spins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Du modtager 10-50 <Link to="/free-spins" className={linkClass}>gratis spins</Link> på en specifik spilleautomat ved oprettelse. Spinværdien er fast (typisk 1-2 kr.) og kan ikke ændres. Gevinster fra spinsene krediteres din bonuskonto og er underlagt omsætningskrav.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>EV-profil:</strong> Lav varians, forudsigelig. 25 free spins á 2 kr. = 50 kr. nominel værdi. Med 96% RTP og 10x omsætning: EV ≈ 10-15 kr. Fordelen er enkelhed – ulempen er nul kontrol over spilvalg.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Coins className="h-5 w-5 text-primary" />
                  No deposit bonuspenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Casinoet krediterer et kontantbeløb (typisk 50-200 kr.) til din bonuskonto. Du vælger selv spil og indsatsstørrelse inden for vilkårene. Giver markant mere fleksibilitet end free spins.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>EV-profil:</strong> Variabel – afhænger af dit spilvalg. Med 100 kr. bonus, 10x omsætning og optimal spiludvælgelse (Blood Suckers, RTP 98%): EV ≈ 40-50 kr. Med dårligt spilvalg (RTP 94%): EV ≈ 15-20 kr. Fleksibiliteten giver erfarne spillere en fordel.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  No deposit cashback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  En sjælden variant: casinoet tilbagebetaler en procentdel af dine tab i den første periode – uden at du har indbetalt. Typisk 10-25% cashback på de første 24-48 timers spil.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>EV-profil:</strong> Unik – cashback reducerer din nedsiderisiko. Med 25% cashback på en 200 kr. bonus: din effektive RTP stiger fra 96% til 97%. Sjælden i Danmark, men den mest spillervenlige variant.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  Kombineret no deposit pakke
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Nogle casinoer kombinerer free spins + bonuspenge – f.eks. 25 free spins + 50 kr. gratis. Hver del kan have separate vilkår og omsætningskrav. Det giver den bedste samlede nominelle værdi.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>EV-profil:</strong> Kompleks – du skal beregne EV for hver del separat. Samlet EV er summen minus overlap i gevinstloft (tjek om loftet gælder per del eller samlet). De bedste kombinationspakker tilbyder 100-200 kr. i samlet nominel værdi.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* === SEKTION 4: Regneeksempler === */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Regneeksempler: den reelle værdi af en no deposit bonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Tal lyver ikke – og i casinobonusverdenen er matematik din bedste ven. Her er fire realistiske scenarier, der viser hvordan en no deposit bonus udspiller sig i praksis. Vi bruger den danske standard: max 10x omsætningskrav.
          </p>

          <div className="space-y-4">
            <Card className="border-primary/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  Scenarie 1: Standard free spins – gennemsnitligt forløb
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Bonus:</strong> 25 free spins á 2 kr. på Starburst (RTP: 96,1%) | <strong>Omsætning:</strong> 10x gevinst | <strong>Gevinstloft:</strong> 500 kr.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Du spinner dine 25 gratis spins og vinder i alt 48 kr. (tæt på forventet: 50 kr. × 96,1% = 48,05 kr.). Nu skal du omsætte 48 kr. × 10 = 480 kr. Med minimumindsats på 1 kr. og Starbursts RTP taber du statistisk 480 × 0,039 = 18,72 kr. under omsætningen. Du ender med ca. 29 kr. udbetalbart – under gevinstloftet.
                </p>
                <div className="rounded-md bg-accent/40 p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    <strong>Resultat:</strong> ~29 kr. reel værdi | <strong>EV per spin:</strong> ~1,16 kr. | <strong>Tidsforbrug:</strong> ~30-45 min.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Scenarie 2: Heldigt forløb – gevinstloftet aktiveres
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Bonus:</strong> 50 kr. bonuspenge | <strong>Omsætning:</strong> 10x (= 500 kr.) | <strong>Gevinstloft:</strong> 1.000 kr.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Du vælger Book of Dead (RTP: 96,2%, høj <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link>) og rammer en bonusrunde efter 80 kr. satset. Bonusrunden giver 850 kr. i gevinst. Din saldo er nu 820 kr. (50 - 80 + 850). Du fortsætter omsætningen (420 kr. resterende) og ender med 803 kr. – men gevinstloftet er 1.000 kr., så du kan hæve hele beløbet.
                </p>
                <div className="rounded-md bg-accent/40 p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    <strong>Resultat:</strong> 803 kr. (under loftet) | <strong>Sandsynlighed:</strong> ~5-8% af spillere oplever dette | <strong>Nøgle:</strong> Høj volatilitet giver større vinderchance – men også hurtigere bust.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Scenarie 3: Bust – bonussen tabes under omsætning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Bonus:</strong> 50 kr. bonuspenge | <strong>Omsætning:</strong> 10x (= 500 kr.) | <strong>Gevinstloft:</strong> 500 kr.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Du spiller Gonzo's Quest (RTP: 95,97%) med 5 kr. indsats. Efter 10 spins (50 kr. satset) er din saldo nede på 22 kr. Du skifter til 2 kr. indsats, men efter yderligere 60 kr. satset (total: 110 kr.) er saldoen 0 kr. Du har kun nået 22% af omsætningskravet. Total tab: 0 kr. af dine egne penge – men tid og mental energi er brugt.
                </p>
                <div className="rounded-md bg-accent/40 p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    <strong>Resultat:</strong> 0 kr. | <strong>Sandsynlighed:</strong> ~55-65% af spillere buster | <strong>Lektie:</strong> Start med minimumindsats for at maksimere overlevelseschancen.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5 text-primary" />
                  Scenarie 4: Stor gevinst – men gevinstloftet begrænser
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Bonus:</strong> 30 free spins á 1 kr. på Sweet Bonanza (RTP: 96,5%) | <strong>Omsætning:</strong> 5x gevinst | <strong>Gevinstloft:</strong> 500 kr.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Du rammer en ekstraordinær multispin-gevinst og vinder 2.300 kr. med dine free spins. Omsætning: 2.300 × 5 = 11.500 kr. Men gevinstloftet er kun 500 kr. – uanset om du gennemfører omsætningen, kan du aldrig hæve mere end 500 kr. I dette tilfælde er det faktisk optimalt at stoppe og bare hæve 500 kr. (hvis vilkårene tillader det).
                </p>
                <div className="rounded-md bg-accent/40 p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    <strong>Resultat:</strong> 500 kr. (loftet rammer) | <strong>Tabt potentiale:</strong> 1.800 kr. | <strong>Indsigt:</strong> Gevinstloftet er den reelle begrænsning – ikke omsætningskravet.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* === SEKTION 5: Sammenligning med andre bonustyper === */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            No deposit bonus vs. andre bonustyper – teknisk sammenligning
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Hvordan klarer en no deposit bonus sig mod de andre bonustyper i det danske marked? Her er en ærlig sammenligning baseret på EV, risiko og vilkår:
          </p>

          <div className="space-y-4">
            {[
              {
                title: "No deposit bonus vs. indskudsbonus",
                icon: CreditCard,
                desc: (
                  <>
                    <Link to="/indskudsbonus" className={linkClass}>Indskudsbonussen</Link> kræver din egen indbetaling (typisk 100-1.000 kr.) og giver en matchbonus på 100% (dansk standard). EV er markant højere i absolutte tal – en 1.000 kr. 100% match med 10x omsætning giver EV ≈ 200 kr. vs. no deposit's 15-30 kr. Men indskudsbonussen har reel risiko: du kan tabe din indbetaling. No deposit bonussen er 100% risikofri. <strong>Konklusion:</strong> Indskudsbonus for erfarne spillere, no deposit for nybegyndere og test.
                  </>
                ),
              },
              {
                title: "No deposit bonus vs. no-sticky bonus",
                icon: Scale,
                desc: (
                  <>
                    En <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonus</Link> adskiller din indbetaling fra bonussen, så du altid kan hæve egne penge. EV er typisk 40-60% af bonusbeløbet. No deposit bonussen har lavere EV i kroner, men nul risiko. <strong>Vigtig forskel:</strong> Ved no-sticky kan du stoppe og hæve din egen indbetaling når som helst. Ved no deposit er der intet at hæve, hvis bonussen buster – men du har heller ikke mistet noget.
                  </>
                ),
              },
              {
                title: "No deposit bonus vs. bonus uden omsætningskrav",
                icon: Zap,
                desc: (
                  <>
                    En <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>bonus uden omsætningskrav</Link> giver dig gevinster direkte – ingen gennemspilning. Det giver 100% konvertering af gevinsten (op til gevinstloftet). No deposit bonussen har omsætningskrav, som reducerer EV med 15-40%. <strong>Men:</strong> Bonusser uden omsætningskrav kræver næsten altid en indbetaling. No deposit bonussen er unik i sin nul-risiko-profil.
                  </>
                ),
              },
              {
                title: "No deposit bonus vs. free spins med indbetaling",
                icon: Sparkles,
                desc: (
                  <>
                    <Link to="/free-spins" className={linkClass}>Free spins</Link> med indbetaling giver typisk 50-200 spins med højere spinværdi (5-10 kr.) vs. no deposit's 10-50 spins á 1-2 kr. Den samlede nominelle værdi er 5-10x højere med indbetaling. <strong>Konklusion:</strong> No deposit free spins er en smagsprøve – indbetalings-free spins er hovedretten.
                  </>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* === SEKTION 6: Hvem passer no deposit bonusser til? === */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvilke spillertyper bør vælge en no deposit bonus?
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Ikke alle spillere får lige meget ud af en no deposit bonus. Her er en ærlig vurdering af, hvem der bør – og hvem der ikke bør – prioritere denne bonustype:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Nybegyndere ✅ Anbefalet",
                icon: Users,
                desc: "Perfekt til første casinooplevelse. Du lærer mekanikken, tester spil og forstår vilkår – alt uden risiko. Brug bonussen som en uddannelsesøvelse, ikke en profitmulighed.",
              },
              {
                title: "Casino-shoppere ✅ Anbefalet",
                icon: Eye,
                desc: "Hvis du vil sammenligne 3-5 casinoer, er no deposit bonusser idéelle. Test spiludvalg, brugervenlighed, udbetalingshastighed og kundeservice på casinoets regning.",
              },
              {
                title: "Bonus-jægere ⚠️ Betinget",
                icon: Target,
                desc: "Systematisk indsamling af no deposit bonusser kan generere 500-2.000 kr. totalt, men det kræver 10-20 kontooprettelser og betydelig tid. EV per time er lav (ca. 50-100 kr./time). Kun relevant som supplement til indskudsbonusser.",
              },
              {
                title: "High rollers ❌ Ikke anbefalet",
                icon: Flame,
                desc: "Med typiske bonusbeløb på 50-100 kr. og gevinstlofter på 500-1.000 kr. er no deposit bonusser irrelevante for high rollers. Indskudsbonusser eller VIP-programmer tilbyder markant højere værdi.",
              },
              {
                title: "Strategispillere ⚠️ Betinget",
                icon: Calculator,
                desc: "Erfarne spillere kan optimere EV ved at vælge højRTP-spil og minimumindsats, men den absolutte gevinst er begrænset af gevinstloftet. Bedre at fokusere energien på indskudsbonusser med lavt omsætningskrav.",
              },
              {
                title: "Casual spillere ✅ Anbefalet",
                icon: Gamepad2,
                desc: "For spillere der bare vil have sjov uden risiko er no deposit bonusser perfekte. Du spiller, vinder måske lidt, og har en god oplevelse – alt uden at åbne pungen.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
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
        </section>

        <Separator className="my-10" />

        {/* === SEKTION 7: Typiske faldgruber === */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Syv faldgruber der kan koste dig din no deposit gevinst
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            En no deposit bonus er risikofri i den forstand at du ikke taber egne penge. Men du kan tabe din bonus og potentielle gevinster, hvis du falder i disse fælder:
          </p>

          <div className="space-y-3">
            {[
              {
                title: "1. Overskridelse af maksimumindsatsen",
                desc: "De fleste no deposit bonusser har en maks-indsatsregel (typisk 25-50 kr. per spin). Overskrider du den – selv én gang – kan casinoet konfiskere hele bonussen og alle gevinster. Tjek ALTID maks-indsatsen før du spiller.",
                icon: Ban,
              },
              {
                title: "2. Udløbet tidsfrist",
                desc: "No deposit bonusser udløber typisk efter 24 timer til 7 dage. Mange spillere glemmer tidsfristen og mister bonus + gevinster. Sæt en alarm i din telefon det øjeblik du aktiverer bonussen.",
                icon: Clock,
              },
              {
                title: "3. Spil der ikke tæller med",
                desc: "Bordspil, live casino og visse automater tæller ofte 0% mod omsætningskravet. Hvis du spiller blackjack med din no deposit bonus, spilder du den uden at komme tættere på udbetaling.",
                icon: Gamepad2,
              },
              {
                title: "4. Krav om indbetaling før udbetaling",
                desc: "Nogle casinoer kræver en minimumsindbetaling (typisk 50-100 kr.) før du kan hæve gevinster fra en no deposit bonus. Det transformerer effektivt bonussen fra 'gratis' til 'prøv billigt'. Tjek dette i vilkårene.",
                icon: CreditCard,
              },
              {
                title: "5. Ignorering af gevinstloftet",
                desc: "Gevinstloftet er den hyppigst oversete betingelse. En bonus med 500 kr. gevinstloft er fundamentalt anderledes end en med 2.000 kr. loft – beregn altid din realistiske opside baseret på loftet.",
                icon: Lock,
              },
              {
                title: "6. Flere konti hos samme casino",
                desc: "Forsøg på at oprette flere konti for at modtage bonussen flere gange er et klart brud på vilkårene. MitID-verifikation gør det næsten umuligt, og konsekvensen er kontolukning og tab af alle midler.",
                icon: AlertTriangle,
              },
              {
                title: "7. Bonuskode glemt eller forkert",
                desc: "Hvis bonussen kræver en kode og du glemmer at indtaste den – eller taster forkert – kan du miste retten til bonussen permanent. Dobbelttjek altid koden, og kontakt support hvis du er i tvivl.",
                icon: Info,
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* === SEKTION 8: Markedsanalyse 2026 === */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            No deposit bonusser i Danmark 2026 – markedstendenser
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det danske no deposit marked har gennemgået markante ændringer de seneste år. Her er de vigtigste tendenser vi ser i 2026:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Flere nye casinoer tilbyder no deposit</h3>
                <p className="text-sm text-muted-foreground">
                  Med øget konkurrence på det danske marked bruger <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> no deposit bonusser som det primære kundeakkviseringsværktøj. I 2024 tilbød ca. 30% af nye lanceringer no deposit – i 2026 er tallet steget til ca. 45%. Bonusbeløbene er dog ikke steget tilsvarende, da Spillemyndighedens regulering holder vilkårene stramme.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <BarChart3 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Lavere omsætningskrav bliver normen</h3>
                <p className="text-sm text-muted-foreground">
                  Trenden bevæger sig mod lavere omsætning på no deposit bonusser: fra 10x (lovens maksimum) mod 1-5x. Flere casinoer differentierer sig med <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>helt omsætningsfrie</Link> no deposit free spins. Det gør bonusserne mere reelt værdifulde for spilleren.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Spillemyndighedens skærpede markedsføringskrav</h3>
                <p className="text-sm text-muted-foreground">
                  Spillemyndigheden har i 2025-2026 skærpet kravene til markedsføring af "gratis" bonusser. Casinoer skal nu tydeligt angive alle begrænsninger (gevinstloft, omsætning, tidsfrist) direkte i markedsføringsmaterialet – ikke kun i vilkårene. Det giver bedre gennemsigtighed for spillere.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Percent className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Gevinstlofterne stiger langsomt</h3>
                <p className="text-sm text-muted-foreground">
                  Gennemsnitlige gevinstlofter er steget fra ca. 500 kr. i 2024 til 750-1.000 kr. i 2026 – en indikation af at casinoerne investerer mere i kundeakkvisering. De mest konkurrencedygtige casinoer tilbyder nu lofter på 2.000-5.000 kr., men det er fortsat undtagelsen.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* === SEKTION 9: Juridisk perspektiv === */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Juridisk ramme: Spillemyndigheden og no deposit bonusser
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            No deposit bonusser i Danmark er reguleret under Spillemyndighedens generelle bonusregler, som er blandt de mest spillervenlige i Europa. Her er de centrale juridiske rammer, du som spiller bør kende:
          </p>
          <div className="space-y-3">
            {[
              {
                title: "Maksimalt 10x omsætningskrav",
                desc: "Ifølge dansk lovgivning må intet dansk casino kræve mere end 10x omsætning på nogen bonustype – herunder no deposit bonusser. Til sammenligning har Malta (MGA) og Storbritannien (UKGC) ingen lovmæssigt fastsat øvre grænse, hvor 30-60x er almindeligt. Det danske loft giver no deposit bonusser markant højere reel værdi.",
                icon: Scale,
              },
              {
                title: "Klar markedsføringspligt",
                desc: "Casinoer skal tydeligt kommunikere alle vilkår i deres bonusmarkedsføring: omsætningskrav, gevinstloft, tidsfrist, spilrestriktioner og eventuelle krav om indbetaling. Vildledende brug af 'gratis' uden at nævne begrænsninger kan resultere i bøder fra Spillemyndigheden.",
                icon: BookOpen,
              },
              {
                title: "MitID-verifikation er lovkrav",
                desc: "Alle danske casinoer er juridisk forpligtet til at verificere spillerens identitet via MitID før kontooprettelse. Det forhindrer mindreårige og selvudelukkede spillere i at modtage bonusser. Det gør også det umuligt at oprette flere konti for at modtage bonussen gentagne gange.",
                icon: ShieldCheck,
              },
              {
                title: "ROFUS-tjek er automatisk",
                desc: "Casinoet kontrollerer automatisk om du er registreret i ROFUS (Register Over Frivilligt Udelukkede Spillere) under MitID-verifikationen. Er du registreret, kan du ikke oprette en konto eller modtage bonusser. Det er en vigtig spillerbeskyttelsesmekanisme.",
                icon: Lock,
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Unik konklusion: No Deposit */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bundlinjen: Er en no deposit bonus din tid værd?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Svaret er et rungende "ja" – men med et "men". Som casinospiller er en no deposit bonus den eneste situation hvor du har en matematisk fordel over huset. Din risiko er nul, og din potentielle gevinst er positiv. EV er lav (15-30 kr.), men uendelig i procent af din investering (som er 0 kr.).
          </p>
          <div className="space-y-3">
            {[
              {
                title: "Det ultimative testværktøj",
                desc: "Brug no deposit bonusser til at teste nye casinoers platform, mobiloplevelse og support – ikke til at blive rig. Hvis du kan lide oplevelsen, overvej en indskudsbonus.",
                icon: Eye,
              },
              {
                title: "Matematisk overlegen",
                desc: "Selv med stramme vilkår (10x omsætning, 500 kr. loft) er no deposit bonussen den eneste bonus med positiv EV uden finansiel risiko. Det er 'gratis penge' – hvis du arbejder for dem.",
              },
              {
                title: "Disciplin er nøglen",
                desc: "For at konvertere bonussen skal du spille disciplineret: minimumindsats, høj RTP, og stop ved gevinstloftet. Uden disciplin er bonussen bare underholdning.",
              },
              {
                title: "Pas på gateway-effekten",
                desc: "Vær bevidst om at bonussen er designet til at konvertere dig til betalende kunde. Sæt dine grænser før du begynder. Spil ansvarligt.",
                icon: ShieldCheck,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-primary/30 bg-accent/30 p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/bonus-uden-indbetaling" />
        <BonusMoneyLinks currentPath="/bonus-uden-indbetaling" />
        <RelatedGuides currentPath="/bonus-uden-indbetaling" />
        <FAQSection title="Tekniske spørgsmål om no deposit bonusser" faqs={bonusUdenIndbetalingFaqs} />
        <AuthorBio author="niklas" />
      </div>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

export default BonusUdenIndbetaling;

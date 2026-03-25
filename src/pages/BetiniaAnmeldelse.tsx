import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { RatingBreakdown } from "@/components/RatingBreakdown";
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { RelatedReviews } from "@/components/RelatedReviews";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { StickyCTA } from "@/components/StickyCTA";
import { buildArticleSchema, buildFaqSchema, buildReviewSchema } from "@/lib/seo";
import { casinoReviewEntities } from "@/lib/entitySchemaHelpers";
import { useAuth } from "@/hooks/useAuth";
import type { ReactNode } from "react";
import { CasinoReviewHero } from "@/components/CasinoReviewHero";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
import { buildVideoSchema } from "@/lib/seo";
import { QuickFactsProviders, QuickFactsLogo, QuickFactsLicense } from "@/components/QuickFactsProviders";
import {
  ShieldCheck, Star, Clock, CreditCard, Gift, Trophy, Sparkles,
  HelpCircle, User, CalendarDays, BookOpen, Smartphone, Headphones,
  Gamepad2, Wallet, TrendingUp, Award, Zap, RotateCcw, Check, X,
  Globe, Target, AlertTriangle, BarChart3, Layers, Timer, Users,
  Shield, Flame, ArrowRight, Percent, DollarSign, Eye, Search,
  ThumbsUp, ThumbsDown, MessageSquare, Mail,
} from "lucide-react";
import { UserReviewSection } from "@/components/UserReviewSection";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import { ReviewMoneyLinks } from "@/components/ReviewMoneyLinks";


const linkClass = "text-primary underline hover:text-primary/80";

const betiniaFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvor hurtigt udbetaler Betinia gevinster, og hvilke metoder er hurtigst?",
    answer: (
      <>
        Betinia behandler udbetalinger inden for 1–3 hverdage afhængigt af betalingsmetode. E-wallets som{" "}
        <Link to="/betalingsmetoder/paypal" className={linkClass}>PayPal</Link> og{" "}
        <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link> er typisk de hurtigste med udbetaling inden for 24 timer. Kortbetalinger via Visa og Mastercard tager normalt 2–3 bankdage, mens bankoverførsler kan tage op til 5 hverdage. Da registrering sker via MitID, er din identitet allerede verificeret, hvilket eliminerer forsinkelser ved første udbetaling. Minimum udbetalingsbeløb er 100 kr. Se vores guide til{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>.
      </>
    ),
  },
  {
    question: "Hvad er Betinias akkumulator-boost, og hvordan fungerer den?",
    answer:
      "Betinias akkumulator-boost er en unik funktion i sportssektionen, der øger din potentielle gevinst, når du kombinerer flere væddemål på samme kupon. Jo flere valg du tilføjer til din akkumulator, desto højere bliver din procentvise boost – typisk op til 100 % ekstra på gevinsten. Eksempelvis kan en kupon med 8 valg give 40–50 % ekstra oven i den samlede odds-gevinst. Boosten gælder automatisk på kvalificerende kuponer og kræver ingen bonuskode. Det er en funktion, der primært appellerer til erfarne sportsbettere, der foretrækker kombivæddemål frem for singler. Betinia er et af få danske casinoer, der tilbyder denne type automatisk gevinstforhøjelse.",
  },
  {
    question: "Hvordan adskiller Betinias No-Sticky bonus sig fra en traditionel casinobonus?",
    answer: (
      <>
        Betinias velkomstbonus på 100 % op til 1.000 kr. er en{" "}
        <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link>, som fundamentalt adskiller sig fra traditionelle{" "}
        <Link to="/sticky-bonus" className={linkClass}>sticky bonusser</Link>. Med en No-Sticky bonus spiller du altid først med dine egne penge. Du kan til enhver tid hæve din indbetaling og gevinster vundet med egne midler, uanset om du har opfyldt omsætningskravet eller ej. Bonusmidlerne aktiveres først, når din egen saldo rammer 0 kr. – og hvis du på det tidspunkt ikke ønsker at bruge bonussen, kan du simpelthen vælge at stoppe. Omsætningskravet er 10x (indskud + bonus) med 60 dages gyldighed. Læs mere om{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
      </>
    ),
  },
  {
    question: "Er Betinia et sikkert casino med gyldig dansk licens?",
    answer: (
      <>
        Betinia har dobbelt licensering: dansk licens fra Spillemyndigheden (licensnr. 20-6359) og licens fra Malta Gaming Authority (MGA). Casinoet drives af Romabet Limited, der lancerede den danske platform i 2022 og hurtigt har etableret sig som et populært valg. Platformen benytter SSL-kryptering til beskyttelse af alle data og transaktioner og er fuldt tilsluttet{" "}
        <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>. Registrering foregår via MitID, hvilket sikrer øjeblikkelig identitetsverifikation. Læs mere om{" "}
        <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Hvilke live casino-spil tilbyder Betinia, og hvem leverer dem?",
    answer: (
      <>
        Betinia har et af de bredeste live casino-udvalg blandt danske casinoer, primært leveret af{" "}
        <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> – verdens førende live casino-udbyder. Udvalget inkluderer klassiske bordspil som blackjack (inkl. danske borde), roulette (europæisk, fransk og Lightning Roulette) og baccarat. Derudover findes game shows som Crazy Time, Dream Catcher, Monopoly Live og Crazy Coin Flip. Der er borde med indsatser fra 10 kr. til over 50.000 kr. pr. runde, hvilket gør det tilgængeligt for alle budgetter. Læs mere om{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link>.
      </>
    ),
  },
  {
    question: "Kan Betinia bruges på mobilen, og er der en app?",
    answer:
      "Betinia har ikke en dedikeret app i App Store eller Google Play, men hele platformen er fuldt mobiloptimeret som en progressiv web-app. Det betyder, at alle spil, bonusser, sports-væddemål og betalinger fungerer direkte i din mobilbrowser på både iOS og Android. Grænsefladen tilpasser sig automatisk din skærmstørrelse med touchvenlige menuer og hurtig navigation. Live casino og sportsbetting fungerer ligeledes fejlfrit på mobilen, inklusiv livescores og in-play betting. Fordelen ved denne tilgang er, at du altid har den nyeste version uden at skulle opdatere en app manuelt.",
  },
  {
    question: "Hvad er Betinias velkomstbonus, og hvordan aktiverer man den?",
    answer: (
      <>
        Nye spillere hos Betinia kan vælge mellem to velkomstbonusser: en casinobonus på 100 % op til 1.000 kr. (No-Sticky, 10x omsætning) eller en oddsbonus på 100 % op til 1.000 kr. (5x omsætning). Casinobonussen aktiveres automatisk ved første indbetaling på minimum 100 kr. – ingen bonuskode er nødvendig. Oddsbonussen kræver, at du placerer væddemål med minimum odds 1,80. Begge bonusser har 60 dages gyldighed. Du kan kun vælge én af de to, så overvej nøje, om du primært ønsker at spille casino eller placere sportsvæddemål. Læs mere om{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på Betinias casinobonus og oddsbonus?",
    answer: (
      <>
        Betinia tilbyder to separate velkomstbonusser, og du kan kun vælge én. Casinobonussen er 100 % op til 1.000 kr. med{" "}
        <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky</Link> struktur og 10x omsætningskrav – udelukkende til spilleautomater og bordspil. Oddsbonussen er ligeledes 100 % op til 1.000 kr., men med kun 5x omsætningskrav og minimum odds på 1,80 for enkeltvæddemål. Casinobonussen er bedst for slotsspillere, mens oddsbonussen er optimal for sportsbettere. Bemærk at{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskravet</Link> på oddsbonussen er lavere, men kræver strategisk spiludvælgelse.
      </>
    ),
  },
];

const BetiniaAnmeldelse = () => {
  const { data: casinos } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const { user } = useAuth();
  const heroBackgroundImage = siteSettings?.hero_background_image;

  const casino = casinos?.find((c) => c.slug === "betinia");

  const handleBonusClick = () => {
    if (casino) getAffiliateRedirect(casino.slug, user?.id);
  };

  const faqJsonLd = buildFaqSchema(betiniaFaqs);
  const articleSchema = buildArticleSchema({ headline: "Betinia Anmeldelse 2026 – No-Sticky Bonus & Odds", description: "Betinia testet: No-Sticky bonus op til 1.000 kr., 10x omsætning, sportsbetting og dansk licens.", url: "https://casinoaftaler.dk/casino-anmeldelser/betinia", datePublished: "2026-02-15", authorName: "Jonas", authorUrl: "https://casinoaftaler.dk/forfatter/jonas", videoId: "GyqEjKQiCJU", ...casinoReviewEntities("Betinia", "betinia") });

  const reviewJsonLd = buildReviewSchema({ itemName: "Betinia", itemUrl: "https://www.betinia.dk", ratingValue: "4.9", ratingCount: "214", reviewBody: "Betinia er et dansk dual-motor casino med No-Sticky velkomstbonus på 100% op til 1.000 kr., 10x omsætning, sportsbetting med akkumulatorboost, over 40 spiludbydere og 19 betalingsmetoder." });

  return (
    <>
      <SEO
        title="Betinia Anmeldelse 2026 – No-Sticky Bonus"
        description="Betinia anmeldelse 2026: 100% No-Sticky bonus op til 1.000 kr., 10x omsætning, 40+ spiludbydere og sportsbetting. Se vores ærlige test."
        jsonLd={[articleSchema, faqJsonLd, reviewJsonLd, buildVideoSchema("https://casinoaftaler.dk/casino-anmeldelser/betinia", "GyqEjKQiCJU", { title: "Betinia Casino Anmeldelse 2026 – Ærlig Gennemgang", description: "Se hvordan Betinia ser ud indefra.", uploadDate: "2026-02-18", duration: "PT2M" })]}
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
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="secondary">
                <Star className="mr-1.5 h-3.5 w-3.5" />
                4.9 / 5 – Anbefalet Casino
              </Badge>
              <Badge variant="outline" className="border-white/40 text-white">
                No-Sticky Bonus
              </Badge>
              <Badge variant="outline" className="border-white/40 text-white">
                Casino + Sports
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Betinia Anmeldelse 2026
            </h1>
            <p className="mb-6 text-lg text-white/80">
              Komplet og ærlig anmeldelse af Betinia.dk – et dansk dual-motor casino med No-Sticky velkomstbonus på 100 % op til 1.000 kr., kun 10x omsætningskrav, akkumulatorboost op til 100 %, over 40 spiludbydere, 19 betalingsmetoder og dedikeret sportsbetting med ca. 30 sportsgrene. Testet over 14 dage af vores redaktion.
            </p>
            <Button
              onClick={handleBonusClick}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8"
            >
              <Gift className="mr-2 h-5 w-5" />
              Hent Bonus hos Betinia
            </Button>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="36 Min." />

        <CasinoReviewHero slug="betinia" casinoName="Betinia" />
        <ReviewMoneyLinks />

        {/* Quick Facts Card */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="h-6 w-6 text-primary" />
                  Hurtige Fakta – Betinia
                </CardTitle>
                <QuickFactsLogo logoUrl={casino?.logo_url} casinoName={casino?.name} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">Velkomstbonus</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">100% op til 1.000 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">Bonustype</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">No-Sticky</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">Omsætningskrav</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">10x (d+b)</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">Licens</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">DK + MGA</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center mt-4">
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">Min. indbetaling</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">100 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">Bonusgyldighed</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">60 dage</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">Grundlagt</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">2022 (DK)</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">Betalingsmetoder</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">19 metoder</p>
                </div>
              </div>
              <QuickFactsProviders providers={["NetEnt", "Evolution Gaming", "Play'n GO", "Quickspin", "Wazdan", "ELK Studios", "Big Time Gaming", "Nolimit City", "Pragmatic Play", "Yggdrasil", "Red Tiger", "Hacksaw Gaming", "Push Gaming", "Relax Gaming", "Thunderkick", "Blueprint Gaming"]} />
              <QuickFactsLicense licenseId="20-6359" />
            </CardContent>
          </Card>
        </section>

        {/* Introduction – Dual-Motor Concept */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betinia – Dual-Motor Casinoet der forener to verdener</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            De fleste danske casinoer vælger en retning: enten er de rendyrkede casinoplatforme med fokus på spilleautomater og live casino, eller også er de sportsbetting-platforme med et casino som biprodukt. Betinia forsøger noget sjældent – at bygge to ligeværdige motorer under samme tag. Casino- og sportssektionen er ikke blot symbolsk adskilt i menuen, men opererer reelt som to separate platforme med dedikerede bonusser, specialiserede funktioner og målrettet brugeroplevelse for hver disciplin.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bag platformen står Romabet Limited fra Malta, og casinoet opererer med dobbelt licensering: dansk licens fra{" "}
            <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> (nr. 20-6359) og international licens fra Malta Gaming Authority. Denne dual-licensing struktur er ikke tilfældig – den afspejler Betinias ambition om at tilbyde et niveau af spillerbeskyttelse, der overstiger minimumsstandarden på det danske marked. MGA-licensen kræver eksempelvis yderligere kapitalreserver og adskilt spillerkontoføring, hvilket giver et ekstra sikkerhedsnet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det der virkelig adskiller Betinia fra konkurrenterne er kombinationen af en generøs{" "}
            <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky velkomstbonus</Link> på 100 % op til 1.000 kr. med kun 10x{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> og et enormt spiludvalg fra mere end 40{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludbydere</Link>. Hertil kommer en dedikeret sportssektion med ca. 30 sportsgrene, akkumulatorboost op til 100 %, "Foran med 2"-funktionen i fodbold, 19 forskellige{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> og effektiv kundeservice via live chat med svartider under 3 minutter.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at give denne anmeldelse den dybde, den fortjener, har vi testet Betinia intensivt over 14 dage. Vi har aktiveret begge velkomstbonusser (casino og odds), gennemspillet omsætningskravene, testet udbetalingshastigheden med fire forskellige betalingsmetoder, stresset live chatten med tekniske spørgsmål kl. 23:50 en søndag aften, og analyseret akkumulatorboostens reelle effekt over 47 multibets. Resultatet er denne dybdegående analyse, der adskiller marketingsløjferne fra den faktiske spiloplevelse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne anmeldelse gennemgår vi alt fra velkomstbonus og bonusmatematik til spiludvalg, sportsbetting-funktioner, live casino, betalingsmetoder, kundeservice og sikkerhed – så du kan tage en informeret beslutning. Læs mere om{" "}
            <Link to="/saadan-tester-vi-casinoer" className={linkClass}>sådan tester vi casinoer</Link>.
          </p>
          <YoutubeEmbed videoId="GyqEjKQiCJU" title="Betinia Casino Anmeldelse 2026 – Ærlig Gennemgang" description="Se hvordan Betinia ser ud indefra. Vi viser dig hjemmesiden, navigation, spilvalg og vigtige features." duration="PT2M" uploadDate="2026-02-18" articleUrl="https://casinoaftaler.dk/casino-anmeldelser/betinia" />
          <div className="rounded-lg border border-border bg-muted/30 p-5">
            <h3 className="mb-2 text-lg font-semibold">Her gennemgår vores streamer og forfatter Jonas, hvordan Betinia ser ud indefra</h3>
            <p className="text-muted-foreground leading-relaxed"><Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> viser dig Betinias hjemmeside, navigation, spilvalg og vigtige features i denne walkthrough-video.</p>
          </div>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/betinia/lobby-forside.webp"
            alt="Betinia casino forside med populære spilleautomater, anbefalede spil og sportsbegivenheder"
            caption="Betinias forside med Mine Spil, anbefalede slots og live sportsopdateringer – alt samlet i ét overblik."
            eager={true}
          />
        </section>

        <Separator className="my-10" />

        {/* 14-Day Test Log */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">14 dages intensiv test – Vores erfaringer med Betinia</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Vi testede Betinia systematisk over to uger med fokus på begge platforme: casino og sportsbetting. Her er de vigtigste observationer fra vores testperiode, dag for dag:
          </p>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/betinia/login-mitid.webp"
            alt="Betinia login-dialog med MitID-verifikation for sikker adgang"
            caption="Login hos Betinia sker via MitID – hurtigt, sikkert og uden manuel verifikation."
          />

          <Card className="border-border bg-card mb-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  { day: "Dag 1–2", title: "Registrering og casinobonus", desc: "MitID-registrering tog 3 minutter. Indbetalte 1.000 kr. via MobilePay – øjeblikkelig kreditering. Aktiverede No-Sticky casinobonussen manuelt via 'Min Bonus'. Spillede 200 spins på Book of Dead (RTP 96,21%) og Sweet Bonanza (RTP 96,48%). Saldo efter dag 2: 847 kr. egne midler + 1.000 kr. bonus i reserve." },
                  { day: "Dag 3–5", title: "Sportsbetting og akkumulatorboost", desc: "Oprettede ny konto med oddsbonussen for at teste separat. Placerede 12 multibets med 3–8 valg. Akkumulatorboost-procenten steg fra 5% (3 valg) til 45% (8 valg). Vandt en 5-valgskupon med 22% boost – effektiv meregevinst på 187 kr. 'Foran med 2' testede vi på 3 fodboldkampe – udløst én gang (Brøndby førte 2-0 efter 34 min., kampgevinst udbetalt trods slutresultat 2-2)." },
                  { day: "Dag 6–8", title: "Live casino og spiludvalg", desc: "Testede Evolution Gaming-sektionen intensivt. 4 forskellige rouletteborde (Lightning Roulette, European, Speed, Danish Roulette). Danske borde med dansktalende dealere – smooth streaming uden buffering. Crazy Time session: 45 min., startkapital 200 kr., slutsaldo 310 kr. Game show-sektionen er impressiv med 15+ titler inkl. Monopoly Live og Funky Time." },
                  { day: "Dag 9–11", title: "Udbetalingstest med 4 metoder", desc: "Testede udbetalingshastighed systematisk: PayPal (anmodning kl. 14:30, modtaget kl. 16:15 – 1 time 45 min), Trustly (anmodning kl. 10:00, modtaget kl. 13:20 – 3 timer 20 min), Visa (anmodning fredag kl. 15:00, modtaget mandag kl. 11:30 – ca. 2 bankdage), MobilePay (kun indbetaling – ingen udbetaling tilgængelig). Alle uden gebyr." },
                  { day: "Dag 12–14", title: "Bonusomsætning og kundeservice", desc: "Gennemspillede casinobonussen: 2.000 kr. × 10 = 20.000 kr. omsætning nået på dag 13. Resterende bonussaldo efter omsætning: 340 kr. – hævet direkte. Kundeservice testet 5 gange: gennemsnitlig svartid 2 min. 40 sek. i live chat. Søndag aften kl. 23:50 – 4 min. ventetid, men kompetent svar om bonusvilkår." },
                ].map((item) => (
                  <div key={item.day} className="flex items-start gap-3 rounded-lg border border-border p-4">
                    <CalendarDays className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{item.day}</h4>
                        <Badge variant="outline" className="text-xs">{item.title}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Betinia ærligt vurderet – hvad virker og hvad skuffer</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Efter 14 dages test kan vi præsentere en nuanceret liste over Betinias styrker og svagheder. Listen afspejler vores faktiske oplevelser – ikke markedsføringsmaterialet:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-primary">
                  <Check className="h-5 w-5" />
                  Fordele
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "No-Sticky velkomstbonus – spil med egne penge først, hæv gevinster frit",
                    "Kun 10x omsætningskrav (d+b) – blandt de mest fordelagtige i DK",
                    "Dobbelt bonusvalg: casino ELLER odds – du bestemmer",
                    "Tusindvis af spilleautomater fra 40+ anerkendte udbydere",
                    "19 betalingsmetoder inkl. MobilePay, PayPal og Trustly",
                    "Dedikeret sportssektion med ca. 30 sportsgrene og livebetting",
                    "Akkumulatorboost op til 100 % på multibets – automatisk",
                    "'Foran med 2' – tidlig udbetaling i fodbold (testet og bekræftet)",
                    "PayPal-udbetaling på under 2 timer (testet)",
                    "Dobbelt licens: Spillemyndigheden + Malta Gaming Authority",
                    "Live chat med under 3 min. gennemsnitlig svartid",
                    "Dansk roulettebord med dansktalende dealere i live casino",
                  ].map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-destructive/80">
                  <X className="h-5 w-5" />
                  Ulemper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Min. indbetaling på 100 kr. – 25-33 kr. højere end gennemsnittet",
                    "Skrill og Neteller kvalificerer IKKE til bonusser",
                    "Ingen dedikeret mobilapp – kun mobiloptimeret browser",
                    "MobilePay kun til indbetaling, ikke udbetaling",
                    "Casinoet er relativt nyt i Danmark (2022) – kortere track record",
                    "Ingen loyalitetsprogram eller VIP-system for casinospillere",
                    "Bonussen kræver manuel aktivering via 'Min Bonus'",
                    "Sportsbetting-grænsefladen er funktionel men visuelt ordinær",
                  ].map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm">
                      <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Welcome Bonus Deep Dive */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Velkomstbonus hos Betinia – No-Sticky matematik og strategi</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Betinias velkomstbonus er en 100 %{" "}
            <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> op til 1.000 kr. – og for at forstå hvorfor dette er markant bedre end en standard matchbonus, er det nødvendigt at dykke ned i mekanikken. Med en No-Sticky bonus holdes din indbetaling og bonusmidlerne i to helt separate "lommer". Du spiller først med dine egne penge, og hele tiden kan du vælge at hæve din saldo – gevinster inkluderet – uden at omsætningskravet spiller nogen rolle overhovedet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bonusmidlerne aktiveres først, når din egen saldo rammer præcis 0 kr. På det tidspunkt "overtager" bonussaldoen, og derfra gælder{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskravet</Link> på 10x (indskud + bonus). Det brillante ved denne struktur er, at du aldrig risikerer at "låse" dine egne penge inde bag et omsætningskrav. Hos traditionelle{" "}
            <Link to="/sticky-bonus" className={linkClass}>sticky bonusser</Link> blandes dine penge med bonuspenge fra første spin, og du kan ikke hæve noget, før hele omsætningskravet er opfyldt.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Lad os sætte det i perspektiv med et konkret regneeksempel. Du indbetaler 1.000 kr. og modtager 1.000 kr. i No-Sticky bonus. Du spiller 300 spins på Gates of Olympus (RTP 96,50 %, høj volatilitet) og rammer en stor gevinst på spin #187, der bringer din saldo op på 2.800 kr. Hos en traditionel sticky bonus ville du stadig være bundet af omsætningskravet. Hos Betinia kan du hæve alle 2.800 kr. med det samme – bonusmidlerne forbliver i reserve, og du har tjent 1.800 kr. i ren profit. Det er den fundamentale forskel, og det er grunden til, at No-Sticky bonusser er den mest spillervenlige bonusstruktur der findes.
          </p>

          <Card className="border-border bg-card mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Gift className="h-5 w-5 text-primary" />
                Sådan aktiverer du velkomstbonussen – trin for trin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Gå til Betinia.dk", desc: "Besøg casinoets forside og klik på den orange tilmeldingsknap øverst. Alternativt kan du bruge vores link herunder for at sikre dig den korrekte bonus." },
                  { step: "2", title: "Bekræft identitet med MitID", desc: "Indtast dit CPR-nummer og godkend tilmeldelsen via MitID-appen. Processen tager under 3 minutter og eliminerer behovet for efterfølgende dokumentverifikation." },
                  { step: "3", title: "Vælg din bonus", desc: "Du bliver bedt om at vælge mellem casinobonussen (No-Sticky, 10x) eller oddsbonussen (5x). Beslut dig for dit primære fokus – du kan kun vælge én." },
                  { step: "4", title: "Foretag din første indbetaling", desc: "Indbetal mindst 100 kr. med din foretrukne metode. Bemærk: Skrill og Neteller kvalificerer IKKE til bonusser – brug MobilePay, Trustly eller kort." },
                  { step: "5", title: "Aktiver bonussen manuelt", desc: "VIGTIGT: Bonussen tilføjes ikke automatisk. Gå til 'Min Bonus' på din profilside og aktiver den derfra. Dette er et ekstra trin, som nogle spillere overser." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* No-Sticky Explanation */}
          <Card className="border-border bg-card mb-6 border-l-4 border-l-accent">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="h-6 w-6 text-accent" />
                <h3 className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">No-Sticky vs. Sticky – den kritiske forskel</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Med en No-Sticky bonus holdes din indbetaling og bonusmidlerne i separate lommer. Du starter altid med at spille for din egen saldo. Vinder du stort, kan du frit hæve dine gevinster uden krav – bonusmidlerne forbliver uberørt i reserve. Bonusmidlerne aktiveres KUN, hvis din egen saldo rammer 0 kr. Det er den mest spillervenlige bonusstruktur der findes, og det er ekstremt sjældent at se den kombineret med et omsætningskrav på kun 10x.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Til sammenligning: hos en traditionel sticky bonus blandes dine penge med bonuspenge fra første spin. Du kan ikke hæve noget, før hele omsætningskravet er opfyldt – og du risikerer at spille dine egne penge væk i processen. Læs mere om{" "}
                <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonusser</Link> og sammenlign med{" "}
                <Link to="/sticky-bonus" className={linkClass}>Sticky bonusser</Link>.
              </p>
            </CardContent>
          </Card>

          {/* Wagering Example */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <RotateCcw className="h-5 w-5 text-primary" />
                Bonusmatematik – realistisk beregning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Scenarie: Du indbetaler 1.000 kr. og modtager 1.000 kr. i No-Sticky bonus.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Indskud + Bonus</p>
                  <p className="text-xl font-bold text-foreground">2.000 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">× 10 omsætning</p>
                  <p className="text-xl font-bold text-foreground">= 20.000 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Indenfor</p>
                  <p className="text-xl font-bold text-foreground">60 dage</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Forventet tab (RTP 96%)</p>
                  <p className="text-xl font-bold text-foreground">~800 kr.</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Med en gennemsnitlig RTP på 96 % koster det statistisk set ca. 800 kr. at gennemspille 20.000 kr. Med No-Sticky strukturen risikerer du dog kun bonusmidlerne – din egen indbetaling er allerede sikret eller hævet. Det gør den reelle risiko markant lavere end hos konkurrenter med sticky bonusser. Læs vores dybdegående guide til{" "}
                <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Sportsbetting Section – The Second Motor */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sportsbetting hos Betinia – Den anden motor</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Betinias sportssektion er ikke et appendix – den er en fuldgyldig sportsbetting-platform med ca. 30 sportsgrene, pre-match og livebetting, statistik-integration og specialfunktioner som akkumulatorboost og "Foran med 2". Under vores test placerede vi 47 væddemål over 14 dage for at evaluere odds-kvaliteten, funktionaliteten og den reelle effekt af akkumulatorboost.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Odds-kvaliteten er konkurrencedygtig med de etablerede bookmakers. Vi sammenlignede Betinias odds med{" "}
            <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link> og{" "}
            <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link> på 20 fodboldkampe – Betinia var gennemsnitligt 0,02–0,04 point lavere på 1X2-markeder, men kompenserede delvist med akkumulatorboostet. Livebetting-sektionen opdaterer hurtigt med minimal latenstid (under 2 sekunder), og in-play markeder er tilgængelige for de fleste større sportsgrene.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Akkumulatorboost – op til 100 %
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Betinias akkumulatorboost stiger procentuelt med antallet af valg i din kupon. Kræver mindst 3 valg med odds på min. 1,40 pr. valg. Boostet gælder automatisk – ingen kode nødvendig.
                </p>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  {[
                    { selections: "3 valg", boost: "5%" },
                    { selections: "5 valg", boost: "15%" },
                    { selections: "8 valg", boost: "45%" },
                    { selections: "10 valg", boost: "60%" },
                    { selections: "15 valg", boost: "80%" },
                    { selections: "21+ valg", boost: "100%" },
                  ].map((b) => (
                    <div key={b.selections} className="rounded-lg border border-border p-2">
                      <p className="text-muted-foreground">{b.selections}</p>
                      <p className="font-bold text-foreground">+{b.boost}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  "Foran med 2" – Tidlig udbetaling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Placer et væddemål på kvalificerende fodboldmarkeder. Når dit hold fører med 2 mål, vinder du automatisk – uanset kampens slutresultat. Vi testede funktionen på 3 kampe under vores testperiode, og den blev udløst én gang med succes.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Testet:</strong> Brøndby IF førte 2-0 efter 34 min. mod FC Nordsjælland. Kampgevinsten blev udbetalt øjeblikkeligt, selvom kampen endte 2-2. En reel forsikring mod kollapser i 2. halvleg, som er særligt værdifuld for livebetting.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Gift className="h-5 w-5 text-primary" />
                Sports-velkomstbonus – alternativ til casinobonussen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Vælger du oddsbonussen frem for casinobonussen, får du 100 % matchbonus op til 1.000 kr. med kun 5x omsætningskrav. Minimum odds er 2,0 for enkeltvæddemål og 1,5 pr. valg i multibets. 60 dages gyldighed. Matematisk set er oddsbonussen lettere at gennemspille (5.000 kr. vs. 20.000 kr. for casinobonussen), men kræver strategisk spiludvælgelse og en vis forståelse for odds-markeder.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Odds-omsætning</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">1.000 × 5 = 5.000 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Min. odds</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">2,0 (singel)</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Gyldighed</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">60 dage</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Game Selection Deep Dive */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludvalg hos Betinia – Analyse af 40+ udbydere</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Betinias casinosektion rummer tusindvis af titler fra over 40{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludbydere</Link>. Det placerer dem i den absolutte top blandt danske casinoer hvad angår bredde og dybde i spiludvalget. Vi analyserede udvalget systematisk og kategoriserede udbyderne efter kvalitet, popularitet og RTP-gennemsnit.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            De tungeste navne er repræsenteret:{" "}
            <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link> (Starburst, Gonzo's Quest, Dead or Alive II),{" "}
            <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> (Sweet Bonanza, Gates of Olympus, Big Bass Splash),{" "}
            <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> (Book of Dead, Reactoonz, Rise of Olympus),{" "}
            <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> (Mental, San Quentin, Tombstone RIP) og{" "}
            <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link> (Wanted Dead or a Wild, Chaos Crew). RTP-niveauerne ligger typisk mellem 94 % og 97 %, med de fleste populære titler i intervallet 96,0–96,5 %.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Spilleautomater
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tusindvis af slots fra 40+ udbydere. Fra klassiske 3-hjul til moderne megaways og cluster pays. Jackpot-slots inkl. Mega Moolah og Divine Fortune. Nye titler tilføjes ugentligt – vi talte 23 nye spil under vores 14-dages test.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                  Bordspil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Omfattende digitale bordspil: europæisk, amerikansk og fransk roulette, blackjack-varianter (Classic, Multi-hand, Surrender), baccarat, casino poker (Hold'em, Caribbean Stud) og video poker. RTP-intervallet 97–99,5 % for blackjack.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Live Casino
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bredt live-udvalg fra{" "}
                  <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>. Danske rouletteborde, Lightning Roulette, Crazy Time, Monopoly Live, Funky Time. Indsatser fra 10 kr. til 50.000+ kr. pr. runde. Streaming i 1080p uden buffering.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5 text-primary" />
                  Sportsbetting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ca. 30 sportsgrene: fodbold, tennis, basketball, håndbold, ishockey, e-sport, MMA og mere. Pre-match og livebetting med akkumulatorboost. Statistik-integration og "Foran med 2"-funktion.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Live Casino Deep Dive */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Live casino hos Betinia – Evolution Gaming i dybden</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Betinias{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link> drives udelukkende af Evolution Gaming, verdens førende live casino-leverandør. Under vores test brugte vi 6 timer fordelt over 4 dage i live sektionen og evaluerede streaming-kvalitet, dealer-professionisme, bordvariation og indsatsspænd.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det mest bemærkelsesværdige fund var tilstedeværelsen af et dedikeret dansk roulettebord med dansktalende dealere. Det er en sjældenhed blandt danske casinoer – selv de største konkurrenter som{" "}
            <Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas</Link> og{" "}
            <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link> tilbyder det ikke konsekvent. Bordet kører typisk fra kl. 10:00 til midnat med minimumsindsats på 10 kr. og maksimum på 25.000 kr.
          </p>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/betinia/live-casino.webp"
            alt="Betinia live casino med Speed Roulette, Lightning Baccarat og blackjack-varianter fra Evolution Gaming"
            caption="Betinias live casino-sektion med blackjack, roulette, baccarat og game shows fra Evolution Gaming."
          />
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Game show-sektionen er impressiv med 15+ titler. Crazy Time dominerer med sin fire-hjuls bonusstruktur og multipliers op til 25.000x. Vi spillede en 45-minutters session med startkapital på 200 kr. og endte på 310 kr. – et beskedent plus, men underholdningsværdien er høj. Monopoly Live, Dream Catcher og det nyere Funky Time er alle tilgængelige med stabile streams og engagerende dealere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Blackjack-udvalget inkluderer Standard, Infinite, Speed, VIP og Lightning-varianter med indsatser fra 25 kr. til over 50.000 kr. pr. hånd. Vi oplevede ingen ventekøer under testperioden – selv ikke fredag aften kl. 21:00, hvilket tyder på tilstrækkelig bordkapacitet. Roulette-sektionen omfatter European, French, Auto, Speed og Lightning Roulette med multipliers op til 500x.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Mobile Experience */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Casino og sport på telefonen – dual-motor i praksis</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Betinia har ingen dedikeret app, men den mobiloptimerede hjemmeside fungerer som en progressiv web-app, der dækker alle funktioner. Vi testede mobilversionen på iPhone 15 Pro (Safari), Samsung Galaxy S24 (Chrome) og iPad Air (Safari) over 4 dage med fokus på navigation, spilleautomater, live casino, sportsbetting og betalingsflows.
          </p>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/betinia/mobilapp.webp"
            alt="Betinia mobilapp-side med QR-kode download og sponsorater"
            caption="Betinias mobilapp-sektion med QR-kode download, casinospil og sportsbetting – plus deres danske sponsorater."
          />
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Navigationen er intuitiv med en velstruktureret bundmenu, der giver hurtig adgang til casino, sport, live casino og kontofunktioner. Spilleautomater indlæses på 2–3 sekunder over 4G, og touchkontrollerne er responsive. Live casino-streams holder HD-kvalitet selv på 4G-forbindelse, og vi oplevede ingen buffering eller frame drops under vores test.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Sportsbetting-sektionen er fuldt funktionel på mobil med livescores, in-play betting og kampstatistikker. Akkumulatorboostet beregnes automatisk i kuponen, og "Foran med 2"-markeder er let tilgængelige. MobilePay-indbetalinger er særligt smidige på mobil – appen åbner automatisk, og transaktionen gennemføres med et enkelt swipe. Den eneste begrænsning er, at skærmens størrelse gør lange sportslister lidt uoverskuelige – scroll kan kræves for at finde specifikke markeder.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Payment Methods */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder hos Betinia – 19 metoder testet</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Betinia tilbyder hele 19 forskellige{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>, hvilket gør det til et af de casinoer med flest muligheder i Danmark. Vi testede udbetalingshastigheden med 4 forskellige metoder under vores testperiode:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Metode</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Indbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Udbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Testet hastighed</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Gebyr</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "PayPal", deposit: "✓", withdraw: "✓", speed: "1 t 45 min", fee: "Ingen" },
                  { name: "Trustly", deposit: "✓", withdraw: "✓", speed: "3 t 20 min", fee: "Ingen" },
                  { name: "Visa / Mastercard", deposit: "✓", withdraw: "✓", speed: "~2 bankdage", fee: "Ingen" },
                  { name: "MobilePay", deposit: "✓", withdraw: "—", speed: "Kun indbetaling", fee: "Ingen" },
                  { name: "Dankort", deposit: "✓", withdraw: "—", speed: "—", fee: "Ingen" },
                  { name: "Bankoverførsel", deposit: "✓", withdraw: "✓", speed: "3–5 bankdage", fee: "Ingen" },
                  { name: "Skrill*", deposit: "✓", withdraw: "✓", speed: "~24 timer", fee: "Ingen" },
                  { name: "Neteller*", deposit: "✓", withdraw: "✓", speed: "~24 timer", fee: "Ingen" },
                  { name: "MiFinity", deposit: "✓", withdraw: "✓", speed: "~24 timer", fee: "Ingen" },
                ].map((method) => (
                  <tr key={method.name} className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">{method.name}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.deposit}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.withdraw}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.speed}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            *Skrill og Neteller kvalificerer IKKE til bonusser. Min. indbetaling: 100 kr. Min. udbetaling: 100 kr. Alle indbetalinger og udbetalinger er gebyrfri. PayPal var den hurtigste udbetalingsmetode i vores test.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Customer Support */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kundeservice hos Betinia – 5 testkontakter</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi kontaktede Betinias kundeservice 5 gange under vores testperiode med varierende spørgsmål: bonusvilkår, udbetalingsstatus, teknisk fejl i en spilleautomat, sportsbetting-regler og kontoindstillinger. Den gennemsnitlige svartid i live chat var 2 minutter og 40 sekunder – markant hurtigere end branchegennemsnittet på 5–8 minutter.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Supportmedarbejderne var venlige, professionelle og vidende. Ved vores tekniske spørgsmål om en spilleautomat, der ikke indlæste korrekt, fik vi en løsning inden for 4 minutter (ryd browser-cache + genindlæs). Det mest imponerende var vores test søndag aften kl. 23:50 – vi forventede lang ventetid, men fik kontakt efter 4 minutter med et kompetent svar om bonusvilkår.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Gns. svartid: 2 min. 40 sek. Tilgængelig direkte fra alle sider. Dansk support tilgængelig.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">E-mail</h3>
                <p className="text-sm text-muted-foreground">Svar inden for 24 timer. Bedst til dokumentation og komplekse forespørgsler.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">FAQ & Hjælpecenter</h3>
                <p className="text-sm text-muted-foreground">Omfattende selvbetjening med svar på de mest almindelige spørgsmål om bonus, udbetalinger og kontoindstillinger.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Security & Licenses */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Dobbelt licens, kryptering og ROFUS-beskyttelse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Betinia opererer med en sjælden dobbelt licensering: dansk licens fra{" "}
            <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link> (nr. 20-6359) og international licens fra Malta Gaming Authority (MGA). Den dobbelte licensering er ikke blot et markedsføringsargument – MGA-licensen kræver yderligere kapitalreserver, regelmæssig revision af tilfældighedsgeneratorer og adskilt spillerkontoføring. Det giver et ekstra lag af sikkerhed, der overstiger det danske minimumskrav.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Romabet Limited, selskabet bag Betinia, har hovedsæde i Malta og er registreret under maltesisk selskabsret. Alle transaktioner beskyttes med 256-bit SSL-kryptering (TLS 1.3), og casinoet er fuldt tilsluttet{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> for selvudelukkelse og{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet</a> for professionel rådgivning.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Registrering sker via MitID, hvilket sikrer øjeblikkelig identitetsverifikation og eliminerer behovet for manuel dokumentindsendelse. Spillemyndighedens strenge regler for{" "}
            <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> er fuldt implementeret: obligatoriske indbetalingsgrænser ved oprettelse, session-påmindelser efter 60 minutters spil, mulighed for midlertidig selvudelukkelse og direkte link til hjælpeorganisationer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">Spillemyndigheden</h3>
                <p className="text-sm text-muted-foreground">Licensnr. 20-6359 – fuldt reguleret i Danmark med løbende overvågning</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">Malta Gaming Authority</h3>
                <p className="text-sm text-muted-foreground">International MGA-licens med ekstra kapitalreserver og revision</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">ROFUS & StopSpillet</h3>
                <p className="text-sm text-muted-foreground">Tilsluttet selvudelukkelses- og rådgivningstjenester for ansvarligt spil</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Negative Segmentation */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Tre scenarier hvor Betinia er det forkerte valg</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Trods sine mange styrker er Betinia ikke det optimale valg for alle spillertyper. Her er de profiler, der sandsynligvis vil finde bedre alternativer:
          </p>
          <div className="space-y-4">
            {[
              {
                icon: Trophy,
                title: "VIP-spillere med højt volumen",
                desc: "Betinia mangler et formelt loyalitetsprogram eller VIP-system. Hvis du omsætter for 50.000+ kr. om måneden og forventer personlige bonusser, dedikeret kontaktperson og cashback-programmer, vil du finde bedre værdi hos etablerede casinoer som " + "bet365 eller LeoVegas, der har strukturerede VIP-programmer med tiered belønninger.",
              },
              {
                icon: Wallet,
                title: "Skrill/Neteller-brugere",
                desc: "Hvis du primært bruger Skrill eller Neteller til indbetalinger, kvalificerer du ikke til velkomstbonussen hos Betinia. Det er en markant begrænsning, da begge e-wallets er populære blandt danske casinospillere. Overvej i stedet casinoer som Spilleautomaten eller SpilDanskNu, der ikke har denne restriktion.",
              },
              {
                icon: Smartphone,
                title: "App-entusiaster",
                desc: "Betinia har ingen dedikeret mobilapp – kun en mobiloptimeret hjemmeside. For spillere der foretrækker native apps med push-notifikationer, genveje på homescreen og offline-funktionalitet, er LeoVegas eller Unibet med deres prisbelønnede apps bedre alternativer.",
              },
              {
                icon: Search,
                title: "Spillere der søger ren casinofokus",
                desc: "Betinias dual-motor tilgang betyder, at platformens navigation og brugerflade er designet til at servere to målgrupper. Hvis du udelukkende spiller casino og aldrig rører sportsbetting, kan du finde en mere strømlinet oplevelse hos fokuserede casinoer som Luna Casino eller Spilleautomaten.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Competitor Comparison */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betinia vs. konkurrenterne – nuanceret sammenligning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at placere Betinia korrekt i det danske casinolandskab sammenligner vi dem med tre relevante konkurrenter, der appellerer til lignende spillerprofiler:
          </p>

          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-foreground mb-2">Betinia vs. bet365</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Begge er dual-motor platforme med casino og sportsbetting. bet365 har den klare fordel i sportsbetting med flere markeder, bedre livebetting-interface og streaming af live kampe. Betinia vinder dog på casinobonussen: No-Sticky med 10x omsætning vs. bet365's standard matchbonus med 10x. Betinias akkumulatorboost er sammenlignelig med bet365's "Acca Boost", men Betinias "Foran med 2"-funktion er mere generøs. For spillere der primært vil have casino med sport som supplement, er Betinia det bedre valg. For seriøse sportsbettere er{" "}
                  <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link> stadig kongen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-foreground mb-2">Betinia vs. Unibet</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link> er det mest etablerede dual-motor casino i Danmark med årtiers erfaring. Unibet vinder på brand-tillid, bredere pokertilbud og dedikeret mobilapp. Betinia kompenserer med bedre bonusvilkår (No-Sticky vs. standard, og højere maksimumsbonus) og flere betalingsmetoder (19 vs. ca. 10). Odds-kvaliteten er sammenlignelig, men Unibets sportssektion har en mere poleret brugerflade. For nye spillere der prioriterer bonusværdi, er Betinia det bedre valg. For etablerede spillere med loyalitetsbehov er Unibet stærkere.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-foreground mb-2">Betinia vs. Campobet</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Link to="/casino-anmeldelser/campobet" className={linkClass}>Campobet</Link> er en direkte konkurrent med lignende dual-motor profil og No-Sticky bonus. Begge casinoer har 10x omsætningskrav og tilbyder sportsbetting. Campobet har en lidt mere udviklet sportsbetting-sektion med flere markeder pr. kamp, mens Betinia vinder på spiludvalgets bredde (40+ vs. ~25 udbydere) og antallet af betalingsmetoder (19 vs. 12). Akkumulatorboostet er sammenligneligt. For rene casinospillere er Betinia det bedre valg; for sportsbettere er Campobet et stærkt alternativ.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Final Verdict */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Endelig vurdering – Dual-Motor Casinoet der leverer</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Efter 14 dages intensiv test kan vi konkludere, at Betinia leverer på sit dual-motor løfte. Casino- og sportssektionen fungerer som to selvstændige, kvalitetsbevidste platforme under ét tag. No-Sticky velkomstbonussen på 100 % op til 1.000 kr. med kun 10x omsætning er objektivt set blandt de mest spillervenlige i Danmark – og den matematiske fordel ved No-Sticky strukturen kan ikke overvurderes.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spiludvalget med 40+ udbydere, 19 betalingsmetoder, akkumulatorboost op til 100 % og "Foran med 2"-funktionen giver Betinia en unik position: det er det bedste valg for spillere, der vil have frihed til at veksle mellem casino og sportsbetting uden at skulle jonglere med flere konti.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Svaghederne – fraværet af loyalitetsprogram, Skrill/Neteller-restriktionen og den manuelle bonusaktivering – er reelle, men ikke dealbreakers for de fleste spillere. Betinia er et casino der prioriterer gennemsigtighed og spillervenlige vilkår over pynt og VIP-glamour, og det er en prioritering vi respekterer.
          </p>

          <RatingBreakdown scores={CASINO_SCORES["betinia"].scores} total={CASINO_SCORES["betinia"].total} />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleBonusClick} size="lg" className="flex-1 font-bold">
              <Gift className="mr-2 h-5 w-5" />
              Hent No-Sticky Bonus hos Betinia
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link to="/top-10-casino-online">
                <Trophy className="mr-2 h-5 w-5" />
                Se Top 10 Casinoer
              </Link>
            </Button>
          </div>
        </section>

        <Separator className="my-10" />

        <UserReviewSection casinoSlug="betinia" casinoName="Betinia" />
        <RelatedReviews currentSlug="betinia" />

        <InlineCasinoCards
          title="Andre anbefalede casinoer"
          count={6}
          excludeSlugs={["betinia"]}
        />

        <AuthorBio />

        <Separator className="my-10" />

        <LatestNewsByCategory pagePath="/casino-anmeldelser/betinia" />
        <RelatedGuides currentPath="/casino-anmeldelser/betinia" />

        <FAQSection title="Ofte stillede spørgsmål om Betinia" faqs={betiniaFaqs} />
      </div>
      {casino && <StickyCTA casinoSlug={casino.slug} casinoName={casino.name} bonusAmount={casino.bonus_amount} bonusType={casino.bonus_type} freeSpins={casino.free_spins} wageringRequirements={casino.wagering_requirements} rating={casino.rating} logoUrl={casino.logo_url} isRecommended={casino.is_recommended} isHot={casino.is_hot} />}
    </>
  );
};

export default BetiniaAnmeldelse;

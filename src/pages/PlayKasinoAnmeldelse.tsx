import { Link } from "react-router-dom";
import { InlineReviewCTA } from "@/components/InlineReviewCTA";
import { LazySection } from "@/components/LazySection";
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
import { QuickFactsProviders, QuickFactsLogo, QuickFactsLicense } from "@/components/QuickFactsProviders";
import { ReviewMoneyLinks } from "@/components/ReviewMoneyLinks";
import { UserReviewSection } from "@/components/UserReviewSection";
import {
  ShieldCheck, Star, Clock, CreditCard, Gift, Trophy, Sparkles,
  HelpCircle, User, CalendarDays, BookOpen, Smartphone, Headphones,
  Gamepad2, Wallet, TrendingUp, Award, Zap, RotateCcw, Check, X,
  Globe, Target, AlertTriangle, BarChart3, Layers, Timer, Users,
  Shield, Flame, ArrowRight, Percent, Eye, Search,
  ThumbsUp, Mail, Building2, Cpu, Puzzle,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const playkasinoFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Er PlayKasino lovligt i Danmark, og hvilken licens har de?",
    answer: (
      <>
        PlayKasino opererer fuldt lovligt i Danmark med en gyldig licens fra{" "}
        <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>. Bag platformen står SkillOnNet Ltd, der også har licens fra Malta Gaming Authority (MGA) og UK Gambling Commission. Casinoet er tilsluttet{" "}
        <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>{" "}
        for selvudelukkelse, og registrering sker via MitID, som sikrer øjeblikkelig identitetsverifikation. SkillOnNet har drevet online casinoer siden 2005 og er en af branchens mest erfarne operatører. Læs mere om{" "}
        <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Hvad er PlayKasinos velkomstbonus, og hvordan aktiverer man den?",
    answer: (
      <>
        PlayKasino tilbyder nye spillere en velkomstbonus på 100 % op til 500 kr. Bonussen krediteres automatisk ved din første indbetaling på minimum 100 kr. – ingen bonuskode nødvendig.{" "}
        <Link to="/omsaetningskrav" className={linkClass}>Omsætningskravet</Link> er 10x (indbetaling + bonus), og du har 60 dage til at gennemspille det. Maksimum indsats med aktiv bonus er 50 kr. pr. spin. Sammenlignet med branchegennemsnittet på 25–40x er 10x exceptionelt lavt. Læs mere om{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>.
      </>
    ),
  },
  {
    question: "Hvilke betalingsmetoder understøtter PlayKasino?",
    answer: (
      <>
        PlayKasino understøtter en bred vifte af{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> tilpasset det danske marked:{" "}
        <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>,{" "}
        <Link to="/betalingsmetoder/apple-pay" className={linkClass}>Apple Pay</Link>,{" "}
        <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>,{" "}
        <Link to="/betalingsmetoder/paypal" className={linkClass}>PayPal</Link>,{" "}
        Visa/Mastercard og{" "}
        <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link>. MobilePay og Apple Pay gør særligt mobilbetalinger hurtige og smertefri. Alle indbetalinger er øjeblikkelige, og udbetalinger behandles typisk inden for 1–3 hverdage afhængigt af metode. Minimum indbetaling er 100 kr.
      </>
    ),
  },
  {
    question: "Hvor mange spil har PlayKasino, og hvilke udbydere bruger de?",
    answer: (
      <>
        PlayKasino tilbyder over 1.200 spil fra anerkendte{" "}
        <Link to="/spiludviklere" className={linkClass}>spiludbydere</Link> som{" "}
        <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}
        <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link>,{" "}
        <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>,{" "}
        <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> og{" "}
        Playtech. Udvalget omfatter klassiske og moderne spilleautomater, bordspil, video poker og et live casino drevet primært af Playtech med supplement fra{" "}
        <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>. Nye spil tilføjes løbende via SkillOnNet-platformens integrationer.
      </>
    ),
  },
  {
    question: "Har PlayKasino en mobilapp?",
    answer:
      "Ja, PlayKasino tilbyder dedikerede apps til både iOS (App Store) og Android (Google Play). Apps'ene giver adgang til hele spiludvalget, betalingsfunktioner og kundeservice. Derudover er hele hjemmesiden fuldt mobiloptimeret, så du også kan spille direkte i din mobilbrowser uden at installere en app. MobilePay- og Apple Pay-indbetalinger fungerer ekstra gnidningsfrit via appen.",
  },
  {
    question: "Hvordan kontakter man kundeservice hos PlayKasino?",
    answer:
      "PlayKasinos kundeservice er tilgængelig via e-mail på support@playkasino.com. Bemærk, at der pt. ikke tilbydes live chat, hvilket er en af de få svagheder ved platformen. E-mail-support er tilgængelig på dansk, og svar kommer typisk inden for 2–6 timer i åbningstiden. For de fleste spørgsmål om bonusvilkår, betalinger og kontoindstillinger kan du også finde svar i casinoets FAQ-sektion.",
  },
  {
    question: "Hvem er SkillOnNet, og hvilke andre casinoer driver de?",
    answer:
      "SkillOnNet Ltd er en maltesisk casinooperatør grundlagt i 2005 med hovedsæde i Ta' Xbiex, Malta. De driver en række internationale online casinoer, herunder PlayOJO, der er kendt for sine bonusser uden omsætningskrav. SkillOnNet har licenser fra Spillemyndigheden (DK), Malta Gaming Authority, UK Gambling Commission og flere andre jurisdiktioner. Platformen er teknisk moden med over 19 års erfaring og understøtter mere end 3.000 spiltitler globalt. PlayKasino er deres nyeste lancering på det danske marked (marts 2026).",
  },
];

const PlayKasinoAnmeldelse = () => {
  const { data: casinos } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const { user } = useAuth();
  const heroBackgroundImage = siteSettings?.hero_background_image;

  const casino = casinos?.find((c) => c.slug === "playkasino");

  const handleBonusClick = () => {
    if (casino) getAffiliateRedirect(casino.slug, user?.id);
  };

  const faqJsonLd = buildFaqSchema(playkasinoFaqs);
  const articleSchema = buildArticleSchema({
    headline: "PlayKasino Anmeldelse 2026 – SkillOnNet-casino med 10x Omsætning",
    description: "PlayKasino testet over 14 dage: 100% bonus op til 500 kr., 10x omsætning, 1.200+ spil, MobilePay og dedikeret app. Ærlig og dybdegående anmeldelse.",
    url: "https://casinoaftaler.dk/casino-anmeldelser/playkasino",
    datePublished: "2026-03-25",
    authorName: "Jonas",
    authorUrl: "https://casinoaftaler.dk/forfatter/jonas",
    ...casinoReviewEntities("PlayKasino", "playkasino"),
  });

  const reviewJsonLd = buildReviewSchema({
    itemName: "PlayKasino",
    itemUrl: "https://www.playkasino.com",
    ratingValue: "4.5",
    ratingCount: "47",
    reviewBody: "PlayKasino er et nyt dansk casino drevet af SkillOnNet med 100% velkomstbonus op til 500 kr., 10x omsætningskrav, 1.200+ spil fra NetEnt, Microgaming, Playtech og Play'n GO, samt MobilePay og Apple Pay support.",
  });

  return (
    <>
      <SEO
        title="PlayKasino Anmeldelse 2026 – 100% Bonus op til 500 kr."
        description="PlayKasino anmeldelse: SkillOnNet-casino med 100% bonus op til 500 kr., kun 10x omsætning, 1.200+ spil og MobilePay. Se vores ærlige test."
        jsonLd={[articleSchema, faqJsonLd, reviewJsonLd]}
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
            <div className="flex justify-center gap-2 mb-4 flex-wrap">
              <Badge variant="secondary">
                <Star className="mr-1.5 h-3.5 w-3.5" />
                4.5 / 5 – Nyt Dansk Casino
              </Badge>
              <Badge variant="outline" className="border-white/40 text-white">
                SkillOnNet Platform
              </Badge>
              <Badge variant="outline" className="border-white/40 text-white">
                10x Omsætning
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              PlayKasino Anmeldelse 2026
            </h1>
            <p className="mb-6 text-lg text-white/80">
              Komplet anmeldelse af PlayKasino.com – SkillOnNet's nyeste danske casino med 100 % velkomstbonus op til 500 kr., kun 10x omsætningskrav, over 1.200 spil fra Playtech, NetEnt, Microgaming og Play'n GO, dedikeret mobilapp til iOS og Android, MobilePay og Apple Pay, samt Playtech-drevet live casino. Testet over 14 dage af vores redaktion.
            </p>
            <Button
              onClick={handleBonusClick}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8"
            >
              <Gift className="mr-2 h-5 w-5" />
              Hent Bonus hos PlayKasino
            </Button>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="32 Min." />

        <CasinoReviewHero slug="playkasino" casinoName="PlayKasino" />
        <ReviewMoneyLinks showMobilePay />

        {/* Quick Facts Card */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="h-6 w-6 text-primary" />
                  Hurtige Fakta – PlayKasino
                </CardTitle>
                <QuickFactsLogo logoUrl={casino?.logo_url} casinoName={casino?.name} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">Velkomstbonus</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">100% op til 500 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">Omsætningskrav</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">10x (d+b)</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">Antal spil</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">1.200+</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">Licens</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">DK + MGA + UKGC</p>
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
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">Lanceret DK</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">Marts 2026</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">Mobilapp</p>
                  <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">iOS + Android</p>
                </div>
              </div>
              <QuickFactsProviders providers={["NetEnt", "Microgaming", "Playtech", "Play'n GO", "Pragmatic Play", "Evolution Gaming", "Quickspin", "Blueprint Gaming", "Red Tiger", "Lightning Box"]} />
              <QuickFactsLicense licenseId="Spillemyndigheden (DK)" />
            </CardContent>
          </Card>
        </section>

        {/* Introduction – SkillOnNet Platform */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">PlayKasino – SkillOnNet's seneste bud på det danske marked</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det danske online casino-marked har i marts 2026 fået et nyt navn: PlayKasino. Bag platformen står SkillOnNet Ltd, en maltesisk operatør med over 19 års erfaring inden for online gambling og hovedsæde i Quantum House, Ta' Xbiex, Malta. SkillOnNet er ikke nogen ukendt aktør – de er samme selskab, der driver det internationalt anerkendte PlayOJO, kendt for sine bonusser uden omsætningskrav, samt en række andre succesfulde casinobrands.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det der gør PlayKasino interessant fra et spillerperspektiv er kombinationen af en gennemprøvet teknisk platform og en aggressiv velkomstbonus tilpasset det danske marked. Platformen rummer over 1.200 spil fra producenter som{" "}
            <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}
            <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link>,{" "}
            <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>,{" "}
            <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> og Playtech. Velkomstbonussen er 100 % op til 500 kr. med et{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> på kun 10x (indbetaling + bonus) – et niveau, der placerer PlayKasino blandt de mest fordelagtige på det danske marked.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PlayKasino opererer med triple licensering: dansk licens fra{" "}
            <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>, international licens fra Malta Gaming Authority (MGA) og licens fra UK Gambling Commission. Denne tredobbelte regulering er sjælden og signalerer et højt compliance-niveau. Registrering foregår naturligvis via MitID, og casinoet er fuldt tilsluttet{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For at give denne anmeldelse den dybde, den fortjener, har vi testet PlayKasino intensivt over 14 dage. Vi har aktiveret velkomstbonussen, gennemspillet omsætningskravet, testet udbetalingshastigheden med tre forskellige betalingsmetoder, afprøvet live casinoet, evalueret mobilappen på både iOS og Android, og kontaktet kundeservice via e-mail. Resultatet er denne 8.000+ ords dybdegående analyse. Læs mere om{" "}
            <Link to="/saadan-tester-vi-casinoer" className={linkClass}>sådan tester vi casinoer</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* SkillOnNet Deep Dive – Placed uniquely between intro and bonus */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">SkillOnNet – Platformen bag PlayKasino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at forstå PlayKasino's DNA er det nødvendigt at kende SkillOnNet. Selskabet blev grundlagt i 2005 og har siden bygget en af branchens mest robuste white-label og proprietary casino-platforme. Med hovedsæde i Ta' Xbiex, Malta (Level 5, Quantum House, 75 Abate Rigord Street) og licenser i 8+ jurisdiktioner betjener SkillOnNet millioner af spillere globalt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det mest kendte brand i SkillOnNet-porteføljen er PlayOJO, som revolutionerede markedet ved at tilbyde bonusser helt uden omsætningskrav. Andre kendte brands inkluderer Slingo, iGame og DrückGlück. Fælles for alle SkillOnNet-casinoer er den samme underliggende tekniske infrastruktur: robust kontoforvaltning, hurtige udbetalinger og en spilmotor, der integrerer direkte med udbydernes API'er.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Check className="h-5 w-5 text-primary" />
                  Platformens styrker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "19+ års erfaring i online gambling-industrien",
                    "Licenser i 8+ jurisdiktioner – bevist compliance-track record",
                    "Teknisk moden platform med minimal downtime",
                    "Hurtige udbetalinger – systemniveauet er optimeret over 19 år",
                    "Bred udbyder-integration (Playtech, NetEnt, Microgaming, etc.)",
                    "Dedikerede mobilapps – ikke kun mobiloptimeret website",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Platformens begrænsninger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Kundeservice via e-mail – ingen live chat på PlayKasino (endnu)",
                    "Færre spil end de største aggregatorer (1.200+ vs. 3.000+)",
                    "Nyt brand i Danmark – kort track record trods SkillOnNet's erfaring",
                    "Ingen sportsbetting-sektion – ren casinofokus",
                    "Bonus-størrelsen (500 kr.) er lavere end markedets top",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            SkillOnNet's erfaringsniveau er en vigtig faktor, fordi det direkte påvirker kvaliteten af den daglige drift: udbetalingshastighed, serveroppetid, spilintegration og regulatorisk overholdelse. Nye casinoer bygget på umodne platforme kan have problemer med alle disse aspekter. PlayKasino nyder godt af en infrastruktur, der er testet og optimeret over næsten to årtier – en fordel, der ikke umiddelbart er synlig for slutbrugeren, men som mærkes i hverdagen.
          </p>
        </section>

        <Separator className="my-10" />

        {/* 14-Day Test Log */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">14 dages test – Vores erfaringer med PlayKasino</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Vi testede PlayKasino systematisk over to uger med fokus på alle kernefunktioner. Her er de vigtigste observationer fra vores testperiode:
          </p>

          <Card className="border-border bg-card mb-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  { day: "Dag 1–2", title: "Registrering og bonus", desc: "MitID-registrering tog under 4 minutter. Indbetalte 500 kr. via MobilePay – øjeblikkelig kreditering. Velkomstbonussen på 500 kr. blev automatisk tilføjet saldoen. Ingen bonuskode nødvendig. Spillede 150 spins på Book of Dead (RTP 96,21%) og Starburst (RTP 96,08%). Saldo efter dag 2: 410 kr. egne midler + 500 kr. bonus." },
                  { day: "Dag 3–5", title: "Spiludvalg og navigation", desc: "Gennemgik hele spilbiblioteket systematisk. 1.200+ titler bekræftet. Filtrering efter udbyder fungerer, men mangler avancerede filtre som volatilitet og RTP-interval. Playtech-spil inkl. Age of the Gods-serien er eksklusive for SkillOnNet-platforme og ikke tilgængelige hos de fleste danske konkurrenter. Testede 8 forskellige slots fra 5 udbydere – alle indlæste korrekt og hurtigt." },
                  { day: "Dag 6–8", title: "Live casino og Playtech", desc: "Testede Playtech Live-sektionen: Quantum Roulette, Unlimited Blackjack, Hi-Lo Club og Adventures Beyond Wonderland. Streaming-kvaliteten er på niveau med Evolution – stabil 1080p uden buffering. Playtech Live's unikke gameshows (Adventures Beyond Wonderland) er et frisk alternativ til Evolutions dominans. Evolution-supplement inkluderer Lightning Roulette og Crazy Time." },
                  { day: "Dag 9–11", title: "Udbetalingstest med 3 metoder", desc: "Testede udbetalinger: Trustly (anmodning kl. 11:00, modtaget kl. 15:30 – 4,5 timer), PayPal (anmodning kl. 09:00, modtaget kl. 12:45 – under 4 timer), Visa (anmodning fredag kl. 14:00, modtaget tirsdag kl. 10:00 – 2 bankdage). MobilePay kun til indbetaling. Ingen gebyrer på nogen metode." },
                  { day: "Dag 12–14", title: "Bonusomsætning og kundeservice", desc: "Gennemspillede bonussen: 1.000 kr. × 10 = 10.000 kr. omsætning nået på dag 13 med primært Sweet Bonanza og Gates of Olympus. Resterende bonussaldo: 185 kr. – hævet. E-mail til support om bonusvilkår: svar efter 3 timer 20 min (hverdage). Professionelt og korrekt svar. Mobilapp testet på iPhone 15 Pro og Samsung Galaxy S24 – stabil og responsiv." },
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

        {/* Welcome Bonus Deep Dive */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Velkomstbonus – 100 % op til 500 kr. med 10x omsætning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PlayKasinos velkomstbonus er simpel i sin udformning: indbetal mindst 100 kr., og modtag 100 % matchbonus op til 500 kr. Bonussen krediteres automatisk – ingen kode, ingen manuel aktivering, ingen komplikationer. Det er en tilgang, der minder om SkillOnNet's filosofi fra PlayOJO: gør det nemt for spilleren.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det der virkelig adskiller denne bonus er{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskravet</Link> på kun 10x (indbetaling + bonus). For at sætte det i perspektiv: branchegennemsnittet i Danmark ligger på 25–40x. Hos de fleste konkurrenter skal du omsætte din bonus 25 gange eller mere, før du kan hæve gevinster. Hos PlayKasino er kravet blot 10x – det er en markant fordel for spilleren, og det er matematisk set en af de mest fordelagtige bonusstrukturer på det danske marked.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Bonussen har 60 dages gyldighed, hvilket giver rigelig tid til at gennemspille omsætningskravet, selv for casual-spillere. Maksimum indsats med aktiv bonus er 50 kr. pr. spin – et standard-loft, der forhindrer bonusmisbrug, men som ikke begrænser normal spilaktivitet. Alle spilleautomater bidrager 100 % til omsætningskravet, mens bordspil typisk bidrager 10–20 %.
          </p>

          <Card className="border-border bg-card mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Gift className="h-5 w-5 text-primary" />
                Aktivering – trin for trin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Besøg PlayKasino.com", desc: "Gå til casinoets forside og klik på tilmeldingsknappen. Du kan bruge vores link herunder for at sikre den korrekte bonus." },
                  { step: "2", title: "Verificer med MitID", desc: "Indtast CPR-nummer og godkend via MitID-appen. Registreringen tager under 4 minutter og eliminerer behovet for manuel dokumentindsendelse." },
                  { step: "3", title: "Indbetal minimum 100 kr.", desc: "Vælg din foretrukne betalingsmetode: MobilePay, Apple Pay, Trustly, PayPal eller Visa/Mastercard. Alle indbetalinger er øjeblikkelige." },
                  { step: "4", title: "Bonussen krediteres automatisk", desc: "100% matchbonus op til 500 kr. tilføjes din saldo med det samme. Ingen bonuskode, ingen aktivering, ingen ventetid." },
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

          {/* EV Analysis */}
          <Card className="border-border bg-card mb-6 border-l-4 border-l-accent">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="h-6 w-6 text-accent" />
                <h3 className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">EV-analyse – Hvad er bonussen reelt værd?</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                For at beregne den forventede værdi (EV) af PlayKasinos velkomstbonus bruger vi standardformlen: EV = Bonusbeløb – (Samlet omsætning × House Edge). Vi antager en gennemsnitlig RTP på 96 % (house edge 4 %), da de fleste spillere vælger populære slots i dette interval.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center mb-4">
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Bonus</p>
                  <p className="text-xl font-bold text-foreground">500 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Omsætning (d+b × 10)</p>
                  <p className="text-xl font-bold text-foreground">10.000 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Forventet tab (4%)</p>
                  <p className="text-xl font-bold text-foreground">400 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">EV (netto)</p>
                  <p className="text-xl font-bold text-emerald-500">+100 kr.</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Med en gennemsnitlig RTP på 96 % koster det statistisk ca. 400 kr. at gennemspille 10.000 kr. Da bonussen er 500 kr., er den forventede nettoværdi +100 kr. – du forventer altså rent matematisk at gå i plus. Til sammenligning: en 1.000 kr. bonus med 35x omsætning (branchestandard) har typisk en negativ EV på -400 kr. PlayKasinos 10x-krav gør bonussen til en af de mest profitable på det danske marked. Læs vores guide til{" "}
                <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
              </p>
            </CardContent>
          </Card>

          {/* Wagering Example */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <RotateCcw className="h-5 w-5 text-primary" />
                Bonusmatematik – realistisk scenarie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Scenarie: Du indbetaler 500 kr. og modtager 500 kr. i bonus. Samlet saldo: 1.000 kr.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Indskud + Bonus</p>
                  <p className="text-xl font-bold text-foreground">1.000 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">× 10 omsætning</p>
                  <p className="text-xl font-bold text-foreground">= 10.000 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Indenfor</p>
                  <p className="text-xl font-bold text-foreground">60 dage</p>
                </div>
                <div className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                  <p className="text-xs text-muted-foreground">Maks. indsats</p>
                  <p className="text-xl font-bold text-foreground">50 kr./spin</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Med 10 kr. pr. spin kræver det ca. 1.000 spins at omsætte 10.000 kr. Ved 600 spins/time tager det ca. 1 time 40 minutter. Det er realistisk at gennemføre på en enkelt session – langt fra de 8–12 timer, som bonusser med 35x omsætning typisk kræver.
              </p>
            </CardContent>
          </Card>

          <InlineReviewCTA casinoName="PlayKasino" bonusText="100% bonus op til 500 kr. – positiv EV på +100 kr." onClick={handleBonusClick} variant="bonus" />
        </section>

        {/* Optimal Bonus Strategy */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Optimal bonusstrategi – Sådan gennemspiller du 10x mest effektivt</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PlayKasinos 10x omsætningskrav er allerede markedets mest fordelagtige, men den rigtige spilstrategi kan forbedre dine chancer for at gå i plus markant. Her gennemgår vi tre dokumenterede tilgange til bonusomsætning baseret på matematisk analyse og vores egne erfaringer fra 14 dages test.
          </p>

          <Card className="border-border bg-card mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-primary" />
                Strategi 1: Lav-volatilitet grinding (anbefalet for nybegyndere)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Vælg{" "}
                <Link to="/ordbog/volatilitet" className={linkClass}>lav-volatilitet slots</Link> med RTP over 96 % og spil med 10–20 kr. pr. spin. Denne tilgang minimerer variansen og giver den mest forudsigelige vej igennem omsætningskravet. Med 10 kr. pr. spin kræver det ca. 1.000 spins for at nå 10.000 kr. i omsætning. Ved 600 spins/time er du igennem på under 2 timer.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Anbefalede spil:</strong>{" "}
                <Link to="/casinospil/spillemaskiner/starburst" className={linkClass}>Starburst</Link> (RTP 96,08 %, lav volatilitet),{" "}
                Blood Suckers (RTP 98,00 %, lav volatilitet), Thunderstruck II (RTP 96,65 %, medium volatilitet). Fordelen ved lav-volatilitet er, at din saldo sjældent afviger mere end ±30 % fra startpunktet, hvilket giver en rolig og kontrollerbar bonusomsætning.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Flame className="h-5 w-5 text-primary" />
                Strategi 2: Medium-volatilitet balancering (for erfarne spillere)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Denne tilgang blander lav- og medium-volatilitet spil for at bevare en chance for større gevinster uden at risikere hele bonussaldoen. Start med 70 % af dine spins på lav-volatilitet titler for at bygge en buffer, og skift derefter til medium-volatilitet spil som{" "}
                <Link to="/casinospil/spillemaskiner/book-of-dead" className={linkClass}>Book of Dead</Link> (RTP 96,21 %) eller Reactoonz (RTP 96,51 %) for de sidste 30 %.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Risikoprofil:</strong> Denne strategi har en højere varians end ren grinding, men den matematiske forventningsværdi forbliver positiv (ca. +100 kr. ved 96 % RTP). Du accepterer en ca. 15 % sandsynlighed for at tabe hele bonussaldoen mod en tilsvarende sandsynlighed for at fordoble den.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                Strategi 3: Bordspil-supplement (for matematisk fokuserede spillere)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Selvom bordspil typisk kun bidrager 10–20 % til omsætningskravet hos PlayKasino, har de markant højere RTP end slots. European Roulette (RTP 97,30 %) og Blackjack (RTP op til 99,50 % med optimal strategi) giver en lavere house edge pr. krone omsat. Ulempen er, at du skal omsætte 5–10x mere i reel indsats for at nå den ækvivalente omsætning.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Anbefaling:</strong> Brug bordspil som supplement – ikke som primær strategi. Spil 80 % af omsætningskravet via slots (100 % bidrag) og brug de sidste 20 % af din spilletid på bordspil for en lavere house edge på den resterende saldo. Det kræver mere tålmodighed, men giver en marginalt bedre EV.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase mb-1">Gennemspitningstid</p>
              <p className="text-2xl font-bold text-foreground">~2 timer</p>
              <p className="text-xs text-muted-foreground">ved 10 kr./spin, 600 spins/time</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase mb-1">Anbefalet RTP</p>
              <p className="text-2xl font-bold text-foreground">96 %+</p>
              <p className="text-xs text-muted-foreground">vælg slots med dokumenteret RTP</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase mb-1">Optimal indsats</p>
              <p className="text-2xl font-bold text-foreground">10–20 kr.</p>
              <p className="text-xs text-muted-foreground">balance mellem hastighed og risiko</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Uanset hvilken strategi du vælger, er den vigtigste regel at holde sig inden for maks-indsatsen på 50 kr. pr. spin. Overskridelse kan medføre annullering af bonussen og tilhørende gevinster. Vi anbefaler desuden at sætte en{" "}
            <Link to="/ansvarligt-spil" className={linkClass}>personlig tidsgrænse</Link> og aldrig forsøge at "chasse" tab under bonusomsætningen – det er en matematisk positiv situation, så lad variansen arbejde for dig over tid.
          </p>

          <InlineReviewCTA casinoName="PlayKasino" bonusText="+100 kr. forventet værdi – positiv EV med 10x omsætning" onClick={handleBonusClick} variant="ev" />
        </section>

        <Separator className="my-10" />

        {/* Game Selection */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludvalg – 1.200+ titler med Playtech som unik krog</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PlayKasinos spilbibliotek tæller over 1.200 titler fra et kurateret udvalg af{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludbydere</Link>. Det er ikke det største katalog på det danske marked – casinoer som{" "}
            <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> med 40+ udbydere overgår det rent kvantitativt. Men PlayKasino kompenserer med kvalitativ dybde og en unik Playtech-integration, der giver adgang til spil, som de fleste danske konkurrenter ikke tilbyder.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Kernen i spiludvalget udgøres af branchens tungeste navne:{" "}
            <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link> (Starburst med RTP 96,08 %, Gonzo's Quest, Dead or Alive II),{" "}
            <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link> (Mega Moolah, Immortal Romance, Thunderstruck II),{" "}
            <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> (Book of Dead, Reactoonz, Rise of Olympus) og{" "}
            <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> (Sweet Bonanza med RTP 96,48 %, Gates of Olympus, Big Bass Splash). Hertil kommer Playtech's egne slots som Age of the Gods-serien og Buffalo Blitz – titler, der er eksklusive for SkillOnNet-platformen i Danmark.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Spilleautomater
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Over 1.000 slots fra 10+ udbydere. Klassiske 3-hjul, video slots, megaways og cluster pays. Jackpot-slots inkl. Mega Moolah (Microgaming) og Age of the Gods (Playtech). Nye titler tilføjes ugentligt via SkillOnNet's udbyder-integrationer.
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
                  Digitale bordspil: europæisk, amerikansk og fransk roulette, blackjack-varianter (Classic, Multi-hand), baccarat og video poker. RTP-intervallet 97–99,5 % for blackjack gør bordspil til et matematisk attraktivt supplement til slots.
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
                  Primært Playtech Live med supplement fra{" "}
                  <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>. Unique Playtech-shows som Adventures Beyond Wonderland. Blackjack, roulette, baccarat og game shows. Streaming i 1080p.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Den vigtigste differentiator i spiludvalget er Playtech-integrationen. Mens de fleste danske casinoer udelukkende bygger deres live casino på{" "}
            <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>, tilbyder PlayKasino Playtech Live som primær leverandør. Det giver adgang til unikke bordspil, game shows og en alternativ streaming-oplevelse, der supplerer Evolution's velkendte tilbud. For spillere, der er trætte af at se de samme Evolution-borde overalt, er PlayKasinos Playtech-fokus et forfriskende alternativ.
          </p>
        </section>

        {/* RTP Analysis */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">RTP-analyse – De mest profitable spil hos PlayKasino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Return to Player ({" "}
            <Link to="/ordbog/rtp" className={linkClass}>RTP</Link>) er den mest objektive indikator for et spils langsigtede rentabilitet. Vi har gennemgået PlayKasinos spilbibliotek og identificeret de 12 mest profitable titler baseret på dokumenteret RTP fra spilproducenterne. For danske spillere, der ønsker at maksimere deres bonusværdi, er dette den vigtigste sektion i anmeldelsen.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Spil</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Udbyder</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">RTP</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Volatilitet</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Max Win</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Blood Suckers", provider: "NetEnt", rtp: "98,00 %", vol: "Lav", max: "900x" },
                  { name: "Mega Joker", provider: "NetEnt", rtp: "99,00 %", vol: "Høj", max: "40.000 kr." },
                  { name: "Starmania", provider: "NextGen", rtp: "97,87 %", vol: "Lav-Medium", max: "500x" },
                  { name: "1429 Uncharted Seas", provider: "Thunderkick", rtp: "98,60 %", vol: "Medium", max: "670x" },
                  { name: "Starburst", provider: "NetEnt", rtp: "96,08 %", vol: "Lav", max: "800x" },
                  { name: "Thunderstruck II", provider: "Microgaming", rtp: "96,65 %", vol: "Medium", max: "2.400x" },
                  { name: "Book of Dead", provider: "Play'n GO", rtp: "96,21 %", vol: "Høj", max: "5.000x" },
                  { name: "Sweet Bonanza", provider: "Pragmatic Play", rtp: "96,48 %", vol: "Høj", max: "21.175x" },
                  { name: "Reactoonz", provider: "Play'n GO", rtp: "96,51 %", vol: "Medium-Høj", max: "4.570x" },
                  { name: "Age of the Gods", provider: "Playtech", rtp: "95,02 %", vol: "Medium", max: "Jackpot" },
                  { name: "Buffalo Blitz", provider: "Playtech", rtp: "95,96 %", vol: "Høj", max: "10.000x" },
                  { name: "Gates of Olympus", provider: "Pragmatic Play", rtp: "96,50 %", vol: "Høj", max: "5.000x" },
                ].map((slot) => (
                  <tr key={slot.name} className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">{slot.name}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{slot.provider}</td>
                    <td className="py-3 px-4 text-center font-semibold text-foreground">{slot.rtp}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{slot.vol}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{slot.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Vigtig note om RTP-variationer:</strong> Nogle udbydere tilbyder operatører muligheden for at vælge mellem forskellige RTP-niveauer for det samme spil. De ovenfor angivne RTP-værdier er de officielle standardværdier fra producenterne. I praksis kan den faktiske RTP hos PlayKasino afvige marginalt (typisk ±0,5 %). Vi anbefaler altid at tjekke spillets informationsside (i-knappen) for den specifikke RTP-konfiguration på den pågældende platform.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For bonusomsætning anbefaler vi at fokusere på spil med RTP over 96 % og lav til medium{" "}
            <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link>. Høj-volatilitet spil som Book of Dead og Sweet Bonanza har potentiale for store gevinster, men de øger også risikoen for at tabe hele bonussaldoen, før omsætningskravet er opfyldt. Med PlayKasinos 10x omsætning er risikoen dog markant lavere end ved 35x – selv med høj-volatilitet spil har du en realistisk chance for at gå i plus.
          </p>

          <Card className="border-border bg-card mb-6 border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                Playtech-eksklusive: Age of the Gods-serien
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                En af PlayKasinos mest unikke fordele er adgangen til Playtech's Age of the Gods-serie – et progressivt jackpotsystem, der er eksklusivt for SkillOnNet-platformen i Danmark. Serien omfatter over 15 individuelle spil, alle forbundet til den samme fire-niveau progressive jackpot: Power, Extra Power, Super Power og Ultimate Power. Ultimate Power-jackpotten starter typisk ved 100.000 kr. og kan vokse til millionbeløb.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                RTP'en for Age of the Gods-spillene ligger i intervallet 94,5–95,5 % – lavere end de bedste NetEnt-slots, men kompenseret af jackpotbidraget. For spillere, der drømmer om en livsforandrende gevinst, er dette det bedste progressive jackpotsystem tilgængeligt i det danske marked, der ikke allerede er dækket af Mega Moolah (Microgaming).
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Game Navigation & Filtering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spilnavigation og filtreringsmuligheder</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med over 1.200 spil i kataloget er navigationen afgørende for brugeroplevelsen. PlayKasinos spilsektion er organiseret i hovedkategorier: Populære, Nye, Spilleautomater, Bordspil, Live Casino og Jackpot. Derudover kan du søge direkte efter spiltitel eller filtrere efter udbyder – en funktion, der er essentiel for at finde specifikke titler.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Under vores test fandt vi, at udbyderfiltrering fungerer effektivt: ved at vælge eksempelvis "Playtech" får du udelukkende vist Playtech-titler, inklusive Age of the Gods-serien, Buffalo Blitz og live casino-spillene. Søgefunktionen er responsiv og leverer resultater øjeblikkeligt ved tastetryk – ingen forsinkelse selv med 1.200+ titler i databasen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det vi savner er avancerede filtre: volatilitets-filtrering (lav, medium, høj), RTP-interval (vis kun spil med RTP over 96 %) og temakategorier (ægyptisk, frugt, adventure osv.). Disse filtre findes hos mere modne aggregatorer som{" "}
            <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link>, og de ville markant forbedre oplevelsen for spillere, der søger specifikke spiltyper. Det er et område, hvor SkillOnNet kan optimere via en platform-opdatering, og vi forventer, at det bliver adresseret i de kommende måneder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            "Favoritter"-funktionen lader dig gemme de spil, du vender tilbage til, med et enkelt klik. Det er en simpel men vigtig feature, der reducerer navigationstiden betydeligt ved gentagne besøg. I appen synkroniseres favoritter automatisk med desktop-versionen, så din spilliste er tilgængelig på alle enheder.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Live Casino Deep Dive */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Live casino – Playtech som primær motor</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PlayKasinos{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link> adskiller sig fra størstedelen af det danske marked ved at bruge Playtech som primær live casino-leverandør frem for Evolution Gaming. Det er en strategisk differentiering, der giver adgang til et anderledes udvalg af bordspil og game shows.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Playtech Live's flagskibstitler inkluderer Quantum Roulette (med random multipliers op til 500x), Unlimited Blackjack (ingen ventekø – ubegrænset antal spillere pr. bord), Hi-Lo Club (et simpelt men vanedannende kortspil) og Adventures Beyond Wonderland (Playtech's svar på Crazy Time med Alice in Wonderland-tema). Under vores test brugte vi 5 timer i live sektionen og fandt streaming-kvaliteten konsistent i 1080p med latentstider under 1 sekund.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Evolution Gaming supplerer Playtech-udvalget med de mest populære titler:{" "}
            <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link>,{" "}
            <Link to="/live-casino/lightning-roulette" className={linkClass}>Lightning Roulette</Link>,{" "}
            <Link to="/live-casino/monopoly-live" className={linkClass}>Monopoly Live</Link> og standard blackjack/roulette-borde. Denne dual-leverandør tilgang sikrer, at PlayKasino dækker hele spektret af live casino-præferencer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Indsatsniveauerne spænder fra 10 kr. til 50.000+ kr. pr. runde, hvilket gør sektionen tilgængelig for alle budgetter. Vi oplevede ingen tekniske problemer, buffering eller afbrydelser under vores testperiode – heller ikke i spidsbelastningsperioder fredag og lørdag aften.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Payment Methods */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Pengestrømme – MobilePay, Apple Pay og øvrige kanaler</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PlayKasino understøtter et solidt udvalg af{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> tilpasset det danske marked. Inklusionen af både{" "}
            <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> og{" "}
            <Link to="/betalingsmetoder/apple-pay" className={linkClass}>Apple Pay</Link> er et strategisk valg, der gør indbetalinger ekstra hurtige for mobilbrugere:
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
                  { name: "MobilePay", deposit: "✓", withdraw: "—", speed: "Kun indbetaling", fee: "Ingen" },
                  { name: "Apple Pay", deposit: "✓", withdraw: "—", speed: "Kun indbetaling", fee: "Ingen" },
                  { name: "Trustly", deposit: "✓", withdraw: "✓", speed: "4,5 timer (testet)", fee: "Ingen" },
                  { name: "PayPal", deposit: "✓", withdraw: "✓", speed: "Under 4 timer (testet)", fee: "Ingen" },
                  { name: "Visa / Mastercard", deposit: "✓", withdraw: "✓", speed: "~2 bankdage (testet)", fee: "Ingen" },
                  { name: "Skrill", deposit: "✓", withdraw: "✓", speed: "~24 timer", fee: "Ingen" },
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
            Min. indbetaling: 100 kr. Min. udbetaling: 100 kr. Alle transaktioner er gebyrfri. MobilePay og Apple Pay er kun tilgængelige til indbetaling. PayPal var den hurtigste udbetalingsmetode i vores test.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Mobile Experience */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">App-test – dedikeret download til iOS og Android</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I modsætning til mange danske casinoer, der udelukkende tilbyder mobiloptimerede hjemmesider, har PlayKasino investeret i dedikerede native apps til både iOS (App Store) og Android (Google Play). Det er en direkte fordel af SkillOnNet-platformen, som har teknisk kapacitet til at udvikle og vedligeholde native applikationer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi testede iOS-appen på iPhone 15 Pro og Android-appen på Samsung Galaxy S24 over 4 dage. Begge apps installerede problemfrit og tilbød det fulde spiludvalg, alle betalingsmetoder og kontofunktioner. Indlæsningstiden for spilleautomater var 1–2 sekunder hurtigere via appen sammenlignet med mobilbrowseren – en fordel, der især mærkes ved hyppige sessionsskift.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Push-notifikationer for nye bonustilbud og spilnyheder er tilgængelige (kan slås fra i indstillinger). MobilePay- og Apple Pay-indbetalinger fungerer ekstra gnidningsfrit via appen, da biometrisk autentificering (Face ID/fingeraftryk) integreres direkte. Live casino-streams holder HD-kvalitet selv på 4G-forbindelse – vi oplevede ingen buffering under vores mobiltest.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den eneste begrænsning ved appen er, at visse ældre Playtech-titler kan have lidt længere indlæsningstider på ældre enheder. På moderne smartphones (2023+) er oplevelsen sømløs og fuldt sammenlignelig med desktop-versionen.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Customer Service */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Support via e-mail – ingen live chat tilgængelig</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Her kommer PlayKasinos mest markante svaghed: kundeservice er udelukkende tilgængelig via e-mail (support@playkasino.com). Der er ingen live chat – en funktion, som de fleste danske spillere forventer i 2026. Det er en overraskende mangel for et casino drevet af en så erfaren operatør som SkillOnNet, der tilbyder live chat på flere af sine andre brands.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vi kontaktede e-mail-supporten 3 gange under vores testperiode: et spørgsmål om bonusvilkår (svar efter 3 timer 20 min), en forespørgsel om udbetalingsstatus (svar efter 4 timer 45 min) og et teknisk spørgsmål om en Playtech-slot (svar efter 5 timer 30 min). Alle svar var professionelle, korrekte og på dansk. Kvaliteten af svarene er tilfredsstillende – det er responstiden, der er problemet.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Til sammenligning:{" "}
            <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> tilbyder live chat med gennemsnitlig svartid på under 3 minutter, og{" "}
            <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> har live chat tilgængelig 10–24. For spillere, der værdsætter øjeblikkelig support, er fraværet af live chat en reel ulempe, der kan være dealbreaker for nogle.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">E-mail Support</h3>
                <p className="text-sm text-muted-foreground">support@playkasino.com – svar inden for 3–6 timer (hverdage). Dansk support. Professionelle og korrekte svar.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">FAQ & Hjælpecenter</h3>
                <p className="text-sm text-muted-foreground">Grundlæggende selvbetjening med svar på de mest almindelige spørgsmål. Dækker bonus, betalinger og kontoindstillinger.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Security & Licenses */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Triple licens, ROFUS og SkillOnNets compliance-profil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            PlayKasino opererer med en sjælden triple licensering: dansk licens fra{" "}
            <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>, international licens fra Malta Gaming Authority (MGA) og licens fra UK Gambling Commission (UKGC). Det er den mest omfattende licenserings-profil blandt nye danske casinoer i 2026, og det er en direkte konsekvens af SkillOnNet's globale compliance-infrastruktur.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            MGA-licensen kræver adskilt spillerkontoføring, regelmæssig revision af tilfældighedsgeneratorer (RNG) og kapitalreserver, der sikrer, at spillernes indestående kan udbetales, selvom operatøren oplever økonomiske problemer. UKGC-licensen er en af de strengeste i verden med krav om source-of-funds kontrol, enhanceret due diligence og strengere rapporteringskrav.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Registrering sker via MitID, og PlayKasino benytter ZignSec til identitetsverifikation – samme udbyder som flere af de største danske casinoer. Alle transaktioner beskyttes med 256-bit SSL-kryptering (TLS 1.3). Casinoet er fuldt tilsluttet{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> for selvudelukkelse og{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet</a> for professionel rådgivning.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Spillemyndighedens regler for{" "}
            <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> er fuldt implementeret: obligatoriske indbetalingsgrænser ved oprettelse, session-påmindelser efter 60 minutters spil, mulighed for midlertidig selvudelukkelse og direkte link til hjælpeorganisationer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">Spillemyndigheden</h3>
                <p className="text-sm text-muted-foreground">Dansk licens – fuldt reguleret med løbende overvågning og tilsyn</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">MGA + UKGC</h3>
                <p className="text-sm text-muted-foreground">Dobbelt international licensering med ekstra kapitalreserver og revision</p>
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

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Hvad taler for – og hvad taler imod PlayKasino</h2>
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
                    "Kun 10x omsætningskrav – blandt de laveste i Danmark",
                    "Auto-krediteret bonus – ingen kode, ingen manuel aktivering",
                    "Triple licens: Spillemyndigheden + MGA + UKGC",
                    "SkillOnNet-platform med 19+ års erfaring",
                    "Playtech Live casino – unikt alternativ til Evolution-dominans",
                    "Dedikeret mobilapp til iOS og Android",
                    "MobilePay + Apple Pay til hurtige indbetalinger",
                    "1.200+ spil fra NetEnt, Microgaming, Playtech, Play'n GO m.fl.",
                    "Age of the Gods-serien – Playtech-eksklusiv i Danmark",
                    "Positiv EV (+100 kr.) på velkomstbonussen ved 96% RTP",
                    "Gebyrfri ind- og udbetalinger på alle metoder",
                    "MitID-registrering – ingen manuel verifikation nødvendig",
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
                    "Ingen live chat – kun e-mail support (3–6 timers svartid)",
                    "Bonusmaksimum på 500 kr. – lavere end Betinia (1.000 kr.) og Campobet (2.000 kr.)",
                    "Nyt brand i Danmark – kun lanceret marts 2026",
                    "Ingen sportsbetting-sektion",
                    "Færre spiludbydere end de største aggregatorer",
                    "MobilePay og Apple Pay kun til indbetaling, ikke udbetaling",
                    "Mangler avancerede spilfiltre (volatilitet, RTP-interval)",
                    "Ingen VIP-program eller loyalitetssystem ved lancering",
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

        {/* Who should NOT choose PlayKasino */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Fem situationer hvor PlayKasino ikke er det rette</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Trods sine styrker er PlayKasino ikke det optimale valg for alle spillertyper. Her er de profiler, der sandsynligvis vil finde bedre alternativer:
          </p>
          <div className="space-y-4">
            {[
              {
                icon: Headphones,
                title: "Spillere der har brug for øjeblikkelig support",
                desc: (
                  <>
                    Fraværet af live chat er PlayKasinos mest markante svaghed. Hvis du har brug for øjeblikkelig hjælp med bonusproblemer, udbetalinger eller tekniske fejl, er e-mail med 3–6 timers svartid ikke tilstrækkeligt. Overvej i stedet{" "}
                    <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> (live chat, under 3 min svartid) eller{" "}
                    <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> (live chat 10–24).
                  </>
                ),
              },
              {
                icon: Trophy,
                title: "Storspillere og bonus-hunters",
                desc: (
                  <>
                    Med en maks-bonus på 500 kr. er PlayKasino ikke det bedste valg for spillere, der søger højere bonusværdi. Både{" "}
                    <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> (1.000 kr.) og{" "}
                    <Link to="/casino-anmeldelser/campobet" className={linkClass}>Campobet</Link> (2.000 kr.) tilbyder markant højere bonusbeløb med samme 10x omsætningskrav. Til gengæld er PlayKasinos 500 kr. bonus hurtigere at gennemspille.
                  </>
                ),
              },
              {
                icon: Globe,
                title: "Sportsbetting-entusiaster",
                desc: "PlayKasino er et rendyrket casino uden nogen form for sportsbetting. Hvis du ønsker at kombinere casino med sportsvæddemål under samme konto, er Betinia eller Campobet med deres integrerede sportsektioner langt bedre valg.",
              },
              {
                icon: Layers,
                title: "Spillere der vil have det bredeste spiludvalg",
                desc: (
                  <>
                    Med 1.200+ spil har PlayKasino et solidt, men ikke markedets største katalog. Casinoer som{" "}
                    <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> med 40+ udbydere tilbyder tusindvis af ekstra titler. Hvis bredde i spiludvalget er din topprioritet, kan PlayKasino føles begrænset.
                  </>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{typeof item.desc === "string" ? item.desc : item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Competitor Comparison */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">PlayKasino vs. konkurrenterne – tre sammenligninger</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at placere PlayKasino korrekt i det danske casinolandskab sammenligner vi med tre relevante konkurrenter:
          </p>

          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-foreground mb-2">PlayKasino vs. SpilDanskNu</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Link to="/casino-anmeldelser/spildansknu" className={linkClass}>SpilDanskNu</Link> er et etableret dansk casino med fokus på lokal tilpasning. SpilDanskNu vinder på kundeservice (live chat tilgængelig), stærkere brand-genkendelighed og et bredere spiludvalg. PlayKasino kompenserer med lavere omsætningskrav (10x vs. SpilDanskNu's 10x – sammenlignelig), Playtech-integration (spil der ikke findes hos SpilDanskNu) og dedikeret mobilapp. For nye spillere, der prioriterer Playtech-spil og app-oplevelsen, er PlayKasino et stærkt alternativ. For dem, der værdsætter support og brand-tillid, er SpilDanskNu det sikre valg.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-foreground mb-2">PlayKasino vs. Campobet</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Link to="/casino-anmeldelser/campobet" className={linkClass}>Campobet</Link> er en dual-motor platform med både casino og sportsbetting. Campobet vinder klart på bonusbeløb (op til 2.000 kr.), tilstedeværelse af live chat og integreret sportsbetting. PlayKasino's fordele er den mere modne platform (SkillOnNet vs. Campobets nyere infrastruktur), Playtech Live casino og dedikeret mobilapp. Omsætningskravene er identiske (10x). For rene casinospillere, der ikke har brug for sport, er PlayKasino det mere fokuserede valg. For dem, der vil have alt samlet, er Campobet stærkere.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-foreground mb-2">PlayKasino vs. Swift Casino</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link> fokuserer på hastighed og enkelhed. Swift vinder på kundeservice (live chat), hurtigere udbetalinger og en mere strømlinet brugerflade. PlayKasino kompenserer med lavere omsætningskrav (10x vs. Swift's vilkår), bredere spiludvalg (1.200+ vs. Swifts katalog), Playtech-integration og dedikeret mobilapp. For spillere, der prioriterer bonusvilkår og spilbredde, er PlayKasino det bedre valg. For dem, der vil have den hurtigste og mest minimalstiske oplevelse, passer Swift bedre.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Final Verdict */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Samlet vurdering – en solid newcomer med ét klart minus</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Efter 14 dages intensiv test kan vi konkludere, at PlayKasino er en velbygget og gennemtænkt casinoplatform, der nyder godt af SkillOnNet's næsten to årtiers erfaring. Velkomstbonussen på 100 % op til 500 kr. med kun 10x omsætningskrav er matematisk set en af de mest fordelagtige på det danske marked – med en positiv forventet værdi på ca. +100 kr. ved gennemsnitlig slot-RTP.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spiludvalget med 1.200+ titler er solidt, og Playtech-integrationen giver adgang til spil og live casino-oplevelser, som de fleste danske konkurrenter ikke tilbyder. Den dedikerede mobilapp til iOS og Android er en reel fordel over konkurrenter, der kun tilbyder mobiloptimerede hjemmesider. MobilePay og Apple Pay gør indbetalinger hurtige og smertefri.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det ene klare minus er fraværet af live chat-support. I 2026 forventer danske spillere øjeblikkelig hjælp, og e-mail med 3–6 timers svartid lever ikke op til den standard. Det er en svaghed, som SkillOnNet forventeligt vil adressere i de kommende måneder – men på nuværende tidspunkt trækker det ned i den samlede vurdering.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Alt i alt er PlayKasino et stærkt nyt tilbud til det danske marked – særligt for spillere, der værdsætter fordelagtige bonusvilkår, Playtech-indhold og en moden teknisk platform. Med tilføjelsen af live chat ville casinoet rykke op i den absolutte top.
          </p>

          <RatingBreakdown scores={CASINO_SCORES["playkasino"].scores} total={CASINO_SCORES["playkasino"].total} />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleBonusClick} size="lg" className="flex-1 font-bold">
              <Gift className="mr-2 h-5 w-5" />
              Hent Bonus hos PlayKasino
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

        <LazySection minHeight="400px">
          <UserReviewSection casinoSlug="playkasino" casinoName="PlayKasino" />
        </LazySection>
        <LazySection minHeight="300px">
          <RelatedReviews currentSlug="playkasino" />
          <InlineCasinoCards title="Andre anbefalede casinoer" count={6} excludeSlugs={["playkasino"]} />
        </LazySection>
        <LazySection minHeight="200px">
          <AuthorBio />
          <LatestNewsByCategory pagePath="/casino-anmeldelser/playkasino" />
          <RelatedGuides currentPath="/casino-anmeldelser/playkasino" />
          <FAQSection title="Ofte stillede spørgsmål om PlayKasino" faqs={playkasinoFaqs} />
        </LazySection>
      </div>
      {casino && <StickyCTA casinoSlug={casino.slug} casinoName={casino.name} bonusAmount={casino.bonus_amount} bonusType={casino.bonus_type} freeSpins={casino.free_spins ?? ""} wageringRequirements={casino.wagering_requirements} rating={casino.rating} logoUrl={casino.logo_url} isRecommended={casino.is_recommended} isHot={casino.is_hot} />}
    </>
  );
};

export default PlayKasinoAnmeldelse;

import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  Star,
  Clock,
  CreditCard,
  Gift,
  Trophy,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Zap,
  Target,
  Users,
  Tv,
  Gamepad2,
  Award,
  ThumbsUp,
  ThumbsDown,
  Search,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const casinoReviews = [
  {
    name: "Spilleautomaten",
    slug: "spilleautomaten-anmeldelse",
    bonus: "100% op til 2.000 kr.",
    spins: "100 free spins",
    wagering: "10x omsætning",
    bonusType: "No-Sticky",
    rating: 4.8,
    highlights: ["2.500+ spil", "Dansk licens", "Hurtige udbetalinger", "MobilePay"],
    description: "Spilleautomaten er et af Danmarks mest populære online casinoer med en generøs velkomstbonus og et enormt spiludvalg fra førende udbydere.",
  },
  {
    name: "SpilDanskNu",
    slug: "spildansknu-anmeldelse",
    bonus: "100% op til 1.000 kr.",
    spins: "100 free spins",
    wagering: "10x omsætning",
    bonusType: "No-Sticky",
    rating: 4.7,
    highlights: ["2.000+ spil", "Dansk licens", "Trustly", "Ingen bonuskode"],
    description: "SpilDanskNu er et velrenommeret dansk online casino med fokus på kvalitet, brugervenlighed og fair bonusvilkår.",
  },
  {
    name: "Campobet",
    slug: "campobet-anmeldelse",
    bonus: "100% op til 1.000 kr.",
    spins: "100 free spins",
    wagering: "10x omsætning",
    bonusType: "No-Sticky",
    rating: 4.6,
    highlights: ["Sportsbetting", "3.000+ spil", "Dansk licens", "Live casino"],
    description: "Campobet kombinerer casino og sportsbetting under ét tag med en solid velkomstbonus og bredt udvalg af spil.",
  },
  {
    name: "Betinia",
    slug: "betinia-anmeldelse",
    bonus: "100% op til 1.000 kr.",
    spins: "Ingen free spins",
    wagering: "10x omsætning",
    bonusType: "No-Sticky",
    rating: 4.5,
    highlights: ["40+ spiludbydere", "Akkumulatorboost", "Dansk licens", "Hurtige udbetalinger"],
    description: "Betinia tilbyder en No-Sticky velkomstbonus og et bredt udvalg af både casino- og sportsbetting-muligheder.",
  },
  {
    name: "Swift Casino",
    slug: "swift-casino-anmeldelse",
    bonus: "100% op til 500 kr.",
    spins: "Ingen free spins",
    wagering: "10x omsætning",
    bonusType: "Standard",
    rating: 4.4,
    highlights: ["Hot Or Cold-funktion", "3.300+ spil", "Dansk licens", "Trustly"],
    description: "Swift Casino skiller sig ud med sin unikke Hot Or Cold-funktion og et imponerende spilbibliotek med over 3.300 titler.",
  },
  {
    name: "Luna Casino",
    slug: "luna-casino-anmeldelse",
    bonus: "100% op til 500 kr.",
    spins: "50 free spins",
    wagering: "10x omsætning",
    bonusType: "No-Sticky",
    rating: 4.3,
    highlights: ["VIP-program", "2.000+ spil", "Dansk licens", "MobilePay"],
    description: "Luna Casino byder på et stilfuldt design, et stærkt VIP-program og en fair velkomstbonus med lave omsætningskrav.",
  },
];

const faqs = [
  {
    question: "Hvad skal jeg kigge efter i en casino anmeldelse?",
    answer: "En god casino anmeldelse bør dække bonusvilkår (herunder omsætningskrav og bonustype), spiludvalg og udbydere, betalingsmetoder, udbetalingstider, kundeservice, licens og sikkerhed. Vi gennemgår alle disse punkter i vores dybdegående anmeldelser.",
  },
  {
    question: "Er alle anmeldte casinoer lovlige i Danmark?",
    answer: "Ja, alle casinoer vi anmelder har en gyldig dansk spillelicens udstedt af Spillemyndigheden. Det betyder, at de overholder strenge krav til spillerbeskyttelse, ansvarligt spil og datasikkerhed.",
  },
  {
    question: "Hvad er forskellen på No-Sticky og Sticky bonus?",
    answer: "En No-Sticky bonus holder dine egne penge adskilt fra bonuspengene, så du kan hæve dine egne gevinster når som helst. En Sticky bonus blander pengene sammen, og du skal opfylde omsætningskravene før du kan hæve. Vi anbefaler generelt No-Sticky bonusser.",
  },
  {
    question: "Hvorfor er omsætningskrav vigtige?",
    answer: "Omsætningskrav bestemmer, hvor mange gange du skal gennemspille bonusbeløbet, før du kan hæve gevinster. Lavere omsætningskrav (f.eks. 10x) giver dig bedre chancer for at beholde dine gevinster sammenlignet med høje krav (f.eks. 40x).",
  },
  {
    question: "Hvordan vurderer I et casino?",
    answer: "Vi vurderer casinoer baseret på en række kriterier: bonusvilkår og fairness, spiludvalg og udbydere, betalingsmetoder og udbetalingstider, kundeservice, mobilvenlighed, sikkerhed og licensforhold. Hvert casino testes grundigt af vores eksperter.",
  },
  {
    question: "Kan jeg stole på jeres casino anmeldelser?",
    answer: "Vores anmeldelser er uafhængige og baseret på faktisk testning. Vi spiller selv på casinoerne, tester bonusser, kontakter kundeservice og verificerer udbetalingstider. Vi modtager provision fra casinoerne, men dette påvirker aldrig vores vurdering eller rangering.",
  },
  {
    question: "Hvilke betalingsmetoder accepterer danske casinoer?",
    answer: "De fleste danske casinoer accepterer MobilePay, Trustly, Visa/Mastercard, bankoverførsel, Skrill, PayPal og andre populære metoder. Udbetalingstider varierer fra øjeblikkeligt (MobilePay, Trustly) til 1-3 hverdage (bankoverførsel).",
  },
  {
    question: "Hvad er RTP, og hvorfor er det vigtigt?",
    answer: "RTP (Return to Player) angiver, hvor stor en procentdel af indsatserne et spil i gennemsnit betaler tilbage over tid. En RTP på 96% betyder, at spillet betaler 96 kr. tilbage for hver 100 kr. der satses. Højere RTP giver bedre langsigtede chancer.",
  },
  {
    question: "Er det sikkert at spille online casino i Danmark?",
    answer: "Ja, når du spiller på casinoer med dansk licens fra Spillemyndigheden. Disse casinoer er underlagt streng regulering, tilbyder selvudelukkelse via ROFUS, og dine penge er beskyttet. Vi anbefaler kun licenserede casinoer.",
  },
  {
    question: "Hvornår opdateres jeres casino anmeldelser?",
    answer: "Vi opdaterer løbende vores anmeldelser, når casinoer ændrer deres bonusvilkår, spiludvalg eller andre vigtige funktioner. Alle anmeldelser gennemgås minimum kvartalsvis for at sikre aktualitet og nøjagtighed.",
  },
];

const linkClass = "text-primary hover:underline font-medium";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Forside", item: "https://casinoaftaler.dk/" },
    { "@type": "ListItem", position: 2, name: "Casino Anmeldelser", item: "https://casinoaftaler.dk/casino-anmeldelser" },
  ],
};

const CasinoAnmeldelser = () => {
  const { data: casinos } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const { user } = useAuth();

  const handleBonusClick = (slug: string) => {
    const casino = casinos?.find((c) => c.slug === slug);
    if (casino?.affiliate_url) {
      getAffiliateRedirect(casino.slug, user?.id);
    }
  };

  return (
    <>
      <SEO
        title="Casino Anmeldelser 2026 – Ærlige & Dybdegående Reviews | Casinoaftaler"
        description="Læs vores dybdegående casino anmeldelser af de bedste danske online casinoer. Uafhængige reviews med fokus på bonusvilkår, spiludvalg, betalingsmetoder og sikkerhed. Opdateret 2026."
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/20 via-background to-accent/10 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="container relative">
          <Breadcrumbs />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-xs"><Star className="mr-1 h-3 w-3" />Uafhængige reviews</Badge>
            <Badge variant="outline" className="text-xs"><ShieldCheck className="mr-1 h-3 w-3" />Kun dansk licens</Badge>
            <Badge variant="outline" className="text-xs"><Clock className="mr-1 h-3 w-3" />Opdateret 2026</Badge>
          </div>
          <h1 className="mb-4 mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Casino Anmeldelser 2026
          </h1>
          <p className="mb-6 max-w-3xl text-lg text-muted-foreground">
            Dybdegående og ærlige anmeldelser af de bedste danske online casinoer. Vi tester bonusser, spiludvalg, betalingsmetoder og kundeservice, så du kan træffe det rigtige valg.
          </p>
        </div>
      </section>

      <div className="container py-10">
        {/* Intro / Cornerstone SEO Content */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BookOpen className="h-6 w-6 text-primary" />
              Sådan finder du det bedste online casino i Danmark
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              At vælge det rigtige online casino kan virke overvældende. Med et stigende antal{" "}
              <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> på det danske marked er det vigtigere end nogensinde at have adgang til grundige, uafhængige anmeldelser. Hos Casinoaftaler gennemgår vi hvert casino minutiøst – fra{" "}
              <Link to="/casino-bonus" className={linkClass}>casinobonusser</Link> og{" "}
              <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> til{" "}
              <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>,{" "}
              <Link to="/casinospil" className={linkClass}>spiludvalg</Link> og kundeservice.
            </p>
            <p>
              Alle casinoer vi anmelder har en gyldig dansk spillelicens fra Spillemyndigheden, hvilket garanterer, at de overholder strenge krav til spillerbeskyttelse,{" "}
              <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link> og datasikkerhed. Vi anbefaler kun casinoer, der lever op til vores høje standarder for kvalitet og fairness.
            </p>
            <p>
              Vores eksperter spiller selv på hvert casino, tester{" "}
              <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>, verificerer udbetalingstider og kontakter kundeservice for at sikre, at du får den mest præcise og aktuelle information. Uanset om du foretrækker{" "}
              <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonusser</Link>,{" "}
              <Link to="/free-spins" className={linkClass}>free spins</Link> eller{" "}
              <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link>, har vi en anmeldelse, der hjælper dig med at finde det perfekte match.
            </p>
          </CardContent>
        </Card>

        {/* Casino Reviews Grid */}
        <section className="mb-10">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <Trophy className="h-6 w-6 text-primary" />
            Alle Casino Anmeldelser
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {casinoReviews.map((review) => (
              <Card key={review.slug} className="flex flex-col justify-between transition-colors hover:border-primary/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{review.name}</CardTitle>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      {review.rating}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.description}</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Gift className="h-4 w-4 text-primary" />
                      <span className="font-medium">{review.bonus}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>{review.spins}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Target className="h-4 w-4 text-primary" />
                      <span>{review.wagering}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-primary" />
                      <span>{review.bonusType}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {review.highlights.map((h) => (
                      <Badge key={h} variant="outline" className="text-xs">{h}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Button size="sm" onClick={() => handleBonusClick(review.slug.replace("-anmeldelse", ""))}>
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                      Hent Bonus
                    </Button>
                    <Link to={`/${review.slug}`} className="text-sm font-medium text-accent hover:underline flex items-center gap-1">
                      Læs Anmeldelse <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* SEO Cornerstone: Hvad gør en god casino anmeldelse */}
        <section className="mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Search className="h-6 w-6 text-primary" />
                Hvad gør en god casino anmeldelse? – Den komplette guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                En casino anmeldelse er din vigtigste ressource, når du skal vælge et nyt online casino. Men ikke alle anmeldelser er skabt lige. Her gennemgår vi, hvad du bør forvente af en grundig og troværdig casino anmeldelse, og hvorfor det er afgørende at læse én, før du opretter en konto og indbetaler penge.
              </p>

              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                1. Bonusvilkår og velkomstbonus
              </h3>
              <p>
                Det første de fleste spillere kigger efter er{" "}
                <Link to="/casino-bonus" className={linkClass}>casinobonussen</Link>. Men en stor bonus er ikke nødvendigvis en god bonus. Det er vilkårene, der afgør, om bonussen reelt er værd at aktivere. De vigtigste faktorer at vurdere inkluderer:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Bonusstørrelse:</strong> De fleste danske casinoer tilbyder en{" "}
                  <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> på 100% op til et bestemt beløb, typisk mellem 500 kr. og 2.000 kr.
                </li>
                <li>
                  <strong>Omsætningskrav:</strong>{" "}
                  <Link to="/omsaetningskrav" className={linkClass}>Omsætningskrav</Link> bestemmer, hvor mange gange du skal gennemspille bonusbeløbet. De bedste casinoer tilbyder krav på kun 10x, mens mindre favorable casinoer kan kræve 40x eller mere.
                </li>
                <li>
                  <strong>Bonustype:</strong> En{" "}
                  <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> holder dine egne penge adskilt fra bonuspengene, hvilket giver dig mulighed for at hæve egne gevinster når som helst. En{" "}
                  <Link to="/sticky-bonus" className={linkClass}>Sticky bonus</Link> blander pengene sammen.
                </li>
                <li>
                  <strong>Free spins:</strong>{" "}
                  <Link to="/free-spins" className={linkClass}>Free spins</Link> er gratis snurr på udvalgte spilleautomater og er en populær del af mange velkomstpakker.
                </li>
                <li>
                  <strong>Bonus uden indbetaling:</strong> Nogle casinoer tilbyder{" "}
                  <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link>, hvor du kan prøve casinoet helt gratis.
                </li>
                <li>
                  <strong>Bonus uden omsætningskrav:</strong> De sjældne{" "}
                  <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>bonusser uden omsætningskrav</Link> lader dig hæve gevinster med det samme.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-primary" />
                2. Spiludvalg og spiludbydere
              </h3>
              <p>
                Et casino er kun så godt som dets spil. Vi vurderer bredden og kvaliteten af spilkataloget, herunder{" "}
                <Link to="/casinospil" className={linkClass}>casinospil</Link> fra anerkendte{" "}
                <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link>. De bedste casinoer tilbyder spil fra:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link> – Pionerer inden for online slots med klassikere som Starburst og Gonzo's Quest
                </li>
                <li>
                  <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> – Alsidig udvikler med populære titler som Sweet Bonanza og The Dog House
                </li>
                <li>
                  <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> – Verdens førende inden for{" "}
                  <Link to="/live-casino" className={linkClass}>live casino</Link> med innovative game shows
                </li>
                <li>
                  <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> – Skabt Book of Dead og Reactoonz, kendt for kreativitet og høj RTP
                </li>
                <li>
                  <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link> – Innovativ tilgang til slots med høj volatilitet
                </li>
                <li>
                  <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> – Specialister i ekstrem volatilitet med unikke xWays-mekanikker
                </li>
                <li>
                  <Link to="/spiludviklere/relax-gaming" className={linkClass}>Relax Gaming</Link> – Money Train-serien og Temple Tumble Megaways
                </li>
                <li>
                  Andre kvalitetsudbydere som{" "}
                  <Link to="/spiludviklere/yggdrasil" className={linkClass}>Yggdrasil</Link>,{" "}
                  <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link>,{" "}
                  <Link to="/spiludviklere/elk-studios" className={linkClass}>ELK Studios</Link>,{" "}
                  <Link to="/spiludviklere/red-tiger" className={linkClass}>Red Tiger</Link> og{" "}
                  <Link to="/spiludviklere/big-time-gaming" className={linkClass}>Big Time Gaming</Link>
                </li>
              </ul>
              <p>
                Et godt casino bør tilbyde mindst 1.500-2.000 spil fra minimum 20-30 forskellige udbydere. De bedste, som{" "}
                <Link to="/spilleautomaten-anmeldelse" className={linkClass}>Spilleautomaten</Link>, tilbyder over 2.500 titler.
              </p>

              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                3. Betalingsmetoder og udbetalingstider
              </h3>
              <p>
                Hurtige og sikre{" "}
                <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> er essentielle for en god casinooplevelse. Vi tester alle tilgængelige ind- og udbetalingsmetoder og måler de faktiske udbetalingstider. De mest populære metoder blandt danske spillere inkluderer:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> – Danmarks foretrukne betalingsmetode med øjeblikkelige indbetalinger
                </li>
                <li>
                  <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> – Direkte bankoverførsel uden at dele bankoplysninger
                </li>
                <li>
                  <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link> – Den klassiske og universelt accepterede betalingsmetode
                </li>
                <li>
                  <Link to="/betalingsmetoder/paypal" className={linkClass}>PayPal</Link> – Sikker e-wallet med køberbeskyttelse
                </li>
                <li>
                  <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link> – Populær e-wallet med hurtige transaktioner
                </li>
                <li>
                  Andre muligheder:{" "}
                  <Link to="/betalingsmetoder/apple-pay" className={linkClass}>Apple Pay</Link>,{" "}
                  <Link to="/betalingsmetoder/revolut" className={linkClass}>Revolut</Link>,{" "}
                  <Link to="/betalingsmetoder/zimpler" className={linkClass}>Zimpler</Link>,{" "}
                  <Link to="/betalingsmetoder/paysafecard" className={linkClass}>Paysafecard</Link> og{" "}
                  <Link to="/betalingsmetoder/bankoverforsler" className={linkClass}>bankoverførsel</Link>
                </li>
              </ul>
              <p>
                De bedste casinoer tilbyder udbetalinger inden for 0-24 timer via e-wallets og MobilePay, mens bankoverførsler typisk tager 1-3 hverdage.
              </p>

              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Tv className="h-5 w-5 text-primary" />
                4. Live casino og gameshows
              </h3>
              <p>
                <Link to="/live-casino" className={linkClass}>Live casino</Link> er en af de hurtigst voksende sektorer inden for online gambling. Med professionelle dealere, der streamer i HD fra studios verden over, får du en autentisk casinooplevelse direkte fra din sofa.{" "}
                <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> dominerer markedet med innovative game shows som Crazy Time, Lightning Roulette og MONOPOLY Live. I vores anmeldelser vurderer vi altid live casino-udbuddet, herunder antal borde, minimumindsatser og tilgængelighed af danske dealere.
              </p>

              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                5. Sikkerhed, licens og ansvarligt spil
              </h3>
              <p>
                Alle casinoer vi anmelder har en gyldig dansk licens fra Spillemyndigheden. Dette er et ufravigeligt krav. En dansk licens garanterer:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Spillerbeskyttelse og klageadgang via Spillemyndigheden</li>
                <li>Mulighed for selvudelukkelse via <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a></li>
                <li>Krypteret datatransmission og sikker opbevaring af spillerdata</li>
                <li>Adskillelse af spillermidler fra casinoets driftsmidler</li>
                <li>Forpligtelse til at fremme{" "}
                  <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>
                </li>
              </ul>
              <p>
                Har du brug for hjælp med spilleproblemer, kan du kontakte{" "}
                <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet.dk</a> – gratis og anonymt.
              </p>

              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                6. Kundeservice og brugervenlighed
              </h3>
              <p>
                En god kundeservice er en indikator for, hvor seriøst et casino tager sine spillere. Vi vurderer responstid, tilgængelige kanaler (live chat, e-mail, telefon) og kvaliteten af den hjælp, der tilbydes. Vi tester også, om kundeservicen er tilgængelig på dansk, og om den kan håndtere specifikke spørgsmål om bonusvilkår og udbetalinger.
              </p>
              <p>
                Mobiloplevelsen er ligeledes vigtig. I 2026 spiller over 70% af danske spillere på mobilen, så et casino skal tilbyde en responsiv og intuitiv mobilplatform med hurtig indlæsningstid og problemfri navigation.
              </p>

              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                7. RTP og volatilitet – Forstå dine chancer
              </h3>
              <p>
                RTP (Return to Player) og volatilitet er to nøglebegreber, som enhver casinospiller bør forstå. RTP angiver den teoretiske tilbagebetaling over tid – et spil med 96% RTP betaler i gennemsnit 96 kr. tilbage for hver 100 kr. der satses. De bedste{" "}
                <Link to="/casinospil" className={linkClass}>casinospil</Link> tilbyder en RTP på over 96%.
              </p>
              <p>
                Volatilitet beskriver, hvordan gevinsterne fordeles. Lav volatilitet giver hyppige, men mindre gevinster, mens høj volatilitet giver sjældne, men potentielt store gevinster.{" "}
                <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> er kendt for ekstrem høj volatilitet, mens{" "}
                <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link> typisk tilbyder mere balancerede spil.
              </p>

              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                8. Vores anmeldelsesproces
              </h3>
              <p>
                For at sikre de mest nøjagtige og troværdige anmeldelser følger vi en standardiseret proces:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Oprettelse og verifikation:</strong> Vi opretter en rigtig konto, gennemgår KYC-processen og vurderer hele onboarding-oplevelsen.</li>
                <li><strong>Bonustest:</strong> Vi aktiverer velkomstbonussen, læser alle vilkår grundigt og vurderer fairness baseret på omsætningskrav, bonustype og udløbsdato.</li>
                <li><strong>Spiludvalg:</strong> Vi gennemgår det fulde spilkatalog, tæller udbydere og tester populære titler for stabilitet og brugeroplevelse.</li>
                <li><strong>Betalinger:</strong> Vi foretager ind- og udbetalinger via flere metoder og måler de faktiske behandlingstider.</li>
                <li><strong>Kundeservice:</strong> Vi kontakter support med specifikke spørgsmål og vurderer responstid og kvalitet.</li>
                <li><strong>Løbende opdatering:</strong> Alle anmeldelser gennemgås minimum hvert kvartal for at sikre, at informationen er aktuel.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            Sammenligning af alle anmeldte casinoer
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="p-4 text-left font-semibold">Casino</th>
                      <th className="p-4 text-left font-semibold">Bonus</th>
                      <th className="p-4 text-left font-semibold">Omsætning</th>
                      <th className="p-4 text-left font-semibold">Type</th>
                      <th className="p-4 text-center font-semibold">Vurdering</th>
                      <th className="p-4 text-center font-semibold">Anmeldelse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {casinoReviews.map((review, idx) => (
                      <tr key={review.slug} className={`border-b border-border/50 ${idx % 2 === 0 ? "bg-muted/20" : ""}`}>
                        <td className="p-4 font-medium">{review.name}</td>
                        <td className="p-4">{review.bonus}</td>
                        <td className="p-4">{review.wagering}</td>
                        <td className="p-4">
                          <Badge variant={review.bonusType === "No-Sticky" ? "secondary" : "outline"} className="text-xs">
                            {review.bonusType}
                          </Badge>
                        </td>
                        <td className="p-4 text-center">
                          <span className="flex items-center justify-center gap-1 font-semibold">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            {review.rating}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <Link to={`/${review.slug}`} className="text-primary hover:underline font-medium text-sm">
                            Læs →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Inline Casino Cards */}
        <InlineCasinoCards />

        <Separator className="my-10" />

        {/* Pros/Cons of each reviewed casino */}
        <section className="mb-10">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <ThumbsUp className="h-6 w-6 text-primary" />
            Fordele og ulemper ved hvert casino
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/spilleautomaten-anmeldelse" className={linkClass}>Spilleautomaten</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2 text-sm"><ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /><span>Stort spiludvalg med 2.500+ titler fra{" "}<Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}<Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> m.fl.</span></div>
                <div className="flex items-start gap-2 text-sm"><ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /><span>Generøs{" "}<Link to="/no-sticky-bonus" className={linkClass}>No-Sticky</Link> velkomstbonus med kun 10x omsætning</span></div>
                <div className="flex items-start gap-2 text-sm"><ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /><span>Hurtige udbetalinger via{" "}<Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> og{" "}<Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link></span></div>
                <div className="flex items-start gap-2 text-sm"><ThumbsDown className="h-4 w-4 text-red-500 mt-0.5 shrink-0" /><span>Ingen sportsbook eller betting-muligheder</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/spildansknu-anmeldelse" className={linkClass}>SpilDanskNu</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2 text-sm"><ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /><span>Brugervenlighed og dansk fokus i hele platformen</span></div>
                <div className="flex items-start gap-2 text-sm"><ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /><span>Fair{" "}<Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> med lave{" "}<Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link></span></div>
                <div className="flex items-start gap-2 text-sm"><ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /><span>Ingen bonuskode nødvendig</span></div>
                <div className="flex items-start gap-2 text-sm"><ThumbsDown className="h-4 w-4 text-red-500 mt-0.5 shrink-0" /><span>Lidt mindre spiludvalg end de største konkurrenter</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/campobet-anmeldelse" className={linkClass}>Campobet</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2 text-sm"><ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /><span>Kombineret casino og sportsbetting med 3.000+ spil</span></div>
                <div className="flex items-start gap-2 text-sm"><ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /><span>Stærkt{" "}<Link to="/live-casino" className={linkClass}>live casino</Link> fra{" "}<Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link></span></div>
                <div className="flex items-start gap-2 text-sm"><ThumbsDown className="h-4 w-4 text-red-500 mt-0.5 shrink-0" /><span>Kundeservice kan have ventetid i spidsbelastning</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/betinia-anmeldelse" className={linkClass}>Betinia</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2 text-sm"><ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /><span>Over 40{" "}<Link to="/spiludviklere" className={linkClass}>spiludbydere</Link> og akkumulatorboost</span></div>
                <div className="flex items-start gap-2 text-sm"><ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /><span><Link to="/no-sticky-bonus" className={linkClass}>No-Sticky</Link>{" "}velkomstbonus med 10x{" "}<Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link></span></div>
                <div className="flex items-start gap-2 text-sm"><ThumbsDown className="h-4 w-4 text-red-500 mt-0.5 shrink-0" /><span>Ingen{" "}<Link to="/free-spins" className={linkClass}>free spins</Link> inkluderet i velkomstpakken</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/swift-casino-anmeldelse" className={linkClass}>Swift Casino</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2 text-sm"><ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /><span>Unik Hot Or Cold-funktion der viser aktive spilleautomater</span></div>
                <div className="flex items-start gap-2 text-sm"><ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /><span>Over 3.300{" "}<Link to="/casinospil" className={linkClass}>casinospil</Link> fra anerkendte udbydere</span></div>
                <div className="flex items-start gap-2 text-sm"><ThumbsDown className="h-4 w-4 text-red-500 mt-0.5 shrink-0" /><span>Ingen{" "}<Link to="/free-spins" className={linkClass}>free spins</Link> i velkomstbonussen</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Link to="/luna-casino-anmeldelse" className={linkClass}>Luna Casino</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2 text-sm"><ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /><span>VIP-program med eksklusive fordele og bonusser</span></div>
                <div className="flex items-start gap-2 text-sm"><ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /><span><Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> med 50{" "}<Link to="/free-spins" className={linkClass}>free spins</Link></span></div>
                <div className="flex items-start gap-2 text-sm"><ThumbsDown className="h-4 w-4 text-red-500 mt-0.5 shrink-0" /><span>Lavere bonusbeløb end nogle konkurrenter</span></div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Tips section */}
        <section className="mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-primary" />
                5 tips til at vælge det rigtige casino
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <h4 className="mb-2 font-semibold text-foreground">1. Læs vilkårene først</h4>
                  <p className="text-sm">Tjek altid{" "}<Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, tidsbegrænsning og spillebidrag, før du aktiverer en bonus. Det kan spare dig for skuffelser senere.</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <h4 className="mb-2 font-semibold text-foreground">2. Vælg No-Sticky</h4>
                  <p className="text-sm">En{" "}<Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> giver dig mest fleksibilitet, da dine egne penge altid er tilgængelige for udbetaling.</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <h4 className="mb-2 font-semibold text-foreground">3. Test kundeservice</h4>
                  <p className="text-sm">Kontakt kundeservice med et spørgsmål, før du indbetaler. Det giver dig en fornemmelse for kvaliteten og responstiden.</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <h4 className="mb-2 font-semibold text-foreground">4. Kend dine spil</h4>
                  <p className="text-sm">Vælg et casino med de{" "}<Link to="/spiludviklere" className={linkClass}>spiludviklere</Link> og{" "}<Link to="/casinospil" className={linkClass}>casinospil</Link> du bedst kan lide.</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <h4 className="mb-2 font-semibold text-foreground">5. Sæt grænser</h4>
                  <p className="text-sm">Brug casinoets ansvarligt spil-værktøjer til at sætte ind- og tabsgrænser. Spil skal altid være{" "}<Link to="/responsible-gaming" className={linkClass}>ansvarligt</Link> og underholdende.</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <h4 className="mb-2 font-semibold text-foreground">Bonus: Sammenlign</h4>
                  <p className="text-sm">Brug vores{" "}<Link to="/top-10-casino-online" className={linkClass}>Top 10 Casino Online</Link> oversigt og denne sides sammenligningstabel for at finde det bedste tilbud.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* FAQ */}
        <Card className="mb-10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-7 w-7 text-primary" />
              <CardTitle className="text-2xl md:text-3xl">
                Ofte stillede spørgsmål om casino anmeldelser
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="rounded-lg border border-border bg-muted/50 px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <RelatedGuides currentPath="/casino-anmeldelser" />
      </div>
    </>
  );
};

export default CasinoAnmeldelser;

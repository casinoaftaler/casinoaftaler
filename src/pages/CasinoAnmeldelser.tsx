import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { CasinoCard } from "@/components/CasinoCard";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  Star,
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
  User,
  CalendarDays,
  Loader2,
} from "lucide-react";

const reviewSlugs = [
  "spilleautomaten",
  "spildansknu",
  "campobet",
  "betinia",
  "swift-casino",
  "luna-casino",
];

const faqs = [
  {
    question: "Hvad skal jeg kigge efter i en casino anmeldelse?",
    answer: (
      <>
        En god casino anmeldelse bør dække{" "}
        <Link to="/casino-bonus" className="text-primary underline hover:text-primary/80">bonusvilkår</Link> (herunder{" "}
        <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link> og bonustype), spiludvalg og{" "}
        <Link to="/spiludviklere" className="text-primary underline hover:text-primary/80">udbydere</Link>,{" "}
        <Link to="/betalingsmetoder" className="text-primary underline hover:text-primary/80">betalingsmetoder</Link>, udbetalingstider, kundeservice, licens og sikkerhed.
      </>
    ),
  },
  {
    question: "Er alle anmeldte casinoer lovlige i Danmark?",
    answer: (
      <>
        Ja, alle casinoer vi anmelder har en gyldig dansk spillelicens udstedt af Spillemyndigheden. Det betyder, at de overholder strenge krav til spillerbeskyttelse,{" "}
        <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link> og datasikkerhed.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på No-Sticky og Sticky bonus?",
    answer: (
      <>
        En{" "}
        <Link to="/no-sticky-bonus" className="text-primary underline hover:text-primary/80">No-Sticky bonus</Link> holder dine egne penge adskilt fra bonuspengene, så du kan hæve dine egne gevinster når som helst. En{" "}
        <Link to="/sticky-bonus" className="text-primary underline hover:text-primary/80">Sticky bonus</Link> blander pengene sammen, og du skal opfylde omsætningskravene før du kan hæve.
      </>
    ),
  },
  {
    question: "Hvorfor er omsætningskrav vigtige?",
    answer: (
      <>
        <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">Omsætningskrav</Link> bestemmer, hvor mange gange du skal gennemspille bonusbeløbet, før du kan hæve gevinster. Lavere krav (f.eks. 10x) giver dig bedre chancer for at beholde dine gevinster.
      </>
    ),
  },
  {
    question: "Hvordan vurderer I et casino?",
    answer: "Vi vurderer casinoer baseret på bonusvilkår, spiludvalg, betalingsmetoder, udbetalingstider, kundeservice, mobilvenlighed, sikkerhed og licensforhold. Hvert casino testes grundigt af vores eksperter.",
  },
  {
    question: "Kan jeg stole på jeres casino anmeldelser?",
    answer: "Vores anmeldelser er uafhængige og baseret på faktisk testning. Vi modtager provision fra casinoerne, men dette påvirker aldrig vores vurdering eller rangering.",
  },
  {
    question: "Hvilke betalingsmetoder accepterer danske casinoer?",
    answer: (
      <>
        De fleste danske casinoer accepterer{" "}
        <Link to="/betalingsmetoder/mobilepay" className="text-primary underline hover:text-primary/80">MobilePay</Link>,{" "}
        <Link to="/betalingsmetoder/trustly" className="text-primary underline hover:text-primary/80">Trustly</Link>,{" "}
        <Link to="/betalingsmetoder/visa-mastercard" className="text-primary underline hover:text-primary/80">Visa/Mastercard</Link>,{" "}
        <Link to="/betalingsmetoder/paypal" className="text-primary underline hover:text-primary/80">PayPal</Link>,{" "}
        <Link to="/betalingsmetoder/skrill" className="text-primary underline hover:text-primary/80">Skrill</Link> og flere.
      </>
    ),
  },
  {
    question: "Hvad er RTP, og hvorfor er det vigtigt?",
    answer: "RTP (Return to Player) angiver, hvor stor en procentdel af indsatserne et spil i gennemsnit betaler tilbage over tid. En RTP på 96% betyder, at spillet betaler 96 kr. tilbage for hver 100 kr. der satses.",
  },
  {
    question: "Er det sikkert at spille online casino i Danmark?",
    answer: (
      <>
        Ja, når du spiller på casinoer med dansk licens fra Spillemyndigheden. Disse casinoer er underlagt streng regulering og tilbyder selvudelukkelse via{" "}
        <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">ROFUS</a>.
      </>
    ),
  },
  {
    question: "Hvornår opdateres jeres casino anmeldelser?",
    answer: "Vi opdaterer løbende vores anmeldelser, når casinoer ændrer deres bonusvilkår, spiludvalg eller andre vigtige funktioner. Alle anmeldelser gennemgås minimum kvartalsvis.",
  },
];

const linkClass = "text-primary underline hover:text-primary/80";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: typeof faq.answer === "string" ? faq.answer : faq.question },
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
  const { data: casinos, isLoading } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const heroBackgroundImage = siteSettings?.hero_background;

  const reviewCasinos = (casinos ?? []).filter((c) => reviewSlugs.includes(c.slug));

  const mapCasino = (casino: (typeof reviewCasinos)[0]) => ({
    id: casino.id,
    name: casino.name,
    slug: casino.slug,
    rating: Number(casino.rating),
    bonusTitle: casino.bonus_title,
    bonusAmount: casino.bonus_amount,
    bonusType: casino.bonus_type,
    wageringRequirements: casino.wagering_requirements,
    validity: casino.validity,
    minDeposit: casino.min_deposit,
    payoutTime: casino.payout_time,
    freeSpins: casino.free_spins,
    features: casino.features ?? [],
    pros: casino.pros ?? [],
    cons: casino.cons ?? [],
    description: casino.description ?? "",
    isRecommended: casino.is_recommended,
    isHot: casino.is_hot,
    logoUrl: casino.logo_url,
    affiliateUrl: casino.affiliate_url,
    gameProviders: casino.game_providers ?? [],
  });

  return (
    <>
      <SEO
        title="Casino Anmeldelser 2026 – Ærlige & Dybdegående Reviews | Casinoaftaler"
        description="Læs vores dybdegående casino anmeldelser af de bedste danske online casinoer. Uafhængige reviews med fokus på bonusvilkår, spiludvalg, betalingsmetoder og sikkerhed. Opdateret 2026."
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
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
              <Star className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casino Anmeldelser 2026
            </h1>
            <p className="text-lg text-white/80">
              Dybdegående og ærlige anmeldelser af de bedste danske online casinoer.
              Vi tester bonusser, spiludvalg, betalingsmetoder og kundeservice, så
              du kan træffe det rigtige valg.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        {/* Meta info bar */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>
              Skrevet af:{" "}
              <span className="font-medium text-foreground">Casinoaftaler</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>
              Siden opdateret:{" "}
              <span className="font-medium text-foreground">14-02-2026</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>
              Læsetid:{" "}
              <span className="font-medium text-foreground">18 Min.</span>
            </span>
          </div>
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan finder du det bedste online casino i Danmark
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            At vælge det rigtige online casino kan virke overvældende. Med et stigende antal{" "}
            <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> på det danske marked er det vigtigere end nogensinde at have adgang til grundige, uafhængige anmeldelser. Hos Casinoaftaler gennemgår vi hvert casino minutiøst – fra{" "}
            <Link to="/casino-bonus" className={linkClass}>casinobonusser</Link> og{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> til{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>,{" "}
            <Link to="/casinospil" className={linkClass}>spiludvalg</Link> og kundeservice.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle casinoer vi anmelder har en gyldig dansk spillelicens fra Spillemyndigheden, hvilket garanterer, at de overholder strenge krav til spillerbeskyttelse,{" "}
            <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link> og datasikkerhed. Vi anbefaler kun casinoer, der lever op til vores høje standarder for kvalitet og fairness.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vores eksperter spiller selv på hvert casino, tester{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>, verificerer udbetalingstider og kontakter kundeservice for at sikre, at du får den mest præcise og aktuelle information. Uanset om du foretrækker{" "}
            <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonusser</Link>,{" "}
            <Link to="/free-spins" className={linkClass}>free spins</Link> eller{" "}
            <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link>, har vi en anmeldelse, der hjælper dig med at finde det perfekte match.
          </p>
        </section>

        {/* Casino Cards from DB */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Alle Casino Anmeldelser</h2>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : reviewCasinos.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              Ingen casino anmeldelser tilgængelige i øjeblikket.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {reviewCasinos.slice(0, 2).map((casino, index) => (
                  <CasinoCard
                    key={casino.id}
                    casino={mapCasino(casino)}
                    rank={index + 1}
                    open={openCasinoId === casino.id}
                    onOpenChange={(open) =>
                      setOpenCasinoId(open ? casino.id : null)
                    }
                  />
                ))}
              </div>
              {reviewCasinos.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  {reviewCasinos.slice(2).map((casino, index) => (
                    <CasinoCard
                      key={casino.id}
                      casino={mapCasino(casino)}
                      rank={index + 3}
                      open={openCasinoId === casino.id}
                      onOpenChange={(open) =>
                        setOpenCasinoId(open ? casino.id : null)
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <Separator className="my-10" />

        {/* Hvad gør en god casino anmeldelse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad gør en god casino anmeldelse? – Den komplette guide
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            En casino anmeldelse er din vigtigste ressource, når du skal vælge et nyt online casino. Men ikke alle anmeldelser er skabt lige. Her gennemgår vi, hvad du bør forvente af en grundig og troværdig casino anmeldelse, og hvorfor det er afgørende at læse én, før du opretter en konto og indbetaler penge.
          </p>

          <h3 className="mb-3 text-xl font-semibold flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            1. Bonusvilkår og velkomstbonus
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det første de fleste spillere kigger efter er{" "}
            <Link to="/casino-bonus" className={linkClass}>casinobonussen</Link>. Men en stor bonus er ikke nødvendigvis en god bonus. Det er vilkårene, der afgør, om bonussen reelt er værd at aktivere. De vigtigste faktorer at vurdere inkluderer:
          </p>
          <ul className="mb-6 list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>
              <strong className="text-foreground">Bonusstørrelse:</strong> De fleste danske casinoer tilbyder en{" "}
              <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> på 100% op til et bestemt beløb, typisk mellem 500 kr. og 2.000 kr.
            </li>
            <li>
              <strong className="text-foreground">Omsætningskrav:</strong>{" "}
              <Link to="/omsaetningskrav" className={linkClass}>Omsætningskrav</Link> bestemmer, hvor mange gange du skal gennemspille bonusbeløbet. De bedste casinoer tilbyder krav på kun 10x, mens mindre favorable casinoer kan kræve 40x eller mere.
            </li>
            <li>
              <strong className="text-foreground">Bonustype:</strong> En{" "}
              <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> holder dine egne penge adskilt fra bonuspengene. En{" "}
              <Link to="/sticky-bonus" className={linkClass}>Sticky bonus</Link> blander pengene sammen.
            </li>
            <li>
              <strong className="text-foreground">Free spins:</strong>{" "}
              <Link to="/free-spins" className={linkClass}>Free spins</Link> er gratis snurr på udvalgte spilleautomater og er en populær del af mange velkomstpakker.
            </li>
            <li>
              <strong className="text-foreground">Bonus uden indbetaling:</strong> Nogle casinoer tilbyder{" "}
              <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link>, hvor du kan prøve casinoet helt gratis.
            </li>
            <li>
              <strong className="text-foreground">Bonus uden omsætningskrav:</strong> De sjældne{" "}
              <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>bonusser uden omsætningskrav</Link> lader dig hæve gevinster med det samme.
            </li>
          </ul>

          <h3 className="mb-3 text-xl font-semibold flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-primary" />
            2. Spiludvalg og spiludbydere
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Et casino er kun så godt som dets spil. Vi vurderer bredden og kvaliteten af spilkataloget, herunder{" "}
            <Link to="/casinospil" className={linkClass}>casinospil</Link> fra anerkendte{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link>. De bedste casinoer tilbyder spil fra:
          </p>
          <ul className="mb-6 list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li><Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link> – Pionerer inden for online slots med klassikere som Starburst og Gonzo's Quest</li>
            <li><Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> – Alsidig udvikler med populære titler som Sweet Bonanza og The Dog House</li>
            <li><Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> – Verdens førende inden for{" "}<Link to="/live-casino" className={linkClass}>live casino</Link> med innovative game shows</li>
            <li><Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> – Skabt Book of Dead og Reactoonz, kendt for kreativitet og høj RTP</li>
            <li><Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link> – Innovativ tilgang til slots med høj volatilitet</li>
            <li><Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> – Specialister i ekstrem volatilitet med unikke xWays-mekanikker</li>
            <li><Link to="/spiludviklere/relax-gaming" className={linkClass}>Relax Gaming</Link> – Money Train-serien og Temple Tumble Megaways</li>
            <li>
              Andre kvalitetsudbydere som{" "}
              <Link to="/spiludviklere/yggdrasil" className={linkClass}>Yggdrasil</Link>,{" "}
              <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link>,{" "}
              <Link to="/spiludviklere/elk-studios" className={linkClass}>ELK Studios</Link>,{" "}
              <Link to="/spiludviklere/red-tiger" className={linkClass}>Red Tiger</Link> og{" "}
              <Link to="/spiludviklere/big-time-gaming" className={linkClass}>Big Time Gaming</Link>
            </li>
          </ul>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Et godt casino bør tilbyde mindst 1.500-2.000 spil fra minimum 20-30 forskellige udbydere. De bedste, som{" "}
            <Link to="/spilleautomaten-anmeldelse" className={linkClass}>Spilleautomaten</Link>, tilbyder over 2.500 titler.
          </p>

          <h3 className="mb-3 text-xl font-semibold flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            3. Betalingsmetoder og udbetalingstider
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hurtige og sikre{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> er essentielle for en god casinooplevelse. Vi tester alle tilgængelige ind- og udbetalingsmetoder og måler de faktiske udbetalingstider. De mest populære metoder blandt danske spillere inkluderer:
          </p>
          <ul className="mb-6 list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li><Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> – Danmarks foretrukne betalingsmetode med øjeblikkelige indbetalinger</li>
            <li><Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> – Direkte bankoverførsel uden at dele bankoplysninger</li>
            <li><Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link> – Den klassiske og universelt accepterede betalingsmetode</li>
            <li><Link to="/betalingsmetoder/paypal" className={linkClass}>PayPal</Link> – Sikker e-wallet med køberbeskyttelse</li>
            <li><Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link> – Populær e-wallet med hurtige transaktioner</li>
            <li>
              Andre muligheder:{" "}
              <Link to="/betalingsmetoder/apple-pay" className={linkClass}>Apple Pay</Link>,{" "}
              <Link to="/betalingsmetoder/revolut" className={linkClass}>Revolut</Link>,{" "}
              <Link to="/betalingsmetoder/zimpler" className={linkClass}>Zimpler</Link>,{" "}
              <Link to="/betalingsmetoder/paysafecard" className={linkClass}>Paysafecard</Link> og{" "}
              <Link to="/betalingsmetoder/bankoverforsler" className={linkClass}>bankoverførsel</Link>
            </li>
          </ul>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            De bedste casinoer tilbyder udbetalinger inden for 0-24 timer via e-wallets og MobilePay, mens bankoverførsler typisk tager 1-3 hverdage.
          </p>

          <h3 className="mb-3 text-xl font-semibold flex items-center gap-2">
            <Tv className="h-5 w-5 text-primary" />
            4. Live casino og gameshows
          </h3>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            <Link to="/live-casino" className={linkClass}>Live casino</Link> er en af de hurtigst voksende sektorer inden for online gambling. Med professionelle dealere, der streamer i HD fra studios verden over, får du en autentisk casinooplevelse direkte fra din sofa.{" "}
            <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> dominerer markedet med innovative game shows som Crazy Time, Lightning Roulette og MONOPOLY Live. I vores anmeldelser vurderer vi altid live casino-udbuddet, herunder antal borde, minimumindsatser og tilgængelighed af danske dealere.
          </p>

          <h3 className="mb-3 text-xl font-semibold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            5. Sikkerhed, licens og ansvarligt spil
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle casinoer vi anmelder har en gyldig dansk licens fra Spillemyndigheden. Dette er et ufravigeligt krav. En dansk licens garanterer:
          </p>
          <ul className="mb-6 list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Spillerbeskyttelse og klageadgang via Spillemyndigheden</li>
            <li>Mulighed for selvudelukkelse via <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a></li>
            <li>Krypteret datatransmission og sikker opbevaring af spillerdata</li>
            <li>Adskillelse af spillermidler fra casinoets driftsmidler</li>
            <li>Forpligtelse til at fremme{" "}<Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link></li>
          </ul>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Har du brug for hjælp med spilleproblemer, kan du kontakte{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet.dk</a> – gratis og anonymt.
          </p>

          <h3 className="mb-3 text-xl font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            6. Kundeservice og brugervenlighed
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En god kundeservice er en indikator for, hvor seriøst et casino tager sine spillere. Vi vurderer responstid, tilgængelige kanaler (live chat, e-mail, telefon) og kvaliteten af den hjælp, der tilbydes. Vi tester også, om kundeservicen er tilgængelig på dansk, og om den kan håndtere specifikke spørgsmål om bonusvilkår og udbetalinger.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Mobiloplevelsen er ligeledes vigtig. I 2026 spiller over 70% af danske spillere på mobilen, så et casino skal tilbyde en responsiv og intuitiv mobilplatform med hurtig indlæsningstid og problemfri navigation.
          </p>

          <h3 className="mb-3 text-xl font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            7. RTP og volatilitet – Forstå dine chancer
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            RTP (Return to Player) og volatilitet er to nøglebegreber, som enhver casinospiller bør forstå. RTP angiver den teoretiske tilbagebetaling over tid – et spil med 96% RTP betaler i gennemsnit 96 kr. tilbage for hver 100 kr. der satses. De bedste{" "}
            <Link to="/casinospil" className={linkClass}>casinospil</Link> tilbyder en RTP på over 96%.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Volatilitet beskriver, hvordan gevinsterne fordeles. Lav volatilitet giver hyppige, men mindre gevinster, mens høj volatilitet giver sjældne, men potentielt store gevinster.{" "}
            <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> er kendt for ekstrem høj volatilitet, mens{" "}
            <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link> typisk tilbyder mere balancerede spil.
          </p>

          <h3 className="mb-3 text-xl font-semibold flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            8. Vores anmeldelsesproces
          </h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at sikre de mest nøjagtige og troværdige anmeldelser følger vi en standardiseret proces:
          </p>
          <ul className="mb-6 list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li><strong className="text-foreground">Oprettelse og verifikation:</strong> Vi opretter en rigtig konto, gennemgår KYC-processen og vurderer hele onboarding-oplevelsen.</li>
            <li><strong className="text-foreground">Bonustest:</strong> Vi aktiverer velkomstbonussen, læser alle vilkår grundigt og vurderer fairness baseret på omsætningskrav, bonustype og udløbsdato.</li>
            <li><strong className="text-foreground">Spiludvalg:</strong> Vi gennemgår det fulde spilkatalog, tæller udbydere og tester populære titler for stabilitet og brugeroplevelse.</li>
            <li><strong className="text-foreground">Betalinger:</strong> Vi foretager ind- og udbetalinger via flere metoder og måler de faktiske behandlingstider.</li>
            <li><strong className="text-foreground">Kundeservice:</strong> Vi kontakter support med specifikke spørgsmål og vurderer responstid og kvalitet.</li>
            <li><strong className="text-foreground">Løbende opdatering:</strong> Alle anmeldelser gennemgås minimum hvert kvartal for at sikre, at informationen er aktuel.</li>
          </ul>
        </section>

        <Separator className="my-10" />

        {/* Sammenligning */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Sammenligning af alle anmeldte casinoer</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Casino</th>
                  <th className="px-4 py-3 text-left font-semibold">Bonus</th>
                  <th className="px-4 py-3 text-left font-semibold">Omsætning</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="hidden px-4 py-3 text-center font-semibold md:table-cell">Vurdering</th>
                  <th className="px-4 py-3 text-center font-semibold">Anmeldelse</th>
                </tr>
              </thead>
              <tbody>
                {reviewCasinos.map((casino, idx) => (
                  <tr key={casino.id} className={idx % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                    <td className="px-4 py-3 font-medium">{casino.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{casino.bonus_amount}</td>
                    <td className="px-4 py-3 text-muted-foreground">{casino.wagering_requirements}</td>
                    <td className="px-4 py-3">
                      <Badge variant={casino.bonus_type === "No-sticky" ? "secondary" : "outline"} className="text-xs">
                        {casino.bonus_type}
                      </Badge>
                    </td>
                    <td className="hidden px-4 py-3 text-center md:table-cell">
                      <span className="flex items-center justify-center gap-1 font-semibold">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        {casino.rating}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link to={`/${casino.slug}-anmeldelse`} className="text-primary underline hover:text-primary/80 font-medium text-sm">
                        Læs →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <InlineCasinoCards title="Anbefalede Casinoer" />

        <Separator className="my-10" />

        {/* Fordele og ulemper */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper ved hvert casino</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  <Link to="/spilleautomaten-anmeldelse" className={linkClass}>Spilleautomaten</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Stort spiludvalg med 2.500+ titler fra{" "}<Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}<Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> m.fl.</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Generøs{" "}<Link to="/no-sticky-bonus" className={linkClass}>No-Sticky</Link> velkomstbonus med kun 10x omsætning</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Hurtige udbetalinger via{" "}<Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> og{" "}<Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link></span></div>
                <div className="flex items-start gap-2"><ThumbsDown className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span>Ingen sportsbook eller betting-muligheder</span></div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  <Link to="/spildansknu-anmeldelse" className={linkClass}>SpilDanskNu</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Brugervenlighed og dansk fokus i hele platformen</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Fair{" "}<Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> med lave{" "}<Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link></span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Ingen bonuskode nødvendig</span></div>
                <div className="flex items-start gap-2"><ThumbsDown className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span>Lidt mindre spiludvalg end de største konkurrenter</span></div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  <Link to="/campobet-anmeldelse" className={linkClass}>Campobet</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Kombineret casino og sportsbetting med 3.000+ spil</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Stærkt{" "}<Link to="/live-casino" className={linkClass}>live casino</Link> fra{" "}<Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link></span></div>
                <div className="flex items-start gap-2"><ThumbsDown className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span>Kundeservice kan have ventetid i spidsbelastning</span></div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  <Link to="/betinia-anmeldelse" className={linkClass}>Betinia</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Over 40{" "}<Link to="/spiludviklere" className={linkClass}>spiludbydere</Link> og akkumulatorboost</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span><Link to="/no-sticky-bonus" className={linkClass}>No-Sticky</Link> velkomstbonus med 10x{" "}<Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link></span></div>
                <div className="flex items-start gap-2"><ThumbsDown className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span>Ingen{" "}<Link to="/free-spins" className={linkClass}>free spins</Link> inkluderet i velkomstpakken</span></div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  <Link to="/swift-casino-anmeldelse" className={linkClass}>Swift Casino</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Unik Hot Or Cold-funktion der viser aktive spilleautomater</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Over 3.300{" "}<Link to="/casinospil" className={linkClass}>casinospil</Link> fra anerkendte udbydere</span></div>
                <div className="flex items-start gap-2"><ThumbsDown className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span>Ingen{" "}<Link to="/free-spins" className={linkClass}>free spins</Link> i velkomstbonussen</span></div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  <Link to="/luna-casino-anmeldelse" className={linkClass}>Luna Casino</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>VIP-program med eksklusive fordele og bonusser</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span><Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> med 50{" "}<Link to="/free-spins" className={linkClass}>free spins</Link></span></div>
                <div className="flex items-start gap-2"><ThumbsDown className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span>Lavere bonusbeløb end nogle konkurrenter</span></div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Tips */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">5 tips til at vælge det rigtige casino</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Med så mange muligheder kan det være svært at vælge. Her er fem konkrete tips, der hjælper dig med at finde det casino, der passer bedst til dine behov.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">1. Læs vilkårene først</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Tjek altid{" "}<Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, tidsbegrænsning og spillebidrag, før du aktiverer en bonus.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">2. Vælg No-Sticky</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">En{" "}<Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> giver dig mest fleksibilitet, da dine egne penge altid er tilgængelige.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">3. Test kundeservice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Kontakt kundeservice med et spørgsmål, før du indbetaler. Det giver dig en fornemmelse for kvaliteten.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">4. Kend dine spil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Vælg et casino med de{" "}<Link to="/spiludviklere" className={linkClass}>spiludviklere</Link> og{" "}<Link to="/casinospil" className={linkClass}>casinospil</Link> du bedst kan lide.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">5. Sæt grænser</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Brug casinoets ansvarligt spil-værktøjer. Spil skal altid være{" "}<Link to="/responsible-gaming" className={linkClass}>ansvarligt</Link> og underholdende.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Bonus: Sammenlign</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Brug vores{" "}<Link to="/top-10-casino-online" className={linkClass}>Top 10 Casino Online</Link> oversigt for at finde det bedste tilbud.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* FAQ */}
        <Card className="mb-12">
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

import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CasinoCard } from "@/components/CasinoCard";
import { RelatedGuides } from "@/components/RelatedGuides";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles,
  ShieldCheck,
  Trophy,
  Star,
  CreditCard,
  Gift,
  Users,
  CheckCircle2,
  Loader2,
  HelpCircle,
  User,
  CalendarDays,
  BookOpen,
  RefreshCw,
  Zap,
  Target,
  Crown,
  Gamepad2,
  ArrowRight,
  ListChecks,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const casinoBonusFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er en casino bonus?",
    answer: (
      <>
        En casino bonus er et incitament, som online casinoer tilbyder for at tiltrække nye spillere eller belønne eksisterende kunder. Det kan være ekstra penge, gratis spins eller cashback. Læs mere i vores komplette{" "}
        <Link to="/bonus-guide" className={linkClass}>bonus guide</Link>.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på sticky og no-sticky bonus?",
    answer: (
      <>
        Ved en <Link to="/no-sticky-bonus" className={linkClass}>no-sticky bonus</Link> spiller du med dine egne penge først og kan hæve gevinster når som helst. Ved en <Link to="/sticky-bonus" className={linkClass}>sticky bonus</Link> kombineres indbetaling og bonus, og du skal opfylde omsætningskrav før udbetaling.
      </>
    ),
  },
  {
    question: "Hvordan fungerer omsætningskrav?",
    answer: (
      <>
        <Link to="/omsaetningskrav" className={linkClass}>Omsætningskrav</Link> angiver, hvor mange gange du skal spille bonusbeløbet igennem, før gevinster kan udbetales. Et krav på 10x for en bonus på 500 kr. kræver 5.000 kr. i samlede væddemål.
      </>
    ),
  },
  {
    question: "Kan jeg få bonus uden at indbetale?",
    answer: (
      <>
        Ja, nogle casinoer tilbyder <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link>. Disse er typisk mindre beløb eller free spins, som gives ved oprettelse af en konto – helt uden krav om indbetaling.
      </>
    ),
  },
  {
    question: "Hvad er de bedste casino bonusser i Danmark 2026?",
    answer:
      "De bedste bonusser i Danmark kombinerer generøse beløb med lave omsætningskrav og lang gyldighedsperiode. Vi anbefaler at sammenligne tilbud fra casinoer med dansk licens for at finde den bedste værdi.",
  },
  {
    question: "Er alle bonusser tilgængelige på mobil?",
    answer:
      "Ja, alle casinoer på vores liste er fuldt mobiloptimerede, og deres bonusser kan aktiveres og spilles på både smartphone og tablet.",
  },
  {
    question: "Kan jeg have flere bonusser aktive på samme tid?",
    answer:
      "Det afhænger af casinoet. De fleste danske casinoer tillader kun én aktiv bonus ad gangen. Tjek altid casinoets bonusvilkår for detaljer.",
  },
  {
    question: "Hvordan aktiverer jeg en casino bonus?",
    answer:
      "Typisk aktiveres bonussen automatisk ved din første indbetaling. Nogle casinoer kræver en bonuskode, som du indtaster i forbindelse med indbetalingen. Tjek altid vilkårene hos det specifikke casino.",
  },
  {
    question: "Hvad sker der, hvis jeg bryder bonusvilkårene?",
    answer:
      "Hvis du bryder bonusvilkårene – fx ved at satse mere end den tilladte maks-indsats – kan casinoet annullere din bonus og eventuelt tilhørende gevinster. Læs altid vilkårene grundigt.",
  },
  {
    question: "Er casino bonusser skattefrie i Danmark?",
    answer:
      "Ja, gevinster fra spil hos casinoer med dansk licens er skattefrie for spilleren. Casinoet betaler afgiften, så du modtager dine gevinster uden skattetræk.",
  },
];

const PRIORITY_SLUGS = ["spildansknu", "spilleautomaten"];

const CasinoBonus = () => {
  const { data: casinos, isLoading } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);

  const heroBackgroundImage = siteSettings?.hero_background_image;

  const sortedCasinos = casinos
    ?.filter((c) => c.is_active)
    ?.sort((a, b) => {
      const aIdx = PRIORITY_SLUGS.indexOf(a.slug);
      const bIdx = PRIORITY_SLUGS.indexOf(b.slug);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return a.position - b.position;
    })
    ?.slice(0, 6) ?? [];

  const mapCasino = (casino: typeof sortedCasinos[0]) => ({
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: casinoBonusFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.answer === "string" ? faq.answer : faq.question,
      },
    })),
  };

  return (
    <>
      <SEO
        title="Casino Bonus 2026 – Bedste Casinobonusser i Danmark"
        description="Komplet oversigt over de bedste casino bonusser i Danmark 2026. Sammenlign velkomstbonusser, free spins, no-sticky bonusser, cashback og meget mere fra casinoer med dansk licens."
        jsonLd={faqJsonLd}
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
              <Gift className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Casino Bonus – Din Guide til de Bedste Bonusser i Danmark
            </h1>
            <p className="text-lg text-white/80">
              Find de mest attraktive casino bonusser hos danske licenserede casinoer.
              Vi sammenligner velkomstbonusser, free spins, no-sticky bonusser og meget
              mere – alt med gennemsigtige vilkår og lave omsætningskrav.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        {/* Meta info bar */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>Skrevet af: <span className="font-medium text-foreground">Casinoaftaler</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>Siden opdateret: <span className="font-medium text-foreground">13-02-2026</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>Læsetid: <span className="font-medium text-foreground">12 Min.</span></span>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <p className="mb-4 text-lg text-muted-foreground leading-relaxed">
            Når du spiller online casino, kan en casino bonus gøre hele forskellen. Den øger spændingen, forlænger spilletiden og giver ekstra chancer for gevinst. Netop derfor er bonusser fra <Link to="/top-10-casino-online" className={linkClass}>online casinoer</Link> så populære blandt danske spillere. Vil du have mest muligt ud af dine indskud, gælder det om at finde de bedste bonusser på det danske marked.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hos Casinoaftaler præsenterer vi en omfattende oversigt over de mest attraktive casino bonusser, der altid giver dig adgang til de seneste og mest tiltalende tilbud – skræddersyet til danske spillere. Vi ved, at ikke alle casino bonusser er skabt lige. De allerbedste casino bonusser byder retfærdige betingelser, der kan opfyldes inden for den tildelte bonusperiode.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            At finkæmme markedet for de bedste casino bonusser kan være en udfordrende opgave. Derfor arbejder vi utrætteligt på at opdatere vores liste og kun udvælge de bedste casino bonusser for 2026, så du får den mest givende spiloplevelse muligt.
          </p>
        </section>

        {/* Table of Contents */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-primary" />
              Indhold på denne side
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1 sm:grid-cols-2">
              {[
                { label: "Bedste casino bonusser 2026", id: "bedste-bonusser" },
                { label: "Hvorfor spille med casino bonus?", id: "hvorfor-bonus" },
                { label: "Typer af casino bonusser", id: "bonus-typer" },
                { label: "Velkomstbonus", id: "velkomstbonus" },
                { label: "No-Sticky Bonus", id: "no-sticky" },
                { label: "Sticky Bonus", id: "sticky" },
                { label: "Free Spins", id: "free-spins" },
                { label: "Bonus uden indbetaling", id: "no-deposit" },
                { label: "Bonus uden omsætningskrav", id: "uden-omsaetning" },
                { label: "Cashback bonus", id: "cashback" },
                { label: "Reload bonus", id: "reload" },
                { label: "Live casino bonus", id: "live-casino-bonus" },
                { label: "Bonusvilkår og begrænsninger", id: "bonusvilkaar" },
                { label: "Sådan aktiverer du en bonus", id: "aktiver-bonus" },
                { label: "Ofte stillede spørgsmål", id: "faq" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-primary hover:bg-primary/10 transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  {item.label}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Best Casino Bonuses Section with Cards */}
        <section id="bedste-bonusser" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bedste Casino Bonusser Februar 2026</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Herunder finder du vores håndplukkede liste med de bedste casino bonusser for danske spillere. Alle casinoer har gyldig dansk licens fra Spillemyndigheden og er gennemgået af vores ekspertteam.
          </p>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {sortedCasinos.slice(0, 2).map((casino, index) => (
                  <CasinoCard
                    key={casino.id}
                    casino={mapCasino(casino)}
                    rank={index + 1}
                    open={openCasinoId === casino.id}
                    onOpenChange={(open) => setOpenCasinoId(open ? casino.id : null)}
                  />
                ))}
              </div>
              {sortedCasinos.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  {sortedCasinos.slice(2, 5).map((casino, index) => (
                    <CasinoCard
                      key={casino.id}
                      casino={mapCasino(casino)}
                      rank={index + 3}
                      open={openCasinoId === casino.id}
                      onOpenChange={(open) => setOpenCasinoId(open ? casino.id : null)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <Separator className="my-10" />

        {/* Why play with bonus */}
        <section id="hvorfor-bonus" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvorfor Spille med Casino Bonus?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            At spille på et online casino kan i sig selv være en spændende oplevelse. Men når du tilføjer en casino bonus til ligningen, åbner der sig en verden af nye muligheder. En casino bonus er mere end bare et fristende tilbud – den er en gylden chance for at styrke og forbedre din spiloplevelse og måske endda øge dine vinderchancer.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Disse bonusser kommer i mange former, lige fra <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link> til loyalitetsbelønninger, og hver har sit eget sæt af fordele. Med en veludnyttet bonus kan du forlænge din spilletid, udforske nye spil uden risiko og potentielt vinde mere. Men husk altid at læse og forstå bonusbetingelserne – en god bonus er ikke kun generøs i størrelse, men også retfærdig i sine krav.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Sparkles, title: "Forlænget spilletid", desc: "Få ekstra penge eller gratis spins, så du kan spille længere og jagte flere gevinster uden at øge dit budget." },
              { icon: ShieldCheck, title: "Lavere risiko", desc: "Prøv nye spil uden at bruge egne penge – især nyttigt for nybegyndere, der vil udforske casinoets udvalg." },
              { icon: Gamepad2, title: "Opdag nye spil", desc: "Bonusser målrettet specifikke titler giver en nem måde at udforske ukendte automater eller livespil." },
              { icon: Trophy, title: "Bedre vinderchancer", desc: "Flere runder betyder flere chancer for at ramme jackpot eller udløse bonusfunktioner i spilleautomater." },
              { icon: Crown, title: "VIP & loyalitetsfordele", desc: "Genindskuds- og cashback-tilbud plus eksklusive VIP-bonusser belønner faste spillere over tid." },
              { icon: Target, title: "Strategisk fordel", desc: "Ved at vælge bonusser med lave omsætningskrav kan du maksimere værdien af dine indbetalinger." },
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

        {/* Types of casino bonuses overview */}
        <section id="bonus-typer" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Typer af Casino Bonusser</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Det danske casinomarked byder på et bredt udvalg af bonustyper – fra velkomstbonusser der fordobler dit første indskud, til no-deposit bonusser og free spins. Her gennemgår vi de mest populære bonustyper, så du kan vælge den der passer bedst til din spillestil.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Gift, title: "Velkomstbonus", to: "/velkomstbonus", desc: "Den mest populære bonustype – casinoet matcher din første indbetaling med en procentdel." },
              { icon: Sparkles, title: "No-Sticky Bonus", to: "/no-sticky-bonus", desc: "Spil med dine egne penge først og hæv gevinster frit. Bonussen aktiveres kun ved tab." },
              { icon: Star, title: "Sticky Bonus", to: "/sticky-bonus", desc: "Indbetaling og bonus kombineres til én saldo med omsætningskrav." },
              { icon: Zap, title: "Free Spins", to: "/free-spins", desc: "Gratis spins på populære spilleautomater – ofte som del af en velkomstpakke." },
              { icon: CreditCard, title: "Indskudsbonus", to: "/indskudsbonus", desc: "Casinoet matcher en procentdel af din indbetaling op til et bestemt maksimumsbeløb." },
              { icon: Gift, title: "Bonus uden Indbetaling", to: "/bonus-uden-indbetaling", desc: "Gratis bonus ved oprettelse – helt uden krav om indbetaling." },
              { icon: RefreshCw, title: "Bonus uden Omsætningskrav", to: "/bonus-uden-omsaetningskrav", desc: "Udbetal gevinster med det samme – ingen gennemspilskrav." },
              { icon: Users, title: "Cashback Bonus", to: "#cashback", desc: "Få en procentdel af dine tab tilbage som bonus over en periode." },
              { icon: RefreshCw, title: "Reload Bonus", to: "#reload", desc: "Bonus til eksisterende spillere ved yderligere indbetalinger." },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">
                      <Link to={item.to} className="hover:text-primary transition-colors">{item.title}</Link>
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Velkomstbonus */}
        <section id="velkomstbonus" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Velkomstbonus</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/velkomstbonus" className={linkClass}>Velkomstbonussen</Link> er operatørernes mulighed for at byde nye spillere varmt velkommen. Denne type bonus tilbydes typisk som en del af din første oplevelse på et casino og kan variere i størrelse og form. Det er ret typisk, at velkomstbonusser matcher din første indbetaling med 100% op til et bestemt beløb – fx 1.000 kr.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nogle casinoer tager skridtet videre og krydrer indbetalingsbonusserne med free spins. For eksempel kan en velkomstpakke indeholde en 100% match bonus op til 1.000 kr. plus 50 free spins på en populær spilleautomat. I sjældnere tilfælde strækker velkomstbonussen sig over dine første par indskud med en trinvis bonus.
          </p>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <h4 className="mb-2 font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Eksempel på velkomstbonus
              </h4>
              <p className="text-sm text-muted-foreground">
                Du indbetaler 500 kr. og modtager en 100% match bonus på 500 kr. – i alt har du 1.000 kr. at spille for. Nogle casinoer tilbyder desuden gratis spins oveni. Tjek altid <Link to="/omsaetningskrav" className={linkClass}>omsætningskravene</Link> før du accepterer.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* No-Sticky Bonus */}
        <section id="no-sticky" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">No-Sticky Bonus</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky Bonus</Link> er en yderst attraktiv bonusform, som giver større fleksibilitet og kontrol. Det unikke ved denne bonus er, at den holder dine egne indskud adskilt fra bonusmidlerne. Når du modtager en no-sticky bonus, bruger du først dine indbetalte penge. Vinder du, mens du spiller for dine egne penge, kan du hæve gevinsterne uden at opfylde bonussens betingelser.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne adskillelse af spillemidler betyder, at du har fuld kontrol over dine indskud. Bonussens betingelser træder først i kraft, når dine egne penge er brugt op. Når det sker, aktiveres bonusmidlerne, og eventuelle gevinster fra disse midler bliver underlagt casinoets omsætningskrav.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              "Hæv gevinster fra egne penge når som helst",
              "Lavere risiko – bonus virker som sikkerhedsnet",
              "Fuld kontrol over dine indskud",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Sticky Bonus */}
        <section id="sticky" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sticky Bonus</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I modsætning til no-sticky bonus er <Link to="/sticky-bonus" className={linkClass}>sticky bonus</Link> en bonusform, hvor bonusbeløbet er "klistret" til din konto. Din indbetaling og bonussen kombineres, og de samlede midler er underlagt omsætningskrav. Selvom du ikke kan udbetale selve bonusbeløbet, kan du bruge det til at spille med det samme.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Sticky bonusser byder ofte en større værdi og giver mere spillekapital, hvilket kan forlænge spilletiden betydeligt. Det er dog vigtigt at forstå, at du skal opfylde alle omsætningskrav, før du kan hæve gevinster.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Free Spins */}
        <section id="free-spins" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Free Spins</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/free-spins" className={linkClass}>Free spins</Link> er en af de mest populære bonusformer i Danmark. Disse gratis spins giver dig mulighed for at spinne hjulene på udvalgte spilleautomater uden at satse egne penge. Du finder dem ofte som en del af en velkomstpakke, en særlig kampagne eller som loyalitetsbonus.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En særlig variant er <strong>cash spins</strong> (også kaldet wager-free spins), hvor gevinsterne ikke er underlagt omsætningskrav. Det betyder, at eventuelle gevinster tilføjes direkte til din spillesaldo og kan udbetales med det samme – uden behov for yderligere spil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Free spins uden indbetaling</strong> er særligt attraktive, da de tillader dig at prøve spilleautomater uden at foretage en indbetaling. Denne type bonus er ideel for nye spillere, der ønsker at udforske et casinos spiludbud risikofrit. Læs mere om <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* No Deposit */}
        <section id="no-deposit" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bonus uden Indbetaling (No Deposit Bonus)</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En <Link to="/bonus-uden-indbetaling" className={linkClass}>no deposit casino bonus</Link> er særlig attraktiv, fordi den ikke kræver, at du tager penge op af lommen. Denne type bonus gives ofte ved oprettelse af en konto og kan være i form af bonuspenge eller free spins. Med en no deposit bonus har du en fantastisk mulighed for at afprøve et casino helt uden risiko.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vær opmærksom på, at gevinster fra no deposit bonusser ofte er underlagt omsætningskrav, og der kan være en maksimal grænse for, hvor meget du kan vinde og udbetale.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Bonus uden omsætningskrav */}
        <section id="uden-omsaetning" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bonus uden Omsætningskrav</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En <Link to="/bonus-uden-omsaetningskrav" className={linkClass}>bonus uden omsætningskrav</Link> er som musik i ørerne for casinospillere. Den giver dig friheden til at udbetale dine gevinster med det samme – uanset om du har vundet 2 kr. eller 1.000 kr. Disse bonusser er særligt eftertragtede, da de tilbyder klar og direkte værdi uden de komplicerede betingelser, som ellers følger med de fleste bonusser.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Cashback */}
        <section id="cashback" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Cashback Bonus</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En cashback bonus tilbagebetaler en procentdel af dine nettotab over en defineret periode. For eksempel kan et casino tilbyde 10% cashback på alle tab op til 500 kr. – taber du 1.000 kr. over en uge, modtager du 100 kr. tilbage som bonuspenge.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Cashback bonusser beregnes typisk på daglig, ugentlig eller månedlig basis og varierer i størrelse afhængigt af dit aktivitetsniveau. De er ideelle, hvis du søger at minimere din risiko, og er ofte en del af casinoets loyalitetsprogram.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Reload */}
        <section id="reload" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Reload Bonus</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når den første begejstring fra velkomstbonussen har lagt sig, står reload bonussen klar til at genoplive spilleglæden. Denne bonus er rettet mod eksisterende spillere og tilbydes som en belønning for loyalitet og fortsat spil. En reload bonus fungerer som en match bonus, hvor casinoet matcher en procentdel af dit indskud.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Flere casinoer tilbyder ugentlige og weekend reload bonusser med ekstra cashback eller free spins oveni. Det er en fantastisk måde at få mere spilletid og føle sig værdsat som eksisterende kunde.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Live Casino Bonus */}
        <section id="live-casino-bonus" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Live Casino Bonus</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En <Link to="/live-casino" className={linkClass}>live casino</Link> bonus er skræddersyet til live dealer-spil, der virtuelt bringer casinoet direkte ind i dit hjem. Disse bonusser kan komme som matchbonusser specifikt for live spil eller som cashback-bonusser, der giver en procentdel af dine tab tilbage.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Live casino bonusser er en fremragende måde at blive introduceret til blackjack, roulette og baccarat med rigtige dealers – uden at satse for mange af dine egne penge.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Bonusvilkår */}
        <section id="bonusvilkaar" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bonusvilkår og Begrænsninger</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle casino bonusser kommer med vilkår og betingelser, som det er vigtigt at forstå. De vigtigste faktorer at være opmærksom på er <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, gyldighedsperiode, maksimale indsatsgrænser og hvilke spil der tæller med.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h4 className="mb-2 font-semibold">Omsætningskrav</h4>
                <p className="text-sm text-muted-foreground">
                  Angiver hvor mange gange bonussen skal spilles igennem. Under 10x er fremragende, 10x–20x er standard i Danmark, over 30x er højt. En 500 kr. bonus med 10x krav = 5.000 kr. i samlede væddemål.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h4 className="mb-2 font-semibold">Gyldighedsperiode</h4>
                <p className="text-sm text-muted-foreground">
                  De fleste bonusser har en tidsbegrænsning – typisk 30–60 dage. Hvis du ikke opfylder omsætningskravene inden for perioden, bortfalder bonussen og eventuelle gevinster.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h4 className="mb-2 font-semibold">Maksimal indsats</h4>
                <p className="text-sm text-muted-foreground">
                  Mange bonusser har en maks-indsats pr. spin (fx 25–50 kr.), som du ikke må overskride, mens du spiller med bonusmidler. Overtrædelse kan resultere i annullering.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <h4 className="mb-2 font-semibold">Spilbidrag</h4>
                <p className="text-sm text-muted-foreground">
                  Ikke alle spil tæller lige meget mod omsætningskrav. Slots tæller typisk 100%, mens bordspil og live casino ofte tæller 10–20% eller slet ikke.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* How to activate */}
        <section id="aktiver-bonus" className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sådan Aktiverer du en Casino Bonus – Trin for Trin</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Er du ny i casinoverdenen? Ingen bekymringer – at aktivere en bonus er nemmere, end du tror. Her er en enkel guide:
          </p>
          <div className="space-y-4">
            {[
              { step: "1", title: "Find dit casino", desc: "Gå på opdagelse og vælg et af vores udvalgte casinoer med gode anmeldelser og et spiludvalg der passer dig." },
              { step: "2", title: "Læs om bonussen", desc: "Tjek omsætningskrav, gyldighedsperiode og hvilke spil der tæller – så undgår du ubehagelige overraskelser." },
              { step: "3", title: "Opret din konto", desc: "Klik 'Tilmeld', log ind med MitID, og udfyld dine oplysninger. Det er hurtigt, sikkert og tager kun et øjeblik." },
              { step: "4", title: "Indbetal & aktiver", desc: "Vælg din foretrukne betalingsmetode, indbetal minimumsbeløbet, indtast evt. bonuskode og aktivér bonussen." },
              { step: "5", title: "Spil & hav det sjovt!", desc: "Udforsk spillene – fra farverige slots til live-borde. Husk: Sæt et budget, spil ansvarligt og nyd hvert spin!" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Responsible gambling note */}
        <Card className="mb-12 border-primary/30 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="mb-2 font-semibold">Ansvarligt Spil</h3>
                <p className="text-sm text-muted-foreground">
                  Casino bonusser skal bruges til underholdning – ikke som en indtægtskilde. Sæt altid et budget og hold dig til det. Hvis du oplever problemer med spil, kan du altid kontakte{" "}
                  <a href="https://www.stopspillet.dk" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet.dk</a>{" "}
                  eller selvudelukke via{" "}
                  <a href="https://www.rofus.nu" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>.
                  Læs mere om <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <section id="faq" className="mb-12">
          <h2 className="mb-6 flex items-center gap-2 text-3xl font-bold">
            <HelpCircle className="h-7 w-7 text-primary" />
            Ofte Stillede Spørgsmål om Casino Bonus
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {casinoBonusFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <RelatedGuides currentPath="/casino-bonus" />
      </div>
    </>
  );
};

export default CasinoBonus;

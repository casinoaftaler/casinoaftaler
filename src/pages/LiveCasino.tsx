import React, { useState } from "react";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import liveCasinoHero from "@/assets/heroes/live-casino-hero.jpg";
import { SEO } from "@/components/SEO";
import { buildFaqSchema } from "@/lib/seo";
import { CasinoCard } from "@/components/CasinoCard";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { useCasinos } from "@/hooks/useCasinos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles,
  ShieldCheck,
  HelpCircle,
  User,
  CalendarDays,
  BookOpen,
  CheckCircle2,
  Gift,
  Clock,
  Target,
  Gamepad2,
  DollarSign,
  TrendingUp,
  CreditCard,
  Monitor,
  Smartphone,
  MessageCircle,
  Star,
  Tv,
  Users,
  Loader2,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";


const linkClass = "text-primary underline hover:text-primary/80";

const liveCasinoFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvordan fungerer live casino teknisk, og hvad kræves af min internetforbindelse?",
    answer:
      "Live casino bruger avanceret multi-kamera streaming-teknologi fra professionelle studier – typisk med 3–8 HD-kameraer pr. bord, der dækker alle vinkler. Optical Character Recognition (OCR) digitaliserer kort og kuglepositioner i realtid, så resultaterne vises øjeblikkeligt på din skærm. Du har brug for minimum 5 Mbit/s downloadhastighed for stabil HD-streaming, selvom 10+ Mbit/s anbefales for den bedste oplevelse. De fleste udbydere tilbyder automatisk kvalitetsjustering, der tilpasser videoopløsningen til din forbindelse. Latency holdes typisk under 2 sekunder, så du kan interagere med dealeren næsten i realtid.",
  },
  {
    question: "Hvad er forskellen på de store live casino-udbydere, og hvem er bedst?",
    answer: (
      <>
        <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> er den ubestridte markedsleder med over 85 % markedsandel i live casino-segmentet. De tilbyder det bredeste udvalg med 200+ bordvarianter, herunder unikke game shows som Crazy Time (97,72 % RTP), Lightning Roulette (97,30 % RTP) og Monopoly Live.{" "}
        <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> Live har vokset hurtigt med dedikerede studier og konkurrencedygtige borde med lavere minimumsindsatser. Playtech tilbyder stærke blackjack-varianter, mens{" "}
        <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link> samarbejder med On Air Entertainment om baccarat-specialiteter. Valget afhænger af dine præferencer: Evolution for variation, Pragmatic for budget-venlige borde.
      </>
    ),
  },
  {
    question: "Hvilke live casino-spil har den laveste house edge for danske spillere?",
    answer:
      "Blackjack med optimal basisstrategi har den laveste house edge på live casinoer – helt ned til 0,5 % på standard 8-deck spil. Baccarat følger med 1,06 % på banker-bet og 1,24 % på player-bet (undgå tie-bet med 14,36 % house edge). Live roulette varierer markant: europæisk roulette har 2,70 % house edge, mens Lightning Roulette har en effektiv house edge på ca. 2,78 % grundet multiplikator-mekanikken. Game shows som Crazy Time og Dream Catcher har typisk 3–5 % house edge. For de bedste odds bør du fokusere på klassiske bordspil frem for game shows, selvom sidstnævnte tilbyder højere underholdningsværdi.",
  },
  {
    question: "Kan jeg bruge min velkomstbonus til live casino-spil?",
    answer: (
      <>
        De fleste{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link> kan teknisk set bruges på live casino, men spilbidraget er typisk kun 10 % sammenlignet med 100 % for spilleautomater. Det betyder, at en bonus med 10x{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> reelt kræver 100x omsætning på live casino-spil. Nogle casinoer udelukker helt live casino fra bonusomsætning. Tjek altid de specifikke bonusvilkår, før du spiller live med bonusmidler. Et alternativ er at bruge en{" "}
        <Link to="/bonus-uden-indbetaling" className={linkClass}>bonus uden indbetaling</Link> på spilleautomater og reservere din egen indbetaling til live casino-spil, hvor du spiller uden bonusbegrænsninger.
      </>
    ),
  },
  {
    question: "Er live casinoer tilgængelige med danske dealere, og hvornår er bordene åbne?",
    answer: (
      <>
        Flere danske licenserede casinoer tilbyder borde med dansktalende dealere, primært i peak-timerne fra kl. 18–24. Uden for disse timer er engelsktalende dealere altid tilgængelige, da de internationale studier opererer 24/7. Evolution Gaming har dedikerede danske borde for udvalgte operatører. Minimumsindsatserne varierer: dansktalende borde starter typisk fra 25–50 kr. pr. runde, mens internationale borde kan starte fra 5–10 kr. For de fleste danske spillere er sproget ikke en barriere, da interfacet er fuldt oversat, og de engelsktalende dealere er professionelle og letforståelige. Se vores{" "}
        <Link to="/top-10-casino-online" className={linkClass}>top 10 liste</Link>.
      </>
    ),
  },
  {
    question: "Hvad er live casino game shows, og hvordan adskiller de sig fra klassiske bordspil?",
    answer:
      "Live casino game shows er en hybrid mellem traditionelle casinospil og tv-underholdning, pioneeret af Evolution Gaming fra 2018. Spillene bruger store studier med farverigt sceneri, hjul, kugler og bonusrunder med publikumselementer. De mest populære inkluderer Crazy Time (med fire bonusspil og multiplikatorer op til 25.000x), Dream Catcher (simpelt penghjul med op til 40x multiplikator), Monopoly Live (kombination af penghjul og 3D-bonusrunde) og Lightning Dice. Fordelen er lav indgangsbarriere – du behøver ingen strategi – og den høje underholdningsværdi. Ulempen er typisk højere house edge (3–5 %) sammenlignet med klassiske bordspil.",
  },
];

const LiveCasino = () => {
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos, isLoading: casinosLoading } = useCasinos();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(liveCasinoFaqs);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Live Casino – Bedste Live Casinoer i Danmark 2026",
    description: "Komplet guide til live casino i Danmark 2026. Find de bedste live casinoer med rigtige dealere.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2025-06-01",
    dateModified: "2026-02-11",
    mainEntityOfPage: "https://casinoaftaler.dk/live-casino",
  };

  return (
    <>
      <SEO
        title="Live Casino – Bedste Live Casinoer i Danmark 2026 | Casinoaftaler"
        description="Komplet guide til live casino i Danmark 2026. Find de bedste live casinoer med rigtige dealere, live roulette, blackjack og baccarat. Sammenlign bonusser og spiltyper."
        jsonLd={[faqJsonLd, articleJsonLd]}
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
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Live Casino i Danmark
            </h1>
            <p className="text-lg text-white/80">
              Oplev den autentiske casinooplevelse med rigtige dealere, live
              streaming og interaktive spil – alt sammen fra din egen stue.
              Vi guider dig til de bedste live casinoer for danske spillere.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="11-02-2026" readTime="15 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={liveCasinoHero} alt="Live casino dealer ved blackjack bordet" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad er et live casino?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live casino har revolutioneret den måde, vi spiller online på. I stedet for at spille mod en computer og en tilfældighedsgenerator, sidder du nu over for rigtige dealere, der håndterer kortene, drejer roulettehjulet og styrer spillet – alt sammen streamet i knivskarpe billeder direkte til din skærm. Det er som at have et ægte casino lige ved hånden, uanset om du sidder i sofaen eller er på farten.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Forskellen mellem et live casino og almindelige online casinospil ligger i interaktiviteten. Du kan chatte med dealeren og andre spillere, og følelsen af at være "til stede" gør hele forskellen. Det er perfekt for dig, der elsker casinospil, men ikke vil gå glip af den sociale dimension, som man normalt kun finder i fysiske casinoer.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Gennem denne guide dækker vi alt, du har brug for at vide om live casino i Danmark. Vi gennemgår, hvordan du kommer i gang, hvilke spil der er populære, de førende{" "}
            <Link to="/spiludviklere" className="text-primary hover:underline font-medium">spiludviklere</Link>
            {" "}bag spillene, og hvilke casinoer der leverer de bedste live oplevelser til danske spillere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live casino er en af de mest engagerende kategorier inden for{" "}
            <Link to="/casinospil" className="text-primary hover:underline font-medium">casinospil</Link>{" "}
            – udforsk alle spiltyper i vores komplette guide.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Se de bedste casino-øjeblikke fra vores streams på{" "}
            <Link to="/highlights" className="text-primary hover:underline font-medium">vores highlights-side</Link>
            , eller prøv vores egne{" "}
            <Link to="/community/slots" className="text-primary hover:underline font-medium">gratis spilleautomater</Link>{" "}
            i spillehallen.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Sådan fungerer live casinoer */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan fungerer live casinoer
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Du behøver ikke være teknologiekspert for at nyde spændingen ved live casinoer. Det hele starter med avancerede kameraer i høj kvalitet, der streamer spillet live fra et professionelt casinostudie direkte til din skærm. Via flere kameravinkler og close-ups ser du hver eneste detalje – fra kuglen der danser på roulettehjulet til kortene der bliver delt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Tv className="h-5 w-5 text-primary" />
                  HD & 4K Streaming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Moderne live casinoer bruger HD- og 4K-streaming, der giver knivskarpe billeder og en oplevelse, der næsten føler sig mere ægte end virkeligheden. Ingen forsinkelser, ingen pixelering – bare ren casinostemning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Interaktiv Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Via den integrerede chatfunktion kan du kommunikere direkte med dealeren og andre spillere ved bordet. Still spørgsmål, hils på dealeren eller del din begejstring – det skaber en social dimension, der gør oplevelsen unik.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  Professionelle Dealere
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Live casino dealere er trænede professionelle, der styrer spillet med præcision og karisma. De byder velkommen, holder stemningen oppe og sørger for, at alting forløber gnidningsfrit – præcis som i et fysisk casino.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Monitor className="h-5 w-5 text-primary" />
                  Professionelle Studier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Spillene produceres i dedikerede studier af førende spiludviklere som Evolution Gaming og Pragmatic Play. Det er udviklerne – ikke casinoerne – der står for streamingen og produktionen af live spillene.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Spiltyper */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Populære live casino spil
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Når det kommer til live casinoer, er det ikke bare ét spil du har adgang til – det er en hel verden af forskellige oplevelser. Fra klassiske bordspil til innovative game shows finder du noget for enhver spillestil. Her er de mest populære spiltyper:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Live Roulette
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Det mest ikoniske casinospil. Se kuglen danse hen over hjulet i realtid, mens du placerer dine indsatser. Populære varianter inkluderer Europæisk Roulette, Lightning Roulette og Speed Roulette – hver med sine unikke twists.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Live Blackjack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Kombinationen af held og strategi gør blackjack til et af de mest elskede live spil. Spil klassisk blackjack eller prøv Infinite Blackjack, hvor uendeligt mange spillere kan deltage samtidig.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  Live Baccarat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Elsker du hurtigt tempo og enkle regler? Baccarat er ideelt. Vælg mellem Punto Banco for den klassiske oplevelse eller Speed Baccarat, hvor tempoet er skruet op til maksimum.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Live Poker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For strategi-elskere er live poker det oplagte valg. Prøv Casino Hold'em, Three Card Poker eller den klassiske Draw Poker – alle med rigtige dealere og den autentiske pokerstemning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Game Shows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  En ny og spændende kategori der blander casinospil med TV-underholdning. Populære titler som Crazy Time, Monopoly Live og Dream Catcher byder på lykkehjul, bonusrunder og store multiplikatorer.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Lightning-serien
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Evolution Gamings populære Lightning-serie tilføjer tilfældige multiplikatorer til klassiske spil. Lightning Roulette, Lightning Blackjack og Lightning Baccarat giver ekstra spænding og mulighed for kæmpe gevinster.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Casino Cards Section */}
        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Casinoer med live casino</h2>
          {casinosLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (() => {
            const liveCasinos = (casinos ?? [])
              .filter((c) => c.is_active && c.slug !== "betit")
              .slice(0, 6);
            const mapCasino = (casino: typeof liveCasinos[0]) => ({
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
            return liveCasinos.length === 0 ? null : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  {liveCasinos.slice(0, 2).map((casino, index) => (
                    <CasinoCard
                      key={casino.id}
                      casino={mapCasino(casino)}
                      rank={index + 1}
                      open={openCasinoId === casino.id}
                      onOpenChange={(open) => setOpenCasinoId(open ? casino.id : null)}
                    />
                  ))}
                </div>
                {liveCasinos.length > 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    {liveCasinos.slice(2).map((casino, index) => (
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
            );
          })()}
        </section>

        <Separator className="my-10" />

        {/* Udviklere */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            De største udviklere af live casinospil
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Kvaliteten af live casino-oplevelsen afhænger i høj grad af de{" "}
            <Link to="/spiludviklere" className="text-primary hover:underline font-medium">spiludviklere</Link>
            , der står bag spillene. Det er faktisk kun en lille håndfuld producenter, der står bag størstedelen af markedets live spil – men de leverer til gengæld i verdensklasse.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Evolution Gaming",
                desc: (<>Ubestridt markedsleder inden for live casino. Står bag ikoniske spil som Lightning Roulette, Crazy Time og Monopoly Live. <Link to="/spiludviklere/evolution-gaming" className="text-primary hover:underline">Læs vores Evolution Gaming-guide</Link>.</>),
              },
              {
                title: "Pragmatic Play Live",
                desc: (<>En af de mest fremadstormende udviklere, kendt for kreative nyfortolkninger af klassiske spil. <Link to="/spiludviklere/pragmatic-play" className="text-primary hover:underline">Læs vores Pragmatic Play-guide</Link>.</>),
              },
              {
                title: "Playtech",
                desc: "En af verdens ældste spiludviklere med et bredt udvalg af live baccarat, roulette, blackjack og poker. Playtech er kendt for sin pålidelige teknologi og professionelle studier.",
              },
              {
                title: "Microgaming",
                desc: (<>Pionerer inden for casinospil siden 1994. Ud over deres berømte spilleautomater har Microgaming også produceret populære live versioner af Casino Hold'em, blackjack og baccarat. <Link to="/spiludviklere/microgaming" className="text-primary hover:underline">Læs vores Microgaming-guide</Link>.</>),
              },
            ].map((dev) => (
              <div
                key={dev.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{dev.title}</h3>
                  <p className="text-sm text-muted-foreground">{dev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Bonusser til live casino */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Bonusser til live casinoer
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Uanset om du spiller live casino på en dansk platform eller et internationalt spillested, kan du næsten altid forvente en{" "}
            <Link to="/velkomstbonus" className="text-primary hover:underline font-medium">velkomstbonus</Link>
            {" "}eller{" "}
            <Link to="/indskudsbonus" className="text-primary hover:underline font-medium">indskudsbonus</Link>
            {" "}som en del af pakken. Her er de mest almindelige bonustyper, du finder hos live casinoer:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Indbetalingsbonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Den mest udbredte bonustype, hvor casinoet matcher din første indbetaling – typisk 100% op til 1.000 kr. Kan bruges på alle spil inklusiv live casino. Læs mere om{" "}
                  <Link to="/indskudsbonus" className="text-primary hover:underline">indskudsbonusser</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  Bonus uden Indbetaling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nogle casinoer tilbyder en{" "}
                  <Link to="/bonus-uden-indbetaling" className="text-primary hover:underline">gratis bonus uden indbetaling</Link>
                  {" "}til nye spillere. Bonussen aktiveres ved registrering og kan i nogle tilfælde bruges på live spil.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Cashback Bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  En stigende trend hos live casinoer. Du får en procentdel af dine tab refunderet – typisk 10-20% ugentligt. Ofte helt{" "}
                  <Link to="/bonus-uden-omsaetningskrav" className="text-primary hover:underline">uden omsætningskrav</Link>.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Sådan kommer du i gang */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan kommer du i gang med live casino
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            At komme i gang med live casino er nemt og kræver kun få trin. Her er en trin-for-trin guide, så du hurtigt kan opleve den autentiske casinostemning:
          </p>

          <div className="space-y-3">
            {[
              {
                step: "1",
                title: "Vælg dit live casino",
                desc: "Sammenlign de bedste live casinoer og find det, der passer til din spillestil. Kig efter spiludvalg, bonusser og betalingsmetoder.",
                icon: Target,
              },
              {
                step: "2",
                title: "Opret en konto med MitID",
                desc: "Registrer dig hos det valgte casino og bekræft din identitet via MitID. Processen tager kun få minutter og sikrer, at alt foregår lovligt.",
                icon: ShieldCheck,
              },
              {
                step: "3",
                title: "Foretag din første indbetaling",
                desc: "Vælg din foretrukne betalingsmetode – MobilePay, Trustly eller kort – og indbetal. Din velkomstbonus aktiveres typisk automatisk.",
                icon: CreditCard,
              },
              {
                step: "4",
                title: "Vælg dit live spil og spil!",
                desc: "Gå til live casino-sektionen, vælg dit foretrukne spil – roulette, blackjack, baccarat eller et game show – og tag plads ved bordet.",
                icon: Gamepad2,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Hvad skal du kigge efter */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Dette skal du være opmærksom på ved live casinoer
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Når du skal vælge et live casino, handler det ikke kun om hvem der har de flotteste spil eller de største bonusser. Sikkerhed, support og den samlede oplevelse er mindst lige så vigtige. Her er de faktorer, du bør overveje:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Gamepad2, title: "Spiludvalg", desc: "Flere spil betyder mere variation og underholdning. Kig efter et bredt udvalg af roulette, blackjack, baccarat og game shows." },
              { icon: Gift, title: "Bonustilbud", desc: "Bonusser øger din bankroll, men tjek altid omsætningskravene. Læs vores guide til omsætningskrav for at forstå vilkårene." },
              { icon: ShieldCheck, title: "Licens og Sikkerhed", desc: "En dansk licens fra Spillemyndigheden sikrer fair spil og beskytter dig. Alle casinoer på vores liste er fuldt licenserede." },
              { icon: Users, title: "Kundesupport", desc: "Hurtig og kompetent hjælp er vigtigt, hvis du støder på tekniske problemer under live spil. Prioritér casinoer med 24/7 live chat." },
              { icon: Smartphone, title: "Mobiloplevelse", desc: "De fleste spiller fra mobilen. Sørg for, at dit valgte casino tilbyder en smidig live casino-oplevelse på alle enheder." },
              { icon: Clock, title: "Streaming-kvalitet", desc: "Knivskarpe billeder og ingen forsinkelser er afgørende for live casino. De bedste casinoer tilbyder HD- og 4K-streaming." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
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

        {/* Live casino på mobil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Live casino på mobilen
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live casinospil er ikke kun forbeholdt computere. Mange tror, at det kræver en kraftig enhed for at håndtere live streaming, men i dag er alle moderne live casino-platforme fuldt kompatible med mobile enheder. Du kan spille live roulette, blackjack, baccarat og game shows direkte fra din smartphone eller tablet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle licenserede live casino-platforme fungerer gnidningsfrit på både iOS og Android. Det betyder, at du kan nyde den fulde live casino-oplevelse på farten – uanset om du har en iPhone, iPad, Android-telefon eller tablet. De fleste{" "}
            <Link to="/nye-casinoer" className="text-primary hover:underline font-medium">nye casinoer</Link>
            {" "}er designet med en mobil-first tilgang, så mobiloplevelsen er ofte lige så god – eller bedre – end på computer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Læs mere om{" "}
            <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">betalingsmetoder</Link>
            {" "}til mobil, herunder <Link to="/betalingsmetoder/mobilepay" className="text-primary hover:underline font-medium">MobilePay</Link> og <Link to="/betalingsmetoder/trustly" className="text-primary hover:underline font-medium">Trustly</Link>, der gør det nemt at indbetale og hæve gevinster direkte fra din telefon.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Trends */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Tendenser og nye funktioner for live casinoer
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Live casinoer er i konstant udvikling. Teknologien skubber hele tiden grænserne for, hvad der er muligt. Her er de vigtigste trends, vi ser i 2026:
          </p>

          <div className="space-y-3">
            {[
              { title: "4K-streaming", desc: "Knivskarpe billeder i ultra-høj opløsning, der næsten får dig til at føle, at du sidder ved bordet. 4K-streaming sætter nye standarder for den visuelle oplevelse." },
              { title: "Game Shows med multiplikatorer", desc: "Spil som Crazy Time, Monopoly Live og Sweet Bonanza Candy Land blander casinospil med TV-underholdning – komplet med lykkehjul, bonusrunder og enorme multiplikatorer." },
              { title: "Personlige bonustilbud", desc: "Casinoer bruger spilleradfærd til at skræddersy live casino-bonusser og kampagner, der passer til den enkelte spillers præferencer." },
              { title: "VR (Virtual Reality)", desc: "Virtual Reality er på vej ind i live casino-verdenen og vil give spillere en endnu mere fordybende og realistisk oplevelse i fremtiden." },
              { title: "Danske live dealere", desc: "Flere spiludviklere tilbyder nu dedikerede danske borde med dansktalende dealere, hvilket giver en mere personlig og lokal oplevelse." },
            ].map((trend) => (
              <div
                key={trend.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{trend.title}</h3>
                  <p className="text-sm text-muted-foreground">{trend.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Ansvarligt Spil */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
                Ansvarligt spil på live casinoer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Ansvarligt spil er nøglen til at have det sjovt på live casinoer uden at miste kontrollen. Sæt altid et budget, inden du begynder, og hold dig til det – tænk på det som en underholdningsudgift. Hold styr på din bankroll og undgå at jagte tab.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Live casinoer kan være utroligt spændende, og det er nemt at miste overblikket. Sæt tidsgrænser og brug de værktøjer, som alle danske casinoer tilbyder. Læs mere om{" "}
                <Link to="/ansvarligt-spil" className="text-primary hover:underline font-medium">ansvarligt spil</Link>, eller selvudeluk via{" "}
                <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>
                . Har du brug for hjælp, kan du kontakte{" "}
                <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>
                .
              </p>
              <p className="text-xs text-muted-foreground">
                18+ | Spil ansvarligt | Annoncering
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Fordele ved live casino */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Fordele ved at spille live casino i Danmark
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live casino har gennemgået en revolution de seneste år, og for mange danske spillere er live casino nu den foretrukne måde at spille casino online på. Den største fordel ved live casino er autenticiteten – du sidder over for en rigtig dealer i et professionelt casinostudie, og hvert kort og kuglekast sker lige foran dine øjne i realtid. Det er en casinooplevelse, der er tættere på virkeligheden end noget andet online casino kan tilbyde.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En anden vigtig fordel ved live casino er den sociale dimension. I modsætning til almindelige online casinospil kan du chatte med dealeren og andre spillere ved bordet i live casino. Denne interaktion skaber en unik stemning, der gør live casino til noget helt særligt. Mange live casino-dealere er trænede entertainere, der holder stemningen oppe og skaber en uforglemmelig casinooplevelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live casino tilbyder også en gennemsigtighed, som du ikke finder i RNG-baserede casinospil. Fordi alt sker live foran kameraet, kan du med egne øjne se, at spillet forløber fair. Der er ingen tilfældighedsgenerator – kun rigtige kort, rigtige kugler og rigtige hjul. Denne åbenhed gør live casino særligt attraktivt for spillere, der værdsætter fairness og tillid hos deres valgte casino.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Endelig er udvalget af live casino-spil i 2026 større end nogensinde. Fra klassiske live casino-bordspil som blackjack, roulette og baccarat til innovative game shows og Lightning-serien – der er et live casino-spil til enhver smag. De bedste danske casinoer tilbyder hundredvis af live casino-borde med forskellige minimumsindsatser, så både casual spillere og high rollers finder noget, der passer til deres casino-budget.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Live casino vs. online casino */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Live casino vs. online casino – hvad er forskellen?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mange nye casino-spillere undrer sig over forskellen mellem live casino og almindeligt online casino. Kort sagt er live casino en kategori inden for online casino, hvor spillene streames live fra professionelle studier med rigtige dealere. Almindelige online casinospil bruger derimod en tilfældighedsgenerator (RNG) til at bestemme udfaldet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I et live casino er tempoet typisk langsommere end i RNG-baserede casinospil, fordi der er en rigtig dealer, der håndterer kortene og styrer spillet. Til gengæld er live casino-oplevelsen langt mere immersiv og autentisk. Du kan interagere med dealeren, følge spillet i HD-kvalitet og nyde den sociale stemning, som kun et live casino kan tilbyde.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når det kommer til bonusser, er der også forskelle. De fleste{" "}
            <Link to="/casino-bonus" className={linkClass}>casino bonusser</Link>{" "}
            er primært designet til spilleautomater, og live casino-spil bidrager typisk kun med 10-20% til omsætningskravene. Nogle casinoer tilbyder dog specifikke live casino-bonusser, der kan bruges fuldt ud på live-spil. Tjek altid bonusvilkårene hos dit valgte casino.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Begge typer casinospil har deres plads hos et godt online casino. Vi anbefaler at kombinere det bedste fra begge verdener: brug dine{" "}
            <Link to="/free-spins" className={linkClass}>free spins</Link>{" "}
            og casino-bonusser på spilleautomater, og nyd den autentiske live casino-oplevelse med dine egne midler. Se vores{" "}
            <Link to="/top-10-casino-online" className={linkClass}>top 10 casino</Link>-liste for at finde de bedste casinoer med både slots og live casino.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Live casino strategier */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Strategier til live casino-spil
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selvom live casino-spil er baseret på tilfældighed, kan gode strategier forbedre din oplevelse og hjælpe dig med at styre dit casino-budget mere effektivt. Her er vores bedste tips til at spille live casino klogt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Vælg altid den rigtige variant af dit foretrukne live casino-spil. Europæisk roulette har en lavere husfodel end amerikansk roulette, og live casino-spil som French Roulette med La Partage-reglen giver endnu bedre odds. For blackjack-spillere er det vigtigt at følge grundlæggende strategi – det reducerer casino-fordelen til under 1%.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bankroll management er afgørende i live casino. Sæt et klart budget for din live casino-session og hold dig til det. Undgå at jagte tab, og husk at live casino skal være underholdning. De bedste casino-spillere ved, hvornår de skal stoppe – uanset om de er foran eller bagud.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Udnyt de bonusser, dit casino tilbyder, men vær opmærksom på, at live casino-spil ofte har lavere bidrag til{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>. Nogle live casinoer tilbyder dedikerede live casino-bonusser, der er mere fordelagtige. Se vores oversigt over{" "}
            <Link to="/casino-bonus" className={linkClass}>casino bonusser</Link>{" "}
            for at finde de bedste tilbud til live casino-spillere.
          </p>
        </section>

        <AuthorBio />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/live-casino" />

        <FAQSection title="Ofte stillede spørgsmål om live casino" faqs={liveCasinoFaqs} />
      </div>
    </>
  );
};

export default LiveCasino;

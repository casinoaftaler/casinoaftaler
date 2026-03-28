import React from "react";
import { Link } from "react-router-dom";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import playkasinoSpillemaskiner from "@/assets/screenshots/playkasino-spillemaskiner.webp";
import spilnuVindere from "@/assets/screenshots/spilnu-vindere.webp";
import pokerstarsJackpots from "@/assets/screenshots/pokerstars-jackpot-spillemaskiner.webp";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import {
  Gamepad2,
  Shield,
  AlertTriangle,
  CheckCircle,
  Users,
  Lock,
  Scale,
  BarChart3,
  HelpCircle,
  Zap,
  Globe,
  Layers,
  TrendingUp,
  Target,
  Star,
  Trophy,
  Sparkles,
  DollarSign,
} from "lucide-react";
import { type ReactNode } from "react";
import { ContentPageLayout } from "@/components/ContentPageLayout";

const linkClass = "text-primary underline hover:text-primary/80";

const jackpotFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er en progressiv jackpot?",
    answer: "En progressiv jackpot er en præmiepulje, der vokser med hver eneste indsats fra alle tilknyttede spillere på tværs af casinoer i netværket. Typisk bidrager 1–5 % af hver indsats til puljen. Jo flere der spiller, jo større bliver jackpotten – indtil én heldig spiller vinder det hele, og puljen nulstilles til et minimum seed-beløb.",
  },
  {
    question: "Hvad er forskellen på progressiv og fast jackpot?",
    answer: "En fast (fixed) jackpot har en forudbestemt topgevinst, der ikke ændrer sig uanset antal spillere. En progressiv jackpot vokser kontinuerligt med hver indsats. Faste jackpots har typisk højere basis-RTP (96-97 %), mens progressive jackpots har lavere basis-RTP (88-94 %) fordi en del af indsatsen reserveres til puljen.",
  },
  {
    question: "Hvilke jackpot-slots har den største udbetaling?",
    answer: (
      <>
        Mega Moolah fra{" "}
        <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link> holder rekorden
        med over 130 millioner kroner. Andre store progressive netværk inkluderer Mega Fortune
        (NetEnt), Age of the Gods (Playtech) og Dream Drop (
        <Link to="/spiludviklere/relax-gaming" className={linkClass}>Relax Gaming</Link>). Dream Drop
        har allerede udbetalt flere jackpots over 50 millioner kroner siden lanceringen.
      </>
    ),
  },
  {
    question: "Er jackpot-slots tilgængelige på danske casinoer?",
    answer: (
      <>
        Ja, progressive jackpot-slots er tilgængelige på alle{" "}
        <Link to="/casino-licenser" className={linkClass}>danske licenserede casinoer</Link>. Gevinster
        fra licenserede casinoer er skattefri i Danmark, og alle spil er reguleret af{" "}
        <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>.
      </>
    ),
  },
  {
    question: "Øger højere indsats mine chancer for at vinde jackpotten?",
    answer: "I de fleste progressive jackpot-slots stiger din chance proportionelt med indsatsstørrelsen. Nogle slots kræver endda maximum bet for at kvalificere sig til den største jackpot. Tjek altid spillets regler. Dog forbliver chancen astronomisk lille uanset indsats – typisk 1:10.000.000 til 1:50.000.000 per spin.",
  },
  {
    question: "Hvad er et jackpot-netværk?",
    answer: "Et jackpot-netværk er en gruppe af spilleautomater (ofte på tværs af flere casinoer) der deler en fælles progressiv pulje. Alle spillere på netværkets slots bidrager til den samme jackpot. De største netværk inkluderer Microgamings Progressive Jackpot Network (Mega Moolah), NetEnts Pooled Jackpots (Mega Fortune) og Relax Gamings Dream Drop Network.",
  },
  {
    question: "Hvad sker der med RTP på progressive jackpot-slots?",
    answer: (
      <>
        Progressive jackpot-slots har typisk lavere basis-<Link to="/ordbog/rtp" className={linkClass}>RTP</Link>{" "}
        (88–94 %) end standard-slots (95–97 %), fordi 1–5 % af hver indsats reserveres til jackpot-puljen.
        Den "sande" RTP inkluderer jackpottens forventede værdi, hvilket typisk bringer den samlede RTP
        op på 94–96 %. Dog er denne forventede værdi praktisk talt utilgængelig for den enkelte spiller.
      </>
    ),
  },
];

const JackpotSlots = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(jackpotFaqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Jackpot Slots – Guide til Progressive Jackpot-Spilleautomater 2026",
    description: "Jackpot-slots: Progressive og faste jackpots, bedste titler, RTP-matematik, netværks-analyse og strategi. Find de bedste i Danmark.",
    url: `${SITE_URL}/jackpot-slots`,
    datePublished: "2026-03-07",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Jackpot Slots – Progressive Jackpot Spilleautomater 2026"
        description="Jackpot-slots: Progressive og faste jackpots, Mega Moolah, Dream Drop, RTP-matematik og strategi. Find de bedste jackpot-slots i Danmark."
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

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
              <Trophy className="mr-1.5 h-3.5 w-3.5" />
              Slot Kategorier
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Jackpot Slots – Progressive Milliongevinster
            </h1>
            <p className="text-lg text-white/80">
              Guide til progressive jackpot-spilleautomater: Mega Moolah, Dream Drop,
              netværks-mekanik, RTP-analyse og de bedste titler i 2026.
            </p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="jonas" readTime="22 Min." />

        <SnippetAnswer answer="Progressive jackpot-slots samler en pulje fra alle spillere i netværket – Mega Moolah holder rekorden med 130+ mio. kr. Basis-RTP er 88–94%, da en del af indsatsen går til puljen. Gevinster er skattefri i Danmark." />

        <QuickComparisonTable count={3} title="Bedste Casinoer til Jackpot Slots" prioritySlugs={["campobet", "spilleautomaten", "betinia"]} />

        {/* ── 1. HVAD ER JACKPOT SLOTS? ── */}
        <section className="mb-12" id="hvad-er-jackpot-slots">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-7 w-7 text-primary" />
            Hvad er jackpot-spilleautomater?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Jackpot-spilleautomater er en kategori af online slots, der tilbyder ekstraordinært
            store topgevinster – ofte i millionklassen. De adskiller sig fra standard-slots ved
            at have en dedikeret præmiepulje, der enten er fast (fixed jackpot) eller vokser
            progressivt med spillernes indsatser.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Den mest kendte type er <strong>progressive jackpots</strong>, hvor en procentdel af
            hver indsats (typisk 1–5 %) tilføjes en fælles pulje. Denne pulje vokser, indtil en
            spiller vinder den – og den kan nå astronomiske beløb. Mega Moolah fra{" "}
            <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link> har
            udbetalt over 130 millioner kroner i en enkelt gevinst, hvilket gør den til den mest
            berømte progressive jackpot-slot i verden.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I Danmark er jackpot-slots fuldt lovlige på{" "}
            <Link to="/casino-licenser" className={linkClass}>licenserede casinoer</Link>, og
            alle gevinster er skattefri. Vi anbefaler dog altid{" "}
            <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link> – jackpot-slots
            har lavere basis-RTP end standard-slots, og chancen for at vinde den store jackpot er
            ekstremt lille.
          </p>
          <ReviewScreenshot
            src={playkasinoSpillemaskiner}
            alt="PlayKasinos spilleautomater med jackpot-kategorier og populære titler"
            caption="PlayKasinos spillemaskin-lobby – jackpot-slots er ofte samlet i en dedikeret kategori"
            size="full"
          />
        </section>

        <Separator className="my-10" />

        {/* ── 2. TYPER AF JACKPOTS ── */}
        <section className="mb-12" id="typer">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Typer af jackpot-spilleautomater
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Progressive Jackpots
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>Puljen vokser med hver indsats på tværs af netværket. Typisk 1-5 % af indsatsen bidrager. Kan nå millioner af kroner. Lavere basis-RTP (88-94 %).</p>
                <p><strong>Eksempler:</strong> Mega Moolah, Mega Fortune, Divine Fortune, Dream Drop</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Faste (Fixed) Jackpots
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>Fast topgevinst, der ikke ændrer sig. Typisk 500x-10.000x indsats. Højere basis-RTP (95-97 %) fordi ingen pulje-reservation.</p>
                <p><strong>Eksempler:</strong> Wolf Gold, Fire Joker, Starburst (max win)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  Netværks-jackpots
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>Flere casinoer deler den samme pulje. Største og hurtigst voksende. Vindes sjældnest men giver de største beløb. Kræver ofte max bet.</p>
                <p><strong>Eksempler:</strong> Microgamings Progressive Network, Dream Drop Network</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  Multi-level Jackpots
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>Flere jackpot-niveauer (typisk Mini, Minor, Major, Mega). Lavere niveauer vindes hyppigere. Giver balance mellem frekvens og størrelse.</p>
                <p><strong>Eksempler:</strong> Mega Moolah (4 niveauer), Age of the Gods (4 niveauer)</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <ReviewScreenshot
          src={pokerstarsJackpots}
          alt="PokerStars Casino jackpot-spillemaskiner med progressive beløb – Archdragon King (3.826 US$), Stars Queens (3.673.093 US$), Irish Riches Megaways (38.522 US$) og flere jackpot-slots fra Red Tiger og Blueprint Gaming"
          caption="PokerStars Casino – jackpot-oversigt med progressive beløb opdateret i realtid"
          size="full"
        />

        <Separator className="my-10" />

        {/* ── 3. BEDSTE JACKPOT SLOTS ── */}
        <section className="mb-12" id="bedste-jackpot-slots">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Star className="h-7 w-7 text-primary" />
            Bedste jackpot-slots i 2026
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              {
                name: "Mega Moolah",
                provider: "Microgaming",
                providerLink: "/spiludviklere/microgaming",
                rtp: "88,12 %",
                maxWin: "Ubegrænset",
                type: "Progressiv (4 niveauer)",
                desc: "Den ubestridte jackpot-konge med rekord-udbetalinger over 130 mio. kr.",
                gameLink: "/casinospil/spillemaskiner/mega-moolah",
              },
              {
                name: "Divine Fortune",
                provider: "NetEnt",
                providerLink: "/spiludviklere/netent",
                rtp: "96,59 %",
                maxWin: "Progressiv",
                type: "Progressiv (3 niveauer)",
                desc: "Græsk mytologi med Falling Wilds, re-spins og en progressiv jackpot med høj RTP.",
                gameLink: "/casinospil/spillemaskiner/divine-fortune",
              },
              {
                name: "Wolf Gold",
                provider: "Pragmatic Play",
                providerLink: "/spiludviklere/pragmatic-play",
                rtp: "96,01 %",
                maxWin: "Fast jackpot",
                type: "Fixed (3 niveauer)",
                desc: "Hold & Win mekanik med Money Respin og Giant Symbols. En af de mest spillede jackpot-slots.",
                gameLink: "/casinospil/spillemaskiner/wolf-gold",
              },
              {
                name: "Thunderstruck II",
                provider: "Microgaming",
                providerLink: "/spiludviklere/microgaming",
                rtp: "96,65 %",
                maxWin: "8.000x",
                type: "Fixed",
                desc: "Nordisk mytologi med 4 free spins-varianter og Wildstorm feature.",
                gameLink: "/casinospil/spillemaskiner/thunderstruck-ii",
              },
              {
                name: "Immortal Romance",
                provider: "Microgaming",
                providerLink: "/spiludviklere/microgaming",
                rtp: "96,86 %",
                maxWin: "12.150x",
                type: "Fixed",
                desc: "Vampyr-tema med 4 unikke free spins-funktioner og narrativ progression.",
                gameLink: "/casinospil/spillemaskiner/immortal-romance",
              },
              {
                name: "Sugar Rush",
                provider: "Pragmatic Play",
                providerLink: "/spiludviklere/pragmatic-play",
                rtp: "96,50 %",
                maxWin: "5.000x",
                type: "Fixed",
                desc: "Cluster pays candy-slot med multiplikator-tumble op til 128x.",
                gameLink: "/casinospil/spillemaskiner/sugar-rush",
              },
            ].map((slot) => (
              <Card key={slot.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{slot.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    <Link to={slot.providerLink} className={linkClass}>{slot.provider}</Link>
                  </p>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>{slot.desc}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline">RTP: {slot.rtp}</Badge>
                    <Badge variant="outline">Max: {slot.maxWin}</Badge>
                    <Badge variant="outline">{slot.type}</Badge>
                  </div>
                  <Link to={slot.gameLink} className={`text-xs ${linkClass}`}>Læs fuld guide →</Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <ReviewScreenshot
          src={spilnuVindere}
          alt="Spilnu vinderoversigt med seneste jackpot-udbetalinger og gevinstbeløb"
          caption="Spilnus vinderoversigt viser aktuelle jackpot-udbetalinger – et godt overblik over, hvilke beløb der faktisk falder."
          size="full"
        />

        <Separator className="my-10" />

        {/* ── 4. MATEMATIK ── */}
        <section className="mb-12" id="matematik">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Matematikken bag jackpot-slots
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Progressive jackpot-slots har en unik matematisk profil. Den annoncerede{" "}
            <Link to="/ordbog/rtp" className={linkClass}>RTP</Link> (f.eks. 88,12 % for Mega Moolah)
            er <em>basis-RTP</em> – den del af tilbagebetalingen der sker via normale gevinster.
            Den "sande" RTP inkluderer jackpottens forventede bidrag, hvilket typisk tilføjer 3–8 %
            og bringer den samlede RTP op på 94–96 %.
          </p>

          <Card className="border-primary/20 bg-primary/5 mb-6">
            <CardHeader>
              <CardTitle className="text-base">Jackpot RTP-model</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p><strong>Total RTP = Basis RTP + Jackpot Contribution Rate</strong></p>
              <p>Mega Moolah: 88,12 % + ~6,5 % (jackpot) ≈ 94,6 % samlet RTP</p>
              <p>Divine Fortune: 96,59 % inkluderer allerede jackpot-bidraget (lokal progressiv)</p>
              <p>
                <strong>Expected Value per spin (100 kr.):</strong> Ved 94,6 % samlet RTP: EV = -5,40 kr.
                Dog er jackpottens EV-bidrag praktisk talt utilgængeligt for den enkelte spiller (ca. 1:10M chance).
                Den "oplevede" RTP i en typisk session er derfor tættere på basis-RTP.
              </p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed">
            Vores community-data fra{" "}
            <Link to="/slot-database" className={linkClass}>Slot Database</Link> bekræfter, at
            jackpot-slots i bonus hunts typisk leverer et gennemsnit X på 20–40x – markant lavere
            end Megaways-slots (50–80x) – fordi en del af RTP er "låst" i den progressive pulje.
            For sammenligning, se vores{" "}
            <Link to="/casinospil/spillemaskiner/hoej-rtp" className={linkClass}>guide til høj RTP-slots</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── 5. STRATEGI ── */}
        <section className="mb-12" id="strategi">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Strategi for jackpot-slots
          </h2>
          <div className="space-y-4 mb-6">
            {[
              {
                title: "Tjek jackpot-niveauet",
                icon: TrendingUp,
                content: "Nogle spillere foretrækker at spille, når jackpotten er over gennemsnits-udbetalings-niveauet. Historisk data viser, at Mega Moolah typisk udbetales mellem 30-80 mio. kr. Når puljen nærmer sig den øvre ende, er den forventede værdi per spin marginalt højere.",
              },
              {
                title: "Max bet-overvejelser",
                icon: Scale,
                content: "Mange progressive slots kræver max bet for at kvalificere sig til den største jackpot. Tjek altid reglerne. I slots med proportional trigger (som Mega Moolah) stiger din chance lineært med indsatsen – men forbliver astronomisk lille uanset.",
              },
              {
                title: "Bankroll tilpasning",
                icon: BarChart3,
                content: `Med lavere basis-RTP (88-94 %) taber du hurtigere i base game end på standard-slots. Planlæg din bankroll derefter – minimum 500x indsats for en meningsfuld session. Ved 5 kr./spin er det 2.500 kr.`,
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="pt-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ── 6. RELATEREDE KATEGORIER ── */}
        <section className="mb-12" id="relaterede">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Layers className="h-7 w-7 text-primary" />
            Udforsk andre slot-kategorier
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/megaways-slots", title: "Megaways Slots", desc: "Dynamiske hjul med op til 117.649 ways" },
              { to: "/bonus-buy-slots", title: "Bonus Buy Slots", desc: "Køb bonus direkte – spring base game over" },
              { to: "/casinospil/spillemaskiner", title: "Spillemaskiner Guide", desc: "Komplet guide til alle spilleautomater" },
              { to: "/casinospil/spillemaskiner/hoej-rtp", title: "Høj RTP Slots", desc: "Spillemaskiner med bedst tilbagebetaling" },
              { to: "/slot-database", title: "Slot Database", desc: "1.400+ slots med community-statistik" },
              { to: "/ordbog", title: "Casino Ordbog", desc: "Forstå alle casino-termer" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:bg-muted"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/jackpot-slots" />
        <RelatedGuides currentPath="/jackpot-slots" />
        <FAQSection title="Ofte Stillede Spørgsmål om Jackpot Slots" faqs={jackpotFaqs} />
        <AuthorBio author="jonas" />
      </ContentPageLayout>
    </>
  );
};

export default JackpotSlots;

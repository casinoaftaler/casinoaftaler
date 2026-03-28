import { Link } from "react-router-dom";
import { InlineReviewCTA } from "@/components/InlineReviewCTA";
import { LazySection } from "@/components/LazySection";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";

import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { RatingBreakdown } from "@/components/RatingBreakdown";
import { CASINO_SCORES } from "@/lib/reviewScoring";
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
import { QuickFactsProviders, QuickFactsLogo, QuickFactsLicense } from "@/components/QuickFactsProviders";
import type { ReactNode } from "react";
import { CasinoReviewHero } from "@/components/CasinoReviewHero";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
import { buildVideoSchema } from "@/lib/seo";
import { AuthorBio } from "@/components/AuthorBio";
import {
  ShieldCheck, Star, CreditCard, Gift, Trophy, Sparkles,
  HelpCircle, User, BookOpen, Smartphone, Headphones,
  Gamepad2, Zap, RotateCcw, Check, X, Globe, Award, Clock, Target,
  TrendingUp, Users, Lock, Layers, BadgeCheck, Flame,
} from "lucide-react";
import { UserReviewSection } from "@/components/UserReviewSection";
import { ReviewMoneyLinks } from "@/components/ReviewMoneyLinks";
import { ContentPageLayout } from "@/components/ContentPageLayout";


const linkClass = "text-primary underline hover:text-primary/80";

const lunaFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvordan fungerer Luna Casinos loyalitetsprogram og level-system?",
    answer:
      "Luna Casinos loyalitetsprogram er et af casinoets mest markante kendetegn. Programmet er automatisk aktivt fra din første indbetaling og baserer sig på et stigende level-system. Jo mere du spiller, desto højere stiger du i level – og med hvert nyt level følger bedre fordele som højere cashback-procenter, personlige bonusser og prioriteret kundeservice. Points optjenes for alle typer spil, men spilleautomater bidrager typisk mest pr. omsat krone. I modsætning til mange konkurrenter beholder du dit opnåede level, selvom du holder pause i kortere perioder. Det gør systemet mere fleksibelt end traditionelle VIP-programmer med strenge aktivitetskrav.",
  },
  {
    question: "Hvilke daglige bonuskampagner tilbyder Luna Casino?",
    answer:
      "Luna Casino udmærker sig ved at tilbyde daglige bonuskampagner, der varierer fra dag til dag. Det inkluderer reload-bonusser, free spins på udvalgte spilleautomater, cashback-tilbud og turneringer med præmiepuljer. Kampagnerne annonceres direkte på platformen efter login og via e-mail til spillere, der har tilmeldt sig nyhedsbrevet. Vilkårene er typisk fordelagtige med omsætningskrav omkring 10x – samme niveau som velkomstbonussen. De daglige kampagner gør Luna Casino attraktivt for spillere, der værdsætter kontinuerlig værdi frem for enkeltstående velkomstbonusser, og sikrer at der altid er en relevant kampagne uanset hvilken dag du logger ind.",
  },
  {
    question: "Er Luna Casino et sikkert og troværdigt casino?",
    answer: (
      <>
        Luna Casino drives af SkillOnNet Limited, et veletableret selskab med gyldig dansk licens fra Spillemyndigheden (licensnr. 16-1066791). SkillOnNet driver også{" "}
        <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link> og har haft tilstedeværelse på det danske marked siden 2017. Platformen benytter 256-bit SSL-kryptering og er fuldt tilsluttet{" "}
        <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> for selvudelukkelse. Registrering sker via MitID, og alle spil er certificeret af uafhængige testorganisationer. Læs mere om{" "}
        <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Hvad er den maksimale indsats med bonusmidler hos Luna Casino?",
    answer: (
      <>
        Den maksimale indsats med bonusmidler hos Luna Casino er 50 kr. pr. spin. Denne regel er vigtig at kende, da overskridelse kan medføre, at spinnet ikke medregnes i{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskravet</Link>, eller i værste fald at bonussen annulleres. Reglen gælder for alle spil, hvor du har aktive bonusmidler. Når du spiller med egne midler (uden bonus), er der ingen begrænsning på indsatsstørrelsen. Det er en standardregel på de fleste danske casinoer, men grænsen på 50 kr. er lidt højere end hos nogle konkurrenter, der sætter maksimum ved 25–30 kr. pr. spin.
      </>
    ),
  },
  {
    question: "Hvad er Luna Casinos velkomstbonus, og hvad er vilkårene?",
    answer: (
      <>
        Nye spillere hos Luna Casino modtager en 100 % matchbonus op til 500 kr. ved første indbetaling. Omsætningskravet er 10x (indskud + bonus) med 60 dages gyldighed. Minimumsindbetalingen er 100 kr. Bonussen aktiveres automatisk ved indbetaling – ingen bonuskode er nødvendig. Kun spilleautomater bidrager fuldt til omsætningskravet, mens bordspil typisk bidrager med 10 %. Eksempel: indbetal 500 kr., modtag 500 kr. i bonus, og omsæt i alt 10.000 kr. inden for 60 dage. Sammenlignet med branchen er vilkårene blandt de mest fordelagtige. Læs mere om{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>.
      </>
    ),
  },
  {
    question: "Hvilke turneringer tilbyder Luna Casino, og hvordan deltager man?",
    answer:
      "Luna Casino arrangerer regelmæssige turneringer, hvor spillere konkurrerer om præmiepuljer ved at spille udvalgte spilleautomater inden for en given periode. Turneringerne rangerer deltagere baseret på faktorer som antal spins, samlede gevinster eller største enkeltgevinst. Deltagelse er typisk gratis for registrerede spillere, og turneringerne varer fra 24 timer til en uge. Præmierne kan inkludere kontante bonusmidler, free spins eller eksklusive kampagnetilbud. Du kan se aktive turneringer og din aktuelle placering direkte på platformen. Det er en social dimension, der tilføjer konkurrenceelement til spillet.",
  },
  {
    question: "Hvor hurtigt behandler Luna Casino udbetalinger?",
    answer: (
      <>
        Luna Casino behandler udbetalinger typisk inden for 24–48 timer for e-wallets som{" "}
        <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link> og Payz, mens kortbetalinger via Visa og Mastercard tager 2–3 bankdage. MobilePay-udbetalinger behandles normalt inden for samme hverdag. Minimumudbetalingsbeløbet er 100 kr. Da registrering foregår via MitID, er identitetsverifikation allerede gennemført, hvilket fjerner forsinkelser ved første udbetaling. Alle udbetalinger er gebyrfri. Luna Casino har ingen månedlig udbetalingsgrænse for standardspillere, men casinoet forbeholder sig retten til at opdele ekstraordinært store gevinster.
      </>
    ),
  },
  {
    question: "Kan man spille hos Luna Casino på mobilen uden app?",
    answer:
      "Ja, Luna Casino har ingen dedikeret app, men deres mobiloptimerede hjemmeside fungerer fremragende i alle moderne browsere på iOS og Android. Alle spil, bonusser, kontofunktioner og kampagner er tilgængelige fra mobilen. MobilePay-indbetalinger er særligt smidige, og MitID-login fungerer problemfrit. Live casino-spillene streamer i høj kvalitet selv på 4G-netværk. Det kuraterede spiludvalg er faktisk en fordel på mobilen, da det gør det lettere at finde kvalitetsspil uden at scrolle igennem tusindvis af titler.",
  },
];

const LunaCasinoAnmeldelse = () => {
  const { data: casinos } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const { user } = useAuth();
  const heroBackgroundImage = siteSettings?.hero_background_image;
  const casino = casinos?.find((c) => c.slug === "luna-casino");
  const handleBonusClick = () => { if (casino) getAffiliateRedirect(casino.slug, user?.id); };

  const faqJsonLd = buildFaqSchema(lunaFaqs);
  const articleSchema = buildArticleSchema({ headline: "Luna Casino Anmeldelse 2026 – Kvalitets-Kuratoren", description: "Dybdegående anmeldelse af Luna Casino. 100% bonus op til 500 kr., 10x omsætning, loyalitetsprogram og kurateret spiludvalg.", url: "https://casinoaftaler.dk/casino-anmeldelser/luna-casino", datePublished: "2026-02-15", authorName: "Jonas", authorUrl: "https://casinoaftaler.dk/forfatter/jonas", videoId: "14tI5vWShvs", ...casinoReviewEntities("Luna Casino", "luna-casino") });

  const reviewJsonLd = buildReviewSchema({ itemName: "Luna Casino", itemUrl: "https://www.lunacasino.dk/", ratingValue: "4.4", ratingCount: "163", reviewBody: "Luna Casino er Kvalitets-Kuratoren blandt danske casinoer – et bevidst kurateret casino med 100% bonus op til 500 kr., 10x omsætning, loyalitetsprogram med stigende levels, daglige bonuskampagner og et nøje udvalgt spiludvalg fra premium-udbydere." });

  const videoJsonLd = buildVideoSchema("https://casinoaftaler.dk/casino-anmeldelser/luna-casino", "14tI5vWShvs", { title: "Luna Casino Anmeldelse 2026 – Ærlig Gennemgang", description: "Se hvordan Luna Casino ser ud indefra. Vi viser dig hjemmesiden, navigation, spilvalg og vigtige features – så du ved præcis hvad du kan forvente, før du opretter en konto.", uploadDate: "2026-02-18", duration: "PT2M" });

  return (
    <>
      <SEO
        title="Luna Casino Anmeldelse 2026 – Kurateret Kvalitet"
        description="Luna Casino anmeldelse 2026: 100% bonus op til 500 kr., 10x omsætning, loyalitetsprogram og kurateret spiludvalg. Se vores ærlige vurdering."
        jsonLd={[articleSchema, faqJsonLd, reviewJsonLd, videoJsonLd]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="secondary"><Star className="mr-1.5 h-3.5 w-3.5" />4.6 / 5 – Anbefalet</Badge>
              <Badge variant="outline" className="border-white/40 text-white">Kvalitets-Kuratoren</Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Luna Casino Anmeldelse 2026</h1>
            <p className="mb-6 text-lg text-white/80">
              14 dages dybdegående test af Luna Casino – Kvalitets-Kuratoren blandt danske casinoer. 100 % bonus op til 500 kr. med kun 10x omsætningskrav, loyalitetsprogram med stigende levels, daglige bonuskampagner og et bevidst kurateret spiludvalg fra premium-udbydere.
            </p>
            <Button onClick={handleBonusClick} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8">
              <Gift className="mr-2 h-5 w-5" />Hent Bonus hos Luna Casino
            </Button>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="jonas" readTime="33 Min." />

        <CasinoReviewHero slug="luna-casino" casinoName="Luna Casino" />
        <ReviewMoneyLinks showMobilePay />

        {/* Quick Facts */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl"><Zap className="h-6 w-6 text-primary" />Hurtige Fakta – Luna Casino</CardTitle>
                <QuickFactsLogo logoUrl={casino?.logo_url} casinoName={casino?.name} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center">
                {[
                  { label: "Velkomstbonus", value: "100% op til 500 kr." },
                  { label: "Bonustype", value: "Matchbonus" },
                  { label: "Omsætningskrav", value: "10x (d+b)" },
                  { label: "Licens", value: "Spillemyndigheden" },
                ].map((f) => (
                  <div key={f.label} className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                    <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">{f.label}</p>
                    <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">{f.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center mt-4">
                {[
                  { label: "Min. indbetaling", value: "100 kr." },
                  { label: "Bonusgyldighed", value: "60 dage" },
                  { label: "Operatør", value: "SkillOnNet Ltd" },
                  { label: "Ekstra", value: "Loyalitetsprogram" },
                ].map((f) => (
                  <div key={f.label} className="rounded-lg border border-border p-2 sm:p-3 min-w-0">
                    <p className="text-[10px] sm:text-xs text-muted-foreground uppercase mb-1 truncate">{f.label}</p>
                    <p className="text-sm sm:text-lg font-bold text-foreground break-words leading-tight">{f.value}</p>
                  </div>
                ))}
              </div>
              <QuickFactsProviders providers={["NetEnt", "Microgaming", "Evolution Gaming", "Pragmatic Play", "Red Tiger", "Play'n GO", "Yggdrasil", "Hacksaw Gaming", "Blueprint Gaming", "Push Gaming", "ELK Studios", "Big Time Gaming", "iSoftBet"]} />
              <QuickFactsLicense licenseId="16-1066791" />
            </CardContent>
          </Card>
        </section>

        {/* ───── INTRODUKTION ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kvalitets-Kuratoren: Derfor skiller Luna Casino sig ud</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mens størstedelen af det danske casinomarked konkurrerer på volumen – hvem kan prale af flest spiltitler, de højeste bonusmaksimer og de mest aggressive kampagner – har Luna Casino valgt en fundamentalt anderledes strategi. Luna Casino er det, vi kalder "Kvalitets-Kuratoren": et casino der bevidst har valgt at kuratere frem for at akkumulere, og som investerer i dybde frem for bredde.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bag Luna Casino står SkillOnNet Limited, et selskab med gyldig dansk licens fra Spillemyndigheden (nr. 16-1066791) og mange års erfaring på det europæiske marked. SkillOnNet driver også{" "}
            <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link>, hvilket vidner om et veletableret selskab med dokumenteret pålidelighed. Mens Swift Casino satser på volumen med over 2.500+ spil, har Luna Casino bevidst begrænset sit katalog til nøje udvalgte titler fra premium-udbydere som{" "}
            <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}
            <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>,{" "}
            <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> og{" "}
            <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er en filosofi der deler vandene. Spillere der elsker at browse tusindvis af titler vil finde udvalget begrænset. Men for den type spiller, der foretrækker at vide, at hvert eneste spil i kataloget lever op til høje standarder – at der ikke gemmer sig 500 low-quality "filler"-slots mellem kvalitetstitlerne – er Luna Casino en åbenbaring.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med en{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> på 100 % op til 500 kr. med kun 10x{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, et loyalitetsprogram med stigende levels, daglige bonuskampagner og regelmæssige turneringer er Luna Casino et komplet casino-produkt – bare med en mere fokuseret tilgang. I denne dybdegående anmeldelse gennemgår vi 14 dages intensiv test og dokumenterer præcis, hvad Kvalitets-Kuratoren leverer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Læs mere om{" "}
            <Link to="/saadan-tester-vi-casinoer" className={linkClass}>sådan tester vi casinoer</Link>.
          </p>
        </section>

          <YoutubeEmbed
            videoId="14tI5vWShvs"
            title="Luna Casino Anmeldelse 2026 – Ærlig Gennemgang"
            description="Se hvordan Luna Casino ser ud indefra."
            uploadDate="2026-02-18"
            duration="PT2M"
          />
          <div className="mb-8 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground leading-relaxed">
            I videoen ovenfor guider <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> dig igennem Luna Casinos platform – fra registrering og bonusaktivering til navigation, loyalitetsprogram og spilvalg. Videoen er et supplement til denne skriftlige anmeldelse og giver dig et visuelt overblik, før du beslutter dig.
          </div>

          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/luna-casino/lobby-forside.webp"
            alt="Luna Casino forside med velkomstbonus-banner, spilkategorier og udvalgte spilleautomater"
            caption="Luna Casinos forside med rumtema, velkomstbonus og hurtig adgang til slots, live casino og jackpots."
            eager
          />

        <Separator className="my-10" />

        {/* ───── FORDELE & ULEMPER ───── */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Kvaliteter og begrænsninger – Luna Casinos helhedsbillede</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-primary"><Check className="h-5 w-5" />Fordele</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Kun 10x omsætningskrav (d+b) – blandt de laveste i DK",
                    "Kurateret spiludvalg: kun premium-titler",
                    "Loyalitetsprogram med stigende levels og permanente fordele",
                    "Daglige bonuskampagner (reload, free spins, cashback)",
                    "Regelmæssige turneringer med gratis deltagelse",
                    "Personaliserede bonustilbud baseret på spilleprofil",
                    "MobilePay til indbetaling – hurtig og smidig",
                    "Dansk licens fra Spillemyndigheden (nr. 16-1066791)",
                    "SkillOnNet-baggrund med dokumenteret pålidelighed",
                    "Ingen bonuskode nødvendig – automatisk aktivering",
                    "60 dages bonusgyldighed – dobbelt så lang som mange konkurrenter",
                    "Maks. indsats 50 kr. med bonus – højere end branchegennemsnittet",
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
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-destructive/80"><X className="h-5 w-5" />Ulemper</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Maks. bonus på 500 kr. – lavere end bet365 (1.000 kr.) og Unibet (1.000 kr.)",
                    "Mindre spiludvalg end de største casinoer (design-valg, ikke mangel)",
                    "Ingen sportsbetting tilgængelig",
                    "Begrænsede betalingsmetoder: ingen PayPal eller Trustly",
                    "5 % gebyr på Skrill-indbetalinger",
                    "Ingen No-Sticky bonusstruktur",
                    "MobilePay kun til indbetaling – ikke til udbetaling",
                    "Ingen dedikeret mobilapp",
                    "Bordspil bidrager kun 10 % til omsætningskrav",
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

        {/* ───── DYBDEGÅENDE BONUSANALYSE ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Dybdegående bonusanalyse: Matematikken bag 10x omsætning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Luna Casinos{" "}
            <Link to="/indskudsbonus" className={linkClass}>velkomstbonus</Link> er enkel: 100 % matchbonus op til 500 kr. med 10x omsætningskrav (d+b). Ingen bonuskode – bonussen aktiveres automatisk ved din første indbetaling på mindst 100 kr. Men hvad betyder det i praksis? Lad os lave matematikken.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Scenarie: Maksimal bonus.</strong> Du indbetaler 500 kr. og modtager 500 kr. i bonus. Dit samlede beløb er 1.000 kr. Med 10x omsætningskrav skal du omsætte 10.000 kr. inden for 60 dage. Med en gennemsnitlig RTP på 96 % på spilleautomater er det forventede tab under gennemspilningen: 10.000 × 0,04 = 400 kr. Det betyder, at din forventede saldo efter gennemspilning er 1.000 – 400 = 600 kr. Du har dermed konverteret en 500 kr. indbetaling til 600 kr. – en forventet nettogevinst på 100 kr. fra bonussen.
          </p>

          <Card className="border-border bg-card mb-6">
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><RotateCcw className="h-5 w-5 text-primary" />Bonusberegning – tre scenarier</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-3 font-semibold text-foreground">Scenarie</th>
                      <th className="text-center py-3 px-3 font-semibold text-foreground">Indskud</th>
                      <th className="text-center py-3 px-3 font-semibold text-foreground">Bonus</th>
                      <th className="text-center py-3 px-3 font-semibold text-foreground">Omsætning</th>
                      <th className="text-center py-3 px-3 font-semibold text-foreground">Forventet tab</th>
                      <th className="text-center py-3 px-3 font-semibold text-foreground">Forventet saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { s: "Minimum", d: "100 kr.", b: "100 kr.", o: "2.000 kr.", t: "80 kr.", sa: "120 kr." },
                      { s: "Mellem", d: "300 kr.", b: "300 kr.", o: "6.000 kr.", t: "240 kr.", sa: "360 kr." },
                      { s: "Maksimum", d: "500 kr.", b: "500 kr.", o: "10.000 kr.", t: "400 kr.", sa: "600 kr." },
                    ].map((r) => (
                      <tr key={r.s} className="border-b border-border">
                        <td className="py-3 px-3 font-medium text-foreground">{r.s}</td>
                        <td className="py-3 px-3 text-center text-muted-foreground">{r.d}</td>
                        <td className="py-3 px-3 text-center text-muted-foreground">{r.b}</td>
                        <td className="py-3 px-3 text-center text-muted-foreground">{r.o}</td>
                        <td className="py-3 px-3 text-center text-muted-foreground">{r.t}</td>
                        <td className="py-3 px-3 text-center font-semibold text-foreground">{r.sa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3">*Forventet saldo beregnet med 96 % gennemsnitlig RTP. Faktisk resultat varierer pga. varians.</p>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Sammenligning med markedet.</strong> I markeder uden for Danmark ses omsætningskrav på 30-50x, hvor den samme 500 kr. bonus kan kræve op til 50.000 kr. i omsætning med et forventet tab der overstiger hele saldoen. Luna Casinos 10x krav (det lovpligtige danske maksimum) giver en dramatisk bedre forventet værdi og er et kvalitetstegn for en dansklicenseret operatør.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Vigtige bonusregler:</strong> Maks. indsats med bonus er 50 kr. pr. spin. Kun spilleautomater bidrager 100 % til omsætningskravet – bordspil bidrager 10 %, og live casino-spil bidrager typisk 0 %. Bonussen er ikke "No-Sticky", hvilket betyder at du ikke kan udbetale egne midler separat fra bonusmidler under gennemspilningen. Gyldigheden er 60 dage – dobbelt så lang som mange konkurrenter, der typisk giver 30 dage.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Personaliseret bonusspiludvalg.</strong> Et unikt aspekt ved Luna Casino er, at bonusspiludvalget skræddersys til din profil. Baseret på dine foretrukne spiltyper og historik modtager du kuraterede forslag til spil, der passer til din smag. Det er en detalje, der viser den gennemtænkte tilgang, som kendetegner Luna Casino generelt.
          </p>

          <InlineReviewCTA casinoName="Luna Casino" bonusText="100% bonus op til 500 kr. – kun 10x omsætning" onClick={handleBonusClick} variant="bonus" />
        </section>

        <Separator className="my-10" />

        {/* ───── LOYALITETSPROGRAM EV ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Loyalitetens Matematik: Hvad er et level værd?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mange loyalitetsprogrammer er "sorte bokse", hvor værdien er svær at gennemskue. Vi har analyseret Luna Casinos level-system for at beregne den reelle <strong className="text-foreground">Return on Investment (ROI)</strong> for en aktiv spiller.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="border-border bg-card col-span-1 lg:col-span-2">
              <CardHeader className="pb-2"><CardTitle className="text-lg">Level-progression og belønning</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 font-semibold">Level</th>
                        <th className="text-left py-2 font-semibold">Krav (est.)</th>
                        <th className="text-left py-2 font-semibold">Belønning</th>
                        <th className="text-right py-2 font-semibold">Est. Værdi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50"><td className="py-2">1-3</td><td className="py-2">0 - 5.000 kr.</td><td className="py-2">Free Spins</td><td className="py-2 text-right">~50 kr.</td></tr>
                      <tr className="border-b border-border/50"><td className="py-2">4-6</td><td className="py-2">5.000 - 25.000 kr.</td><td className="py-2">Cash + Spins</td><td className="py-2 text-right">~200 kr.</td></tr>
                      <tr className="border-b border-border/50"><td className="py-2">7-9</td><td className="py-2">25.000+ kr.</td><td className="py-2">Super Spins</td><td className="py-2 text-right">~500+ kr.</td></tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card border-l-4 border-l-primary">
              <CardHeader className="pb-2"><CardTitle className="text-lg">Effektiv Cashback</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Når vi medregner værdien af level-up belønninger, turneringer og daglige tilbud, opnår en aktiv spiller hos Luna Casino en effektiv cashback på:
                </p>
                <div className="text-center py-4">
                  <span className="text-4xl font-bold text-primary">~0.5 - 1.5%</span>
                  <p className="text-xs text-muted-foreground mt-1">af omsætningen (wager).</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Dette øger den effektive RTP fra 96% til 96.5% - 97.5%, hvilket markant forbedrer dine langsigtede vinderchancer sammenlignet med et casino uden loyalitetsprogram.
                </p>
              </CardContent>
            </Card>
          </div>

          <InlineReviewCTA casinoName="Luna Casino" bonusText="Effektiv RTP 96,5–97,5% med loyalitetsprogram – bedre langsigtede odds" onClick={handleBonusClick} variant="ev" />
        </section>

        {/* ───── LOYALITETSPROGRAM ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Loyalitetsprogrammet: Stigende levels med permanente fordele</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvor velkomstbonussen giver den første værdi, er det loyalitetsprogrammet, der definerer Luna Casino som langsigtet platform. Programmet aktiveres automatisk fra din første indbetaling og baserer sig på et stigende level-system, hvor du akkumulerer points for alle typer spil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I modsætning til mange konkurrenters VIP-programmer, hvor du mister dit niveau efter en inaktivitetsperiode, beholder du dit opnåede level hos Luna Casino, selvom du holder pause i kortere perioder. Det gør systemet markant mere fleksibelt og retfærdigt for spillere, der ikke spiller dagligt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { level: "Level 1–3", icon: <Star className="h-6 w-6 text-primary" />, title: "Nybegynder", desc: "Free spins ved level-up, adgang til daglige kampagner, basis-cashback på 5 %." },
              { level: "Level 4–6", icon: <TrendingUp className="h-6 w-6 text-primary" />, title: "Regelmæssig", desc: "Personlige kampagner via e-mail, 7 % cashback, adgang til eksklusive turneringer." },
              { level: "Level 7–9", icon: <Trophy className="h-6 w-6 text-primary" />, title: "Erfaren", desc: "Højere reload-bonusser, 10 % cashback, fødselsdagsbonus, prioriteret kundeservice." },
              { level: "Level 10+", icon: <Award className="h-6 w-6 text-primary" />, title: "Elite", desc: "Dedikeret kontaktperson, 15 % cashback, eksklusive turneringer, skræddersyede tilbud." },
            ].map((item) => (
              <Card key={item.level} className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    {item.icon}
                    <div>
                      <p className="text-xs text-muted-foreground">{item.level}</p>
                      <h3 className="font-bold text-foreground">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Turneringer som social dimension.</strong> Luna Casino afholder regelmæssige turneringer – typisk ugentlige slots-turneringer med præmiepuljer op til 10.000 kr. Deltagelse er gratis for registrerede spillere, og rangering baseres på faktorer som samlede gevinster, antal spins eller største enkeltgevinst. Under vores test deltog vi i to turneringer og oplevede en motiverende konkurrencedimension, der tilføjede ekstra spænding til spillet.
          </p>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/luna-casino/kampagner.webp"
            alt="Luna Casino turneringer og kampagner med eksklusive tilbud og personalets udvalg"
            caption="Luna Casinos kampagnesektion med turneringer, eksklusive kampagner og personalets udvalg."
          />
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Daglige kampagner i detaljer.</strong> Luna Casino kører en roterende kampagnekalender med nye tilbud hver dag: mandage bringer typisk reload-bonusser, onsdage free spins på udvalgte spil, fredage cashback-tilbud og weekender turneringsadgang. Vilkårene er konsekvent fair med 10x omsætning – samme niveau som velkomstbonussen. Det er denne konsistens, der gør Luna Casino attraktivt for spillere, der vægter løbende værdi højere end en stor engangsbonusmaksimum.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── SPILUDVALG ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludvalget: Kvalitetskuratering som filosofi</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Her adskiller Luna Casino sig mest markant fra konkurrenterne. Hvor{" "}
            <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link> (samme operatør) tilbyder 2.500+ titler og{" "}
            <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link> har 2.500+, har Luna Casino bevidst valgt et mindre, kurateret katalog. Hvert spil er nøje udvalgt fra premium-udbydere:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Gamepad2 className="h-5 w-5 text-primary" />Spilleautomater</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">Kurateret udvalg af premium-slots fra{" "}
                  <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}
                  <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>,{" "}
                  <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>,{" "}
                  Hacksaw Gaming, Push Gaming og ELK Studios.</p>
                <p className="text-sm text-muted-foreground">Populære titler: Starburst XXXtreme, Gonzo's Quest Megaways, Book of Dead, Sweet Bonanza, Gates of Olympus, Dead or Alive 2.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Trophy className="h-5 w-5 text-primary" />Bordspil</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">Klassiske bordspil i digitale versioner: roulette (europæisk, fransk), blackjack (multi-hand, single deck), baccarat og video poker.</p>
                <p className="text-sm text-muted-foreground">RTP-niveauer: European Roulette 97,3 %, Blackjack Classic 99,5 %, Jacks or Better 99,54 %.</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5 text-primary" />Live Casino</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">Live casino drevet af{" "}
                  <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> med professionelle dealere og HD-streaming.</p>
                <p className="text-sm text-muted-foreground">Tilgængelige spil: Lightning Roulette, Blackjack VIP, Baccarat, Dream Catcher, Crazy Time, Monopoly Live.</p>
              </CardContent>
            </Card>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Hvad kurateringen betyder i praksis.</strong> Under vores 14-dages test bemærkede vi, at browsing-oplevelsen var markant anderledes end hos volumen-casinoer. Hos et casino med 2.500+ spil kan du bruge 15–20 minutter på at finde noget interessant – hos Luna Casino fandt vi kvalitetsspil inden for 2–3 klik. Filtreringssystemet er simpelt men effektivt med kategorier som "Populære", "Nye", "Jackpots" og provider-filtrering.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">RTP-gennemsnit.</strong> Vi analyserede RTP-niveauerne på de mest prominente spil i kataloget og fandt et gennemsnit på 96,2 % – marginalt over branchegennemsnittet. Det bekræfter, at kurateringen ikke kun handler om æstetik, men også om at prioritere spil med fair udbetalingsprocenter.
          </p>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/luna-casino/hot-cold.webp"
            alt="Luna Casino Hot Or Cold-funktion med realtidsdata over trending spilleautomater"
            caption="Hot Or Cold-funktionen hos Luna Casino viser hvilke spil der aktuelt udbetaler mest."
          />
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Ulempen ved kuratering.</strong> Spillere der jager nichetitler, progressive jackpot-netværk (Mega Moolah, Hall of Gods) eller specifikke udbydere som{" "}
            <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> vil finde udvalget begrænset. Luna Casino satser på bredde inden for premium-segmentet, ikke på at dække alle hjørner af markedet.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── LIVE CASINO ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Live casino: Evolution Gaming i kvalitetsramme</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Luna Casinos{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link> drives udelukkende af Evolution Gaming – branchens ubestridte markedsleder. Det er et bevidst valg der passer til den kuraterede filosofi: frem for at tilbyde live-borde fra fem forskellige leverandører med varierende kvalitet, fokuserer Luna Casino på én leverandør der konsekvent leverer den bedste oplevelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Under vores test var vi imponeret over streamingkvaliteten – selv på mobilnetværk oplevede vi ingen buffering eller forsinkelser. Dealerne var professionelle og engagerede, og chat-funktionen fungerede problemfrit. Vi spillede Lightning Roulette (RTP 97,3 %), Blackjack VIP (RTP 99,29 %) og Crazy Time – sidstnævnte er et game show-format der kombinerer underholdning med gambling.
          </p>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/luna-casino/live-casino.webp"
            alt="Luna Casino live casino med roulette, blackjack og game shows fra Evolution Gaming og Playtech"
            caption="Luna Casinos live casino-sektion med roulette-varianter, blackjack og eksklusive borde."
          />
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Begrænsning:</strong> Live casino-spil bidrager typisk ikke til omsætningskravet for bonussen. Hvis du primært spiller live casino, bør du gennemspille bonussen på slots først og derefter skifte til live-borde med egne midler.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── MOBILOPLEVELSE ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kurateret katalog på farten – mobiltest og vurdering</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Luna Casino har ingen dedikeret app, men den mobiloptimerede hjemmeside fungerer fremragende i alle moderne browsere på iOS og Android. Vi testede på iPhone 15 Pro (Safari), Samsung Galaxy S24 (Chrome) og iPad Air (Safari) og oplevede konsekvent hurtige loadtider, smidig navigation og stabil live casino-streaming.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Kurateringens mobilfordel.</strong> Her viser Luna Casinos filosofi sin styrke: på en 6,1" mobilskærm er det lettere at browse 500 kvalitetsspil end 5.000 blandede titler. Navigationens enkelhed – få kategorier, effektiv søgning, ingen uoverskuelige lister – gør mobiloplevelsen overlegen sammenlignet med volumen-casinoer, der kræver omfattende scrolling og filtrering.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>-indbetalinger er særligt smidige på mobilen – du skifter til MobilePay-appen, godkender med ét swipe og vender tilbage til casinoet med pengene på kontoen. MitID-login fungerer problemfrit via appen, og alle kontofunktioner (indbetalingsgrænser, udbetalingshistorik, bonusoversigt) er tilgængelige.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Forbedringspotentiale:</strong> En PWA-løsning (Progressive Web App) med push-notifikationer for daglige kampagner ville løfte mobiloplevelsen yderligere. Det ville eliminere behovet for at tjekke e-mail eller logge ind for at se dagens kampagne.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── BETALINGSMETODER ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Transaktionsmetoder: Funktionelt med begrænset udvalg</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Luna Casinos{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> afspejler den fokuserede tilgang: færre valgmuligheder end de største casinoer, men de vigtigste metoder er dækket. Min. indbetaling er 100 kr. og min. udbetaling er 100 kr.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Metode</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Indbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Udbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Behandlingstid</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Gebyr</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Visa / Mastercard", deposit: "✓", withdraw: "✓", time: "2–3 bankdage", fee: "Ingen" },
                  { name: "MobilePay", deposit: "✓", withdraw: "—", time: "—", fee: "Ingen" },
                  { name: "Skrill", deposit: "✓", withdraw: "✓", time: "24–48 timer", fee: "5 %" },
                  { name: "Payz", deposit: "✓", withdraw: "✓", time: "24–48 timer", fee: "Ingen" },
                  { name: "Bankoverførsel", deposit: "—", withdraw: "✓", time: "3–5 bankdage", fee: "Ingen" },
                ].map((m) => (
                  <tr key={m.name} className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">{m.name}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.deposit}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.withdraw}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.time}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Den markante mangel: PayPal og Trustly.</strong> I 2026 er fraværet af{" "}
            <Link to="/betalingsmetoder/paypal" className={linkClass}>PayPal</Link> og{" "}
            <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> en reel ulempe. Begge metoder tilbyder hurtigere udbetalinger (ofte under 1 time) og bedre forbrugerbeskyttelse end traditionelle kortbetalinger. Hos konkurrenter som{" "}
            <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link> (samme operatør!) er begge tilgængelige – hvilket gør fraværet hos Luna Casino endnu mere bemærkelsesværdigt.
          </p>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/luna-casino/betalingsmetoder.webp"
            alt="Luna Casino betalingsmetoder med MobilePay, Visa, Mastercard, Skrill, Trustly og PayPal"
            caption="Luna Casinos indbetalingsmuligheder med kontomenu, betalingsmetoder og kampagneadgang."
          />
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Skrill-gebyret.</strong> 5 % gebyr på Skrill-indbetalinger er usædvanligt i det danske marked og bør bemærkes. Ved en indbetaling på 500 kr. mister du 25 kr. i gebyr alene. Vi anbefaler Visa/Mastercard eller MobilePay for at undgå unødvendige omkostninger.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── KUNDESERVICE ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Servicedesk: Kompetent rådgivning når du har brug for det</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Luna Casino tilbyder kundeservice via live chat og e-mail. Under vores test kontaktede vi live chat tre gange med forskellige forespørgsler og oplevede gennemsnitlige svartider på 1–3 minutter. Rådgiverne var kompetente, venlige og i stand til at besvare detaljerede spørgsmål om loyalitetsprogrammet, bonusvilkår og betalingsmetoder.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-border bg-card"><CardContent className="pt-6 text-center"><Headphones className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-bold text-foreground mb-1">Live Chat</h3><p className="text-sm text-muted-foreground">Tilgængelig dagligt. Svartid: 1–3 min. Kompetent og venlig support.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardContent className="pt-6 text-center"><CreditCard className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-bold text-foreground mb-1">E-mail</h3><p className="text-sm text-muted-foreground">Svar inden for 24 timer. Velegnet til komplekse henvendelser.</p></CardContent></Card>
            <Card className="border-border bg-card"><CardContent className="pt-6 text-center"><BookOpen className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-bold text-foreground mb-1">FAQ-sektion</h3><p className="text-sm text-muted-foreground">Omfattende FAQ der dækker de mest almindelige spørgsmål.</p></CardContent></Card>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Testresultat 1:</strong> Spurgte om loyalitetsprogrammets Level 10+ fordele kl. 11:30. Svar efter 2 minutter med detaljeret forklaring af dedikeret kontaktperson, højere cashback-procenter og eksklusive turneringsadgang.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Testresultat 2:</strong> Forespurgte om udbetalingstider for Payz kl. 20:15. Svar efter 3 minutter med præcis angivelse af forventet behandlingstid (24–48 timer) og bekræftelse af at ingen ID-dokumenter var nødvendige (MitID allerede verificeret).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Forbedringspotentiale:</strong> Telefonsupport mangler, og live chat er ikke tilgængelig 24/7. For spillere der spiller sent om natten, kan det være en ulempe. Desuden savner vi dansktalende support – vores henvendelser blev besvaret på engelsk, omend professionelt.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── SIKKERHED & LICENS ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">SkillOnNet-licenser og spillertryghed i praksis</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Luna Casino opererer med dansk licens fra Spillemyndigheden (nr. 16-1066791) udstedt til SkillOnNet Limited. Selskabet har haft tilstedeværelse på det danske marked siden 2017 og driver også{" "}
            <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link>, hvilket vidner om et veletableret og pålideligt selskab med dokumenteret erfaring.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle transaktioner og personoplysninger beskyttes med 256-bit SSL-kryptering (TLS 1.3). Casinoet er fuldt tilsluttet{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> (Register Over Frivilligt Udelukkede Spillere) og{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet</a> (gratis rådgivning om spilleproblemer).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Ansvarligt spil-værktøjer:</strong> Obligatoriske indbetalingsgrænser (daglige, ugentlige, månedlige) ved oprettelse. Session-påmindelser efter 60 minutters spil. Mulighed for midlertidig selvudelukkelse via kontosiden. Tabsgrænser og tidsbegrænsninger. Indbetalingsgrænser kan sænkes øjeblikkeligt og hæves med 24 timers forsinkelse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Registrering og identitetsverifikation sker automatisk via MitID, hvilket eliminerer behovet for manuel dokumentation og sikrer, at alle spillere er korrekt identificeret fra dag ét. Læs mere om{" "}
            <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── MÅLGRUPPE ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvem er Luna Casino det ideelle valg for?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Luna Casino henvender sig til en specifik type spiller, og det er vigtigt at forstå, om du falder inden for den målgruppe:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: <Target className="h-5 w-5 text-primary" />, title: "Kvalitetsbevidste spillere", desc: "Du foretrækker et kurateret udvalg af premium-spil frem for tusindvis af ufiltrerede titler. Du vil ikke bruge tid på at lede efter kvalitet." },
              { icon: <TrendingUp className="h-5 w-5 text-primary" />, title: "Loyalitets-orienterede spillere", desc: "Du spiller regelmæssigt og ønsker at blive belønnet for din loyalitet med stigende fordele, cashback og eksklusive kampagner." },
              { icon: <Gift className="h-5 w-5 text-primary" />, title: "Bonusjægere med forstand", desc: "Du forstår vigtigheden af lave omsætningskrav og værdsætter 10x-kravet, der giver en realistisk chance for at konvertere bonus til kontanter." },
              { icon: <Users className="h-5 w-5 text-primary" />, title: "Turneringsspillere", desc: "Du nyder den sociale og konkurrencemæssige dimension ved turneringer og ranglister." },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    {item.icon}
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ───── NEGATIV SEGMENTERING ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Scenarier hvor Luna Casino falder igennem</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Ingen casino er perfekt til alle, og det er vigtigt at være ærlig om Luna Casinos begrænsninger:
          </p>
          <div className="space-y-4">
            {[
              { title: "Spillere der vil have maksimal bredde", desc: "Hvis du elsker at browse tusindvis af titler, teste obscure spiludbydere og altid have adgang til de nyeste releases, vil Luna Casinos kuraterede tilgang føles begrænsende. Overvej i stedet Swift Casino (2.500+ spil) eller Videoslots (5.000+ spil)." },
              { title: "Spillere der prioriterer betalingsfleksibilitet", desc: "Fraværet af PayPal og Trustly er en reel ulempe. Hvis hurtige udbetalinger via e-wallets er afgørende for dig, tilbyder konkurrenter som bet365 og Unibet langt flere muligheder." },
              { title: "High-rollers med store bonusbehov", desc: "Med en maks. bonus på 500 kr. er Luna Casino ikke attraktivt for spillere der ønsker fuld bonusudnyttelse. Hos bet365 og Unibet kan du også få op til 1.000 kr. (dansk lovmæssigt maksimum) – det dobbelte af Luna." },
              { title: "Sportsbettere", desc: "Luna Casino er udelukkende et casino. Hvis du også spiller odds, skal du supplere med en separat bettingplatform – eller vælge et kombineret casino/sportsbook som bet365 eller Betinia." },
              { title: "Spillere der foretrækker No-Sticky bonus", desc: "Luna Casinos bonus er ikke No-Sticky, hvilket betyder at du ikke kan udbetale egne midler separat under bonusgennemspilning. Hvis det er vigtigt for dig, tilbyder Campobet og Betinia No-Sticky-struktur." },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ───── SAMMENLIGNING ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Luna Casino vs. konkurrenterne</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            For at give dig et nuanceret billede sammenligner vi Luna Casino med tre relevante konkurrenter – inklusive søstercasinoet Swift Casino:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Kategori</th>
                  <th className="text-center py-3 px-3 font-semibold text-foreground">Luna Casino</th>
                  <th className="text-center py-3 px-3 font-semibold text-foreground">Swift Casino</th>
                  <th className="text-center py-3 px-3 font-semibold text-foreground">bet365</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: "Velkomstbonus", luna: "100% op til 500 kr.", swift: "100% op til 500 kr.", bet: "100% op til 1.000 kr." },
                  { cat: "Omsætningskrav", luna: "10x (d+b)", swift: "10x (d+b)", bet: "10x (d+b)" },
                  { cat: "Spiludvalg", luna: "Kurateret premium", swift: "2.500+ titler", bet: "2.500+ titler" },
                  { cat: "Live casino", luna: "Evolution", swift: "Evolution", bet: "Evolution + Playtech" },
                  { cat: "MobilePay", luna: "✓ (kun indbetaling)", swift: "✓ (kun indbetaling)", bet: "✓ (ind + ud)" },
                  { cat: "PayPal", luna: "✗", swift: "✓", bet: "✓" },
                  { cat: "Trustly", luna: "✗", swift: "✓", bet: "✓" },
                  { cat: "Sportsbetting", luna: "✗", swift: "✗", bet: "✓" },
                  { cat: "Loyalitetsprogram", luna: "Level-baseret", swift: "Kampagner", bet: "bet365 Club" },
                  { cat: "Unik funktion", luna: "Kuratering", swift: "Hot Or Cold", bet: "Bet Builder" },
                  { cat: "Bonuskode", luna: "Ikke nødvendig", swift: "SWIFT", bet: "365BONUS" },
                ].map((r) => (
                  <tr key={r.cat} className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">{r.cat}</td>
                    <td className="py-3 px-3 text-center text-muted-foreground">{r.luna}</td>
                    <td className="py-3 px-3 text-center text-muted-foreground">{r.swift}</td>
                    <td className="py-3 px-3 text-center text-muted-foreground">{r.bet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Luna vs. Swift Casino (søstercasinoer):</strong> Begge drives af SkillOnNet med identiske omsætningskrav og bonusmaksimum. Forskellen er filosofisk: Swift Casino satser på volumen (2.500+ spil, Hot Or Cold-funktion, flere betalingsmetoder), mens Luna Casino satser på kuratering og loyalitet. Vælg Swift hvis du vil have maksimal bredde; vælg Luna hvis du foretrækker kvalitetsfokus og et loyalitetsprogram der belønner trofasthed.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Luna vs. bet365:</strong> bet365 vinder på næsten alle kvantitative parametre: højere bonus (1.000 kr.), flere spil, flere betalingsmetoder og sportsbetting. Men Luna Casinos loyalitetsprogram med stigende levels og daglige kampagner giver bedre løbende værdi for trofaste spillere. Hvis du er engangs-spiller, vælg bet365. Hvis du spiller regelmæssigt og vil belønnes for det, har Luna Casino en stærkere proposition.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ───── REGISTRERING ───── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Tilmelding og registrering – trin for trin</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Registreringsprocessen hos Luna Casino er enkel og strømlinet via MitID-integration. Hele processen tager under 5 minutter:
          </p>
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="space-y-3">
                {[
                  { step: "1", title: "Besøg Luna Casino", desc: "Gå til forsiden og klik på 'Spil nu' for at komme i gang." },
                  { step: "2", title: "Udfyld personlige oplysninger", desc: "Indtast navn, adresse, e-mail, telefonnummer, brugernavn og adgangskode." },
                  { step: "3", title: "Bekræft identitet med MitID", desc: "Indtast CPR-nummer og godkend via MitID-appen. Identitetsverifikation sker automatisk." },
                  { step: "4", title: "Sæt indbetalingsgrænser", desc: "Vælg daglige, ugentlige og månedlige grænser for ansvarligt spil." },
                  { step: "5", title: "Foretag din første indbetaling", desc: "Indbetal mindst 100 kr. via MobilePay, kort eller Payz. Bonussen aktiveres automatisk – ingen bonuskode nødvendig." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{item.step}</span>
                    <div><h4 className="font-semibold text-foreground">{item.title}</h4><p className="text-sm text-muted-foreground">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <ReviewScreenshot
            src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/luna-casino/login-mitid.webp"
            alt="Luna Casino registrering med MitID digital identitetsgodkendelse"
            caption="Registreringsprocessen hos Luna Casino med MitID-verifikation for sikker adgang."
          />
        </section>

        <Separator className="my-10" />

        {/* ───── KONKLUSION ───── */}
        <section className="mb-12">
          <RatingBreakdown scores={CASINO_SCORES["luna-casino"].scores} total={CASINO_SCORES["luna-casino"].total} />
          <h2 className="mt-6 mb-4 text-3xl font-bold">Endelig vurdering: 4.6 / 5 – Kvalitets-Kuratoren lever op til sit navn</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Efter 14 dages intensiv test bekræfter vi, at Luna Casino fortjener sin rolle som Kvalitets-Kuratoren blandt danske casinoer. Det er ikke det casino med flest spil, den højeste bonus eller de fleste betalingsmetoder – men det er et casino med en tydelig identitet og en gennemtænkt filosofi.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Styrker der definerer Luna Casino:</strong> De 10x omsætningskrav giver en matematisk overlegen bonusværdi. Loyalitetsprogrammet med permanente levels belønner trofasthed uden at straffe pauser. De daglige kampagner sikrer løbende værdi, og det kuraterede spiludvalg eliminerer "filler"-spil fra oplevelsen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Svagheder der trækker ned:</strong> Fraværet af PayPal og Trustly er uforståeligt – særligt når søstercasinoet Swift Casino tilbyder begge. Bonusmaksimum på 500 kr. er lavt for high-rollers, og manglen på sportsbetting begrænser platformen til rene casinospillere. 5 % Skrill-gebyr er usædvanligt og unødvendigt.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Samlet vurdering:</strong> Luna Casino scorer 4.6 / 5. Det er et fremragende valg for kvalitetsbevidste spillere, der spiller regelmæssigt og ønsker at blive belønnet for det. Men hvis du prioriterer betalingsfleksibilitet, stor bonusmaksimum eller sportsbetting, bør du kigge mod{" "}
            <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link>,{" "}
            <Link to="/casino-anmeldelser/swift-casino" className={linkClass}>Swift Casino</Link> eller{" "}
            <Link to="/casino-anmeldelser/unibet" className={linkClass}>Unibet</Link>.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={handleBonusClick} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8">
              <Gift className="mr-2 h-5 w-5" />Hent din bonus hos Luna Casino
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/casino-anmeldelser">Se alle casino anmeldelser</Link>
            </Button>
          </div>
        </section>

        <Separator className="my-10" />
        <LazySection minHeight="400px">
          <UserReviewSection casinoSlug="luna-casino" casinoName="Luna Casino" />
        </LazySection>
        <LazySection minHeight="300px">
          <RelatedReviews currentSlug="luna-casino" />
          <InlineCasinoCards excludeSlugs={["luna-casino"]} />
        </LazySection>
        <LazySection minHeight="200px">
          <LatestNewsByCategory pagePath="/casino-anmeldelser/luna-casino" />
          <RelatedGuides currentPath="/casino-anmeldelser/luna-casino" />
          <FAQSection title="Ofte stillede spørgsmål om Luna Casino" faqs={lunaFaqs} />
          <AuthorBio author="jonas" />
        </LazySection>
      </div>
      {casino && <StickyCTA casinoSlug={casino.slug} casinoName={casino.name} bonusAmount={casino.bonus_amount} bonusType={casino.bonus_type} freeSpins={casino.free_spins} wageringRequirements={casino.wagering_requirements} rating={casino.rating} logoUrl={casino.logo_url} isRecommended={casino.is_recommended} isHot={casino.is_hot} />}
    </>
  );
};

export default LunaCasinoAnmeldelse;

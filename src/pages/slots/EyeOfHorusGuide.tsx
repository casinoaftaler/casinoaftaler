import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import heroImage from "@/assets/heroes/eye-of-horus-hero.jpg";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, buildVideoSchema, SITE_URL } from "@/lib/seo";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
import { VideoContextBox } from "@/components/VideoContextBox";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { SlotProviderLink } from "@/components/SlotProviderLink";
import { SlotDataLink } from "@/components/SlotDataLink";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, TrendingUp, Target, Shield, Zap, BarChart3, Calculator, Flame, Scale, Users, AlertTriangle, Trophy } from "lucide-react";

const linkClass = "text-primary underline underline-offset-4 hover:text-primary/80 transition-colors";

const eyeOfHorusFaqs: { question: string; answer: ReactNode }[] = [
  { question: "Hvad er RTP'en på Eye of Horus?", answer: "Eye of Horus har en RTP på 96,31 %, hvilket giver en house edge på 3,69 %. Dette placerer den i midten af feltet for high-volatility slots og er konkurrencedygtigt med andre 'Book of'-genrens titler. RTP'en er fra Merkur/Blueprint Gaming og kan variere marginalt mellem casinoer – verificér altid i spillets hjælpesektion." },
  { question: "Hvordan fungerer expanding symbols i Eye of Horus?", answer: "Under free spins vælges ét tilfældigt symbol som expanding symbol ved start af bonusrunden. Når dette symbol lander på griddet, ekspanderer det til at fylde hele hjulet (3 positioner). Derudover har Eye of Horus en unik 'symbol upgrade'-mekanik: ved hvert retrigger opgraderes lavbetalende symboler til det næste niveau, hvilket progressivt øger gevinstpotentialet." },
  { question: "Hvad er max win i Eye of Horus?", answer: "Max win i Eye of Horus er 10.000× din indsats. Dette opnås i free spins-runden med premium expanding symbols og opgraderede symbolværdier efter multiple retriggers. Med indsats på 10 kr. svarer max win til 100.000 kr. Max win er højere end Book of Dead (5.000×), hvilket delvist kompenserer for den lidt lavere RTP." },
  { question: "Hvem har udviklet Eye of Horus?", answer: (<>Eye of Horus er oprindeligt udviklet af Merkur Gaming (Gauselmann Group) til landbaserede spilleautomater og senere porteret til online af Blueprint Gaming. Merkur er en af Europas største spillemaskinproducenter med over 60 års erfaring. Online-versionen bevarer den originale matematik og design, tilpasset med forbedret grafik. Læs mere om <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link> på vores oversigtsside.</>) },
  { question: "Er Eye of Horus bedre end Book of Dead?", answer: (<>Det afhænger af prioriteterne. Eye of Horus har højere max win (10.000× vs. 5.000×) og en unik symbol upgrade-mekanik, mens <Link to="/casinospil/spillemaskiner/book-of-dead" className={linkClass}>Book of Dead</Link> har en lidt lavere volatilitet og mere poleret grafik. RTP er næsten identisk (96,31 % vs. 96,21 %). For spillere, der foretrækker den landbaserede autenticitet og symbol upgrade-systemet, er Eye of Horus det bedre valg.</>) },
  { question: "Hvad er symbol upgrade-mekanikken?", answer: "Symbol upgrade er Eye of Horus' unikke differentieringspunkt. Under free spins, hver gang du lander et retrigger (3+ scatters), opgraderes alle lavbetalende symboler ét niveau. Kortsymboler (10, J, Q, K, A) transformeres progressivt til højere betalende tematiske symboler (Anubis, Horus, Pharaoh). Efter flere retriggers er griddet fyldt med udelukkende premium-symboler, hvilket dramatisk øger gevinstpotentialet." },
  { question: "Er Eye of Horus tilgængelig på danske casinoer?", answer: "Ja, Eye of Horus er tilgængelig på flere danske licenserede casinoer via Blueprint Gaming's distribution. Spillet opfylder Spillemyndighedens krav til RTP-transparens, RNG-certificering og ansvarligt spil-integration. Tilgængeligheden kan variere mellem operatører, da ikke alle danske casinoer har aftaler med Blueprint Gaming." },
];

const EyeOfHorusGuide = () => {
  const faqJsonLd = buildFaqSchema(eyeOfHorusFaqs);
  const articleSchema = buildArticleSchema({
    headline: "Eye of Horus – Symbol Upgrade & Volatilitetsanalyse",
    description: "Dybdegående analyse af Eye of Horus: symbol upgrade-mekanik, expanding symbols, RTP 96,31 %, volatilitetsprofil og EV-beregninger.",
    url: `${SITE_URL}/casinospil/spillemaskiner/eye-of-horus`,
    datePublished: "2026-02-18", dateModified: "2026-02-18",
    authorName: "Jonas", authorUrl: `${SITE_URL}/forfatter/jonas`,
  });
  const videoJsonLd = buildVideoSchema(`${SITE_URL}/casinospil/spillemaskiner/eye-of-horus`, "G8beL2DD1sI", {
    title: "Eye of Horus gennemgang – Symbol upgrade og RTP forklaret",
    description: "Se en komplet gennemgang af Eye of Horus: symbol upgrade-mekanikken, expanding symbols og RTP 96,31 % forklaret i praksis.",
    uploadDate: "2026-03-07",
    duration: "PT2M45S",
  });

  return (
    <>
      <SEO title="Eye of Horus – Symbol Upgrade & RTP-Analyse" description="Komplet analyse af Eye of Horus: symbol upgrade-mekanik, expanding symbols, RTP 96,31 % og EV-beregninger for danske spillere." jsonLd={[faqJsonLd, articleSchema, videoJsonLd]} />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-12 text-white md:py-20" style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Opdateret Februar 2026</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Eye of Horus – Symbol Upgrade & Volatilitetsanalyse</h1>
            <p className="text-lg text-white/80">Merkur Gamings ikoniske landbaserede klassiker, nu online: en matematisk dekonstruktion af symbol upgrade-systemet og hvorfor denne 'Book of'-variant tilbyder det højeste max win i genren.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="2026-02-18" readTime="18 min" />
        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={heroImage} width="1920" height="1080" className="w-full h-auto object-cover max-h-[400px]" alt="Eye of Horus spillemaskine" loading="eager" />
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />Fra Spillehal til Online: Eye of Horus' Rejse</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">Eye of Horus har en unik oprindelse i online slot-verdenen. Mens de fleste online slots er designet digitalt fra bunden, blev Eye of Horus oprindeligt skabt af Merkur Gaming (en del af den tyske Gauselmann Group) til fysiske spilleautomater i europæiske spillehaller. Spillets mekanikker – expanding symbols, symbol upgrades og den egyptiske tematik – blev optimeret til den landbaserede oplevelse, hvor spillere interagerer fysisk med maskinen.</p>
          <p className="text-muted-foreground mb-4 leading-relaxed">Blueprint Gaming overtog opgaven med at portere Eye of Horus til online-platformen, og resultatet er en af de mest autentiske landbaseret-til-online konverteringer i branchen. Den originale matematik er bevaret intakt, inklusive den unikke symbol upgrade-mekanik, som var revolutionerende, da den først blev introduceret i Merkurs fysiske automater i de tidlige 2010'ere.</p>
          <p className="text-muted-foreground mb-4 leading-relaxed">Denne landbaserede arv giver Eye of Horus en særlig karakter, der adskiller den fra rent digitale slots. Interfacet er bevidst minimalistisk, lyddesignet er atmosfærisk men ikke overvældende, og gameplay-tempoet er lidt langsommere end moderne online-designede slots. For spillere, der kender Merkur-automater fra europæiske spillehaller, er Eye of Horus et nostalgisk gensyn med et velkendt matematisk fundament.</p>
          <p className="text-muted-foreground leading-relaxed">Spillets popularitet i Danmark – særligt blandt erfarne casino-spillere – skyldes delvist denne autenticitet. Hvor mange moderne slots føles "designet af algoritmer", har Eye of Horus en håndbygget kvalitet, der afspejler Merkurs årtiers erfaring med spilleautomatdesign. Det er en slot, der respekterer sine spillere med gennemsigtig matematik og ren mekanik.</p>
        </section>

        <YoutubeEmbed videoId="G8beL2DD1sI" title="Eye of Horus gennemgang – Symbol upgrade og RTP" description="Se en komplet gennemgang af Eye of Horus: symbol upgrade-mekanikken og expanding symbols forklaret i praksis." uploadDate="2026-03-07" duration="PT2M45S" />
        <VideoContextBox heading="Her gennemgår vores streamer Eye of Horus i praksis">
          <Link to="/forfatter/jonas" className={linkClass}>Jonas</Link> viser symbol upgrade-mekanikken, expanding symbols og retrigger-systemet i detaljer. Videoen er en del af vores dybdegående indhold om{" "}
          <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> og spiludviklerne bag spillet.
        </VideoContextBox>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />Teknisk Profil: Kernetal og Matematisk Fundament</h2>
          <Card className="mb-6"><CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div><span className="text-muted-foreground">Udvikler:</span><br /><strong>Merkur / Blueprint</strong></div>
              <div><span className="text-muted-foreground">RTP:</span><br /><strong>96,31 %</strong></div>
              <div><span className="text-muted-foreground">Volatilitet:</span><br /><strong>Høj (4/5)</strong></div>
              <div><span className="text-muted-foreground">Max Win:</span><br /><strong>10.000× indsats</strong></div>
              <div><span className="text-muted-foreground">Grid:</span><br /><strong>5×3 (10 linjer)</strong></div>
              <div><span className="text-muted-foreground">House Edge:</span><br /><strong>3,69 %</strong></div>
            </div>
          </CardContent></Card>
          <p className="text-muted-foreground mb-4 leading-relaxed">Eye of Horus bruger et standard 5×3 grid med 10 faste <Link to="/ordbog/paylines" className={linkClass}>gevinstlinjer</Link> – identisk med Book of Dead og Legacy of Dead. <Link to="/ordbog/scatter" className={linkClass}>Scatter</Link>/wild-symbolet (Eye of Horus-ikonet) har dual-funktion som både scatter og wild, konsistent med "Book of"-genren. Tre eller flere scatters trigger 12 free spins, med <Link to="/ordbog/retrigger" className={linkClass}>retrigger</Link>-mulighed ved yderligere 3+ scatters.</p>
          <p className="text-muted-foreground mb-4 leading-relaxed">RTP'en på 96,31 % placerer Eye of Horus solidt i genren: højere end Book of Dead (96,21 %), men lavere end <Link to="/casinospil/spillemaskiner/legacy-of-dead" className={linkClass}>Legacy of Dead</Link> (96,58 %). House edge på 3,69 % er gennemsnitligt for high-volatility slots. For en session med 500 spins à 10 kr. er det forventede tab 185 kr. – en rimelig "underholdningsomkostning" for en time-to-halvanden times spilletid.</p>
          <p className="text-muted-foreground leading-relaxed">Max win på 10.000× er genrens højeste – dobbelt så meget som Book of Dead (5.000×) og Legacy of Dead (5.000×). Denne højere max win kompenserer for den marginalt lavere RTP og gør Eye of Horus til det mest lukrative valg i "Book of"-genren for spillere, der prioriterer upside-potentiale over gennemsnitlig return.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />Symbol Upgrade: Den Progressive Transformation</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">Symbol upgrade er Eye of Horus' killer-feature og den primære grund til spillets 10.000× max win. Mekanikken fungerer således: ved hvert retrigger under free spins opgraderes alle lavbetalende symboler ét niveau. Første retrigger konverterer det laveste kortsymbol (10) til det næsthøjeste (J). Anden retrigger konverterer J til Q, osv. Efter tilstrækkeligt mange retriggers er alle kortsymboler transformeret til premium tematiske symboler.</p>
          <p className="text-muted-foreground mb-4 leading-relaxed">Denne mekanik har en eksponentiel effekt på gevinstpotentialet. Med hvert upgrade-niveau stiger gennemsnitsgevinsten pr. spin under free spins markant, fordi de symboler, der hyppigst lander (kortsymboler), nu betaler som premium-symboler. I en bonusrunde med 3+ retriggers og fuldt opgraderede symboler er gevinster på 500-2.000× indsatsen realistiske.</p>
          <p className="text-muted-foreground mb-4 leading-relaxed">Matematisk set er sandsynligheden for multiple retriggers lav men ikke negligerbar. Estimeret retrigger-sandsynlighed pr. free spin er 3-5 %, hvilket giver cirka 30-40 % chance for mindst ét retrigger i en 12-spin bonusrunde. To retriggers falder til cirka 10-15 %, og tre+ retriggers til under 5 %. Det er i disse sjældne multi-retrigger scenarier, at Eye of Horus' 10.000× potentiale realiseres.</p>
          <p className="text-muted-foreground leading-relaxed">Sammenlignet med Legacy of Dead's progressive expanding symbol-system er Eye of Horus' symbol upgrade en fundamentalt anderledes mekanik. Legacy of Dead tilføjer FLERE expanding symbols, mens Eye of Horus OPGRADERER ALLE symbolers værdier. Begge systemer belønner retriggers, men Eye of Horus' tilgang er mere "egalitær" – alle symboler på griddet forbedres, snarere end blot de expanding symbols.</p>
        </section>

        <InlineCasinoCards />

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" />EV-Analyse: Eye of Horus i 'Book of'-Landskabet</h2>
          <Card className="mb-6"><CardContent className="pt-6">
            <h3 className="font-semibold mb-3">'Book of'-genren: Komparativ oversigt</h3>
            <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b"><th className="text-left py-2">Slot</th><th className="text-center py-2">RTP</th><th className="text-center py-2">Max Win</th><th className="text-center py-2">Unik Mekanik</th></tr></thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b"><td className="py-2">Eye of Horus</td><td className="text-center">96,31 %</td><td className="text-center">10.000×</td><td className="text-center">Symbol Upgrade</td></tr>
              <tr className="border-b"><td className="py-2">Legacy of Dead</td><td className="text-center">96,58 %</td><td className="text-center">5.000×</td><td className="text-center">Progressiv Expanding</td></tr>
              <tr className="border-b"><td className="py-2">Book of Dead</td><td className="text-center">96,21 %</td><td className="text-center">5.000×</td><td className="text-center">Standard Expanding</td></tr>
              <tr><td className="py-2">Book of Ra</td><td className="text-center">95,10 %</td><td className="text-center">5.000×</td><td className="text-center">Standard Expanding</td></tr>
            </tbody></table></div>
          </CardContent></Card>
          <p className="text-muted-foreground mb-4 leading-relaxed">Eye of Horus placerer sig som genrens "high ceiling"-option. Mens Legacy of Dead tilbyder den højeste RTP, vinder Eye of Horus på max win-potentiale. For spillere, der vægter maksimal upside over gennemsnitlig return, er Eye of Horus det optimale valg. For spillere, der prioriterer konsistent EV, er Legacy of Dead overlegen.</p>
          <p className="text-muted-foreground leading-relaxed">En vigtig nuance er, at Eye of Horus' symbol upgrade-system gør den mere retrigger-afhængig end konkurrenterne. Bonusrunder uden retrigger vil typisk levere lavere gevinster end tilsvarende runder i Book of Dead, da basis-symbolværdierne ikke er opgraderet. Det er retrigger-kaskaden, der transformerer Eye of Horus fra gennemsnitlig til exceptionel – en dynamik der forstærker spillets volatilitet.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary" />Bankroll og Risikostyring</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">Eye of Horus' høje volatilitet og retrigger-afhængighed kræver en bankroll på minimum 250-300 spins. Vi anbefaler et tabsstop på 50 % og et gevinststop på 300 % af startkapitalen. Den ekstra afhængighed af retriggers for store gevinster gør tålmodighed til en dyd – forlæng ikke sessioner i jagten på retriggers.</p>
          <p className="text-muted-foreground leading-relaxed">For <Link to="/casino-bonus" className={linkClass}>bonus</Link>-gennemspilning er Eye of Horus et middelmådigt valg – den høje volatilitet skaber for store bankroll-udsving til stabil gennemspilning. Anvend i stedet lavere volatilitetsalternativer og brug Eye of Horus med din egen bankroll, hvor du kan absorbere variance. Husk altid <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>-principper.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" />Spillehal-Klassikeren Med Det Højeste Ceiling</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">Eye of Horus er en slot med sjæl. Dens landbaserede arv giver den en autenticitet, som rent digitale slots sjældent opnår, og symbol upgrade-mekanikken tilføjer en progressiv dimension, der belønner tålmodighed og retrigger-held. Med 10.000× max win er den 'Book of'-genrens mest lukrative titel – og en uomgængelig del af enhver seriøs slot-spillers repertoire.</p>
          <p className="text-muted-foreground leading-relaxed">For danske spillere, der søger den autentiske spillehal-oplevelse med moderne convenience, er Eye of Horus det perfekte valg. Udforsk flere guides i vores <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskineguide-oversigt</Link>.</p>
        </section>

        <SlotDataLink slotSlug="eye-of-horus" slotName="Eye of Horus" />
        <SlotProviderLink slotSlug="eye-of-horus" />
        <RelatedGuides currentPath="/casinospil/spillemaskiner/eye-of-horus" />
        <FAQSection title="Ofte Stillede Spørgsmål om Eye of Horus" faqs={eyeOfHorusFaqs} />
        <AuthorBio author="jonas" />
      </div>
      <StickyCtaBySlug slug="spildansknu" />
    </>
  );
};

export default EyeOfHorusGuide;

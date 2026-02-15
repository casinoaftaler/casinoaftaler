import { Link } from "react-router-dom";
import { ProviderPage } from "./providers/ProviderPageTemplate";
import { Card, CardContent } from "@/components/ui/card";
import redTigerHero from "@/assets/heroes/red-tiger-hero.jpg";

const RedTigerGuide = () => (
  <ProviderPage
    seoTitle="Red Tiger Gaming – Alt om Spiludvikleren 2026 | Casinoaftaler"
    seoDescription="Komplet guide til Red Tiger Gaming – opkøbt af NetEnt for £200M. Daily Jackpots, Tournaments, Megaways-specialist. 220+ spil under Evolution."
    name="Red Tiger Gaming"
    heroSubtitle="Red Tiger Gaming har innoveret casinobranchen med garanterede Daily Jackpots og Tournaments-funktionen. Opkøbt for £200M, nu en nøglebrik i Evolution-koncernen."
    heroImage={redTigerHero}
    heroImageAlt="Red Tiger Gaming – Daily Jackpots, Tournaments og Megaways slots"
    currentPath="/spiludviklere/red-tiger"
    updatedDate="15-02-2026"
    readTime="13 Min."
    sectionOrder={["technical", "intro", "strategic", "games", "casinos", "history", "licenses", "proscons", "providers", "responsible"]}
    introTitle="Hvad er Red Tiger Gaming?"
    introContent={
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Red Tiger Gaming er en spiludvikler grundlagt i 2014 i St. Julians, Malta, af en gruppe erfarne branchefolk med baggrund i spiludvikling i Europa og Asien. Med over 220 spilleautomater og en unik specialisering i gamification-features som Daily Jackpots og Tournaments har de skabt en niche der kombinerer slots med konkurrenceelementer.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          I 2019 blev Red Tiger opkøbt af <Link to="/spiludviklere/netent" className="text-primary underline hover:text-primary/80">NetEnt</Link> for £200 millioner, og med <Link to="/spiludviklere/evolution-gaming" className="text-primary underline hover:text-primary/80">Evolutions</Link> efterfølgende opkøb af NetEnt er Red Tiger nu en central del af verdens største casinospil-koncern. Denne position giver dem adgang til global distribution og samarbejdssynergier med NetEnt og <Link to="/spiludviklere/big-time-gaming" className="text-primary underline hover:text-primary/80">Big Time Gaming</Link>.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Daily Jackpots – hvor mindst én jackpot garanteret udbetales hver dag – og Tournaments – der tilføjer leaderboard-konkurrence til spillene – er de to innovationer der definerer Red Tigers position i markedet.
        </p>
      </>
    }
    strategicAnalysis={
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Red Tiger Gaming opererer i en strategisk niche der adskiller sig fra både traditionelle slot-studios og jackpot-specialister: de er en gamification-innovator. Daily Jackpots og Tournaments er ikke bare features – de er engagement-systemer der fundamentalt ændrer spillerens relation til spillet. Hvor <Link to="/spiludviklere/microgaming" className="text-primary underline hover:text-primary/80">Microgamings</Link> Mega Moolah tilbyder sjældne men massive jackpots (gennemsnitlig trigger: 1 per 4-5 millioner spins), garanterer Red Tigers Daily Jackpots mindst én daglig udbetaling. Det er en radikalt anderledes psykologisk profil: forudsigelig spænding vs. lotteri-drøm.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Volatilitetsprofilen er medium til høj med RTP-intervallet 94,0-96,5%. Megaways-titlerne (Piggy Riches Megaways, Gonzo's Quest Megaways) har naturligt højere volatilitet, mens Daily Jackpot-spil typisk er medium. Tournaments-funktionen med live leaderboards tilføjer et socialt element der øger session-tid med 20-30% ifølge operatør-data.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Sammenlignet med <Link to="/spiludviklere/pragmatic-play" className="text-primary underline hover:text-primary/80">Pragmatic Play</Link>, der også har turnerings-funktionalitet, differentierer Red Tiger sig ved at turneringerne er integreret direkte i spillene snarere end som et separat lag. Denne native integration skaber en mere sømløs oplevelse. Målgruppen er competitive gamers – spillere der motiveres af leaderboards og social sammenligning.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Markedsrollen er gamification-specialist under Evolution-paraplyen. Red Tiger leverer engagement-teknologi (Daily Jackpots, Tournaments) der kan integreres på tværs af koncernens portefølje. For danske spillere der søger <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">bonusser uden omsætningskrav</Link> med et konkurrenceelement, er Red Tiger-spil med Tournaments det naturlige valg.
        </p>
      </>
    }
    technicalProfile={
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">RTP-interval</p><p className="text-lg font-bold">94,0% – 96,5%</p><p className="text-xs text-muted-foreground">Megaways-titler: typisk 96%+</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Volatilitet</p><p className="text-lg font-bold">Medium – Høj</p><p className="text-xs text-muted-foreground">Daily Jackpot: medium | Megaways: høj</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Unikke Features</p><p className="text-lg font-bold">Daily Jackpots, Tournaments, Mega Tiles</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Progressive Jackpots</p><p className="text-lg font-bold">Ja – Daily Jackpots</p><p className="text-xs text-muted-foreground">Garanteret min. 1 daglig udbetaling</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Bonus Buy</p><p className="text-lg font-bold">Begrænset</p><p className="text-xs text-muted-foreground">Tilgængeligt i udvalgte Megaways-titler</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Release-frekvens</p><p className="text-lg font-bold">3-4 spil/måned</p><p className="text-xs text-muted-foreground">Under Evolution-koncernen</p></CardContent></Card>
      </div>
    }
    historyTitle="Red Tiger Gamings Historie"
    historyIntro="Fra en uafhængig startup til en central del af verdens største casinospil-koncern – Red Tiger Gamings rejse viser værdien af innovation."
    timeline={[
      { year: "2014", event: "Red Tiger Gaming grundlægges i Malta" },
      { year: "2016", event: "Samarbejde med Betsson Group og større operatører" },
      { year: "2017", event: "Partnerskaber med PokerStars og Kindred Group" },
      { year: "2018", event: "ISO 27001 certificering – Daily Jackpots lanceres" },
      { year: "2019", event: "Opkøbt af NetEnt for £200M – Tournaments-funktionen debuterer" },
      { year: "2019", event: "Samarbejde med Danske Spil etableres" },
      { year: "2020", event: "Gonzo's Quest Megaways – NetEnt x Red Tiger samarbejde" },
      { year: "2021", event: "Verdens første NFT-baserede spilleautomat lanceres" },
    ]}
    gamesIntro={
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Red Tiger Gaming specialiserer sig i Megaways-varianter og gamification-features. Daily Jackpots garanterer daglige udbetalinger, og Tournaments tilføjer social konkurrence.
      </p>
    }
    games={[
      { name: "Piggy Riches Megaways", desc: "Megaways-version af klassikeren med 117.649 vinderkombinationer og cascading wins. Daily Jackpots tilgængelig. RTP: 96,19%.", highlight: "117.649 Megaways – 96,19% RTP" },
      { name: "Gonzo's Quest Megaways", desc: "NetEnt x Red Tiger samarbejde der tilføjede Megaways til den ikoniske Gonzo. 117.649 vinderkombinationer. RTP: 96,00%.", highlight: "NetEnt-ikonet med Megaways" },
      { name: "Dragon's Fire Megaways", desc: "Drage-tema med Megaways, stigende multiplikatorer og free spins. RTP: 95,73%.", highlight: "Stigende multiplikatorer" },
      { name: "Cash Volt", desc: "Elektricitetstema med innovative bonusfunktioner og Daily Jackpots-integration. RTP: 95,72%.", highlight: "Daily Jackpots-integration" },
      { name: "Mystery Reels Megaways", desc: "Klassisk frugtmaskine med Megaways-mekanik og mystery symboler. RTP: 96,16%.", highlight: "Mystery symboler – 96,16% RTP" },
      { name: "Primate King", desc: "Jungle-tema med Mega Tiles-funktion der skaber kæmpe symboler. Visuelt imponerende. RTP: 95,60%.", highlight: "Mega Tiles-innovation" },
    ]}
    licensesContent={
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Red Tiger Gaming har licenser fra Malta Gaming Authority, UK Gambling Commission, HM Government of Gibraltar og Alderney Gambling Control Commission. De er ISO 27001 certificeret for informationssikkerhed. Under Evolution-paraplyen overholder de strenge compliance-standarder på tværs af alle regulerede markeder, herunder Danmark via Spillemyndigheden.
      </p>
    }
    pros={[
      "Daily Jackpots – garanterer mindst én daglig jackpot-udbetaling",
      "Tournaments med live leaderboards – unik social konkurrence",
      "Stærke Megaways-titler i samarbejde med NetEnt (Gonzo's Quest MW)",
      "ISO 27001 certificeret + Evolution-koncernens compliance-infrastruktur",
      "Samarbejde med Danske Spil – stærk dansk tilstedeværelse",
    ]}
    cons={[
      "Primært slots – ingen live casino eller bordspil",
      "Nogle Megaways-titler føles som re-skins af NetEnt-klassikere",
      "Daily Jackpot-størrelsen er typisk moderat sammenlignet med progressive",
    ]}
    faqs={[
      { question: "Hvad er Red Tiger Gaming?", answer: "Red Tiger Gaming er en spiludvikler fra 2014, nu ejet af Evolution Gaming (via NetEnt). De har 220+ spil og er kendte for Daily Jackpots, Tournaments og Megaways-slots." },
      { question: "Hvad er Daily Jackpots?", answer: "Daily Jackpots er Red Tigers innovation der garanterer mindst én jackpot-udbetaling hver dag. Jackpotten har en deadline og SKAL udbetales inden dagen er omme." },
      { question: "Hvad er forskellen på Daily Jackpots og progressive jackpots?", answer: (
        <>
          Daily Jackpots garanterer daglig udbetaling med moderate beløb. Progressive jackpots som <Link to="/spiludviklere/microgaming" className="text-primary underline hover:text-primary/80">Microgamings</Link> Mega Moolah vokser over tid uden garanteret timing, men kan nå millioner.
        </>
      )},
      { question: "Er Red Tiger-spil tilgængelige i Danmark?", answer: "Ja, Red Tiger Gaming har været i Danmark siden 2019 via samarbejde med Danske Spil og findes hos de fleste danske casinoer." },
    ]}
    responsibleGamingText="Red Tiger Gaming integrerer ansvarligt spil-features direkte i Tournaments-funktionen med session-grænser og indsatslofter. Daily Jackpots er designet med transparente odds og udbetalingsgarantier."
  />
);

export default RedTigerGuide;

import { Link } from "react-router-dom";
import { ProviderPage } from "./providers/ProviderPageTemplate";
import { Card, CardContent } from "@/components/ui/card";
import evolutionHero from "@/assets/heroes/evolution-gaming-hero.jpg";

const EvolutionGamingGuide = () => (
  <ProviderPage
    seoTitle="Evolution Gaming – Alt om Spiludvikleren 2026 | Casinoaftaler"
    seoDescription="Komplet guide til Evolution Gaming – verdens førende live casino-leverandør med 70%+ markedsandel. Crazy Time, Lightning Roulette, 16.000+ ansatte."
    name="Evolution Gaming"
    heroSubtitle="Evolution Gaming er den ubestridte leder inden for live casino med over 70% markedsandel og 16.000+ ansatte. Fra Lightning Roulette til Crazy Time – de har defineret en helt ny kategori."
    heroImage={evolutionHero}
    heroImageAlt="Evolution Gaming live casino studio med professionelle dealere"
    currentPath="/spiludviklere/evolution-gaming"
    updatedDate="15-02-2026"
    readTime="15 Min."
    sectionOrder={["strategic", "intro", "technical", "history", "games", "licenses", "casinos", "proscons", "providers", "responsible"]}
    introTitle="Hvad er Evolution Gaming?"
    introContent={
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Evolution Gaming (nu Evolution) er en svensk-lettisk spiludvikler grundlagt i 2006, der har opbygget et de facto monopol på <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link>-markedet med over 70% markedsandel. Med 16.000+ medarbejdere fordelt på studiefaciliteter i Letland, Malta, Georgien, Canada og flere andre lande leverer de live dealer-spil til mere end 700 online casinoer globalt.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Evolution adskiller sig fundamentalt fra alle andre udviklere i denne guide: de er ikke primært en slot-udvikler. Deres kernekompetence er live-streaming af bordspil med professionelle dealere og integration af RNG-baserede bonuselementer i live-formatet. Crazy Time, Lightning Roulette og MONOPOLY Live har skabt en helt ny spilkategori – game shows – der tiltrækker spillere, som aldrig ville røre en traditionel spilleautomat.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Med opkøb af <Link to="/spiludviklere/netent" className="text-primary underline hover:text-primary/80">NetEnt</Link>, <Link to="/spiludviklere/red-tiger" className="text-primary underline hover:text-primary/80">Red Tiger</Link> og <Link to="/spiludviklere/big-time-gaming" className="text-primary underline hover:text-primary/80">Big Time Gaming</Link> er Evolution nu verdens største casinospil-koncern med en samlet portefølje på over 800 titler.
        </p>
      </>
    }
    strategicAnalysis={
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Evolution indtager en position i casinobranchen der er uden parallel: de er både den dominerende leverandør i live casino-segmentet OG ejer af tre store slot-studios (NetEnt, Red Tiger, Big Time Gaming). Denne vertikale integration gør dem til den eneste aktør der kan tilbyde et komplet casinoprodukt fra én leverandør. Ingen anden udvikler – hverken <Link to="/spiludviklere/pragmatic-play" className="text-primary underline hover:text-primary/80">Pragmatic Play</Link> med deres live casino-division eller <Link to="/spiludviklere/microgaming" className="text-primary underline hover:text-primary/80">Microgaming</Link> med deres aggregeringsplatform – har samme bredde.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Risikoprofilen for Evolution-spil er radikalt anderledes end traditionelle slots. Live casino-spil har typisk en house edge på 1-5% (blackjack ~0,5%, roulette ~2,7%), men volatiliteten er lavere og mere forudsigelig. Game shows som Crazy Time og Lightning Roulette introducerer høj volatilitet i live-formatet med multiplikatorer op til 25.000x, men den gennemsnitlige spiller oplever en jævnere kurve end i high-volatility slots.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Markedsrollen er klar: Evolution er en category creator og konsolidator. De opfandt game show-kategorien, dominerer live casino, og opkøber slots-studios for at kontrollere hele værdikæden. For danske casinospillere er konsekvensen, at Evolution-spil typisk kun bidrager med 10-20% til bonusomsætning – en vigtig detalje ved <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Målgruppen er social-orienterede spillere der søger en oplevelse snarere end ren gambling. Game shows med live hosts skaber underholdningsværdi uafhængigt af gevinstresultatet – en psykologisk profil der adskiller sig markant fra den high-risk-søgende spiller hos Nolimit City eller Hacksaw Gaming.
        </p>
      </>
    }
    technicalProfile={
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">House Edge (Live)</p><p className="text-lg font-bold">0,5% – 5,26%</p><p className="text-xs text-muted-foreground">Blackjack lavest, game shows varierer</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Volatilitet</p><p className="text-lg font-bold">Lav – Høj (varierer)</p><p className="text-xs text-muted-foreground">Game shows har høj, bordspil har lav</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Feature-typer</p><p className="text-lg font-bold">Live Streaming, Multipliers, Bonus Wheels</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Progressive Jackpots</p><p className="text-lg font-bold">Nej (direkte)</p><p className="text-xs text-muted-foreground">Via NetEnt/Red Tiger-studios</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Bonus-bidrag</p><p className="text-lg font-bold">10-20% af omsætningskrav</p><p className="text-xs text-muted-foreground">Lavere end slots pga. lav house edge</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Koncern-portefølje</p><p className="text-lg font-bold">800+ spil totalt</p><p className="text-xs text-muted-foreground">Live + NetEnt + Red Tiger + BTG</p></CardContent></Card>
      </div>
    }
    historyTitle="Evolution Gamings Historie"
    historyIntro="Fra en startup i Letland til verdens største casinospil-koncern – Evolutions rejse er drevet af teknologisk innovation og strategiske opkøb."
    timeline={[
      { year: "2006", event: "Evolution Gaming grundlægges i Riga, Letland" },
      { year: "2009", event: "Første live casino-studio åbner med blackjack og roulette" },
      { year: "2013", event: "Immersive Roulette vinder 'Game of the Year' med HD-streaming" },
      { year: "2015", event: "Børsnoteret på Nasdaq Stockholm" },
      { year: "2018", event: "Lightning Roulette og MONOPOLY Live lanceres" },
      { year: "2019", event: "Crazy Time udgives – det mest populære live game show" },
      { year: "2020", event: "Opkøb af NetEnt for 19,6 milliarder SEK" },
      { year: "2021", event: "Opkøb af Big Time Gaming – Megaways-patentet sikres" },
      { year: "2022", event: "Rebranding til 'Evolution' – porteføljen overstiger 800 spil" },
    ]}
    gamesIntro={
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Evolution Gaming er primært en live casino-leverandør, men ejer via opkøb også NetEnt, Red Tiger og BTG. Deres live-spil bidrager typisk kun med 10-20% til bonusomsætning.
      </p>
    }
    games={[
      { name: "Crazy Time", desc: "Det ultimative live game show med pengehjul, fire bonusrunder og multiplikatorer op til 25.000x. Over 200 samtidige spillere per session.", highlight: "Op til 25.000x multiplikator" },
      { name: "Lightning Roulette", desc: "Klassisk roulette med tilfældige multiplikatorer op til 500x på straight-up numre. RTP: 97,30%. Over 1 million daglige spins globalt.", highlight: "500x multiplikatorer – 97,30% RTP" },
      { name: "MONOPOLY Live", desc: "Brætspillet i live format med 3D Mr. Monopoly-bonusrunde. Pengehjul med chance-kort og multiplikatorer.", highlight: "3D Monopoly-bonusrunde" },
      { name: "Immersive Roulette", desc: "HD-streaming med 200+ kameraer og slow-motion replays. Den mest cinematiske live roulette-oplevelse.", highlight: "200+ kameraer & slow-motion" },
      { name: "Infinite Blackjack", desc: "Live blackjack uden pladsbegrænsning. Side bets og Six Card Charlie-regel. House edge: ~0,5%.", highlight: "Laveste house edge: ~0,5%" },
      { name: "Deal or No Deal Live", desc: "TV-showet i live format med briefcases og kvalifikationsrunder. RTP varierer baseret på spillervalg.", highlight: "Ikonisk TV-show format" },
    ]}
    licensesContent={
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Evolution Gaming er licenseret af Malta Gaming Authority, UK Gambling Commission, Alderney Gambling Control Commission og den danske Spillemyndighed. Som børsnoteret selskab på Nasdaq Stockholm (markedsværdi ~200 milliarder SEK) er de underlagt strenge krav til gennemsigtighed, corporate governance og kvartalvis finansiel rapportering. Live casino-studierne overvåges døgnet rundt af uafhængige auditører.
      </p>
    }
    pros={[
      "Markedsleder inden for live casino med 70%+ global markedsandel",
      "Banebrydende game shows: Crazy Time, Lightning Roulette, MONOPOLY Live",
      "Ejer NetEnt, Red Tiger og Big Time Gaming – komplet spilportefølje",
      "Børsnoteret på Nasdaq med fuld finansiel gennemsigtighed",
      "16.000+ medarbejdere og studiefaciliteter på 4 kontinenter",
    ]}
    cons={[
      "Live casino-spil bidrager kun 10-20% til bonusomsætning",
      "Kræver stabil internetforbindelse (min. 5 Mbit/s anbefalet)",
      "Minimumindsatser på live-borde typisk 5-10 DKK – højere end RNG-slots",
    ]}
    faqs={[
      { question: "Hvad er Evolution Gaming?", answer: "Evolution (tidligere Evolution Gaming) er verdens førende leverandør af live casino-spil, grundlagt i 2006. De leverer live dealer-spil til over 700 casinoer og ejer NetEnt, Red Tiger og Big Time Gaming." },
      { question: "Hvad er Crazy Time?", answer: "Crazy Time er Evolutions mest populære live game show med pengehjul, fire bonusrunder (Coin Flip, Cash Hunt, Pachinko, Crazy Time) og multiplikatorer op til 25.000x." },
      { question: "Tæller live casino-spil til bonusomsætning?", answer: (
        <>
          Live casino-spil bidrager typisk kun med 10-20% til <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>. Tjek altid bonusvilkårene hos det specifikke casino.
        </>
      )},
      { question: "Hvem ejer Evolution?", answer: "Evolution er børsnoteret på Nasdaq Stockholm. De har opkøbt NetEnt (2020), Red Tiger og Big Time Gaming og er verdens største casinospil-koncern." },
    ]}
    responsibleGamingText="Evolution Gaming har implementeret realitets-checks, session-timere og indsatsgrænser direkte i deres live casino-grænseflader og samarbejder med flere europæiske spillehjælpsorganisationer."
  />
);

export default EvolutionGamingGuide;

import { Link } from "react-router-dom";
import { ProviderPage } from "./providers/ProviderPageTemplate";

const EvolutionGamingGuide = () => (
  <ProviderPage
    seoTitle="Evolution Gaming – Alt om Spiludvikleren 2026 | Casinoaftaler"
    seoDescription="Komplet guide til Evolution Gaming – verdens førende inden for live casino. Læs om Crazy Time, Lightning Roulette, deres historie og dominerende markedsposition."
    name="Evolution Gaming"
    heroSubtitle="Evolution Gaming er den ubestridte leder inden for live casino og har revolutioneret online gambling med innovative game shows, professionelle dealere og banebrydende teknologi."
    currentPath="/spiludviklere/evolution-gaming"
    introTitle="Hvad er Evolution Gaming?"
    introContent={
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Evolution Gaming (nu Evolution) er en svensk spiludvikler, der blev grundlagt i 2006 i Riga, Letland, med hovedkontor i Stockholm. De har på under to årtier etableret sig som den absolut dominerende aktør inden for{" "}
          <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link>-segmentet med en markedsandel på over 70%. Deres platform leverer live dealer-spil til mere end 700 online casinoer på verdensplan, og de beskæftiger over 16.000 medarbejdere fordelt på studiefaciliteter i Letland, Malta, Georgien, Canada og flere andre lande.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Det der virkelig har cementeret Evolutions position er deres evne til konstant at innovere. Fra klassiske live bordspil som blackjack og roulette har de udvidet til helt nye kategorier med game shows som Crazy Time, Monopoly Live og Deal or No Deal. Disse spil kombinerer live dealer-elementer med RNG-baserede bonusrunder og har tiltrukket en helt ny generation af spillere. Når du bruger en{" "}
          <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonus</Link> hos et dansk casino, bidrager live casino-spil typisk med 10-20% til{" "}
          <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          I 2020 opkøbte Evolution <Link to="/spiludviklere/netent" className="text-primary underline hover:text-primary/80">NetEnt</Link> for 19,6 milliarder SEK, og efterfølgende har de også opkøbt <Link to="/spiludviklere/red-tiger" className="text-primary underline hover:text-primary/80">Red Tiger</Link> og Big Time Gaming, hvilket gør dem til verdens største leverandør af casinospil. Evolution er børsnoteret på Nasdaq Stockholm og er en af Nordens mest værdifulde tech-virksomheder.
        </p>
      </>
    }
    historyTitle="Evolution Gamings Historie"
    historyIntro="Fra en startup i Letland til verdens største casinospil-koncern – Evolutions rejse er en historie om visionær innovation og aggressiv vækst."
    timeline={[
      { year: "2006", event: "Evolution Gaming grundlægges i Riga, Letland" },
      { year: "2009", event: "Første live casino-studio åbner med blackjack og roulette" },
      { year: "2013", event: "Immersive Roulette vinder 'Game of the Year' – HD-streaming med slow-motion replays" },
      { year: "2015", event: "Børsnoteret på Nasdaq Stockholm – markedsværdi eksploderer" },
      { year: "2018", event: "Lightning Roulette og MONOPOLY Live revolutionerer live gaming" },
      { year: "2019", event: "Crazy Time lanceres og bliver det mest populære live game show" },
      { year: "2020", event: "Opkøb af NetEnt for 19,6 milliarder SEK" },
      { year: "2022", event: "Rebranding til 'Evolution' – porteføljen overstiger 800 spil" },
      { year: "2024", event: "Over 700 operatørpartnere og 16.000+ medarbejdere globalt" },
    ]}
    gamesIntro={
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Evolution Gaming er primært kendt for deres live casino-spil, men med opkøbene af NetEnt og Red Tiger tilbyder de nu også spilleautomater. Deres spil er populære i{" "}
        <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">bonusser uden omsætningskrav</Link> og{" "}
        <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>-tilbud.
      </p>
    }
    games={[
      { name: "Crazy Time", desc: "Det ultimative live game show med et enormt pengehjul, fire bonusrunder (Coin Flip, Cash Hunt, Pachinko, Crazy Time) og multiplikatorer op til 25.000x.", highlight: "Op til 25.000x multiplikator" },
      { name: "Lightning Roulette", desc: "Klassisk roulette med et elektrificerende twist – tilfældige multiplikatorer op til 500x på straight-up numre. Det mest populære live roulette-spil nogensinde.", highlight: "500x multiplikatorer" },
      { name: "MONOPOLY Live", desc: "Det ikoniske brætspil i live casino-format. Et pengehjul med bonus-runder, der tager dig ind i en 3D Monopoly-verden med Mr. Monopoly selv.", highlight: "3D Monopoly-bonusrunde" },
      { name: "Immersive Roulette", desc: "HD-streaming med over 200 kameraer og slow-motion replays af kuglens landing. Den mest cinematiske roulette-oplevelse online.", highlight: "200+ kameraer & slow-motion" },
      { name: "Deal or No Deal Live", desc: "TV-showet i live casino-format med rigtige briefcases og en live host. Spændende kvalifikationsrunder og multiplikatorer.", highlight: "Ikonisk TV-show format" },
      { name: "Infinite Blackjack", desc: "Live blackjack uden pladsbegrænsning – uendeligt antal spillere kan deltage samtidig. Side bets og Six Card Charlie-regel.", highlight: "Ubegrænset antal spillere" },
    ]}
    licensesContent={
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Evolution Gaming er licenseret af Malta Gaming Authority, UK Gambling Commission, Alderney Gambling Control Commission og talrige andre jurisdiktioner verden over, herunder den danske Spillemyndighed. Som børsnoteret selskab på Nasdaq Stockholm er de underlagt strenge krav til gennemsigtighed og corporate governance. Alle deres spil testes af uafhængige organisationer, og live casino-studierne overvåges døgnet rundt. Læs mere om{" "}
        <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link> for live casino-spil.
      </p>
    }
    pros={[
      "Absolut markedsleder inden for live casino med 70%+ markedsandel",
      "Banebrydende game shows som Crazy Time og Lightning Roulette",
      "Professionelle dealere og studiefaciliteter i verdensklasse",
      "Ejer NetEnt, Red Tiger og Big Time Gaming – komplet spilportefølje",
      "Børsnoteret på Nasdaq – høj gennemsigtighed og troværdighed",
    ]}
    cons={[
      "Live casino-spil bidrager typisk kun 10-20% til bonusomsætning",
      "Kræver stabil internetforbindelse for optimal oplevelse",
      "Minimumindsatser kan være højere end hos RNG-baserede spil",
    ]}
    faqs={[
      { question: "Hvad er Evolution Gaming?", answer: "Evolution Gaming (nu Evolution) er verdens førende leverandør af live casino-spil, grundlagt i 2006. De leverer live dealer-spil til over 700 online casinoer globalt." },
      { question: "Hvad er Crazy Time?", answer: "Crazy Time er Evolutions mest populære live game show – et stort pengehjul med fire bonusrunder og multiplikatorer op til 25.000x. Det kombinerer live dealer-elementer med RNG-baserede bonusfunktioner." },
      { question: "Ejer Evolution andre spiludviklere?", answer: "Ja, Evolution har opkøbt NetEnt (2020), Red Tiger Gaming og Big Time Gaming, hvilket gør dem til verdens største casinospil-koncern." },
      { question: "Kan man spille Evolution-spil med bonus?", answer: "Ja, men live casino-spil bidrager typisk kun med 10-20% til omsætningskrav hos de fleste danske casinoer. Tjek altid bonusvilkårene." },
    ]}
  />
);

export default EvolutionGamingGuide;

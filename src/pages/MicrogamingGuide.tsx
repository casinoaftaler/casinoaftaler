import { Link } from "react-router-dom";
import { ProviderPage } from "./providers/ProviderPageTemplate";
import { Card, CardContent } from "@/components/ui/card";
import microgamingHero from "@/assets/heroes/microgaming-hero.jpg";

const MicrogamingGuide = () => (
  <ProviderPage
    seoTitle="Microgaming – Alt om Spiludvikleren 2026 | Casinoaftaler"
    seoDescription="Komplet guide til Microgaming – branchens pioner siden 1994. Mega Moolah: €1 milliard+ udbetalt. 900+ spil, Quickfire-aggregator, eCOGRA-medstifter."
    name="Microgaming"
    heroSubtitle="Microgaming er casinobranchens historiske fundament. Grundlagt i 1994 – blandt de første online casinoer. Mega Moolah har udbetalt over €1 milliard i progressive jackpots."
    heroImage={microgamingHero}
    heroImageAlt="Microgaming – pioner i online casino siden 1994 med Mega Moolah jackpots"
    currentPath="/spiludviklere/microgaming"
    updatedDate="15-02-2026"
    readTime="14 Min."
    sectionOrder={["strategic", "intro", "history", "technical", "games", "casinos", "proscons", "licenses", "providers", "responsible"]}
    introTitle="Hvad er Microgaming?"
    introContent={
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Microgaming er en af de mest indflydelsesrige aktører i casinobranchens historie. Grundlagt i 1994 på Isle of Man var de blandt de allerførste til at lancere et funktionelt online casino – et skridt der fundamentalt ændrede den globale spilleindustri. Med over 900 spiltitler, det mest kendte progressive jackpot-netværk i verden (Mega Moolah) og rollen som medstifter af eCOGRA i 2003, har Microgaming sat standarden for fairness og innovation i tre årtier.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Mega Moolah er Microgamings kronjuvel. Denne progressive jackpot-slot har udbetalt over €1 milliard i samlede jackpots, med den største enkeltgevinst på €18,9 millioner i 2019. Fire progressive niveauer (Mini, Minor, Major, Mega) sikrer regelmæssige udbetalinger, og Mega-jackpotten starter altid ved €1 million. Jackpot-spil kombineres ofte med <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>, selvom jackpot-slots typisk bidrager med lavere procent til omsætningskrav.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          I de senere år har Microgaming transformeret sig fra primær spiludvikler til aggregator via Quickfire-platformen, der distribuerer spil fra et bredt netværk af uafhængige studios. Denne strategiske pivot afspejler branchens modenhed, hvor distribution er lige så vigtigt som content-produktion.
        </p>
      </>
    }
    strategicAnalysis={
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Microgaming er casinobranchens legacy-institution – en status der minder om, hvad IBM er for tech-industrien. De opfandt ikke bare et produkt; de skabte den infrastruktur som resten af branchen er bygget på. Første online casino (1994), første mobile casino (2004), første progressive jackpot-netværk (Cash Splash, 1998) og medstifter af eCOGRA (2003) – listen af 'firsts' er imponerende. Men som IBM har Microgaming oplevet, at pioneering ikke garanterer evigt markedslederskab.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Den strategiske udfordring er tydelig: Microgamings egne nye spil kan ikke konkurrere med den kreative energi fra studier som <Link to="/spiludviklere/hacksaw-gaming" className="text-primary underline hover:text-primary/80">Hacksaw Gaming</Link> eller <Link to="/spiludviklere/nolimit-city" className="text-primary underline hover:text-primary/80">Nolimit City</Link>. Mange af de 900+ titler har dateret grafik (pre-HTML5), og release-strategien er skiftet til partnerstudio-distribution via Quickfire snarere end intern udvikling. Mega Moolah forbliver den kommercielle motor, men jackpot-slots har en basis-RTP på kun 88-92% – langt under moderne standards.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Sammenlignet med <Link to="/spiludviklere/evolution-gaming" className="text-primary underline hover:text-primary/80">Evolution Gaming</Link>, der også er en legacy-brand, har Microgaming valgt en fundamentalt anderledes strategisk vej. Evolution konsoliderede via aggressive opkøb (NetEnt, BTG, Red Tiger); Microgaming pivoterede til distribution via Quickfire. Evolution ejer IP; Microgaming distribuerer andres IP. Begge strategier har merit, men Evolutions har vist sig kommercielt stærkere.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Målgruppen er jackpot-jægere og nostalgiske spillere der har en emotionel tilknytning til klassikere som Immortal Romance og Thunderstruck II. Markedsrollen er legacy institution og aggregator. For danske spillere er Mega Moolah det primære trækplaster – et spil der giver livs-ændrende gevinstpotentiale trods den lave basis-RTP.
        </p>
      </>
    }
    technicalProfile={
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">RTP-interval</p><p className="text-lg font-bold">88% – 96,6%</p><p className="text-xs text-muted-foreground">Jackpot-slots: 88-92% | Standard: 95-96,6%</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Volatilitet</p><p className="text-lg font-bold">Lav – Høj (varierer)</p><p className="text-xs text-muted-foreground">Mega Moolah: lav-medium base, høj jackpot</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Feature-typer</p><p className="text-lg font-bold">Progressive Jackpots, Free Spins, Multipliers, Stacked Wilds</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Progressive Jackpots</p><p className="text-lg font-bold">Ja – branchens største netværk</p><p className="text-xs text-muted-foreground">€1 milliard+ udbetalt via Mega Moolah</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Bonus Buy</p><p className="text-lg font-bold">Nej</p><p className="text-xs text-muted-foreground">Ikke tilgængeligt i egne titler</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Aggregering</p><p className="text-lg font-bold">Quickfire-platformen</p><p className="text-xs text-muted-foreground">Distribuerer 50+ partnerstudios</p></CardContent></Card>
      </div>
    }
    historyTitle="Microgamings Historie"
    historyIntro="Microgamings historie er uadskillelig fra online casinoindustriens oprindelse. De var der fra dag ét og har formet branchen i over 30 år."
    timeline={[
      { year: "1994", event: "Microgaming grundlægges – lancerer et af verdens første online casinoer" },
      { year: "1998", event: "Cash Splash – branchens første online progressive jackpot" },
      { year: "2003", event: "Medstifter af eCOGRA – sætter fairness-standard for branchen" },
      { year: "2004", event: "Første mobile casino lanceres – pioner inden for mobilgaming" },
      { year: "2006", event: "Mega Moolah udgives – den legendariske progressive jackpot" },
      { year: "2009", event: "Quickfire-aggregeringsplatformen introduceres" },
      { year: "2015", event: "Verdensrekord: £13,2M vundet på Mega Moolah" },
      { year: "2019", event: "€18,9M udbetalt i Mega Moolah – ny verdensrekord" },
      { year: "2023", event: "Over €1 milliard udbetalt i Mega Moolah-jackpots totalt" },
    ]}
    gamesIntro={
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Microgaming har branchens største spilbibliotek med 900+ titler, men det er det progressive jackpot-netværk med Mega Moolah der definerer dem. Jackpot-slots har lavere basis-RTP, men den potentielle gevinst er livsændrende.
      </p>
    }
    games={[
      { name: "Mega Moolah", desc: "Verdens mest kendte progressive jackpot. Fire niveauer (Mini, Minor, Major, Mega). Mega starter ved €1M. Basis-RTP: 88,12%. Samlet udbetalt: €1 milliard+.", highlight: "€1 milliard+ udbetalt totalt" },
      { name: "Immortal Romance", desc: "Vampyr-temaet slot med fire unikke free spins-funktioner der låses op progressivt. RTP: 96,86%. En af branchens bedste storylines.", highlight: "Progressiv storyline – 96,86% RTP" },
      { name: "Thunderstruck II", desc: "Nordisk mytologi-slot med fire bonusniveauer baseret på Thor, Odin, Loki og Valkyrie. RTP: 96,65%.", highlight: "Fire guddommelige bonusniveauer" },
      { name: "Break Da Bank Again", desc: "Bankrøveri-klassiker med free spins og 5x multiplikator i bonus. RTP: 95,43%. Tidløst simpelt gameplay.", highlight: "Tidløs klassiker – 95,43% RTP" },
      { name: "Avalon II", desc: "King Arthur-slot med otte bonusfunktioner og imponerende grafik for sin tid. RTP: 96,30%. Et ambitiøst mesterværk.", highlight: "8 bonusfunktioner – 96,30% RTP" },
      { name: "Mega Moolah Goddess", desc: "Egyptisk variant af Mega Moolah-netværket med opgraderet grafik og de samme massive jackpots. Basis-RTP: 88,12%.", highlight: "Mega Moolah-netværket – egyptisk" },
    ]}
    licensesContent={
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Microgaming er licenseret af Isle of Man Gambling Supervision Commission, Malta Gaming Authority og UK Gambling Commission. Som medstifter af eCOGRA i 2003 har de været med til at definere de fairness-standarder hele branchen bruger. Alle spil testes af eCOGRA med certificeret RNG-teknologi. Bemærk at jackpot-slots (Mega Moolah) har lavere basis-RTP (88%) fordi en del af indsatsen går til jackpot-puljen.
      </p>
    }
    pros={[
      "Branchens pioner – 30+ års erfaring og historisk betydning",
      "Mega Moolah – €1 milliard+ i samlede jackpot-udbetalinger",
      "900+ titler – branchens største bibliotek",
      "Medstifter af eCOGRA – definerede fairness-standarden",
      "Quickfire-aggregeringsplatform med 50+ partnerstudios",
    ]}
    cons={[
      "Mange ældre titler med pre-HTML5 grafik",
      "Jackpot-slots har lav basis-RTP (88-92%)",
      "Skiftet fokus til aggregering – færre egne nye titler",
    ]}
    faqs={[
      { question: "Hvad er Microgaming?", answer: "Microgaming er en af verdens ældste spiludviklere, grundlagt i 1994 på Isle of Man. De lancerede et af de første online casinoer, har 900+ spil og har udbetalt €1 milliard+ i Mega Moolah-jackpots." },
      { question: "Hvad er Mega Moolah?", answer: "Mega Moolah er Microgamings legendariske progressive jackpot-slot med fire niveauer. Mega-jackpotten starter ved €1 million, og den største udbetaling var €18,9 millioner i 2019." },
      { question: "Hvorfor har Mega Moolah lav RTP?", answer: "Mega Moolah har en basis-RTP på 88,12% fordi en del af hver indsats bidrager til den progressive jackpot-pulje. Inklusiv jackpot-bidraget er den langsigtede RTP højere, men basis-afkastet er lavere end standard slots." },
      { question: "Er Microgaming-spil fair?", answer: "Ja, Microgaming medstiftede eCOGRA i 2003 netop for at etablere branchestandarder for fairness. Alle spil testes regelmæssigt med certificeret RNG." },
    ]}
    responsibleGamingText="Microgaming var med til at grundlægge eCOGRA i 2003 og har siden konsekvent investeret i ansvarligt spil-initiativer, herunder PlayItForward-programmet der støtter spillebehandling globalt."
  />
);

export default MicrogamingGuide;

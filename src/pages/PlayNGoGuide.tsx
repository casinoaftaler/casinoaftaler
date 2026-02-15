import { Link } from "react-router-dom";
import { ProviderPage } from "./providers/ProviderPageTemplate";
import { Card, CardContent } from "@/components/ui/card";
import playNGoHero from "@/assets/heroes/play-n-go-hero.jpg";

const PlayNGoGuide = () => (
  <ProviderPage
    seoTitle="Play'n GO – Alt om Spiludvikleren 2026 | Casinoaftaler"
    seoDescription="Komplet guide til Play'n GO – svenske spiludviklere bag Book of Dead og Reactoonz. 300+ spil, storytelling-fokus, 5x Slot Provider of the Year."
    name="Play'n GO"
    heroSubtitle="Play'n GO er Nordens mest konsistente spiludvikler med over 300 spil, 5 gange 'Slot Provider of the Year' og en storytelling-tradition der spænder fra Book of Dead til Reactoonz."
    heroImage={playNGoHero}
    heroImageAlt="Play'n GO – kreative spilleautomater med Book of Dead og Reactoonz"
    currentPath="/spiludviklere/play-n-go"
    updatedDate="15-02-2026"
    readTime="13 Min."
    sectionOrder={["intro", "history", "games", "strategic", "technical", "licenses", "casinos", "proscons", "providers", "responsible"]}
    introTitle="Hvad er Play'n GO?"
    introContent={
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Play'n GO er en svensk spiludvikler med rødder i Örebro helt tilbage til 2005. Med en portefølje på over 300 spil har de konsekvent leveret kvalitet over kvantitet – en filosofi der har sikret dem fem 'Slot Provider of the Year'-priser ved EGR Awards, flere end nogen anden udvikler. Deres spil kendetegnes ved gennemtænkte narrativer, unikke mekanikker og mobiloptimering fra dag ét.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Book of Dead er Play'n GOs flagskib – et egyptisk eventyr med Rich Wilde der har genereret milliarder af spins og er blandt de mest udbudte titler i <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins-tilbud</Link> på det danske marked. Reactoonz-serien med dens kaotiske grid-gameplay har tilføjet en helt anden dimension til porteføljen, og Rich Wilde-franchisen fortsætter med nye eventyr.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Med licenser fra Malta Gaming Authority, UK Gambling Commission og Spillemyndigheden opererer Play'n GO i de mest regulerede markeder globalt. De er en af få udviklere der aldrig har kompromitteret på <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>-standarder.
        </p>
      </>
    }
    strategicAnalysis={
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Play'n GO er casinobranchens storyteller – en rolle der er fundamentalt anderledes end de mekanik-drevne udviklere som <Link to="/spiludviklere/hacksaw-gaming" className="text-primary underline hover:text-primary/80">Hacksaw Gaming</Link> eller <Link to="/spiludviklere/nolimit-city" className="text-primary underline hover:text-primary/80">Nolimit City</Link>. Hvor Hacksaw designer fra mekanikken og udad, designer Play'n GO fra narrativet og indad. Book of Dead er ikke bare et slot med expanding symbols – det er et eventyr med Rich Wilde som protagonist. Denne storytelling-tilgang skaber dybere spillerengagement og længere sessioner.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Volatilitetsprofilen er medium til høj med en bemærkelsesværdig konsistens. RTP-intervallet 94,0-96,5% er standardiseret på tværs af porteføljen, og Play'n GO er en af de få udviklere der IKKE tilbyder operatør-konfigurerbar RTP – det samme spil har altid den samme RTP uanset casino. Dette er et vigtigt differentieringspunkt vs. Pragmatic Play, hvor casinoer kan sænke RTP.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Målgruppen er den narrative spillers segment: folk der værdsætter æstetik, univers-building og gameplay-dybde. Play'n GO-spillere vælger spil baseret på tema og franchise snarere end matematisk profil. Markedspositionen er nordisk stabilitet – de er det sikre valg der aldrig skuffer, men sjældent overrasker med vilde eksperimenter.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Risikoen for Play'n GO er relevans i en branche der accelererer mod ekstrem volatilitet. Deres konservative tilgang – ingen bonus buy, sjældent over medium-high volatilitet – kan virke tam sammenlignet med Nolimit Citys 2.000.000x maks. gevinster. Men for spillere der bruger <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link> til at udforske, er Play'n GO-titler ideelle.
        </p>
      </>
    }
    technicalProfile={
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">RTP-interval</p><p className="text-lg font-bold">94,0% – 96,5%</p><p className="text-xs text-muted-foreground">Ikke operatør-konfigurerbar</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Volatilitet</p><p className="text-lg font-bold">Medium – Høj</p><p className="text-xs text-muted-foreground">Hitfrekvens typisk 22-30%</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Feature-typer</p><p className="text-lg font-bold">Expanding Symbols, Cluster Pays, Grid, Cascading</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Progressive Jackpots</p><p className="text-lg font-bold">Nej</p><p className="text-xs text-muted-foreground">Fokus på fixed maks. gevinster</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Bonus Buy</p><p className="text-lg font-bold">Nej</p><p className="text-xs text-muted-foreground">Tilbyder ikke feature buy</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground uppercase mb-1">Release-frekvens</p><p className="text-lg font-bold">4-5 spil/måned</p><p className="text-xs text-muted-foreground">Konsistent og kvalitetsdrevet</p></CardContent></Card>
      </div>
    }
    historyTitle="Play'n GOs Historie"
    historyIntro="Play'n GO startede som et lille svensk studio i Örebro og har vokset til en global aktør med 300+ spil – uden at kompromittere på kvalitet."
    timeline={[
      { year: "2005", event: "Play'n GO grundlægges i Örebro, Sverige" },
      { year: "2012", event: "Første mobiloptimerede spil lanceres" },
      { year: "2014", event: "Book of Dead udgives – bliver et globalt fænomen" },
      { year: "2017", event: "Reactoonz lanceres med innovativ grid-mekanik" },
      { year: "2019", event: "Porteføljen når 200 spil – alle mobile-first" },
      { year: "2020", event: "Reactoonz 2 udgives – serien ekspanderes" },
      { year: "2022", event: "5. gang 'Slot Provider of the Year' ved EGR Awards" },
      { year: "2024", event: "Over 300 spil i porteføljen med global distribution" },
    ]}
    gamesIntro={
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Play'n GO er mestre i franchise-building. Rich Wilde-serien, Reactoonz-universet og mytologiske titler som Rise of Olympus demonstrerer deres storytelling-styrke. Spillene bruges bredt i{" "}
        <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins-kampagner</Link> på danske casinoer.
      </p>
    }
    games={[
      { name: "Book of Dead", desc: "Rich Wilde i et egyptisk eventyr med expanding symbols i free spins. RTP: 96,21%. Det mest udbudte free spins-spil efter Starburst.", highlight: "Top-2 free spins-spil – 96,21% RTP" },
      { name: "Reactoonz", desc: "7x7 grid-slot med cluster pays, kaskade-gevinster og fem unikke Quantum-funktioner. RTP: 96,51%.", highlight: "Grid-innovation – 96,51% RTP" },
      { name: "Fire Joker", desc: "3-hjuls klassiker med re-spin og Wheel of Multipliers op til 10x. RTP: 96,15%. Perfekt til hurtige sessioner.", highlight: "Moderne 3-hjuls klassiker" },
      { name: "Rise of Olympus", desc: "Grid-slot med Zeus, Poseidon og Hades' unikke kræfter. Hver gud har sin bonusfunktion. RTP: 96,50%.", highlight: "Tre guddommelige kræfter" },
      { name: "Moon Princess", desc: "Anime-inspireret grid-slot med tre prinsesser med unikke evner. Clear-the-grid-bonus. RTP: 96,50%.", highlight: "Manga-æstetik – 96,50% RTP" },
      { name: "Legacy of Dead", desc: "Spirituel Book of Dead-opfølger med expanding symbols og gamble-funktion. RTP: 96,58%.", highlight: "Book-serien fortsætter" },
    ]}
    licensesContent={
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Play'n GO er licenseret af Malta Gaming Authority, UK Gambling Commission og Spillemyndigheden i Danmark. Alle spil testes af eCOGRA. En vigtig detalje er, at Play'n GO ikke tilbyder operatør-konfigurerbar RTP – det samme spil har altid den samme afkastprocent uanset casino. Dette giver spillere en gennemsigtighed som ikke alle udviklere tilbyder.
      </p>
    }
    pros={[
      "5x 'Slot Provider of the Year' – branchens mest prisbelønnede studio",
      "Fast RTP uden operatør-konfiguration – samme afkast overalt",
      "Stærk storytelling med franchises (Rich Wilde, Reactoonz, Olympus)",
      "300+ titler – alle mobiloptimerede fra dag ét",
      "Konsistent kvalitet over to årtier",
    ]}
    cons={[
      "Ingen bonus buy-funktion – kan frustrere utålmodige spillere",
      "Medium volatilitet passer ikke high-risk-segmentet",
      "Ingen live casino eller progressive jackpots",
    ]}
    faqs={[
      { question: "Hvad er Play'n GO?", answer: "Play'n GO er en svensk spiludvikler fra 2005 med 300+ spil. De har vundet 'Slot Provider of the Year' fem gange og er bag Book of Dead og Reactoonz." },
      { question: "Har Play'n GO bonus buy?", answer: "Nej, Play'n GO tilbyder ikke bonus buy-funktion i deres spil. Free spins udløses kun gennem naturligt gameplay." },
      { question: "Kan casinoer ændre RTP på Play'n GO-spil?", answer: "Nej, Play'n GO er en af de få udviklere der ikke tilbyder operatør-konfigurerbar RTP. Det samme spil har altid den samme RTP uanset casino." },
      { question: "Hvad er det bedste Play'n GO-spil til bonus?", answer: (
        <>
          Book of Dead (96,21% RTP) er ideelt til <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>. Fire Joker (96,15%) fungerer godt til at gennemspille <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link> takket være lav volatilitet.
        </>
      )},
    ]}
  />
);

export default PlayNGoGuide;

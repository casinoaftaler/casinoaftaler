import { Link } from "react-router-dom";
import { ProviderPage } from "./providers/ProviderPageTemplate";
import playNGoHero from "@/assets/heroes/play-n-go-hero.jpg";

const PlayNGoGuide = () => (
  <ProviderPage
    seoTitle="Play'n GO – Alt om Spiludvikleren 2026 | Casinoaftaler"
    seoDescription="Komplet guide til Play'n GO – skaberne af Book of Dead og Reactoonz. Læs om deres historie, populære spil, licenser og hvad der gør dem unikke."
    name="Play'n GO"
    heroSubtitle="Play'n GO er en af branchens mest kreative spiludviklere med over 300 spil i porteføljen. Fra Book of Dead til Reactoonz – de leverer innovation og kvalitet."
    heroImage={playNGoHero}
    heroImageAlt="Play'n GO – kreative spilleautomater med Book of Dead og Reactoonz"
    currentPath="/spiludviklere/play-n-go"
    introTitle="Hvad er Play'n GO?"
    introContent={
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Play'n GO er en svensk spiludvikler med rødder helt tilbage til 2005, da en gruppe tech-entusiaster i Örebro besluttede at revolutionere casinoverdenen. Siden da har de bygget en imponerende portefølje med over 300 spil og etableret sig som en af de mest respekterede navne i branchen. Deres fokus på kvalitet frem for kvantitet – kombineret med en utrolig kreativ tilgang til spildesign – har sikret dem en fast plads i toppen af spiludviklerhierarkiet.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Book of Dead er uden tvivl Play'n GOs mest ikoniske slot og en af de mest spillede spilleautomater i historien. Men deres portefølje rækker langt ud over denne ene titel. Fra det kaotiske Reactoonz-univers til den elegante Rich Wilde-serie har Play'n GO konsekvent leveret spil, der kombinerer innovativ mekanik med engagerende storytelling. Mange af disse spil bruges aktivt i <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>-kampagner og <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link> hos danske casinoer.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Med licenser fra Malta Gaming Authority, UK Gambling Commission og adskillige andre jurisdiktioner opererer Play'n GO på de mest regulerede markeder i verden. Deres engagement i <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link> og teknisk innovation gør dem til et naturligt valg for <Link to="/top-10-casino-online" className="text-primary underline hover:text-primary/80">top casinoer i Danmark</Link>.
        </p>
      </>
    }
    historyTitle="Play'n GOs Historie"
    historyIntro="Play'n GO startede sin rejse i 2005 i Örebro, Sverige, og har siden vokset til en global aktør med kontorer i flere lande og over 300 spil i porteføljen."
    timeline={[
      { year: "2005", event: "Play'n GO grundlægges i Örebro, Sverige" },
      { year: "2012", event: "Første mobiloptimerede spil lanceres" },
      { year: "2014", event: "Book of Dead udgives og bliver et globalt fænomen" },
      { year: "2017", event: "Reactoonz lanceres med unikke grid-mekanikker" },
      { year: "2019", event: "Porteføljen når 200 spil – alle mobiloptimerede" },
      { year: "2020", event: "Reactoonz 2 udgives med endnu vildere funktioner" },
      { year: "2022", event: "Play'n GO vinder 'Slot Provider of the Year' for 5. gang" },
      { year: "2024", event: "Over 300 spil i porteføljen med global distribution" },
    ]}
    gamesIntro={
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Play'n GO er mestre i at skabe spil med unikke temaer og engagerende mekanikker. Deres spil er populære i <Link to="/bonus-uden-indbetaling" className="text-primary underline hover:text-primary/80">bonus uden indbetaling</Link>-tilbud og <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">bonusser med omsætningskrav</Link>.
      </p>
    }
    games={[
      { name: "Book of Dead", desc: "Det ultimative egyptisk-tema slot med expanding symbols i free spins. Rich Wilde tager dig med på et eventyr blandt faraoners skatte.", highlight: "Verdens mest populære book-slot" },
      { name: "Reactoonz", desc: "Et unikt 7x7 grid-slot med cluster pays og kaskade-gevinster. De farverige aliens og kaotiske gameplay gør det til en fan-favorit.", highlight: "Innovativt grid-gameplay" },
      { name: "Fire Joker", desc: "En elegant 3-hjuls klassiker med moderne twist. Simpelt gameplay med re-spin-funktion og multiplikator op til 10x.", highlight: "Perfekt for klassisk-elskere" },
      { name: "Rise of Olympus", desc: "Guderne Zeus, Poseidon og Hades hjælper dig i dette grid-slot med unikke guddommelige kræfter og multiplikatorer.", highlight: "3 unikke gudde-funktioner" },
      { name: "Moon Princess", desc: "Anime-inspireret grid-slot med tre prinsesser der har unikke kræfter. Populært for sit charmerende design og høje gevinstpotentiale.", highlight: "Manga-inspireret hit" },
      { name: "Legacy of Dead", desc: "Spirituel efterfølger til Book of Dead med lignende mekanikker men nye bonusfunktioner og et opdateret ægyptisk tema.", highlight: "Book of Dead-opfølger" },
    ]}
    licensesContent={
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Play'n GO er licenseret af Malta Gaming Authority, UK Gambling Commission og talrige andre jurisdiktioner inklusiv Danmark, Sverige og Italien. Alle deres spil testes af uafhængige organisationer som eCOGRA, og de har konsekvent scoret højt på fairness og gennemsigtighed. Det gør dem til et trygt valg, uanset om du bruger en <Link to="/no-sticky-bonus" className="text-primary underline hover:text-primary/80">no-sticky bonus</Link> eller <Link to="/sticky-bonus" className="text-primary underline hover:text-primary/80">sticky bonus</Link>.
      </p>
    }
    pros={[
      "Over 300 spil af konsekvent høj kvalitet",
      "Ikoniske titler som Book of Dead og Reactoonz",
      "Innovativ grid-mekanik og cluster pays",
      "Alle spil mobiloptimerede fra dag ét",
      "Fem gange vinder af 'Slot Provider of the Year'",
    ]}
    cons={[
      "Fokus primært på spilleautomater – begrænset bordspil-udvalg",
      "Nogle nyere titler lever ikke helt op til klassikernes niveau",
      "Ingen live casino-produkter",
    ]}
    faqs={[
      { question: "Hvad er Play'n GO?", answer: "Play'n GO er en svensk spiludvikler grundlagt i 2005. De har over 300 spil i porteføljen og er kendte for Book of Dead, Reactoonz og Rich Wilde-serien." },
      { question: "Er Play'n GO-spil fair?", answer: "Ja, alle Play'n GO-spil er certificeret af Malta Gaming Authority og testes af uafhængige bureauer som eCOGRA." },
      { question: "Hvad er Book of Dead?", answer: "Book of Dead er Play'n GOs mest kendte slot – et egyptisk eventyr med expanding symbols i free spins. Det er et af verdens mest spillede online slots." },
      { question: "Kan man spille Play'n GO med bonus?", answer: "Ja, Book of Dead er et af de mest populære spil til free spins-tilbud. Play'n GO-spil bruges bredt i velkomstbonusser hos danske casinoer." },
    ]}
  />
);

export default PlayNGoGuide;

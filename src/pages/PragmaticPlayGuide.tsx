import { Link } from "react-router-dom";
import { ProviderPage } from "./providers/ProviderPageTemplate";

const PragmaticPlayGuide = () => (
  <ProviderPage
    seoTitle="Pragmatic Play – Alt om Spiludvikleren 2026 | Casinoaftaler"
    seoDescription="Komplet guide til Pragmatic Play – en af branchens mest alsidige spiludviklere. Læs om Sweet Bonanza, The Dog House, licenser og deres imponerende portefølje."
    name="Pragmatic Play"
    heroSubtitle="Pragmatic Play har taget casinobranchen med storm med en alsidig portefølje der spænder fra spilleautomater til live casino og bingo. Lær alt om denne innovative spiludvikler."
    currentPath="/spiludviklere/pragmatic-play"
    introTitle="Hvad er Pragmatic Play?"
    introContent={
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Pragmatic Play er en af de mest dynamiske og hurtigtvoksende spiludviklere i den globale casinoindustri. Grundlagt i 2015 med hovedkontor på Malta har virksomheden på imponerende kort tid opbygget en portefølje med over 250 spil, der dækker alt fra spilleautomater og bordspil til <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link> og bingo. Deres evne til at kombinere kreativitet med teknisk perfektion har gjort dem til en favorit blandt casinospillere verden over.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Det der virkelig adskiller Pragmatic Play fra konkurrenterne er deres produktionstempo. De udgiver i gennemsnit 6-8 nye spilleautomater hver eneste måned, hvilket er langt over branchegennemsnittet. Hvert spil er designet med omhyggelig opmærksomhed på detaljer – fra de farverige grafiske verdener til de innovative bonusfunktioner, der holder spillerne engageret. Mange af disse spil bruges i <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>-tilbud og <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link> hos danske casinoer.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Med licenser fra Malta Gaming Authority og UK Gambling Commission er Pragmatic Play certificeret til at operere på de mest regulerede markeder i verden, herunder Danmark. Deres fokus på <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link> og gennemsigtighed har sikret dem partnerskaber med de fleste <Link to="/top-10-casino-online" className="text-primary underline hover:text-primary/80">top casinoer online</Link>.
        </p>
      </>
    }
    historyTitle="Pragmatic Plays Historie"
    historyIntro="Pragmatic Play har gennemgået en bemærkelsesværdig udvikling siden grundlæggelsen i 2015. Fra en ydmyg start på Malta til at blive en global kraftpakke med over 250 spil og tilstedeværelse i mere end 20 regulerede markeder."
    timeline={[
      { year: "2015", event: "Pragmatic Play grundlægges på Malta" },
      { year: "2016", event: "De første spilleautomater udgives og modtages positivt" },
      { year: "2017", event: "Sweet Bonanza lanceres og bliver et globalt hit" },
      { year: "2018", event: "Live casino-produkter introduceres" },
      { year: "2019", event: "The Dog House Megaways bliver en fansensation" },
      { year: "2020", event: "Bingo-produkter tilføjes til porteføljen" },
      { year: "2021", event: "Gates of Olympus udkommer og bryder rekorder" },
      { year: "2023", event: "Over 250 spil i porteføljen med tilstedeværelse i 20+ markeder" },
    ]}
    gamesIntro={
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Pragmatic Play er kendt for deres farverige og underholdende spilleautomater med innovative bonusfunktioner. Mange af deres spil bruges i <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">bonusser uden omsætningskrav</Link> og <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonusser</Link>.
      </p>
    }
    games={[
      { name: "Sweet Bonanza", desc: "Farverigt slot med tumble-mekanik og multiplikatorer op til 100x. En af de mest populære slots i verden med cluster pays-systemet.", highlight: "Global bestseller" },
      { name: "Gates of Olympus", desc: "Zeus-temaet slot med massive multiplikatorer op til 500x. En af de mest volatile og spændende slots på markedet.", highlight: "Op til 500x multiplikator" },
      { name: "The Dog House Megaways", desc: "Underholdende Megaways-slot med op til 117.649 vinderkombinationer og sticky wilds i free spins.", highlight: "117.649 vinderkombinationer" },
      { name: "Wolf Gold", desc: "Klassisk 5x3 slot med hold & spin-funktion og tre progressive jackpots. Et af Pragmatics mest kendte spil.", highlight: "Triple progressive jackpots" },
      { name: "Big Bass Bonanza", desc: "Fiskeri-temaet slot der startede en hel serie af populære spinoffs. Simpelt og engagerende gameplay.", highlight: "Startede Big Bass-serien" },
      { name: "Sugar Rush", desc: "Farverigt grid-slot med multiplikatorer der forbliver på plads og vokser under bonusrunder.", highlight: "Stigende multiplikatorer" },
    ]}
    licensesContent={
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Pragmatic Play er licenseret af Malta Gaming Authority (MGA) og UK Gambling Commission (UKGC), som er to af de mest respekterede spillemyndigheder i verden. Deres spil testes løbende af uafhængige testbureauer, og de har opnået certificeringer i over 20 regulerede jurisdiktioner. Når du spiller Pragmatic Play-spil med en <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">bonus med omsætningskrav</Link>, kan du være sikker på, at spillet er 100% retfærdigt.
      </p>
    }
    pros={[
      "Enorm portefølje med 250+ spil i høj kvalitet",
      "Innovativt live casino med unikke game shows",
      "Hyppige nye udgivelser – 6-8 nye spil per måned",
      "Høje RTP-procenter og fair gameplay",
      "Tilgængelige hos alle større danske casinoer",
    ]}
    cons={[
      "Mange spil ligner hinanden i mekanik",
      "Høj volatilitet kan være frustrerende for lavbudget-spillere",
      "Nogle titler mangler originale temaer",
    ]}
    faqs={[
      { question: "Hvad er Pragmatic Play?", answer: "Pragmatic Play er en maltesisk spiludvikler grundlagt i 2015. De producerer spilleautomater, live casino og bingo, og er kendte for hits som Sweet Bonanza og Gates of Olympus." },
      { question: "Er Pragmatic Play-spil fair?", answer: "Ja, alle Pragmatic Play-spil bruger certificeret RNG-teknologi og er licenseret af Malta Gaming Authority og UK Gambling Commission." },
      { question: "Hvad er de mest populære Pragmatic Play-spil?", answer: "Sweet Bonanza, Gates of Olympus, The Dog House Megaways, Wolf Gold og Big Bass Bonanza er blandt de mest populære." },
      { question: "Kan man spille Pragmatic Play med bonus?", answer: "Ja, Pragmatic Play-spil er meget populære til free spins-tilbud og velkomstbonusser hos danske casinoer." },
    ]}
    responsibleGamingText="Pragmatic Play har et stærkt fokus på ansvarligt spil og støtter initiativer for spillerbeskyttelse på alle deres markeder."
  />
);

export default PragmaticPlayGuide;

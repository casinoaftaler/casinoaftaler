import { Link } from "react-router-dom";
import { ProviderPage } from "./providers/ProviderPageTemplate";
import yggdrasilHero from "@/assets/heroes/yggdrasil-hero.jpg";

const YggdrasilGuide = () => (
  <ProviderPage
    seoTitle="Yggdrasil Gaming – Alt om Spiludvikleren 2026 | Casinoaftaler"
    seoDescription="Komplet guide til Yggdrasil Gaming – grundlagt af NetEnts tidligere CEO. Læs om deres innovative spil, unikke funktioner og position i casinobranchen."
    name="Yggdrasil Gaming"
    heroSubtitle="Yggdrasil Gaming blev grundlagt af NetEnts tidligere CEO med en vision om at ændre casinobranchen. Med innovative spil og banebrydende teknologi har de gjort præcis det."
    heroImage={yggdrasilHero}
    heroImageAlt="Yggdrasil Gaming – nordisk mytologi og innovative spilmekanikker"
    currentPath="/spiludviklere/yggdrasil"
    introTitle="Hvad er Yggdrasil Gaming?"
    introContent={
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Yggdrasil Gaming er en svensk spiludvikler, der blev grundlagt i 2013 af Frederik Elmqvist – den tidligere CEO for <Link to="/spiludviklere/netent" className="text-primary underline hover:text-primary/80">NetEnt</Link>. Med sin dybe forståelse af branchen og en klar vision om at levere noget nyt og anderledes, skabte Elmqvist en virksomhed, der hurtigt markerede sig med innovative spil af exceptionel kvalitet. Navnet Yggdrasil refererer til livets træ i nordisk mytologi – et passende valg for en udvikler, der stræber efter at være fundamentet for casinounderholdning.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          I dag har Yggdrasil Gaming en portefølje på over 230 spil, der spænder fra spilleautomater til bordspil. Ejerstrukturen er fordelt mellem moderselskabet Yggdrasil Gaming Sweden AB (16%) og Cherry AB Sweden (84%). Med datterselskaber i Malta, Gibraltar, Polen, Storbritannien og Spanien er de en sand international aktør. Deres spil kendetegnes ved en utrolig visuel kvalitet og innovative funktioner, der konsekvent skubber til branchens grænser.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Yggdrasil Gaming er tilgængelige hos de fleste <Link to="/top-10-casino-online" className="text-primary underline hover:text-primary/80">top casinoer i Danmark</Link> og deres spil bruges ofte i <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link> og <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>-kampagner.
        </p>
      </>
    }
    historyTitle="Yggdrasil Gamings Historie"
    historyIntro="Fra en vision om at udfordre NetEnt til at blive en respekteret international spiludvikler – Yggdrasil Gamings rejse er en inspirerende historie om innovation og ambition."
    timeline={[
      { year: "2013", event: "Yggdrasil Gaming grundlægges af Frederik Elmqvist" },
      { year: "2014", event: "Første licens opnås i Malta, første kunde tilknyttes" },
      { year: "2015", event: "Netværkskampagner lanceres – en brancheinnovation" },
      { year: "2016", event: "Licenser i UK, Gibraltar og Rumænien" },
      { year: "2017", event: "Svensk moderselskab etableres" },
      { year: "2018", event: "Entrer det danske marked – største jackpot på €7,8 millioner udbetales" },
      { year: "2019", event: "NetEnts tidligere driftsdirektør ansættes" },
      { year: "2021", event: "Samarbejde med IGT om ekspansion i Nordamerika" },
    ]}
    gamesIntro={
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Yggdrasil Gaming er kendt for deres visuelt imponerende spilleautomater med innovative funktioner. Deres spil har høj kvalitet og bruges i mange <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonus</Link>-tilbud.
      </p>
    }
    games={[
      { name: "Champion of the Underworld", desc: "Yggdrasils mest populære titel med et mørkt, mytologisk tema og innovative bonusfunktioner.", highlight: "Mest populære Yggdrasil-slot" },
      { name: "Vikings Go Berzerk", desc: "Vikinge-temaet slot med berserk-tilstand, free spins og treasure chest-bonus. Fantastisk grafik og lyddesign.", highlight: "Ikonisk vikingetema" },
      { name: "Valley of the Gods", desc: "Egyptisk-inspireret slot med stigende multiplikatorer og et unikt re-spin-system.", highlight: "Innovativt re-spin-system" },
      { name: "Jackpot Raiders", desc: "Eventyr-temaet slot med progressive jackpots og engagerende bonusrunder.", highlight: "Progressive jackpots" },
      { name: "Golden Fish Tank", desc: "Undervandstema med unikke bonusfunktioner og charmerende grafik.", highlight: "Charmerende design" },
      { name: "Hades – Gigablox", desc: "Introducerede Gigablox-mekanikken med kæmpe symboler op til 6x6 i størrelse.", highlight: "Gigablox-innovation" },
    ]}
    licensesContent={
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Yggdrasil Gaming har licenser fra Malta Gaming Authority, UK Gambling Commission og flere andre internationale regulatorer. De har også opnået en ISO 27001 certificering, der bekræfter deres høje standarder for informationssikkerhed. Alle spil anvender certificeret RNG-teknologi og testes af uafhængige bureauer for at sikre <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>.
      </p>
    }
    pros={[
      "Exceptionel visuel kvalitet og grafisk design",
      "Innovative mekanikker som Gigablox og Splitz",
      "Grundlagt af NetEnts tidligere CEO – dyb brancheekspertise",
      "ISO 27001 certificeret informationssikkerhed",
      "Bredt tilgængelige hos danske casinoer",
    ]}
    cons={[
      "Nogle nyere spil har modtaget blandet kritik",
      "Ingen live casino-produkter",
      "Volatiliteten kan variere meget mellem titler",
    ]}
    faqs={[
      { question: "Hvad er Yggdrasil Gaming?", answer: "Yggdrasil Gaming er en svensk spiludvikler grundlagt i 2013 af NetEnts tidligere CEO Frederik Elmqvist. De har over 230 spil i porteføljen." },
      { question: "Hvem ejer Yggdrasil Gaming?", answer: "Yggdrasil Gaming ejes primært af Cherry AB Sweden (84%) med Yggdrasil Gaming Sweden AB som moderselskab (16%)." },
      { question: "Er Yggdrasil-spil tilgængelige i Danmark?", answer: "Ja, Yggdrasil Gaming har været tilgængelige på det danske marked siden 2018 og findes hos de fleste danske casinoer." },
      { question: "Hvad er Gigablox?", answer: "Gigablox er Yggdrasils unikke mekanik, hvor kæmpe symboler op til 6x6 i størrelse kan lande på hjulene og skabe massive gevinstkombinationer." },
    ]}
  />
);

export default YggdrasilGuide;

import { Link } from "react-router-dom";
import { ProviderPage } from "./providers/ProviderPageTemplate";

const RedTigerGuide = () => (
  <ProviderPage
    seoTitle="Red Tiger Gaming – Alt om Spiludvikleren 2026 | Casinoaftaler"
    seoDescription="Komplet guide til Red Tiger Gaming – opkøbt af NetEnt for 1,8 milliarder. Læs om Piggy Riches Megaways, deres innovative funktioner og stærke position i branchen."
    name="Red Tiger Gaming"
    heroSubtitle="Red Tiger Gaming har fra starten fokuseret på at levere banebrydende spilleautomater, der fungerer lige så godt på mobil som desktop. Opkøbt af NetEnt for 1,8 milliarder kroner."
    currentPath="/spiludviklere/red-tiger"
    introTitle="Hvad er Red Tiger Gaming?"
    introContent={
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Red Tiger Gaming er en spiludvikler, der blev grundlagt i 2014 af en gruppe erfarne branchefolk med baggrund i spiludvikling i både Europa og Asien. Med base i St. Julians, Malta, har de fra starten haft et skarpt fokus på at udvikle spilleautomater i topkvalitet med innovative funktioner og problemfri mobiloptimering. Deres portefølje tæller i dag mere end 220 spilleautomater samt en håndfuld bordspil.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Red Tiger Gamings succes blev for alvor bekræftet i 2019, da <Link to="/spiludviklere/netent" className="text-primary underline hover:text-primary/80">NetEnt</Link> opkøbte virksomheden for svimlende £200 millioner (ca. 1,8 milliarder kroner). Med Evolution Gamings efterfølgende opkøb af NetEnt i 2020 er Red Tiger nu en del af verdens største casinospil-koncern. Denne position giver dem adgang til endnu større distribution og partnerskaber med verdens førende <Link to="/top-10-casino-online" className="text-primary underline hover:text-primary/80">online casinoer</Link>.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Red Tiger er særligt kendte for deres Daily Jackpots-funktion, der garanterer en daglig jackpot-udbetaling, samt deres Tournaments-funktion, der tilføjer et socialt og konkurrencepræget element til spillene. Deres spil bruges ofte i <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>-tilbud og <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link> hos danske casinoer.
        </p>
      </>
    }
    historyTitle="Red Tiger Gamings Historie"
    historyIntro="Red Tiger Gaming har gennemgået en imponerende udvikling fra en uafhængig startup til en central del af verdens største casinospil-koncern."
    timeline={[
      { year: "2014", event: "Red Tiger Gaming grundlægges i Malta" },
      { year: "2016", event: "Samarbejde med Betsson Group indledes" },
      { year: "2017", event: "Partnerskaber med PokerStars og Kindred Group" },
      { year: "2018", event: "ISO 27001 certificering opnås" },
      { year: "2019", event: "Samarbejde med Danske Spil – Tournaments-funktionen introduceres" },
      { year: "2019", event: "Opkøbt af NetEnt for £200 millioner (ca. 1,8 milliarder kr.)" },
      { year: "2020", event: "Gonzo's Quest Megaways lanceres i samarbejde med NetEnt" },
      { year: "2021", event: "Verdens første NFT-baserede spilleautomat lanceres" },
    ]}
    gamesIntro={
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Red Tiger Gaming er kendt for spilleautomater med innovative funktioner som Daily Jackpots og Megaways-mekanikken. Deres spil er populære i <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonus</Link>-tilbud og <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">bonusser uden omsætningskrav</Link>.
      </p>
    }
    games={[
      { name: "Piggy Riches Megaways", desc: "Megaways-versionen af den klassiske Piggy Riches med op til 117.649 vinderkombinationer og cascading wins.", highlight: "117.649 vinderkombinationer" },
      { name: "Gonzo's Quest Megaways", desc: "Et samarbejde med NetEnt der tilføjede Megaways-mekanikken til den ikoniske Gonzo's Quest. Op til 117.649 vinderkombinationer.", highlight: "NetEnt x Red Tiger samarbejde" },
      { name: "Dragon's Fire Megaways", desc: "Drage-temaet Megaways-slot med stigende multiplikatorer og free spins.", highlight: "Stigende multiplikatorer" },
      { name: "Mystery Reels Megaways", desc: "Klassisk frugtmaskine-tema med Megaways-mekanik og mystery symboler.", highlight: "Mystery symbol-funktion" },
      { name: "Primate King", desc: "Jungle-temaet slot med Mega Tiles og imponerende visuelt design.", highlight: "Mega Tiles-funktion" },
      { name: "Cash Volt", desc: "Elektricitetstema med innovative bonusfunktioner og Daily Jackpots.", highlight: "Daily Jackpots" },
    ]}
    licensesContent={
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Red Tiger Gaming har licenser fra Malta Gaming Authority, UK Gambling Commission, HM Government of Gibraltar og Alderney Gambling Control Commission. De har også opnået ISO 27001 certificering for informationssikkerhed. Under Evolution Gaming-paraplyen opererer de i fuld compliance med strenge regulatoriske krav og <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>-gennemsigtighed.
      </p>
    }
    pros={[
      "Innovative Daily Jackpots der garanterer daglige udbetalinger",
      "Stærke Megaways-titler i samarbejde med NetEnt",
      "Unik Tournaments-funktion for social konkurrence",
      "ISO 27001 certificeret sikkerhed",
      "Del af Evolution-koncernen – global distribution",
    ]}
    cons={[
      "Primært spilleautomater – begrænset bordspil-udvalg",
      "Nogle spil føles som re-skins af eksisterende titler",
      "Ingen live casino-produkter",
    ]}
    faqs={[
      { question: "Hvad er Red Tiger Gaming?", answer: "Red Tiger Gaming er en spiludvikler grundlagt i 2014, nu ejet af Evolution Gaming (via NetEnt). De har over 220 spil og er kendte for Daily Jackpots og Megaways-slots." },
      { question: "Hvem ejer Red Tiger Gaming?", answer: "Red Tiger Gaming blev opkøbt af NetEnt i 2019 for £200 millioner. Med Evolutions opkøb af NetEnt i 2020 er Red Tiger nu en del af Evolution-koncernen." },
      { question: "Hvad er Daily Jackpots?", answer: "Daily Jackpots er Red Tigers unikke funktion, der garanterer at mindst én jackpot udbetales hver dag. Det tilføjer ekstra spænding til spilene." },
      { question: "Er Red Tiger-spil tilgængelige i Danmark?", answer: "Ja, Red Tiger Gaming har været tilgængelige i Danmark siden 2019 og findes hos de fleste danske casinoer med dansk licens." },
    ]}
  />
);

export default RedTigerGuide;

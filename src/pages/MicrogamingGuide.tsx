import { Link } from "react-router-dom";
import { ProviderPage } from "./providers/ProviderPageTemplate";
import microgamingHero from "@/assets/heroes/microgaming-hero.jpg";

const MicrogamingGuide = () => (
  <ProviderPage
    seoTitle="Microgaming – Alt om Spiludvikleren 2026 | Casinoaftaler"
    seoDescription="Komplet guide til Microgaming – branchens pioner siden 1994. Læs om Mega Moolah, deres 900+ spil og hvordan de har formet online casinoindustrien."
    name="Microgaming"
    heroSubtitle="Microgaming er en pioner i casinobranchen og var blandt de første til at lancere et online casino i 1994. Med over 900 spil og verdensrekorder i jackpots er de en legende."
    heroImage={microgamingHero}
    heroImageAlt="Microgaming – pioner i online casino siden 1994"
    currentPath="/spiludviklere/microgaming"
    introTitle="Hvad er Microgaming?"
    introContent={
      <>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Microgaming er en af de mest ikoniske og indflydelsesrige spiludviklere i hele casinobranchens historie. Grundlagt i 1994 på Isle of Man var de blandt de allerførste til at lancere et online casino – et skridt der fundamentalt ændrede den måde, verden spiller casino på. Med over 900 spilleautomater i porteføljen og adskillige verdensrekorder i progressive jackpots har Microgaming cementeret sin plads som en sand pioner og innovator.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Microgamings mest berømte bedrift er uden tvivl Mega Moolah – den progressive jackpot-slot der har skabt flere millionærer end noget andet online casinospil i historien. I 2015 vandt en britisk soldat £13,2 millioner på et enkelt spin, og den samlede udbetaling fra Mega Moolah-netværket har overgået €1 milliard. Denne type massive jackpots gør Microgaming-spil særligt attraktive, når de kombineres med en <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonus</Link> eller <Link to="/indskudsbonus" className="text-primary underline hover:text-primary/80">indskudsbonus</Link>.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Virksomheden har gennemgået en transformation i de senere år, hvor de har skiftet fokus fra at udvikle egne spil til primært at fungere som aggregator gennem deres Quickfire-platform. De distribuerer nu spil fra et bredt netværk af uafhængige studiepartnere, samtidig med at de fortsat vedligeholder deres klassiske titler. Alle Microgaming-spil er tilgængelige hos <Link to="/top-10-casino-online" className="text-primary underline hover:text-primary/80">top casinoer i Danmark</Link>.
        </p>
      </>
    }
    historyTitle="Microgamings Historie"
    historyIntro="Microgamings historie er uadskillelig fra online casinoindustriens historie. De var der fra starten og har været med til at forme branchen i over 30 år."
    timeline={[
      { year: "1994", event: "Microgaming grundlægges – lancerer et af verdens første online casinoer" },
      { year: "1998", event: "Cash Splash bliver den første online progressive jackpot" },
      { year: "2004", event: "Viper-softwareplatformen lanceres" },
      { year: "2006", event: "Mega Moolah udgives – den legendariske progressive jackpot" },
      { year: "2009", event: "Quickfire-platformen introduceres som aggregator" },
      { year: "2015", event: "Verdensrekord: £13,2 millioner vundet på et enkelt Mega Moolah-spin" },
      { year: "2019", event: "Mega Moolah udbetaler €18,9 millioner – ny verdensrekord" },
      { year: "2023", event: "Over €1 milliard udbetalt i Mega Moolah-jackpots totalt" },
    ]}
    gamesIntro={
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Microgaming er kendt for deres massive jackpot-netværk og klassiske spilleautomater. Deres spil fungerer godt med <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>, selvom jackpot-slots typisk har lavere bidrag.
      </p>
    }
    games={[
      { name: "Mega Moolah", desc: "Den legendariske progressive jackpot-slot der har udbetalt over €1 milliard i samlede jackpots. Fire progressive niveauer med en mega-jackpot der starter ved €1 million.", highlight: "Over €1 milliard udbetalt" },
      { name: "Immortal Romance", desc: "Vampyr-temaet slot med dramatisk storyline, fire unikke free spins-funktioner og et dybt engagerende gameplay.", highlight: "Klassisk storytelling" },
      { name: "Thunderstruck II", desc: "Nordisk mytologi-slot med fire bonusniveauer baseret på nordiske guder. Et af Microgamings mest populære spil.", highlight: "Nordisk mytologi-tema" },
      { name: "Break Da Bank Again", desc: "Bankrøveri-temaet slot med free spins og multiplikatorer. En klassiker der stadig er populær.", highlight: "Tidløs klassiker" },
      { name: "Avalon II", desc: "King Arthur-temaet slot med imponerende grafik og otte forskellige bonusfunktioner. Et ambitiøst mesterværk.", highlight: "8 bonusfunktioner" },
      { name: "Mega Moolah Goddess", desc: "Egyptisk-temaet version af Mega Moolah-netværket med forbedret grafik og de samme massive jackpots.", highlight: "Mega Moolah-netværket" },
    ]}
    licensesContent={
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Microgaming er licenseret af Isle of Man Gambling Supervision Commission, Malta Gaming Authority og UK Gambling Commission. Som en af branchens ældste aktører har de været med til at definere standarderne for fairness og <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link> i online casinoindustrien. Alle spil testes af eCOGRA, som Microgaming var med til at grundlægge i 2003.
      </p>
    }
    pros={[
      "Branchens pioner med over 30 års erfaring",
      "Mega Moolah – verdens mest kendte progressive jackpot",
      "Over 900 spil i porteføljen",
      "Stærk Quickfire-aggregeringsplatform",
      "Medstifter af eCOGRA – dedikeret til fairness",
    ]}
    cons={[
      "Mange ældre spil med dateret grafik",
      "Skiftet fokus til aggregering – færre egne nye titler",
      "Jackpot-slots har typisk lavere basis-RTP (88-92%)",
    ]}
    faqs={[
      { question: "Hvad er Microgaming?", answer: "Microgaming er en af verdens ældste spiludviklere, grundlagt i 1994 på Isle of Man. De lancerede et af de første online casinoer og har over 900 spil." },
      { question: "Hvad er Mega Moolah?", answer: "Mega Moolah er Microgamings legendariske progressive jackpot-slot der har udbetalt over €1 milliard i samlede jackpots med enkeltgevinster op til €18,9 millioner." },
      { question: "Er Microgaming-spil fair?", answer: "Ja, Microgaming var medstifter af eCOGRA i 2003 og alle deres spil testes regelmæssigt for fairness med certificeret RNG." },
      { question: "Hvorfor har Mega Moolah lav RTP?", answer: "Mega Moolah har en basis-RTP på ca. 88%, fordi en del af hver indsats går til den progressive jackpot-pulje. Inklusiv jackpot-bidraget er den reelle RTP højere." },
    ]}
  />
);

export default MicrogamingGuide;

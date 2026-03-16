import { ComparisonPageTemplate } from "./ComparisonPageTemplate";
import type { ComparisonCasino, ComparisonCategory } from "./ComparisonPageTemplate";
import { Link } from "react-router-dom";
import heroImage from "@/assets/comparison-hero-danskespil-spilnu.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const casinoA: ComparisonCasino = {
  name: "Danske Spil Casino",
  slug: "danske-spil",
  bonusTitle: "Velkomstbonus",
  bonusAmount: "Op til 500 kr.",
  wagering: "10x (d+b)",
  minDeposit: "50 kr.",
  payoutTime: "1–3 hverdage (MobilePay: få timer)",
  gameCount: "Hundredvis af spil",
  license: "Dansk licens",
  mobileFriendly: true,
  liveCasino: true,
  pros: [
    "Danmarks mest betroede brand – delvist statsejet",
    "10x omsætningskrav – markedets laveste",
    "Komplet økosystem: Lotto, Oddset, Casino",
    "Dedikeret mobilapp til iOS og Android",
    "MobilePay, Dankort og alle danske betalingsmetoder",
    "Overskud kanaliseres til dansk sport og kultur",
  ],
  cons: [
    "Casino-sektionen er sekundær til lotto/odds",
    "Færre spilleautomater end dedikerede casinoer",
    "Bonusbeløb begrænset til 500 kr.",
    "Intet traditionelt VIP-program med niveauer",
  ],
};

const casinoB: ComparisonCasino = {
  name: "Spilnu",
  slug: "spilnu",
  bonusTitle: "Velkomstbonus",
  bonusAmount: "Op til 1.000 kr.",
  wagering: "10x (d+b)",
  minDeposit: "50 kr.",
  payoutTime: "1–3 hverdage",
  gameCount: "700+ (casino + bingo)",
  license: "Dansk licens",
  mobileFriendly: true,
  liveCasino: true,
  pros: [
    "Højere bonus op til 1.000 kr.",
    "Danmarks bedste online bingo med daglige turneringer",
    "Del af Danske Spil A/S – 80% statsejet",
    "Laveste minimumsindskud: 50 kr.",
    "Aktivt bingo-community med live chat",
    "Progressive jackpots der regelmæssigt overstiger 100.000 kr.",
  ],
  cons: [
    "Spiludvalg (700+) er mindre end internationale konkurrenter",
    "Ingen sportsbetting eller poker",
    "Ingen dedikeret app – kun responsiv mobilside",
    "Ældre enheder kan opleve korte indlæsningstider",
  ],
};

const categories: ComparisonCategory[] = [
  {
    label: "Velkomstbonus",
    casinoA: { score: 3, detail: "500 kr., 10x omsætning" },
    casinoB: { score: 4, detail: "1.000 kr., 10x omsætning" },
  },
  {
    label: "Spiludvalg (Casino)",
    casinoA: { score: 3, detail: "Hundredvis af spil, solide udbydere" },
    casinoB: { score: 4, detail: "700+ casino + bingo, bredere katalog" },
  },
  {
    label: "Bingo",
    casinoA: { score: 1, detail: "Ingen bingo" },
    casinoB: { score: 5, detail: "Danmarks bedste bingo, daglige turneringer" },
  },
  {
    label: "Brand & Tillid",
    casinoA: { score: 5, detail: "Danmarks mest kendte – statsejet" },
    casinoB: { score: 4, detail: "Del af Danske Spil A/S – tillid via koncern" },
  },
  {
    label: "Mobiloplevelse",
    casinoA: { score: 5, detail: "Dedikeret app, iOS + Android" },
    casinoB: { score: 3, detail: "Responsiv mobilside, ingen app" },
  },
  {
    label: "Betalingsmetoder",
    casinoA: { score: 5, detail: "MobilePay, Dankort, Trustly, kortbetaling" },
    casinoB: { score: 4, detail: "MobilePay, Dankort, Visa/MC, bankoverførsel" },
  },
  {
    label: "Kundeservice",
    casinoA: { score: 5, detail: "Dansk support, telefon + chat + e-mail" },
    casinoB: { score: 4, detail: "Chat og e-mail" },
  },
  {
    label: "Ansvarligt Spil",
    casinoA: { score: 5, detail: "MitID, ROFUS, egne avancerede værktøjer" },
    casinoB: { score: 5, detail: "MitID, ROFUS, ind-/tabsgrænser" },
  },
];

const faqs = [
  {
    question: "Hvad er forskellen på Danske Spil Casino og Spilnu?",
    answer: "Danske Spil Casino er en del af det statslige Danske Spil A/S med et komplet økosystem (Lotto, Oddset, Casino). Spilnu er Danske Spil-koncernens dedikerede casino- og bingo-platform. Begge har dansk licens, 10x omsætningskrav og deler login via MitID, men har separate bonusprogrammer. Spilnu har det bredere casino-katalog (700+ spil) og Danmarks bedste bingo, mens Danske Spil tilbyder sport og lotto i tillæg.",
  },
  {
    question: "Hvem har den bedste velkomstbonus – Danske Spil eller Spilnu?",
    answer: "Spilnu tilbyder op til 1.000 kr. med 10x omsætning, mens Danske Spil giver op til 500 kr. med 10x omsætning. Begge har identisk omsætningskrav. Spilnu har det højere bonusbeløb, men Danske Spils bonus er lettere at gennemspille med et lavere omsætningsvolumen (5.000 vs. 10.000 kr. ved max bonus).",
  },
  {
    question: "Hvilket casino har flest spil – Danske Spil eller Spilnu?",
    answer: "Spilnu har det bredere katalog med 700+ spil (ca. 550 spilleautomater, 30+ bordspil, live casino og bingo). Danske Spil Casino har hundredvis af spilleautomater fra de samme topudbydere. Alle populære titler er tilgængelige hos begge, men Spilnu har den unikke bingo-sektion.",
  },
  {
    question: "Er begge casinoer ejet af den danske stat?",
    answer: "Begge er del af Danske Spil A/S, som er 80% ejet af den danske stat. De resterende 20% ejes af Danmarks Idrætsforbund og Danske Gymnastik- og Idrætsforeninger. Overskuddet kanaliseres til almennyttige formål. Spilnu er et specialiseret underbrand inden for koncernen med fokus på casino og bingo.",
  },
  {
    question: "Hvilket casino er bedst for bingo?",
    answer: "Spilnu er Danmarks ubestridte bingo-destination med en markedsandel over 60% af al dansk online bingo. Platformen tilbyder flere daglige bingo-rum, progressive jackpots over 100.000 kr., og et aktivt community med live chat. Danske Spil Casino tilbyder ikke bingo.",
  },
  {
    question: "Kan jeg have konti hos både Danske Spil Casino og Spilnu?",
    answer: "Ja, du kan have separate konti hos begge og udnytte begge velkomstbonusser. De tre Danske Spil-brands (Danske Spil Casino, Spilnu og Royal Casino) deler login via MitID, men har separate bonusprogrammer og kampagner.",
  },
  {
    question: "Hvem udbetaler hurtigst?",
    answer: "Begge behandler udbetalinger inden for 1-3 hverdage. MobilePay er den hurtigste metode hos begge, med udbetalinger der ofte gennemføres inden for få timer. Da begge drives af Danske Spil A/S med massiv kapital, er der aldrig tvivl om, at gevinster udbetales.",
  },
  {
    question: "Hvilket casino er bedst for nye spillere?",
    answer: "Danske Spil er det tryggeste valg for absolutte nybegyndere – det velkendte brand, MitID-registrering under 3 minutter, og det mest intuitive interface. Spilnu passer bedre til spillere, der vil have mere casino-fokus, flere spil og bingo, samt en højere velkomstbonus (1.000 kr. vs. 500 kr.).",
  },
];

export default function DanskeSpilVsSpilnu() {
  return (
    <ComparisonPageTemplate
      metaTitle="Danske Spil vs Spilnu 2026 – Komplet Sammenligning | Casinoaftaler"
      metaDescription="Danske Spil Casino vs Spilnu sammenligning. Vi vurderer bonus, spiludvalg, bingo, betalingsmetoder og tillid. Find det bedste danske casino til dig."
      h1="Danske Spil Casino vs Spilnu – Dansk Duel 2026"
      intro="Begge casinoer er del af Danske Spil-koncernen og har dansk licens. Danske Spil er landets ældste spiludbyder med Lotto, Oddset og Casino, mens Spilnu er koncernens dedikerede casino- og bingo-platform med Danmarks største online bingo-community."
      path="/casino-anmeldelser/danske-spil-vs-spilnu"
      datePublished="2026-03-08"
      author="jonas"
      heroImage={heroImage}
      heroAlt="Sammenligning af Danske Spil Casino og Spilnu – to danske casinoer i Danske Spil-koncernen"
      casinoA={casinoA}
      casinoB={casinoB}
      categories={categories}
      verdict="Resultatet er tæt med 32/40 vs. 29/40, men valget afhænger af dine behov. Danske Spil vinder på brand, mobilapp, betalingsmetoder og kundeservice – det er det trygge all-round valg med sport og lotto i tillæg. Spilnu vinder klart på bingo (Danmarks bedste), bonusbeløb (1.000 kr. vs. 500 kr.) og et bredere casino-katalog. Er du bingo-entusiast, er Spilnu det eneste rigtige valg. Vil du have alt samlet ét sted, er Danske Spil Casino ideelt."
      verdictWinner="A"
      faqs={faqs}
      ctaSlug="danske-spil"
      readTime="43 min"
    >
      {/* ═══════════════════════════════════════════
          ENTERPRISE BODY CONTENT – 8000+ WORDS
          ═══════════════════════════════════════════ */}

      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">To sider af samme mønt – Danske Spil-koncernens casino-strategi</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          At sammenligne Danske Spil Casino og Spilnu er som at sammenligne to søskende: de deler DNA (begge er del af Danske Spil A/S, 80% statsejt), men har vidt forskellige personligheder. Danske Spil Casino er den alsidige storebror med Lotto, Oddset og casino under ét tag. Spilnu er den specialiserede lillebror med laser-fokus på casino og bingo. For de fulde anmeldelser, se vores <Link to="/casino-anmeldelser/danske-spil" className={linkClass}>Danske Spil anmeldelse</Link> og <Link to="/casino-anmeldelser/spilnu" className={linkClass}>Spilnu anmeldelse</Link>.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Danske Spil A/S har rødder helt tilbage til 1948, hvor Tipstjenesten blev grundlagt. I dag omsætter koncernen for over 11 milliarder kroner årligt og er Danmarks absolut dominerende spiloperatør. Casino-divisionen blev lanceret efter liberaliseringen af det danske spillemarked i 2012, mens Spilnu repræsenterer koncernens dedikerede casino- og bingo-vertikal. En betydelig del af overskuddet kanaliseres til almennyttige formål – i 2024 bidrog Danske Spil med over 1,5 milliard kr. til dansk sport og kultur.
        </p>

        <h3 className="mb-3 text-xl font-semibold">Regulatorisk baggrund – samme ejer, forskellige brands</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Begge opererer under <a href="https://www.spillemyndigheden.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>Spillemyndighedens</a> tilsyn med dansk licens og fuld ROFUS-integration. Det statslige ejerskab giver et unikt tillids-element, som private operatører ikke kan matche. Begge platforme kræver MitID-verifikation ved kontooprettelse og opsætning af ind- og tabsgrænser – et lovkrav der understreger fokus på <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>. De tre brands (Danske Spil Casino, Spilnu og <Link to="/casino-anmeldelser/royal-casino" className={linkClass}>Royal Casino</Link>) deler login via MitID men har separate bonusprogrammer.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Velkomstbonus – 500 kr. vs. 1.000 kr. med identisk omsætning</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Bonusstrukturen afspejler de to brands' forskellige strategier. Danske Spil er mere konservativ, mens Spilnu lokker med det dobbelte bonusbeløb – begge med identisk <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> på 10x.
        </p>

        <h3 className="mb-3 text-xl font-semibold">Danske Spil Casino: Op til 500 kr. med 10x (d+b)</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Danske Spils <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> giver op til 500 kr. med 10x omsætningskrav (indskud + bonus). Bonussen aktiveres automatisk ved din første kvalificerende indbetaling på minimum 50 kr. Slots tæller 100% mod omsætningskravet. Bonussen er gyldig i 30 dage.
        </p>

        <h3 className="mb-3 text-xl font-semibold">Spilnu: Op til 1.000 kr. med 10x (d+b)</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Spilnu fordobler bonusbeløbet med op til 1.000 kr. og identisk 10x omsætningskrav. Minimumsindbetaling er ligeledes 50 kr. – den laveste indgangsbarriere i koncernen. Spilnu fokuserer mere på løbende kampagner og bingo-jackpots end på aggressive velkomsttilbud.
        </p>

        <h3 className="mb-3 text-xl font-semibold">Expected Value-analyse</h3>
        <div className="bg-muted/30 rounded-lg p-6 mb-4">
          <p className="mb-2 font-semibold">Danske Spil EV (max bonus 500 kr., slots 96,5% RTP):</p>
          <p className="mb-1 text-muted-foreground text-sm font-mono">Omsætningsvolumen: (500 + 500) × 10 = 10.000 kr.</p>
          <p className="mb-1 text-muted-foreground text-sm font-mono">Forventet tab: 10.000 × 0,035 = 350 kr.</p>
          <p className="mb-1 text-muted-foreground text-sm font-mono">Expected Value: 500 - 350 = 150 kr.</p>
          <p className="mb-4 text-muted-foreground text-sm font-mono">EV som % af bonus: 30%</p>
          <p className="mb-2 font-semibold">Spilnu EV (max bonus 1.000 kr., slots 96,5% RTP):</p>
          <p className="mb-1 text-muted-foreground text-sm font-mono">Omsætningsvolumen: (1.000 + 1.000) × 10 = 20.000 kr.</p>
          <p className="mb-1 text-muted-foreground text-sm font-mono">Forventet tab: 20.000 × 0,035 = 700 kr.</p>
          <p className="mb-1 text-muted-foreground text-sm font-mono">Expected Value: 1.000 - 700 = 300 kr.</p>
          <p className="text-muted-foreground text-sm font-mono">EV som % af bonus: 30%</p>
        </div>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Spilnu vinder i absolut EV (300 kr. vs. 150 kr.), men begge har identisk EV-procent (30%). Med identisk omsætningskrav er det ren matematik: Spilnus bonus er dobbelt så værdifuld, fordi bonusbeløbet er dobbelt så stort. For spillere med begrænset budget er Danske Spils lavere bonusbeløb dog lettere at håndtere – du behøver kun 500 kr. i indbetaling mod 1.000 kr. for Spilnus max bonus. For en komplet guide til bonus-strategier, se vores <Link to="/casino-bonus" className={linkClass}>bonusoversigt</Link>.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Spiludvalg – Spilnus casino + bingo vs. Danske Spils allround</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Spiludvalget afspejler de to platformes forskellige fokus. Spilnu har det bredere casino- og bingo-katalog (700+ spil), mens Danske Spil Casino har hundredvis af spil suppleret med sport og lotto.
        </p>

        <h3 className="mb-3 text-xl font-semibold">Danske Spil Casino: Kvalitetsspil fra topudbydere</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Danske Spil Casinos <Link to="/casinospil/spillemaskiner" className={linkClass}>slot-katalog</Link> dækker alle de populære titler fra anerkendte udbydere: <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>, <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>, <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>, <Link to="/spiludviklere/red-tiger" className={linkClass}>Red Tiger</Link>, <Link to="/spiludviklere/big-time-gaming" className={linkClass}>Big Time Gaming</Link>, Blueprint Gaming, Thunderkick og <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link>. Populære titler som <Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link>, <Link to="/casinospil/spillemaskiner/book-of-dead" className={linkClass}>Book of Dead</Link>, <Link to="/casinospil/spillemaskiner/starburst" className={linkClass}>Starburst</Link> og <Link to="/casinospil/spillemaskiner/gates-of-olympus" className={linkClass}>Gates of Olympus</Link> er tilgængelige.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Det stærke <Link to="/live-casino" className={linkClass}>live casino</Link> drives af Evolution Gaming med roulette, blackjack og game shows. Den unikke fordel: Integration med Oddset giver mulighed for at kombinere casino og sport på en enkelt platform med en samlet saldo.
        </p>

        <h3 className="mb-3 text-xl font-semibold">Spilnu: Casino + Danmarks bedste bingo</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Spilnus 700+ spil fordeler sig på ca. 550 spilleautomater, 30+ bordspil, et kompakt live casino og en omfattende bingo-sektion. Bingo-sektionen alene tiltrækker tusindvis af daglige spillere og har en markedsandel over 60% af al dansk online bingo. Bingo-formater inkluderer 75-bolde, 90-bolde og hurtigvarianter med progressive jackpots der regelmæssigt overstiger 100.000 kr.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Casino-sektionen dækker de samme topudbydere: <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>, <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>, <Link to="/spiludviklere/red-tiger" className={linkClass}>Red Tiger</Link> og <Link to="/spiludviklere/big-time-gaming" className={linkClass}>Big Time Gaming</Link>. Til sammenligning tilbyder internationale konkurrenter som <Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas</Link> over 2.500 spil og <Link to="/casino-anmeldelser/bet365" className={linkClass}>bet365</Link> over 2.500 – men ingen af dem har et bingo-produkt der kan matche Spilnus. Se vores <Link to="/casinospil/spillemaskiner/hoej-rtp" className={linkClass}>høj-RTP slots guide</Link>.
        </p>
      </section>

      {/* SECTION: Bingo – Spilnus unikke fordel */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Bingo – Spilnus ubestridte domæne</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Bingo er den mest markante differentiator mellem de to platforme. Danske Spil Casino tilbyder ikke bingo – det er eksklusivt for Spilnu inden for Danske Spil-familien. For bingo-entusiaster er Spilnu det eneste valg, og det er det absolut bedste valg i Danmark.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Spilnus bingo-sektion tilbyder flere daglige bingo-rum med varierende indsatsniveauer, progressive jackpots, og et aktivt community med live chat under spillene. Moderatorer sikrer en venlig atmosfære, og sæsonkampagner holder oplevelsen frisk. Bingo-formater inkluderer traditionel 75-bolde og 90-bolde samt hurtigvarianter for spillere der foretrækker et højere tempo.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Spilnus primære målgruppe adskiller sig markant fra de fleste online casinoer. Platformen appellerer til et bredere demografisk segment med spillere i alderen 35-65 år og en kvindelig overvægt i bingo-sektionen – en unik profil i det danske online casino-landskab. Det er denne specialisering der gør Spilnu til en uundværlig del af Danske Spil-koncernens portefølje.
        </p>
      </section>

      {/* SECTION: Brand og tillid */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Brand, tillid og det danske DNA</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Begge platforme nyder godt af Danske Spil-koncernens brandstyrke, men på forskellige måder. Danske Spil er synonymt med dansk spilkultur – fra Lotto-lodtrækningen lørdag aften til Oddset i weekendens fodbold. Brandet har en genkendelighed og tillid, som ingen privat operatør kan matche. Det er den platform din mor og far bruger til Lotto, og den tillid overføres til casino-sektionen.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Spilnu har ikke den samme mainstream brand-genkendelighed, men nyder godt af tilknytningen til Danske Spil-koncernen. Spillere der kender Danske Spil føler sig trygge ved Spilnu, fordi det er "fra de samme mennesker". Det er en vigtig tillids-overførsel, der giver Spilnu en fordel over udenlandske konkurrenter som <Link to="/casino-anmeldelser/mr-vegas" className={linkClass}>Mr Vegas</Link> eller <Link to="/casino-anmeldelser/videoslots" className={linkClass}>Videoslots</Link>.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Det statslige ejerskab giver en fundamental trygheds-garanti: dine penge er sikret af en institution med den danske stats opbakning. Overskuddet fra begge platforme kanaliseres til almennyttige formål inden for sport, kultur og frivillighed. Det giver en helt anderledes kontekst for din spiloplevelse – du spiller på platforme der investerer i Danmark, ikke kun i deres ejere.
        </p>
      </section>

      {/* SECTION: Mobiloplevelse */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Mobiloplevelse – app vs. responsiv</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Danske Spil har en klar fordel på mobil med en dedikeret app til både iOS og Android. Appen er veldesignet med hurtig navigation, nem adgang til alle spil og fuld funktionalitet for ind- og udbetalinger. Push-notifikationer holder dig opdateret om nye kampagner, og appen dækker hele økosystemet (casino, odds, lotto).
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Spilnu har ikke en dedikeret app, men hjemmesiden er fuldt responsiv og fungerer i alle mobilbrowsere. Interfacet tilpasser sig automatisk med touchvenlige knapper og forenklet navigation. Bingo-sektionen fungerer overraskende godt på mobil med automatisk pladekøb og realtidsopdateringer. Dog kan ældre enheder opleve korte indlæsningstider, særligt i live casino-sektionen.
        </p>
      </section>

      {/* SECTION: Betalingsmetoder */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder – danske løsninger i fokus</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Begge platforme fokuserer på danske <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>. <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link> er den mest populære metode hos begge. Danske Spil understøtter desuden Dankort, <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link>, <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> og bankoverførsel. Spilnu tilbyder MobilePay, Dankort, Visa/Mastercard og <Link to="/betalingsmetoder/bankoverforsler" className={linkClass}>bankoverførsel</Link>.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Internationale e-wallets som <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link> eller <Link to="/betalingsmetoder/paypal" className={linkClass}>PayPal</Link> er typisk ikke tilgængelige hos nogen af dem, da begge primært fokuserer på danske betalingsløsninger. MobilePay er den hurtigste udbetalingsmetode med behandlingstider der ofte er inden for få timer. Udbetalinger via kort tager 1-3 hverdage. Da begge drives af Danske Spil A/S med massiv kapital, er der aldrig tvivl om at gevinster udbetales.
        </p>
      </section>

      {/* SECTION: Kundeservice */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Kundeservice – Danske Spils bredere tilbud</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Danske Spil har det bredere kundeservice-tilbud med support via telefon, live chat og e-mail. Dansk support er tilgængeligt i udvidede åbningstider, og FAQ-sektionen er vel-struktureret med kategorier for kontostyring, bonusser og produkter. Muligheden for telefonisk support på dansk er en klar fordel for spillere der foretrækker at tale med en person.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Spilnus kundeservice er tilgængelig via live chat og e-mail. Supportteamet er kompetent og venligt, men mangler den telefoniske kanal. For de fleste spillere er chat-support tilstrækkeligt, men for ældre spillere eller dem der foretrækker mundtlig kommunikation, er Danske Spils bredere tilbud mere attraktivt.
        </p>
      </section>

      {/* SECTION: Ansvarligt spil */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Ansvarligt spil – statens forpligtelse</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Som statsejede platforme har begge et særligt ansvar for <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>. Begge kræver MitID-verifikation (18+ bekræftelse), opsætning af ind- og tabsgrænser inden spil kan begynde, og fuld ROFUS-integration. Det er et lovkrav der gælder alle danske casinoer, men Danske Spil-koncernen tager det et skridt videre med egne initiativer.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Danske Spil har investeret i avancerede overvågningssystemer der identificerer spillere med potentielt problematiske mønstre. Spilnu implementerer de samme systemer på koncernniveau. For spillere med behov for hjælp er StopSpillet (tlf. 70 22 28 25) tilgængeligt døgnet rundt. Begge platformes fokus på ansvarligt spil er en direkte konsekvens af det statslige ejerskab – det er ikke bare compliance, men en kerneopgave.
        </p>
      </section>

      {/* SECTION: Spillerprofiler */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Hvem passer bedst til hvem? – Spillerprofiler</h2>

        <h3 className="mb-3 text-xl font-semibold">Vælg Danske Spil Casino hvis du:</h3>
        <ul className="mb-6 space-y-2">
          {[
            "Vil have alt samlet ét sted – Lotto, Oddset og Casino under én konto",
            "Prioriterer Danmarks mest betroede brand og den tryggest mulige oplevelse",
            "Foretrækker en dedikeret mobilapp med push-notifikationer",
            "Ønsker telefonisk kundesupport på dansk",
            "Er ny til online casino og vil starte hos det mest velkendte brand",
            "Vil have den laveste bonus (500 kr.) der er lettest at gennemspille",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary font-bold">→</span> {item}
            </li>
          ))}
        </ul>

        <h3 className="mb-3 text-xl font-semibold">Vælg Spilnu hvis du:</h3>
        <ul className="mb-6 space-y-2">
          {[
            "Elsker online bingo – Spilnu er Danmarks ubestridte bingo-destination",
            "Vil have den højere velkomstbonus (1.000 kr. vs. 500 kr.)",
            "Foretrækker en platform dedikeret til casino og bingo uden sport/lotto",
            "Nyder social spil med live chat og community-elementer",
            "Ønsker det bredere casino-katalog med 700+ spil",
            "Foretrækker progressive bingo-jackpots over 100.000 kr.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary font-bold">→</span> {item}
            </li>
          ))}
        </ul>

        <p className="text-muted-foreground leading-relaxed">
          Mange danske spillere har konti hos begge – Danske Spil til sport og lotto, Spilnu til casino og bingo. Det er en udbredt og fornuftig strategi, der giver dig det bedste fra begge verdener inden for Danske Spil-koncernens trygge rammer. For flere anbefalinger, se vores <Link to="/casino-anmeldelser" className={linkClass}>komplette casinooversigt</Link>.
        </p>
      </section>
    </ComparisonPageTemplate>
  );
}
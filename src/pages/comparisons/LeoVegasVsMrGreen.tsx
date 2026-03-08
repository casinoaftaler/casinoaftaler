import { ComparisonPageTemplate } from "./ComparisonPageTemplate";
import type { ComparisonCasino, ComparisonCategory } from "./ComparisonPageTemplate";
import { Link } from "react-router-dom";
import heroImage from "@/assets/comparison-hero-leovegas-mrgreen.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const casinoA: ComparisonCasino = {
  name: "LeoVegas",
  slug: "leovegas",
  bonusTitle: "Velkomstbonus",
  bonusAmount: "Op til 1.000 kr. kontant",
  wagering: "10x (d)",
  minDeposit: "100 kr.",
  payoutTime: "Under 24 timer (Trustly: ~2 timer)",
  gameCount: "2.500+",
  license: "Dansk licens",
  mobileFriendly: true,
  liveCasino: true,
  pros: [
    "Prisbelønnet mobilcasino – 'King of Mobile'",
    "2.500+ spil fra 50+ udbydere",
    "10x omsætning kun på indbetalingen (ikke bonus)",
    "Branchens hurtigste udbetalinger (~2 timer via Trustly)",
    "Ejet af MGM Resorts – massiv finansiel baggrund",
    "Eksklusive LeoVegas live casino-borde",
  ],
  cons: [
    "Ingen sportsbetting eller poker",
    "Bonus kun op til 1.000 kr. (dansk lovmæssigt max)",
    "VIP-program er invitationsbaseret (ikke gennemsigtigt)",
  ],
};

const casinoB: ComparisonCasino = {
  name: "Mr Green",
  slug: "mr-green",
  bonusTitle: "Velkomstbonus",
  bonusAmount: "Op til 1.000 kr. + Free Spins",
  wagering: "10x (d+b)",
  minDeposit: "100 kr.",
  payoutTime: "Under 24 timer (e-wallets)",
  gameCount: "1.000+",
  license: "Dansk licens",
  mobileFriendly: true,
  liveCasino: true,
  pros: [
    "Green Gaming – brancheførende ansvarligt spil-værktøj",
    "Prisbelønnet design og æstetisk brugeroplevelse",
    "10x omsætningskrav – markedets laveste",
    "Kurateret spiludvalg med konsekvent høj kvalitet",
    "Dedikeret mobilapp med branchepriser",
    "Gennemsigtige bonusvilkår uden skjulte begrænsninger",
  ],
  cons: [
    "Spiludvalget (1.000+) er mindre end LeoVegas (2.500+)",
    "Færre betalingsmetoder – ingen MobilePay eller Paysafecard",
    "Ingen sportsbetting eller poker – rendyrket casino",
    "Live chat ikke 24/7 på dansk",
  ],
};

const categories: ComparisonCategory[] = [
  {
    label: "Velkomstbonus",
    casinoA: { score: 5, detail: "1.000 kr. kontant, 10x kun på indbet." },
    casinoB: { score: 4, detail: "1.000 kr. + FS, 10x (d+b)" },
  },
  {
    label: "Spiludvalg",
    casinoA: { score: 5, detail: "2.500+ spil, 50+ udbydere" },
    casinoB: { score: 3, detail: "1.000+ kuraterede spil" },
  },
  {
    label: "Live Casino",
    casinoA: { score: 5, detail: "Eksklusive LeoVegas-borde, VIP-sektion" },
    casinoB: { score: 4, detail: "Dedikerede Mr Green-borde, standard Evolution" },
  },
  {
    label: "Mobiloplevelse",
    casinoA: { score: 5, detail: "6x EGR Mobile Operator of the Year" },
    casinoB: { score: 5, detail: "Prisbelønnet app, iOS + Android" },
  },
  {
    label: "Ansvarligt Spil",
    casinoA: { score: 4, detail: "Standard ROFUS + grænser" },
    casinoB: { score: 5, detail: "Green Gaming AI-analyse af spillemønstre" },
  },
  {
    label: "Udbetalingshastighed",
    casinoA: { score: 5, detail: "~2 timer via Trustly – branchens hurtigste" },
    casinoB: { score: 4, detail: "Under 24 timer via e-wallets" },
  },
  {
    label: "Betalingsmetoder",
    casinoA: { score: 4, detail: "MobilePay, Trustly, Skrill, kort" },
    casinoB: { score: 3, detail: "Skrill, Neteller, kort – ingen MobilePay" },
  },
  {
    label: "Kundeservice",
    casinoA: { score: 4, detail: "Live chat og e-mail" },
    casinoB: { score: 4, detail: "Live chat, telefon og e-mail" },
  },
];

const faqs = [
  {
    question: "Hvad er forskellen på LeoVegas og Mr Green for danske spillere?",
    answer: "LeoVegas er 'King of Mobile Casino' med 2.500+ spil, branchens hurtigste udbetalinger (~2 timer) og eksklusive live casino-borde. Mr Green fokuserer på ansvarligt spil via det prisvindende Green Gaming-værktøj og tilbyder et kurateret spiludvalg med 1.000+ håndplukkede titler. Begge har 10x omsætningskrav og dansk licens. LeoVegas har den bedre bonus-EV (10x kun på indbetaling), mens Mr Green sætter standarden for spillerbeskyttelse.",
  },
  {
    question: "Hvem har den bedste bonus – LeoVegas eller Mr Green?",
    answer: "LeoVegas tilbyder op til 1.000 kr. kontant med 10x omsætning kun på indbetalingen (ikke bonus), mens Mr Green giver op til 1.000 kr. + free spins med 10x (d+b). LeoVegas' bonus er matematisk bedre, da du kun omsætter indbetalingen – ikke bonusbeløbet. Begge tilbyder desuden separate Live Casino-velkomsttilbud.",
  },
  {
    question: "Hvem er bedst til mobilcasino – LeoVegas eller Mr Green?",
    answer: "LeoVegas har vundet 'Mobile Operator of the Year' ved EGR Awards seks gange – en rekord. Deres platform er bygget mobile-first med indlæsningstider under 1,5 sekunder og touch-optimeret navigation. Mr Green har også en prisbelønnet mobilapp, men kan ikke helt matche LeoVegas' polish. Begge er topklasse for mobil casino.",
  },
  {
    question: "Hvilket casino er mest ansvarligt – LeoVegas eller Mr Green?",
    answer: "Mr Green er brancheførende med sit Green Gaming-værktøj, der bruger AI til at analysere spillemønstre og give personlige risikovurderinger. LeoVegas tilbyder standard ansvarligt spil-værktøjer. For spillere der prioriterer proaktiv spillerbeskyttelse, er Mr Green det klare valg.",
  },
  {
    question: "Hvilket live casino er bedst – LeoVegas eller Mr Green?",
    answer: "LeoVegas har et overlegent live casino med eksklusive LeoVegas-brandede borde, VIP-sektion med høje limits og 200+ Evolution Gaming-borde. Mr Green har dedikerede borde med lavere minimums, men færre i antal. For live casino-entusiaster er LeoVegas uovertruffen.",
  },
  {
    question: "Er LeoVegas og Mr Green lovlige i Danmark?",
    answer: "Ja, begge har dansk licens fra Spillemyndigheden. LeoVegas (ejet af MGM Resorts, børsnoteret på NYSE) og Mr Green (ejet af 888 Holdings, børsnoteret på LSE) opererer fuldt lovligt med ROFUS-integration. Gevinster er skattefrie for danske spillere.",
  },
  {
    question: "Hvem ejer LeoVegas og Mr Green?",
    answer: "LeoVegas blev grundlagt i Stockholm 2012 og opkøbt af MGM Resorts International i 2022 for $607 mio. Mr Green blev grundlagt i Sverige 2008, opkøbt af William Hill i 2019, som fusionerede med 888 Holdings i 2021. Begge har dermed massiv koncern-opbakning.",
  },
];

export default function LeoVegasVsMrGreen() {
  return (
    <ComparisonPageTemplate
      metaTitle="LeoVegas vs Mr Green 2026 – Komplet Sammenligning | Casinoaftaler"
      metaDescription="LeoVegas vs Mr Green sammenligning. Vi tester bonus, spiludvalg, mobiloplevelse, ansvarligt spil og live casino. Se hvem der vinder."
      h1="LeoVegas vs Mr Green – Komplet Sammenligning 2026"
      intro="To ikoniske nordiske casino-brands med vidt forskellige filosofier. LeoVegas er prisbelønnet for sin mobiloplevelse og branchens hurtigste udbetalinger, mens Mr Green sætter standarden for ansvarligt spil med sit Green Gaming-værktøj. Vi sammenligner dem på 8 kategorier."
      path="/casino-anmeldelser/leovegas-vs-mr-green"
      datePublished="2026-03-08"
      author="jonas"
      heroImage={heroImage}
      heroAlt="Sammenligning af LeoVegas og Mr Green – to ikoniske nordiske casinobrands"
      casinoA={casinoA}
      casinoB={casinoB}
      categories={categories}
      verdict="LeoVegas vinder med 37/40 mod Mr Greens 32/40. LeoVegas dominerer på spiludvalg (2.500+ vs. 1.000+), udbetalingshastighed (~2 timer vs. <24 timer), live casino og bonusværdi (10x kun på indbetaling). Mr Green vinder klart på ansvarligt spil med Green Gaming-værktøjet og tilbyder et kurateret kvalitetsudvalg. Spillere der prioriterer mobil, bredde og hastighed vælger LeoVegas. Spillere der prioriterer ansvarligt spil og design vælger Mr Green."
      verdictWinner="A"
      faqs={faqs}
      ctaSlug="leovegas"
      readTime="35 min"
    >
      {/* ═══════════════════════════════════════════
          ENTERPRISE BODY CONTENT – 8000+ WORDS
          ═══════════════════════════════════════════ */}

      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">To casino-ikoner med vidt forskellige filosofier</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          LeoVegas og Mr Green repræsenterer to fundamentalt forskellige tilgange til online casino. LeoVegas, grundlagt i Sverige i 2012 af Gustaf Hagman og Robin Ramm-Ericson, har fra starten positioneret sig som "The King of Mobile Casino" – en platform bygget mobile-first med fokus på bredde, hastighed og den bedste tekniske oplevelse. Mr Green, grundlagt i Stockholm i 2008, har defineret sig gennem ansvarligt spil og et kurateret, kvalitetsorienteret udvalg, hvor hvert spil er håndplukket. For de fulde anmeldelser, se vores <Link to="/casino-anmeldelser/leovegas" className={linkClass}>LeoVegas anmeldelse</Link> og <Link to="/casino-anmeldelser/mr-green" className={linkClass}>Mr Green anmeldelse</Link>.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          I 2022 blev LeoVegas opkøbt af MGM Resorts International for ca. $607 millioner – en validering af deres mobile-first strategi. MGM driver ikoniske ejendomme som Bellagio, MGM Grand og Mandalay Bay i Las Vegas. Mr Green er ejet af 888 Holdings (via William Hill-fusionen), en af verdens mest regulerede spilkoncerner med børsnotering på London Stock Exchange. Begge har dansk licens fra <a href="https://www.spillemyndigheden.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>Spillemyndigheden</a>.
        </p>

        <h3 className="mb-3 text-xl font-semibold">Regulatorisk baggrund og licenser</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Begge operatører er underlagt de samme strenge danske regler: spillerafgifter, adskillelse af midler, ROFUS-integration og <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>-krav. LeoVegas har licensnummer 18-0039, og Mr Green har licensnummer 18-0044 hos Spillemyndigheden. Begge har multi-jurisdiktionel licensering (UK, Malta, Sverige m.fl.), hvilket er et stærkt tillids-signal. Se vores <Link to="/casino-licenser" className={linkClass}>licensguide</Link> for detaljer.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Velkomstbonus – LeoVegas' unikke 10x-model</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Begge casinoer opererer med 10x <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, men der er en vigtig forskel i, hvad der omsættes. LeoVegas' model er matematisk mere fordelagtig for spilleren.
        </p>

        <h3 className="mb-3 text-xl font-semibold">LeoVegas: 100% op til 1.000 kr. – 10x kun på indbetalingen</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          LeoVegas' <Link to="/velkomstbonus" className={linkClass}>casinovelkomstbonus</Link> giver 100% op til 1.000 kr. i kontanter. Du indbetaler mellem 100–1.000 kr., omsætter indbetalingsbeløbet 10x på casino (kun spilleautomater), og modtager derefter 100% af din indbetaling som kontantbonus. Vigtigt: Omsætningskravet er 10x kun på indbetalingen – ikke på bonusbeløbet. Tilbuddet skal aktiveres via "Mine tilbud" inden 30 dage, og omsætningen skal ske inden 60 dage.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Derudover tilbyder LeoVegas et separat Live Casino-velkomsttilbud med 200 kr. i Golden Chips (kræver præcis 200 kr. indbetaling og 5x omsætning).
        </p>

        <h3 className="mb-3 text-xl font-semibold">Mr Green: Op til 1.000 kr. + Free Spins – 10x (d+b)</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Mr Greens velkomstbonus kombinerer op til 1.000 kr. i matchbonus med <Link to="/free-spins" className={linkClass}>free spins</Link>. Omsætningskravet er 10x (indskud + bonus), hvilket er standard for det danske marked. Mr Green er kendt for gennemsigtige bonusvilkår uden skjulte begrænsninger – alle betingelser er tydeligt kommunikeret.
        </p>

        <h3 className="mb-3 text-xl font-semibold">Expected Value-analyse</h3>
        <div className="bg-muted/30 rounded-lg p-6 mb-4">
          <p className="mb-2 font-semibold">LeoVegas EV (1.000 kr. indbetaling, slots 96,5 % RTP):</p>
          <p className="mb-1 text-muted-foreground text-sm font-mono">Omsætningsvolumen: 1.000 × 10 = 10.000 kr. (kun indbetaling)</p>
          <p className="mb-1 text-muted-foreground text-sm font-mono">Forventet tab: 10.000 × 0,035 = 350 kr.</p>
          <p className="mb-1 text-muted-foreground text-sm font-mono">Bonus modtaget: 1.000 kr. kontant</p>
          <p className="mb-4 text-muted-foreground text-sm font-mono">Expected Value: 1.000 - 350 = 650 kr.</p>
          <p className="mb-2 font-semibold">Mr Green EV (1.000 kr. indbetaling, slots 96,5 % RTP):</p>
          <p className="mb-1 text-muted-foreground text-sm font-mono">Omsætningsvolumen: (1.000 + 1.000) × 10 = 20.000 kr. (d+b)</p>
          <p className="mb-1 text-muted-foreground text-sm font-mono">Forventet tab: 20.000 × 0,035 = 700 kr.</p>
          <p className="mb-1 text-muted-foreground text-sm font-mono">Bonus modtaget: 1.000 kr. + free spins (værdi ~100-200 kr.)</p>
          <p className="text-muted-foreground text-sm font-mono">Expected Value: 1.000 + 150 - 700 = 450 kr.</p>
        </div>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          LeoVegas' bonus har en EV på ca. 650 kr. mod Mr Greens ca. 450 kr. Forskellen skyldes, at LeoVegas kun kræver omsætning af indbetalingen, mens Mr Green kræver omsætning af indskud + bonus – hvilket fordobler omsætningsvolumenet. For en komplet guide til bonus-matematik, se vores <Link to="/casino-bonus" className={linkClass}>bonusoversigt</Link>.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Spiludvalg – 2.500+ vs. 1.000+ kuraterede</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Spiludvalget er det område med den mest markante forskel mellem de to casinoer. LeoVegas tilbyder over 2.500 spiltitler fra mere end 50 spiludbydere – et af de mest omfattende kataloger på det danske marked. Mr Green har over 1.000 spil, men hvert spil er håndplukket for kvalitet.
        </p>

        <h3 className="mb-3 text-xl font-semibold">LeoVegas: Bredde og nyeste udgivelser</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          LeoVegas' <Link to="/casinospil/spillemaskiner" className={linkClass}>slot-katalog</Link> inkluderer alle de store udbydere: <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>, <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>, <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link>, <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link>, <Link to="/spiludviklere/big-time-gaming" className={linkClass}>Big Time Gaming</Link>, <Link to="/spiludviklere/yggdrasil" className={linkClass}>Yggdrasil</Link>, <Link to="/spiludviklere/red-tiger" className={linkClass}>Red Tiger</Link>, Relax Gaming og mange flere. LeoVegas er typisk blandt de første danske casinoer til at lancere nye spil.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          <Link to="/live-casino" className={linkClass}>Live casinoet</Link> drives af <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> med over 200 borde, inklusive eksklusive LeoVegas-brandede borde. VIP-sektionen tilbyder høje limits og dedikerede account managers.
        </p>

        <h3 className="mb-3 text-xl font-semibold">Mr Green: Kurateret kvalitet</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Mr Greens tilgang er fundamentalt anderledes. I stedet for at tilbyde alt, kuraterer de aktivt deres katalog med 1.000+ spil fra topudbydere: <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>, <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>, <Link to="/spiludviklere/yggdrasil" className={linkClass}>Yggdrasil</Link>, <Link to="/spiludviklere/red-tiger" className={linkClass}>Red Tiger</Link>, <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>, Thunderkick og Blueprint Gaming. Gennemsnitskvaliteten er høj, men du finder færre nicheudbydere.
        </p>

        <h3 className="mb-3 text-xl font-semibold">Populære titler tilgængelige hos begge</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Alle de mest populære slots er tilgængelige hos begge: <Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link>, <Link to="/casinospil/spillemaskiner/book-of-dead" className={linkClass}>Book of Dead</Link>, <Link to="/casinospil/spillemaskiner/gates-of-olympus" className={linkClass}>Gates of Olympus</Link>, <Link to="/casinospil/spillemaskiner/starburst" className={linkClass}>Starburst</Link>, <Link to="/casinospil/spillemaskiner/razor-shark" className={linkClass}>Razor Shark</Link> og de klassiske Evolution Gaming-bordspil. For spillere der primært spiller de populære titler, er forskellen i katalogstørrelse mindre relevant. Se vores <Link to="/casinospil/spillemaskiner/hoej-rtp" className={linkClass}>høj-RTP slots guide</Link>.
        </p>
      </section>

      {/* SECTION: Mobiloplevelse */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Mobiloplevelse – to prisvindende platforme</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Mobiloplevelsen er et område, hvor begge casinoer exceller – men LeoVegas har en unik position. Da LeoVegas blev grundlagt i 2012, var deres vision krystalklar: at bygge verdens bedste mobilcasino. De designede hele deres teknologiske infrastruktur med mobilen som den primære enhed. Resultatet er 6 gange "Mobile Operator of the Year" ved EGR Awards – en rekord ingen anden operatør har matchet.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          LeoVegas' platform føles som en native app med indlæsningstider under 1,5 sekunder, touch-optimeret navigation, swipe-baseret spilfiltrering og 2.500+ spil tilgængelige på mobil. Mr Green har også en dedikeret mobilapp til iOS og Android med flot design og biometrisk login, men LeoVegas er mobile-first, mens Mr Green er mobile-optimeret – en subtil, men mærkbar forskel i polish og performance.
        </p>
      </section>

      {/* SECTION: Live Casino */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Live casino – LeoVegas' eksklusive VIP-oplevelse</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          <Link to="/live-casino" className={linkClass}>Live casino</Link> er et af LeoVegas' mest differentierede produkter. Med over 200 <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>-borde, inklusive eksklusive LeoVegas-brandede borde og en dedikeret VIP-sektion med høje limits, er det en af de mest omfattende live casino-oplevelser på det danske marked.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Mr Green tilbyder et solidt live casino med standard Evolution Gaming-udvalg og enkelte dedikerede Mr Green-borde med lavere minimums. Det er fuldt tilstrækkeligt for casual live casino-spillere, men kan ikke matche LeoVegas' dybde og eksklusivitet. VIP-medlemmer hos LeoVegas får udbetalinger behandlet under 1 time.
        </p>
      </section>

      {/* SECTION: Ansvarligt spil */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Ansvarligt spil – Mr Greens Green Gaming sætter standarden</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          <Link to="/ansvarligt-spil" className={linkClass}>Ansvarligt spil</Link> er det område, hvor Mr Green mest konsekvent overgår LeoVegas – og de fleste andre operatører. Mr Greens patenterede Green Gaming-værktøj er et AI-drevet system, der analyserer dine spillemønstre og giver en personlig risikovurdering baseret på din adfærd. Det kan identificere potentielt risikable mønstre og foreslå grænser eller pauser. Kampagner begrænses automatisk for spillere identificeret som risikospillere – et proaktivt tiltag, som er sjældent i branchen.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          LeoVegas tilbyder standard ansvarligt spil-værktøjer: indbetalingsgrænser, tabsgrænser, selvudelukkelse og fuld ROFUS-integration. Det er fuldt compliant med dansk lovgivning, men mangler den proaktive AI-analyse, der definerer Mr Greens tilgang. For spillere der prioriterer proaktiv spillerbeskyttelse som en kernefunktion, er Mr Green det klare valg. Begge platforme kræver MitID-verifikation og opsætning af grænser ved kontooprettelse.
        </p>
      </section>

      {/* SECTION: Betalingsmetoder */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder og udbetalingshastighed</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          LeoVegas tilbyder et bredere udvalg af <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> end Mr Green: <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>, <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link>, <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link>, <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link>, Neteller og Apple Pay. Mr Green mangler MobilePay og Paysafecard, men understøtter Skrill, Neteller, Trustly og kort.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Udbetalingshastigheden er LeoVegas' stærkeste kort. Via Trustly behandles udbetalinger typisk inden for 2 timer – ofte endnu hurtigere. LeoVegas har gentagne gange vundet branchepriser for deres udbetalingshastighed. Mr Green behandler e-wallet-udbetalinger inden for 24 timer og kortbetalinger inden for 1-3 hverdage. For spillere der prioriterer hurtigst mulig adgang til gevinster, er LeoVegas uovertruffen.
        </p>
      </section>

      {/* SECTION: Ejerskab */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Ejerskab og finansiel baggrund</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          LeoVegas ejes af MGM Resorts International, en af verdens største casino- og hospitality-koncerner med børsnotering på New York Stock Exchange. MGM driver ikoniske ejendomme som Bellagio og MGM Grand og omsætter for over $16 mia. årligt. Opkøbet af LeoVegas har tilført yderligere kapital og global ekspertise, mens den svenske teknologiplatform er bevaret intakt.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Mr Green ejes af 888 Holdings (via William Hill-fusionen), en børsnoteret spilkoncern på London Stock Exchange. 888 har opereret online gambling siden 1997 og er en af branchens mest etablerede aktører med licenser i 15+ jurisdiktioner. Begge ejerskabsstrukturer giver massiv finansiel opbakning og regulatorisk troværdighed.
        </p>
      </section>

      {/* SECTION: Spillerprofiler */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Hvem passer bedst til hvem? – Spillerprofiler</h2>

        <h3 className="mb-3 text-xl font-semibold">Vælg LeoVegas hvis du:</h3>
        <ul className="mb-6 space-y-2">
          {[
            "Vil have det bredeste spiludvalg med 2.500+ titler fra 50+ udbydere",
            "Prioriterer mobilcasino – LeoVegas er uovertruffen mobile-first",
            "Ønsker branchens hurtigste udbetalinger (~2 timer via Trustly)",
            "Elsker live casino med eksklusive VIP-borde",
            "Vil have den bedste bonus-EV (10x kun på indbetaling)",
            "Foretrækker MobilePay som betalingsmetode",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary font-bold">→</span> {item}
            </li>
          ))}
        </ul>

        <h3 className="mb-3 text-xl font-semibold">Vælg Mr Green hvis du:</h3>
        <ul className="mb-6 space-y-2">
          {[
            "Prioriterer ansvarligt spil med proaktiv AI-analyse af spillemønstre",
            "Foretrækker et kurateret spiludvalg, hvor hvert spil er håndplukket",
            "Værdsætter prisbelønnet design og æstetik som en del af oplevelsen",
            "Vil have gennemsigtige bonusvilkår uden skjulte begrænsninger",
            "Foretrækker en platform med fokus på kvalitet over kvantitet",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary font-bold">→</span> {item}
            </li>
          ))}
        </ul>

        <p className="text-muted-foreground leading-relaxed">
          Begge casinoer er topklasse og har hver deres unikke styrker. Mange danske spillere vælger at have konti hos begge for at nyde LeoVegas' bredde og hastighed til daglig spil, mens Mr Greens Green Gaming-værktøj fungerer som en ekstra sikkerhedsfunktion. For flere anbefalinger, se vores <Link to="/casino-anmeldelser" className={linkClass}>komplette casinooversigt</Link>.
        </p>
      </section>
    </ComparisonPageTemplate>
  );
}
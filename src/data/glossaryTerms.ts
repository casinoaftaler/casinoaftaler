/**
 * Casino Ordbog – term definitions and metadata.
 */

export interface GlossaryTerm {
  slug: string;
  title: string;
  shortDefinition: string;
  fullContent: string;
  relatedTerms: string[];
  relatedPages: { label: string; href: string }[];
  metaTitle: string;
  metaDescription: string;
  category?: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "rtp",
    title: "RTP (Return to Player)",
    shortDefinition: "RTP angiver den teoretiske tilbagebetalingsprocent på en spillemaskine over tid. En RTP på 96% betyder, at maskinen i gennemsnit returnerer 96 kr. for hver 100 kr. indsat.",
    metaTitle: "Hvad er RTP? Return to Player Forklaret",
    metaDescription: "Lær hvad RTP (Return to Player) betyder for spillemaskiner. Forstå hvordan tilbagebetalingsprocenten påvirker dine chancer og find slots med høj RTP.",
    category: "Grundbegreber",
    relatedTerms: ["house-edge", "volatilitet", "hit-frequency"],
    relatedPages: [
      { label: "Spillemaskiner med Høj RTP", href: "/casinospil/spillemaskiner/hoej-rtp" },
      { label: "Spillemaskiner Guide", href: "/casinospil/spillemaskiner" },
    ],
    fullContent: `<h2>Hvad er RTP?</h2><p>RTP står for <strong>Return to Player</strong> og er den mest fundamentale statistik inden for <a href="/casinospil/spillemaskiner" class="text-primary hover:underline">spillemaskiner</a>. RTP udtrykkes som en procentdel og angiver, hvor stor en andel af alle indsatser en spillemaskine teoretisk set returnerer til spillerne over en uendelig lang tidsperiode.</p><p>Hvis en spillemaskine har en RTP på <strong>96,50%</strong>, betyder det, at for hver 100 kr. der indsættes, vil maskinen i gennemsnit udbetale 96,50 kr. tilbage. De resterende 3,50 kr. er casinoets teoretiske fortjeneste, også kaldet <a href="/ordbog/house-edge" class="text-primary hover:underline">house edge</a>.</p><h2>Hvordan beregnes RTP?</h2><p>RTP beregnes ud fra spillets matematiske model og er baseret på millioner af simulerede spins. Formlen er:</p><p><strong>RTP = (Samlede udbetalinger ÷ Samlede indsatser) × 100</strong></p><p>Det er vigtigt at forstå, at RTP er et <strong>langsigtet gennemsnit</strong>. På kort sigt kan dine resultater variere markant — dette påvirkes af spillets <a href="/ordbog/volatilitet" class="text-primary hover:underline">volatilitet</a>.</p><h2>RTP i praksis</h2><ul><li><strong>Slot A</strong>: RTP 97,00% – returnerer i gennemsnit 9.700 kr. per 10.000 kr.</li><li><strong>Slot B</strong>: RTP 94,00% – returnerer i gennemsnit 9.400 kr. per 10.000 kr.</li></ul><p>Forskellen akkumulerer sig over tusindvis af spins. Vi anbefaler altid slots med <strong>RTP på 96% eller derover</strong>.</p><h2>RTP vs. House Edge</h2><p><strong>House Edge = 100% − RTP</strong></p><p>En spillemaskine med 96% RTP har et house edge på 4%. Jo højere RTP, desto bedre for spilleren. Læs vores dybdegående guide til <a href="/ordbog/house-edge" class="text-primary hover:underline">house edge</a>.</p><h2>Typiske RTP-intervaller</h2><ul><li><strong>Høj RTP (96,50%+)</strong>: Blood Suckers (98,00%), Mega Joker (99,00%)</li><li><strong>Gennemsnitlig RTP (95–96,50%)</strong>: Gates of Olympus (96,50%), Sweet Bonanza (96,48%)</li><li><strong>Lav RTP (under 95%)</strong>: Ofte <a href="/ordbog/jackpot" class="text-primary hover:underline">jackpot</a>-slots som Mega Moolah (88,12%)</li></ul><h2>Vigtigt at huske</h2><ul><li>RTP gælder over <strong>millioner af spins</strong> — ikke din individuelle session</li><li>Danske casinoer med licens fra <a href="/spillemyndigheden" class="text-primary hover:underline">Spillemyndigheden</a> skal oplyse RTP for alle spil</li><li>Kombinér altid RTP med <a href="/ordbog/volatilitet" class="text-primary hover:underline">volatilitet</a> for at forstå spillets risikoprofil</li></ul>`,
  },
  {
    slug: "wagering",
    title: "Wagering (Omsætningskrav)",
    shortDefinition: "Wagering er det antal gange, du skal omsætte en bonus, før du kan udbetale gevinster. Et 30x wagering-krav på en 100 kr. bonus betyder, du skal spille for 3.000 kr.",
    metaTitle: "Hvad er Wagering? Omsætningskrav Forklaret",
    metaDescription: "Forstå wagering og omsætningskrav på casino bonusser. Lær hvordan du beregner det reelle krav og finder bonusser med lave omsætningskrav.",
    category: "Bonus",
    relatedTerms: ["free-spins", "max-bet"],
    relatedPages: [
      { label: "Omsætningskrav Guide", href: "/omsaetningskrav" },
      { label: "Bonus uden Omsætningskrav", href: "/bonus-uden-omsaetningskrav" },
      { label: "Casino Bonus", href: "/casino-bonus" },
    ],
    fullContent: `<h2>Hvad er wagering?</h2><p><strong>Wagering</strong> (også kaldet omsætningskrav) er den betingelse, casinoet sætter for, hvor mange gange du skal omsætte din <a href="/casino-bonus" class="text-primary hover:underline">casino bonus</a>, før du kan udbetale eventuelle gevinster.</p><h2>Hvordan beregnes wagering?</h2><ul><li><strong>30x bonus</strong>: 100 kr. bonus × 30 = 3.000 kr. i omsætning</li><li><strong>30x (bonus + indbetaling)</strong>: (100 kr. + 100 kr.) × 30 = 6.000 kr.</li></ul><h2>Expected Value (EV)</h2><p><strong>EV = Bonusbeløb − (Wagering × Bonusbeløb × <a href="/ordbog/house-edge" class="text-primary hover:underline">House Edge</a>)</strong></p><p>Eksempel: 100 kr. bonus, 30x wagering, 4% house edge: EV = 100 − 120 = <strong>−20 kr.</strong></p><h2>Typiske intervaller</h2><ul><li><strong>Lav (1–15x)</strong>: Fremragende</li><li><strong>Middel (20–35x)</strong>: Standard</li><li><strong>Høj (40–70x)</strong>: Svær at gennemspille</li><li><strong>Ingen (0x)</strong>: Det bedste – se <a href="/bonus-uden-omsaetningskrav" class="text-primary hover:underline">bonus uden omsætningskrav</a></li></ul><h2>Tips</h2><ul><li>Vælg spil med <strong>høj <a href="/ordbog/rtp" class="text-primary hover:underline">RTP</a></strong></li><li>Tjek om alle spil bidrager 100% til wagering</li><li>Overvej <a href="/no-sticky-bonus" class="text-primary hover:underline">no-sticky bonusser</a></li></ul>`,
  },
  {
    slug: "volatilitet",
    title: "Volatilitet",
    shortDefinition: "Volatilitet beskriver risikoprofilen på en spillemaskine. Høj volatilitet giver sjældne men store gevinster, mens lav volatilitet giver hyppige men mindre gevinster.",
    metaTitle: "Hvad er Volatilitet? Slot Risikoprofil",
    metaDescription: "Forstå volatilitet i spillemaskiner. Lær forskellen mellem lav, medium og høj volatilitet og find de bedste slots til din spillestil.",
    category: "Grundbegreber",
    relatedTerms: ["rtp", "hit-frequency", "paylines"],
    relatedPages: [
      { label: "Spillemaskiner", href: "/casinospil/spillemaskiner" },
      { label: "Høj RTP Slots", href: "/casinospil/spillemaskiner/hoej-rtp" },
    ],
    fullContent: `<h2>Hvad er volatilitet?</h2><p><strong>Volatilitet</strong> (også kaldet varians) beskriver, hvor meget og hvor ofte en <a href="/casinospil/spillemaskiner" class="text-primary hover:underline">spillemaskine</a> udbetaler. Det er et mål for risikoen.</p><h2>De tre niveauer</h2><h3>Lav volatilitet</h3><p>Hyppige små gevinster. Din saldo svinger minimalt. Eksempler: Starburst, Blood Suckers.</p><h3>Medium volatilitet</h3><p>Balance mellem gevinststørrelse og frekvens. Eksempler: Gonzo's Quest, Fire Joker.</p><h3>Høj volatilitet</h3><p>Lange tørkeperioder afbrudt af potentielt massive gevinster. Eksempler: Dead or Alive 2, Book of Dead.</p><h2>Bankroll-management</h2><ul><li><strong>Lav</strong>: 50-100 spins i bankroll</li><li><strong>Medium</strong>: 150-300 spins</li><li><strong>Høj</strong>: 300-500+ spins</li></ul><h2>Volatilitet vs. RTP</h2><p>De er <strong>uafhængige parametre</strong>. En slot kan have høj <a href="/ordbog/rtp" class="text-primary hover:underline">RTP</a> og høj volatilitet. Begge bør vurderes sammen med <a href="/ordbog/hit-frequency" class="text-primary hover:underline">hit frequency</a> for at forstå spillets samlede risikoprofil.</p>`,
  },
  {
    slug: "house-edge",
    title: "House Edge",
    shortDefinition: "House edge er casinoets matematiske fordel over spilleren, udtrykt i procent. Det er forskellen mellem 100% og spillets RTP — f.eks. har et spil med 96% RTP et house edge på 4%.",
    metaTitle: "Hvad er House Edge? Casinoets Fordel",
    metaDescription: "Forstå house edge og hvordan casinoets matematiske fordel fungerer. Lær at finde spil med lavt house edge for bedre odds.",
    category: "Grundbegreber",
    relatedTerms: ["rtp", "wagering"],
    relatedPages: [
      { label: "Blackjack Guide", href: "/casinospil/blackjack" },
      { label: "Roulette Guide", href: "/casinospil/roulette" },
    ],
    fullContent: `<h2>Hvad er house edge?</h2><p><strong>House edge</strong> er den procentdel af hver indsats, som casinoet forventer at beholde over tid. Det er det omvendte af <a href="/ordbog/rtp" class="text-primary hover:underline">RTP</a>.</p><h2>Beregning</h2><p><strong>House Edge = 100% − RTP</strong></p><h2>House edge på tværs af spil</h2><ul><li><strong><a href="/casinospil/blackjack" class="text-primary hover:underline">Blackjack</a></strong> (0,20–0,50%): Laveste med perfekt strategi</li><li><strong>Baccarat</strong> (1,06–1,24%): Banker-bet er stærkest</li><li><strong><a href="/casinospil/roulette" class="text-primary hover:underline">Europæisk Roulette</a></strong> (2,70%): Enkelt nul</li><li><strong><a href="/casinospil/spillemaskiner" class="text-primary hover:underline">Spillemaskiner</a></strong> (2–8%): Varierer kraftigt afhængigt af <a href="/ordbog/volatilitet" class="text-primary hover:underline">volatilitet</a></li></ul><h2>Forventet tab</h2><p><strong>Forventet tab = Samlet indsats × House Edge</strong></p><p>5.000 kr. på europæisk roulette (2,70%) = 135 kr. forventet tab. Under <a href="/ordbog/wagering" class="text-primary hover:underline">bonusomsætning</a> er house edge den vigtigste faktor for din EV.</p>`,
  },
  {
    slug: "free-spins",
    title: "Free Spins (Gratis Spins)",
    shortDefinition: "Free spins er gratis spilleomgange på en spillemaskine, enten som del af spillets bonusfunktion eller som en casinobonus.",
    metaTitle: "Hvad er Free Spins? Gratis Spins Guide",
    metaDescription: "Alt om free spins: hvordan de fungerer som bonusfunktion i slots og som casinobonus. Find de bedste free spins tilbud.",
    category: "Bonus",
    relatedTerms: ["wagering", "scatter", "bonus-runde"],
    relatedPages: [
      { label: "Free Spins", href: "/free-spins" },
      { label: "Free Spins i Dag", href: "/free-spins-i-dag" },
    ],
    fullContent: `<h2>Hvad er free spins?</h2><p><strong>Free spins</strong> refererer til to koncepter:</p><ol><li><strong>In-game free spins</strong>: <a href="/ordbog/bonus-runde" class="text-primary hover:underline">Bonusfunktion</a> i slotten, typisk udløst af <a href="/ordbog/scatter" class="text-primary hover:underline">scatter-symboler</a></li><li><strong>Casino free spins</strong>: Bonus fra casinoet som del af <a href="/velkomstbonus" class="text-primary hover:underline">velkomstpakke</a></li></ol><h2>In-game free spins</h2><p>Aktiveres ved 3+ scatter-symboler. Ekstra funktioner inkluderer expanding <a href="/ordbog/wild" class="text-primary hover:underline">wilds</a>, <a href="/ordbog/multiplikator" class="text-primary hover:underline">multiplikatorer</a>, retriggers og sticky wilds.</p><h2>Casino free spins</h2><ul><li><strong>Velkomstbonus</strong>: F.eks. 100 free spins ved første indbetaling</li><li><strong>No deposit</strong>: Gratis spins uden indbetaling</li><li><strong>Daglige</strong>: Kampagner med gratis spins hver dag – se <a href="/free-spins-i-dag" class="text-primary hover:underline">free spins i dag</a></li></ul><h2>Vigtige vilkår</h2><ul><li><strong><a href="/ordbog/wagering" class="text-primary hover:underline">Omsætningskrav</a></strong>: Typisk 20-40x</li><li><strong>Max gevinst</strong>: Loft på gevinster</li><li><strong>Spin-værdi</strong>: Typisk 1-2 kr. per spin</li></ul>`,
  },
  {
    slug: "scatter",
    title: "Scatter-symbol",
    shortDefinition: "Scatter er et specialsymbol i spillemaskiner, der udløser bonusfunktioner som free spins. Scatters behøver ikke lande på en gevinstlinje for at tælle.",
    metaTitle: "Hvad er Scatter? Scatter-symbol Forklaret",
    metaDescription: "Lær hvad scatter-symboler gør i spillemaskiner. Forstå hvordan de udløser free spins og bonusrunder.",
    category: "Spillemaskiner",
    relatedTerms: ["wild", "free-spins", "bonus-runde"],
    relatedPages: [{ label: "Spillemaskiner Guide", href: "/casinospil/spillemaskiner" }],
    fullContent: `<h2>Hvad er et scatter-symbol?</h2><p><strong>Scatter-symbolet</strong> kan udbetale og aktivere <a href="/ordbog/bonus-runde" class="text-primary hover:underline">bonusfunktioner</a> <strong>uanset hvor det lander på hjulene</strong>.</p><h2>Funktioner</h2><ul><li><strong>Direkte udbetaling</strong>: Baseret på samlet indsats</li><li><strong>Bonusudløser</strong>: 3+ scatters aktiverer <a href="/ordbog/free-spins" class="text-primary hover:underline">free spins</a></li></ul><h2>Scatter vs. andre symboler</h2><ul><li><strong>Scatter</strong>: Tæller overalt, udløser bonusser</li><li><strong><a href="/ordbog/wild" class="text-primary hover:underline">Wild</a></strong>: Erstatter symboler, skal stå på <a href="/ordbog/paylines" class="text-primary hover:underline">gevinstlinje</a></li></ul><h2>Populære eksempler</h2><ul><li><strong>Book of Dead</strong>: Bogen er både scatter og wild</li><li><strong>Sweet Bonanza</strong>: Lollipop-scatter</li><li><strong>Gates of Olympus</strong>: Zeus-scatter</li></ul>`,
  },
  {
    slug: "wild",
    title: "Wild-symbol",
    shortDefinition: "Wild er et specialsymbol der fungerer som joker — det erstatter andre symboler for at danne gevinstkombinationer. Findes i varianter som expanding, sticky og multiplier wilds.",
    metaTitle: "Hvad er Wild-symbol? Joker i Slots",
    metaDescription: "Forstå wild-symboler i spillemaskiner: expanding wilds, sticky wilds, multiplier wilds og mere.",
    category: "Spillemaskiner",
    relatedTerms: ["scatter", "paylines", "multiplikator"],
    relatedPages: [{ label: "Spillemaskiner", href: "/casinospil/spillemaskiner" }],
    fullContent: `<h2>Hvad er et wild-symbol?</h2><p><strong>Wild-symbolet</strong> erstatter alle standardsymboler for at danne gevinster. Wild erstatter normalt <strong>ikke</strong> <a href="/ordbog/scatter" class="text-primary hover:underline">scatter</a> eller bonussymboler.</p><h2>Typer</h2><h3>Expanding Wild</h3><p>Udvider sig til at dække hele hjulet. Populært i Book of Dead og Starburst.</p><h3>Sticky Wild</h3><p>Forbliver på sin position i flere spins, typisk under <a href="/ordbog/free-spins" class="text-primary hover:underline">free spins</a>.</p><h3>Walking Wild</h3><p>Bevæger sig ét hjul til venstre for hvert spin.</p><h3>Multiplier Wild</h3><p>Multiplicerer gevinsten med en <a href="/ordbog/multiplikator" class="text-primary hover:underline">multiplikator</a> på 2x, 3x eller mere.</p><h3>Stacked Wild</h3><p>Flere wilds stablet oven på hinanden på tværs af <a href="/ordbog/paylines" class="text-primary hover:underline">gevinstlinjer</a>.</p>`,
  },
  {
    slug: "jackpot",
    title: "Jackpot",
    shortDefinition: "En jackpot er den største mulige gevinst på et casinospil. Progressive jackpots vokser med hver indsats og kan nå millionbeløb.",
    metaTitle: "Hvad er en Jackpot? Typer og Odds",
    metaDescription: "Alt om jackpots: progressive vs. faste jackpots, hvordan de fungerer, og hvad oddssene er for at vinde.",
    category: "Grundbegreber",
    relatedTerms: ["rtp", "volatilitet", "max-bet"],
    relatedPages: [
      { label: "Mega Moolah Guide", href: "/casinospil/spillemaskiner/mega-moolah" },
    ],
    fullContent: `<h2>Hvad er en jackpot?</h2><p>En <strong>jackpot</strong> er den højeste mulige gevinst i et casinospil. På <a href="/casinospil/spillemaskiner" class="text-primary hover:underline">spillemaskiner</a> varierer jackpotten fra faste topgevinster til progressive millionbeløb.</p><h2>Typer</h2><h3>Fast jackpot</h3><p>Forudbestemt topgevinst, f.eks. 5.000x indsats.</p><h3>Progressiv jackpot</h3><p>Vokser med en andel af hver indsats. Tre typer: standalone, lokal og netværks-progressiv.</p><h2>Berømte jackpots</h2><ul><li><strong>Mega Moolah</strong>: Rekord €18,9 millioner</li><li><strong>Mega Fortune</strong>: Over €10 millioner</li><li><strong>Divine Fortune</strong>: Hyppigere, mindre jackpots</li></ul><h2>RTP og jackpots</h2><p>Progressive slots har typisk lavere base <a href="/ordbog/rtp" class="text-primary hover:underline">RTP</a>, fordi en del af indsatsen går til jackpot-puljen. Overvej <a href="/ordbog/volatilitet" class="text-primary hover:underline">volatiliteten</a> – jackpot-slots er næsten altid høj-volatile.</p>`,
  },
  {
    slug: "rng",
    title: "RNG (Random Number Generator)",
    shortDefinition: "RNG er tilfældighedsgeneratoren der sikrer, at alle udfald i online casinospil er fuldstændig tilfældige og uforudsigelige.",
    metaTitle: "Hvad er RNG? Random Number Generator",
    metaDescription: "Forstå RNG og hvordan tilfældighedsgeneratoren sikrer fair play i online casino. Certificering og test forklaret.",
    category: "Teknisk",
    relatedTerms: ["rtp", "hit-frequency"],
    relatedPages: [
      { label: "Spillemyndigheden", href: "/spillemyndigheden" },
      { label: "Sådan Tester Vi", href: "/saadan-tester-vi-casinoer" },
    ],
    fullContent: `<h2>Hvad er RNG?</h2><p><strong>RNG</strong> står for Random Number Generator og er algoritmen der styrer alle udfald i online casinospil. Det er fundamentet for fair <a href="/casinospil/spillemaskiner" class="text-primary hover:underline">spillemaskiner</a>, <a href="/casinospil/blackjack" class="text-primary hover:underline">blackjack</a> og <a href="/casinospil/roulette" class="text-primary hover:underline">roulette</a>.</p><h2>Hvordan fungerer det?</h2><ol><li>Algoritmen starter med en seed-værdi</li><li>Genererer et nyt tilfældigt tal per spin</li><li>Tallet mappes til et specifikt udfald med en given <a href="/ordbog/rtp" class="text-primary hover:underline">RTP</a></li></ol><h2>Certificering</h2><ul><li><strong>eCOGRA</strong>: Anerkendt af <a href="/spillemyndigheden" class="text-primary hover:underline">Spillemyndigheden</a></li><li><strong>iTech Labs</strong>: Australsk testlaboratorium</li><li><strong>GLI</strong>: En af verdens største</li></ul><h2>Vigtige fakta</h2><ul><li>Hvert spin er <strong>fuldstændig uafhængigt</strong></li><li>Der findes ingen "varme" eller "kolde" maskiner</li><li>Danske casinoer skal have certificeret RNG</li></ul>`,
  },
  {
    slug: "paylines",
    title: "Paylines (Gevinstlinjer)",
    shortDefinition: "Paylines er linjerne på tværs af hjulene, hvor matchende symboler skal lande for at danne en gevinst. Moderne slots kan have 1 til 117.649 gevinstlinjer.",
    metaTitle: "Hvad er Paylines? Gevinstlinjer Forklaret",
    metaDescription: "Forstå paylines: faste linjer, ways-to-win, Megaways og cluster pays. Lær hvordan gevinstlinjer påvirker gevinster.",
    category: "Spillemaskiner",
    relatedTerms: ["wild", "scatter", "rtp"],
    relatedPages: [
      { label: "Bonanza Guide", href: "/casinospil/spillemaskiner/bonanza" },
    ],
    fullContent: `<h2>Hvad er paylines?</h2><p><strong>Paylines</strong> er mønstrene på tværs af hjulene, hvor identiske symboler skaber gevinst. <a href="/ordbog/wild" class="text-primary hover:underline">Wild-symboler</a> kan erstatte andre symboler for at danne gevinstkombinationer.</p><h2>Typer</h2><h3>Faste paylines</h3><p>Fast antal linjer (f.eks. 10, 20). Book of Dead har 10 faste paylines.</p><h3>Ways to Win</h3><p>Matchende symboler på tilstødende hjul. 5×3 grid = 243 ways. Eksempel: Starburst.</p><h3>Megaways</h3><p>Varierende symbolantal per hjul, op til <strong>117.649 gevinstmuligheder</strong>. Eksempler: <a href="/casinospil/spillemaskiner/bonanza" class="text-primary hover:underline">Bonanza</a>, Extra Chilli.</p><h3>Cluster Pays</h3><p>Gevinster dannes ved 5+ identiske symboler i klynge. Eksempler: Reactoonz, Jammin' Jars.</p>`,
  },
  {
    slug: "bonus-runde",
    title: "Bonusrunde",
    shortDefinition: "En bonusrunde er en særlig spillefase der aktiveres af specifikke symbolkombinationer og tilbyder typisk free spins, pick-and-click spil eller multiplikatorer.",
    metaTitle: "Hvad er en Bonusrunde? Bonus Features",
    metaDescription: "Alt om bonusrunder i spillemaskiner: free spins, pick-and-click, gamble features og cascading wins.",
    category: "Spillemaskiner",
    relatedTerms: ["scatter", "free-spins", "multiplikator"],
    relatedPages: [
      { label: "Bonus Buys Guide", href: "/casinospil/spillemaskiner/bonus-buys" },
    ],
    fullContent: `<h2>Hvad er en bonusrunde?</h2><p>En <strong>bonusrunde</strong> er en ekstra spillefase med højere gevinstpotentiale end basisspillet i <a href="/casinospil/spillemaskiner" class="text-primary hover:underline">spillemaskiner</a>.</p><h2>Typer</h2><h3>Free Spins</h3><p>Den mest udbredte bonustype med gratis spins og ekstra funktioner som <a href="/ordbog/multiplikator" class="text-primary hover:underline">multiplikatorer</a>.</p><h3>Pick and Click</h3><p>Vælg mellem skjulte objekter for at afsløre præmier.</p><h3>Cascading/Tumble Wins</h3><p>Vindende symboler forsvinder og erstattes af nye. Bruges i <a href="/casinospil/spillemaskiner/gates-of-olympus" class="text-primary hover:underline">Gates of Olympus</a>.</p><h3>Bonus Buy</h3><p>Køb direkte adgang til bonusrunden mod 50-100x normal indsats. Se vores <a href="/casinospil/spillemaskiner/bonus-buys" class="text-primary hover:underline">bonus buys guide</a>.</p><h2>Udløsere</h2><ul><li>3+ <a href="/ordbog/scatter" class="text-primary hover:underline">scatter-symboler</a></li><li>Specifikke bonussymboler</li><li>Tilfældig trigger</li><li>Bonus Buy</li></ul>`,
  },
  {
    slug: "multiplikator",
    title: "Multiplikator (Multiplier)",
    shortDefinition: "En multiplikator ganger din gevinst med en bestemt faktor. En 5x multiplikator på 100 kr. giver 500 kr. Findes i basisspil og bonusrunder.",
    metaTitle: "Hvad er en Multiplikator? Multiplier Guide",
    metaDescription: "Forstå multiplikatorer i spillemaskiner. Lær hvordan multipliers fungerer i basisspil og free spins.",
    category: "Spillemaskiner",
    relatedTerms: ["wild", "bonus-runde", "free-spins"],
    relatedPages: [
      { label: "Gates of Olympus", href: "/casinospil/spillemaskiner/gates-of-olympus" },
      { label: "Sweet Bonanza", href: "/casinospil/spillemaskiner/sweet-bonanza" },
    ],
    fullContent: `<h2>Hvad er en multiplikator?</h2><p>En <strong>multiplikator</strong> ganger din gevinst med en given faktor i <a href="/casinospil/spillemaskiner" class="text-primary hover:underline">spillemaskiner</a>.</p><h2>Typer</h2><h3>Basis-multiplikator</h3><p>Fast multiplikator for alle gevinster i en funktion.</p><h3>Stigende multiplikator</h3><p>Stiger for hvert cascade-win. Bruges i <a href="/casinospil/spillemaskiner/gates-of-olympus" class="text-primary hover:underline">Gates of Olympus</a>.</p><h3>Tilfældig multiplikator</h3><p>Tildeles tilfældigt, op til 500x i Gates of Olympus.</p><h3><a href="/ordbog/wild" class="text-primary hover:underline">Wild</a> multiplikator</h3><p>Wild-symboler med multiplikator-værdi. To 3x wilds = 9x.</p><h2>I populære slots</h2><ul><li><strong>Gates of Olympus</strong>: Op til 500x multiplikator-orbs</li><li><strong><a href="/casinospil/spillemaskiner/sweet-bonanza" class="text-primary hover:underline">Sweet Bonanza</a></strong>: 2x–100x multiplikator-bolsjer</li><li><strong>Money Train 3</strong>: Persistent multipliers</li></ul>`,
  },
  {
    slug: "max-bet",
    title: "Max Bet",
    shortDefinition: "Max bet er den højeste tilladte indsats per spin. Under bonusspil gælder ofte en max bet-regel — overskridelse kan resultere i tab af bonus.",
    metaTitle: "Hvad er Max Bet? Regler og Begrænsninger",
    metaDescription: "Forstå max bet-regler i online casino. Lær hvordan max bet påvirker bonusser og din spillestrategi.",
    category: "Bonus",
    relatedTerms: ["wagering", "jackpot"],
    relatedPages: [
      { label: "Omsætningskrav", href: "/omsaetningskrav" },
      { label: "Casino Bonus", href: "/casino-bonus" },
    ],
    fullContent: `<h2>Hvad er max bet?</h2><p><strong>Max bet</strong> refererer til den højeste indsats du kan placere per spin.</p><h2>Bonus max bet</h2><p>Under <a href="/ordbog/wagering" class="text-primary hover:underline">bonusomsætning</a> gælder typiske grænser:</p><ul><li>50 kr. per spin (mest almindeligt)</li><li>30 kr. per spin</li><li>10% af bonusbeløbet</li></ul><h2>Konsekvenser ved overskridelse</h2><ul><li>Annullering af alle gevinster</li><li>Fjernelse af <a href="/casino-bonus" class="text-primary hover:underline">bonus</a></li><li>Kontolukning i gentagne tilfælde</li></ul><h2>Max bet og jackpots</h2><p>Visse progressive <a href="/ordbog/jackpot" class="text-primary hover:underline">jackpot</a>-slots kræver max bet for at kvalificere dig til hovedjackpotten.</p>`,
  },
  {
    slug: "autoplay",
    title: "Autoplay",
    shortDefinition: "Autoplay spinner hjulene automatisk et bestemt antal gange med fast indsats. Du kan sætte stop-betingelser som tab-grænse eller gevinst-grænse.",
    metaTitle: "Hvad er Autoplay? Automatisk Spil Guide",
    metaDescription: "Forstå autoplay i spillemaskiner. Lær om stop-betingelser, ansvarligt spil og regulering af automatiske spins.",
    category: "Grundbegreber",
    relatedTerms: ["max-bet", "rng"],
    relatedPages: [
      { label: "Ansvarligt Spil", href: "/ansvarligt-spil" },
    ],
    fullContent: `<h2>Hvad er autoplay?</h2><p><strong>Autoplay</strong> lader dig indstille automatiske spins med din valgte indsats på <a href="/casinospil/spillemaskiner" class="text-primary hover:underline">spillemaskiner</a>.</p><h2>Indstillinger</h2><ul><li>Antal spins: 10, 25, 50, 100</li><li>Tab-grænse</li><li>Gevinst-grænse</li><li>Stop ved <a href="/ordbog/bonus-runde" class="text-primary hover:underline">bonus</a></li></ul><h2>Regulering</h2><ul><li><strong>UK (UKGC)</strong>: Har forbudt autoplay</li><li><strong>Danmark</strong>: Tilladt med stop-betingelser – reguleret af <a href="/spillemyndigheden" class="text-primary hover:underline">Spillemyndigheden</a></li><li><strong>Sverige</strong>: 3-sekunders minimum mellem spins</li></ul><h2>Ansvarligt spil</h2><p>Autoplay kan øge risikoen for problematisk spil. Sæt altid klare grænser og tag pauser. Læs mere om <a href="/ansvarligt-spil" class="text-primary hover:underline">ansvarligt spil</a>.</p>`,
  },
  {
    slug: "hit-frequency",
    title: "Hit Frequency",
    shortDefinition: "Hit frequency angiver, hvor ofte en spillemaskine producerer en gevinst. 25% hit frequency betyder, at hvert fjerde spin i gennemsnit giver gevinst.",
    metaTitle: "Hvad er Hit Frequency? Gevinsthyppighed",
    metaDescription: "Forstå hit frequency i spillemaskiner. Lær forskellen mellem gevinsthyppighed og volatilitet.",
    category: "Grundbegreber",
    relatedTerms: ["volatilitet", "rtp", "paylines"],
    relatedPages: [
      { label: "Høj RTP Slots", href: "/casinospil/spillemaskiner/hoej-rtp" },
    ],
    fullContent: `<h2>Hvad er hit frequency?</h2><p><strong>Hit frequency</strong> er den procentdel af spins der resulterer i en gevinst af enhver størrelse i <a href="/casinospil/spillemaskiner" class="text-primary hover:underline">spillemaskiner</a>.</p><h2>Hit frequency vs. volatilitet</h2><ul><li><strong>Hit frequency</strong>: Hvor <em>ofte</em> du vinder</li><li><strong><a href="/ordbog/volatilitet" class="text-primary hover:underline">Volatilitet</a></strong>: Hvor <em>meget</em> gevinsterne varierer</li></ul><h2>Typiske intervaller</h2><ul><li><strong>Høj (30%+)</strong>: Hyppige, typisk mindre gevinster</li><li><strong>Medium (20–30%)</strong>: Balanceret oplevelse</li><li><strong>Lav (under 20%)</strong>: Sjældne, typisk større gevinster</li></ul><h2>Vigtigt</h2><ul><li>Hit frequency siger <strong>intet om gevinstens størrelse</strong></li><li>Kombinér med <a href="/ordbog/rtp" class="text-primary hover:underline">RTP</a> og volatilitet for det fulde billede</li><li>Oplyses sjældent af spiludviklere</li></ul>`,
  },
];

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}

export function getGlossaryLetters(): string[] {
  const letters = new Set(glossaryTerms.map((t) => t.title[0].toUpperCase()));
  return Array.from(letters).sort((a, b) => a.localeCompare(b, "da"));
}

export function getTermsByLetter(): Record<string, GlossaryTerm[]> {
  const grouped: Record<string, GlossaryTerm[]> = {};
  for (const term of glossaryTerms) {
    const letter = term.title[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(term);
  }
  for (const letter in grouped) {
    grouped[letter].sort((a, b) => a.title.localeCompare(b.title, "da"));
  }
  return grouped;
}

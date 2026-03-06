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
    shortDefinition: "Wagering er det antal gange, du skal omsætte en bonus, før du kan udbetale gevinster. I Danmark er kravet maksimalt 10x. F.eks. 10x wagering på en 1.000 kr. bonus = 10.000 kr. i omsætning.",
    metaTitle: "Hvad er Wagering? Omsætningskrav Forklaret",
    metaDescription: "Forstå wagering og omsætningskrav på casino bonusser. Lær hvordan du beregner det reelle krav og finder bonusser med lave omsætningskrav.",
    category: "Bonus",
    relatedTerms: ["free-spins", "max-bet"],
    relatedPages: [
      { label: "Omsætningskrav Guide", href: "/omsaetningskrav" },
      { label: "Bonus uden Omsætningskrav", href: "/bonus-uden-omsaetningskrav" },
      { label: "Casino Bonus", href: "/casino-bonus" },
    ],
    fullContent: `<h2>Hvad er wagering?</h2><p><strong>Wagering</strong> (også kaldet omsætningskrav) er den betingelse, casinoet sætter for, hvor mange gange du skal omsætte din <a href="/casino-bonus" class="text-primary hover:underline">casino bonus</a>, før du kan udbetale eventuelle gevinster. I Danmark er det maksimale omsætningskrav 10x ifølge lovgivningen.</p><h2>Hvordan beregnes wagering?</h2><ul><li><strong>10x bonus</strong>: 1.000 kr. bonus × 10 = 10.000 kr. i omsætning</li><li><strong>10x (bonus + indbetaling)</strong>: (1.000 kr. + 1.000 kr.) × 10 = 20.000 kr.</li></ul><h2>Expected Value (EV)</h2><p><strong>EV = Bonusbeløb − (Wagering × Bonusbeløb × <a href="/ordbog/house-edge" class="text-primary hover:underline">House Edge</a>)</strong></p><p>Eksempel: 1.000 kr. bonus, 10x wagering, 4% house edge: EV = 1.000 − 400 = <strong>+600 kr.</strong> – klart positiv!</p><h2>Det danske 10x-loft</h2><ul><li><strong>Maksimalt 10x</strong>: Dansk lovgivning begrænser omsætningskrav til max 10x</li><li><strong>Spillervenligt</strong>: Lavere krav = højere EV for spilleren</li><li><strong>Ingen (0x)</strong>: Det bedste – se <a href="/bonus-uden-omsaetningskrav" class="text-primary hover:underline">bonus uden omsætningskrav</a></li></ul><h2>Tips</h2><ul><li>Vælg spil med <strong>høj <a href="/ordbog/rtp" class="text-primary hover:underline">RTP</a></strong></li><li>Tjek om alle spil bidrager 100% til wagering</li><li>Overvej <a href="/no-sticky-bonus" class="text-primary hover:underline">no-sticky bonusser</a></li></ul>`,
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
    fullContent: `<h2>Hvad er free spins?</h2><p><strong>Free spins</strong> refererer til to koncepter:</p><ol><li><strong>In-game free spins</strong>: <a href="/ordbog/bonus-runde" class="text-primary hover:underline">Bonusfunktion</a> i slotten, typisk udløst af <a href="/ordbog/scatter" class="text-primary hover:underline">scatter-symboler</a></li><li><strong>Casino free spins</strong>: Bonus fra casinoet som del af <a href="/velkomstbonus" class="text-primary hover:underline">velkomstpakke</a></li></ol><h2>In-game free spins</h2><p>Aktiveres ved 3+ scatter-symboler. Ekstra funktioner inkluderer expanding <a href="/ordbog/wild" class="text-primary hover:underline">wilds</a>, <a href="/ordbog/multiplikator" class="text-primary hover:underline">multiplikatorer</a>, retriggers og sticky wilds.</p><h2>Casino free spins</h2><ul><li><strong>Velkomstbonus</strong>: F.eks. 100 free spins ved første indbetaling</li><li><strong>No deposit</strong>: Gratis spins uden indbetaling</li><li><strong>Daglige</strong>: Kampagner med gratis spins hver dag – se <a href="/free-spins-i-dag" class="text-primary hover:underline">free spins i dag</a></li></ul><h2>Vigtige vilkår</h2><ul><li><strong><a href="/ordbog/wagering" class="text-primary hover:underline">Omsætningskrav</a></strong>: I Danmark max 10x</li><li><strong>Max gevinst</strong>: Loft på gevinster</li><li><strong>Spin-værdi</strong>: Typisk 1-2 kr. per spin</li></ul>`,
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

  // ═══════════════════════════════════════════════════════════════
  // ── NEW TERMS (batch 2 – 15 additional terms) ──────────────────
  // ═══════════════════════════════════════════════════════════════

  {
    slug: "gamble-feature",
    title: "Gamble Feature",
    shortDefinition: "Gamble feature lader dig fordoble eller mangedoble din gevinst ved at gætte farve eller kulør på et kort. Taber du, mister du hele gevinsten.",
    metaTitle: "Hvad er Gamble Feature? Risikospil Forklaret",
    metaDescription: "Forstå gamble feature i spillemaskiner. Lær hvordan risikospillet fungerer, hvornår det er værd at bruge, og matematikken bag.",
    category: "Spillemaskiner",
    relatedTerms: ["volatilitet", "rtp", "bonus-runde"],
    relatedPages: [
      { label: "Spillemaskiner", href: "/casinospil/spillemaskiner" },
      { label: "Fire Joker Guide", href: "/casinospil/spillemaskiner/fire-joker" },
    ],
    fullContent: `<h2>Hvad er gamble feature?</h2><p><strong>Gamble feature</strong> (risikospil) er en valgfri funktion i mange <a href="/casinospil/spillemaskiner" class="text-primary hover:underline">spillemaskiner</a>, der giver dig mulighed for at sætte din gevinst på spil for at fordoble eller mangedoble den.</p><h2>Typer af gamble feature</h2><h3>Rød/Sort (Card Gamble)</h3><p>Gæt om det næste kort er rødt eller sort. Korrekt svar = 2x gevinst. Forkert = tab af hele gevinsten. Sandsynlighed: 50/50.</p><h3>Kulør-gæt</h3><p>Gæt den præcise kulør (hjerter, ruder, spar, klør). Korrekt = 4x gevinst. Sandsynlighed: 25%.</p><h3>Ladder Gamble</h3><p>Stigespil med stigende præmier. Hver step øger gevinsten, men risikoen stiger tilsvarende.</p><h2>Matematikken</h2><p>Gamble feature er typisk <strong>EV-neutral</strong> (forventet værdi = 0). Med 50/50 odds og 2x multiplikator ændrer det ikke din langsigtede <a href="/ordbog/rtp" class="text-primary hover:underline">RTP</a> – men det øger <a href="/ordbog/volatilitet" class="text-primary hover:underline">volatiliteten</a> dramatisk.</p><h2>Populære slots med gamble feature</h2><ul><li><strong><a href="/casinospil/spillemaskiner/fire-joker" class="text-primary hover:underline">Fire Joker</a></strong>: Hjul-baseret gamble</li><li><strong>Book of Dead</strong>: Klassisk rød/sort</li><li><strong><a href="/casinospil/spillemaskiner/dead-or-alive-2" class="text-primary hover:underline">Dead or Alive 2</a></strong>: Card gamble</li></ul><h2>Under bonusspil</h2><p>De fleste casinoer deaktiverer gamble feature under <a href="/ordbog/wagering" class="text-primary hover:underline">bonusomsætning</a>. Tjek altid casinoets bonusvilkår, da brug af gamble under aktiv bonus kan resultere i annullering af gevinster.</p>`,
  },
  {
    slug: "cascading-wins",
    title: "Cascading Wins (Tumble)",
    shortDefinition: "Cascading wins (også kaldet tumble, avalanche eller cascade) fjerner vindende symboler og lader nye falde ned, hvilket kan skabe kædegevinster fra ét spin.",
    metaTitle: "Hvad er Cascading Wins? Tumble Mekanik",
    metaDescription: "Forstå cascading wins og tumble-mekanikken i spillemaskiner. Lær hvordan kædegevinster fungerer i Gates of Olympus, Sweet Bonanza og andre populære slots.",
    category: "Spillemaskiner",
    relatedTerms: ["multiplikator", "bonus-runde", "cluster-pays"],
    relatedPages: [
      { label: "Gates of Olympus", href: "/casinospil/spillemaskiner/gates-of-olympus" },
      { label: "Sweet Bonanza", href: "/casinospil/spillemaskiner/sweet-bonanza" },
    ],
    fullContent: `<h2>Hvad er cascading wins?</h2><p><strong>Cascading wins</strong> er en spillemekanik, hvor vindende symboler fjernes fra <a href="/casinospil/spillemaskiner" class="text-primary hover:underline">spillemaskinens</a> grid, og nye symboler falder ned ovenfra for at fylde de tomme pladser. Hvis de nye symboler danner en ny gevinst, gentages processen – alt fra ét enkelt spin.</p><h2>Forskellige navne</h2><ul><li><strong>Tumble</strong>: Brugt af Pragmatic Play (<a href="/casinospil/spillemaskiner/gates-of-olympus" class="text-primary hover:underline">Gates of Olympus</a>, <a href="/casinospil/spillemaskiner/sweet-bonanza" class="text-primary hover:underline">Sweet Bonanza</a>)</li><li><strong>Avalanche</strong>: NetEnts betegnelse (<a href="/casinospil/spillemaskiner/gonzos-quest" class="text-primary hover:underline">Gonzo's Quest</a>)</li><li><strong>Cascade</strong>: <a href="/spiludviklere/big-time-gaming" class="text-primary hover:underline">Big Time Gaming</a> (<a href="/casinospil/spillemaskiner/bonanza" class="text-primary hover:underline">Bonanza</a>)</li><li><strong>Reactions</strong>: Play'n GO (<a href="/casinospil/spillemaskiner/reactoonz" class="text-primary hover:underline">Reactoonz</a>)</li></ul><h2>Cascading wins + multiplikatorer</h2><p>Mange slots kombinerer cascading wins med stigende <a href="/ordbog/multiplikator" class="text-primary hover:underline">multiplikatorer</a>. I Gates of Olympus stiger multiplikatoren for hvert cascade, hvilket kan resultere i massive gevinster fra et enkelt spin.</p><h2>Fordele ved mekanikken</h2><ul><li>Flere gevinster fra ét spin uden ekstra indsats</li><li>Typisk højere <a href="/ordbog/hit-frequency" class="text-primary hover:underline">hit frequency</a> end traditionelle slots</li><li>Visuelt tilfredsstillende kædeeffekter</li></ul>`,
  },
  {
    slug: "megaways",
    title: "Megaways",
    shortDefinition: "Megaways er en patenteret spillemekanik fra Big Time Gaming med varierende antal symboler per hjul, der skaber op til 117.649 gevinstmuligheder per spin.",
    metaTitle: "Hvad er Megaways? Op til 117.649 Ways",
    metaDescription: "Alt om Megaways-mekanikken: hvordan den fungerer, de bedste Megaways slots og forskellen fra faste paylines.",
    category: "Spillemaskiner",
    relatedTerms: ["paylines", "cascading-wins", "volatilitet"],
    relatedPages: [
      { label: "Bonanza Guide", href: "/casinospil/spillemaskiner/bonanza" },
      { label: "Spillemaskiner", href: "/casinospil/spillemaskiner" },
      { label: "Big Time Gaming", href: "/spiludviklere/big-time-gaming" },
    ],
    fullContent: `<h2>Hvad er Megaways?</h2><p><strong>Megaways</strong> er en patenteret spillemekanik udviklet af <a href="/spiludviklere/big-time-gaming" class="text-primary hover:underline">Big Time Gaming</a> (BTG). I stedet for faste <a href="/ordbog/paylines" class="text-primary hover:underline">gevinstlinjer</a> varierer antallet af symboler per hjul fra spin til spin – typisk 2-7 symboler per hjul – hvilket skaber op til <strong>117.649 gevinstmuligheder</strong>.</p><h2>Beregningen</h2><p>Megaways beregnes ved at multiplicere symbolantallet på hvert hjul: 7×7×7×7×7×7 = 117.649 ways to win. Hvert spin er unikt.</p><h2>Nøglefunktioner</h2><ul><li><strong>Varierende grid</strong>: Hjulstørrelsen ændrer sig per spin</li><li><strong>Ekstra hjul</strong>: Mange Megaways-slots har et vandret tophjul</li><li><strong>Cascading wins</strong>: Næsten alle Megaways-slots bruger <a href="/ordbog/cascading-wins" class="text-primary hover:underline">cascading wins</a></li></ul><h2>Populære Megaways-slots</h2><ul><li><strong><a href="/casinospil/spillemaskiner/bonanza" class="text-primary hover:underline">Bonanza Megaways</a></strong>: Den originale Megaways-slot (BTG)</li><li><strong><a href="/casinospil/spillemaskiner/extra-chilli-megaways" class="text-primary hover:underline">Extra Chilli Megaways</a></strong>: BTG med gamble-funktion</li><li><strong><a href="/casinospil/spillemaskiner/madame-destiny-megaways" class="text-primary hover:underline">Madame Destiny Megaways</a></strong>: Pragmatic Play</li></ul><h2>Megaways og volatilitet</h2><p>Megaways-slots er næsten altid <strong>høj-volatile</strong>. Det store antal gevinstmuligheder lyder tillokkende, men gevinsternes størrelse varierer enormt. Det kræver tålmodighed og god <a href="/ordbog/bankroll-management" class="text-primary hover:underline">bankroll management</a>.</p>`,
  },
  {
    slug: "buy-bonus",
    title: "Buy Bonus (Bonus Buy)",
    shortDefinition: "Buy bonus lader dig købe direkte adgang til en slots bonusrunde – typisk for 60-100x din indsats – uden at vente på scatter-symboler.",
    metaTitle: "Hvad er Buy Bonus? Bonus Buy Forklaret",
    metaDescription: "Forstå buy bonus/bonus buy i spillemaskiner. Lær om priser, EV-beregninger og de bedste bonus buy slots.",
    category: "Spillemaskiner",
    relatedTerms: ["bonus-runde", "scatter", "volatilitet"],
    relatedPages: [
      { label: "Bonus Buys Guide", href: "/casinospil/spillemaskiner/bonus-buys" },
      { label: "Sweet Bonanza", href: "/casinospil/spillemaskiner/sweet-bonanza" },
    ],
    fullContent: `<h2>Hvad er buy bonus?</h2><p><strong>Buy bonus</strong> (også kaldet bonus buy eller feature buy) er en funktion i mange moderne <a href="/casinospil/spillemaskiner" class="text-primary hover:underline">spillemaskiner</a>, der lader dig købe direkte adgang til <a href="/ordbog/bonus-runde" class="text-primary hover:underline">bonusrunden</a> for et fast beløb – typisk 60x til 100x din indsats.</p><h2>Priser for bonus buy</h2><ul><li><strong>60x</strong>: The Dog House, Wolf Gold</li><li><strong>80x</strong>: <a href="/casinospil/spillemaskiner/gates-of-olympus" class="text-primary hover:underline">Gates of Olympus</a></li><li><strong>100x</strong>: <a href="/casinospil/spillemaskiner/sweet-bonanza" class="text-primary hover:underline">Sweet Bonanza</a></li><li><strong>200-500x</strong>: Premium slots med højere max win</li></ul><h2>EV-analyse</h2><p>Buy bonus-prisen er designet til at matche den <strong>gennemsnitlige bonusværdi</strong>. Det fjerner variansen fra at vente på <a href="/ordbog/scatter" class="text-primary hover:underline">scatter-symboler</a>, men ændrer ikke den langsigtede <a href="/ordbog/rtp" class="text-primary hover:underline">RTP</a>. Nogle slots har endda en lidt højere RTP ved buy bonus.</p><h2>Regulering</h2><ul><li><strong>UK</strong>: Buy bonus er forbudt af UKGC</li><li><strong>Danmark</strong>: Tilladt under <a href="/spillemyndigheden" class="text-primary hover:underline">Spillemyndighedens</a> regulering</li><li><strong>Sverige</strong>: Forbudt siden 2022</li></ul><h2>Se vores guide</h2><p>For en komplet liste og analyse af de bedste bonus buy slots, se vores <a href="/casinospil/spillemaskiner/bonus-buys" class="text-primary hover:underline">bonus buys guide</a>.</p>`,
  },
  {
    slug: "sticky-bonus-term",
    title: "Sticky Bonus",
    shortDefinition: "En sticky bonus sammenblander din indbetaling og bonusmidler til én saldo. Du kan spille med det fulde beløb, men bonusdelen kan ikke udbetales – kun gevinster over bonusbeløbet.",
    metaTitle: "Hvad er Sticky Bonus? Bonustype Forklaret",
    metaDescription: "Forstå sticky bonus i online casino. Lær forskellen mellem sticky og no-sticky bonus og hvordan det påvirker din EV.",
    category: "Bonus",
    relatedTerms: ["wagering", "max-bet", "free-spins"],
    relatedPages: [
      { label: "Sticky Bonus Guide", href: "/sticky-bonus" },
      { label: "No-Sticky Bonus", href: "/no-sticky-bonus" },
      { label: "Casino Bonus", href: "/casino-bonus" },
    ],
    fullContent: `<h2>Hvad er sticky bonus?</h2><p>En <strong>sticky bonus</strong> sammenblander din indbetaling og bonusmidler til én samlet saldo. Du kan spille med det fulde beløb fra start, men bonusdelen kan aldrig udbetales – kun gevinster <em>over</em> bonusbeløbet, efter <a href="/ordbog/wagering" class="text-primary hover:underline">omsætningskravet</a> er opfyldt.</p><h2>Sticky vs. no-sticky</h2><ul><li><strong>Sticky</strong>: Bonus + indbetaling i én pulje. Bonus fjernes ved udbetaling.</li><li><strong><a href="/no-sticky-bonus" class="text-primary hover:underline">No-sticky</a></strong>: Din indbetaling holdes adskilt. Du kan udbetale indbetalingen når som helst.</li></ul><h2>EV-beregning for sticky bonus</h2><p>Med en 1.000 kr. sticky bonus (10x wagering, 4% <a href="/ordbog/house-edge" class="text-primary hover:underline">house edge</a>):</p><p><strong>EV = 1.000 − (10.000 × 0,04) − 1.000 = −400 kr.</strong></p><p>Sticky bonusser har lavere EV end no-sticky, fordi bonusbeløbet fratrækkes ved udbetaling.</p><h2>Hvornår er sticky bonus værd at tage?</h2><ul><li>Ved lav wagering (dansk 10x-loft)</li><li>Når bonusbeløbet er stort relativt til indbetalingen</li><li>Når du spiller slots med høj <a href="/ordbog/rtp" class="text-primary hover:underline">RTP</a></li></ul><p>Læs vores komplette <a href="/sticky-bonus" class="text-primary hover:underline">sticky bonus guide</a> for dybdegående analyse.</p>`,
  },
  {
    slug: "bankroll-management",
    title: "Bankroll Management",
    shortDefinition: "Bankroll management er strategisk styring af dit spillebudget – at sætte grænser for indsats, tab og sessioner for at forlænge din spilletid og minimere risikoen for tab.",
    metaTitle: "Hvad er Bankroll Management? Budgetstyring",
    metaDescription: "Lær bankroll management til casino: sessionsbudget, indsatsstørrelser, stop-loss og de vigtigste regler for ansvarligt budgetspil.",
    category: "Grundbegreber",
    relatedTerms: ["volatilitet", "max-bet", "hit-frequency"],
    relatedPages: [
      { label: "Ansvarligt Spil", href: "/ansvarligt-spil" },
      { label: "Spillemaskiner", href: "/casinospil/spillemaskiner" },
    ],
    fullContent: `<h2>Hvad er bankroll management?</h2><p><strong>Bankroll management</strong> handler om at styre dit casinobudget disciplineret – så du spiller inden for dine rammer og minimerer risikoen for at tabe mere, end du kan tåle.</p><h2>Grundregler</h2><ul><li><strong>Fastlæg et samlet budget</strong>: Aldrig spil for penge, du ikke har råd til at tabe</li><li><strong>Sessionsbudget</strong>: Del dit budget i separate sessioner</li><li><strong>Indsatsgrænse</strong>: Max 1-2% af dit samlede bankroll per spin</li><li><strong>Stop-loss</strong>: Stop når du har tabt dit sessionsbudget</li><li><strong>Gevinstgrænse</strong>: Overvej at stoppe efter en stor gevinst</li></ul><h2>Bankroll efter volatilitet</h2><p>Din bankroll skal matche spillets <a href="/ordbog/volatilitet" class="text-primary hover:underline">volatilitet</a>:</p><ul><li><strong>Lav volatilitet</strong>: 50-100 spins i bankroll er tilstrækkeligt</li><li><strong>Medium volatilitet</strong>: 150-300 spins anbefales</li><li><strong>Høj volatilitet</strong>: Minimum 300-500 spins for at overleve tørkeperioder</li></ul><h2>Under bonusspil</h2><p>Under <a href="/ordbog/wagering" class="text-primary hover:underline">bonusomsætning</a> er bankroll management endnu vigtigere. Overhold altid <a href="/ordbog/max-bet" class="text-primary hover:underline">max bet</a>-reglerne og vælg slots med høj <a href="/ordbog/rtp" class="text-primary hover:underline">RTP</a> for at maksimere din EV.</p><h2>Ansvarligt spil</h2><p>Bankroll management er fundamentet for <a href="/ansvarligt-spil" class="text-primary hover:underline">ansvarligt spil</a>. Benyt ROFUS eller casinoets egne grænseværktøjer, hvis du har svært ved at overholde dine grænser.</p>`,
  },
  {
    slug: "progressiv-jackpot",
    title: "Progressiv Jackpot",
    shortDefinition: "En progressiv jackpot vokser løbende med en andel af hver indsats på tværs af spillere og casinoer, indtil én heldig spiller vinder hele puljen.",
    metaTitle: "Hvad er en Progressiv Jackpot? Milliongevinster",
    metaDescription: "Forstå progressive jackpots: netværk, standalone og lokale jackpots. Lær oddssene og de største gevinster nogensinde.",
    category: "Grundbegreber",
    relatedTerms: ["jackpot", "rtp", "volatilitet"],
    relatedPages: [
      { label: "Mega Moolah Guide", href: "/casinospil/spillemaskiner/mega-moolah" },
      { label: "Divine Fortune", href: "/casinospil/spillemaskiner/divine-fortune" },
    ],
    fullContent: `<h2>Hvad er en progressiv jackpot?</h2><p>En <strong>progressiv jackpot</strong> er en voksende præmiepulje, der øges med en lille procentdel af <em>hver indsats</em> fra alle spillere. I modsætning til en fast <a href="/ordbog/jackpot" class="text-primary hover:underline">jackpot</a> har den progressiva variant ingen øvre grænse – den vokser til den vindes.</p><h2>Tre typer</h2><h3>Standalone progressiv</h3><p>Jackpotten er begrænset til én specifik maskine. Typisk mindre beløb.</p><h3>Lokal progressiv</h3><p>Forbundet på tværs af et enkelt casino. Moderate beløb.</p><h3>Netværks-progressiv</h3><p>Forbundet på tværs af <strong>alle casinoer</strong> der tilbyder spillet. Her opstår milliongevinsterne. Eksempler: <a href="/casinospil/spillemaskiner/mega-moolah" class="text-primary hover:underline">Mega Moolah</a> (Microgaming-netværk).</p><h2>Rekordgevinster</h2><ul><li><strong>Mega Moolah</strong>: €21,7 millioner (2021)</li><li><strong>Mega Fortune</strong>: €17,8 millioner (2013)</li><li><strong>Arabian Nights</strong>: €8,6 millioner</li></ul><h2>RTP-konsekvenser</h2><p>Progressive slots har lavere base <a href="/ordbog/rtp" class="text-primary hover:underline">RTP</a>, fordi en del af indsatsen bidrager til jackpot-puljen. Mega Moolah har kun 88,12% RTP. Det er prisen for drømmen om milliongevinsten.</p>`,
  },
  {
    slug: "gevinstprocent",
    title: "Gevinstprocent",
    shortDefinition: "Gevinstprocent er et mål for hvor stor en del af dine spins der resulterer i gevinst. Ofte forvekslet med RTP, men de to begreber er fundamentalt forskellige.",
    metaTitle: "Hvad er Gevinstprocent? Forskellen fra RTP",
    metaDescription: "Forstå gevinstprocent vs. RTP i spillemaskiner. Lær hvorfor en høj gevinstprocent ikke nødvendigvis betyder bedre odds.",
    category: "Grundbegreber",
    relatedTerms: ["rtp", "hit-frequency", "volatilitet"],
    relatedPages: [
      { label: "Høj RTP Slots", href: "/casinospil/spillemaskiner/hoej-rtp" },
      { label: "Spillemaskiner", href: "/casinospil/spillemaskiner" },
    ],
    fullContent: `<h2>Hvad er gevinstprocent?</h2><p><strong>Gevinstprocent</strong> (win rate) angiver, hvor stor en andel af dine spins der resulterer i en gevinst – uanset gevinstens størrelse. Det er beslægtet med <a href="/ordbog/hit-frequency" class="text-primary hover:underline">hit frequency</a>, men bruges ofte i en bredere kontekst.</p><h2>Gevinstprocent vs. RTP</h2><p>De to begreber forveksles ofte, men er fundamentalt forskellige:</p><ul><li><strong>Gevinstprocent</strong>: Hvor <em>ofte</em> du vinder (f.eks. 35% af spins)</li><li><strong><a href="/ordbog/rtp" class="text-primary hover:underline">RTP</a></strong>: Hvor <em>meget</em> der returneres over tid (f.eks. 96% af indsats)</li></ul><h2>Eksempel</h2><p>En slot kan have 35% gevinstprocent men kun 94% RTP – fordi de fleste gevinster er under din indsats. Omvendt kan en slot med 20% gevinstprocent have 97% RTP, fordi gevinsterne er større.</p><h2>Gevinstprocent og volatilitet</h2><ul><li><strong>Lav <a href="/ordbog/volatilitet" class="text-primary hover:underline">volatilitet</a></strong>: Høj gevinstprocent (30-40%)</li><li><strong>Høj volatilitet</strong>: Lav gevinstprocent (15-25%)</li></ul><h2>Praktisk anvendelse</h2><p>Gevinstprocenten er mest relevant for din <strong>spiloplevelse</strong>, mens RTP er vigtigst for din <strong>langsigtede økonomi</strong>. Til <a href="/ordbog/wagering" class="text-primary hover:underline">bonusomsætning</a> er høj RTP vigtigere end høj gevinstprocent.</p>`,
  },
  {
    slug: "minimum-indbetaling",
    title: "Minimum Indbetaling",
    shortDefinition: "Minimum indbetaling er det laveste beløb et casino kræver for at gennemføre en indbetaling. I Danmark er det typisk 50-100 kr. afhængigt af betalingsmetode.",
    metaTitle: "Hvad er Minimum Indbetaling? Casino Guide",
    metaDescription: "Forstå minimum indbetaling på danske casinoer. Sammenlign krav på tværs af betalingsmetoder og find casinoer med lav min. indbetaling.",
    category: "Bonus",
    relatedTerms: ["wagering", "max-bet"],
    relatedPages: [
      { label: "Betalingsmetoder", href: "/betalingsmetoder" },
      { label: "Casino Bonus", href: "/casino-bonus" },
      { label: "Nye Casinoer", href: "/nye-casinoer" },
    ],
    fullContent: `<h2>Hvad er minimum indbetaling?</h2><p><strong>Minimum indbetaling</strong> (min. deposit) er det laveste beløb, et online casino accepterer som indbetaling. Det varierer efter casino og <a href="/betalingsmetoder" class="text-primary hover:underline">betalingsmetode</a>.</p><h2>Typiske grænser i Danmark</h2><ul><li><strong><a href="/betalingsmetoder/mobilepay" class="text-primary hover:underline">MobilePay</a></strong>: 50-100 kr.</li><li><strong>Visa/Mastercard</strong>: 50-100 kr.</li><li><strong><a href="/betalingsmetoder/trustly" class="text-primary hover:underline">Trustly</a></strong>: 100 kr.</li><li><strong>Bankoverførsel</strong>: 100-200 kr.</li></ul><h2>Minimum indbetaling og bonus</h2><p>For at kvalificere til en <a href="/velkomstbonus" class="text-primary hover:underline">velkomstbonus</a> kræver de fleste casinoer typisk 100 kr. som minimumsbeløb. Tjek altid bonusvilkårene – nogle casinoer kræver højere indbetaling for at udløse den fulde bonus.</p><h2>Tips til lav indbetaling</h2><ul><li>Vælg casinoer med 50 kr. minimum for at teste platformen</li><li>Husk at <a href="/ordbog/wagering" class="text-primary hover:underline">omsætningskrav</a> gælder for bonusdelen</li><li>Overvej <a href="/bonus-uden-indbetaling" class="text-primary hover:underline">bonus uden indbetaling</a> for risikofri test</li></ul>`,
  },
  {
    slug: "kyc",
    title: "KYC (Know Your Customer)",
    shortDefinition: "KYC er den verifikationsproces casinoer bruger til at bekræfte din identitet – typisk via ID-dokumenter, adressebevis og betalingsverifikation.",
    metaTitle: "Hvad er KYC? Casino Verifikation Forklaret",
    metaDescription: "Forstå KYC-processen på online casinoer. Lær hvilke dokumenter der kræves, hvor lang tid det tager, og hvorfor det er påkrævet.",
    category: "Teknisk",
    relatedTerms: ["rng", "mitid-casino"],
    relatedPages: [
      { label: "Spillemyndigheden", href: "/spillemyndigheden" },
      { label: "Casino Licenser", href: "/casino-licenser" },
      { label: "Ansvarligt Spil", href: "/ansvarligt-spil" },
    ],
    fullContent: `<h2>Hvad er KYC?</h2><p><strong>KYC</strong> (Know Your Customer) er den lovpligtige identitetsverifikation, som alle licenserede casinoer skal udføre. Det sikrer, at spilleren er den, de udgiver sig for at være, og er et centralt element i anti-hvidvask (AML) og <a href="/ansvarligt-spil" class="text-primary hover:underline">ansvarligt spil</a>.</p><h2>KYC-processen</h2><ol><li><strong>Identitetsbevis</strong>: Pas, kørekort eller MitID-verifikation</li><li><strong>Adressebevis</strong>: Elregning, kontoudtog (max 3 måneder gammel)</li><li><strong>Betalingsverifikation</strong>: Foto af betalingskort (med skjulte cifre) eller screenshot af e-wallet</li></ol><h2>KYC i Danmark</h2><p>Danske casinoer med licens fra <a href="/spillemyndigheden" class="text-primary hover:underline">Spillemyndigheden</a> bruger <a href="/ordbog/mitid-casino" class="text-primary hover:underline">MitID</a> til automatisk verifikation. Det gør processen hurtigere end i andre lande, da MitID bekræfter identitet, alder og ROFUS-status i ét step.</p><h2>Hvornår kræves KYC?</h2><ul><li>Ved registrering (altid i Danmark pga. MitID)</li><li>Ved første udbetaling</li><li>Ved store transaktioner (AML-regulering)</li><li>Ved mistanke om svindel</li></ul><h2>Tip til hurtig KYC</h2><p>Indsend dokumenter med god belysning og skarp opløsning. Ufuldstændige dokumenter forsinker processen med 24-72 timer.</p>`,
  },
  {
    slug: "mitid-casino",
    title: "MitID Casino",
    shortDefinition: "MitID er Danmarks digitale identitetsløsning, der bruges til at verificere din identitet når du registrerer dig på et dansk online casino med Spillemyndighedens licens.",
    metaTitle: "MitID Casino – Digital ID Verifikation",
    metaDescription: "Forstå MitID til casino: hvordan verifikationen fungerer, hvorfor det kræves, og sammenhængen med ROFUS og dansk casinolovgivning.",
    category: "Teknisk",
    relatedTerms: ["kyc", "rng"],
    relatedPages: [
      { label: "Nye Casinoer med MitID", href: "/nye-casinoer/mitid" },
      { label: "Spillemyndigheden", href: "/spillemyndigheden" },
      { label: "Casino Licenser", href: "/casino-licenser" },
    ],
    fullContent: `<h2>Hvad er MitID casino?</h2><p><strong>MitID</strong> er Danmarks nationale digitale identitetsløsning, der erstattede NemID i 2022. Alle danske casinoer med licens fra <a href="/spillemyndigheden" class="text-primary hover:underline">Spillemyndigheden</a> er forpligtet til at verificere spillere via MitID ved registrering.</p><h2>Sådan fungerer MitID-verifikation</h2><ol><li>Du klikker "Opret konto" på casinoet</li><li>Du viderestilles til MitID-login</li><li>Godkend med MitID-appen eller kodeviser</li><li>Casinoet modtager bekræftelse af identitet + alder + CPR</li><li>ROFUS-status tjekkes automatisk</li></ol><h2>Hvad verificerer MitID?</h2><ul><li><strong>Identitet</strong>: Fuldt navn og CPR-nummer</li><li><strong>Alder</strong>: Bekræftelse af 18+ (lovkrav)</li><li><strong>ROFUS</strong>: Automatisk kontrol af selvudelukkelsesstatus</li></ul><h2>MitID og betalingsmetoder</h2><p>MitID bruges også til at godkende <a href="/betalingsmetoder/trustly" class="text-primary hover:underline">Trustly</a>-betalinger direkte fra din bank. <a href="/betalingsmetoder/mobilepay" class="text-primary hover:underline">MobilePay</a> og kortbetalinger kræver separat godkendelse.</p><h2>Find MitID-casinoer</h2><p>Se vores oversigt over <a href="/nye-casinoer/mitid" class="text-primary hover:underline">nye casinoer med MitID</a> for en komplet liste.</p>`,
  },
  {
    slug: "gamification",
    title: "Gamification",
    shortDefinition: "Gamification i online casino bruger spilelementer som XP-point, niveauer, missioner og trofæer til at øge engagement og belønne loyalitet.",
    metaTitle: "Hvad er Gamification? Casino Spiloplevelser",
    metaDescription: "Forstå gamification i online casino: VIP-niveauer, daglige missioner, trofæer og hvordan det påvirker din spiloplevelse.",
    category: "Grundbegreber",
    relatedTerms: ["autoplay", "bankroll-management"],
    relatedPages: [
      { label: "Casino Anmeldelser", href: "/casino-anmeldelser" },
      { label: "Nye Casinoer", href: "/nye-casinoer" },
    ],
    fullContent: `<h2>Hvad er gamification?</h2><p><strong>Gamification</strong> er brugen af spilelementer i kontekster uden for traditionelle spil. I online casinoer bruges det til at øge engagement, belønne loyalitet og skabe en mere underholdende spiloplevelse.</p><h2>Gamification-elementer i casinoer</h2><h3>XP og niveausystemer</h3><p>Optjen erfaringspoint (XP) for hvert spin og stig i niveau. Højere niveauer giver bedre belønninger. Mange <a href="/nye-casinoer" class="text-primary hover:underline">nye casinoer</a> bruger dette system.</p><h3>Daglige missioner</h3><p>Udfør opgaver (f.eks. "Spil 50 spins på en bestemt slot") for at modtage <a href="/ordbog/free-spins" class="text-primary hover:underline">free spins</a> eller bonuspenge.</p><h3>Trofæer og achievements</h3><p>Saml trofæer for milepæle som "Første stor gevinst" eller "100 bonusrunder".</p><h3>Turneringer og leaderboards</h3><p>Konkurrér mod andre spillere om pladsen på ranglisten med præmier til de bedste.</p><h2>Gamification og ansvarligt spil</h2><p>Gamification er designet til at holde spillere engagerede – hvilket kan være problematisk. Vær opmærksom på, om gamification-elementer påvirker dine spillevaner negativt. Sæt klare grænser via <a href="/ansvarligt-spil" class="text-primary hover:underline">ansvarligt spil</a>-værktøjer og overhold din <a href="/ordbog/bankroll-management" class="text-primary hover:underline">bankroll management</a> plan.</p>`,
  },
  {
    slug: "retrigger",
    title: "Retrigger",
    shortDefinition: "En retrigger sker når scatter-symboler lander under en igangværende bonusrunde og tilføjer ekstra free spins oven i de eksisterende.",
    metaTitle: "Hvad er Retrigger? Ekstra Free Spins",
    metaDescription: "Forstå retriggers i spillemaskiner. Lær hvordan du får ekstra free spins under bonusrunden og hvilke slots der tillader retriggers.",
    category: "Spillemaskiner",
    relatedTerms: ["scatter", "free-spins", "bonus-runde"],
    relatedPages: [
      { label: "Book of Dead", href: "/casinospil/spillemaskiner/book-of-dead" },
      { label: "Spillemaskiner", href: "/casinospil/spillemaskiner" },
    ],
    fullContent: `<h2>Hvad er en retrigger?</h2><p>En <strong>retrigger</strong> sker, når du lander det krævede antal <a href="/ordbog/scatter" class="text-primary hover:underline">scatter-symboler</a> under en allerede aktiv <a href="/ordbog/bonus-runde" class="text-primary hover:underline">bonusrunde</a>. Resultatet er typisk ekstra <a href="/ordbog/free-spins" class="text-primary hover:underline">free spins</a> oven i de resterende.</p><h2>Hvordan retrigger fungerer</h2><ol><li>Du aktiverer bonusrunden (f.eks. 10 free spins)</li><li>Under free spins lander 3+ scatters igen</li><li>Du modtager yderligere free spins (f.eks. +10)</li><li>Nu har du resterende + 10 nye free spins</li></ol><h2>Retrigger-begrænsninger</h2><ul><li>Mange slots sætter et <strong>loft</strong> på antal retriggers (typisk 1-3)</li><li>Nogle slots begrænser det samlede antal free spins (f.eks. max 100)</li><li>Andre har <strong>ubegrænsede retriggers</strong> – det er her de episke gevinster opstår</li></ul><h2>Slots med gode retriggers</h2><ul><li><strong><a href="/casinospil/spillemaskiner/book-of-dead" class="text-primary hover:underline">Book of Dead</a></strong>: Retrigger med expanding <a href="/ordbog/wild" class="text-primary hover:underline">wild</a></li><li><strong><a href="/casinospil/spillemaskiner/dead-or-alive-2" class="text-primary hover:underline">Dead or Alive 2</a></strong>: Retrigger med sticky wilds</li><li><strong><a href="/casinospil/spillemaskiner/legacy-of-dead" class="text-primary hover:underline">Legacy of Dead</a></strong>: Flere expanding symboler ved retrigger</li></ul>`,
  },
  {
    slug: "cluster-pays",
    title: "Cluster Pays",
    shortDefinition: "Cluster pays er en gevinstmekanik hvor matchende symboler i en klynge (typisk 5+) danner gevinst – uden faste gevinstlinjer.",
    metaTitle: "Hvad er Cluster Pays? Klynge-Gevinster",
    metaDescription: "Forstå cluster pays mekanikken i spillemaskiner. Lær hvordan klyngegevinster fungerer og find de bedste cluster pays slots.",
    category: "Spillemaskiner",
    relatedTerms: ["paylines", "cascading-wins", "multiplikator"],
    relatedPages: [
      { label: "Reactoonz Guide", href: "/casinospil/spillemaskiner/reactoonz" },
      { label: "Jammin' Jars Guide", href: "/casinospil/spillemaskiner/jammin-jars" },
    ],
    fullContent: `<h2>Hvad er cluster pays?</h2><p><strong>Cluster pays</strong> er en gevinstmekanik i <a href="/casinospil/spillemaskiner" class="text-primary hover:underline">spillemaskiner</a>, hvor gevinster dannes ved at samle mindst 5 identiske symboler i en sammenhængende klynge – vandret eller lodret. Der er ingen faste <a href="/ordbog/paylines" class="text-primary hover:underline">gevinstlinjer</a>.</p><h2>Større klynger = større gevinster</h2><ul><li><strong>5 symboler</strong>: Minimum gevinst</li><li><strong>8-10 symboler</strong>: Markant højere udbetaling</li><li><strong>15+ symboler</strong>: Massive gevinster</li></ul><h2>Cluster pays + cascading wins</h2><p>De fleste cluster pays slots kombinerer mekanikken med <a href="/ordbog/cascading-wins" class="text-primary hover:underline">cascading wins</a>. Vindende klynger fjernes, nye symboler falder ned, og nye klynger kan dannes – alt fra ét spin.</p><h2>Populære cluster pays slots</h2><ul><li><strong><a href="/casinospil/spillemaskiner/reactoonz" class="text-primary hover:underline">Reactoonz</a></strong>: 7×7 grid med quantum features</li><li><strong><a href="/casinospil/spillemaskiner/jammin-jars" class="text-primary hover:underline">Jammin' Jars</a></strong>: 8×8 grid med roaming wilds</li><li><strong>Sugar Rush</strong>: 7×7 grid med <a href="/ordbog/multiplikator" class="text-primary hover:underline">multiplikatorer</a></li></ul><h2>Cluster pays vs. Megaways</h2><p>Cluster pays bruger grid-baserede gevinster (typisk 7×7 eller 8×8), mens <a href="/ordbog/megaways" class="text-primary hover:underline">Megaways</a> bruger varierende hjulstørrelser. Cluster pays har generelt højere <a href="/ordbog/hit-frequency" class="text-primary hover:underline">hit frequency</a> men lavere max win.</p>`,
  },
  {
    slug: "expanding-wild",
    title: "Expanding Wild",
    shortDefinition: "Et expanding wild er et wild-symbol der udvider sig til at dække hele hjulet når det lander, hvilket skaber langt flere gevinstmuligheder.",
    metaTitle: "Hvad er Expanding Wild? Udvidende Wilds",
    metaDescription: "Forstå expanding wilds i spillemaskiner. Lær hvordan de fungerer i basisspil og free spins, og find de bedste slots med expanding wilds.",
    category: "Spillemaskiner",
    relatedTerms: ["wild", "bonus-runde", "retrigger"],
    relatedPages: [
      { label: "Book of Dead", href: "/casinospil/spillemaskiner/book-of-dead" },
      { label: "Starburst Guide", href: "/casinospil/spillemaskiner/starburst" },
    ],
    fullContent: `<h2>Hvad er expanding wild?</h2><p>Et <strong>expanding wild</strong> er en variant af <a href="/ordbog/wild" class="text-primary hover:underline">wild-symbolet</a>, der udvider sig til at dække <strong>alle positioner på sit hjul</strong> når det lander. Det skaber dramatisk flere gevinstmuligheder end et standard wild.</p><h2>Typer af expanding wilds</h2><h3>Permanent expanding</h3><p>Ekspanderer altid – både i basisspil og <a href="/ordbog/bonus-runde" class="text-primary hover:underline">bonusrunde</a>. Eksempel: <a href="/casinospil/spillemaskiner/starburst" class="text-primary hover:underline">Starburst</a>.</p><h3>Bonus-only expanding</h3><p>Ekspanderer kun under free spins. Eksempel: <a href="/casinospil/spillemaskiner/book-of-dead" class="text-primary hover:underline">Book of Dead</a> – et tilfældigt symbol vælges som expanding wild under bonusrunden.</p><h3>Betinget expanding</h3><p>Ekspanderer kun under bestemte betingelser (f.eks. ved gevinst).</p><h2>Book of Dead-mekanikken</h2><p>I Book of Dead vælges ét tilfældigt symbol før free spins starter. Når det symbol lander, <strong>ekspanderer det til hele hjulet</strong>. Ved <a href="/ordbog/retrigger" class="text-primary hover:underline">retrigger</a> tilføjes endnu et expanding symbol – multiplicerer gevinstpotentialet.</p><h2>Expanding wild og gevinstlinjer</h2><p>På en slot med 10 <a href="/ordbog/paylines" class="text-primary hover:underline">paylines</a> og et expanding wild på hjul 3 dækkes alle 3 positioner, hvilket potentielt aktiverer alle 10 gevinstlinjer med ét symbol. Det er kernen i Book-serien fra Play'n GO.</p>`,
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

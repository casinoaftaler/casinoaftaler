/**
 * Unique SEO content for each provider slot hub page.
 * Each provider has a unique intro, meta description, and focus keywords.
 */

export interface ProviderHubFaq {
  question: string;
  answer: string;
}

export interface ProviderHubContent {
  /** Display name for titles */
  displayName: string;
  /** SEO title (< 60 chars) */
  seoTitle: string;
  /** Unique meta description (120-155 chars) */
  metaDescription: string;
  /** Unique intro paragraphs (300-500 words) – HTML string */
  introHtml: string;
  /** datePublished for schema */
  datePublished: string;
  /** Provider-specific FAQ items */
  faqs: ProviderHubFaq[];
}

export const PROVIDER_HUB_CONTENT: Record<string, ProviderHubContent> = {
  "pragmatic-play": {
    displayName: "Pragmatic Play",
    seoTitle: "Pragmatic Play Slots – Spillemaskiner, RTP & Statistik",
    metaDescription: "Komplet oversigt over alle Pragmatic Play spillemaskiner med RTP, volatilitet og bonus hunt statistik fra ægte danske streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Pragmatic Play har på rekordtid etableret sig som en af de mest dominerende spiludviklere i den danske online casino-verden. Med et imponerende katalog der spænder fra klassiske frugtmaskiner til avancerede Megaways-titler, leverer Pragmatic Play konsekvent nye spillemaskiner med innovativ gameplay og høj underholdningsværdi.</p>
      <p>Hvad der særligt adskiller Pragmatic Play fra konkurrenterne er deres evne til at skabe slots med bred appel. Titler som <a href="/slot-katalog/sweet-bonanza">Sweet Bonanza</a>, <a href="/slot-katalog/gates-of-olympus">Gates of Olympus</a> og <a href="/slot-katalog/big-bass-bonanza">Big Bass Bonanza</a> er blevet synonyme med moderne online slots. Disse spil kombinerer cluster pays-mekanikker, tumble-features og multipliers på måder der konstant overrasker spillere.</p>
      <p>Fra et dataperspektiv er Pragmatic Play en af de mest testede udviklere i vores bonus hunts. Deres slots optræder hyppigt med høje x-værdier, hvilket afspejler den høje volatilitet mange af deres mest populære titler er kendt for. RTP-niveauerne varierer typisk mellem 94% og 96.5%, med flere titler der tilbyder justerbare RTP-indstillinger afhængigt af casinoet.</p>
      <p>Herunder finder du en komplet, datadrevet oversigt over samtlige Pragmatic Play spillemaskiner i vores database – inklusiv RTP, volatilitet, højeste registrerede gevinst og antal gange hver slot er testet i vores community bonus hunts.</p>
    `,
    faqs: [
      { question: "Hvad er den gennemsnitlige RTP på Pragmatic Play slots?", answer: "Pragmatic Play slots har typisk en RTP mellem 94% og 96.5%. Nogle titler tilbyder justerbare RTP-niveauer afhængigt af casinoet, så det kan variere. Tjek vores tabel ovenfor for den specifikke RTP på hver spillemaskine." },
      { question: "Hvilke Pragmatic Play slots er mest populære?", answer: "De mest populære Pragmatic Play slots baseret på vores bonus hunt data inkluderer Sweet Bonanza, Gates of Olympus og Big Bass Bonanza. Disse slots optræder hyppigst i vores community streams og har leveret nogle af de højeste x-værdier." },
      { question: "Hvad er max win på Pragmatic Play spillemaskiner?", answer: "Max win varierer markant mellem Pragmatic Play titler. Mange af deres populære slots som Gates of Olympus tilbyder op til 5.000x, mens nyere titler som Sweet Bonanza 1000 kan give op til 25.000x indsatsen." },
    ],
  },
  "netent": {
    displayName: "NetEnt",
    seoTitle: "NetEnt Slots – Alle Spillemaskiner, RTP & Statistik",
    metaDescription: "Se alle NetEnt spillemaskiner med detaljeret RTP, volatilitet og bonus hunt data. Komplet katalog med ægte community-statistik.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>NetEnt (Net Entertainment) er en af de mest ikoniske spiludviklere i online casino-historien. Grundlagt i Sverige i 1996 har NetEnt skabt nogle af industriens mest elskede spillemaskiner – fra den revolutionerende <a href="/slot-katalog/starburst">Starburst</a> til den grænsesøgende <a href="/slot-katalog/dead-or-alive-2">Dead or Alive 2</a>.</p>
      <p>NetEnts slots er kendetegnet ved deres polerede grafik, lyddesign i verdensklasse og gennemtænkt matematik. Mange af deres klassikere har RTP-værdier over 96%, hvilket gør dem til favoritter blandt strategiske spillere der prioriterer langsigtet værdi. Volatiliteten varierer fra lav (Starburst) til ekstremt høj (Dead or Alive 2), så der er noget for enhver spillestil.</p>
      <p>Selvom NetEnt nu er en del af Evolution-koncernen, fortsætter brandet med at levere kvalitetstitler. I vores bonus hunt arkiv optræder NetEnt-slots regelmæssigt, og deres performance-data giver et unikt indblik i, hvordan disse velkendte spil klarer sig under reelle spilleforhold med ægte indsatser.</p>
      <p>Nedenfor finder du det komplette NetEnt-katalog med live data fra vores database – perfekt til at sammenligne RTP, volatilitet og faktiske resultater fra hundredvis af bonus hunts.</p>
    `,
    faqs: [
      { question: "Hvad er RTP på NetEnt slots?", answer: "NetEnt er kendt for generelt høje RTP-værdier. Mange af deres klassikere som Starburst (96.09%) og Blood Suckers (98%) ligger over branchegennemsnittet. De fleste NetEnt slots har en RTP mellem 95% og 97%." },
      { question: "Hvad er de mest populære NetEnt spillemaskiner?", answer: "De mest kendte NetEnt slots inkluderer Starburst, Dead or Alive 2, Gonzos Quest og Divine Fortune. I vores bonus hunts er det typisk de high volatility-titler som Dead or Alive 2 der leverer de mest imponerende resultater." },
      { question: "Er NetEnt og Evolution det samme?", answer: "NetEnt blev opkøbt af Evolution Gaming i 2020 og er nu en del af Evolution-koncernen. NetEnt-brandet eksisterer dog stadig som et selvstændigt studie der udgiver nye spillemaskiner under sit eget navn." },
    ],
  },
  "play-n-go": {
    displayName: "Play'n GO",
    seoTitle: "Play'n GO Slots – Spillemaskiner, RTP & Statistik",
    metaDescription: "Komplet liste over Play'n GO spillemaskiner med RTP, volatilitet og bonus hunt resultater. Ægte data fra danske streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Play'n GO har markeret sig som en af de mest produktive og innovative spiludviklere på det danske marked. Med <a href="/slot-katalog/book-of-dead">Book of Dead</a> som deres absolutte flagskib har det svenske studie bevist, at de kan skabe spillemaskiner der kombinerer klassisk tematik med moderne mekanikker.</p>
      <p>Det der gør Play'n GO unik er deres fokus på high volatility slots med book-mekanikken – en formel de har perfektioneret med titler som <a href="/slot-katalog/legacy-of-dead">Legacy of Dead</a>, <a href="/slot-katalog/rise-of-olympus">Rise of Olympus</a> og <a href="/slot-katalog/reactoonz">Reactoonz</a>-serien. Deres grid-baserede slots med cascading wins har defineret en helt ny genre indenfor online spillemaskiner.</p>
      <p>I vores bonus hunt data fremstår Play'n GO som en konsistent performer. Deres slots har typisk RTP-værdier mellem 94% og 96.2%, og volatiliteten er generelt medium til høj. Det betyder, at de kan levere imponerende x-værdier, selvom de også kan have længere tørkeperioder mellem store gevinster.</p>
      <p>Udforsk hele Play'n GO-kataloget nedenfor med ægte statistik fra vores community – inklusiv højeste registrerede multiplikator og antal bonus hunt-optrædener per slot.</p>
    `,
    faqs: [
      { question: "Hvad er RTP på Play'n GO slots?", answer: "Play'n GO slots har typisk en RTP mellem 94% og 96.2%. Book of Dead har fx en RTP på 96.21%, mens nyere titler kan variere. Tjek vores komplette tabel for præcise RTP-værdier per spillemaskine." },
      { question: "Hvilke Play'n GO slots er bedst til bonus hunts?", answer: "Baseret på vores data er Book of Dead, Rise of Olympus og Reactoonz blandt de mest testede Play'n GO slots. Deres høje volatilitet gør dem velegnede til bonus hunts, hvor de kan levere store x-værdier." },
      { question: "Har Play'n GO bonus buy slots?", answer: "Play'n GO har historisk fokuseret på klassiske slot-mekanikker uden bonus buy. Dog har nyere titler i deres katalog introduceret feature-buy muligheder på udvalgte markeder." },
    ],
  },
  "hacksaw-gaming": {
    displayName: "Hacksaw Gaming",
    seoTitle: "Hacksaw Gaming Slots – Spillemaskiner, RTP & Statistik",
    metaDescription: "Alle Hacksaw Gaming slots med RTP, volatilitet og max win-data. Se ægte bonus hunt resultater fra danske community streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Hacksaw Gaming har på kort tid revolutioneret slot-branchen med deres ultra-volatile spillemaskiner og unikke visuelle stil. Det malta-baserede studie er blevet et kultmærke blandt high-risk spillere, der jager de massive x-værdier som Hacksaw-titler er berømte for.</p>
      <p>Med titler som <a href="/slot-katalog/wanted-dead-or-a-wild">Wanted Dead or a Wild</a>, <a href="/slot-katalog/chaos-crew">Chaos Crew</a> og <a href="/slot-katalog/razor-shark">Razor Shark</a> har Hacksaw Gaming skabt en nicheposition som den foretrukne udvikler for ekstrem volatilitet. Deres max win-potentiale ligger typisk mellem 10.000x og 15.000x, hvilket er blandt de højeste i industrien.</p>
      <p>Hacksaws slots er kendetegnet ved et minimalistisk, næsten tegneserie-agtigt design, der prioriterer gameplay-klarhed over visuel kompleksitet. Denne tilgang gør deres spil lette at forstå, selvom mekanikkerne under overfladen kan være overraskende dybe med sticky wilds, expanding symbols og progressive multipliers.</p>
      <p>I vores bonus hunts er Hacksaw Gaming en af de mest spændende udviklere at følge. Herunder kan du se alle deres spillemaskiner med ægte performance-data fra vores live streams.</p>
    `,
    faqs: [
      { question: "Hvad er max win på Hacksaw Gaming slots?", answer: "Hacksaw Gaming er kendt for ekstremt høje max win-potentialer. De fleste af deres slots tilbyder mellem 10.000x og 15.000x indsatsen, med enkelte titler der kan nå endnu højere." },
      { question: "Er Hacksaw Gaming slots high volatility?", answer: "Ja, Hacksaw Gaming er primært kendt for ultra-høj volatilitet. Næsten alle deres spillemaskiner falder i kategorien high til extreme volatility, hvilket betyder sjældnere men potentielt meget store gevinster." },
      { question: "Hvilke Hacksaw Gaming slots er mest populære?", answer: "De mest populære Hacksaw Gaming slots i vores bonus hunts inkluderer Wanted Dead or a Wild, Chaos Crew og Razor Shark. Disse titler optræder hyppigt i streams pga. deres høje underholdningsværdi og extreme gevinstpotentiale." },
    ],
  },
  "big-time-gaming": {
    displayName: "Big Time Gaming",
    seoTitle: "Big Time Gaming Slots – Spillemaskiner, RTP & Statistik",
    metaDescription: "Alle Big Time Gaming spillemaskiner inkl. Megaways-titler. RTP, volatilitet og bonus hunt data fra ægte danske streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Big Time Gaming (BTG) er synonymt med én ting: Megaways. Det australske studie opfandt den banebrydende mekanik i 2016 med <a href="/slot-katalog/bonanza">Bonanza</a>, og har siden licenseret den til næsten alle andre store udviklere. Megaways tilbyder op til 117.649 gevinstlinjer per spin, hvilket fundamentalt ændrede hvordan spillemaskiner fungerer.</p>
      <p>Udover Megaways har BTG introduceret andre innovative features som <a href="/slot-katalog/extra-chilli">Extra Chilli</a>'s Gamble-funktion og den populære "Bonus Buy"-mekanik, der lader spillere købe sig direkte ind i bonusrunden. Deres slots er konsekvent high volatility med max win-potentiale der typisk ligger mellem 20.000x og 50.000x.</p>
      <p>BTGs katalog er ikke det største, men kvaliteten per titel er exceptionel. Hver ny udgivelse bringer typisk en ny twist på Megaways-formlen, og deres tematiske diversitet – fra minedrift (Bonanza) til mexicansk street food (Extra Chilli) – holder kataloget friskt.</p>
      <p>Nedenfor finder du alle Big Time Gaming spillemaskiner i vores database med detaljeret statistik fra vores bonus hunt community.</p>
    `,
    faqs: [
      { question: "Hvad er Megaways mekanikken?", answer: "Megaways er en patenteret mekanik opfundet af Big Time Gaming der tilbyder op til 117.649 gevinstlinjer per spin. Antallet af symboler på hvert hjul varierer tilfældigt per spin, hvilket skaber en dynamisk og uforudsigelig spilleoplevelse." },
      { question: "Hvad er de bedste Big Time Gaming slots?", answer: "De mest populære BTG slots inkluderer Bonanza (den originale Megaways-slot), Extra Chilli, White Rabbit og Rasputin Megaways. I vores bonus hunts er det typisk de høj-volatilitetstitleer der leverer de største x-værdier." },
      { question: "Hvad er max win på Big Time Gaming slots?", answer: "BTG slots har generelt meget høje max win-potentialer, typisk mellem 20.000x og 50.000x indsatsen. Deres fokus på high volatility gameplay betyder at de kan levere exceptionelt store enkeltgevinster." },
    ],
  },
  "microgaming": {
    displayName: "Microgaming",
    seoTitle: "Microgaming Slots – Alle Spillemaskiner, RTP & Statistik",
    metaDescription: "Komplet Microgaming slot-katalog med RTP, volatilitet og jackpot-data. Ægte statistik fra bonus hunts og community streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Microgaming er en af de ældste og mest respekterede spiludviklere i online casino-industrien. Grundlagt i 1994 på Isle of Man har virksomheden leveret tusindvis af spillemaskiner og er især kendt for det ikoniske <a href="/slot-katalog/mega-moolah">Mega Moolah</a> progressive jackpot-netværk, der har udbetalt milliardbeløb til heldige spillere.</p>
      <p>Microgamings styrke ligger i bredden af deres katalog. Fra den mørke vampyr-romantik i <a href="/slot-katalog/immortal-romance">Immortal Romance</a> til den nordiske gudeverden i <a href="/slot-katalog/thunderstruck-ii">Thunderstruck II</a> dækker de praktisk talt enhver tematisk niche. Deres RTP-værdier er generelt konkurrencedygtige, typisk i intervallet 95-96.5%, og volatiliteten varierer fra lav til høj.</p>
      <p>I de seneste år har Microgaming fokuseret på at distribuere spil fra uafhængige partnerstudier under deres platform, hvilket har udvidet kataloget markant. Selvom dette betyder større variation i kvalitet, sikrer det også at der konstant er nye titler at udforske.</p>
      <p>Se alle Microgaming spillemaskiner fra vores database herunder – med bonus hunt data og ægte performance-statistik fra vores community.</p>
    `,
    faqs: [
      { question: "Hvad er Mega Moolah jackpotten?", answer: "Mega Moolah er Microgamings berømte progressive jackpot-slot. Jackpotten er et netværk der deles på tværs af alle casinoer, og den har udbetalt nogle af de største online casino-gevinster i historien, inklusiv rekordbeløb på over 100 millioner kr." },
      { question: "Hvad er RTP på Microgaming slots?", answer: "Microgaming slots har typisk en RTP mellem 95% og 96.5%. Progressive jackpot-slots som Mega Moolah har lavere base-RTP (88.12%) fordi en del af indsatsen bidrager til jackpotten." },
      { question: "Hvilke Microgaming slots er bedst?", answer: "De mest populære Microgaming slots inkluderer Mega Moolah, Immortal Romance, Thunderstruck II og Break da Bank Again. I vores bonus hunts klarer Immortal Romance sig typisk bedst pga. dens høje volatilitet og 4 forskellige bonusrunder." },
    ],
  },
  "nolimit-city": {
    displayName: "Nolimit City",
    seoTitle: "Nolimit City Slots – Spillemaskiner, RTP & Statistik",
    metaDescription: "Alle Nolimit City spillemaskiner med xWays og xBet mekanikker. RTP, volatilitet og max win fra ægte bonus hunt data.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Nolimit City har etableret sig som et af de mest kontroversielle og spændende studier i slot-branchen. Det svenske studie er kendt for sine mørke, provokerende temaer og extremt høje volatilitet, der tiltrækker en dedikeret fanbase af high-risk spillere fra hele verden.</p>
      <p>Med proprietære mekanikker som xWays, xBet og xNudge har Nolimit City skabt et helt eget gameplay-univers. Titler som <a href="/slot-katalog/mental">Mental</a>, <a href="/slot-katalog/san-quentin-xways">San Quentin xWays</a> og <a href="/slot-katalog/tombstone-rip">Tombstone RIP</a> er berømte for deres astronomiske max win-potentiale, der kan nå op til 150.000x indsatsen.</p>
      <p>RTP-niveauerne hos Nolimit City varierer typisk mellem 94% og 96.1%, med nogle titler der tilbyder højere RTP når xBet-funktionen aktiveres. Denne unikke tilgang til risk/reward-balancering gør deres slots til noget helt for sig selv i markedet.</p>
      <p>Udforsk hele Nolimit City-kataloget nedenfor med ægte data fra vores bonus hunts – se hvilke titler der har leveret de højeste x-værdier i vores community.</p>
    `,
    faqs: [
      { question: "Hvad er max win på Nolimit City slots?", answer: "Nolimit City er berømte for extremt høje max win-potentialer. Flere af deres titler tilbyder op til 150.000x indsatsen, og selv deres 'mindre' slots har typisk 30.000-50.000x max win." },
      { question: "Hvad er xWays og xBet mekanikkerne?", answer: "xWays er Nolimit Citys proprietære mekanik der udvider antallet af symboler og gevinstlinjer. xBet lader spillere øge indsatsen med 20-100% for at aktivere ekstra features og forbedre odds for bonusrunder. xNudge tilføjer nudging wilds med stigende multipliers." },
      { question: "Er Nolimit City slots tilgængelige på danske casinoer?", answer: "Ja, Nolimit City slots er tilgængelige på de fleste danske licenserede casinoer. Dog kan xBet-funktionen være deaktiveret på nogle markeder pga. regulering. Tjek din casinoudbyder for tilgængelighed." },
    ],
  },
  "evolution-gaming": {
    displayName: "Evolution",
    seoTitle: "Evolution Slots – Alle Spillemaskiner, RTP & Statistik",
    metaDescription: "Komplet oversigt over Evolution/NetEnt slots med RTP og volatilitet. Bonus hunt statistik fra ægte danske community streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Evolution (tidligere Evolution Gaming) er primært verdenskendt for deres dominans indenfor live casino, men efter opkøbet af NetEnt, Red Tiger og Big Time Gaming har koncernen nu også et massivt slot-katalog. Under Evolution-brandet udgives der nye spillemaskiner der kombinerer live casino-ekspertise med traditionel slot-gameplay.</p>
      <p>Evolutions egne slots fokuserer ofte på innovative gameplay-elementer der trækker på deres live casino-DNA. Dette inkluderer interaktive bonus-features, unikke grid-layouts og multiplier-mekanikker der føles friske sammenlignet med traditionelle slot-formler.</p>
      <p>Med NetEnt, Red Tiger og BTG under samme paraply har Evolution-koncernen adgang til et af branchens bredeste portfolier. Deres slots har typisk solide RTP-værdier og varierende volatilitet, hvilket gør dem tilgængelige for alle typer spillere.</p>
      <p>Herunder finder du alle Evolution-brandede spillemaskiner i vores database, komplet med bonus hunt performance-data og ægte statistik fra vores community streams.</p>
    `,
    faqs: [
      { question: "Laver Evolution også slots?", answer: "Ja, udover deres dominans indenfor live casino udgiver Evolution også spillemaskiner under eget brand. Derudover ejer de NetEnt, Red Tiger Gaming og Big Time Gaming, der alle udgiver slots under deres respektive brands." },
      { question: "Hvad er RTP på Evolution slots?", answer: "Evolution-brandede slots har typisk solide RTP-værdier i intervallet 95-96.5%. Da koncernen også ejer NetEnt og Red Tiger, varierer RTP-niveauerne dog afhængigt af det specifikke studie bag hver titel." },
      { question: "Er Evolution slots tilgængelige i Danmark?", answer: "Ja, Evolution slots er bredt tilgængelige på danske licenserede casinoer. Deres slots understøtter dansk sprog og er tilpasset det danske marked." },
    ],
  },
  "elk-studios": {
    displayName: "ELK Studios",
    seoTitle: "ELK Studios Slots – Spillemaskiner, RTP & Statistik",
    metaDescription: "Se alle ELK Studios spillemaskiner med RTP, volatilitet og bonus hunt data. Ægte performance-statistik fra danske streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>ELK Studios er et svensk spiludvikler-studie der har gjort sig bemærket med deres fokus på mobilvenlig design og matematisk sofistikerede slot-modeller. Siden grundlæggelsen i 2012 har ELK konsekvent leveret spillemaskiner der balancerer visuel kvalitet med gennemtænkt gameplay.</p>
      <p>ELK er især kendt for deres Avalanche-mekanik og innovative bonusstrukturer. Titler som <a href="/slot-katalog/cygnus">Cygnus</a>, <a href="/slot-katalog/katmandu-gold">Katmandu Gold</a> og <a href="/slot-katalog/ecuador-gold">Ecuador Gold</a> har demonstreret studiets evne til at skabe unikke spilleoplevelser med dybe feature-systemer og progressive multipliers.</p>
      <p>RTP-niveauerne hos ELK Studios er generelt høje, typisk mellem 95.5% og 96.3%, med volatilitet der primært falder i medium-high til high kategorien. Deres "Betting Strategies"-feature er unik i branchen og lader spillere automatisere deres indsatsmønstre baseret på forskellige strategier.</p>
      <p>Udforsk alle ELK Studios spillemaskiner nedenfor med ægte data fra vores bonus hunts og community.</p>
    `,
    faqs: [
      { question: "Hvad er ELK Studios Betting Strategies?", answer: "ELK Studios' Betting Strategies er en unik feature der lader spillere vælge automatiske indsatsmønstre. Eksempler inkluderer 'Optimizer' (justerer indsats baseret på saldo) og 'Jumper' (øger indsats efter tab). Det er en valgfri funktion tilgængelig i de fleste ELK slots." },
      { question: "Hvad er RTP på ELK Studios slots?", answer: "ELK Studios tilbyder generelt høje RTP-værdier, typisk mellem 95.5% og 96.3%. Dette placerer dem over branchegennemsnittet og gør deres slots attraktive for spillere der prioriterer langsigtet værdi." },
      { question: "Hvilke ELK Studios slots er mest populære?", answer: "De mest populære ELK Studios slots i vores community inkluderer Cygnus, Katmandu Gold, Ecuador Gold og Kaiju. Deres Gold-serie er særligt velkendt for dybe feature-systemer og progressive multipliers." },
    ],
  },
  "yggdrasil": {
    displayName: "Yggdrasil Gaming",
    seoTitle: "Yggdrasil Slots – Alle Spillemaskiner & Statistik 2026",
    metaDescription: "Alle Yggdrasil spillemaskiner med RTP, volatilitet og max win. Ægte bonus hunt data fra danske community streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Yggdrasil Gaming har siden grundlæggelsen i 2013 markeret sig med visuelt imponerende slots og innovative mekanikker. Det svenske studie, opkaldt efter det nordiske livstræ, har vundet adskillige branchepriser for deres kreative tilgang til spiludvikling og banebrydende HTML5-teknologi.</p>
      <p>Yggdrasils slots er kendetegnet ved cinematisk grafik, 3D-animationer og unikke feature-systemer. Titler som <a href="/slot-katalog/vikings-go-berzerk">Vikings Go Berzerk</a>, <a href="/slot-katalog/valley-of-the-gods">Valley of the Gods</a> og <a href="/slot-katalog/hades-gigablox">Hades – Gigablox</a> viser studiets evne til at forene visuelt imponerende oplevelser med solide matematiske modeller.</p>
      <p>Med introduktionen af Gigablox-mekanikken, der viser kæmpe symboler op til 6x6 på hjulene, har Yggdrasil skabt endnu en distinkt gameplay-oplevelse. RTP-niveauerne ligger typisk mellem 95% og 96.5%, og volatiliteten varierer fra medium til very high.</p>
      <p>Se alle Yggdrasil spillemaskiner i vores katalog nedenfor – med live statistik fra vores bonus hunts og community-data.</p>
    `,
    faqs: [
      { question: "Hvad er Yggdrasil Gigablox?", answer: "Gigablox er Yggdrasils proprietære mekanik der viser kæmpesymboler fra 2x2 op til 6x6 på hjulene. Disse store symboler øger gevinstpotentialet markant og skaber en visuelt imponerende spilleoplevelse." },
      { question: "Hvad er RTP på Yggdrasil slots?", answer: "Yggdrasil slots har typisk en RTP mellem 95% og 96.5%, hvilket er konkurrencedygtigt med andre topudviklere. Volatiliteten varierer bredt fra medium til very high afhængigt af titlen." },
      { question: "Er Yggdrasil slots gode til bonus hunts?", answer: "Ja, især deres high volatility-titler klarer sig godt i bonus hunts. Vikings Go Berzerk og Hades Gigablox er populære valg pga. deres høje max win-potentiale og spændende bonusrunder." },
    ],
  },
  "relax-gaming": {
    displayName: "Relax Gaming",
    seoTitle: "Relax Gaming Slots – Spillemaskiner & Statistik 2026",
    metaDescription: "Alle Relax Gaming spillemaskiner inkl. Money Train-serien. RTP, volatilitet og bonus hunt statistik fra danske streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Relax Gaming er et malta-baseret studie der har gjort sig bemærket med en unik kombination af egne high-quality slots og en platform der distribuerer spil fra uafhængige partnerstudier. Deres mest berømte serie, Money Train, har opnået kultstatus i slot-verdenen med sit kombination af extreme volatilitet og innovativ gameplay.</p>
      <p><a href="/slot-katalog/money-train-3">Money Train 3</a> markerede en milepæl med sit 100.000x max win-potentiale og Persistent Shapeshifter-feature, der løftede genren til nye højder. Relax Gamings evne til at innovere indenfor rammen af høj volatilitet har gjort dem til en favorit blandt streamere og dedikerede slot-spillere.</p>
      <p>Udover Money Train-serien tilbyder Relax Gaming et varieret katalog med titler der spænder fra klassiske fruit slots til komplekse grid-baserede spil. Deres partnerprogram, der inkluderer studier som Hacksaw Gaming og Print Studios, betyder at deres platform rummer et enormt udvalg af slots.</p>
      <p>Herunder finder du alle Relax Gaming-brandede spillemaskiner i vores database med ægte bonus hunt-data og performance-statistik fra vores community.</p>
    `,
    faqs: [
      { question: "Hvad er max win på Money Train 3?", answer: "Money Train 3 har et imponerende max win-potentiale på 100.000x indsatsen, hvilket gør den til en af de mest lukrative slots på markedet. Den høje volatilitet betyder dog at sådanne gevinster er ekstremt sjældne." },
      { question: "Hvad er de mest populære Relax Gaming slots?", answer: "De mest populære Relax Gaming slots inkluderer Money Train 3, Money Train 2 og Temple Tumble. Money Train-serien er særligt populær i bonus hunts pga. dens extreme gevinstpotentiale og spændende bonusrunde." },
      { question: "Distribuerer Relax Gaming også andre studiers slots?", answer: "Ja, Relax Gaming fungerer også som distributionsplatform for uafhængige studier som Hacksaw Gaming, Print Studios og AvatarUX. Dette betyder at deres platform rummer et stort udvalg af slots udover deres egne titler." },
    ],
  },
  "red-tiger": {
    displayName: "Red Tiger Gaming",
    seoTitle: "Red Tiger Slots – Alle Spillemaskiner & Statistik 2026",
    metaDescription: "Komplet Red Tiger Gaming slot-katalog med RTP, volatilitet og jackpot-data. Ægte statistik fra bonus hunts.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Red Tiger Gaming, nu en del af Evolution-koncernen, har opbygget et ry for visuelt polerede spillemaskiner med innovative jackpot-systemer og daglige drop-and-wins. Studiet blev grundlagt i 2014 og har hurtigt vokset til en af de mest respekterede midterstørrelsesudviklere i branchen.</p>
      <p>Red Tigers Daily Drop Jackpots er blevet en definerende feature – et netværk af jackpots der garanteres at falde inden for en bestemt tidsramme, hvilket skaber en unik spænding udover det traditionelle slot-gameplay. Titler som <a href="/slot-katalog/gonzos-quest-megaways">Gonzo's Quest Megaways</a> (i samarbejde med NetEnt) og <a href="/slot-katalog/piggy-riches-megaways">Piggy Riches Megaways</a> viser deres evne til at revitalisere klassikere.</p>
      <p>RTP-niveauerne hos Red Tiger varierer typisk mellem 94% og 95.7%, med volatilitet der primært falder i medium til high kategorien. Deres slots er kendt for hyppige small wins kombineret med potentialet for betydelige bonus-payouts, hvilket giver en balanceret spilleoplevelse.</p>
      <p>Se alle Red Tiger spillemaskiner i vores database nedenfor med ægte performance-data fra vores bonus hunts og community.</p>
    `,
    faqs: [
      { question: "Hvad er Red Tiger Daily Drop Jackpots?", answer: "Daily Drop Jackpots er Red Tigers netværksbaserede jackpot-system hvor jackpots garanteres at falde inden for en bestemt tidsperiode (typisk dagligt). Dette skaber en ekstra spændingsdimension i deres slots." },
      { question: "Hvad er RTP på Red Tiger slots?", answer: "Red Tiger slots har typisk en RTP mellem 94% og 95.7%. Nogle titler har dog en jackpot-komponent der kan påvirke den effektive RTP positivt, da jackpot-bidraget ikke altid er medregnet i den annoncerede RTP." },
      { question: "Hvilke Red Tiger slots er mest populære?", answer: "De mest kendte Red Tiger slots inkluderer Gonzo's Quest Megaways, Piggy Riches Megaways og Dragon's Fire. I vores bonus hunts er det typisk Megaways-titlerne der genererer mest opmærksomhed." },
    ],
  },
  "igt": {
    displayName: "IGT",
    seoTitle: "IGT Slots – Alle Spillemaskiner & Statistik 2026",
    metaDescription: "Alle IGT spillemaskiner med RTP, volatilitet og bonus hunt data. Klassiske og moderne slots fra den amerikanske gigant.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>IGT (International Game Technology) er en af de ældste og største aktører i gambling-industrien. Med rødder der strækker sig tilbage til 1975 har IGT domineret det landbaserede casino-marked i årtier, og deres online spillemaskiner bringer den samme kvalitet og troværdighed til digitale platforme.</p>
      <p>IGTs mest ikoniske titel er uden tvivl <a href="/slot-katalog/cleopatra">Cleopatra</a>, der har defineret det egyptiske tema i spillemaskiner og stadig er en af de mest spillede slots globalt. Andre klassikere som <a href="/slot-katalog/da-vinci-diamonds">Da Vinci Diamonds</a>, <a href="/slot-katalog/wheel-of-fortune">Wheel of Fortune</a> og <a href="/slot-katalog/siberian-storm">Siberian Storm</a> er ligeledes velkendte blandt spillere verden over.</p>
      <p>IGTs online slots er kendetegnet ved deres trofaste gengivelse af den landbaserede casino-oplevelse. RTP-niveauerne varierer typisk mellem 94% og 96%, og volatiliteten er generelt medium – designet til den brede spillerbase der foretrækker stabil underholdning fremfor extreme swings.</p>
      <p>Udforsk alle IGT spillemaskiner i vores database herunder med bonus hunt statistik og ægte performance-data fra vores community.</p>
    `,
    faqs: [
      { question: "Er IGT slots tilgængelige online?", answer: "Ja, IGT har et stort online slot-katalog der spejler mange af deres populære landbaserede titler. De er tilgængelige på de fleste danske licenserede casinoer og tilbyder den samme kvalitet og gameplay som de fysiske maskiner." },
      { question: "Hvad er RTP på IGT slots?", answer: "IGT slots har typisk en RTP mellem 94% og 96%. Da mange af deres slots oprindeligt er designet til landbaserede casinoer, kan RTP-niveauerne være lidt lavere end hos rene online-udviklere." },
      { question: "Hvad er de mest kendte IGT spillemaskiner?", answer: "De mest ikoniske IGT slots inkluderer Cleopatra, Da Vinci Diamonds, Wheel of Fortune og Siberian Storm. Disse titler er globale klassikere der har været populære i årtier både online og i fysiske casinoer." },
    ],
  },
};

/** All provider slugs that should have hub pages */
export const PROVIDER_HUB_SLUGS = Object.keys(PROVIDER_HUB_CONTENT);

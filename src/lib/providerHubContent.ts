/**
 * Unique SEO content for each provider slot hub page.
 * Each provider has a unique intro, meta description, and focus keywords.
 */

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
}

export const PROVIDER_HUB_CONTENT: Record<string, ProviderHubContent> = {
  "pragmatic-play": {
    displayName: "Pragmatic Play",
    seoTitle: "Pragmatic Play Slots – Alle Spillemaskiner & Statistik 2026",
    metaDescription: "Komplet oversigt over alle Pragmatic Play spillemaskiner med RTP, volatilitet og bonus hunt statistik fra ægte danske streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Pragmatic Play har på rekordtid etableret sig som en af de mest dominerende spiludviklere i den danske online casino-verden. Med et imponerende katalog der spænder fra klassiske frugtmaskiner til avancerede Megaways-titler, leverer Pragmatic Play konsekvent nye spillemaskiner med innovativ gameplay og høj underholdningsværdi.</p>
      <p>Hvad der særligt adskiller Pragmatic Play fra konkurrenterne er deres evne til at skabe slots med bred appel. Titler som <strong>Sweet Bonanza</strong>, <strong>Gates of Olympus</strong> og <strong>Big Bass Bonanza</strong> er blevet synonyme med moderne online slots. Disse spil kombinerer cluster pays-mekanikker, tumble-features og multipliers på måder der konstant overrasker spillere.</p>
      <p>Fra et dataperspektiv er Pragmatic Play en af de mest testede udviklere i vores bonus hunts. Deres slots optræder hyppigt med høje x-værdier, hvilket afspejler den høje volatilitet mange af deres mest populære titler er kendt for. RTP-niveauerne varierer typisk mellem 94% og 96.5%, med flere titler der tilbyder justerbare RTP-indstillinger afhængigt af casinoet.</p>
      <p>Herunder finder du en komplet, datadrevet oversigt over samtlige Pragmatic Play spillemaskiner i vores database – inklusiv RTP, volatilitet, højeste registrerede gevinst og antal gange hver slot er testet i vores community bonus hunts.</p>
    `,
  },
  "netent": {
    displayName: "NetEnt",
    seoTitle: "NetEnt Slots – Alle Spillemaskiner & Statistik 2026",
    metaDescription: "Se alle NetEnt spillemaskiner med detaljeret RTP, volatilitet og bonus hunt data. Komplet katalog med ægte community-statistik.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>NetEnt (Net Entertainment) er en af de mest ikoniske spiludviklere i online casino-historien. Grundlagt i Sverige i 1996 har NetEnt skabt nogle af industriens mest elskede spillemaskiner – fra den revolutionerende <strong>Starburst</strong> til den grænsesøgende <strong>Dead or Alive 2</strong>.</p>
      <p>NetEnts slots er kendetegnet ved deres polerede grafik, lyddesign i verdensklasse og gennemtænkt matematik. Mange af deres klassikere har RTP-værdier over 96%, hvilket gør dem til favoritter blandt strategiske spillere der prioriterer langsigtet værdi. Volatiliteten varierer fra lav (Starburst) til ekstremt høj (Dead or Alive 2), så der er noget for enhver spillestil.</p>
      <p>Selvom NetEnt nu er en del af Evolution-koncernen, fortsætter brandet med at levere kvalitetstitler. I vores bonus hunt arkiv optræder NetEnt-slots regelmæssigt, og deres performance-data giver et unikt indblik i, hvordan disse velkendte spil klarer sig under reelle spilleforhold med ægte indsatser.</p>
      <p>Nedenfor finder du det komplette NetEnt-katalog med live data fra vores database – perfekt til at sammenligne RTP, volatilitet og faktiske resultater fra hundredvis af bonus hunts.</p>
    `,
  },
  "play-n-go": {
    displayName: "Play'n GO",
    seoTitle: "Play'n GO Slots – Alle Spillemaskiner & Statistik 2026",
    metaDescription: "Komplet liste over Play'n GO spillemaskiner med RTP, volatilitet og bonus hunt resultater. Ægte data fra danske streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Play'n GO har markeret sig som en af de mest produktive og innovative spiludviklere på det danske marked. Med <strong>Book of Dead</strong> som deres absolutte flagskib har det svenske studie bevist, at de kan skabe spillemaskiner der kombinerer klassisk tematik med moderne mekanikker.</p>
      <p>Det der gør Play'n GO unik er deres fokus på high volatility slots med book-mekanikken – en formel de har perfektioneret med titler som <strong>Legacy of Dead</strong>, <strong>Rise of Olympus</strong> og <strong>Reactoonz</strong>-serien. Deres grid-baserede slots med cascading wins har defineret en helt ny genre indenfor online spillemaskiner.</p>
      <p>I vores bonus hunt data fremstår Play'n GO som en konsistent performer. Deres slots har typisk RTP-værdier mellem 94% og 96.2%, og volatiliteten er generelt medium til høj. Det betyder, at de kan levere imponerende x-værdier, selvom de også kan have længere tørkeperioder mellem store gevinster.</p>
      <p>Udforsk hele Play'n GO-kataloget nedenfor med ægte statistik fra vores community – inklusiv højeste registrerede multiplikator og antal bonus hunt-optrædener per slot.</p>
    `,
  },
  "hacksaw-gaming": {
    displayName: "Hacksaw Gaming",
    seoTitle: "Hacksaw Gaming Slots – Spillemaskiner & Statistik 2026",
    metaDescription: "Alle Hacksaw Gaming slots med RTP, volatilitet og max win-data. Se ægte bonus hunt resultater fra danske community streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Hacksaw Gaming har på kort tid revolutioneret slot-branchen med deres ultra-volatile spillemaskiner og unikke visuelle stil. Det malta-baserede studie er blevet et kultmærke blandt high-risk spillere, der jager de massive x-værdier som Hacksaw-titler er berømte for.</p>
      <p>Med titler som <strong>Wanted Dead or a Wild</strong>, <strong>Chaos Crew</strong> og <strong>Razor Shark</strong> har Hacksaw Gaming skabt en nicheposition som den foretrukne udvikler for ekstrem volatilitet. Deres max win-potentiale ligger typisk mellem 10.000x og 15.000x, hvilket er blandt de højeste i industrien.</p>
      <p>Hacksaws slots er kendetegnet ved et minimalistisk, næsten tegneserie-agtigt design, der prioriterer gameplay-klarhed over visuel kompleksitet. Denne tilgang gør deres spil lette at forstå, selvom mekanikkerne under overfladen kan være overraskende dybe med sticky wilds, expanding symbols og progressive multipliers.</p>
      <p>I vores bonus hunts er Hacksaw Gaming en af de mest spændende udviklere at følge. Herunder kan du se alle deres spillemaskiner med ægte performance-data fra vores live streams.</p>
    `,
  },
  "big-time-gaming": {
    displayName: "Big Time Gaming",
    seoTitle: "Big Time Gaming Slots – Spillemaskiner & Statistik 2026",
    metaDescription: "Alle Big Time Gaming spillemaskiner inkl. Megaways-titler. RTP, volatilitet og bonus hunt data fra ægte danske streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Big Time Gaming (BTG) er synonymt med én ting: <strong>Megaways</strong>. Det australske studie opfandt den banebrydende mekanik i 2016 med <strong>Bonanza</strong>, og har siden licenseret den til næsten alle andre store udviklere. Megaways tilbyder op til 117.649 gevinstlinjer per spin, hvilket fundamentalt ændrede hvordan spillemaskiner fungerer.</p>
      <p>Udover Megaways har BTG introduceret andre innovative features som Extra Chilli's Gamble-funktion og den populære "Bonus Buy"-mekanik, der lader spillere købe sig direkte ind i bonusrunden. Deres slots er konsekvent high volatility med max win-potentiale der typisk ligger mellem 20.000x og 50.000x.</p>
      <p>BTGs katalog er ikke det største, men kvaliteten per titel er exceptionel. Hver ny udgivelse bringer typisk en ny twist på Megaways-formlen, og deres tematiske diversitet – fra minedrift (Bonanza) til mexicansk street food (Extra Chilli) – holder kataloget friskt.</p>
      <p>Nedenfor finder du alle Big Time Gaming spillemaskiner i vores database med detaljeret statistik fra vores bonus hunt community.</p>
    `,
  },
  "microgaming": {
    displayName: "Microgaming",
    seoTitle: "Microgaming Slots – Alle Spillemaskiner & Statistik 2026",
    metaDescription: "Komplet Microgaming slot-katalog med RTP, volatilitet og jackpot-data. Ægte statistik fra bonus hunts og community streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Microgaming er en af de ældste og mest respekterede spiludviklere i online casino-industrien. Grundlagt i 1994 på Isle of Man har virksomheden leveret tusindvis af spillemaskiner og er især kendt for det ikoniske <strong>Mega Moolah</strong> progressive jackpot-netværk, der har udbetalt milliardbeløb til heldige spillere.</p>
      <p>Microgamings styrke ligger i bredden af deres katalog. Fra den mørke vampyr-romantik i <strong>Immortal Romance</strong> til den nordiske gudeverden i <strong>Thunderstruck II</strong> dækker de praktisk talt enhver tematisk niche. Deres RTP-værdier er generelt konkurrencedygtige, typisk i intervallet 95-96.5%, og volatiliteten varierer fra lav til høj.</p>
      <p>I de seneste år har Microgaming fokuseret på at distribuere spil fra uafhængige partnerstudier under deres platform, hvilket har udvidet kataloget markant. Selvom dette betyder større variation i kvalitet, sikrer det også at der konstant er nye titler at udforske.</p>
      <p>Se alle Microgaming spillemaskiner fra vores database herunder – med bonus hunt data og ægte performance-statistik fra vores community.</p>
    `,
  },
  "nolimit-city": {
    displayName: "Nolimit City",
    seoTitle: "Nolimit City Slots – Alle Spillemaskiner & Statistik 2026",
    metaDescription: "Alle Nolimit City spillemaskiner med xWays og xBet mekanikker. RTP, volatilitet og max win fra ægte bonus hunt data.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Nolimit City har etableret sig som et af de mest kontroversielle og spændende studier i slot-branchen. Det svenske studie er kendt for sine mørke, provokerende temaer og extremt høje volatilitet, der tiltrækker en dedikeret fanbase af high-risk spillere fra hele verden.</p>
      <p>Med proprietære mekanikker som <strong>xWays</strong>, <strong>xBet</strong> og <strong>xNudge</strong> har Nolimit City skabt et helt eget gameplay-univers. Titler som <strong>Mental</strong>, <strong>San Quentin xWays</strong> og <strong>Tombstone RIP</strong> er berømte for deres astronomiske max win-potentiale, der kan nå op til 150.000x indsatsen.</p>
      <p>RTP-niveauerne hos Nolimit City varierer typisk mellem 94% og 96.1%, med nogle titler der tilbyder højere RTP når xBet-funktionen aktiveres. Denne unikke tilgang til risk/reward-balancering gør deres slots til noget helt for sig selv i markedet.</p>
      <p>Udforsk hele Nolimit City-kataloget nedenfor med ægte data fra vores bonus hunts – se hvilke titler der har leveret de højeste x-værdier i vores community.</p>
    `,
  },
  "evolution-gaming": {
    displayName: "Evolution",
    seoTitle: "Evolution Slots – Alle Spillemaskiner & Statistik 2026",
    metaDescription: "Komplet oversigt over Evolution/NetEnt slots med RTP og volatilitet. Bonus hunt statistik fra ægte danske community streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Evolution (tidligere Evolution Gaming) er primært verdenskendt for deres dominans indenfor live casino, men efter opkøbet af NetEnt, Red Tiger og Big Time Gaming har koncernen nu også et massivt slot-katalog. Under Evolution-brandet udgives der nye spillemaskiner der kombinerer live casino-ekspertise med traditionel slot-gameplay.</p>
      <p>Evolutions egne slots fokuserer ofte på innovative gameplay-elementer der trækker på deres live casino-DNA. Dette inkluderer interaktive bonus-features, unikke grid-layouts og multiplier-mekanikker der føles friske sammenlignet med traditionelle slot-formler.</p>
      <p>Med NetEnt, Red Tiger og BTG under samme paraply har Evolution-koncernen adgang til et af branchens bredeste portfolier. Deres slots har typisk solide RTP-værdier og varierende volatilitet, hvilket gør dem tilgængelige for alle typer spillere.</p>
      <p>Herunder finder du alle Evolution-brandede spillemaskiner i vores database, komplet med bonus hunt performance-data og ægte statistik fra vores community streams.</p>
    `,
  },
  "elk-studios": {
    displayName: "ELK Studios",
    seoTitle: "ELK Studios Slots – Alle Spillemaskiner & Statistik 2026",
    metaDescription: "Se alle ELK Studios spillemaskiner med RTP, volatilitet og bonus hunt data. Ægte performance-statistik fra danske streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>ELK Studios er et svensk spiludvikler-studie der har gjort sig bemærket med deres fokus på mobilvenlig design og matematisk sofistikerede slot-modeller. Siden grundlæggelsen i 2012 har ELK konsekvent leveret spillemaskiner der balancerer visuel kvalitet med gennemtænkt gameplay.</p>
      <p>ELK er især kendt for deres <strong>Avalanche</strong>-mekanik og innovative bonusstrukturer. Titler som <strong>Cygnus</strong>, <strong>Katmandu Gold</strong> og <strong>Ecuador Gold</strong> har demonstreret studiets evne til at skabe unikke spilleoplevelser med dybe feature-systemer og progressive multipliers.</p>
      <p>RTP-niveauerne hos ELK Studios er generelt høje, typisk mellem 95.5% og 96.3%, med volatilitet der primært falder i medium-high til high kategorien. Deres "Betting Strategies"-feature er unik i branchen og lader spillere automatisere deres indsatsmønstre baseret på forskellige strategier.</p>
      <p>Udforsk alle ELK Studios spillemaskiner nedenfor med ægte data fra vores bonus hunts og community.</p>
    `,
  },
  "yggdrasil": {
    displayName: "Yggdrasil Gaming",
    seoTitle: "Yggdrasil Slots – Alle Spillemaskiner & Statistik 2026",
    metaDescription: "Alle Yggdrasil spillemaskiner med RTP, volatilitet og max win. Ægte bonus hunt data fra danske community streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Yggdrasil Gaming har siden grundlæggelsen i 2013 markeret sig med visuelt imponerende slots og innovative mekanikker. Det svenske studie, opkaldt efter det nordiske livstræ, har vundet adskillige branchepriser for deres kreative tilgang til spiludvikling og banebrydende HTML5-teknologi.</p>
      <p>Yggdrasils slots er kendetegnet ved cinematisk grafik, 3D-animationer og unikke feature-systemer. Titler som <strong>Vikings Go Berzerk</strong>, <strong>Valley of the Gods</strong> og <strong>Hades – Gigablox</strong> viser studiets evne til at forene visuelt imponerende oplevelser med solide matematiske modeller.</p>
      <p>Med introduktionen af <strong>Gigablox</strong>-mekanikken, der viser kæmpe symboler op til 6x6 på hjulene, har Yggdrasil skabt endnu en distinkt gameplay-oplevelse. RTP-niveauerne ligger typisk mellem 95% og 96.5%, og volatiliteten varierer fra medium til very high.</p>
      <p>Se alle Yggdrasil spillemaskiner i vores katalog nedenfor – med live statistik fra vores bonus hunts og community-data.</p>
    `,
  },
  "relax-gaming": {
    displayName: "Relax Gaming",
    seoTitle: "Relax Gaming Slots – Spillemaskiner & Statistik 2026",
    metaDescription: "Alle Relax Gaming spillemaskiner inkl. Money Train-serien. RTP, volatilitet og bonus hunt statistik fra danske streams.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Relax Gaming er et malta-baseret studie der har gjort sig bemærket med en unik kombination af egne high-quality slots og en platform der distribuerer spil fra uafhængige partnerstudier. Deres mest berømte serie, <strong>Money Train</strong>, har opnået kultstatus i slot-verdenen med sit kombination af extreme volatilitet og innovativ gameplay.</p>
      <p><strong>Money Train 3</strong> markerede en milepæl med sit 100.000x max win-potentiale og Persistent Shapeshifter-feature, der løftede genren til nye højder. Relax Gamings evne til at innovere indenfor rammen af høj volatilitet har gjort dem til en favorit blandt streamere og dedikerede slot-spillere.</p>
      <p>Udover Money Train-serien tilbyder Relax Gaming et varieret katalog med titler der spænder fra klassiske fruit slots til komplekse grid-baserede spil. Deres partnerprogram, der inkluderer studier som Hacksaw Gaming og Print Studios, betyder at deres platform rummer et enormt udvalg af slots.</p>
      <p>Herunder finder du alle Relax Gaming-brandede spillemaskiner i vores database med ægte bonus hunt-data og performance-statistik fra vores community.</p>
    `,
  },
  "red-tiger": {
    displayName: "Red Tiger Gaming",
    seoTitle: "Red Tiger Slots – Alle Spillemaskiner & Statistik 2026",
    metaDescription: "Komplet Red Tiger Gaming slot-katalog med RTP, volatilitet og jackpot-data. Ægte statistik fra bonus hunts.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>Red Tiger Gaming, nu en del af Evolution-koncernen, har opbygget et ry for visuelt polerede spillemaskiner med innovative jackpot-systemer og daglige drop-and-wins. Studiet blev grundlagt i 2014 og har hurtigt vokset til en af de mest respekterede midterstørrelsesudviklere i branchen.</p>
      <p>Red Tigers <strong>Daily Drop Jackpots</strong> er blevet en definerende feature – et netværk af jackpots der garanteres at falde inden for en bestemt tidsramme, hvilket skaber en unik spænding udover det traditionelle slot-gameplay. Titler som <strong>Gonzo's Quest Megaways</strong> (i samarbejde med NetEnt) og <strong>Piggy Riches Megaways</strong> viser deres evne til at revitalisere klassikere.</p>
      <p>RTP-niveauerne hos Red Tiger varierer typisk mellem 94% og 95.7%, med volatilitet der primært falder i medium til high kategorien. Deres slots er kendt for hyppige small wins kombineret med potentialet for betydelige bonus-payouts, hvilket giver en balanceret spilleoplevelse.</p>
      <p>Se alle Red Tiger spillemaskiner i vores database nedenfor med ægte performance-data fra vores bonus hunts og community.</p>
    `,
  },
  "igt": {
    displayName: "IGT",
    seoTitle: "IGT Slots – Alle Spillemaskiner & Statistik 2026",
    metaDescription: "Alle IGT spillemaskiner med RTP, volatilitet og bonus hunt data. Klassiske og moderne slots fra den amerikanske gigant.",
    datePublished: "2026-03-10",
    introHtml: `
      <p>IGT (International Game Technology) er en af de ældste og største aktører i gambling-industrien. Med rødder der strækker sig tilbage til 1975 har IGT domineret det landbaserede casino-marked i årtier, og deres online spillemaskiner bringer den samme kvalitet og troværdighed til digitale platforme.</p>
      <p>IGTs mest ikoniske titel er uden tvivl <strong>Cleopatra</strong>, der har defineret det egyptiske tema i spillemaskiner og stadig er en af de mest spillede slots globalt. Andre klassikere som <strong>Da Vinci Diamonds</strong>, <strong>Wheel of Fortune</strong> og <strong>Siberian Storm</strong> er ligeledes velkendte blandt spillere verden over.</p>
      <p>IGTs online slots er kendetegnet ved deres trofaste gengivelse af den landbaserede casino-oplevelse. RTP-niveauerne varierer typisk mellem 94% og 96%, og volatiliteten er generelt medium – designet til den brede spillerbase der foretrækker stabil underholdning fremfor extreme swings.</p>
      <p>Udforsk alle IGT spillemaskiner i vores database herunder med bonus hunt statistik og ægte performance-data fra vores community.</p>
    `,
  },
};

/** All provider slugs that should have hub pages */
export const PROVIDER_HUB_SLUGS = Object.keys(PROVIDER_HUB_CONTENT);

import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, buildHowToSchema, SITE_URL } from "@/lib/seo";
import { AuthorBio } from "@/components/AuthorBio";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Target,
  ShieldCheck,
  BarChart3,
  Layers,
  Zap,
  Trophy,
  Brain,
  Users,
  AlertTriangle,
  ArrowRight,
  Scale,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import pokerHero from "@/assets/heroes/poker-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

/* ───────────────────────── FAQ ───────────────────────── */

const pokerFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Er poker lovligt i Danmark?",
    answer: (
      <>
        Ja. Poker er fuldt lovligt i Danmark på casinoer med licens fra den danske <Link to="/spillemyndigheden" className={linkClass}>Spillemyndighed</Link>. Det gælder både casino poker (mod huset), spiller-vs-spiller poker (turneringer og cash games) og Video Poker. Gevinster er skattefrie, forudsat du spiller på et licenseret casino. Spiller du på et casino uden dansk licens, er gevinster skattepligtige, og du mangler forbrugerbeskyttelse og ROFUS-adgang.
      </>
    ),
  },
  {
    question: "Er poker held eller færdighed?",
    answer:
      "Begge dele – men fordelingen afhænger af tidshorisonten. I en enkelt hånd dominerer held: de bedste kort vinder uanset strategi. Over 100 hænder spiller færdighed en rolle, men variansen er stadig høj. Over 10.000+ hænder er poker entydigt et færdighedsspil – vindende spillere vinder konsistent, tabende spillere taber konsistent. Akademisk forskning (fx Cigital-studiet fra 2012 med 103 millioner hænder) bekræfter, at færdighed er den dominerende faktor over tilstrækkeligt mange hænder. Det er grunden til, at professionelle pokerspillere eksisterer – der er ingen professionelle roulette-spillere.",
  },
  {
    question: "Hvad er den bedste pokervariant for begyndere?",
    answer:
      "Texas Hold'em er det klare valg for begyndere. Det har simple regler (to håndsort, fem fælles kort), enorm mængde læringsmateriale tilgængeligt, og det er den mest spillede variant online, så du finder altid borde med spillere på dit niveau. No-Limit Hold'em med mikro-stakes (0,01/0,02 kr. blinds) giver dig mulighed for at lære spillet med minimal finansiel risiko. Alternativt er Jacks or Better Video Poker fremragende for at lære håndstyrkerne, fordi du får øjeblikkelig feedback på dine beslutninger.",
  },
  {
    question: "Hvad betyder pot odds i poker?",
    answer:
      "Pot odds er forholdet mellem puljens størrelse og det beløb, du skal betale for at fortsætte. Eksempel: puljen er 300 kr., din modstander satser 100 kr., puljen er nu 400 kr. Du skal betale 100 kr. – dine pot odds er 4:1. Det betyder, at du skal vinde mere end 1 ud af 5 gange (20 %) for at et call er profitabelt. Sammenlign pot odds med din equity (sandsynlighed for at vinde hånden) for at træffe matematisk korrekte beslutninger. Pot odds er fundamentet for rationel pokerstrategi.",
  },
  {
    question: "Kan man leve af poker?",
    answer: (
      <>
        I teorien ja – i praksis gør meget få det. Professionelle pokerspillere eksisterer, men livsstilen kræver: (1) konsistent edge over dine modstandere på dit stakelevel, (2) en bankroll på minimum 50–100 buy-ins for at overleve varians, (3) evnen til at spille 30.000+ hænder pr. måned, (4) disciplin til at håndtere tabsperioder, der kan vare uger eller måneder, (5) skatteforståelse og økonomisk planlægning. De fleste spillere, der forsøger at leve af poker, vender tilbage til et fast job inden for 1–2 år. <Link to="/ansvarligt-spil" className={linkClass}>Ansvarligt spil</Link> betyder også ærlig selvvurdering af egne evner.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på cash game og turnering?",
    answer:
      "I cash games repræsenterer chips rigtige penge – du kan købe ind og forlade bordet når som helst. I turneringer betaler du en fast buy-in og modtager et startstack af turneringschips – du spiller, til du enten er elimineret eller vinder. Cash games belønner konsistent, tålmodig spil; turneringer belønner aggressivitet og tilpasningsevne. Cash games har lavere varians (du kan vælge dine hænder), turneringer har højere varians (du skal vinde mange coin flips for at nå langt). De fleste professionelle spiller primært cash games for stabil indkomst og turneringer for store udbetaler.",
  },
  {
    question: "Er online poker rigget?",
    answer: (
      <>
        Nej – ikke på licenserede platforme. Online poker-software bruger certificerede RNG-systemer, der testes af uafhængige laboratorier (eCOGRA, iTech Labs, BMM Testlabs). Den danske Spillemyndighed kræver regelmæssig dokumentation og audit af alle poker-platforme. Det, der ofte <em>føles</em> som rigging, er variansens naturlige effekt: du vil opleve bad beats, coolers og tilsyneladende umulige suckouts. Men disse hændelser forekommer med præcis den frekvens, som sandsynlighedsteorien forudsiger – de føles bare værre online, fordi du spiller mange flere hænder pr. time end live.
      </>
    ),
  },
  {
    question: "Hvor meget bankroll skal man have til poker?",
    answer:
      "Tommelfingerregler: Cash games: 20–30 buy-ins for det stakelevel, du spiller. Med 500 kr. buy-in behøver du 10.000–15.000 kr. bankroll. Turneringer: 50–100 buy-ins pga. højere varians. Med 100 kr. buy-in behøver du 5.000–10.000 kr. Mikrostakes (0,01/0,02): 500–1.000 kr. er tilstrækkeligt. Disse regler beskytter dig mod at gå broke under normale varianssvings. Spillere, der ignorerer bankroll management, er den primære årsag til, at talentfulde spillere ender med at tabe – ikke dårlig strategi, men dårlig risikostyring.",
  },
];

/* ───────────────────────── PAGE ───────────────────────── */

const PokerGuide = () => {
  const faqJsonLd = buildFaqSchema(pokerFaqs);
  const articleSchema = buildArticleSchema({
    headline: "Poker Guide 2026 – Varianter, Strategi og Matematik",
    description:
      "Komplet poker-guide: Texas Hold'em, Omaha, håndrangeringer, position, pot odds, bluffing og bankroll management. Strategi for danske spillere.",
    url: `${SITE_URL}/casinospil/poker`,
    datePublished: "2026-02-15",
    dateModified: "2026-02-18",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  const howToSchema = buildHowToSchema({
    url: `${SITE_URL}/casinospil/poker`,
    name: "Sådan kommer du i gang med poker",
    description: "Trin-for-trin guide til at komme i gang med poker som nybegynder – fra håndrangeringer til første rigtige spil.",
    totalTime: "PT30M",
    steps: [
      { name: "Lær håndrangeringerne udenad", text: "Øv dig med et kortspil derhjemme: del fem kort, identificér hånden, gentag. Efter 50–100 gentagelser sidder det i muskelhukommelsen." },
      { name: "Start med mikrostakes online", text: "Spil de laveste stakelevel online (0,01/0,02 kr. blinds, 2 kr. buy-in) med 50–100 kr. som startbankroll for minimal finansiel risiko." },
      { name: "Spil stamt og aggressivt", text: "Hold dig til de top 15–20 % af starthænder: store par, store aces og selected suited connectors fra sen position. Raise preflop og continuation bet på floppen." },
      { name: "Analysér dine hænder", text: "Gennemgå dine sessioner via håndhistorikken. Spørg: var dette call profitabelt baseret på pot odds? Selvanalyse er den vigtigste kilde til forbedring." },
      { name: "Sæt grænser og overhold dem", text: "Sæt en bankroll-grænse, der matcher din økonomi. Brug aldrig penge, du ikke har råd til at tabe. Benyt ansvarligt spil-værktøjer ved behov." },
    ],
  });

  // BreadcrumbList is auto-generated by SEO.tsx via buildBreadcrumbListSchema() – no manual injection needed.

  return (
    <>
      <SEO
        title="Poker Guide 2026 – Strategi, Varianter og Odds"
        description="Komplet poker-guide: Hold'em, Omaha, håndrangeringer, pot odds, bluffing og bankroll management. Strategi for danske spillere."
        jsonLd={[faqJsonLd, articleSchema, howToSchema]}
      />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Brain className="mr-1.5 h-3.5 w-3.5" /> Strategi · Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Poker – Held, Matematik og Psykologi
            </h1>
            <p className="text-lg text-white/80">
              Varianter, position, pot odds og bankroll management – den strategiske poker-guide.
            </p>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="18-02-2026" readTime="28 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={pokerHero}
            alt="Pokerbord med kort, chips og spillere i fokuseret session"
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* ═══════════════ 1 – TRE NIVEAUER ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Poker på 3 Niveauer – Held, Matematik og Psykologi</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Poker adskiller sig fundamentalt fra alle andre <Link to="/casinospil" className={linkClass}>casinospil</Link>. I <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> og <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> er du op mod et hus med en fast matematisk fordel – intet du gør ændrer odds'ene. I poker spiller du mod andre mennesker, og casinoet tager kun en procentdel af puljen (rake). Det betyder, at en dygtig spiller kan have en positiv forventet værdi – et koncept, der er umuligt i de fleste casinospil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Poker opererer på tre overlappende niveauer. <strong>Niveau 1: Held.</strong> Kortene er tilfældige. Du kan ikke kontrollere, om du får pocket aces eller 7-2 offsuit. I et enkelt spin af det metaforiske hjul er poker næsten rent held. <strong>Niveau 2: Matematik.</strong> Sandsynlighedsberegning, pot odds, outs og equity giver dig et analytisk fundament for at træffe korrekte beslutninger med ufuldstændig information. Over mange hænder konvergerer korrekte matematiske beslutninger mod profit. <strong>Niveau 3: Psykologi.</strong> Læsning af modstandere, timing af bluffs, kontrol af egne fortællende signaler (tells) og mental robusthed under pres adskiller gode spillere fra gennemsnitlige.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En begynder opererer primært på niveau 1 – de spiller de kort, de får, og håber på det bedste. En kompetent spiller mestrer niveau 2 – de beregner pot odds, forstår position og træffer matematisk funderede beslutninger. En ekspert integrerer alle tre niveauer og tilpasser sin strategi til hver eneste modstander ved bordet. Det er denne dybde, der gør poker unikt: det er et spil, du kan studere i årtier og stadig finde nye lag.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Denne guide behandler alle tre niveauer. Vi starter med reglerne og varianterne (fundament), bevæger os gennem matematikken (pot odds, outs, equity) og afrunder med psykologi og disciplin (bluffing, bankroll management, typiske fejl). Formålet er ikke at gøre dig til en professionel spiller – det er at give dig den viden og de værktøjer, der gør dig til en informeret, rationel og ansvarlig pokerspiller.
          </p>
        </section>

        <InlineCasinoCards title="Bedste Casinoer til Poker" count={6} />

        <Separator className="my-10" />

        {/* ═══════════════ 2 – VARIANTER ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">De Mest Spillede Pokervarianter</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Poker er ikke ét spil – det er en familie af spil med fælles principper men vidt forskellige regler, strategier og dynamikker. At forstå de vigtigste varianter hjælper dig med at finde den, der passer din spillestil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Texas Hold'em</strong> er verdens mest spillede pokervariant. Hver spiller modtager to private kort (hole cards), og fem fælles kort (community cards) afsløres i tre faser: flop (tre kort), turn (ét kort) og river (ét kort). Du danner den bedste fem-korts hånd fra dine to hole cards og de fem community cards. Betting finder sted i fire runder: preflop, flop, turn og river. No-Limit Hold'em (ingen loft over indsatser) er den mest populære form og den variant, der spilles i World Series of Poker. Pot-Limit og Fixed-Limit Hold'em eksisterer også men er mindre udbredte online.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Omaha</strong> er Hold'ems mere komplekse fætter. Hver spiller modtager fire hole cards (i stedet for to), men du <em>skal</em> bruge præcis to af dine hole cards og præcis tre community cards til din endelige hånd. Denne regel skaber en dramatisk anderledes dynamik: flere mulige hænder, stærkere gennemsnitlige vinderhænder og markant mere action. Pot-Limit Omaha (PLO) er den mest spillede form. Omaha Hi-Lo (split pot mellem bedste og dårligste hånd) tilføjer endnu et strategisk lag. Omaha kræver en bedre forståelse af hand reading og equity-beregning end Hold'em.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Seven Card Stud</strong> var den dominerende pokervariant før Hold'em-boomen. Ingen community cards – hver spiller modtager syv individuelle kort (tre face-down, fire face-up) over fem betting-runder. Du danner den bedste fem-korts hånd fra dine syv kort. Stud kræver stærk hukommelse (du skal huske, hvilke kort modstandere har vist og foldet) og observation. Det spilles sjældnere online i dag, men er stadig en del af mixed game-turneringer (HORSE, 8-Game).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Five Card Draw</strong> er den simpleste variant og den, de fleste kender fra film og hjemmespil. Du modtager fem kort, vælger hvor mange du vil bytte (0–5), og modtager nye kort. Én betting-runde før og efter byttet. Draw poker handler primært om at vurdere, hvad modstanderne holder baseret på, hvor mange kort de bytter. Det spilles sjældent professionelt, men det er et fremragende udgangspunkt for at lære håndstyrker og grundlæggende poker-logik.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Casino poker-varianter</strong> (Caribbean Stud, Casino Hold'em, Three Card Poker) spilles mod huset, ikke mod andre spillere. De har fast house edge og kræver ingen interaktion med modstandere. De er teknisk set poker, men strategisk set nærmere <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> – du træffer beslutninger mod en fast matematisk model, ikke mod et tænkende menneske. Video Poker er en undergruppe, der kombinerer pokerhænder med maskinspil og tilbyder nogle af de højeste RTP-værdier i hele casinobranchen (op til 100,76 % med perfekt strategi).
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 3 – HÅNDRANGERINGER ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Håndrangeringer – Hvorfor Nogle Kombinationer Slår Andre</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Pokerhænders rækkefølge er ikke vilkårlig – den er baseret på sandsynlighed. Jo sjældnere en hånd er, jo højere rangerer den. Denne logik er elegant og konsistent: de hænder, der er sværest at lave, vinder over dem, der er lettere.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Rang</th>
                  <th className="px-4 py-3 text-left font-semibold">Hånd</th>
                  <th className="px-4 py-3 text-left font-semibold">Eksempel</th>
                  <th className="px-4 py-3 text-center font-semibold">Sandsynlighed (5 kort)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">1</td><td className="px-4 py-2">Royal Flush</td><td className="px-4 py-2">A♠ K♠ Q♠ J♠ 10♠</td><td className="px-4 py-2 text-center">0,000154 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">2</td><td className="px-4 py-2">Straight Flush</td><td className="px-4 py-2">5♥ 6♥ 7♥ 8♥ 9♥</td><td className="px-4 py-2 text-center">0,00139 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">3</td><td className="px-4 py-2">Four of a Kind</td><td className="px-4 py-2">K♠ K♥ K♦ K♣ 3♠</td><td className="px-4 py-2 text-center">0,024 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">4</td><td className="px-4 py-2">Full House</td><td className="px-4 py-2">Q♠ Q♥ Q♦ 7♣ 7♠</td><td className="px-4 py-2 text-center">0,144 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">5</td><td className="px-4 py-2">Flush</td><td className="px-4 py-2">A♦ J♦ 8♦ 4♦ 2♦</td><td className="px-4 py-2 text-center">0,197 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">6</td><td className="px-4 py-2">Straight</td><td className="px-4 py-2">4♣ 5♠ 6♥ 7♦ 8♣</td><td className="px-4 py-2 text-center">0,392 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">7</td><td className="px-4 py-2">Three of a Kind</td><td className="px-4 py-2">9♠ 9♥ 9♦ K♣ 2♠</td><td className="px-4 py-2 text-center">2,11 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">8</td><td className="px-4 py-2">Two Pair</td><td className="px-4 py-2">J♠ J♥ 4♦ 4♣ A♠</td><td className="px-4 py-2 text-center">4,75 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">9</td><td className="px-4 py-2">One Pair</td><td className="px-4 py-2">10♠ 10♥ A♦ 7♣ 3♠</td><td className="px-4 py-2 text-center">42,26 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">10</td><td className="px-4 py-2">High Card</td><td className="px-4 py-2">A♠ J♦ 8♣ 4♥ 2♠</td><td className="px-4 py-2 text-center">50,12 %</td></tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tabellen afslører en vigtig indsigt: over halvdelen af alle fem-korts hænder (50,12 %) er "ingenting" – High Card. One Pair udgør yderligere 42,26 %. Det betyder, at 92,38 % af alle hænder er ét par eller dårligere. Stærke hænder som Full House og bedre udgør kun 0,17 % af alle hænder. Denne fordeling forklarer, hvorfor poker er et spil om relativ styrke, ikke absolut styrke – et par tiere er ofte den bedste hånd ved bordet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Texas Hold'em-specifikt:</strong> Med syv tilgængelige kort (to hole + fem community) stiger sandsynlighederne markant. Sandsynligheden for at lave mindst ét par er ca. 83 %. To par: 23,5 %. Three of a Kind: 4,83 %. Full House: 2,6 %. Flush: 3,03 %. Straight: 4,62 %. Det betyder, at vinderhånden i Hold'em gennemsnitligt er stærkere end i Five Card Draw – noget der påvirker strategien fundamentalt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Vigtig nuance:</strong> I Hold'em afgør "kicker"-kortet ofte vinderen. Hvis to spillere begge har et par esser, vinder den med det højeste sidekort. At forstå kicker-konceptet er kritisk – mange begyndere taber store potter, fordi de overser, at deres kicker er svag. Eksempel: du har A-4 og din modstander har A-K. Boardet viser A-8-6-3-2. Begge har par af esser – men din modstander vinder med kongen som kicker vs. dit 8-tal (boardet spiller).
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 4 – POSITION ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Position Ved Bordet – Den Skjulte Fordel</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Position er det mest undervurderede koncept i poker – og det mest magtfulde. Din position ved bordet bestemmer, hvornår du handler relativt til dine modstandere, og den information, du har til rådighed, når du træffer din beslutning. Sen position (tæt på dealer-knappen) er en enorm fordel, fordi du ser, hvad dine modstandere gør, før du selv handler.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Blinds:</strong> De to spillere til venstre for dealerknappen poster obligatoriske indsatser: small blind (typisk halvdelen af big blind) og big blind. Blinds roterer med uret efter hver hånd, hvilket sikrer, at alle spillere betaler lige ofte. Blinds er i den dårligste position postflop – de handler først i alle resterende betting-runder – og betaler desuden en obligatorisk indsats, før de ser deres kort. Professionelle spillere taber konsekvent penge fra blind-positionerne; målet er at minimere tabet, ikke at profitere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Early position (UTG, UTG+1, UTG+2):</strong> De første spillere efter big blind. De handler først preflop og har den mindste mængde information – de ved ikke, hvad de resterende 6–8 spillere vil gøre. Early position kræver en stram håndselection: du bør kun spille stærke hænder (top 10–15 % af starthænder), fordi risikoen for at blive reraised af en spiller i sen position er høj.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Middle position (MP, HJ/Hijack):</strong> Du har set nogle spilleres handlinger, men der er stadig spillere efter dig. Middle position tillader en lidt bredere range – top 15–25 % af starthænder. Du kan begynde at inkludere suited connectors (fx 8♠ 9♠) og mindre par, forudsat at de resterende spillere i sen position ikke er aggressive.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Late position (CO/Cutoff og BTN/Button):</strong> Cutoff er den næstsidste spiller, Button er den sidste. Button er den mest profitable position i poker – du handler altid sidst postflop (flop, turn, river) og har maksimal information. Fra Button kan du spille 35–45 % af alle starthænder profitabelt, fordi du kan "stjæle" blinds med svage hænder, kontrollere pot-størrelsen og udnytte positionel fordel til at lave profitable bluffs. De fleste vindende pokerspillere tjener størstedelen af deres profit fra late position.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Praktisk implikation:</strong> Hvis du er begynder og kun vil ændre én ting i dit spil, er det dette: spil strammere fra early position og løsere fra late position. Denne simple justering alene kan transformere en tabende spiller til en break-even spiller, fordi den udnytter positionens informationsfordel systematisk.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 5 – OUTS OG SANDSYNLIGHEDER ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sandsynligheder og Outs Forklaret</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            "Outs" er antallet af kort, der forbliver i bunken, og som vil forbedre din hånd til en forventet vinder. At tælle outs korrekt er den første byggesten i pokerens matematik – og det er overraskende simpelt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Eksempel 1 – Flush draw:</strong> Du har A♥ 7♥ og boardet viser K♥ 3♥ 9♠. Du har fire hjerter og mangler ét for en flush. Der er 13 hjerter i alt, minus 4 du kan se (dine to + to på boardet) = 9 outs. Af de 47 ukendte kort (52 − 5 sete kort) er 9 hjerter. Sandsynlighed for at ramme på turn: 9/47 = 19,1 %. Sandsynlighed for at ramme på turn ELLER river: ca. 35 %.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Eksempel 2 – Open-ended straight draw:</strong> Du har 8♠ 9♣ og boardet viser 6♦ 7♥ K♣. Du rammer en straight med enhver 5 (fire kort) eller enhver 10 (fire kort) = 8 outs. Sandsynlighed for turn: 8/47 = 17,0 %. Turn + river: ca. 31,5 %.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Eksempel 3 – Gutshot (inside straight draw):</strong> Du har J♠ 10♣ og boardet viser 7♥ 8♣ A♦. Du mangler en 9 for en straight = 4 outs. Sandsynlighed for turn: 4/47 = 8,5 %. Turn + river: ca. 16,5 %. Gutshots er markant svagere end open-ended draws.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>"Reglen om 2 og 4"</strong> er en praktisk genvej: gang dine outs med 2 for sandsynlighed med ét kort (turn), og med 4 for sandsynlighed med to kort (turn + river). Flush draw: 9 × 4 = 36 % (faktisk 35 %). Open-ended straight: 8 × 4 = 32 % (faktisk 31,5 %). Gutshot: 4 × 2 = 8 % (faktisk 8,5 %). Denne genvej er tilstrækkelig præcis til de fleste in-game beslutninger.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Advarsel om diskonterede outs:</strong> Ikke alle outs er "rene". Hvis du har et flush draw, men boardet er parret (fx K♥ 3♥ 3♠), kan en modstander have Full House, og din flush – selvom du rammer den – taber stadig. I sådanne situationer diskonterer du dine outs med 1–2 for at kompensere for risikoen. At tælle outs korrekt kræver altså ikke bare kendskab til dine kort, men også en vurdering af, hvad dine modstandere sandsynligvis holder.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 6 – POT ODDS ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Pot Odds og Beslutningstagning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Pot odds forbinder dine outs med den finansielle beslutning om at calle, folde eller raise. Det er broen mellem sandsynlighedsberegning og pengeindsats – og det er det koncept, der adskiller poker fra gambling.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Beregning:</strong> Pot odds = (puljebeløb + modstanderens indsats) / din indsats for at calle. Eksempel: puljen er 600 kr., modstanderen satser 200 kr. Puljen er nu 800 kr. Du skal betale 200 kr. Pot odds: 800/200 = 4:1. Det svarer til, at du skal vinde mere end 1/(4+1) = 20 % af gangene for at et call er profitabelt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Kombination med outs:</strong> Du har et flush draw (9 outs) på turn. Din equity er ca. 19,1 % (med ét kort). Du får 4:1 pot odds og behøver 20 %. 19,1 % &lt; 20 % – matematisk set er et call marginalt uprofitabelt. Du bør folde (medmindre implied odds ændrer beregningen). Med 5:1 pot odds behøver du kun 16,7 % – nu er et call klart profitabelt med 19,1 % equity.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Implied odds</strong> tager højde for de ekstra penge, du forventer at vinde på fremtidige betting-runder, hvis du rammer din hånd. Eksempel: du har et flush draw, pot odds er marginalt dårlige (4:1 mod 19,1 %), men du forventer, at din modstander vil betale dig en stor indsats, hvis du rammer flushen. Implied odds "tilføjer" den forventede fremtidige gevinst til puljen, hvilket ofte gør et call profitabelt. Implied odds er sværere at kvantificere og kræver erfaring med at vurdere, hvor villig din modstander er til at betale dig.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Reverse implied odds:</strong> Det modsatte scenarie – du rammer din hånd, men taber alligevel mod en stærkere hånd. Eksempel: du har et flush draw, men din modstander har allerede Full House. Når du rammer flushen, satser du stort – og taber alt. Reverse implied odds er særligt relevante, når boardet er parret eller koordineret, fordi risikoen for at "ramme og tabe" er højere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Pot odds er det mest fundamentale analytiske værktøj i poker. Alle andre strategiske koncepter – equity, fold equity, bet sizing, bluff frequency – bygger på pot odds-rammen. At mestre pot odds-beregning er det, der løfter dig fra en spiller, der "går med mavefornemmelsen", til en spiller, der træffer konsekvent profitable beslutninger. Du behøver ikke en lommeregner – "reglen om 2 og 4" plus hurtig mental division er tilstrækkeligt i de fleste situationer.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 7 – BLUFFING ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bluffing – Hvornår Virker Det?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bluffing er pokerens mest ikoniske – og mest misforståede – element. En bluff er en indsats eller raise med en hånd, du ikke tror er den bedste, med det formål at få modstanderen til at folde en bedre hånd. Bluffing er ikke "bare at satse stort" – det er en præcis strategisk handling, der kun er profitabel under specifikke betingelser.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hvornår virker en bluff:</strong> (1) Din modstander har en svag range – de har sandsynligvis ikke en stærk hånd baseret på deres handlinger. (2) Du repræsenterer en troværdig stærk hånd – din betting-linje (sekvensen af dine handlinger) er konsistent med en specifik stærk hånd. (3) Din modstander er kapabel til at folde – nogle spillere kalder alt, og mod dem er bluffing spild af penge. (4) Pot odds'ene kræver ikke, at din bluff virker ofte – en halv-pot bluff behøver kun at virke 33 % af gangene for at være profitabel.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Bluff equity og semi-bluffs:</strong> De bedste bluffs er "semi-bluffs" – indsatser med en hånd, der endnu ikke er den bedste, men har outs til at forbedre sig. Et flush draw-semi-bluff på floppen kombinerer to profitkilder: (1) modstanderen kan folde (bluff-equity), og (2) selv hvis modstanderen kalder, kan du ramme flushen og vinde (draw-equity). En ren bluff (ingen outs) har kun én profitkilde – modstanderens fold. Semi-bluffs er derfor mere profitable og lavere risiko end rene bluffs.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Bluff-frekvens og balancering:</strong> Hvis du aldrig bluffer, vil observante modstandere altid folde mod dine store indsatser (de ved, at du kun satser med stærke hænder). Hvis du bluffer for ofte, vil modstandere kalde dig ned konsekvent. Den optimale bluff-frekvens afhænger af din bet sizing og pot odds'ene – GTO-strategier (Game Theory Optimal) beregner den præcise frekvens, men i praksis er en god tommelfingerregel at bluffe ca. 30–40 % af dine aggressioner (resten er value bets).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Begynderfejl med bluffing:</strong> Den mest udbredte fejl er at bluffe for ofte, mod for mange modstandere, på for ugunstige boards. Bluff sjældent mod mere end 1–2 modstandere (jo flere modstandere, jo lavere sandsynlighed for at alle folder). Bluff ikke på våde boards (mange draws mulige) mod aggressive spillere. Og bluff aldrig af desperation eller "tilt" – en bluff skal være en kalkuleret handling, ikke en emotionel reaktion.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 8 – ONLINE VS LIVE ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Online Poker vs. Live Poker</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Online poker og live poker bruger de samme regler, men spilleoplevelsen og de strategiske krav er markant anderledes. At forstå forskellen hjælper dig med at vælge det format, der passer din spillestil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Tempo:</strong> Online poker er 3–5x hurtigere end live. Et typisk online-bord spiller 60–80 hænder pr. time; live spiller 15–25. Med multi-tabling (flere borde samtidigt) kan online-spillere spille 200–500 hænder pr. time. Det betyder, at din edge realiseres hurtigere online – men det kræver også mere koncentration og staminaudholdenhed.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Tells:</strong> Live poker tilbyder fysiske tells – kropssprog, stemme, timing, chip-handling. Erfarne live-spillere bruger disse signaler til at vurdere modstanderens håndstyrke. Online poker eliminerer fysiske tells, men introducerer timing tells (hvor hurtigt modstanderen handler), betting pattern tells (indsatsstørrelser, frekvenser) og statistiske tells (via HUD-software, der tracker modstanderens historiske spillemønstre).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Sværhedsgrad:</strong> Online poker er generelt sværere på samme stakelevel end live. Årsag: online-spillere har adgang til HUD-data, træningssoftware og replay-analyse, der gør dem mere teknisk kompetente. Live-spillere opererer i højere grad på intuition og observation. En spiller, der vinder konsistent på 5/10 kr. blinds online, vil typisk dominere et 10/20 kr. live-bord.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Social oplevelse:</strong> Live poker er en social aktivitet – du sidder ved et bord med op til 9 andre mennesker, og interaktionen er en del af oplevelsen. Online poker er mere isoleret, men mange platforme tilbyder chat-funktioner og avatar-systemer. For spillere, der primært motiveres af den sociale dimension, er live poker overlegen.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Rake:</strong> Online poker har typisk lavere rake (2,5–5 % med cap) end live poker (5–10 % med cap). Rake er den procentdel af puljen, som casinoet/platformen beholder som betaling for at hoste spillet. Lavere rake online giver spilleren en bedre netto-EV – men den hårdere konkurrence modvirker delvist denne fordel.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 9 – BANKROLL ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bankroll Management – Undgå at Gå Broke</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bankroll management er den mest undervurderede poker-færdighed. Talrige dygtige spillere har gået broke – ikke fordi de spillede dårligt, men fordi de spillede på et stakelevel, deres bankroll ikke kunne bære. Variansen i poker er brutal: selv en vindende spiller kan have tabsperioder, der varer uger eller måneder. Bankroll management beskytter dig mod at gå bust under disse uundgåelige nedture.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Tommelfingerregler:</strong> Cash games (No-Limit Hold'em): 20–30 buy-ins for dit nuværende stakelevel. Med 500 kr. max buy-in: 10.000–15.000 kr. bankroll. Turneringer: 50–100 buy-ins pga. højere varians. Med 100 kr. buy-in: 5.000–10.000 kr. Sit and Go (single table turneringer): 30–50 buy-ins. Disse tal er baseret på simuleringer af vindende spillere med 5–10 bb/100 winrate og sikrer, at sandsynligheden for total bust er under 5 %.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Eksempel med 10.000 kr. bankroll:</strong> Med 25 buy-ins er dit max stakelevel 400 kr. buy-in (typisk 2/4 kr. blinds online). Taber du 5 buy-ins (2.000 kr.), har du 20 buy-ins – stadig komfortabelt. Taber du 10 buy-ins (4.000 kr.), har du 15 buy-ins – overvej at rykke ned i stakes. Under 15 buy-ins: obligatorisk stakes-reduktion. Under 10 buy-ins: spil lavest mulige stakelevel, indtil bankrollen er genopbygget.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Short stack vs. deep stack:</strong> At spille med en kort stack (20–40 bb buy-in) reducerer variansen markant, fordi du har færre komplekse postflop-beslutninger. Deep stack (100+ bb) øger variansen, fordi større potter spilles postflop med mere kompleks strategisk interaktion. Begyndere bør starte med 50–80 bb buy-ins og undgå de dybeste stakespil, indtil de er komfortable med postflop-spil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Den psykologiske dimension:</strong> Bankroll management er ikke kun matematik – det er disciplin. At spille "oppe i stakes" efter en vindersession (fordi du "har råd") er en af de hurtigste veje til bust. Omvendt: at rykke ned i stakes efter en tabssession kræver ydmyghed, men det beskytter din bankroll. De bedste pokerspillere behandler deres bankroll som en virksomheds kapital – den beskyttes, reinvesteres og vokser gradvist. <Link to="/ansvarligt-spil" className={linkClass}>Ansvarligt spil</Link> i poker-kontekst handler primært om bankroll-disciplin.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 10 – FEJL ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Typiske Fejl Begyndere Laver</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            At kende de mest udbredte fejl er den hurtigste vej til forbedring – fordi de fleste nybegyndere laver de samme fejl, igen og igen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>1. Spille for mange hænder.</strong> Begyndere spiller 40–60 % af alle starthænder. Vindende spillere spiller 15–25 % (afhængigt af position). At folde er den mest profitable handling i poker – du taber intet ved at folde preflop, men du taber konsistent ved at spille marginale hænder ud af position.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>2. Ignorere position.</strong> At spille den samme range fra alle positioner er en fundamental fejl. En hånd som K-J suited er profitabel fra Button men tabende fra UTG. Position definerer din ranges profitabilitet – respektér den.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>3. Passivt spil (calling station).</strong> Begyndere kalder for meget og raiser for lidt. At kalde er den svageste handling i poker – du giver modstanderen kontrol over pottens størrelse og afslører svaghed. Aggressive spillere (raise/fold) er langt mere profitable end passive spillere (call/call), fordi de vinder potter to veje: med den bedste hånd OG ved at få modstandere til at folde.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>4. Tilt.</strong> At spille emotionelt efter et bad beat – typisk ved at spille flere hænder, større pots og mere aggressivt end optimalt. Tilt er den hurtigste bankroll-destroyer i poker. De bedste spillere har en tilt-management-plan: stop, tag en pause, analysér hånden rationelt, og genoptag først, når du er mental neutral.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>5. Forelske sig i sin hånd.</strong> At investere for mange chips i et par esser, når boardet viser fire til en straight og tre til en flush. Overpairs (ét par over boardet) er den håndtype, der koster begyndere flest chips, fordi de ikke kan lægge den ned, selv når alle tegn peger på, at de er slået.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>6. Manglende betsizing.</strong> At satse tilfældige beløb i stedet for strategisk dimensionerede indsatser. En god indsats tjener et formål: at beskytte din hånd, at bygge puljen med value hænder, eller at repræsentere en bestemt håndstyrke med en bluff. Indsatsstørrelsen bør altid reflektere dit strategiske mål – ikke din mavefornemmelse.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 11 – REGULERING ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Poker i Danmark – Regulering og Licens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Poker er fuldt lovligt i Danmark under Spilleloven af 2012. Både casino poker (mod huset) og spiller-vs-spiller poker (cash games og turneringer) kræver licens fra den danske Spillemyndighed. Gevinster fra licenserede platforme er skattefrie. ROFUS-registrering giver dig mulighed for selvudelukkelse, og alle operatører skal tilbyde indbetalingsgrænser, tabsgrænser og reality checks.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For spiller-vs-spiller poker gælder særlige krav: operatøren skal sikre, at spillepoolen er isoleret til danske spillere (eller delt med andre regulerede markeder under aftale), at anti-kollusion-systemer er implementeret, og at rakeback-programmer er transparente. Hjemmepoker (ikke-kommercielt) er lovligt uden licens, forudsat at der ikke opkræves rake eller gebyrer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Et vigtigt caveat: ikke alle internationale pokersites har dansk licens. Platforme som PokerStars, 888poker og partypoker har danske licenser – men mange mindre sites opererer uden. Spiller du på en ulicenseret platform, mister du skattefrihed, spillerbeskyttelse og juridisk recours ved tvister. Tjek altid licensen på Spillemyndighedens hjemmeside, før du opretter en konto.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 12 – FÆRDIGHED ELLER HASARD ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Er Poker et Færdighedsspil eller Hasard?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne debat har stået på i årtier og har juridiske, skattemæssige og filosofiske implikationer. Svaret afhænger af tidshorisonten.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Kortsigtigt (1 hånd):</strong> Poker er primært held. De udleverede kort bestemmer resultatet, og selv den bedste strategi kan ikke kompensere for dårlige kort i en enkelt hånd. En nybegynder med pocket aces slår en professionel med 7-2 offsuit 85 % af gangene – uanset færdighed.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Mellemlangsigtigt (100–1.000 hænder):</strong> Færdighed begynder at vise sig. En vindende spiller vil have positive resultater i de fleste samples af denne størrelse, men variansen kan stadig producere tabsperioder. Det svarer til en session eller to – og det er i dette vindue, at mange spillere fejlvurderer deres eget niveau (både opad og nedad).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Langsigtet (10.000+ hænder):</strong> Poker er entydigt et færdighedsspil. Studier af store databaser (millioner af hænder) viser, at de øverste 10 % af spillere konsistent vinder, de nederste 10 % konsistent taber, og midtergruppen svinger omkring break-even. Denne konsistens er et entydigt signal om, at færdighed – ikke held – driver resultaterne. Sammenlign med <Link to="/casinospil/roulette" className={linkClass}>roulette</Link>: over 10.000 spins konvergerer ALLE spillere mod -2,70 %, uanset deres "strategi".
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Juridisk status:</strong> Danmark klassificerer spiller-vs-spiller poker som et "blandingsspil" (held + færdighed), reguleret under Spilleloven. Det placerer poker i en gråzone mellem rene hasardspil (<Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link>, <Link to="/casinospil/roulette" className={linkClass}>roulette</Link>) og rene færdighedsspil (skak). Casino poker (mod huset) klassificeres som hasardspil, fordi spillerens beslutninger ikke kan eliminere house edge.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 13 – HVEM PASSER TIL ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvem Passer Poker Til?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Poker er ikke for alle – det kræver en kombination af analytisk evne, emotionel kontrol og tidsinvestering, der adskiller det fra de fleste andre casinospil. At matche dine personlige egenskaber med spillets krav er den bedste forudsætning for en positiv oplevelse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Poker passer til dig, hvis:</strong> Du nyder strategisk tænkning og problemløsning. Du er komfortabel med usikkerhed og kan træffe beslutninger med ufuldstændig information. Du har tålmodighed til at folde 75 % af dine hænder. Du er villig til at studere og analysere dit eget spil. Du kan håndtere tab uden at lade det påvirke dine beslutninger. Du nyder konkurrence mod andre mennesker (i modsætning til maskiner).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Poker passer måske ikke, hvis:</strong> Du foretrækker øjeblikkelig gratifikation – poker kræver tålmodighed. Du har svært ved at kontrollere følelser under pres – tilt er en konstant risiko. Du har begrænset tid – at udvikle sig i poker kræver tusindvis af hænder og aktiv analyse. Du er primært motiveret af hurtige gevinster – poker belønner langsigtet tænkning, ikke kortsigtet gambling.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Casino poker vs. spiller-vs-spiller:</strong> Hvis du nyder poker-hænder men ikke konkurrenceelementet, er casino poker (Caribbean Stud, Casino Hold'em) og Video Poker fremragende alternativer. Du spiller mod faste regler, der er ingen bluffing eller psykologi involveret, og du kan fokusere rent på håndstyrker og odds. Video Poker tilbyder desuden de bedste RTP-værdier i hele casinobranchen med perfekt strategi. Det er poker for den analytiske spiller, der foretrækker matematik over psykologi.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 14 – TRIN FOR TRIN ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sådan Kommer Du i Gang – Trin for Trin</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 1 – Lær håndrangeringerne udenad.</strong> Før du sætter dig ved et pokerbord, skal du kunne se en hånd og øjeblikkeligt vurdere dens styrke. Brug vores tabel ovenfor som reference. Øv dig med et kortspil derhjemme: del fem kort, identificér hånden, gentag. Efter 50–100 gentagelser sidder det i muskelhukommelsen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 2 – Start med mikrostakes online.</strong> De laveste stakelevel online (0,01/0,02 kr. blinds, 2 kr. buy-in) giver dig mulighed for at spille rigtige penge-poker med minimal risiko. Du behøver kun 50–100 kr. som startbankroll. Det vigtige er, at du spiller om rigtige penge – gratis poker uden finansiel risiko giver ikke den feedback, du behøver for at lære (spillere opfører sig fundamentalt anderledes, når der er penge på spil).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 3 – Spil stamt (tight) og aggressivt.</strong> Som nybegynder, hold dig til de top 15–20 % af starthænder: store par (AA, KK, QQ, JJ, 10-10), store aces (AK, AQ, AJ suited), og selected suited connectors fra sen position. Når du spiller en hånd, spil den aggressivt – raise preflop, continuation bet på floppen, og vær villig til at folde, hvis modstanden indikerer styrke.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Trin 4 – Analysér dine hænder.</strong> De fleste online-platforme giver dig adgang til din håndhistorik. Gennemgå dine sessioner, identificér fejl, og spørg: "Var dette call profitabelt baseret på pot odds?" og "Repræsenterede min bluff en troværdig hånd?" Selvanalyse er den vigtigste kilde til forbedring – langt vigtigere end at spille flere hænder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Trin 5 – Sæt grænser og overhold dem.</strong> Poker er underholdning med et strategisk element – men det er stadig et spil, der kan koste penge. Sæt en bankroll-grænse, der matcher din økonomi. Brug aldrig penge, du ikke har råd til at tabe. Og hvis du oplever, at poker begynder at påvirke din økonomi, dit humør eller dine relationer negativt, er det tid til at bruge de <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>-værktøjer, der er tilgængelige på alle danske platforme.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 15 – VIDERE LÆSNING ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Videre Læsning: Strategier og Avanceret Analyse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Denne guide har dækket pokerens fundamentale elementer – fra varianter og håndrangeringer til pot odds, bluffing og bankroll management. Med denne viden har du et solidt fundament for at spille informeret poker og begynde din strategiske rejse.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For sammenligning med andre strategiske <Link to="/casinospil" className={linkClass}>casinospil</Link> anbefaler vi vores guides til <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> (det eneste rene casinospil med spillerfordel via basic strategy), <Link to="/casinospil/baccarat" className={linkClass}>baccarat</Link> (det simpleste bordspil med den laveste house edge) og <Link to="/casinospil/craps" className={linkClass}>craps</Link> (det mest sociale terningespil med favorable odds på pass line).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Poker er det eneste casinospil, der belønner langsigtet investering i læring. Hvert studie du gennemfører, hver hånd du analyserer, og hver fejl du identificerer, øger din forventede værdi ved bordet. Det er den ultimative appel: i poker er du ikke op mod en uovervindelig matematisk fordel – du er op mod andre mennesker. Og med tilstrækkelig viden, disciplin og erfaring kan du komme ud på den rigtige side.
          </p>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/casinospil/poker" />

        <FAQSection faqs={pokerFaqs} />

        <AuthorBio author="jonas" showCommunity={false} />
      </div>
    </>
  );
};

export default PokerGuide;

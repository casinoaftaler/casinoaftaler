import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { AuthorBio } from "@/components/AuthorBio";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";
import crapsHero from "@/assets/heroes/craps-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

/* ───────────────────────── FAQ ───────────────────────── */

const crapsFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad er den laveste house edge i craps?",
    answer:
      "Don't Pass / Don't Come har den laveste faste house edge på 1,36 %. Men det reelle svar er Odds Bets, som har en house edge på præcis 0,00 % – de udbetaler til true odds uden nogen casinofordel. Kombinationen af Don't Pass (1,36 %) med maksimale Odds Bets reducerer den samlede effektive house edge til under 0,15 % ved 10x odds. Det gør craps til et af de mest spillervenlige casinospil overhovedet – forudsat du holder dig til de rigtige væddemål og undgår proposition bets i midten af bordet.",
  },
  {
    question: "Er Don't Pass bedre end Pass Line matematisk?",
    answer:
      "Ja – marginalt. Don't Pass har 1,36 % house edge vs. Pass Lines 1,41 %. Forskellen er 0,05 procentpoint, hvilket over 1.000 indsatser á 100 kr. svarer til 50 kr. forskel i forventet tab (1.360 kr. vs. 1.410 kr.). Matematisk er Don't Pass det overlegne væddemål. I fysiske casinoer betragtes Don't Pass-spillere som 'wrong bettors', fordi de satser mod kasteren – en social stigma der ikke eksisterer online. Begge væddemål kan forstærkes med Odds Bets (0 % house edge), som reducerer den samlede edge yderligere.",
  },
  {
    question: "Er craps det mest volatile casinospil?",
    answer: (
      <>
        Nej – det afhænger af væddemålet. Pass Line-craps har lavere varians end de fleste <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link>. En Pass Line-indsats vinder 49,29 % af gangene med 1:1 udbetaling – det er tæt på en coinflip. Proposition bets (fx Yo/11 med 15:1 payout) har meget høj varians, sammenlignelig med high-volatility slots. Craps er det mest fleksible casinospil: du kan vælge lav varians (Pass Line + Odds) eller ekstrem varians (proposition bets). Dit valg af væddemål bestemmer din risikoprofil mere end selve spillet.
      </>
    ),
  },
  {
    question: "Hvad betyder free odds i craps?",
    answer:
      "Free odds (også kaldet Odds Bets) er et supplerende væddemål, du kan placere bag din Pass Line- eller Don't Pass-indsats efter et point er etableret. Det unikke er, at casinoet udbetaler til de sande matematiske odds – 2:1 for 4/10, 3:2 for 5/9, 6:5 for 6/8 – uden nogen markup. House edge er 0,00 %. Casinoet tilbyder dette væddemål, fordi du først skal lave en Pass Line-indsats (med 1,41 % edge) for at kvalificere. Odds Bets annonceres ikke synligt på bordet – du skal vide, de eksisterer. Jo større din Odds Bet relativt til din Pass Line, jo lavere er din samlede house edge.",
  },
  {
    question: "Kan man slå craps med strategi?",
    answer: (
      <>
        Nej – ingen strategi kan eliminere house edge i craps. Hvert væddemål har en fast negativ forventet værdi, og intet system (Martingale, 3-Point Molly, Iron Cross) ændrer denne matematik. Hvad du kan gøre er at optimere dit valg af væddemål: Pass/Don't Pass + maksimale Odds Bets giver den lavest mulige house edge. Sammenlignet med <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> (2,7 %) og <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> (2–8 %), er craps med korrekte væddemål et af de bedste spil matematisk – men det er stadig et negativt forventet værdi-spil.
      </>
    ),
  },
  {
    question: "Hvad er den værste bet i craps?",
    answer:
      "Any 7 – med en house edge på 16,67 %. Du satser på, at næste kast er en 7. Sandsynlighed: 6/36 = 16,67 %. Udbetaling: 4:1. Fair udbetaling ville være 5:1. Forskellen (16,67 %) er casinoets profit. Andre forfærdelige væddemål: Big 6/Big 8 (9,09 % edge – Place 6/8 giver 1,52 % for det samme udfald), Hardway 4/10 (11,11 %) og Horn (12,5 %). Tommelfingerreglen: alt i midten af crapsbordet har forfærdelig house edge. De farverigste, mest synlige væddemål er designet til at lokke – og de er uden undtagelse de dårligste.",
  },
  {
    question: "Er online craps fair?",
    answer:
      "Ja – på licenserede platforme. Online craps bruger certificerede Random Number Generators (RNG), der testes af uafhængige laboratorier (eCOGRA, iTech Labs, BMM Testlabs). Den danske Spillemyndighed kræver regelmæssig audit af alle RNG-systemer. Sandsynlighederne er identiske med fysisk craps: 36 terningekombinationer med præcis de samme frekvenser. Det, der kan føles 'anderledes' online, er tempoet – du spiller langt flere kast pr. time online end live, hvilket betyder, at house edge realiseres hurtigere. Dine odds er de samme, men din eksponering pr. time er højere.",
  },
  {
    question: "Hvor meget bankroll bør man have til craps?",
    answer: (
      <>
        Minimum 30–50 gange din samlede indsats pr. runde (Pass Line + Odds Bet). Med 100 kr. Pass Line og 3x Odds (300 kr.) = 400 kr. pr. runde → bankroll bør være 12.000–20.000 kr. for komfortabelt spil. For lavere varians: 100 kr. Pass Line uden Odds = 3.000–5.000 kr. bankroll. Proposition bets kræver signifikant større bankroll pga. høj varians. Bankroll management handler ikke om at vinde – det handler om at overleve variansens uundgåelige svingninger og bevare spillets <Link to="/ansvarligt-spil" className={linkClass}>underholdningsværdi</Link>.
      </>
    ),
  },
];

/* ───────────────────────── PAGE ───────────────────────── */

const CrapsGuide = () => {
  const faqJsonLd = buildFaqSchema(crapsFaqs);
  const articleSchema = buildArticleSchema({
    headline: "Craps Matematik 2026 – Odds, House Edge og Sandsynligheder",
    description:
      "Matematisk analyse af craps: terningekombinationer, house edge for alle væddemål, EV-beregning, varians og bankroll management.",
    url: `${SITE_URL}/casinospil/craps`,
    datePublished: "2026-02-15",
    dateModified: "2026-02-18",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  // BreadcrumbList is auto-generated by SEO.tsx via buildBreadcrumbListSchema() – no manual injection needed.

  return (
    <>
      <SEO
        title="Craps Matematik 2026 – Odds, Edge og Analyse"
        description="Matematisk analyse af craps: terningekombinationer, house edge for alle væddemål, EV-beregning, varians og bankroll management."
        jsonLd={[faqJsonLd, articleSchema]}
      />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Brain className="mr-1.5 h-3.5 w-3.5" /> Matematik · Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Craps – Sandsynligheder, House Edge og Matematisk Analyse
            </h1>
            <p className="text-lg text-white/80">
              Terningekombinationer, EV-beregning og varians – den analytiske craps-guide.
            </p>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="18-02-2026" readTime="25 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={crapsHero}
            alt="Craps-bord med terninger og chips set fra analytisk perspektiv"
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* ═══════════════ 1 – MATEMATISK FORKLARING ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Craps Forklaret Matematisk – Hvorfor Spillet Ser Kaotisk Ud</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Craps er det <Link to="/casinospil" className={linkClass}>casinospil</Link>, der virker mest overvældende for udenforstående. Bordet er dækket af markeringer for dusinvis af væddemål, terminologien er unik ("come-out roll", "seven out", "hardways"), og handlingen bevæger sig hurtigt med høj energi. Men bag den kaotiske overflade er craps et af de mest gennemsigtige og matematisk elegante spil i casinoet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hele spillets matematik hviler på ét simpelt fundament: to seks-sidede terninger kastes, og summen bestemmer udfaldet. Det giver 36 mulige kombinationer (6 × 6) med en fordeling, der er fuldstændig symmetrisk omkring 7. Denne fordeling er deterministisk – den ændres aldrig, uanset hvad der er sket i tidligere kast. Hvert kast er uafhængigt. Der er ingen "mønstre", ingen "tendenser", og ingen "hot streaks" i matematisk forstand.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det, der gør craps matematisk interessant, er ikke spillet selv – det er det enorme spænd i <Link to="/ordbog/house-edge" className={linkClass}>house edge</Link> mellem de tilgængelige væddemål. Pass Line har 1,41 % edge. Odds Bets har 0 %. Any 7 har 16,67 %. Det er et spænd på over 16 procentpoint inden for det samme spil. Intet andet casinospil tilbyder denne fleksibilitet: du kan vælge at spille med næsten fair odds eller med forfærdelig edge, alt efter hvilke væddemål du placerer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Denne guide er en matematisk gennemgang af craps. Vi analyserer sandsynlighedsfordelingen, beregner house edge for alle relevante væddemål, forklarer Expected Value (EV) med konkrete tal, og vurderer varians og risikoprofiler. Formålet er ikke at lære dig "tricks" eller "systemer" – det er at give dig den analytiske forståelse, der gør dig til en informeret spiller, der ved præcis hvad hvert væddemål koster.
          </p>
        </section>

        <InlineCasinoCards title="Bedste Casinoer til Craps" count={6} />

        <Separator className="my-10" />

        {/* ═══════════════ 2 – TERNINGEKOMBINATIONER ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Terningekombinationer og Sandsynlighedsfordeling</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            To seks-sidede terninger producerer summer fra 2 til 12. De 36 mulige kombinationer fordeles ulige: 7 er den mest sandsynlige sum, mens 2 og 12 er de mindst sandsynlige. Denne fordeling er fundamentet for alle odds- og house edge-beregninger i craps.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Sum</th>
                  <th className="px-4 py-3 text-left font-semibold">Kombinationer</th>
                  <th className="px-4 py-3 text-center font-semibold">Antal</th>
                  <th className="px-4 py-3 text-center font-semibold">Sandsynlighed</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">2</td><td className="px-4 py-2">1+1</td><td className="px-4 py-2 text-center">1</td><td className="px-4 py-2 text-center">2,78 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">3</td><td className="px-4 py-2">1+2, 2+1</td><td className="px-4 py-2 text-center">2</td><td className="px-4 py-2 text-center">5,56 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">4</td><td className="px-4 py-2">1+3, 2+2, 3+1</td><td className="px-4 py-2 text-center">3</td><td className="px-4 py-2 text-center">8,33 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">5</td><td className="px-4 py-2">1+4, 2+3, 3+2, 4+1</td><td className="px-4 py-2 text-center">4</td><td className="px-4 py-2 text-center">11,11 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">6</td><td className="px-4 py-2">1+5, 2+4, 3+3, 4+2, 5+1</td><td className="px-4 py-2 text-center">5</td><td className="px-4 py-2 text-center">13,89 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">7</td><td className="px-4 py-2">1+6, 2+5, 3+4, 4+3, 5+2, 6+1</td><td className="px-4 py-2 text-center">6</td><td className="px-4 py-2 text-center">16,67 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">8</td><td className="px-4 py-2">2+6, 3+5, 4+4, 5+3, 6+2</td><td className="px-4 py-2 text-center">5</td><td className="px-4 py-2 text-center">13,89 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">9</td><td className="px-4 py-2">3+6, 4+5, 5+4, 6+3</td><td className="px-4 py-2 text-center">4</td><td className="px-4 py-2 text-center">11,11 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">10</td><td className="px-4 py-2">4+6, 5+5, 6+4</td><td className="px-4 py-2 text-center">3</td><td className="px-4 py-2 text-center">8,33 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">11</td><td className="px-4 py-2">5+6, 6+5</td><td className="px-4 py-2 text-center">2</td><td className="px-4 py-2 text-center">5,56 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">12</td><td className="px-4 py-2">6+6</td><td className="px-4 py-2 text-center">1</td><td className="px-4 py-2 text-center">2,78 %</td></tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fordelingen er perfekt symmetrisk: 2 og 12 har begge 1 kombination, 3 og 11 har begge 2, osv. Toppunktet er 7 med 6 kombinationer ud af 36 – en sandsynlighed på 16,67 %. Det er afgørende: 7 er den mest sandsynlige sum og udgør det "gravitationspunkt", som hele craps-spillet er konstrueret omkring. Hver gang et point er etableret (4, 5, 6, 8, 9, 10), er konkurrencen mellem det point og en 7 – og 7 har altid den bedre sandsynlighed. Det er præcis denne asymmetri, der giver casinoet sin fordel på Pass Line.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Vigtig nuance:</strong> Selvom 7 er den mest sandsynlige individuelle sum, er sandsynligheden for "ikke-7" langt højere: 30/36 = 83,33 %. Det er den psykologiske fælde – det "meste af tiden" er 7 fraværende, hvilket giver en illusion af, at specifikke numre er "varme" eller at 7'ere kan undgås. De kan ikke. Over mange kast konvergerer frekvensen af 7'ere uundgåeligt mod 16,67 %.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 3 – COME OUT ROLL ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Come Out Roll – Sandsynlighedsstruktur</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Come-out roll er det første kast i en ny craps-runde og bestemmer, om runden afsluttes med det samme eller fortsætter med et etableret point. Tre udfald er mulige: "natural" (7 eller 11 – Pass Line vinder), "craps" (2, 3 eller 12 – Pass Line taber), eller et point etableres (4, 5, 6, 8, 9, 10).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Sandsynlighed for natural (7 eller 11):</strong> 6/36 + 2/36 = 8/36 = 22,22 %. Pass Line vinder øjeblikkeligt i ca. 1 ud af 4,5 come-out rolls. <strong>Sandsynlighed for craps (2, 3 eller 12):</strong> 1/36 + 2/36 + 1/36 = 4/36 = 11,11 %. Pass Line taber øjeblikkeligt i ca. 1 ud af 9 come-out rolls. <strong>Sandsynlighed for point (4, 5, 6, 8, 9, 10):</strong> 24/36 = 66,67 %. Runden fortsætter i ca. 2 ud af 3 come-out rolls.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når et point er etableret, kaster kasteren gentagne gange, indtil enten pointet rammes (Pass Line vinder, 1:1 udbetaling) eller en 7 kastes ("seven out" – Pass Line taber). Her er sandsynlighederne for at ramme hvert point før en 7: Point 4 eller 10: 3 kombinationer vs. 6 for 7 → 3/9 = 33,33 % chance for at ramme. Point 5 eller 9: 4 kombinationer vs. 6 for 7 → 4/10 = 40 % chance. Point 6 eller 8: 5 kombinationer vs. 6 for 7 → 5/11 = 45,45 % chance.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Den samlede sandsynlighed for at vinde en Pass Line-indsats (gennem alle faser) er 244/495 = 49,293 %. Sandsynligheden for at tabe er 251/495 = 50,707 %. Forskellen – 1,414 % – er Pass Lines house edge. Bemærk det elegante: Pass Line er næsten en fair bet. Du taber lidt mere end halvdelen af gangene, men udbetalingen er altid 1:1. Den lille asymmetri (50,71 % vs. 49,29 %) er hele casinoets fortjeneste.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 4 – PASS VS DON'T PASS ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Pass Line vs. Don't Pass – Hvem Har Fordel?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Pass Line og Don't Pass er spejlbilleder – med en vigtig asymmetri. Pass Line vinder på 7/11 come-out og taber på 2/3/12. Don't Pass vinder på 2/3 come-out, taber på 7/11, og 12 er en "push" (bar 12). Denne push på 12 er nøglen: uden den ville Don't Pass have en spillerfordel, fordi det ville være et perfekt omvendt Pass Line. Ved at gøre 12 til push reducerer casinoet Don't Pass-spillerens fordel til -1,36 % (i stedet for en positiv forventet værdi).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Pass Line-beregning:</strong> Vindsandsynlighed = 244/495 = 49,293 %. EV pr. 100 kr. indsats = (0,49293 × 100) − (0,50707 × 100) = −1,414 kr. House edge = 1,414 %. <strong>Don't Pass-beregning:</strong> Vindsandsynlighed = 949/1.980 = 47,929 %. Tabsandsynlighed = 949/1.980 − (overvej push) → netto EV pr. 100 kr. = −1,364 kr. House edge = 1,364 %.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den matematiske konklusion er entydig: Don't Pass er det bedre væddemål med 0,05 procentpoint lavere house edge. Over 10.000 indsatser á 100 kr. sparer Don't Pass-spilleren ca. 500 kr. i forventet tab (13.640 kr. vs. 14.140 kr.). Det er en reel, om end beskeden, forskel.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I praksis vælger de fleste spillere Pass Line af sociale og psykologiske årsager: at "satse med kasteren" føles mere positivt. Don't Pass-spillere satser mod kasteren og mod flertallet – i fysiske casinoer kan det skabe social friktion. Online er dette irrelevant, og der er ingen grund til ikke at vælge det matematisk overlegne væddemål. Begge væddemål er dog fremragende sammenlignet med alternativerne: <Link to="/casinospil/roulette" className={linkClass}>europæisk roulette</Link> har 2,70 % edge – næsten det dobbelte af Pass Line.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 5 – ODDS BETS ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Odds Bets – Hvorfor De Er "Fair Bets"</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Odds Bets er det eneste væddemål i et kommercielt casino med en house edge på præcis 0 %. Det er ikke en marketingpåstand – det er matematisk verificerbart. Casinoet udbetaler Odds Bets til de sande sandsynlighedsodds, uden nogen markup.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Beregningen for point 4 (identisk for 10):</strong> Sandsynlighed for at ramme 4 før 7: 3 kombinationer for 4 vs. 6 for 7 = 3/9. True odds er 6:3 = 2:1. Casinoet udbetaler 2:1. EV pr. 100 kr. Odds Bet: (3/9 × 200) − (6/9 × 100) = 66,67 − 66,67 = 0,00 kr. House edge: 0 %.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Point 5/9:</strong> True odds 6:4 = 3:2. Udbetaling: 3:2. EV = 0. <strong>Point 6/8:</strong> True odds 6:5. Udbetaling: 6:5. EV = 0. Alle Odds Bets er matematisk neutrale – casinoet har ingen fordel, og spilleren har ingen fordel.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Effekt på samlet house edge:</strong> Da Odds Bets har 0 % edge, "fortynder" de den 1,41 % edge på din Pass Line-indsats. Eksempel: 100 kr. Pass Line + 100 kr. Odds (1x) → samlet indsats 200 kr., samlet edge = 1,41 %/2 = 0,71 %. Med 2x Odds (200 kr.): 0,47 %. Med 5x Odds (500 kr.): 0,24 %. Med 10x Odds (1.000 kr.): 0,13 %. Med 100x Odds (tilgængeligt på enkelte casinoer): 0,014 %.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hvorfor tilbyder casinoer dette tilsyneladende umulige væddemål? Fordi du skal først have en Pass Line-indsats (med 1,41 % edge) for at kvalificere. Casinoets profit på Pass Line er garanteret – Odds Bets er en mekanisme til at tiltrække og fastholde spillere. Desuden har Odds Bets høj varians (store udsving), og de fleste spillere har ikke bankroll eller disciplin til at udnytte dem maksimalt. Casinoet tjener tilstrækkeligt på spillernes øvrige væddemål – herunder de lukrative proposition bets.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 6 – PLACE BETS ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Place Bets og Deres Reelle House Edge</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Place Bets lader dig satse direkte på et specifikt nummer (4, 5, 6, 8, 9 eller 10) uden at gå gennem come-out processen. Du vinder, hvis nummeret kastes før en 7, og taber, hvis 7 kommer først. Udbetalingerne er fastsat af casinoet – og det er her, house edge opstår: udbetalingerne er lavere end true odds.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Place 6 og Place 8:</strong> True odds er 6:5 (5 måder at lave 6/8 vs. 6 måder at lave 7). Casinoudbetaling: 7:6. EV pr. 6 kr. indsats: (5/11 × 7) − (6/11 × 6) = 3,182 − 3,273 = −0,091 kr. House edge: 0,091/6 = 1,52 %. Dette er et acceptabelt væddemål – bedre end europæisk roulette.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Place 5 og Place 9:</strong> True odds er 6:4 = 3:2. Casinoudbetaling: 7:5. EV pr. 5 kr. indsats: (4/10 × 7) − (6/10 × 5) = 2,800 − 3,000 = −0,200 kr. House edge: 0,200/5 = 4,00 %. Signifikant dårligere end Pass Line + Odds.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Place 4 og Place 10:</strong> True odds er 6:3 = 2:1. Casinoudbetaling: 9:5. EV pr. 5 kr. indsats: (3/9 × 9) − (6/9 × 5) = 3,000 − 3,333 = −0,333 kr. House edge: 0,333/5 = 6,67 %. Forfærdeligt – næsten fem gange værre end Pass Line.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Konklusion:</strong> Place 6 og Place 8 (1,52 %) er de eneste Place Bets, der er matematisk forsvarlige. Place 5/9 (4,00 %) og Place 4/10 (6,67 %) bør erstattes af Pass/Come + Odds Bets, der giver identisk eksponering til de samme numre med langt lavere house edge. Den vigtige lektion: to væddemål, der ser ens ud på overfladen (satse på at 6 rammes før 7), kan have dramatisk forskellige house edges afhængigt af udbetalingsstrukturen.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 7 – FIELD BET ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Field Bet – Populær Men Matematisk Svag</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Field Bet er en af de mest populære craps-indsatser blandt casual spillere. Den afvikles på ét kast: du vinder, hvis det næste kast er 2, 3, 4, 9, 10, 11 eller 12, og taber på 5, 6, 7 eller 8. Det virker fantastisk – syv vindende numre mod kun fire tabende. Men sandsynlighederne fortæller en helt anden historie.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Vindende kombinationer:</strong> 2 (1 kombination, udbetaler 2:1), 3 (2), 4 (3), 9 (4), 10 (3), 11 (2), 12 (1 kombination, udbetaler 2:1 eller 3:1 afhængig af casino). Standard: 16 vindende kombinationer med de fleste til 1:1 udbetaling. <strong>Tabende kombinationer:</strong> 5 (4), 6 (5), 7 (6), 8 (5) = 20 tabende kombinationer. Du taber på 20/36 = 55,56 % af kastene.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>EV-beregning (2 og 12 betaler 2:1):</strong> Vinding: 14 kast á 1:1 + 1 kast á 2:1 (for 2) + 1 kast á 2:1 (for 12) = 14 × 100 + 1 × 200 + 1 × 200 = 1.800 kr. Tab: 20 × 100 = 2.000 kr. Netto pr. 36 kast: 1.800 − 2.000 = −200 kr. House edge: 200/(36 × 100) = 5,56 %. Det er forfærdeligt – næsten fire gange værre end Pass Line.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Med 3x udbetaling på 12:</strong> Vinding: 14 × 100 + 1 × 200 + 1 × 300 = 1.900 kr. House edge: (2.000 − 1.900)/(36 × 100) = 2,78 %. Bedre, men stadig dobbelt så dyrt som Pass Line. Field Bet er designet til at appellere til den psykologiske bias, at "mange vindende numre = godt væddemål". I virkeligheden tæller kombinationer, ikke numre – og de fire "tabende" numre (5, 6, 7, 8) tilsammen udgør 20 ud af 36 kombinationer.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 8 – PROPOSITION BETS ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Proposition Bets – Casinoets Guldmine</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Proposition bets (ofte kaldet "prop bets" eller "center bets") er de væddemål, der er placeret i midten af crapsbordet. De har høje udbetalinger (op til 30:1), de afvikles typisk på ét kast, og de har de absolut værste house edges i hele casinoet. De er casinoets primære profitkilde i craps – og de er designet til at friste med synlig udbetaling og skjule den reelle matematiske omkostning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Any 7:</strong> Sandsynlighed: 6/36 = 16,67 %. Udbetaling: 4:1. True odds: 5:1. EV pr. 100 kr.: (6/36 × 400) − (30/36 × 100) = 66,67 − 83,33 = −16,67 kr. House edge: 16,67 %. Det er det dårligste væddemål i craps og et af de dårligste i hele casinobranchen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Any Craps (2, 3 eller 12):</strong> Sandsynlighed: 4/36 = 11,11 %. Udbetaling: 7:1. True odds: 8:1. House edge: 11,11 %. <strong>Yo (11):</strong> Sandsynlighed: 2/36 = 5,56 %. Udbetaling: 15:1. True odds: 17:1. House edge: 11,11 %. <strong>Snake Eyes (2) / Boxcars (12):</strong> Sandsynlighed: 1/36 = 2,78 %. Udbetaling: 30:1. True odds: 35:1. House edge: 13,89 %.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hardways:</strong> Hard 6 (3+3) og Hard 8 (4+4): sandsynlighed 1/36 for hardway vs. "easy" (andre kombinationer) + 7. Hard 6: 1 måde hard, 4 måder easy, 6 måder 7 = 1/11 chance. Udbetaling: 9:1. True odds: 10:1. House edge: 9,09 %. Hard 4 (2+2) og Hard 10 (5+5): 1 måde hard, 2 måder easy, 6 måder 7 = 1/9 chance. Udbetaling: 7:1. True odds: 8:1. House edge: 11,11 %.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Horn Bet:</strong> Kombinerer 2, 3, 11 og 12 i ét væddemål. Du deler din indsats i fire: én del på hvert nummer. Gennemsnitlig house edge: ca. 12,5 %. <strong>Hop Bets:</strong> Satser på en specifik kombination (fx 2-5). Udbetaling: 15:1 (for "easy") eller 30:1 (for par). House edge: 11,11–13,89 %. Der er absolut ingen matematisk grund til at spille nogen proposition bet – de eksisterer udelukkende for at generere profit til casinoet fra spillere, der tiltrækkes af høje udbetalinger uden at forstå den underliggende sandsynlighed.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 9 – HOUSE EDGE TABEL ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">House Edge Tabel – Komplet Oversigt</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Nedenstående tabel samler house edge for alle standard craps-væddemål – sorteret fra laveste til højeste edge. Den er dit primære beslutningsværktøj: hold dig til den øverste tredjedel og undgå den nederste.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Væddemål</th>
                  <th className="px-4 py-3 text-center font-semibold">Udbetaling</th>
                  <th className="px-4 py-3 text-center font-semibold">True Odds</th>
                  <th className="px-4 py-3 text-center font-semibold">House Edge</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border bg-primary/5"><td className="px-4 py-2 font-medium">Odds Bet (alle point)</td><td className="px-4 py-2 text-center">True odds</td><td className="px-4 py-2 text-center">–</td><td className="px-4 py-2 text-center font-bold">0,00 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Don't Pass / Don't Come</td><td className="px-4 py-2 text-center">1:1</td><td className="px-4 py-2 text-center">–</td><td className="px-4 py-2 text-center">1,36 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">Pass Line / Come</td><td className="px-4 py-2 text-center">1:1</td><td className="px-4 py-2 text-center">–</td><td className="px-4 py-2 text-center">1,41 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Place 6 / Place 8</td><td className="px-4 py-2 text-center">7:6</td><td className="px-4 py-2 text-center">6:5</td><td className="px-4 py-2 text-center">1,52 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">Field (3x for 12)</td><td className="px-4 py-2 text-center">1:1 / 2:1 / 3:1</td><td className="px-4 py-2 text-center">–</td><td className="px-4 py-2 text-center">2,78 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Place 5 / Place 9</td><td className="px-4 py-2 text-center">7:5</td><td className="px-4 py-2 text-center">3:2</td><td className="px-4 py-2 text-center">4,00 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">Field (2x for 12)</td><td className="px-4 py-2 text-center">1:1 / 2:1</td><td className="px-4 py-2 text-center">–</td><td className="px-4 py-2 text-center">5,56 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Place 4 / Place 10</td><td className="px-4 py-2 text-center">9:5</td><td className="px-4 py-2 text-center">2:1</td><td className="px-4 py-2 text-center">6,67 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">Big 6 / Big 8</td><td className="px-4 py-2 text-center">1:1</td><td className="px-4 py-2 text-center">6:5</td><td className="px-4 py-2 text-center">9,09 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Hard 6 / Hard 8</td><td className="px-4 py-2 text-center">9:1</td><td className="px-4 py-2 text-center">10:1</td><td className="px-4 py-2 text-center">9,09 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">Any Craps</td><td className="px-4 py-2 text-center">7:1</td><td className="px-4 py-2 text-center">8:1</td><td className="px-4 py-2 text-center">11,11 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Hard 4 / Hard 10</td><td className="px-4 py-2 text-center">7:1</td><td className="px-4 py-2 text-center">8:1</td><td className="px-4 py-2 text-center">11,11 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">Yo (11)</td><td className="px-4 py-2 text-center">15:1</td><td className="px-4 py-2 text-center">17:1</td><td className="px-4 py-2 text-center">11,11 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Horn Bet</td><td className="px-4 py-2 text-center">Varierer</td><td className="px-4 py-2 text-center">–</td><td className="px-4 py-2 text-center">12,50 %</td></tr>
                <tr className="border-t border-border bg-muted/20"><td className="px-4 py-2 font-medium">Snake Eyes (2) / Boxcars (12)</td><td className="px-4 py-2 text-center">30:1</td><td className="px-4 py-2 text-center">35:1</td><td className="px-4 py-2 text-center">13,89 %</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Any 7</td><td className="px-4 py-2 text-center">4:1</td><td className="px-4 py-2 text-center">5:1</td><td className="px-4 py-2 text-center font-bold text-destructive">16,67 %</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Tabellen afslører et klart mønster: de synligste, mest tilgængelige væddemål i midten af bordet har de højeste house edges. De "kedelige" væddemål i kanten (Pass Line, Don't Pass, Odds Bets) har de laveste. Casinoets borddesign er en form for adfærdsøkonomisk arkitektur: det, der fanger din opmærksomhed, er designet til at maksimere casinoets profit, ikke din spilleoplevelse. At kende denne tabel er den vigtigste strategiske fordel, en craps-spiller kan have.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 10 – VARIANS ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Varians og Risikoprofil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Varians måler, hvor langt dine faktiske resultater afviger fra det forventede gennemsnit. I craps er varians kritisk, fordi den bestemmer, hvor store udsving du oplever på kort sigt – og dermed hvor stor bankroll du behøver for at overleve.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Pass Line varians:</strong> Pass Line er et lavvariansbet (sammenlignet med andre casinospil). Du vinder 49,29 % af gangene med 1:1 udbetaling – det er næsten en coinflip. Standardafvigelsen pr. indsats er ca. 1,0 enheder. Over 100 indsatser á 100 kr. er din forventede saldo -141 kr. ± ca. 1.000 kr. (1 standardafvigelse). Det betyder, at du efter 100 indsatser med høj sandsynlighed befinder dig mellem +859 kr. og -1.141 kr. Lavvariansen gør Pass Line til et "tålmodigt" væddemål – du taber langsomt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Proposition bet-varians:</strong> Yo (11) med 15:1 udbetaling har ekstremt høj varians. Du taber 94,44 % af kastene og vinder 5,56 % med en stor udbetaling. Over 100 indsatser á 100 kr.: forventet tab -1.111 kr. ± ca. 3.700 kr. Du kan svinge fra +2.589 kr. til -4.811 kr. Den høje varians betyder, at kortsigtige resultater er næsten meningsløse – en vinder føles fantastisk, men den forventede langtidsomkostning er destruktiv.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Odds Bets og varians:</strong> Paradoksalt nok øger Odds Bets din varians, selvom de har 0 % house edge. Eksempel: 100 kr. Pass Line + 500 kr. Odds (5x) giver en samlet indsats på 600 kr. pr. runde. Din forventede edge er stadig kun på de 100 kr. Pass Line (-1,41 kr.), men udsvinget er baseret på hele 600 kr. Du taber langsommere (lavere edge) men svinger mere (højere varians). Det er den klassiske risk-reward tradeoff: bedre odds kræver større tolerance for udsving.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 11 – EV ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvad Betyder Expected Value (EV) i Craps?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Expected Value (EV) er den gennemsnitlige fortjeneste eller tab pr. væddemål over uendeligt mange gentagelser. Det er det mest præcise mål for et væddemåls kvalitet – og det eneste tal, der virkelig betyder noget i matematisk analyse af casinospil.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>EV-formlen:</strong> EV = (sandsynlighed for vinding × gevinst) − (sandsynlighed for tab × tab). For Pass Line: EV = (0,49293 × 100) − (0,50707 × 100) = 49,29 − 50,71 = −1,41 kr. pr. 100 kr. indsats. Du taber i gennemsnit 1,41 kr. for hver 100 kr., du satser. Det svarer til at betale 1,41 kr. i "underholdningsgebyr" pr. runde.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>EV i praksis – 500 kast:</strong> 500 Pass Line-indsatser á 100 kr. = 50.000 kr. i samlet omsætning. Forventet tab: 50.000 × 0,0141 = 705 kr. Du forventer at gå hjem med 49.295 kr. af dine 50.000 kr. Det er et relativt beskedent tab – sammenligneligt med prisen for en middag ud. Sammenlign med 500 Any 7-indsatser: 50.000 × 0,1667 = 8.335 kr. forventet tab. Samme antal kast, men tolv gange dyrere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>EV-tænkning som beslutningsramme:</strong> Hver gang du placerer et væddemål i craps, betaler du en "skat" til casinoet. Den skat varierer fra 0 kr. (Odds Bets) til 16,67 kr. pr. 100 kr. (Any 7). At forstå EV handler ikke om at forudsige resultatet af et enkelt kast – det handler om at vælge de væddemål, der minimerer din langsigtede omkostning. Det er den eneste "strategi" i craps, der er matematisk meningsfuld. Systemer som Martingale, Iron Cross og 3-Point Molly ændrer alle indsatsstørrelsen, men de ændrer ikke EV pr. krone – de omfordeler risiko uden at eliminere den. Sammenlignet med <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>, hvor perfekt basic strategy reducerer house edge til 0,4–0,5 %, har craps ikke en "korrekt spillestrategi" – kun en "korrekt væddemålsstrategi".
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 12 – BANKROLL ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bankroll Management i Høj-Varians Spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bankroll management i craps handler om at dimensionere din spillekapital, så du kan overleve de naturlige udsving (varians) uden at gå bust. Det er ikke en vej til profit – det er en vej til at kontrollere din nedadrettede risiko og bevare spillets underholdningsværdi over tid.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Risk of ruin (RoR):</strong> Sandsynligheden for at tabe hele din bankroll. For Pass Line med 1:1 udbetaling og 1,41 % edge: med en bankroll på 20 indsatser er RoR ca. 40 %. Med 50 indsatser: ca. 20 %. Med 100 indsatser: ca. 8 %. For proposition bets med høj varians er RoR dramatisk højere – med 20 indsatser på Yo (11) er RoR over 85 %.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Praktiske retningslinjer:</strong> Pass Line (uden Odds): 30–40 gange din indsats. Med 100 kr. indsats: 3.000–4.000 kr. bankroll. Pass Line + 3x Odds: 50–60 gange din Pass Line-indsats. Med 100 kr. Pass + 300 kr. Odds (400 kr. pr. runde): 5.000–6.000 kr. bankroll. Pass Line + 10x Odds: 80–100 gange din Pass Line. Med 100 kr. Pass + 1.000 kr. Odds: 8.000–10.000 kr. bankroll.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Den vigtigste regel:</strong> Spil aldrig for penge, du ikke har råd til at tabe. Din craps-bankroll er en underholdningsudgift – som en koncertbillet eller en middagsreservation. Når den er brugt, er den brugt. At jage tab (spille mere for at "vinde det tabte tilbage") er den hurtigste vej til ukontrolleret tab. Sæt en tabsgrænse, en vindergrænse, og en tidsgrænse – og overhold dem alle tre. <Link to="/ansvarligt-spil" className={linkClass}>Ansvarligt spil</Link> er ikke en abstraktion; det er den mest konkrete form for bankroll management.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 13 – HOT SHOOTERS ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Myten om "Hot Shooters"</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En af de mest sejlivede myter i craps er troen på "hot shooters" – den ide, at visse kastere har en evne til at kaste terninger på måder, der favoriserer bestemte numre eller undgår 7'ere. Denne tro er fundamentalt uforenelig med sandsynlighedsteoriens principper.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Hvert terningkast er en uafhængig hændelse. Terningerne har ingen hukommelse. Sandsynligheden for en 7 er 16,67 % på hvert eneste kast – uanset hvem der kaster, uanset hvad der blev kastet sidst, uanset hvor længe kasteren har kastet. En kaster, der har undgået 7'ere i 20 kast, har præcis 16,67 % sandsynlighed for at kaste en 7 på det 21. kast. Ikke højere, ikke lavere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Hvorfor føles det rigtigt?</strong> Confirmation bias. Når en kaster har en lang streak uden 7, husker alle ved bordet det. Når en kaster "sevens out" efter 3 kast, glemmer alle det. Over tusindvis af kastere og millioner af kast fordeler streak-længderne sig præcis som sandsynlighedsteorien forudsiger – men den menneskelige hjerne er programmeret til at finde mønstre, selv hvor ingen eksisterer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>"Dice setting" og "controlled shooting":</strong> Nogle spillere hævder, at de kan kontrollere terningernes landing for at favorisere bestemte udfald. Videnskabelig evidens for denne påstand er ikkeeksisterende. Terningerne bevæger sig med høj hastighed, rammer bordets gummivæg (kræves af casinoet) og interagerer med hinanden – det kaotiske system gør kontrol praktisk umuligt. Online craps bruger RNG, der eliminerer enhver mulighed for fysisk påvirkning. Konklusion: spil aldrig baseret på en tro om "hot" eller "cold" kastere. Det er gambler's fallacy i craps-specifik forklædning.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 14 – ONLINE VS LIVE ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Online Craps vs. Live Craps – Påvirker Det Odds?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Kort svar: nej. Sandsynlighederne er identiske, uanset om terningerne er fysiske eller digitale. Begge systemer producerer resultater, der følger den samme sandsynlighedsfordeling med 36 kombinationer. Men der er vigtige praktiske forskelle, der påvirker din spilleoplevelse og din effektive time-cost.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Tempo:</strong> Online RNG-craps spiller 2–4x hurtigere end live. Et fysisk crapsbord producerer ca. 80–120 kast pr. time; online kan du spille 200–400 kast pr. time. Det betyder, at din forventede time-cost (EV × antal kast) er 2–4x højere online, selvom odds'ene pr. kast er identiske. Med 100 kr. Pass Line: live cost ≈ 113–169 kr./time; online cost ≈ 282–564 kr./time.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Live dealer craps</strong> (fx fra Evolution Gaming) kombinerer det bedste fra begge: rigtige terninger, et fysisk bord og en professionel dealer – streamed i HD. Tempoet er tættere på fysisk craps (80–120 kast/time), og du kan interagere med dealeren via chat. Odds'ene er identiske med alle andre formater.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>RNG-validering:</strong> Online craps på licenserede <Link to="/casinospil" className={linkClass}>casinoer</Link> bruger RNG-systemer, der testes og certificeres af uafhængige laboratorier. Den danske Spillemyndighed kræver regelmæssig audit. Den mest relevante forskel mellem online og live craps er ikke odds'ene – det er tempoet og dermed din eksponering pr. time. Overvej at sænke dit tempo online bevidst: tag pauser mellem kastene, og lad være med at auto-kaste. Din bankroll vil takke dig.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ═══════════════ 15 – HVEM BØR SPILLE ═══════════════ */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvem Bør Spille Craps – og Hvem Bør Undgå Det?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Craps er det mest fleksible casinospil matematisk: det rummer væddemål med 0 % house edge og væddemål med 16,67 %. Dit valg af væddemål bestemmer, om craps er et af de bedste eller de værste spil i casinoet. At kende dig selv som spiller er afgørende for at vælge det rigtige format.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Craps passer til dig, hvis:</strong> Du søger et socialt spil med lav house edge. Du har tålmodighed til at holde dig til Pass Line + Odds Bets og ignorere de fristende proposition bets. Du nyder at forstå den bagvedliggende matematik. Du har en bankroll, der kan håndtere variansen (minimum 30–50 indsatser). Du foretrækker et spil, hvor dine beslutninger (hvilke væddemål du placerer) har reel matematisk betydning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Craps passer måske ikke, hvis:</strong> Du tiltrækkes af de høje udbetalinger i midten af bordet (proposition bets med 10–17 % edge). Du har svært ved at modstå "crowd pressure" i fysiske casinoer, hvor alle råber og satser aggressivt. Du foretrækker simplere spil – <Link to="/casinospil/baccarat" className={linkClass}>baccarat</Link> har lignende house edge men langt simplere væddemålsstruktur. Du ikke kan dedikere tid til at lære væddemålstyperne – at spille craps uden at forstå odds er at spille med en unødig handicap.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Den analytiske konklusion:</strong> Craps med Pass Line + maksimale Odds Bets er et af de mest spillervenlige tilbud i hele casinobranchen – bedre end europæisk <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> (2,7 %), sammenligneligt med optimal <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> (0,4–0,5 %), og langt bedre end gennemsnitlige <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> (2–8 %). Men craps med proposition bets er et af de dyreste spil i casinoet. Forskellen er dit valg. Denne guide har givet dig den matematiske baggrund til at træffe det informerede valg.
          </p>
        </section>

        <RelatedGuides currentPath="/casinospil/craps" />
        <FAQSection faqs={crapsFaqs} />
        <AuthorBio author="jonas" showCommunity={false} />
      </div>
    </>
  );
};

export default CrapsGuide;

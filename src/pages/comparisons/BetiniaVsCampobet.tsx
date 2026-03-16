import { Link } from "react-router-dom";
import { ComparisonPageTemplate } from "./ComparisonPageTemplate";
import type { ComparisonCasino, ComparisonCategory } from "./ComparisonPageTemplate";
import heroImage from "@/assets/comparison-hero-bet365-unibet.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const casinoA: ComparisonCasino = {
  name: "Betinia",
  slug: "betinia",
  bonusTitle: "No-Sticky velkomstbonus",
  bonusAmount: "100% op til 1.000 kr.",
  wagering: "10x (d+b)",
  minDeposit: "100 kr.",
  payoutTime: "1–3 hverdage",
  gameCount: "40+ udbydere",
  license: "DK + MGA",
  mobileFriendly: true,
  liveCasino: true,
  pros: [
    "No-Sticky struktur med høj fleksibilitet",
    "Stærk kombination af casino og sport",
    "Akkumulator-boost og stærk live casino-profil",
    "Mange betalingsmetoder og stærk compliance-profil",
  ],
  cons: [
    "Ingen dedikeret app",
    "Platformen kan føles bred frem for fokuseret",
    "Udbetalinger er ikke blandt markedets hurtigste",
  ],
};

const casinoB: ComparisonCasino = {
  name: "Campobet",
  slug: "campobet",
  bonusTitle: "No-Sticky velkomstbonus",
  bonusAmount: "100% op til 1.000 kr.",
  wagering: "10x (d+b)",
  minDeposit: "100 kr.",
  payoutTime: "1–3 hverdage",
  gameCount: "3.000+ spil",
  license: "Multi-licenseret",
  mobileFriendly: true,
  liveCasino: true,
  pros: [
    "3.000+ spil og meget bred udviklerdækning",
    "No-Sticky bonus kombineret med sportssektion",
    "Bet Builder, livebetting og ugentlige reloads",
    "Meget bred betalingstack",
  ],
  cons: [
    "Mindre skarp profil end de bedste nichesider",
    "Yngre brand på det danske marked",
    "Kan virke mere international end lokal i tonen",
  ],
};

const categories: ComparisonCategory[] = [
  {
    label: "Velkomstbonus",
    casinoA: { score: 5, detail: "No-Sticky, 10x og høj fleksibilitet" },
    casinoB: { score: 5, detail: "No-Sticky, 10x og stærk samlet værdi" },
  },
  {
    label: "Sportsbetting-værdi",
    casinoA: { score: 5, detail: "Akkumulator-boost og stærk dual-model" },
    casinoB: { score: 4, detail: "Bred sportssektion med Bet Builder" },
  },
  {
    label: "Casino-dybde",
    casinoA: { score: 4, detail: "Mange udbydere og stærk bredde" },
    casinoB: { score: 5, detail: "3.000+ spil og meget bred dækning" },
  },
  {
    label: "Live casino",
    casinoA: { score: 5, detail: "Stærk Evolution-tyngde" },
    casinoB: { score: 4, detail: "Solidt live-udvalg, mindre profilbærende" },
  },
  {
    label: "Betalingsmetoder",
    casinoA: { score: 4, detail: "Meget bred palette" },
    casinoB: { score: 5, detail: "Ekstremt bred betalingstack" },
  },
  {
    label: "Mobiloplevelse",
    casinoA: { score: 4, detail: "Responsiv og stabil på tværs af vertikaler" },
    casinoB: { score: 4, detail: "Hurtig og bred funktionalitet på mobil" },
  },
  {
    label: "Brand-tillid",
    casinoA: { score: 5, detail: "Stærk licens- og complianceprofil" },
    casinoB: { score: 4, detail: "Internationalt robust, men yngre i DK" },
  },
  {
    label: "Løbende kampagner",
    casinoA: { score: 4, detail: "Stærk velkomstvinkel og sportsappel" },
    casinoB: { score: 5, detail: "Reloads giver ekstra langsigtet værdi" },
  },
];

const faqs = [
  {
    question: "Er Betinia og Campobet reelt samme type casino?",
    answer: "Ja, de er tættere på hinanden end de fleste andre VS-dueller. Begge er moderne dual-platforme med casino og sport, begge bruger No-Sticky logik på casinobonussen, og begge forsøger at kombinere høj fleksibilitet med bred produktdybde. Forskellen ligger i vægtningen mellem sportsværktøjer, betalingsbredde og ren casino-volumen.",
  },
  {
    question: "Hvem har den bedste No-Sticky bonus – Betinia eller Campobet?",
    answer: (
      <>
        De er meget tæt på hinanden, fordi begge kombinerer No-Sticky struktur med kun 10x <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>. Betinia har en smule stærkere profil omkring bonusfleksibilitet og sportsbook-vinklen, mens Campobet vinder lidt på den samlede pakke for spillere, der også vil have bredt casinoudvalg og løbende kampagner.
      </>
    ),
  },
  {
    question: "Hvilket casino er bedst til sport og casino under samme konto?",
    answer: "Betinia er marginalt stærkere, hvis du aktivt vil bruge både casino og sportssektion, især på grund af akkumulator-boost og en meget tydelig dual-motor-positionering. Campobet er stadig stærk, men føles lidt mere som et bredt internationalt casino med sport ovenpå end som et rendyrket hybridprodukt.",
  },
  {
    question: "Hvem har flest spil – Betinia eller Campobet?",
    answer: "Campobet er stærkest på ren volumen. Platformen profilerer sig på 3.000+ spil og et meget bredt udvalg af udbydere. Betinia er også bred, men den klareste styrke ligger mere i den samlede kombination af bonus, sport og live casino end i ren katalogstørrelse.",
  },
  {
    question: "Er Betinia og Campobet lovlige i Danmark?",
    answer: (
      <>
        Ja. Begge opererer lovligt på det danske marked med licens og de samme kernekrav til MitID, ROFUS og ansvarligt spil. Hvis du vil forstå rammerne bedre, kan du læse vores guide til <Link to="/spillemyndigheden" className={linkClass}>Spillemyndigheden</Link>.
      </>
    ),
  },
  {
    question: "Hvem bør vælge Campobet frem for Betinia?",
    answer: "Campobet er det bedre valg for spilleren, der vil have så meget bredde som muligt i samme konto – især hvis mange betalingsmetoder, flere kampagner og et meget stort spilkatalog vægter tungere end den lidt skarpere hybridprofil, Betinia har opbygget.",
  },
];

export default function BetiniaVsCampobet() {
  return (
    <ComparisonPageTemplate
      metaTitle="Betinia vs Campobet 2026"
      metaDescription="Sammenligning af Betinia og Campobet. Se forskellen på No-Sticky bonus, sport, live casino, betalingsmetoder og samlet værdi."
      h1="Betinia vs Campobet – bedste No-Sticky duel i 2026"
      intro="To af de stærkeste moderne hybrid-casinoer på det danske marked mødes her. Begge kombinerer No-Sticky bonus, sport og et stort casinokatalog – men de gør det med hver deres styrker."
      path="/casino-anmeldelser/betinia-vs-campobet"
      datePublished="2026-03-16"
      author="jonas"
      heroImage={heroImage}
      heroAlt="Sammenligning af Betinia og Campobet med fokus på No-Sticky bonus og sportsbetting"
      casinoA={casinoA}
      casinoB={casinoB}
      categories={categories}
      verdict="Betinia vinder meget snævert som den stærkeste samlede hybridløsning for spilleren, der reelt vil bruge både casino og sport. Campobet er dog stadig bedre, hvis du jagter maksimal bredde, flere løbende kampagner og et større samlet spilkatalog. Dette er en af de tætteste VS-dueller i hele jeres review-cluster."
      verdictWinner="A"
      faqs={faqs}
      ctaSlug="betinia"
      readTime="25 min"
    >
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Hvorfor denne sammenligning er kommercielt vigtig</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          <Link to="/casino-anmeldelser/betinia" className={linkClass}>Betinia</Link> og <Link to="/casino-anmeldelser/campobet" className={linkClass}>Campobet</Link> konkurrerer om den samme spillerprofil: brugeren der ikke vil vælge mellem et traditionelt online casino og en moderne sportsbook. Derfor er det ikke nok at kigge på bonusbeløbet alene – begge har allerede løst den del overbevisende.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Den virkelige forskel ligger i execution. Betinia føles en anelse skarpere som hybridbrand, mens Campobet er ekstremt stærk på volumen, kampagner og betalingsbredde. Det gør netop denne duel vigtig i jeres money-page-cluster, fordi søgeintentionen ofte er tæt på konvertering.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">No-Sticky bonus – samme princip, forskellig oplevelse</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Begge sider bruger <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link>, hvilket allerede løfter dem over mange konkurrenter. Det betyder, at du i praksis bevarer mere kontrol over dine egne midler og ikke tvinges ind i et unødigt låst bonusflow fra første spin.
        </p>
        <div className="rounded-lg border border-border bg-muted/30 p-5">
          <p className="mb-2 font-semibold">Kort fortalt</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Betinia er stærkest, hvis du vil have den mest elegante hybrid mellem bonus og sport. Campobet er stærkest, hvis du vil have No-Sticky logik koblet med maksimal bredde i resten af produktet.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Casino, live og betalinger – hvor Campobet presser hårdt</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Campobet er den bredere maskine. Flere spil, flere udviklere og flere løbende kampagner gør siden stærk for den spiller, der hele tiden vil have noget nyt at skifte over til. Hvis du måler kvalitet i katalogvolumen, er Campobet svær at overse.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Betinia svarer igen med en mere skarp live casino- og sportsbook-identitet. Kombinationen af hybridbonus, akkumulator-boost og stærk live casino-profil gør, at siden føles mere bevidst bygget omkring netop den spiller, der hopper mellem vertikalerne frem for kun at browse et stort bibliotek.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          På betalinger er Campobet også meget stærk. Hvis betalingsfleksibilitet er et kernekriterium for dig, er Campobet det lidt mere komplette valg. Hvis du derimod leder efter den mest velafbalancerede blanding af casino, sport og bonuskontrol, holder Betinia fast i føringen.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">Hvem skal vælge hvad?</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Vælg Betinia, hvis du vil have en moderne hybridplatform, hvor sport og casino begge føles som førsteprioriteter. Vælg Campobet, hvis du hellere vil have mere volumen, flere betalinger og et endnu bredere katalog i samme konto.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Uanset hvad er dette to af de bedste bud på en dansk side, der kan dække både casino- og sportsbook-intention uden at gå på kompromis med bonusstruktur og grundlæggende spillerkontrol.
        </p>
      </section>
    </ComparisonPageTemplate>
  );
}

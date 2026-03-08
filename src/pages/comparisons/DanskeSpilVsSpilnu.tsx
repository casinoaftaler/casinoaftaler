import { ComparisonPageTemplate } from "./ComparisonPageTemplate";
import type { ComparisonCasino, ComparisonCategory } from "./ComparisonPageTemplate";

const casinoA: ComparisonCasino = {
  name: "Danske Spil Casino",
  slug: "danske-spil",
  bonusTitle: "Velkomstbonus",
  bonusAmount: "Op til 1.000 kr.",
  wagering: "10x",
  minDeposit: "100 kr.",
  payoutTime: "Inden for 24 timer",
  gameCount: "1.500+",
  license: "Dansk licens",
  mobileFriendly: true,
  liveCasino: true,
  pros: [
    "Danmarks mest kendte brand",
    "Ultra-lav omsætning på 10x",
    "Komplet økosystem: lotto, odds, casino",
    "Stærk tillid og tryghed",
  ],
  cons: [
    "Begrænset spiludvalg sammenlignet med rene casinoer",
    "Casino-sektionen er sekundær til lotto/odds",
    "Færre slot-udbydere",
  ],
};

const casinoB: ComparisonCasino = {
  name: "Spilnu",
  slug: "spilnu",
  bonusTitle: "Velkomstbonus",
  bonusAmount: "Op til 2.000 kr.",
  wagering: "15x",
  minDeposit: "50 kr.",
  payoutTime: "Inden for 24 timer",
  gameCount: "2.000+",
  license: "Dansk licens",
  mobileFriendly: true,
  liveCasino: true,
  pros: [
    "Større bonusbeløb op til 2.000 kr.",
    "Lavere minimumsindbetaling (50 kr.)",
    "Bredere spiludvalg med 2.000+ titler",
    "Mere dedikeret casino-fokus",
  ],
  cons: [
    "Lidt højere omsætningskrav (15x)",
    "Mindre brand-genkendelighed end Danske Spil",
    "Færre tværgående spilmuligheder",
  ],
};

const categories: ComparisonCategory[] = [
  {
    label: "Velkomstbonus",
    casinoA: { score: 4, detail: "1.000 kr., 10x omsætning" },
    casinoB: { score: 5, detail: "2.000 kr., 15x omsætning" },
  },
  {
    label: "Spiludvalg",
    casinoA: { score: 3, detail: "1.500+ spil, begrænset" },
    casinoB: { score: 4, detail: "2.000+ spil, bredere" },
  },
  {
    label: "Brand & Tillid",
    casinoA: { score: 5, detail: "Danmarks mest kendte" },
    casinoB: { score: 4, detail: "Populært dansk brand" },
  },
  {
    label: "Live Casino",
    casinoA: { score: 4, detail: "Godt udvalg af Evolution-borde" },
    casinoB: { score: 4, detail: "Solidt live casino" },
  },
  {
    label: "Mobiloplevelse",
    casinoA: { score: 4, detail: "Velkent dansk app" },
    casinoB: { score: 4, detail: "Responsivt mobilcasino" },
  },
  {
    label: "Betalingsmetoder",
    casinoA: { score: 5, detail: "MobilePay, Dankort, Trustly" },
    casinoB: { score: 4, detail: "MobilePay, kort, Trustly" },
  },
  {
    label: "Kundeservice",
    casinoA: { score: 4, detail: "Dansk support, telefon + chat" },
    casinoB: { score: 4, detail: "Live chat og e-mail" },
  },
  {
    label: "Ansvarligt Spil",
    casinoA: { score: 5, detail: "Avanceret med ROFUS + egne værktøjer" },
    casinoB: { score: 4, detail: "Standard ROFUS-integration" },
  },
];

const faqs = [
  {
    question: "Hvad er forskellen på Danske Spil Casino og Spilnu?",
    answer: "Danske Spil er Danmarks ældste og mest kendte spiludbyder med et komplet økosystem (lotto, odds, casino), mens Spilnu er et rent casino-fokuseret site med bredere spiludvalg og højere bonus. Begge har dansk licens.",
  },
  {
    question: "Hvem har den bedste velkomstbonus?",
    answer: "Spilnu tilbyder op til 2.000 kr. med 15x omsætning, mens Danske Spil giver op til 1.000 kr. med 10x omsætning. Spilnu har det højere beløb, men Danske Spil har de laveste omsætningskrav.",
  },
  {
    question: "Hvilket casino har flest spil?",
    answer: "Spilnu fører med over 2.000 spiltitler mod Danske Spils 1.500+. Spilnu har også flere slot-udbydere da deres primære fokus er casino.",
  },
  {
    question: "Er begge casinoer lovlige i Danmark?",
    answer: "Ja, både Danske Spil Casino og Spilnu har dansk licens fra Spillemyndigheden med fuld ROFUS-integration og danske betalingsmetoder som MobilePay og Dankort.",
  },
  {
    question: "Hvilket casino er bedst for nye spillere?",
    answer: "Danske Spil er bedst for spillere der vil have tryghed og et velkendt brand med den laveste omsætning (10x). Spilnu passer bedre til spillere der vil have mere casino-fokus, flere spil og en større bonus.",
  },
];

export default function DanskeSpilVsSpilnu() {
  return (
    <ComparisonPageTemplate
      metaTitle="Danske Spil vs Spilnu 2026 – Komplet Sammenligning | Casinoaftaler"
      metaDescription="Danske Spil Casino vs Spilnu sammenligning. Vi vurderer bonus, spiludvalg, betalingsmetoder og tillid. Find ud af hvilket dansk casino der passer til dig."
      h1="Danske Spil Casino vs Spilnu – Dansk Duel 2026"
      intro="To af Danmarks mest populære casinoer med dansk licens. Danske Spil er landets ældste og mest betroede spiludbyder, mens Spilnu byder på et dedikeret casino-fokus med bredere spiludvalg. Vi sammenligner dem på 8 afgørende kategorier."
      path="/casino-anmeldelser/danske-spil-vs-spilnu"
      datePublished="2026-03-08"
      author="jonas"
      casinoA={casinoA}
      casinoB={casinoB}
      categories={categories}
      verdict="Danske Spil vinder med 34/40 mod Spilnus 33/40. Det er tæt, og valget afhænger af prioriteter. Danske Spil er det trygge valg med landets stærkeste brand, de laveste omsætningskrav og et komplet spiløkosystem. Spilnu er bedre for spillere der vil have et dedikeret casino med flere spil, højere bonus og en lavere indgangsbarriere med kun 50 kr. minimumsindskud."
      verdictWinner="A"
      faqs={faqs}
      ctaSlug="spilnu"
    />
  );
}

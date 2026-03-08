import { ComparisonPageTemplate } from "./ComparisonPageTemplate";
import type { ComparisonCasino, ComparisonCategory } from "./ComparisonPageTemplate";

const casinoA: ComparisonCasino = {
  name: "LeoVegas",
  slug: "leovegas",
  bonusTitle: "Velkomstbonus",
  bonusAmount: "Op til 2.500 kr. + 50 free spins",
  wagering: "35x",
  minDeposit: "100 kr.",
  payoutTime: "Inden for 24 timer",
  gameCount: "2.800+",
  license: "Dansk licens",
  mobileFriendly: true,
  liveCasino: true,
  pros: [
    "Prisbelønnet mobilcasino",
    "Stort bonusbeløb op til 2.500 kr.",
    "Bredt spiludvalg med 2.800+ titler",
    "Eksklusiv LeoVegas Live Casino-sektion",
  ],
  cons: [
    "Højt omsætningskrav på 35x",
    "Bonus fordelt over flere indbetalinger",
    "Begrænset loyalitetsprogram",
  ],
};

const casinoB: ComparisonCasino = {
  name: "Mr Green",
  slug: "mr-green",
  bonusTitle: "Velkomstbonus",
  bonusAmount: "Op til 1.500 kr. + 200 free spins",
  wagering: "25x",
  minDeposit: "100 kr.",
  payoutTime: "Inden for 24 timer",
  gameCount: "2.000+",
  license: "Dansk licens",
  mobileFriendly: true,
  liveCasino: true,
  pros: [
    "Green Gaming – brancheledende ansvarligt spil",
    "Lavere omsætningskrav (25x)",
    "200 free spins inkluderet",
    "Kurateret spiludvalg med kvalitetsfokus",
  ],
  cons: [
    "Lavere bonusbeløb end LeoVegas",
    "Færre spil i kataloget (2.000+)",
    "Live casino er lidt mere begrænset",
  ],
};

const categories: ComparisonCategory[] = [
  {
    label: "Velkomstbonus",
    casinoA: { score: 4, detail: "2.500 kr. men 35x omsætning" },
    casinoB: { score: 4, detail: "1.500 kr. + 200 FS, 25x omsætning" },
  },
  {
    label: "Spiludvalg",
    casinoA: { score: 5, detail: "2.800+ spil, bred dækning" },
    casinoB: { score: 4, detail: "2.000+ kuraterede spil" },
  },
  {
    label: "Live Casino",
    casinoA: { score: 5, detail: "Eksklusiv LeoVegas-sektion" },
    casinoB: { score: 4, detail: "Standard Evolution-udvalg" },
  },
  {
    label: "Mobiloplevelse",
    casinoA: { score: 5, detail: "Prisbelønnet mobilcasino" },
    casinoB: { score: 4, detail: "Solid mobiloplevelse" },
  },
  {
    label: "Ansvarligt Spil",
    casinoA: { score: 4, detail: "Standard værktøjer" },
    casinoB: { score: 5, detail: "Green Gaming-værktøj" },
  },
  {
    label: "Udbetalingshastighed",
    casinoA: { score: 4, detail: "Typisk 12-24 timer" },
    casinoB: { score: 4, detail: "Typisk 12-24 timer" },
  },
  {
    label: "Betalingsmetoder",
    casinoA: { score: 4, detail: "MobilePay, Trustly, kort" },
    casinoB: { score: 4, detail: "MobilePay, Trustly, kort" },
  },
  {
    label: "Kundeservice",
    casinoA: { score: 4, detail: "24/7 live chat" },
    casinoB: { score: 4, detail: "Live chat og e-mail" },
  },
];

const faqs = [
  {
    question: "Hvad er forskellen på LeoVegas og Mr Green?",
    answer: "LeoVegas er kendt som 'King of Mobile Casino' med et bredere spiludvalg og eksklusivt live casino. Mr Green fokuserer på ansvarligt spil via Green Gaming-værktøjet og tilbyder et mere kurateret spiludvalg med lavere omsætningskrav.",
  },
  {
    question: "Hvem har den bedste bonus – LeoVegas eller Mr Green?",
    answer: "LeoVegas tilbyder et højere bonusbeløb (2.500 kr.), men med 35x omsætning. Mr Green giver 1.500 kr. + 200 free spins med kun 25x omsætning. Expected Value er tættere end det umiddelbart ser ud.",
  },
  {
    question: "Hvem er bedst til mobilcasino?",
    answer: "LeoVegas har vundet adskillige priser for sin mobiloplevelse og er generelt anerkendt som branchens bedste mobilcasino. Mr Green har også en god mobilversion, men kan ikke helt matche LeoVegas' polish.",
  },
  {
    question: "Hvilket casino er mest ansvarligt?",
    answer: "Mr Green er førende med sit Green Gaming-værktøj, der analyserer spillemønstre og giver personlige advarsler. LeoVegas tilbyder standard ansvarligt spil-værktøjer som indbetalingsgrænser og ROFUS.",
  },
];

export default function LeoVegasVsMrGreen() {
  return (
    <ComparisonPageTemplate
      metaTitle="LeoVegas vs Mr Green 2026 – Komplet Sammenligning | Casinoaftaler"
      metaDescription="LeoVegas vs Mr Green sammenligning. Vi tester bonus, spiludvalg, mobiloplevelse, ansvarligt spil og live casino. Se hvem der vinder."
      h1="LeoVegas vs Mr Green – Komplet Sammenligning 2026"
      intro="To af de mest ikoniske casino-brands i Norden. LeoVegas er prisbelønnet for sin mobiloplevelse, mens Mr Green sætter standarden for ansvarligt spil. Vi har testet begge grundigt og sammenligner dem på 8 kategorier."
      path="/casino-anmeldelser/leovegas-vs-mr-green"
      datePublished="2026-03-08"
      author="jonas"
      casinoA={casinoA}
      casinoB={casinoB}
      categories={categories}
      verdict="LeoVegas vinder med 35/40 mod Mr Greens 33/40. LeoVegas har det bredere spiludvalg, et overlegen live casino og den bedste mobiloplevelse i branchen. Mr Green kompenserer med bedre ansvarligt spil-værktøjer og lavere omsætningskrav. Spillere der prioriterer ansvarligt spil og gennemsigtige bonusvilkår bør vælge Mr Green. For det bedste mobilcasino med flest spil er LeoVegas det oplagte valg."
      verdictWinner="A"
      faqs={faqs}
      ctaSlug="leovegas"
    />
  );
}

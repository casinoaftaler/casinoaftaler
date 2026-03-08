import { ComparisonPageTemplate } from "./ComparisonPageTemplate";
import type { ComparisonCasino, ComparisonCategory } from "./ComparisonPageTemplate";

const casinoA: ComparisonCasino = {
  name: "bet365",
  slug: "bet365",
  bonusTitle: "Velkomstbonus",
  bonusAmount: "Op til 1.000 kr.",
  wagering: "12x",
  minDeposit: "100 kr.",
  payoutTime: "Inden for 24 timer",
  gameCount: "2.500+",
  license: "Dansk licens",
  mobileFriendly: true,
  liveCasino: true,
  pros: [
    "Komplet sportsbook + casino i ét",
    "Lav omsætning på 12x",
    "Ekstremt hurtige udbetalinger",
    "Stærk live casino-sektion",
  ],
  cons: [
    "Bonus kan virke lav sammenlignet med konkurrenter",
    "Fokus er primært sport – casino er sekundært",
    "Færre eksklusive slot-titler",
  ],
};

const casinoB: ComparisonCasino = {
  name: "Unibet",
  slug: "unibet",
  bonusTitle: "Velkomstbonus",
  bonusAmount: "Op til 2.000 kr.",
  wagering: "10x",
  minDeposit: "100 kr.",
  payoutTime: "Inden for 24 timer",
  gameCount: "3.000+",
  license: "Dansk licens",
  mobileFriendly: true,
  liveCasino: true,
  pros: [
    "Større bonusbeløb op til 2.000 kr.",
    "Meget lavt omsætningskrav (10x)",
    "Bredere spiludvalg med 3.000+ titler",
    "Stærk app til både iOS og Android",
  ],
  cons: [
    "Kan virke uoverskueligt for nye spillere",
    "Bonusvilkår varierer efter kampagne",
    "Kundeservice kan være langsom i spidsbelastning",
  ],
};

const categories: ComparisonCategory[] = [
  {
    label: "Velkomstbonus",
    casinoA: { score: 4, detail: "1.000 kr., 12x omsætning" },
    casinoB: { score: 5, detail: "2.000 kr., 10x omsætning" },
  },
  {
    label: "Spiludvalg",
    casinoA: { score: 4, detail: "2.500+ spil, god bredde" },
    casinoB: { score: 5, detail: "3.000+ spil, større katalog" },
  },
  {
    label: "Live Casino",
    casinoA: { score: 5, detail: "Premium Evolution-borde" },
    casinoB: { score: 4, detail: "Solidt udvalg, men færre VIP-borde" },
  },
  {
    label: "Mobiloplevelse",
    casinoA: { score: 4, detail: "Responsiv og hurtig" },
    casinoB: { score: 5, detail: "Dedikeret app med push-notifikationer" },
  },
  {
    label: "Udbetalingshastighed",
    casinoA: { score: 5, detail: "Ofte inden for 2-6 timer" },
    casinoB: { score: 4, detail: "Typisk inden for 12-24 timer" },
  },
  {
    label: "Betalingsmetoder",
    casinoA: { score: 4, detail: "MobilePay, Trustly, kort" },
    casinoB: { score: 5, detail: "MobilePay, Trustly, PayPal, Skrill" },
  },
  {
    label: "Kundeservice",
    casinoA: { score: 4, detail: "24/7 live chat på dansk" },
    casinoB: { score: 4, detail: "Live chat og e-mail" },
  },
  {
    label: "Ansvarligt Spil",
    casinoA: { score: 5, detail: "Avancerede indbetalingsgrænser" },
    casinoB: { score: 5, detail: "Unibet Reality Check + grænser" },
  },
];

const faqs = [
  {
    question: "Hvad er forskellen på bet365 og Unibet?",
    answer: "bet365 er primært kendt som sportsbook med et stærkt casino, mens Unibet tilbyder et bredere casino-udvalg med 3.000+ spil og en mere poleret mobilapp. Begge har dansk licens og hurtige udbetalinger.",
  },
  {
    question: "Hvem har den bedste velkomstbonus – bet365 eller Unibet?",
    answer: "Unibet tilbyder op til 2.000 kr. med 10x omsætning, mens bet365 giver op til 1.000 kr. med 12x omsætning. Rent matematisk giver Unibet den bedste deal med lavere omsætningskrav og højere bonusbeløb.",
  },
  {
    question: "Hvilket casino har flest spil?",
    answer: "Unibet fører med over 3.000 titler sammenlignet med bet365's 2.500+. Begge dækker dog alle populære udbydere som NetEnt, Pragmatic Play og Evolution Gaming.",
  },
  {
    question: "Er bet365 og Unibet lovlige i Danmark?",
    answer: "Ja, begge casinoer har dansk licens udstedt af Spillemyndigheden og opererer fuldt lovligt i Danmark med ROFUS-integration og danske betalingsmetoder.",
  },
  {
    question: "Hvem udbetaler hurtigst – bet365 eller Unibet?",
    answer: "bet365 er generelt hurtigere med udbetalinger ofte inden for 2-6 timer, mens Unibet typisk behandler udbetalinger inden for 12-24 timer. Begge tilbyder MobilePay.",
  },
];

export default function Bet365VsUnibet() {
  return (
    <ComparisonPageTemplate
      metaTitle="bet365 vs Unibet 2026 – Komplet Sammenligning | Casinoaftaler"
      metaDescription="Detaljeret sammenligning af bet365 og Unibet. Vi vurderer bonus, spiludvalg, udbetalinger, live casino og mobiloplevelse. Find det bedste casino til dig."
      h1="bet365 vs Unibet – Hvem vinder i 2026?"
      intro="To af Nordens største casino-brands kæmper om danske spilleres gunst. Vi har testet begge casinoer grundigt og sammenligner dem på 8 afgørende kategorier – fra velkomstbonus og spiludvalg til udbetalingshastighed og ansvarligt spil."
      path="/casino-anmeldelser/bet365-vs-unibet"
      datePublished="2026-03-08"
      author="jonas"
      casinoA={casinoA}
      casinoB={casinoB}
      categories={categories}
      verdict="Unibet vinder med en samlet score på 37/40 mod bet365's 35/40. Unibet har den stærkere velkomstbonus, det bredere spiludvalg og en mere poleret mobilapp. bet365 slår dog igen med hurtigere udbetalinger og et overlegen live casino. Hvis du primært spiller slots og vil have den bedste bonus, er Unibet det rette valg. Foretrækker du hurtige udbetalinger og sportsbetting kombineret med casino, er bet365 uovertruffen."
      verdictWinner="B"
      faqs={faqs}
      ctaSlug="unibet"
    />
  );
}

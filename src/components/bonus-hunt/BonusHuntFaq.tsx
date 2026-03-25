import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";

const FAQ_ITEMS = [
  {
    question: "Hvad er en bonus hunt?",
    answer: (
      <>
        En bonus hunt starter med en fast balance, som vi spinner ned til 0 på udvalgte{" "}
        <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">
          spilleautomater
        </Link>. Hver gang en bonus trigges undervejs, gemmer vi den og lukker bonusrunden ned – i stedet for at spille den med det samme.
        Når balancen er i 0, åbner vi alle de gemte bonusser på én gang live på Twitch. I nogle tilfælde kan bonusser også købes direkte (bonus buy),
        men hunting er vores primære metode. Hver hunt arkiveres med fuld statistik – gennemsnit X, break-even analyse,
        individuelle slot-resultater og VOD-link – så du kan gennemgå præcis hvad der skete.
      </>
    ),
  },
  {
    question: "Hvordan fungerer gennemsnit X?",
    answer: (
      <>
        Gennemsnit X (average X) er den centrale metrik i vores dokumentation. Vi beregner den ved at dividere
        den samlede gevinst med den samlede indsats på tværs af alle åbnede bonusser. Et gennemsnit X over
        break-even X markerer hunten som profitabel – og du kan sammenligne på tværs af alle vores arkiverede hunts.
      </>
    ),
  },
  {
    question: "Hvad er break-even X?",
    answer: (
      <>
        Break-even X er den multiplikator, der præcis dækker start balance. Vi beregner den som start balance
        divideret med samlet indsats. I vores arkiv kan du se break-even X for hver hunt og hurtigt vurdere,
        om resultatet var over eller under tærskelværdien.
      </>
    ),
  },
  {
    question: "Er bonus hunts lovlige i Danmark?",
    answer: (
      <>
        Ja. Alle vores bonus hunts gennemføres udelukkende hos{" "}
        <Link to="/casino-licenser" className="text-primary hover:underline">
          casinoer med dansk licens
        </Link>{" "}
        fra{" "}
        <Link to="/spillemyndigheden" className="text-primary hover:underline">
          Spillemyndigheden
        </Link>. Vi dokumenterer hvert resultat med fuld gennemsigtighed, så du altid kan verificere
        vores data.
      </>
    ),
  },
  {
    question: "Hvor kan man se live bonus hunts?",
    answer: (
      <>
        Vi streamer live på{" "}
        <a
          href="https://www.twitch.tv/casinoaftaler"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Twitch
        </a>{" "}
        hver uge. Efter hver stream arkiveres alt her med statistik, gennemsnit X, slot-resultater og
        VOD-link. Vores{" "}
        <Link to="/community" className="text-primary hover:underline">
          community
        </Link>{" "}
        kan deltage live med bets og interaktion.
      </>
    ),
  },
];

/** Build FAQ schema for JSON-LD */
export function buildBonusHuntFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof item.answer === "string"
          ? item.answer
          : reactNodeToText(item.answer),
      },
    })),
  };
}

/** Simple helper to extract text from React nodes for schema */
function reactNodeToText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(reactNodeToText).join("");
  if (typeof node === "object" && "props" in node) {
    const { children } = (node as any).props;
    return reactNodeToText(children);
  }
  return "";
}

export function BonusHuntFaq() {
  return (
    <FAQSection
      title="Ofte stillede spørgsmål om bonus hunt"
      faqs={FAQ_ITEMS}
    />
  );
}

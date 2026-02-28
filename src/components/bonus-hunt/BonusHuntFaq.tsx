import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "Hvad er en bonus hunt?",
    answer: (
      <>
        En bonus hunt er en live-streamet session, hvor en spiller køber flere bonusser på{" "}
        <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">
          spillemaskiner
        </Link>{" "}
        og samler dem, inden de åbnes én ad gangen. Resultatet måles i gennemsnit X (average multiplier)
        og sammenlignes med break-even X for at afgøre om hunten var profitabel.
      </>
    ),
  },
  {
    question: "Hvordan fungerer gennemsnit X?",
    answer: (
      <>
        Gennemsnit X (average X) er den gennemsnitlige multiplikator på tværs af alle åbnede bonusser i en hunt.
        Den beregnes ved at dividere den samlede gevinst med den samlede indsats. Et gennemsnit X over
        break-even X betyder, at hunten var profitabel.
      </>
    ),
  },
  {
    question: "Hvad er break-even X?",
    answer: (
      <>
        Break-even X er den multiplikator, der kræves for at gå i nul. Den beregnes som start balance
        divideret med den samlede indsats. Hvis gennemsnit X er højere end break-even X, har hunten
        genereret overskud.
      </>
    ),
  },
  {
    question: "Er bonus hunts lovlige i Danmark?",
    answer: (
      <>
        Ja, bonus hunts er lovlige i Danmark, så længe de spilles hos{" "}
        <Link to="/licenserede-casinoer" className="text-primary hover:underline">
          casinoer med dansk licens
        </Link>{" "}
        fra{" "}
        <Link to="/spillemyndigheden" className="text-primary hover:underline">
          Spillemyndigheden
        </Link>. Alle vores bonus hunts dokumenteres med fulde resultater og gennemføres
        udelukkende på licenserede platforme.
      </>
    ),
  },
  {
    question: "Hvor kan man se live bonus hunts?",
    answer: (
      <>
        Vores bonus hunts streames live på{" "}
        <a
          href="https://www.twitch.tv/casinoaftaler"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Twitch
        </a>. Efter hver stream arkiveres resultaterne her med statistik, gennemsnit X og VOD-link,
        så du kan gennemgå alle hunts i detaljer.
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
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">
        Ofte stillede spørgsmål om bonus hunt
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {FAQ_ITEMS.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-sm font-semibold text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

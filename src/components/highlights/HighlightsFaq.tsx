import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";

const FAQ_ITEMS = [
  {
    question: "Hvad er Highlights & Community Clips?",
    answer: (
      <>
        Highlights er vores kurerede samling af de bedste stream-øjeblikke fra{" "}
        <Link to="/bonus-hunt" className="text-primary hover:underline">bonus hunts</Link> og
        casino-streams på Twitch og YouTube. Community Clips-fanen giver dig mulighed for at dele
        dine egne wins og sjove øjeblikke – godkendte clips belønnes med ekstra spins.
      </>
    ),
  },
  {
    question: "Hvordan indsender jeg et community clip?",
    answer: (
      <>
        Log ind på din profil og klik "Indsend din Clip" under Community Clips-fanen.
        Du kan indsende Twitch clips, YouTube videoer eller andre platforme. Alle clips gennemgår
        en manuel godkendelsesproces, hvor vi verificerer at indholdet er ægte og lever op til
        vores retningslinjer for{" "}
        <Link to="/ansvarligt-spil" className="text-primary hover:underline">ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Får jeg noget for at indsende clips?",
    answer: (
      <>
        Ja! Godkendte clips belønnes automatisk med 50 bonus spins til vores{" "}
        <Link to="/community/spin-the-reel" className="text-primary hover:underline">Spin the Reel</Link>-funktion.
        Du kan optjene op til 5 clip-rewards. Derudover kan dine clips blive vist på forsiden
        af vores{" "}
        <Link to="/community" className="text-primary hover:underline">community</Link>.
      </>
    ),
  },
  {
    question: "Hvilke typer clips accepteres?",
    answer: (
      <>
        Vi accepterer wins, sjove øjeblikke, bonus-åbninger og reaktioner fra{" "}
        <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spilleautomater</Link>{" "}
        hos casinoer med{" "}
        <Link to="/casino-licenser" className="text-primary hover:underline">dansk licens</Link>.
        Vi viser ikke indhold der glorificerer uforsvarligt spil eller store tab.
      </>
    ),
  },
  {
    question: "Hvor kan jeg se live streams?",
    answer: (
      <>
        Vi streamer live på{" "}
        <a href="https://www.twitch.tv/fedesvinsejer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Twitch
        </a>{" "}
        hver uge. Efter hver stream arkiveres de bedste øjeblikke her som highlights.
        Du kan også følge os på{" "}
        <a href="https://www.youtube.com/@infocasinoaftaler" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          YouTube
        </a>{" "}
        for redigerede videoer og guides.
      </>
    ),
  },
];

/** Build FAQ schema for JSON-LD */
export function buildHighlightsFaqSchema() {
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

export function HighlightsFaq() {
  return (
    <FAQSection
      title="Ofte stillede spørgsmål om Highlights & Clips"
      faqs={FAQ_ITEMS}
    />
  );
}

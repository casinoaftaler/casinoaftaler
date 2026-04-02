import { FAQSection } from "@/components/FAQSection";
import { SITE_URL } from "@/lib/seo";

export const communityHubFaqs = [
  {
    question: "Hvad er Casinoaftaler Community?",
    answer:
      "Casinoaftaler Community er et gratis fællesskab hvor du kan spille slots, deltage i turneringer, følge live bonus hunts og optjene rewards – alt sammen uden at risikere rigtige penge.",
  },
  {
    question: "Koster det noget at deltage i community?",
    answer:
      "Nej, det er 100% gratis. Du får daglige credits til at spille med, og du kan optjene ekstra spins via profil-udfyldelse og clip-uploads.",
  },
  {
    question: "Hvordan fungerer turneringerne?",
    answer:
      "Turneringer kører i månedlige cyklusser med tre kategorier: Flest Point, Højeste X og Største Gevinst. Du deltager gratis med dine daglige credits og konkurrerer om kontante præmier (500/300/200 kr. til top 3).",
  },
  {
    question: "Hvad er en bonus hunt?",
    answer:
      "En bonus hunt er en live stream-session hvor vi åbner bonusrunder på en række slots og dokumenterer resultaterne. Du kan følge med live, gætte på end balance og deltage i community bets.",
  },
  {
    question: "Kan jeg vinde rigtige penge i community?",
    answer:
      "Nej, alle spil i community bruger virtuelle credits. Du kan dog vinde kontante præmier (500/300/200 kr.) gennem de månedlige turneringer, og du kan bruge optjente points i vores butik.",
  },
  {
    question: "Hvordan optjener jeg bonus spins?",
    answer:
      "Du kan optjene bonus spins ved at uploade godkendte clips til Highlights, udfylde din profil og deltage aktivt i fællesskabet via vores Rewards Program.",
  },
];

export function buildCommunityHubFaqSchema() {
  return {
    "@type": "FAQPage",
    mainEntity: communityHubFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function CommunityHubFaq() {
  return (
    <FAQSection
      title="Ofte stillede spørgsmål om Casinoaftaler Community"
      faqs={communityHubFaqs}
    />
  );
}

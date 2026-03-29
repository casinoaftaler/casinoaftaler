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
      "Turneringer kører typisk over en uge eller måned. Du tilmelder dig gratis, spiller med virtuelle credits og konkurrerer om topplaceringer. De bedste spillere vinder præmier.",
  },
  {
    question: "Hvad er en bonus hunt?",
    answer:
      "En bonus hunt er en live stream-session hvor vi åbner bonusrunder på en række slots og dokumenterer resultaterne. Du kan følge med live, gætte på end balance og deltage i community bets.",
  },
  {
    question: "Kan jeg vinde rigtige penge i community?",
    answer:
      "Nej, alle spil i community bruger virtuelle credits. Du kan dog vinde præmier som gavekort og merchandise gennem turneringer og butikken.",
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

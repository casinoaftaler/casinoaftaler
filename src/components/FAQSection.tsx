import { ReactNode } from "react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string | ReactNode;
}

interface FAQSectionProps {
  /** Title displayed next to the icon */
  title?: string;
  /** Array of FAQ items */
  faqs?: FAQ[];
}

const defaultFaqs: FAQ[] = [
  {
    question: "Hvad er en casinobonus?",
    answer:
      "En casinobonus er et kampagnetilbud fra online casinoer designet til at tiltrække nye spillere eller belønne eksisterende. Almindelige typer inkluderer velkomstbonusser, indbetalingsmatch, gratis spins og bonusser uden indbetaling. Disse bonusser giver dig ekstra midler eller gratis spil til brug på casinospil.",
  },
  {
    question: "Hvad er gennemspilskrav?",
    answer:
      "Gennemspilskrav (også kaldet omsætningskrav) specificerer, hvor mange gange du skal spille for bonusbeløbet, før du kan hæve eventuelle gevinster. For eksempel betyder en bonus på 1.000 kr. med 10x gennemspil, at du skal placere væddemål for 10.000 kr., før du kan hæve.",
  },
  {
    question: "Hvad er forskellen mellem sticky og no-sticky bonusser?",
    answer:
      "Med en no-sticky (eller faldskærms) bonus spilles dine rigtige penge først, og du kan hæve dem når som helst. Bonussen bruges kun, når din indbetaling er brugt. Med en sticky bonus kombineres din indbetaling og bonus, og du kan ikke hæve noget, før gennemspilskravene er opfyldt.",
  },
  {
    question: "Er online casinobonusser det værd?",
    answer:
      "Casinobonusser kan være det værd, hvis du forstår vilkår og betingelser. Kig efter bonusser med lavere gennemspilskrav (10x på danske casinoer), rimelige gyldighedsperioder og fair spilbidragsprocenter. No-sticky bonusser tilbyder generelt bedre værdi for spillere.",
  },
  {
    question: "Hvordan gør jeg krav på en casinobonus?",
    answer:
      "For at gøre krav på en bonus skal du typisk registrere dig på casinoet, foretage en kvalificerende indbetaling og enten indtaste en bonuskode eller tilmelde dig via din konto. Nogle bonusser krediteres automatisk, mens andre kræver, at du kontakter kundeservice. Læs altid vilkårene først!",
  },
];

export function FAQSection({ title = "Ofte Stillede Spørgsmål", faqs = defaultFaqs }: FAQSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-3xl font-bold flex items-center gap-2">
        <HelpCircle className="h-8 w-8 text-primary" />
        {title}
      </h2>
      <div>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border border-border bg-card px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

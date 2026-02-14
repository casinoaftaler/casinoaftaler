import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Hvad er en casinobonus?",
    answer:
      "En casinobonus er et kampagnetilbud fra online casinoer designet til at tiltrække nye spillere eller belønne eksisterende. Almindelige typer inkluderer velkomstbonusser, indbetalingsmatch, gratis spins og bonusser uden indbetaling. Disse bonusser giver dig ekstra midler eller gratis spil til brug på casinospil.",
  },
  {
    question: "Hvad er gennemspilskrav?",
    answer:
      "Gennemspilskrav (også kaldet omsætningskrav) specificerer, hvor mange gange du skal spille for bonusbeløbet, før du kan hæve eventuelle gevinster. For eksempel betyder en bonus på 1.000 kr. med 35x gennemspil, at du skal placere væddemål for 35.000 kr., før du kan hæve.",
  },
  {
    question: "Hvad er forskellen mellem sticky og no-sticky bonusser?",
    answer:
      "Med en no-sticky (eller faldskærms) bonus spilles dine rigtige penge først, og du kan hæve dem når som helst. Bonussen bruges kun, når din indbetaling er brugt. Med en sticky bonus kombineres din indbetaling og bonus, og du kan ikke hæve noget, før gennemspilskravene er opfyldt.",
  },
  {
    question: "Er online casinobonusser det værd?",
    answer:
      "Casinobonusser kan være det værd, hvis du forstår vilkår og betingelser. Kig efter bonusser med lavere gennemspilskrav (under 40x), rimelige gyldighedsperioder og fair spilbidragsprocenter. No-sticky bonusser tilbyder generelt bedre værdi for spillere.",
  },
  {
    question: "Hvordan gør jeg krav på en casinobonus?",
    answer:
      "For at gøre krav på en bonus skal du typisk registrere dig på casinoet, foretage en kvalificerende indbetaling og enten indtaste en bonuskode eller tilmelde dig via din konto. Nogle bonusser krediteres automatisk, mens andre kræver, at du kontakter kundeservice. Læs altid vilkårene først!",
  },
];

export function FAQSection() {
  return (
    <section className="container py-16">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl md:text-3xl">
              Ofte Stillede Spørgsmål
            </CardTitle>
          </div>
          <p className="text-muted-foreground">
            Alt du behøver at vide om casinobonusser og hvordan de fungerer.
          </p>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-border bg-muted/50 px-6"
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
        </CardContent>
      </Card>
    </section>
  );
}

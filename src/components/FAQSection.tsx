import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is a casino bonus?",
    answer:
      "A casino bonus is a promotional offer from online casinos designed to attract new players or reward existing ones. Common types include welcome bonuses, deposit matches, free spins, and no-deposit bonuses. These bonuses give you extra funds or free plays to use on casino games.",
  },
  {
    question: "What are wagering requirements?",
    answer:
      "Wagering requirements (also called playthrough requirements) specify how many times you must bet the bonus amount before you can withdraw any winnings. For example, a $100 bonus with 35x wagering means you need to place $3,500 worth of bets before withdrawing.",
  },
  {
    question: "What is the difference between sticky and non-sticky bonuses?",
    answer:
      "With a non-sticky (or parachute) bonus, your real money is played first, and you can withdraw it at any time. The bonus is only used after your deposit is gone. With a sticky bonus, your deposit and bonus are combined, and you cannot withdraw anything until wagering is complete.",
  },
  {
    question: "Are online casino bonuses worth it?",
    answer:
      "Casino bonuses can be worth it if you understand the terms and conditions. Look for bonuses with lower wagering requirements (under 40x), reasonable validity periods, and fair game contribution rates. Non-sticky bonuses generally offer better value for players.",
  },
  {
    question: "How do I claim a casino bonus?",
    answer:
      "To claim a bonus, you typically need to register at the casino, make a qualifying deposit, and either enter a bonus code or opt-in through your account. Some bonuses are automatically credited, while others require you to contact customer support. Always read the terms first!",
  },
];

export function FAQSection() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Everything you need to know about casino bonuses and how they work.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
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
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";

interface BonusHuntCasinoContextProps {
  huntNumber: number;
  huntDate: string;
}

/**
 * SEO contextual section linking bonus hunt → casino review.
 * Uses varied anchor text to avoid over-optimisation.
 */
export function BonusHuntCasinoContext({ huntNumber, huntDate }: BonusHuntCasinoContextProps) {
  // Rotate anchor text based on hunt number to ensure variation
  const anchors = [
    { text: "SpilDanskNu casino", title: "Læs vores fulde anmeldelse af SpilDanskNu" },
    { text: "vores SpilDanskNu anmeldelse", title: "SpilDanskNu anmeldelse 2026" },
    { text: "SpilDanskNu", title: "Læs live test og vurdering af SpilDanskNu" },
  ];
  const anchor = anchors[huntNumber % anchors.length];

  return (
    <section className="mb-6 rounded-xl border border-border bg-card p-5 md:p-6" aria-label="Casino testet i denne bonus hunt">
      <h2 className="mb-2 text-lg font-bold text-foreground">
        Casino testet i denne bonus hunt
      </h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Bonus Hunt #{huntNumber}
        {huntDate ? ` (${huntDate})` : ""} blev spillet live hos{" "}
        <Link
          to="/casino-anmeldelser/spildansknu"
          title={anchor.title}
          className="text-primary underline hover:text-primary/80"
        >
          {anchor.text}
        </Link>
        . Se vores komplette anmeldelse med bonusvilkår, udbetalingstest og vurdering.
      </p>
    </section>
  );
}

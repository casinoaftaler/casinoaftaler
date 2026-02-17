import { Link } from "react-router-dom";

const linkClass = "text-primary underline hover:text-primary/80";

/**
 * Reusable E-E-A-T "Experience" section for cornerstone SEO pages.
 * Renders as plain H3 + paragraph text to match existing guide styling.
 * No badges, no boxes, no color changes.
 */
export function ExperienceSection() {
  return (
    <section className="mb-12">
      <h3 className="mb-4 text-2xl font-bold">🔎 Sådan tester vi casinoerne</h3>
      <p className="mb-4 text-muted-foreground leading-relaxed">
        Denne guide bygger på praktisk test udført af Casinoaftaler.dk's team. Vi opretter konto, foretager indbetaling, gennemgår bonusvilkår og tester udbetalinger for at sikre, at alle anbefalinger bygger på reel erfaring – ikke skrivebordsvurdering.
      </p>
      <p className="mb-2 text-muted-foreground leading-relaxed">
        Vores test inkluderer:
      </p>
      <ul className="mb-4 list-disc pl-6 space-y-1 text-muted-foreground leading-relaxed">
        <li>Kontooprettelse og identitetsverificering</li>
        <li>Indbetaling og bonusaktivering</li>
        <li>Gennemgang af omsætningskrav</li>
        <li>Test af kundeservice</li>
        <li>Gennemførsel af reel udbetaling</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed">
        Vi tester alle casinoer med rigtige konti og dokumenterer vores vurdering ud fra faste kriterier. Læs mere om{" "}
        <Link to="/saadan-tester-vi-casinoer" className={linkClass}>
          vores testmetode
        </Link>.
      </p>
    </section>
  );
}

import { Link } from "react-router-dom";

/**
 * Crawlable SEO text block shown below individual community slot games.
 * Contains keyword-rich anchors to money pages.
 */
export function SlotGameSeoCta() {
  return (
    <section className="mt-8 max-w-2xl mx-auto rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 text-center">
      <h2 className="text-base font-semibold mb-2">Kan du lide dette spil?</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Se de bedste{" "}
        <Link
          to="/casinospil/spillemaskiner"
          className="text-primary hover:underline font-medium"
        >
          spillemaskiner
        </Link>{" "}
        og{" "}
        <Link
          to="/casino-bonus"
          className="text-primary hover:underline font-medium"
        >
          casino bonusser
        </Link>{" "}
        hos danske online casinoer.
      </p>
    </section>
  );
}

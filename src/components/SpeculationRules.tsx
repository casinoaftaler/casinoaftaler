import { Helmet } from "react-helmet-async";

/**
 * Speculation Rules API – tells Chrome/Google to prerender likely next pages.
 * Only emitted on the homepage to avoid excessive prefetch.
 * @see https://developer.chrome.com/docs/web-platform/prerender-pages
 */
const speculationRules = {
  prerender: [
    {
      urls: [
        "/casino-anmeldelser",
        "/casino-bonus",
        "/free-spins",
        "/live-casino",
        "/bonus-hunt",
        "/slot-database",
        "/casino-nyheder",
      ],
      eagerness: "moderate",
    },
  ],
  prefetch: [
    {
      urls: [
        "/casinospil",
        "/statistik",
        "/casino-uden-rofus",
        "/ordliste",
        "/ansvarligt-spil",
      ],
      eagerness: "moderate",
    },
  ],
};

export function SpeculationRules() {
  return (
    <Helmet>
      <script type="speculationrules">
        {JSON.stringify(speculationRules)}
      </script>
    </Helmet>
  );
}

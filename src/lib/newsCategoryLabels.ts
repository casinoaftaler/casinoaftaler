/** Shared category slug → Danish display label mapping for casino news */
export const NEWS_CATEGORY_LABELS: Record<string, string> = {
  generelt: "Generelt",
  regulering: "Regulering",
  licenser: "Licenser",
  bonusser: "Bonusser",
  betalingsmetoder: "Betalingsmetoder",
  lovgivning: "Lovgivning",
  teknologi: "Teknologi",
  "nye-casinoer": "Nye Casinoer",
  markedsbevægelser: "Markedsanalyse",
  juridisk: "Juridisk",
};

/** Get a human-readable Danish label for a category slug */
export function getCategoryLabel(slug: string): string {
  return NEWS_CATEGORY_LABELS[slug] || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
}

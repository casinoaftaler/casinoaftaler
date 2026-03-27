/** Shared category slug → Danish display label mapping for casino news */
export const NEWS_CATEGORY_LABELS: Record<string, string> = {
  generelt: "Generelt",
  regulering: "Regulering",
  licenser: "Licenser",
  bonusser: "Bonusser",
  betalingsmetoder: "Betalingsmetoder",
  betalingsteknologi: "Betalingsteknologi",
  lovgivning: "Lovgivning",
  teknologi: "Teknologi",
  "teknologi-sikkerhed": "Teknologi & Sikkerhed",
  "nye-casinoer": "Nye Casinoer",
  markedsbevægelser: "Markedsanalyse",
  juridisk: "Juridisk",
  spiludviklere: "Spiludviklere",
  "ansvarligt-spil": "Ansvarligt Spil",
  "live-casino": "Live Casino",
  mobilcasino: "Mobilcasino",
  spilleafgifter: "Spilleafgifter",
  spilanmeldelser: "Spilanmeldelser",
  "nordisk-marked": "Nordisk Marked",
  kundeservice: "Kundeservice",
  dataanalyse: "Dataanalyse",
  markedspuls: "Markedspuls",
};

/** Get a human-readable Danish label for a category slug */
export function getCategoryLabel(slug: string): string {
  return NEWS_CATEGORY_LABELS[slug] || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
}

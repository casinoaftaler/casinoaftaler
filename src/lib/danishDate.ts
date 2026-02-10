/**
 * Returns today's date string (YYYY-MM-DD) in Danish timezone (Europe/Copenhagen).
 * This ensures the daily reset happens at midnight Danish time, not UTC.
 */
export function getTodayDanish(): string {
  const now = new Date();
  // Intl.DateTimeFormat gives the correct date parts in the target timezone
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Copenhagen",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  // sv-SE locale formats as YYYY-MM-DD which is what we need
  return parts;
}

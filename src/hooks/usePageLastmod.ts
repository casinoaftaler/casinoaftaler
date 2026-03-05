import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PageMetadata {
  path: string;
  updated_at: string;
  show_updated_date: boolean;
}

/**
 * Fetches the dynamic lastmod date for a page from the page_metadata table.
 * Used by AuthorMetaBar to display the "Opdateret" date.
 * Falls back gracefully if no DB record exists.
 */
export function usePageLastmod(path: string) {
  return useQuery({
    queryKey: ["page-lastmod", path],
    queryFn: async (): Promise<PageMetadata | null> => {
      const { data, error } = await supabase
        .from("page_metadata")
        .select("path, updated_at, show_updated_date")
        .eq("path", path)
        .maybeSingle();

      if (error) {
        console.warn("Failed to fetch page metadata:", error.message);
        return null;
      }
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 min cache – dates don't change often
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Format a timestamptz to Danish display format (DD. måned YYYY).
 */
export function formatTimestampDanish(isoTimestamp: string): string {
  const months = [
    "januar", "februar", "marts", "april", "maj", "juni",
    "juli", "august", "september", "oktober", "november", "december",
  ];
  const date = new Date(isoTimestamp);
  // Use Danish timezone
  const formatter = new Intl.DateTimeFormat("da-DK", {
    timeZone: "Europe/Copenhagen",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const day = parseInt(parts.find((p) => p.type === "day")?.value || "1", 10);
  const monthIdx = parseInt(parts.find((p) => p.type === "month")?.value || "1", 10) - 1;
  const year = parts.find((p) => p.type === "year")?.value || "2026";
  return `${day}. ${months[monthIdx]} ${year}`;
}

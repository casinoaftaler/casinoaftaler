import { SITE_URL } from "@/lib/seo";

interface SlotForSchema {
  slot_name: string;
  provider: string;
  rtp: number | null;
  highest_x: number | null;
  bonus_count: number;
}

/**
 * Build an ItemList + SoftwareApplication JSON-LD schema for a page of slots.
 * Each slot with bonus_count > 0 and highest_x > 0 gets an aggregateRating.
 *
 * Rating formula: ratingValue = min(5, 1 + (highest_x / 500) * 4)
 * ratingCount = bonus_count
 */
export function buildSlotCatalogSchema(
  slots: SlotForSchema[],
  pageUrl: string
) {
  const items = slots.map((slot, index) => {
    const hasRating = slot.bonus_count > 0 && slot.highest_x && slot.highest_x > 0;
    const ratingValue = hasRating
      ? Math.min(5, 1 + ((slot.highest_x || 0) / 500) * 4).toFixed(1)
      : null;

    const fallbackReview = !hasRating
      ? {
          review: {
            "@type": "Review",
            author: {
              "@type": "Organization",
              name: "Casinoaftaler Redaktionen",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: String(
                slot.rtp && slot.rtp >= 96.5 ? 4.5
                : slot.rtp && slot.rtp >= 96 ? 4
                : slot.rtp && slot.rtp >= 95 ? 3.5
                : 3
              ),
              bestRating: "5",
              worstRating: "1",
            },
            reviewBody: `Redaktionel vurdering af ${slot.slot_name} baseret på RTP${slot.rtp ? ` (${slot.rtp}%)` : ""} og spiloplevelse.`,
          },
        }
      : {};

    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoGame",
        name: slot.slot_name,
        gamePlatform: "Web",
        ...(slot.provider && slot.provider !== "Custom Slot" && slot.provider !== "Unknown" && {
          author: {
            "@type": "Organization",
            name: slot.provider,
          },
        }),
        ...(hasRating && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue,
            ratingCount: String(slot.bonus_count),
            bestRating: "5",
            worstRating: "1",
          },
        }),
        ...fallbackReview,
      },
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#slot-catalog`,
    name: "Slot Database – Spillemaskiner med Community Data",
    numberOfItems: items.length,
    itemListElement: items,
  };
}

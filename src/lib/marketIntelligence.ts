import { SITE_URL } from "@/lib/seo";

export interface MarketIntelligenceEvent {
  id: string;
  casino_slug: string | null;
  event_type:
    | "license_verified"
    | "license_change"
    | "bonus_verified"
    | "bonus_change"
    | "wager_change"
    | "market_update";
  category: "licenser" | "bonus" | "regulering" | "marked";
  headline: string;
  summary: string;
  impact_level: "low" | "medium" | "high";
  source_url: string | null;
  source_label: string | null;
  published_at: string;
  effective_date: string | null;
  is_featured: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export function getMarketIntelligenceCategoryLabel(category: MarketIntelligenceEvent["category"]) {
  switch (category) {
    case "licenser":
      return "Licenser";
    case "bonus":
      return "Bonus";
    case "regulering":
      return "Regulering";
    default:
      return "Marked";
  }
}

export function getMarketIntelligenceImpactLabel(level: MarketIntelligenceEvent["impact_level"]) {
  switch (level) {
    case "high":
      return "Høj effekt";
    case "medium":
      return "Mellem effekt";
    default:
      return "Lav effekt";
  }
}

export function getMarketIntelligenceImpactVariant(level: MarketIntelligenceEvent["impact_level"]) {
  switch (level) {
    case "high":
      return "default" as const;
    case "medium":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
}

export function getMarketTeaserCopy(pagePath: string) {
  if (pagePath === "/casino-bonus") {
    return {
      eyebrow: "Bonusmarked",
      title: "Se de seneste verificerede bonusbevægelser",
      description:
        "Få det offentlige overblik over verificerede ændringer i bonusrammer, licensstatus og markedsudvikling.",
    };
  }

  if (pagePath === "/casinoer" || pagePath === "/nye-casinoer") {
    return {
      eyebrow: "Markedsstatus",
      title: "Følg det danske casinomarked i realtid",
      description:
        "Brug Market Intelligence-hubben til at se hvilke operatører der er verificeret, og hvad der har ændret sig senest.",
    };
  }

  return {
    eyebrow: "Market Intelligence",
    title: "Se markedssignalerne bag denne trust-side",
    description:
      "Vi samler verificerede licens-, bonus- og compliance-opdateringer i et offentligt overblik, du kan dykke videre ned i.",
  };
}

export function buildMarketIntelligenceSchema(events: MarketIntelligenceEvent[], trackedOperators: number) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Markedsindsigt for danske casinoer",
    url: `${SITE_URL}/markedsindsigt`,
    description:
      "Offentligt overblik over verificerede licens-, bonus- og compliance-opdateringer på det danske casinomarked.",
    about: [
      { "@type": "Thing", name: "Danske online casinoer" },
      { "@type": "Thing", name: "Casino compliance" },
      { "@type": "Thing", name: "Spillemyndigheden" },
    ],
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: events.length,
      itemListElement: events.slice(0, 10).map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: event.headline,
          description: event.summary,
          datePublished: event.published_at,
          url: `${SITE_URL}/markedsindsigt#event-${event.id}`,
        },
      })),
    },
    ...(trackedOperators > 0
      ? {
          mentions: [
            {
              "@type": "Thing",
              name: `${trackedOperators} trackede operatører`,
            },
          ],
        }
      : {}),
  };
}

/**
 * Centralized entity schema helpers for about/mentions properties.
 * Used by buildArticleSchema calls across all page types.
 * 
 * Rules:
 * - Max 3 mentions per page
 * - about must match page primary topic
 * - Use canonical URLs for entity targets
 */

import { SITE_URL } from "./seo";

type SchemaEntity = { "@type": string; name: string; url?: string };

// ── Casino Review Entities ──────────────────────────────────────────
export function casinoReviewEntities(casinoName: string, casinoSlug: string): {
  about: SchemaEntity[];
  mentions: SchemaEntity[];
} {
  return {
    about: [
      { "@type": "Organization", name: casinoName, url: `${SITE_URL}/casino-anmeldelser/${casinoSlug}` },
    ],
    mentions: [
      { "@type": "GovernmentOrganization", name: "Spillemyndigheden", url: `${SITE_URL}/spillemyndigheden` },
      { "@type": "Thing", name: "Casino Bonus", url: `${SITE_URL}/casino-bonus` },
      { "@type": "Thing", name: "Ansvarligt Spil", url: `${SITE_URL}/ansvarligt-spil` },
    ],
  };
}

// ── Slot Guide Entities ─────────────────────────────────────────────
export function slotGuideEntities(slotName: string, slotSlug: string, providerName: string, providerSlug: string): {
  about: SchemaEntity[];
  mentions: SchemaEntity[];
} {
  return {
    about: [
      { "@type": "VideoGame", name: slotName, url: `${SITE_URL}/casinospil/spillemaskiner/${slotSlug}` },
    ],
    mentions: [
      { "@type": "Organization", name: providerName, url: `${SITE_URL}/spiludviklere/${providerSlug}` },
      { "@type": "Thing", name: "RTP", url: `${SITE_URL}/ordbog/rtp` },
      { "@type": "Thing", name: "Volatilitet", url: `${SITE_URL}/ordbog/volatilitet` },
    ],
  };
}

// ── Bonus Page Entities ─────────────────────────────────────────────
export function bonusPageEntities(bonusType: string, bonusPath: string): {
  about: SchemaEntity[];
  mentions: SchemaEntity[];
} {
  return {
    about: [
      { "@type": "Thing", name: bonusType, url: `${SITE_URL}${bonusPath}` },
    ],
    mentions: [
      { "@type": "Thing", name: "Omsætningskrav", url: `${SITE_URL}/omsaetningskrav` },
      { "@type": "GovernmentOrganization", name: "Spillemyndigheden", url: `${SITE_URL}/spillemyndigheden` },
      { "@type": "Thing", name: "Casino Anmeldelser", url: `${SITE_URL}/casino-anmeldelser` },
    ],
  };
}

// ── Game Hub Entities ───────────────────────────────────────────────
export function gameHubEntities(gameName: string, gamePath: string): {
  about: SchemaEntity[];
  mentions: SchemaEntity[];
} {
  return {
    about: [
      { "@type": "Thing", name: gameName, url: `${SITE_URL}${gamePath}` },
    ],
    mentions: [
      { "@type": "Thing", name: "Casino Bonus", url: `${SITE_URL}/casino-bonus` },
      { "@type": "Thing", name: "Ansvarligt Spil", url: `${SITE_URL}/ansvarligt-spil` },
      { "@type": "Thing", name: "Live Casino", url: `${SITE_URL}/live-casino` },
    ],
  };
}

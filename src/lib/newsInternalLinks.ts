export type NewsInternalLink = {
  href: string;
  label: string;
};

const BASE_INTERNAL_LINKS: NewsInternalLink[] = [
  { href: "/casino-bonus", label: "Casino bonus" },
  { href: "/free-spins-i-dag", label: "Free spins i dag" },
  { href: "/velkomstbonus", label: "Velkomstbonus" },
  { href: "/cashback-bonus", label: "Cashback bonus" },
  { href: "/reload-bonus", label: "Reload bonus" },
  { href: "/vip-program", label: "VIP program" },
  { href: "/nye-casinoer", label: "Nye casinoer" },
  { href: "/top-10-casino-online", label: "Top 10 casino online" },
  { href: "/casino-anmeldelser", label: "Casino anmeldelser" },
  { href: "/betalingsmetoder", label: "Betalingsmetoder" },
  { href: "/casino-med-mobilepay", label: "Casino med MobilePay" },
  { href: "/casino-med-trustly", label: "Casino med Trustly" },
  { href: "/ansvarligt-spil", label: "Ansvarligt spil" },
  { href: "/ordbog/omsaetningskrav", label: "Omsætningskrav" },
  { href: "/ordbog/spillemyndigheden", label: "Spillemyndigheden" },
];

const CATEGORY_INTERNAL_LINKS: Record<string, NewsInternalLink[]> = {
  bonusser: [
    { href: "/bonus-uden-indbetaling", label: "Bonus uden indbetaling" },
    { href: "/bonus-uden-omsaetningskrav", label: "Bonus uden omsætningskrav" },
    { href: "/no-sticky-bonus", label: "No-sticky bonus" },
    { href: "/sticky-bonus", label: "Sticky bonus" },
  ],
  betalingsmetoder: [
    { href: "/payments/mobilepay", label: "MobilePay guide" },
    { href: "/payments/trustly", label: "Trustly guide" },
    { href: "/payments/apple-pay", label: "Apple Pay guide" },
    { href: "/payments/skrill", label: "Skrill guide" },
  ],
  licenser: [
    { href: "/casino-licenser", label: "Casino licenser" },
    { href: "/spillemyndigheden", label: "Spillemyndigheden guide" },
    { href: "/ansvarligt-spil/rofus", label: "ROFUS guide" },
    { href: "/ansvarligt-spil/stopspillet", label: "StopSpillet guide" },
  ],
  lovgivning: [
    { href: "/casino-licenser", label: "Danske casino licenser" },
    { href: "/ansvarligt-spil", label: "Ansvarligt spil" },
    { href: "/ansvarligt-spil/rofus", label: "ROFUS" },
    { href: "/ordbog/spillemyndigheden", label: "Spillemyndigheden" },
  ],
  "nye-casinoer": [
    { href: "/nye-casinoer/2026", label: "Nye casinoer 2026" },
    { href: "/nye-casinoer/dansk-licens", label: "Nye casinoer med dansk licens" },
    { href: "/nye-casinoer/trustly", label: "Nye Trustly casinoer" },
    { href: "/casino-uden-konto", label: "Casino uden konto" },
  ],
};

function simpleHash(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function uniqueByHref(links: NewsInternalLink[]): NewsInternalLink[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export function getEnterpriseNewsInternalLinks(
  category: string,
  seed = "",
  limit = 12,
): NewsInternalLink[] {
  const combined = uniqueByHref([
    ...(CATEGORY_INTERNAL_LINKS[category] ?? []),
    ...BASE_INTERNAL_LINKS,
  ]);

  if (combined.length <= limit) return combined;

  const offset = combined.length > 0 ? simpleHash(seed || category) % combined.length : 0;
  const rotated = [...combined.slice(offset), ...combined.slice(0, offset)];
  return rotated.slice(0, limit);
}

export function countInternalLinksInHtml(html: string): number {
  if (!html) return 0;
  return (html.match(/href="\/(?!\/)[^"]+"/g) ?? []).length;
}

export function appendEnterpriseInternalLinks(
  html: string,
  category: string,
  seed = "",
): string {
  if (!html) return html;
  if (html.includes('data-enterprise-news-links="true"')) return html;
  if (countInternalLinksInHtml(html) >= 10) return html;

  const links = getEnterpriseNewsInternalLinks(category, seed, 12);
  if (links.length === 0) return html;

  const listHtml = links
    .map((link) => `<li><a href="${link.href}">${link.label}</a></li>`)
    .join("");

  return `${html}\n\n<section data-enterprise-news-links="true"><h2>Relaterede guider og anmeldelser</h2><ul>${listHtml}</ul></section>`;
}

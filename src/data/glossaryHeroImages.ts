/**
 * Hero image map for glossary term pages.
 * Existing manually mapped assets are kept, while missing terms
 * get either auto-discovered assets or unique generated fallbacks.
 */
import rtpHero from "@/assets/heroes/ordbog-rtp-hero.jpg";
import wageringHero from "@/assets/heroes/ordbog-wagering-hero.jpg";
import volatilitetHero from "@/assets/heroes/ordbog-volatilitet-hero.jpg";
import houseEdgeHero from "@/assets/heroes/ordbog-house-edge-hero.jpg";
import freeSpinsHero from "@/assets/heroes/ordbog-free-spins-hero.jpg";
import scatterHero from "@/assets/heroes/ordbog-scatter-hero.jpg";
import wildHero from "@/assets/heroes/ordbog-wild-hero.jpg";
import jackpotHero from "@/assets/heroes/ordbog-jackpot-hero.jpg";
import rngHero from "@/assets/heroes/ordbog-rng-hero.jpg";
import paylinesHero from "@/assets/heroes/ordbog-paylines-hero.jpg";
import bonusRundeHero from "@/assets/heroes/ordbog-bonus-runde-hero.jpg";
import multiplikatorHero from "@/assets/heroes/ordbog-multiplikator-hero.jpg";
import maxBetHero from "@/assets/heroes/ordbog-max-bet-hero.jpg";
import autoplayHero from "@/assets/heroes/ordbog-autoplay-hero.jpg";
import hitFrequencyHero from "@/assets/heroes/ordbog-hit-frequency-hero.jpg";
import gambleFeatureHero from "@/assets/heroes/ordbog-gamble-feature-hero.jpg";
import cascadingWinsHero from "@/assets/heroes/ordbog-cascading-wins-hero.jpg";
import megawaysHero from "@/assets/heroes/ordbog-megaways-hero.jpg";
import buyBonusHero from "@/assets/heroes/ordbog-buy-bonus-hero.jpg";
import bankrollManagementHero from "@/assets/heroes/ordbog-bankroll-management-hero.jpg";
import minimumIndbetalingHero from "@/assets/heroes/ordbog-minimum-indbetaling-hero.jpg";
import kycHero from "@/assets/heroes/ordbog-kyc-hero.jpg";
import gamificationHero from "@/assets/heroes/ordbog-gamification-hero.jpg";
import retriggerHero from "@/assets/heroes/ordbog-retrigger-hero.jpg";
import clusterPaysHero from "@/assets/heroes/ordbog-cluster-pays-hero.jpg";
import expandingWildHero from "@/assets/heroes/ordbog-expanding-wild-hero.jpg";

export const glossaryHeroImages: Record<string, string> = {
  rtp: rtpHero,
  wagering: wageringHero,
  volatilitet: volatilitetHero,
  "house-edge": houseEdgeHero,
  "free-spins": freeSpinsHero,
  scatter: scatterHero,
  wild: wildHero,
  jackpot: jackpotHero,
  rng: rngHero,
  paylines: paylinesHero,
  "bonus-runde": bonusRundeHero,
  multiplikator: multiplikatorHero,
  "max-bet": maxBetHero,
  autoplay: autoplayHero,
  "hit-frequency": hitFrequencyHero,
  "gamble-feature": gambleFeatureHero,
  "cascading-wins": cascadingWinsHero,
  megaways: megawaysHero,
  "buy-bonus": buyBonusHero,
  "bankroll-management": bankrollManagementHero,
  "minimum-indbetaling": minimumIndbetalingHero,
  kyc: kycHero,
  gamification: gamificationHero,
  retrigger: retriggerHero,
  "cluster-pays": clusterPaysHero,
  "expanding-wild": expandingWildHero,
};

const autoDiscoveredGlossaryHeroes = Object.entries(
  import.meta.glob<{ default: string }>("/src/assets/heroes/ordbog-*-hero.{jpg,jpeg,png,webp}", {
    eager: true,
  }),
).reduce<Record<string, string>>((acc, [path, mod]) => {
  const filename = path.split("/").pop() ?? "";
  const slug = filename.replace(/^ordbog-/, "").replace(/-hero\.\w+$/, "");
  if (slug) acc[slug] = mod.default;
  return acc;
}, {});

const mergedGlossaryHeroes: Record<string, string> = {
  ...autoDiscoveredGlossaryHeroes,
  ...glossaryHeroImages,
};

const generatedFallbackCache = new Map<string, string>();

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function createUniqueGlossaryFallback(slug: string): string {
  const seed = hashSlug(slug || "ordbog");
  const hueA = seed % 360;
  const hueB = (seed * 7 + 47) % 360;
  const hueC = (seed * 13 + 91) % 360;
  const hueD = (seed * 17 + 139) % 360;

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080' preserveAspectRatio='xMidYMid slice'>
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='hsl(${hueA} 68% 26%)' />
        <stop offset='55%' stop-color='hsl(${hueB} 70% 24%)' />
        <stop offset='100%' stop-color='hsl(${hueC} 72% 22%)' />
      </linearGradient>
      <radialGradient id='glowA' cx='25%' cy='25%' r='65%'>
        <stop offset='0%' stop-color='hsl(${hueD} 88% 64% / 0.52)' />
        <stop offset='100%' stop-color='hsl(${hueD} 88% 64% / 0)' />
      </radialGradient>
      <radialGradient id='glowB' cx='80%' cy='78%' r='60%'>
        <stop offset='0%' stop-color='hsl(${hueB} 95% 70% / 0.38)' />
        <stop offset='100%' stop-color='hsl(${hueB} 95% 70% / 0)' />
      </radialGradient>
      <pattern id='grid' width='96' height='96' patternUnits='userSpaceOnUse' patternTransform='rotate(${seed % 30})'>
        <path d='M0 48 L96 48 M48 0 L48 96' stroke='hsl(0 0% 100% / 0.08)' stroke-width='1.2' />
      </pattern>
    </defs>
    <rect width='1920' height='1080' fill='url(#bg)' />
    <rect width='1920' height='1080' fill='url(#grid)' />
    <circle cx='380' cy='210' r='420' fill='url(#glowA)' />
    <circle cx='1510' cy='860' r='500' fill='url(#glowB)' />
    <g opacity='0.18' stroke='hsl(0 0% 100% / 0.35)' fill='none'>
      <path d='M-120 950 C260 760, 470 1120, 910 900 S1600 700, 2020 920' stroke-width='7' />
      <path d='M-140 820 C230 620, 520 980, 980 760 S1680 580, 2050 760' stroke-width='4' />
    </g>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

/** Get hero image for a term slug – always unique and never shared generic fallback. */
export function getGlossaryHero(slug: string): string {
  const normalizedSlug = slug.trim().toLowerCase();

  if (mergedGlossaryHeroes[normalizedSlug]) {
    return mergedGlossaryHeroes[normalizedSlug];
  }

  const fromCache = generatedFallbackCache.get(normalizedSlug);
  if (fromCache) return fromCache;

  const generatedFallback = createUniqueGlossaryFallback(normalizedSlug);
  generatedFallbackCache.set(normalizedSlug, generatedFallback);
  return generatedFallback;
}

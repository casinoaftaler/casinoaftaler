import { SITE_URL } from "@/lib/seo";
import { getCategoryLabel } from "@/lib/newsCategoryLabels";

export const NEWS_DEFAULT_CATEGORY = "alle";
export const NEWS_NOINDEX_THRESHOLD = 4;

export const SLOT_DEFAULT_PROVIDER = "all";
export const SLOT_DEFAULT_VOLATILITY = "all";
export const SLOT_DEFAULT_SORT = "bonus_count" as const;
export const SLOT_NOINDEX_THRESHOLD = 4;
export const SLOT_SORT_OPTIONS = ["bonus_count", "highest_x", "rtp"] as const;
export const SLOT_VOLATILITY_OPTIONS = ["all", "low", "medium", "high", "extreme"] as const;

export type SlotSort = (typeof SLOT_SORT_OPTIONS)[number];

export interface NewsHubState {
  category: string;
  page: number;
}

export interface SlotHubState {
  q: string;
  provider: string;
  volatility: string;
  sort: SlotSort;
  page: number;
}

interface HubSeoResult {
  canonicalUrl: string;
  description: string;
  noindex: boolean;
  title: string;
}

function buildPathWithParams(path: string, params: URLSearchParams): string {
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

function normalizeCategoryLabel(category: string): string {
  if (category === NEWS_DEFAULT_CATEGORY) return "Casino Nyheder";
  const label = getCategoryLabel(category);
  return label === category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : label;
}

export function normalizePositivePage(value: string | null, fallback = 1): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function buildNewsHubSearchParams(state: NewsHubState): URLSearchParams {
  const params = new URLSearchParams();

  if (state.category !== NEWS_DEFAULT_CATEGORY) {
    params.set("kategori", state.category);
  }

  if (state.page > 1) {
    params.set("side", String(state.page));
  }

  return params;
}

export function buildNewsHubPath(state: NewsHubState): string {
  return buildPathWithParams("/casino-nyheder", buildNewsHubSearchParams(state));
}

export function getNewsHubSeo(state: NewsHubState): HubSeoResult {
  const categoryLabel = normalizeCategoryLabel(state.category);
  const isFiltered = state.category !== NEWS_DEFAULT_CATEGORY;
  const noindex = isFiltered || state.page >= NEWS_NOINDEX_THRESHOLD;
  const canonicalUrl = `${SITE_URL}${buildNewsHubPath(state)}`;

  if (!isFiltered && state.page === 1) {
    return {
      canonicalUrl,
      description: "Seneste casino nyheder om bonusser, licenser, betalingsmetoder og markedet i Danmark. Redaktionelle analyser uden clickbait.",
      noindex,
      title: "Casino Nyheder – Licens, bonus & marked",
    };
  }

  const title = isFiltered
    ? `${categoryLabel} – Casino Nyheder`
    : `Casino Nyheder – Side ${state.page}`;

  const description = isFiltered
    ? `Seneste ${categoryLabel.toLowerCase()} fra det danske casinomarked med redaktionelle analyser, licensnyt og konkrete spillerkonsekvenser.`
    : `Side ${state.page} i vores casino nyheder med seneste opdateringer om bonusser, licenser, betalingsmetoder og markedsbevægelser.`;

  return {
    canonicalUrl,
    description,
    noindex,
    title,
  };
}

export function buildSlotDatabaseSearchParams(state: SlotHubState): URLSearchParams {
  const params = new URLSearchParams();

  const query = state.q.trim();
  if (query) {
    params.set("q", query);
  }

  if (state.provider !== SLOT_DEFAULT_PROVIDER) {
    params.set("provider", state.provider);
  }

  if (state.volatility !== SLOT_DEFAULT_VOLATILITY) {
    params.set("volatility", state.volatility);
  }

  if (state.sort !== SLOT_DEFAULT_SORT) {
    params.set("sort", state.sort);
  }

  if (state.page > 1) {
    params.set("side", String(state.page));
  }

  return params;
}

export function buildSlotDatabasePath(state: SlotHubState): string {
  return buildPathWithParams("/slot-database", buildSlotDatabaseSearchParams(state));
}

export function getSlotDatabaseSeo(state: SlotHubState, slotCountLabel: string): HubSeoResult {
  const hasSearch = state.q.trim().length > 0;
  const hasProviderFilter = state.provider !== SLOT_DEFAULT_PROVIDER;
  const hasVolatilityFilter = state.volatility !== SLOT_DEFAULT_VOLATILITY;
  const hasSortOverride = state.sort !== SLOT_DEFAULT_SORT;
  const hasActiveFilters = hasSearch || hasProviderFilter || hasVolatilityFilter || hasSortOverride;
  const noindex = hasActiveFilters || state.page >= SLOT_NOINDEX_THRESHOLD;
  const canonicalUrl = `${SITE_URL}${buildSlotDatabasePath(state)}`;

  if (!hasActiveFilters && state.page === 1) {
    return {
      canonicalUrl,
      description: `Søg i ${slotCountLabel} spillemaskiner med RTP, volatilitet, højeste X og community-data fra live bonus hunts. Find slots og udbydere hurtigere.`,
      noindex,
      title: `Slot Database – ${slotCountLabel} slots med RTP-data`,
    };
  }

  const title = hasActiveFilters
    ? "Slot Database – Filtrerede slots & data"
    : `Slot Database – Side ${state.page}`;

  const description = hasActiveFilters
    ? "Filtreret visning af spillemaskiner med RTP, volatilitet, providers og community-data. Brug siden som researchværktøj til slot-sammenligning."
    : `Side ${state.page} i vores slot database med community-data, RTP, volatilitet og højeste gevinster på tværs af kataloget.`;

  return {
    canonicalUrl,
    description,
    noindex,
    title,
  };
}

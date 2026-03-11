import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, Newspaper } from "lucide-react";

/**
 * Maps money-page paths to news categories/tags for contextual matching.
 */
const PAGE_CATEGORY_MAP: Record<string, { categories: string[]; tags: string[]; label: string }> = {
  // Betalingsmetoder
  "/betalingsmetoder": { categories: ["betalingsmetoder"], tags: ["betaling", "trustly", "mobilepay"], label: "betalingsmetoder" },
  "/betalingsmetoder/trustly": { categories: ["betalingsmetoder"], tags: ["trustly", "open banking"], label: "Trustly" },
  "/betalingsmetoder/mobilepay": { categories: ["betalingsmetoder"], tags: ["mobilepay"], label: "MobilePay" },
  "/betalingsmetoder/paypal": { categories: ["betalingsmetoder"], tags: ["paypal"], label: "PayPal" },
  "/betalingsmetoder/skrill": { categories: ["betalingsmetoder"], tags: ["skrill"], label: "Skrill" },
  "/betalingsmetoder/visa-mastercard": { categories: ["betalingsmetoder"], tags: ["visa", "mastercard", "kort"], label: "kortbetaling" },
  // Regulering & licenser
  "/casino-licenser": { categories: ["licenser", "regulering"], tags: ["licens", "spillemyndigheden"], label: "danske casino-licenser" },
  "/spillemyndigheden": { categories: ["regulering", "licenser"], tags: ["spillemyndigheden", "tilsyn"], label: "Spillemyndigheden" },
  // Ansvarligt spil
  "/ansvarligt-spil": { categories: ["regulering", "juridisk"], tags: ["ansvarligt spil", "rofus"], label: "ansvarligt spil" },
  "/ansvarligt-spil/ludomani": { categories: ["regulering", "juridisk"], tags: ["ludomani", "spilafhængighed"], label: "ludomani" },
  "/ansvarligt-spil/rofus": { categories: ["regulering", "juridisk"], tags: ["rofus", "selvudelukkelse"], label: "ROFUS" },
  "/ansvarligt-spil/stopspillet": { categories: ["regulering", "juridisk"], tags: ["stopspillet", "hjælpelinje"], label: "StopSpillet" },
  "/ansvarligt-spil/spillegraenser": { categories: ["regulering"], tags: ["spillegrænser", "ansvarligt spil"], label: "spillegrænser" },
  "/ansvarligt-spil/hjaelpelinjer": { categories: ["regulering", "juridisk"], tags: ["hjælpelinje", "ludomani"], label: "hjælpelinjer" },
  "/ansvarligt-spil/selvudelukkelse-guide": { categories: ["regulering", "juridisk"], tags: ["selvudelukkelse", "rofus"], label: "selvudelukkelse" },
  // Nye casinoer
  "/nye-casinoer": { categories: ["nye-casinoer"], tags: ["nyt casino", "lancering"], label: "nye casinoer" },
  "/nye-casinoer/mitid": { categories: ["nye-casinoer", "regulering"], tags: ["mitid", "verifikation"], label: "MitID casinoer" },
  "/nye-casinoer/2026": { categories: ["nye-casinoer"], tags: ["nyt casino", "2026"], label: "nye casinoer 2026" },
  "/nye-casinoer/bedste": { categories: ["nye-casinoer"], tags: ["bedste", "nyt casino"], label: "bedste nye casinoer" },
  "/nye-casinoer/dansk-licens": { categories: ["nye-casinoer", "licenser"], tags: ["dansk licens", "nyt casino"], label: "nye casinoer med dansk licens" },
  "/nye-casinoer/hurtig-udbetaling": { categories: ["nye-casinoer"], tags: ["hurtig udbetaling", "payout"], label: "hurtige udbetalinger" },
  "/nye-casinoer/trustly": { categories: ["nye-casinoer", "betalingsmetoder"], tags: ["trustly", "nyt casino"], label: "Trustly casinoer" },
  "/nye-casinoer/lav-wagering": { categories: ["nye-casinoer"], tags: ["wagering", "omsætningskrav"], label: "lav wagering" },
  "/nye-casinoer/bonus-uden-indbetaling": { categories: ["nye-casinoer"], tags: ["bonus", "ingen indbetaling"], label: "bonus uden indbetaling" },
  "/nye-casinoer/uden-rofus": { categories: ["regulering"], tags: ["rofus", "uden licens"], label: "casinoer uden ROFUS" },
  "/nye-casinoer/vs-etablerede": { categories: ["nye-casinoer", "markedsbevægelser"], tags: ["nyt casino"], label: "nye vs. etablerede casinoer" },
  // Bonus-guides
  "/casino-bonus": { categories: ["nye-casinoer", "regulering"], tags: ["bonus", "velkomstbonus"], label: "casino-bonusser" },
  "/bonus-uden-omsaetningskrav": { categories: ["nye-casinoer", "regulering"], tags: ["bonus", "omsætningsfri"], label: "bonus uden omsætningskrav" },
  "/bonus-uden-indbetaling": { categories: ["nye-casinoer"], tags: ["bonus", "ingen indbetaling"], label: "bonus uden indbetaling" },
  "/cashback-bonus": { categories: ["nye-casinoer"], tags: ["cashback", "bonus"], label: "cashback bonus" },
  "/reload-bonus": { categories: ["nye-casinoer"], tags: ["reload", "bonus"], label: "reload bonus" },
  "/sticky-bonus": { categories: ["nye-casinoer", "regulering"], tags: ["sticky bonus", "bonustyper"], label: "sticky bonus" },
  "/no-sticky-bonus": { categories: ["nye-casinoer", "regulering"], tags: ["no-sticky", "bonustyper"], label: "no-sticky bonus" },
  "/indskudsbonus": { categories: ["nye-casinoer"], tags: ["indskudsbonus", "velkomstbonus"], label: "indskudsbonus" },
  "/omsaetningskrav": { categories: ["regulering"], tags: ["omsætningskrav", "wagering"], label: "omsætningskrav" },
  "/velkomstbonus": { categories: ["nye-casinoer"], tags: ["velkomstbonus", "bonus"], label: "velkomstbonus" },
  // Casino anmeldelser (fallback for all review pages)
  "/casino-anmeldelser": { categories: ["nye-casinoer", "markedsbevægelser"], tags: [], label: "det danske casinomarked" },
  // Live casino
  "/live-casino": { categories: ["nye-casinoer"], tags: ["live casino", "evolution"], label: "live casino" },
  "/live-casino/blackjack": { categories: ["nye-casinoer"], tags: ["live casino", "blackjack"], label: "live blackjack" },
  "/live-casino/roulette": { categories: ["nye-casinoer"], tags: ["live casino", "roulette"], label: "live roulette" },
  "/live-casino/baccarat": { categories: ["nye-casinoer"], tags: ["live casino", "baccarat"], label: "live baccarat" },
  "/live-casino/crazy-time": { categories: ["nye-casinoer"], tags: ["live casino", "game shows", "crazy time"], label: "Crazy Time" },
  "/live-casino/lightning-roulette": { categories: ["nye-casinoer"], tags: ["live casino", "lightning roulette"], label: "Lightning Roulette" },
  "/live-casino/monopoly-live": { categories: ["nye-casinoer"], tags: ["live casino", "game shows", "monopoly"], label: "Monopoly Live" },
  "/live-casino/dream-catcher": { categories: ["nye-casinoer"], tags: ["live casino", "game shows"], label: "Dream Catcher" },
  "/live-casino/deal-or-no-deal": { categories: ["nye-casinoer"], tags: ["live casino", "game shows"], label: "Deal or No Deal" },
  // Slot-guides
  "/megaways-slots": { categories: ["nye-casinoer"], tags: ["megaways", "spillemaskiner"], label: "Megaways slots" },
  "/jackpot-slots": { categories: ["nye-casinoer"], tags: ["jackpot", "spillemaskiner"], label: "jackpot slots" },
  "/bonus-buy-slots": { categories: ["nye-casinoer"], tags: ["bonus buy", "spillemaskiner"], label: "bonus buy slots" },
  // Casinospil cluster
  "/casinospil": { categories: ["nye-casinoer"], tags: ["casinospil", "blackjack", "roulette"], label: "casinospil" },
  "/casinospil/blackjack": { categories: ["nye-casinoer"], tags: ["blackjack", "casinospil"], label: "blackjack" },
  "/casinospil/roulette": { categories: ["nye-casinoer"], tags: ["roulette", "casinospil"], label: "roulette" },
  "/casinospil/poker": { categories: ["nye-casinoer"], tags: ["poker", "casinospil"], label: "poker" },
  "/casinospil/baccarat": { categories: ["nye-casinoer"], tags: ["baccarat", "casinospil"], label: "baccarat" },
  "/casinospil/craps": { categories: ["nye-casinoer"], tags: ["craps", "casinospil"], label: "craps" },
  "/casinospil/game-shows": { categories: ["nye-casinoer"], tags: ["game shows", "live casino"], label: "game shows" },
  "/casinospil/online-lotteri": { categories: ["nye-casinoer"], tags: ["lotteri", "casinospil"], label: "online lotteri" },
  // Casinoer cluster
  "/casinoer": { categories: ["nye-casinoer", "markedsbevægelser"], tags: ["casino", "online casino"], label: "online casinoer" },
  // Standalone money-pages
  "/free-spins": { categories: ["nye-casinoer"], tags: ["free spins", "bonus"], label: "free spins" },
  "/free-spins-i-dag": { categories: ["nye-casinoer"], tags: ["free spins", "daglige tilbud"], label: "free spins i dag" },
  "/spiludviklere": { categories: ["nye-casinoer"], tags: ["spiludviklere", "provider"], label: "spiludviklere" },
  "/vip-program": { categories: ["nye-casinoer"], tags: ["vip", "loyalitet"], label: "VIP-programmer" },
  "/casino-med-mobilepay": { categories: ["betalingsmetoder"], tags: ["mobilepay", "betaling"], label: "casino med MobilePay" },
  "/casino-app": { categories: ["nye-casinoer"], tags: ["casino app", "mobil"], label: "casino apps" },
  "/statistik": { categories: ["nye-casinoer", "markedsbevægelser"], tags: ["statistik", "data"], label: "casinostatistik" },
};

function useNewsByCategory(categories: string[], tags: string[], limit = 3) {
  return useQuery({
    queryKey: ["news-by-category", categories, tags, limit],
    queryFn: async () => {
      // Phase 1: category + tag match with cornerstone priority
      let query = supabase
        .from("casino_news")
        .select("id, title, slug, published_at, category, is_cornerstone")
        .eq("status", "published")
        .order("is_cornerstone", { ascending: false })
        .order("published_at", { ascending: false })
        .limit(limit + 3); // fetch extras to filter

      if (categories.length === 1) {
        query = query.eq("category", categories[0]);
      } else if (categories.length > 1) {
        query = query.in("category", categories);
      }

      const { data: catData, error: catErr } = await query;
      if (catErr) throw catErr;

      let results = catData ?? [];

      // Phase 2: if tags exist and not enough results, try tag overlap
      if (results.length < limit && tags.length > 0) {
        const existingIds = results.map((r) => r.id);
        const { data: tagData } = await supabase
          .from("casino_news")
          .select("id, title, slug, published_at, category, is_cornerstone")
          .eq("status", "published")
          .overlaps("tags", tags)
          .not("id", "in", `(${existingIds.map((id) => `"${id}"`).join(",")})`)
          .order("is_cornerstone", { ascending: false })
          .order("published_at", { ascending: false })
          .limit(limit - results.length);

        if (tagData) results = [...results, ...tagData];
      }

      if (results.length >= limit) return results.slice(0, limit);

      // Phase 3: fallback to latest
      const existingIds = results.map((d) => d.id);
      if (existingIds.length === 0) {
        const { data: fallback } = await supabase
          .from("casino_news")
          .select("id, title, slug, published_at, category, is_cornerstone")
          .eq("status", "published")
          .order("is_cornerstone", { ascending: false })
          .order("published_at", { ascending: false })
          .limit(limit);
        return fallback ?? [];
      }

      const { data: fallback } = await supabase
        .from("casino_news")
        .select("id, title, slug, published_at, category, is_cornerstone")
        .eq("status", "published")
        .not("id", "in", `(${existingIds.map((id) => `"${id}"`).join(",")})`)
        .order("is_cornerstone", { ascending: false })
        .order("published_at", { ascending: false })
        .limit(limit - results.length);

      return [...results, ...(fallback ?? [])].slice(0, limit);
    },
    staleTime: 5 * 60 * 1000,
    enabled: categories.length > 0,
  });
}

interface LatestNewsByCategoryProps {
  /** Current money page path, e.g. "/betalingsmetoder/trustly" */
  pagePath: string;
}

/**
 * Contextual news section for money pages.
 * Shows 2-3 relevant news articles matched by category/tags.
 * Cornerstone articles are prioritized first.
 */
export function LatestNewsByCategory({ pagePath }: LatestNewsByCategoryProps) {
  // Direct match first, then prefix match for review/comparison/cluster pages
  const mapping = PAGE_CATEGORY_MAP[pagePath]
    ?? (pagePath.startsWith("/casino-anmeldelser/") ? PAGE_CATEGORY_MAP["/casino-anmeldelser"] : undefined)
    ?? (pagePath.startsWith("/casinospil/spillemaskiner/") ? { categories: ["nye-casinoer"], tags: ["spillemaskiner", "slots"], label: "spillemaskiner" } : undefined)
    ?? (pagePath.startsWith("/casinospil/blackjack/") ? PAGE_CATEGORY_MAP["/casinospil/blackjack"] : undefined)
    ?? (pagePath.startsWith("/casinospil/roulette/") ? PAGE_CATEGORY_MAP["/casinospil/roulette"] : undefined)
    ?? (pagePath.startsWith("/casinospil/poker/") ? PAGE_CATEGORY_MAP["/casinospil/poker"] : undefined)
    ?? (pagePath.startsWith("/casinospil/") ? PAGE_CATEGORY_MAP["/casinospil"] : undefined)
    ?? (pagePath.startsWith("/casinoer/") ? PAGE_CATEGORY_MAP["/casinoer"] : undefined)
    ?? (pagePath.startsWith("/nye-casinoer/") ? PAGE_CATEGORY_MAP["/nye-casinoer"] : undefined)
    ?? (pagePath.startsWith("/casino-anmeldelser/") ? PAGE_CATEGORY_MAP["/casino-anmeldelser"] : undefined);
  
  const categories = mapping?.categories ?? ["regulering"];
  const label = mapping?.label ?? "det danske casinomarked";
  const tags = mapping?.tags ?? [];

  const { data: articles } = useNewsByCategory(categories, tags, 3);

  if (!articles || articles.length === 0) return null;

  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <Newspaper className="h-5 w-5 text-primary" />
        Seneste opdateringer om {label}
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Hold dig opdateret med de nyeste nyheder og analyser relateret til {label} på danske online casinoer.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/casino-nyheder/${article.slug}`}
            className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
          >
            <span className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
              <CalendarDays className="h-3 w-3" />
              {article.published_at &&
                new Date(article.published_at).toLocaleDateString("da-DK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
            </span>
            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

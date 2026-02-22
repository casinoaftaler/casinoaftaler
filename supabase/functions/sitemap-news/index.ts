import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL = "https://casinoaftaler.dk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/**
 * Static SEO routes — mirrors src/lib/seoRoutes.ts.
 * The casino-nyheder hub entry is handled dynamically below
 * so its lastmod reflects the latest published article.
 */
const staticRoutes: Array<{
  path: string;
  changefreq: string;
  priority: number;
  lastmod: string;
}> = [
  { path: "/", changefreq: "daily", priority: 1.0, lastmod: "2026-02-16" },
  { path: "/casino-anmeldelser", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/nye-casinoer", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/2026", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-17" },
  { path: "/nye-casinoer/dansk-licens", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/uden-rofus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/hurtig-udbetaling", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/bonus-uden-indbetaling", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/trustly", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/mitid", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/lav-wagering", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/bedste", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/vs-etablerede", changefreq: "monthly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/top-10-casino-online", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-13" },
  { path: "/casino-anmeldelser/spilleautomaten", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casino-anmeldelser/campobet", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casino-anmeldelser/betinia", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casino-anmeldelser/swift-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casino-anmeldelser/luna-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casino-anmeldelser/spildansknu", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casino-anmeldelser/danske-spil", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/comeon", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/getlucky", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/mr-green", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/videoslots", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/mr-vegas", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/leovegas", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/expekt", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/betano", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-17" },
  { path: "/casino-anmeldelser/888-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/unibet", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/bet365", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-17" },
  { path: "/casino-anmeldelser/royal-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/maria-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/kapow-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/nordicbet", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/one-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/spilnu", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/stake-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/casinostuen", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-17" },
  { path: "/casino-anmeldelser/pokerstars", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-17" },
  { path: "/casino-anmeldelser/bwin", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/marathonbet", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/live-casino", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-18" },
  { path: "/live-casino/blackjack", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/live-casino/roulette", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/live-casino/baccarat", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/live-casino/lightning-roulette", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/live-casino/monopoly-live", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner", changefreq: "daily", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/hoej-rtp", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/bonus-buys", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/casinospil/spillemaskiner/sweet-bonanza", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/book-of-dead", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/gates-of-olympus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/starburst", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/razor-shark", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/big-bass-bonanza", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/dead-or-alive-2", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/gonzos-quest", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/reactoonz", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/money-train-3", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/wolf-gold", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/the-dog-house", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/jammin-jars", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/bonanza", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/fire-joker", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/legacy-of-dead", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/divine-fortune", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/eye-of-horus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/buffalo-king", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/sugar-rush", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/cleopatra", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/mega-moolah", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/thunderstruck-ii", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/immortal-romance", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/wild-west-gold", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/madame-destiny-megaways", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/extra-chilli-megaways", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/wanted-dead-or-a-wild", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/chaos-crew", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/joker-strike", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/blackjack", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/roulette", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/poker", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/craps", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/baccarat", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/roulette-strategi", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/online-lotteri", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/game-shows", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casino-bonus", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-20" },
  { path: "/velkomstbonus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/free-spins", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/indskudsbonus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/omsaetningskrav", changefreq: "monthly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/bonus-uden-indbetaling", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/bonus-uden-omsaetningskrav", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/no-sticky-bonus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/sticky-bonus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/spiludviklere", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/netent", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/pragmatic-play", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/relax-gaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/play-n-go", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/hacksaw-gaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/nolimit-city", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/yggdrasil", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/microgaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/red-tiger", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/big-time-gaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/elk-studios", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/evolution-gaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/apple-pay", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/mobilepay", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/paypal", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/skrill", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/trustly", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/zimpler", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/paysafecard", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/bankoverforsler", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/visa-mastercard", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/revolut", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/casinoer", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-20" },
  { path: "/casinoer/hurtig-udbetaling", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casinoer/hoej-rtp", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casinoer/crypto-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/licenserede-casinoer", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-licenser", changefreq: "monthly", priority: 0.8, lastmod: "2026-02-17" },
  { path: "/casinoer/vr-casinoer", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casinoer/mobil-casinoer", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casinoer/spil-casino-for-sjov", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casinoer/casino-og-skat", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  // casino-nyheder hub — handled dynamically below
  { path: "/community", changefreq: "daily", priority: 0.6, lastmod: "2026-02-20" },
  { path: "/community/slots", changefreq: "daily", priority: 0.6, lastmod: "2026-02-20" },
  { path: "/highlights", changefreq: "daily", priority: 0.6, lastmod: "2026-02-20" },
  { path: "/ansvarligt-spil", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-14" },
  { path: "/spillemyndigheden", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-14" },
  { path: "/om", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-11" },
  { path: "/forretningsmodel", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-15" },
  { path: "/redaktionel-politik", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-15" },
  { path: "/kontakt", changefreq: "monthly", priority: 0.5, lastmod: "2026-02-11" },
  { path: "/forfatter/jonas", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-20" },
  { path: "/forfatter/kevin", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-17" },
  { path: "/saadan-tester-vi-casinoer", changefreq: "monthly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-compliance", changefreq: "daily", priority: 0.7, lastmod: "2026-02-20" },
];

function toDate(ts: string): string {
  return new Date(ts).toISOString().split("T")[0];
}

function urlEntry(loc: string, lastmod: string, changefreq: string, priority: number): string {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // ── Fetch published news articles ──
    const { data: articles, error } = await supabase
      .from("casino_news")
      .select("slug, updated_at, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) throw error;

    // ── Fetch casino updated_at for dynamic lastmod on review pages ──
    const { data: casinos, error: casinoErr } = await supabase
      .from("casinos")
      .select("slug, updated_at")
      .eq("is_active", true);

    if (casinoErr) throw casinoErr;

    // ── Fetch compliance last_checked for /casino-compliance lastmod ──
    const { data: complianceRows } = await supabase
      .from("casino_compliance")
      .select("last_checked")
      .order("last_checked", { ascending: false })
      .limit(1);

    const complianceLastmod = complianceRows?.[0]
      ? toDate(complianceRows[0].last_checked)
      : undefined;

    // Build a lookup: slug → lastmod date
    const casinoLastmod: Record<string, string> = {};
    for (const c of casinos || []) {
      casinoLastmod[c.slug] = toDate(c.updated_at);
    }

    // ── Determine dynamic lastmod for casino-nyheder hub ──
    const latestNewsUpdate = (articles && articles.length > 0)
      ? articles.reduce((latest, a) => {
          const d = new Date(a.updated_at);
          return d > latest ? d : latest;
        }, new Date(0))
      : new Date();
    const hubLastmod = toDate(latestNewsUpdate.toISOString());

    // ── Build URL entries ──
    const urls: string[] = [];

    // 1. Static routes (with dynamic casino lastmod override)
    for (const route of staticRoutes) {
      let lastmod = route.lastmod;

      // Override lastmod for casino review pages with DB updated_at
      const reviewMatch = route.path.match(/^\/casino-anmeldelser\/(.+)$/);
      if (reviewMatch && casinoLastmod[reviewMatch[1]]) {
        lastmod = casinoLastmod[reviewMatch[1]];
      }

      // Override lastmod for /casino-compliance with latest compliance check
      if (route.path === "/casino-compliance" && complianceLastmod) {
        lastmod = complianceLastmod;
      }

      const loc = route.path === "/" ? SITE_URL + "/" : SITE_URL + route.path;
      urls.push(urlEntry(loc, lastmod, route.changefreq, route.priority));
    }

    // 2. Casino Nyheder hub (dynamic lastmod)
    urls.push(urlEntry(
      `${SITE_URL}/casino-nyheder`,
      hubLastmod,
      "daily",
      0.9
    ));

    // 3. Individual news articles (dynamic)
    for (const article of articles || []) {
      const lastmod = toDate(article.updated_at);
      urls.push(urlEntry(
        `${SITE_URL}/casino-nyheder/${article.slug}`,
        lastmod,
        "weekly",
        0.8
      ));
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("Sitemap generation error:", err);
    return new Response("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
});

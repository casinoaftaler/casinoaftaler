import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ─── Discovery search queries (used with Firecrawl Search API) ───
const DISCOVERY_QUERIES = [
  "free spins i dag danske casinoer 2026",
  "daglige free spins eksisterende spillere Danmark",
  "gratis spins uden indbetaling dansk casino",
  "casino kampagne free spins marts 2026",
];

const OFFER_SIGNAL_REGEX = /free\s*spin|gratis\s*spin|cash\s*spin|bonus\s*spin|kampagne|promotion|promo|bonuskode/i;

// ─── Casino name → slug mapping ───
const CASINO_NAME_MAP: Record<string, string> = {
  "royal casino": "royal-casino", "royalcasino": "royal-casino",
  "kapow casino": "kapow-casino", "kapow": "kapow-casino", "kapowcasino": "kapow-casino",
  "leovegas": "leovegas", "leo vegas": "leovegas",
  "mr green": "mr-green", "mr. green": "mr-green", "mrgreen": "mr-green",
  "comeon": "comeon", "come on": "comeon",
  "bet365": "bet365", "bet365 casino": "bet365",
  "unibet": "unibet", "unibet casino": "unibet",
  "888 casino": "888-casino", "888casino": "888-casino",
  "betano": "betano", "betano casino": "betano",
  "expekt": "expekt", "spilnu": "spilnu", "spilnu.dk": "spilnu",
  "casinostuen": "casinostuen",
  "onecasino": "onecasino", "one casino": "onecasino",
  "nordicbet": "nordicbet", "nordic bet": "nordicbet",
  "videoslots": "videoslots",
  "pokerstars": "pokerstars", "pokerstars casino": "pokerstars",
  "mr vegas": "mr-vegas", "stake": "stake",
  "tivoli casino": "tivoli-casino", "casino copenhagen": "casino-copenhagen",
  "jackpotbet": "jackpotbet", "jackpot bet": "jackpotbet",
  "vbet": "vbet", "v bet": "vbet",
  "vindercasino": "vindercasino", "vinder casino": "vindercasino",
  "spilleautomaten": "spilleautomaten", "spilleautomaten.dk": "spilleautomaten",
  "danske spil": "danske-spil", "danskespil": "danske-spil",
  "maria casino": "maria-casino", "mariacasino": "maria-casino",
  "spildansknu": "spildansknu", "spil dansk nu": "spildansknu",
};

interface CasinoRow {
  id: string; name: string; slug: string;
  affiliate_url: string | null; logo_url: string | null; website_url: string | null;
}

// ─── Structured campaign data (LLM output schema) ───
interface StructuredCampaign {
  casino_name: string;
  casino_slug: string;
  title: string;
  free_spins: number;
  spin_value: number | null;
  wagering_requirement: number | null;
  deposit_required: boolean;
  deposit_amount: number | null;
  eligible_players: "new" | "existing" | "all";
  game_name: string | null;
  expiry_date: string | null;
  campaign_type: "welcome" | "no_deposit" | "daily" | "weekly" | "weekend" | "vip" | "existing" | "other";
  summary: string;
  full_terms_clean: string;
}

// ─── Validation ───
function validateCampaign(c: any): c is StructuredCampaign {
  if (!c || typeof c !== "object") return false;
  if (typeof c.free_spins !== "number" || c.free_spins <= 0 || c.free_spins > 1000) return false;
  if (!["new", "existing", "all"].includes(c.eligible_players)) return false;
  if (!["welcome", "no_deposit", "daily", "weekly", "weekend", "vip", "existing", "other"].includes(c.campaign_type)) return false;
  if (typeof c.title !== "string" || !c.title) return false;
  if (typeof c.summary !== "string" || !c.summary) return false;
  if (hasArtifacts(c.title) || hasArtifacts(c.summary) || hasArtifacts(c.full_terms_clean)) return false;
  return true;
}

function hasArtifacts(text: string | null): boolean {
  if (!text) return false;
  return /(\*{2,}|<br|<\/|&nbsp;|&amp;|&lt;|&gt;|\|\s*\||\#{2,})/.test(text);
}

function calculateConfidence(c: StructuredCampaign): number {
  let score = 0;
  if (c.free_spins > 0) score += 30;
  if (c.expiry_date) score += 20;
  if (c.deposit_required !== undefined) score += 20;
  if (c.wagering_requirement !== null) score += 10;
  if (c.game_name) score += 10;
  if (c.eligible_players !== "all") score += 10;
  if (hasArtifacts(c.summary) || hasArtifacts(c.full_terms_clean)) score -= 50;
  return Math.max(0, Math.min(100, score));
}

function calculateScore(c: StructuredCampaign): number {
  let score = c.free_spins;
  if (c.wagering_requirement !== null) score -= c.wagering_requirement * 2;
  if (!c.deposit_required) score += 50;
  if (c.eligible_players === "existing" || c.eligible_players === "all") score += 10;
  return score;
}

function resolveSlug(name: string): string | null {
  const lower = name.toLowerCase().trim();
  if (CASINO_NAME_MAP[lower]) return CASINO_NAME_MAP[lower];
  for (const [key, slug] of Object.entries(CASINO_NAME_MAP)) {
    if (lower.includes(key) || key.includes(lower)) return slug;
  }
  return null;
}

function generateDedupKey(casinoSlug: string, title: string): string {
  const normalized = title.toLowerCase().replace(/[^a-zæøå0-9]/g, "").substring(0, 60);
  return `${casinoSlug}:${normalized}`;
}

function fuzzyMatch(a: string, b: string): number {
  const bigrams = (s: string) => {
    const set = new Set<string>();
    const lower = s.toLowerCase().replace(/[^a-zæøå0-9]/g, "");
    for (let i = 0; i < lower.length - 1; i++) set.add(lower.substring(i, i + 2));
    return set;
  };
  const setA = bigrams(a);
  const setB = bigrams(b);
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const bg of setA) if (setB.has(bg)) intersection++;
  return intersection / (setA.size + setB.size - intersection);
}

/** Sanitize text – strip ALL HTML, markdown, artifacts */
function sanitize(text: string): string {
  let s = text;
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<[^>]*>/g, "");
  s = s.replace(/&nbsp;/gi, " ");
  s = s.replace(/&amp;/gi, "&");
  s = s.replace(/&lt;/gi, "<");
  s = s.replace(/&gt;/gi, ">");
  s = s.replace(/&quot;/gi, '"');
  s = s.replace(/&#39;/gi, "'");
  s = s.replace(/^\s*#{1,6}\s+/gm, "");
  s = s.replace(/^[\s]*[-*]{3,}\s*$/gm, "");
  s = s.replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1");
  s = s.replace(/__([^_]+)__/g, "$1");
  s = s.replace(/\|/g, "");
  s = s.replace(/[^\S\n]+/g, " ");
  s = s.replace(/\n{3,}/g, "\n\n");
  s = s.split("\n").map(l => l.trim()).filter(l => l.length > 0).join("\n");
  return s.trim();
}

// ─── LLM-based structured extraction ───
async function extractStructuredOffers(
  rawText: string,
  sourceContext: string,
): Promise<StructuredCampaign[]> {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) {
    console.warn("LOVABLE_API_KEY not set, skipping LLM extraction");
    return [];
  }

  const systemPrompt = `You extract structured free spin campaign data from Danish casino websites or search results.
Return ONLY a JSON array of campaign objects. No markdown, no explanation.
Each object must have exactly these fields:
- casino_name: string (the casino brand name as commonly known)
- casino_slug: string (lowercase-hyphenated version of the name)
- title: string (max 120 chars, clean Danish text, no HTML/markdown)
- free_spins: number (1-1000)
- spin_value: number|null (DKK per spin)
- wagering_requirement: number|null (e.g. 10 for 10x)
- deposit_required: boolean
- deposit_amount: number|null (DKK)
- eligible_players: "new"|"existing"|"all"
- game_name: string|null
- expiry_date: string|null (ISO 8601 format)
- campaign_type: "welcome"|"no_deposit"|"daily"|"weekly"|"weekend"|"vip"|"existing"|"other"
- summary: string (max 160 chars, clean plain text description in Danish)
- full_terms_clean: string (all terms/conditions as clean plain text)

Rules:
- NEVER include HTML tags, markdown, asterisks, pipe characters
- Only extract offers that specifically mention free spins/gratis spins/chancer
- Ignore generic bonus offers that don't include free spins
- Only Danish-licensed casinos (.dk domain)
- If data is unclear, set to null
- Return empty array [] if no valid free spin offers found`;

  const userPrompt = `Extract all free spin campaigns from this content:\n\n${rawText.substring(0, 8000)}`;

  try {
    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.1,
      }),
    });

    if (!resp.ok) {
      console.error(`LLM error: ${resp.status}`);
      return [];
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content || "";
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];

    const parsed = JSON.parse(jsonMatch[0]) as any[];
    const results: StructuredCampaign[] = [];

    for (const item of parsed) {
      const campaign: StructuredCampaign = {
        casino_name: String(item.casino_name || ""),
        casino_slug: String(item.casino_slug || ""),
        title: String(item.title || "").substring(0, 120),
        free_spins: Number(item.free_spins) || 0,
        spin_value: item.spin_value != null ? Number(item.spin_value) : null,
        wagering_requirement: item.wagering_requirement != null ? Number(item.wagering_requirement) : null,
        deposit_required: Boolean(item.deposit_required),
        deposit_amount: item.deposit_amount != null ? Number(item.deposit_amount) : null,
        eligible_players: ["new", "existing", "all"].includes(item.eligible_players) ? item.eligible_players : "all",
        game_name: item.game_name ? String(item.game_name).substring(0, 80) : null,
        expiry_date: item.expiry_date || null,
        campaign_type: ["welcome", "no_deposit", "daily", "weekly", "weekend", "vip", "existing", "other"].includes(item.campaign_type) ? item.campaign_type : "other",
        summary: sanitize(String(item.summary || "")).substring(0, 160),
        full_terms_clean: sanitize(String(item.full_terms_clean || "")),
      };

      // Resolve slug from our known map
      const resolvedSlug = resolveSlug(campaign.casino_name);
      if (resolvedSlug) campaign.casino_slug = resolvedSlug;

      if (validateCampaign(campaign)) {
        results.push(campaign);
      }
    }

    return results;
  } catch (e) {
    console.error("LLM extraction failed:", e);
    return [];
  }
}

// ─── Firecrawl Search API ───
async function searchForOffers(query: string, firecrawlKey: string): Promise<string> {
  try {
    console.log(`  Searching: "${query}"`);
    const resp = await fetch("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${firecrawlKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        limit: 5,
        lang: "da",
        country: "dk",
        tbs: "qdr:w", // Last week only – fresh results
        scrapeOptions: { formats: ["markdown"] },
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error(`  Search API error ${resp.status}: ${errText.substring(0, 200)}`);
      return "";
    }

    const data = await resp.json();
    if (!data?.success || !data?.data?.length) {
      console.log(`  Search returned 0 results`);
      return "";
    }

    // Combine all search result markdown
    const combined = data.data
      .filter((r: any) => r.markdown && r.markdown.length > 50)
      .map((r: any) => `--- Source: ${r.url} ---\n${r.markdown}`)
      .join("\n\n");

    console.log(`  Search got ${data.data.length} results, ${combined.length} chars total`);
    return combined;
  } catch (e) {
    console.error(`  Search exception: ${e}`);
    return "";
  }
}

// ─── MAIN HANDLER ───
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");

    if (!firecrawlKey) {
      return new Response(JSON.stringify({ error: "FIRECRAWL_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const admin = createClient(supabaseUrl, serviceRoleKey);

    // Load casinos
    const { data: casinos } = await admin
      .from("casinos")
      .select("id, name, slug, affiliate_url, logo_url, website_url")
      .eq("is_active", true);

    const casinoMap = new Map<string, CasinoRow>();
    for (const c of (casinos || []) as CasinoRow[]) {
      casinoMap.set(c.slug, c);
    }
    console.log(`Loaded ${casinoMap.size} casinos`);

    // ─── PHASE 1: Load baseline offers (source_type = 'manual' or 'baseline') ───
    // These are NEVER deleted by the scraper
    const { data: baselineOffers, error: baselineErr } = await admin
      .from("free_spin_campaigns")
      .select("dedup_key, casino_slug, title")
      .in("source_type", ["manual", "baseline"])
      .eq("is_active", true);

    const baselineDedupKeys = new Set(
      (baselineOffers || []).map((b: any) => b.dedup_key).filter(Boolean)
    );
    console.log(`Phase 1: ${baselineDedupKeys.size} baseline offers preserved`);

    // ─── PHASE 2: Search-based discovery via Firecrawl Search API ───
    console.log(`Phase 2: Search discovery (${DISCOVERY_QUERIES.length} queries)`);
    const allDiscovered: StructuredCampaign[] = [];
    const scrapeResults: { source: string; type: string; status: string; offers: number; error?: string }[] = [];

    const START_TIME = Date.now();
    const MAX_RUNTIME_MS = 240_000;
    function hasTimeLeft() { return (Date.now() - START_TIME) < MAX_RUNTIME_MS; }

    for (const query of DISCOVERY_QUERIES) {
      if (!hasTimeLeft()) break;

      try {
        const searchContent = await searchForOffers(query, firecrawlKey);
        if (!searchContent || searchContent.length < 100) {
          scrapeResults.push({ source: query, type: "search", status: "empty", offers: 0 });
          continue;
        }

        // Extract structured campaigns from combined search results
        const campaigns = await extractStructuredOffers(searchContent, query);
        allDiscovered.push(...campaigns);
        scrapeResults.push({ source: query, type: "search", status: campaigns.length > 0 ? "ok" : "no_offers", offers: campaigns.length });
        console.log(`  Query "${query}" → ${campaigns.length} campaigns`);
      } catch (e) {
        scrapeResults.push({ source: query, type: "search", status: "error", offers: 0, error: String(e) });
      }

      // Rate limit between queries
      if (hasTimeLeft()) await new Promise(r => setTimeout(r, 1500));
    }

    console.log(`Phase 2 done: ${allDiscovered.length} discovered campaigns`);

    // ─── Deduplicate discovered campaigns ───
    const bestPerDedup = new Map<string, StructuredCampaign>();
    for (const c of allDiscovered) {
      if (c.free_spins <= 0) continue;
      const key = generateDedupKey(c.casino_slug, c.title);

      // Skip if this matches a baseline offer
      if (baselineDedupKeys.has(key)) continue;

      // Check fuzzy match against baseline
      let matchesBaseline = false;
      for (const b of (baselineOffers || [])) {
        if (b.casino_slug === c.casino_slug && fuzzyMatch(c.title, b.title || "") > 0.8) {
          matchesBaseline = true;
          break;
        }
      }
      if (matchesBaseline) continue;

      // Deduplicate within discovered set
      let matchedKey: string | null = null;
      for (const [ek, ev] of bestPerDedup.entries()) {
        if (ev.casino_slug === c.casino_slug && fuzzyMatch(c.title, ev.title) > 0.85) {
          matchedKey = ek;
          break;
        }
      }
      const useKey = matchedKey || key;
      const existing = bestPerDedup.get(useKey);
      if (!existing || calculateScore(c) > calculateScore(existing)) {
        bestPerDedup.set(useKey, c);
      }
    }

    const unique = Array.from(bestPerDedup.values());
    console.log(`Unique new discoveries after dedup: ${unique.length}`);

    // ─── Build DB records for NEW discoveries only ───
    const now = new Date().toISOString();
    const dbRecords = unique
      .filter(c => c.free_spins > 0 && casinoMap.has(c.casino_slug))
      .map(c => {
        const casino = casinoMap.get(c.casino_slug)!;
        const confidence = calculateConfidence(c);
        return {
          casino_id: casino.id,
          casino_name: casino.name,
          casino_slug: c.casino_slug,
          title: c.title,
          description: c.summary,
          spin_count: c.free_spins,
          spin_value: c.spin_value ? `${c.spin_value} kr.` : null,
          wagering_requirement: c.wagering_requirement ? `${c.wagering_requirement}x` : null,
          min_deposit: c.deposit_amount ? `${c.deposit_amount} kr.` : null,
          deposit_amount: c.deposit_amount,
          requires_deposit: c.deposit_required,
          for_new_players: c.eligible_players === "new" || c.eligible_players === "all",
          for_existing_players: c.eligible_players === "existing" || c.eligible_players === "all",
          eligible_players: c.eligible_players,
          game_name: c.game_name,
          expiry_date: c.expiry_date,
          offer_type: c.campaign_type,
          campaign_type: c.campaign_type,
          summary: c.summary,
          full_terms_clean: c.full_terms_clean,
          short_terms_summary: c.summary,
          source_type: "discovered",
          source_url: null,
          casino_logo_url: casino.logo_url,
          affiliate_url: casino.affiliate_url,
          is_active: true,
          last_checked: now,
          last_verified_at: now,
          score: calculateScore(c),
          confidence_score: confidence,
          dedup_key: generateDedupKey(c.casino_slug, c.title),
          required_action: c.deposit_required && c.deposit_amount ? `Indbetal ${c.deposit_amount} kr.` : null,
          campaign_period_start: null,
          campaign_period_end: c.expiry_date,
        };
      });

    console.log(`New discovery records to insert: ${dbRecords.length}`);

    // ─── Delete ONLY previously discovered entries (preserve manual/baseline) ───
    const { error: deleteErr } = await admin
      .from("free_spin_campaigns")
      .delete()
      .in("source_type", ["scraped", "aggregator", "direct", "database", "discovered"]);

    if (deleteErr) console.error("Delete error:", deleteErr);

    // ─── Insert new discoveries ───
    if (dbRecords.length > 0) {
      const { error: insertError } = await admin.from("free_spin_campaigns").insert(dbRecords);
      if (insertError) {
        console.error("Insert error:", insertError);
      }
    }

    // ─── ALWAYS refresh baseline offers' last_checked timestamp ───
    const { error: touchErr } = await admin
      .from("free_spin_campaigns")
      .update({ last_checked: now, last_verified_at: now })
      .in("source_type", ["manual", "baseline"])
      .eq("is_active", true);

    if (touchErr) console.error("Baseline touch error:", touchErr);

    // ─── Sync legacy table ───
    await admin.from("daily_free_spins_offers").delete().eq("is_manually_added", false);

    // Get ALL active campaigns (baseline + new) for legacy sync
    const { data: allActive } = await admin
      .from("free_spin_campaigns")
      .select("casino_id, casino_name, casino_slug, title, summary, spin_count, min_deposit, wagering_requirement, offer_type")
      .eq("is_active", true);

    if (allActive && allActive.length > 0) {
      const legacy = allActive.map((c: any) => ({
        casino_id: c.casino_id,
        casino_name: c.casino_name,
        casino_slug: c.casino_slug,
        offer_title: c.title,
        offer_description: c.summary || "",
        free_spins_count: c.spin_count,
        min_deposit: c.min_deposit,
        wagering_requirement: c.wagering_requirement,
        valid_until: null,
        offer_type: c.offer_type || "other",
        is_active: true,
        is_manually_added: false,
        scraped_at: now,
        scrape_source_url: null,
      }));
      await admin.from("daily_free_spins_offers").insert(legacy);
    }

    // ─── Auto-expire campaigns with past expiry dates ───
    await admin.from("free_spin_campaigns")
      .update({ is_active: false })
      .lt("expiry_date", now)
      .eq("is_active", true);

    // ─── ALWAYS update page_metadata freshness (even with 0 new campaigns) ───
    await admin.from("page_metadata")
      .update({ updated_at: now })
      .in("path", ["/free-spins-i-dag", "/free-spins"]);

    console.log(`Freshness updated for /free-spins-i-dag and /free-spins`);

    const summary = {
      success: true,
      baseline_preserved: baselineDedupKeys.size,
      total_discovered: allDiscovered.length,
      unique_new: unique.length,
      inserted: dbRecords.length,
      total_active_after: (baselineDedupKeys.size + dbRecords.length),
      freshness_updated: true,
      scrape_results: scrapeResults,
    };

    console.log("Done:", JSON.stringify(summary, null, 2));
    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    // ─── Even on error, try to update freshness ───
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const admin = createClient(supabaseUrl, serviceRoleKey);
      await admin.from("page_metadata")
        .update({ updated_at: new Date().toISOString() })
        .in("path", ["/free-spins-i-dag", "/free-spins"]);
    } catch { /* best effort */ }

    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

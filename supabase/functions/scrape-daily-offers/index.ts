import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ─── Aggregator sources ───
const AGGREGATOR_URLS = [
  "https://d-bet.dk/casino/free-spins/",
  "https://slotsguiden.dk/free-spins-til-eksisterende-kunder/",
  "https://free-spins-i-dag.dk/",
  "https://slotsguiden.dk/free-spins/",
  "https://www.casinoonline.dk/freespin/",
];

// ─── Discovery search fallbacks (when direct/aggregator scraping is empty) ───
const DISCOVERY_QUERIES = [
  "free spins uden indbetaling danske casinoer",
  "daglige free spins danske casinoer",
  "gratis spins eksisterende spillere casino",
  "casino bonuskode free spins Danmark",
];

const OFFER_SIGNAL_REGEX = /free\s*spin|gratis\s*spin|cash\s*spin|bonus\s*spin|kampagne|promotion|promo|bonuskode/i;

// ─── Direct casino paths to crawl ───
const CASINO_PATHS = [
  "/kampagner",
  "/promotions",
  "/bonus",
  "/tilbud",
  "/bonusser",
  "/fri-spins",
  "/free-spins",
  "/velkomstbonus",
  "/",
];

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
  // Reject if artifacts remain
  if (hasArtifacts(c.title) || hasArtifacts(c.summary) || hasArtifacts(c.full_terms_clean)) return false;
  return true;
}

function hasArtifacts(text: string | null): boolean {
  if (!text) return false;
  return /(\*{2,}|<br|<\/|&nbsp;|&amp;|&lt;|&gt;|\|\s*\||\#{2,})/.test(text);
}

/** Calculate confidence score */
function calculateConfidence(c: StructuredCampaign): number {
  let score = 0;
  if (c.free_spins > 0) score += 30;            // structured field found
  if (c.expiry_date) score += 20;                // expiry parsed
  if (c.deposit_required !== undefined) score += 20; // deposit parsed
  if (c.wagering_requirement !== null) score += 10;  // wagering parsed
  if (c.game_name) score += 10;
  if (c.eligible_players !== "all") score += 10; // specific eligibility
  // Penalize if artifacts remain
  if (hasArtifacts(c.summary) || hasArtifacts(c.full_terms_clean)) score -= 50;
  return Math.max(0, Math.min(100, score));
}

/** Calculate ranking score */
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

// ─── LLM-based structured extraction ───
async function extractStructuredOffers(
  rawText: string,
  casinoName: string,
  casinoSlug: string,
  sourceType: "direct" | "aggregator",
): Promise<StructuredCampaign[]> {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) {
    console.warn("LOVABLE_API_KEY not set, falling back to regex extraction");
    return extractFallback(rawText, casinoName, casinoSlug);
  }

  const systemPrompt = `You extract structured free spin campaign data from Danish casino websites.
Return ONLY a JSON array of campaign objects. No markdown, no explanation.
Each object must have exactly these fields:
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
- summary: string (max 160 chars, clean plain text description)
- full_terms_clean: string (all terms/conditions as clean plain text, no HTML/markdown/asterisks)

Rules:
- NEVER include HTML tags, markdown, asterisks, pipe characters
- If data is unclear, set to null
- Only extract offers that mention free spins/gratis spins/chancer
- summary must be human-readable Danish text
- full_terms_clean must be clean readable text with line breaks (\\n) between sections`;

  const userPrompt = `Casino: ${casinoName} (slug: ${casinoSlug})
Source type: ${sourceType}

Extract all free spin campaigns from this text:

${rawText.substring(0, 6000)}`;

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
      return extractFallback(rawText, casinoName, casinoSlug);
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content || "";

    // Extract JSON array from response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.warn("LLM returned no JSON array");
      return extractFallback(rawText, casinoName, casinoSlug);
    }

    const parsed = JSON.parse(jsonMatch[0]) as any[];
    const results: StructuredCampaign[] = [];

    for (const item of parsed) {
      const campaign: StructuredCampaign = {
        casino_name: casinoName,
        casino_slug: casinoSlug,
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

      if (validateCampaign(campaign)) {
        results.push(campaign);
      } else {
        console.warn(`Rejected campaign: ${campaign.title} (validation failed)`);
      }
    }

    return results;
  } catch (e) {
    console.error("LLM extraction failed:", e);
    return extractFallback(rawText, casinoName, casinoSlug);
  }
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

// ─── Regex fallback (no LLM) ───
function extractFallback(rawText: string, casinoName: string, casinoSlug: string): StructuredCampaign[] {
  const results: StructuredCampaign[] = [];
  const sections = rawText.split(/(?=##?\s)/);

  for (const section of sections) {
    if (section.length < 50) continue;
    if (!/free\s*spin|gratis\s*spin|chancer|lykkehjul|bonus\s*spin/i.test(section)) continue;

    const spinCount = extractSpinCount(section);
    if (spinCount <= 0) continue;

    const lower = section.toLowerCase();
    let campaignType: StructuredCampaign["campaign_type"] = "welcome";
    let eligible: StructuredCampaign["eligible_players"] = "all";
    let depositRequired = true;

    if (/uden\s*indbetaling|no\s*deposit/i.test(lower)) {
      campaignType = "no_deposit"; depositRequired = false; eligible = "new";
    } else if (/daglig|daily|i\s*dag|hver\s*dag/i.test(lower)) {
      campaignType = "daily"; eligible = "existing";
    } else if (/weekend|fredag|lørdag/i.test(lower)) {
      campaignType = "weekend"; eligible = "existing";
    } else if (/eksisterende/i.test(lower)) {
      campaignType = "existing"; eligible = "existing";
    } else if (/velkomst|nye\s*spillere|første\s*indbetaling/i.test(lower)) {
      campaignType = "welcome"; eligible = "new";
    }

    const wagerMatch = section.match(/(?:omsætning|wagering|gennemspil)[^\d]*(\d+)\s*(?:x|gange)/i);
    const depositMatch = section.match(/(?:indbetal(?:ing)?|deposit)\s*(?:på\s*)?(?:mindst\s*)?(\d+)\s*kr/i);

    const headingMatch = section.match(/^##?\s*(.+?)(?:\n|$)/);
    const title = sanitize(headingMatch ? headingMatch[1] : `${spinCount} Free Spins hos ${casinoName}`).substring(0, 120);

    results.push({
      casino_name: casinoName,
      casino_slug: casinoSlug,
      title,
      free_spins: spinCount,
      spin_value: null,
      wagering_requirement: wagerMatch ? parseInt(wagerMatch[1], 10) : null,
      deposit_required: depositRequired,
      deposit_amount: depositMatch ? parseInt(depositMatch[1], 10) : null,
      eligible_players: eligible,
      game_name: extractGameName(section),
      expiry_date: null,
      campaign_type: campaignType,
      summary: sanitize(section.substring(0, 200)).substring(0, 160),
      full_terms_clean: sanitize(section).substring(0, 800),
    });
  }
  return results;
}

function extractSpinCount(text: string): number {
  const patterns = [
    /(\d+)\s*(?:gratis\s*)?(?:free\s*)?(?:cash\s*)?(?:bonus\s*)?(?:spins?|chancer)/i,
    /(?:få|hent|modtag)\s+(\d+)\s+(?:free\s*)?(?:spins?|chancer)/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n > 0 && n <= 1000) return n;
    }
  }
  return 0;
}

function extractGameName(text: string): string | null {
  const knownGames = [
    "Book of Dead", "Starburst", "Big Bass Bonanza", "Sweet Bonanza", "Gates of Olympus",
    "Gonzo's Quest", "Reactoonz", "Fire Joker", "Legacy of Dead", "Wolf Gold",
    "Dead or Alive", "Mega Moolah", "Immortal Romance", "Thunderstruck II",
    "Book of Ra", "Eye of Horus", "Rise of Olympus", "Moon Princess",
  ];
  const lowerText = text.toLowerCase();
  for (const game of knownGames) {
    if (lowerText.includes(game.toLowerCase())) return game;
  }
  return null;
}

// ─── DIRECT CASINO SCRAPER ───
async function scrapeDirectCasino(casino: CasinoRow, firecrawlKey: string): Promise<{ raw: string; url: string } | null> {
  if (!casino.website_url) return null;

  let baseUrl: string;
  try {
    const u = new URL(casino.website_url);
    baseUrl = `${u.protocol}//${u.hostname}`;
  } catch { return null; }

  for (const path of CASINO_PATHS) {
    const targetUrl = `${baseUrl}${path}`;
    try {
      const resp = await fetch("https://api.firecrawl.dev/v1/scrape", {
        method: "POST",
        headers: { "Authorization": `Bearer ${firecrawlKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl, formats: ["markdown"], onlyMainContent: true, waitFor: 3000 }),
      });
      if (!resp.ok) continue;
      const d = await resp.json();
      const md = d?.data?.markdown || d?.markdown || "";
      if (md.length < 100) continue;
      if (/free\s*spin|gratis\s*spin|chancer|lykkehjul/i.test(md)) {
        console.log(`  Found content at ${targetUrl} (${md.length} chars)`);
        return { raw: md, url: targetUrl };
      }
    } catch { /* skip */ }
  }
  return null;
}

// ─── AGGREGATOR SCRAPER ───
async function scrapeAggregator(url: string, firecrawlKey: string): Promise<string> {
  try {
    console.log(`  Scraping aggregator: ${url}`);
    const resp = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: { "Authorization": `Bearer ${firecrawlKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ url, formats: ["markdown"], onlyMainContent: true, waitFor: 5000 }),
    });
    if (!resp.ok) {
      const errBody = await resp.text();
      console.error(`  Firecrawl error ${resp.status} for ${url}: ${errBody.substring(0, 300)}`);
      return "";
    }
    const d = await resp.json();
    const md = d?.data?.markdown || d?.markdown || "";
    console.log(`  Firecrawl result for ${url}: ${md.length} chars, success=${d?.success}`);
    if (md.length < 50) {
      console.log(`  Raw response keys: ${JSON.stringify(Object.keys(d || {}))}, data keys: ${JSON.stringify(Object.keys(d?.data || {}))}`);
    }
    return md;
  } catch (e) {
    console.error(`  Aggregator scrape exception for ${url}: ${e}`);
    return "";
  }
}

/** Split aggregator markdown into per-casino sections */
function splitIntoCasinoSections(markdown: string): { casinoName: string; slug: string; text: string }[] {
  const sections: { casinoName: string; slug: string; text: string }[] = [];

  // Try heading-based splits
  const parts = markdown.split(/(?=## )/);
  for (const part of parts) {
    if (part.length < 50) continue;
    // Try to find casino name
    for (const [nameKey, slug] of Object.entries(CASINO_NAME_MAP)) {
      if (part.toLowerCase().includes(nameKey)) {
        sections.push({ casinoName: nameKey, slug, text: part });
        break;
      }
    }
  }

  // If no heading splits worked, try table row splits
  if (sections.length === 0) {
    const rows = markdown.split(/\n(?=\|)/);
    for (const row of rows) {
      for (const [nameKey, slug] of Object.entries(CASINO_NAME_MAP)) {
        if (row.toLowerCase().includes(nameKey) && /free\s*spin|gratis|chancer/i.test(row)) {
          sections.push({ casinoName: nameKey, slug, text: row });
          break;
        }
      }
    }
  }

  return sections;
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

    const allCampaigns: StructuredCampaign[] = [];
    const scrapeResults: { source: string; type: string; status: string; offers: number; error?: string }[] = [];

    // ─── Time-limit logic ───
    const START_TIME = Date.now();
    const MAX_RUNTIME_MS = 240_000; // 4 min safety margin
    function hasTimeLeft() { return (Date.now() - START_TIME) < MAX_RUNTIME_MS; }

    // ─── PHASE 1: Aggregator scraping FIRST (highest ROI per Firecrawl request) ───
    console.log(`Phase 1: Aggregator scraping (${AGGREGATOR_URLS.length} sources)`);

    for (const url of AGGREGATOR_URLS) {
      if (!hasTimeLeft()) {
        console.log(`Time limit reached, skipping remaining aggregators`);
        break;
      }
      try {
        const md = await scrapeAggregator(url, firecrawlKey);
        if (!md || md.length < 100) {
          scrapeResults.push({ source: url, type: "aggregator", status: "error", offers: 0, error: "Empty" });
          continue;
        }

        // First try splitting into casino sections
        const sections = splitIntoCasinoSections(md);
        let count = 0;
        
        if (sections.length > 0) {
          for (const section of sections) {
            const campaigns = await extractStructuredOffers(section.text, section.casinoName, section.slug, "aggregator");
            allCampaigns.push(...campaigns);
            count += campaigns.length;
          }
        } else {
          // If no sections found, send the entire markdown to LLM for extraction
          console.log(`  No sections found for ${url}, sending full text to LLM (${md.length} chars)`);
          const campaigns = await extractStructuredOffers(md, "aggregator", "unknown", "aggregator");
          for (const c of campaigns) {
            // Try to resolve the slug from the LLM-extracted casino name
            const resolvedSlug = resolveSlug(c.casino_name);
            if (resolvedSlug) {
              c.casino_slug = resolvedSlug;
              const casino = casinoMap.get(resolvedSlug);
              if (casino) c.casino_name = casino.name;
            }
          }
          allCampaigns.push(...campaigns);
          count = campaigns.length;
        }
        
        scrapeResults.push({ source: url, type: "aggregator", status: count > 0 ? "ok" : "no_offers", offers: count });
      } catch (e) {
        scrapeResults.push({ source: url, type: "aggregator", status: "error", offers: 0, error: String(e) });
      }
    }

    const aggregatorCount = allCampaigns.length;
    console.log(`Phase 1 done: ${aggregatorCount} aggregator campaigns`);

    // ─── PHASE 2: Direct casino scraping (only if time + rate limit remains) ───
    const casinosWithUrl = Array.from(casinoMap.values()).filter(c => {
      if (!c.website_url) return false;
      try { return new URL(c.website_url).hostname.endsWith(".dk"); } catch { return false; }
    });
    
    // Only scrape casinos not already covered by aggregators
    const casinosFromAggregator = new Set(allCampaigns.map(c => c.casino_slug));
    const casinosToScrape = casinosWithUrl.filter(c => !casinosFromAggregator.has(c.slug));
    
    if (hasTimeLeft() && casinosToScrape.length > 0) {
      console.log(`Phase 2: Direct scraping ${casinosToScrape.length} .dk casinos (skipping ${casinosWithUrl.length - casinosToScrape.length} already covered)`);

      const BATCH_SIZE = 3; // Smaller batches to respect rate limits
      for (let i = 0; i < casinosToScrape.length; i += BATCH_SIZE) {
        if (!hasTimeLeft()) {
          console.log(`Time limit reached after ${Math.round((Date.now() - START_TIME) / 1000)}s, stopping Phase 2 early`);
          break;
        }
        
        // Rate limit pause between batches
        if (i > 0) {
          console.log(`  Rate limit pause (2s)...`);
          await new Promise(r => setTimeout(r, 2000));
        }
        
        const batch = casinosToScrape.slice(i, i + BATCH_SIZE);
        const results = await Promise.all(batch.map(async (casino) => {
          try {
            const scraped = await scrapeDirectCasino(casino, firecrawlKey);
            if (!scraped) return { casino, campaigns: [], error: null };
            const campaigns = await extractStructuredOffers(scraped.raw, casino.name, casino.slug, "direct");
            return { casino, campaigns, error: null };
          } catch (e) {
            return { casino, campaigns: [], error: String(e) };
          }
        }));

        for (const { casino, campaigns, error } of results) {
          scrapeResults.push({
            source: casino.website_url || casino.slug,
            type: "direct",
            status: error ? "error" : campaigns.length > 0 ? "ok" : "no_offers",
            offers: campaigns.length,
            error: error || undefined,
          });
          allCampaigns.push(...campaigns);
        }
      }
    } else {
      console.log(`Skipping Phase 2 (direct) - ${!hasTimeLeft() ? 'no time left' : 'all casinos covered by aggregators'}`);
    }

    console.log(`Total campaigns: ${allCampaigns.length}`);

    // ─── Deduplicate ───
    const bestPerDedup = new Map<string, StructuredCampaign>();
    for (const c of allCampaigns) {
      if (c.free_spins <= 0) continue;
      const key = generateDedupKey(c.casino_slug, c.title);
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
    console.log(`Unique after dedup: ${unique.length}`);

    // ─── Build DB records ───
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
          description: c.summary, // summary goes to description for backward compat
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
          source_type: "direct", // simplified
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

    console.log(`DB records to insert: ${dbRecords.length}`);

    // ─── Clear old scraped data ───
    await admin.from("free_spin_campaigns").delete().in("source_type", ["scraped", "aggregator", "direct", "database"]);

    // ─── Insert ───
    if (dbRecords.length > 0) {
      const { error: insertError } = await admin.from("free_spin_campaigns").insert(dbRecords);
      if (insertError) {
        console.error("Insert error:", insertError);
        throw insertError;
      }
    }

    // ─── Sync legacy table ───
    await admin.from("daily_free_spins_offers").delete().eq("is_manually_added", false);
    if (dbRecords.length > 0) {
      const legacy = dbRecords.map(c => ({
        casino_id: c.casino_id,
        casino_name: c.casino_name,
        casino_slug: c.casino_slug,
        offer_title: c.title,
        offer_description: c.summary,
        free_spins_count: c.spin_count,
        min_deposit: c.min_deposit,
        wagering_requirement: c.wagering_requirement,
        valid_until: null,
        offer_type: c.offer_type,
        is_active: true,
        is_manually_added: false,
        scraped_at: now,
        scrape_source_url: null,
      }));
      await admin.from("daily_free_spins_offers").insert(legacy);
    }

    // ─── Auto-expire ───
    await admin.from("free_spin_campaigns")
      .update({ is_active: false })
      .lt("expiry_date", now)
      .eq("is_active", true);

    const lowConf = dbRecords.filter(r => (r.confidence_score || 0) < 60).length;

    const summary = {
      success: true,
      total_scraped: allCampaigns.length,
      unique_campaigns: unique.length,
      inserted: dbRecords.length,
      direct_source: dbRecords.filter(r => r.source_type === "direct").length,
      low_confidence_hidden: lowConf,
      scrape_results: scrapeResults,
    };

    console.log("Done:", JSON.stringify(summary, null, 2));
    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

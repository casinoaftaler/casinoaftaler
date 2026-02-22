import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ─── Aggregator sources (authoritative Danish free spin lists) ───
const AGGREGATOR_URLS = [
  "https://www.casinopenge.dk/free-spins-i-dag",
  "https://www.spilxperten.com/casino/dagens-free-spins/",
  "https://www.casinoonline.dk/freespin/",
];

// ─── Casino name → slug mapping (covers common variations) ───
const CASINO_NAME_MAP: Record<string, string> = {
  "royal casino": "royal-casino",
  "royalcasino": "royal-casino",
  "kapow casino": "kapow-casino",
  "kapow": "kapow-casino",
  "kapowcasino": "kapow-casino",
  "leovegas": "leovegas",
  "leo vegas": "leovegas",
  "mr green": "mr-green",
  "mr. green": "mr-green",
  "mrgreen": "mr-green",
  "comeon": "comeon",
  "come on": "comeon",
  "bet365": "bet365",
  "bet365 casino": "bet365",
  "unibet": "unibet",
  "unibet casino": "unibet",
  "888 casino": "888-casino",
  "888casino": "888-casino",
  "betano": "betano",
  "betano casino": "betano",
  "expekt": "expekt",
  "spilnu": "spilnu",
  "spilnu.dk": "spilnu",
  "casinostuen": "casinostuen",
  "onecasino": "onecasino",
  "one casino": "onecasino",
  "nordicbet": "nordicbet",
  "nordic bet": "nordicbet",
  "videoslots": "videoslots",
  "pokerstars": "pokerstars",
  "pokerstars casino": "pokerstars",
  "mr vegas": "mr-vegas",
  "stake": "stake",
  "tivoli casino": "tivoli-casino",
  "casino copenhagen": "casino-copenhagen",
};

interface CasinoRow {
  id: string;
  name: string;
  slug: string;
  affiliate_url: string | null;
  logo_url: string | null;
}

interface ParsedOffer {
  casino_name: string;
  casino_slug: string;
  title: string;
  description: string;
  spin_count: number;
  offer_type: string;
  for_new_players: boolean;
  for_existing_players: boolean;
  requires_deposit: boolean;
  wagering_requirement: string | null;
  min_deposit: string | null;
  expiry_info: string | null;
  source_url: string;
}

/** Resolve casino name to slug */
function resolveSlug(name: string): string | null {
  const lower = name.toLowerCase().trim();
  if (CASINO_NAME_MAP[lower]) return CASINO_NAME_MAP[lower];
  for (const [key, slug] of Object.entries(CASINO_NAME_MAP)) {
    if (lower.includes(key) || key.includes(lower)) return slug;
  }
  return null;
}

/** Extract spin count from text */
function extractSpinCount(text: string): number {
  const patterns = [
    /(\d+)\s*(?:gratis\s*)?(?:free\s*)?(?:cash\s*)?(?:bonus\s*)?(?:spins?|chancer)/i,
    /(?:få|hent|modtag)\s+(\d+)\s+(?:free\s*)?(?:spins?|chancer)/i,
    /(\d+)\s*(?:gratis\s*)?chancer/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n > 0 && n <= 5000) return n;
    }
  }
  return 0;
}

/** Classify offer type */
function classifyOffer(text: string): { type: string; forNew: boolean; forExisting: boolean; requiresDeposit: boolean } {
  const lower = text.toLowerCase();
  let type = "welcome";
  let forNew = false;
  let forExisting = false;
  let requiresDeposit = true;

  if (/uden\s*indbetaling|no\s*deposit/i.test(lower)) {
    type = "no_deposit"; requiresDeposit = false; forNew = true;
  } else if (/mandag|mandags/i.test(lower)) {
    type = "daily"; forExisting = true;
  } else if (/daglig|daily|i\s*dag|hver\s*dag|dagens/i.test(lower)) {
    type = "daily"; forExisting = true;
  } else if (/weekend|fredag|lørdag|søndag/i.test(lower)) {
    type = "weekend"; forExisting = true;
  } else if (/lykkehjul|spin\s*og\s*vind/i.test(lower)) {
    type = "daily"; forExisting = true;
  } else if (/eksisterende|ugens\s*spil/i.test(lower)) {
    type = "existing"; forExisting = true;
  } else if (/velkomst|nye\s*kunder|nye\s*spillere|ved\s*registrering|første\s*indbetaling/i.test(lower)) {
    type = "welcome"; forNew = true;
  }

  if (/nye\s*(?:og\s*)?eksisterende|eksisterende\s*(?:og\s*)?nye|alle\s*(?:spillere|kunder)/i.test(lower)) {
    forNew = true; forExisting = true;
  }
  if (/nye\s*(?:spillere|kunder)/i.test(lower)) forNew = true;
  if (/eksisterende\s*(?:spillere|kunder)/i.test(lower)) forExisting = true;

  return { type, forNew, forExisting, requiresDeposit };
}

/** Detect wagering from text – CONTEXT-BASED only */
function detectWagering(text: string): string | null {
  // Only match wagering when it's in context of "omsætningskrav" or "gennemspil"
  const contextMatch = text.match(/(?:omsætningskrav|gennemspil|omsætning)[^\d]*(\d+)\s*(?:x|gange)/i);
  if (contextMatch) {
    const val = parseInt(contextMatch[1], 10);
    if (val > 0 && val <= 100) return `${val}x`;
    return null; // > 100x is invalid
  }
  // Also match "Xx gennemspil/omsætning"
  const reverseMatch = text.match(/(\d+)\s*(?:x|gange)\s*(?:gennemspil|omsætning|omsætningskrav)/i);
  if (reverseMatch) {
    const val = parseInt(reverseMatch[1], 10);
    if (val > 0 && val <= 100) return `${val}x`;
    return null;
  }
  // "Uden omsætningskrav"
  const noWager = text.match(/uden\s*(?:gennemspils?krav|omsætningskrav)/i);
  if (noWager) return "Ingen";
  return null;
}

/** Detect min deposit */
function detectMinDeposit(text: string): string | null {
  const m = text.match(/(?:indbetal(?:ing)?|deposit)\s*(?:på\s*)?(?:mindst\s*)?(\d+)\s*kr/i);
  if (m) return `${m[1]} kr.`;
  return null;
}

/** Detect expiry */
function detectExpiry(text: string): string | null {
  const m = text.match(/(?:slutter|udløb|gyldigt?\s*(?:til|fra|indtil))[^.]*?(\d{1,2})\.\s*(\w+)\s*(?:20\d{2})?/i);
  if (m) return m[0].substring(0, 80);
  const m2 = text.match(/(?:hver\s*mandag|hver\s*dag|ugentlig|løbende)/i);
  if (m2) return m2[0];
  return null;
}

/** Calculate score for ranking */
function calculateScore(offer: ParsedOffer): number {
  let score = offer.spin_count;
  
  // Subtract wagering penalty
  if (offer.wagering_requirement && offer.wagering_requirement !== "Ingen") {
    const wagerMatch = offer.wagering_requirement.match(/(\d+)/);
    if (wagerMatch) {
      score -= parseInt(wagerMatch[1], 10) * 2;
    }
  }
  
  // Bonus for no deposit
  if (!offer.requires_deposit) {
    score += 50;
  }
  
  return score;
}

// ─── Casinopenge.dk parser ───
function parseCasinopenge(markdown: string, sourceUrl: string): ParsedOffer[] {
  const offers: ParsedOffer[] = [];
  const sections = markdown.split(/(?=## \[)/);

  for (const section of sections) {
    if (section.length < 30) continue;

    let casinoName = "";
    const logoMatch = section.match(/!\[([^\]]+)\]\([^)]*casino-logo[^)]*\)/i);
    if (logoMatch) casinoName = logoMatch[1];
    if (!casinoName) {
      const altMatch = section.match(/!\[([^\]]+)\]/);
      if (altMatch && altMatch[1].length < 40) casinoName = altMatch[1];
    }

    const slug = resolveSlug(casinoName);
    if (!slug) continue;

    const titleMatch = section.match(/## \[([^\]]+)\]/);
    const title = titleMatch ? titleMatch[1] : "";

    const spinCount = extractSpinCount(section);
    // ★ STRICT: skip if spin_count is 0
    if (spinCount <= 0) continue;

    const classification = classifyOffer(section);
    const cleanDesc = section
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/[#*_]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 400);

    offers.push({
      casino_name: casinoName,
      casino_slug: slug,
      title: title || `${spinCount} Free Spins hos ${casinoName}`,
      description: cleanDesc,
      spin_count: spinCount,
      offer_type: classification.type,
      for_new_players: classification.forNew,
      for_existing_players: classification.forExisting,
      requires_deposit: classification.requiresDeposit,
      wagering_requirement: detectWagering(section),
      min_deposit: detectMinDeposit(section),
      expiry_info: detectExpiry(section),
      source_url: sourceUrl,
    });
  }
  return offers;
}

// ─── Spilxperten.com parser ───
function parseSpilxperten(markdown: string, sourceUrl: string): ParsedOffer[] {
  const offers: ParsedOffer[] = [];
  const tableBlocks = markdown.split(/\n\|\s*---\s*\|\n/);

  for (const block of tableBlocks) {
    if (block.length < 40) continue;

    let casinoName = "";
    const casinoLinkMatch = block.match(/\[([^\]]*(?:Casino|Bet365|Unibet|LeoVegas|Mr Green|Kapow|Betano|Spilnu|Casinostuen|Royal)[^\]]*)\]/i);
    if (casinoLinkMatch) casinoName = casinoLinkMatch[1].replace(/\*/g, "").trim();
    if (!casinoName) {
      const altMatch = block.match(/!\[[^\]]*\]\([^)]*(?:royal|kapow|bet365|unibet|leovegas|mr-green|betano|spilnu|casinostuen)[^)]*\)/i);
      if (altMatch) {
        const nameFromUrl = altMatch[0].match(/(?:royal|kapow|bet365|unibet|leovegas|mr-green|betano|spilnu|casinostuen)/i);
        if (nameFromUrl) casinoName = nameFromUrl[0];
      }
    }
    const besoegMatch = block.match(/besoeg\/([a-z0-9-]+)/i);
    if (!casinoName && besoegMatch) {
      casinoName = besoegMatch[1].replace(/-/g, " ");
    }

    const slug = resolveSlug(casinoName);
    if (!slug) continue;

    const titleMatch = block.match(/\|\s*([^|]*(?:free\s*spins?|chancer|cash\s*spins?|lykkehjul|gratis|prize|lodtrækning)[^|]*)\s*\|/i);
    const title = titleMatch ? titleMatch[1].replace(/[*💥🔥🎁💰😍]/g, "").replace(/\s+/g, " ").trim() : "";

    const spinCount = extractSpinCount(block);
    // ★ STRICT: skip if spin_count is 0
    if (spinCount <= 0) continue;

    const classification = classifyOffer(block);
    const cleanDesc = block
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/[#*_|]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 400);

    offers.push({
      casino_name: casinoName,
      casino_slug: slug,
      title: title || `${spinCount} Free Spins hos ${casinoName}`,
      description: cleanDesc,
      spin_count: spinCount,
      offer_type: classification.type,
      for_new_players: classification.forNew,
      for_existing_players: classification.forExisting,
      requires_deposit: classification.requiresDeposit,
      wagering_requirement: detectWagering(block),
      min_deposit: detectMinDeposit(block),
      expiry_info: detectExpiry(block),
      source_url: sourceUrl,
    });
  }
  return offers;
}

// ─── CasinoOnline.dk parser ───
function parseCasinoonline(markdown: string, sourceUrl: string): ParsedOffer[] {
  const offers: ParsedOffer[] = [];
  const tableBlocks = markdown.split(/\n\|\s*(?:BONUS|FREE SPINS)[^|]*\|/i);

  for (const block of tableBlocks) {
    if (block.length < 40) continue;

    let casinoName = "";
    const hosMatch = block.match(/HOS\s+([A-ZÆØÅ][A-ZÆØÅ\s]+)\s*(?:CASINO)?/i);
    if (hosMatch) casinoName = hosMatch[1].trim();
    if (!casinoName) {
      const goMatch = block.match(/casinoonline\.dk\/go\/([a-z_]+)/i);
      if (goMatch) casinoName = goMatch[1].replace(/_/g, " ");
    }

    const slug = resolveSlug(casinoName);
    if (!slug) continue;

    const titleMatch = block.match(/\[([^\]]*(?:FREE|GRATIS|SPINS|CASH|MANDAGS|LYKKEHJUL)[^\]]*)\]/i);
    const title = titleMatch ? titleMatch[1] : "";

    const spinCount = extractSpinCount(block);
    // ★ STRICT: skip if spin_count is 0
    if (spinCount <= 0) continue;

    const classification = classifyOffer(block);
    const cleanDesc = block
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/[#*_|]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 400);

    offers.push({
      casino_name: casinoName,
      casino_slug: slug,
      title: title || `Free Spins hos ${casinoName}`,
      description: cleanDesc,
      spin_count: spinCount,
      offer_type: classification.type,
      for_new_players: classification.forNew,
      for_existing_players: classification.forExisting,
      requires_deposit: classification.requiresDeposit,
      wagering_requirement: detectWagering(block),
      min_deposit: detectMinDeposit(block),
      expiry_info: detectExpiry(block),
      source_url: sourceUrl,
    });
  }
  return offers;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");

    if (!firecrawlKey) {
      return new Response(
        JSON.stringify({ error: "FIRECRAWL_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const admin = createClient(supabaseUrl, serviceRoleKey);

    // Fetch casino data for ID/logo/affiliate mapping
    const { data: casinos } = await admin
      .from("casinos")
      .select("id, name, slug, affiliate_url, logo_url")
      .eq("is_active", true);

    const casinoMap = new Map<string, CasinoRow>();
    for (const c of (casinos || []) as CasinoRow[]) {
      casinoMap.set(c.slug, c);
    }

    console.log(`Loaded ${casinoMap.size} casinos for mapping`);

    // ─── Scrape all 3 aggregator sites ───
    const allParsedOffers: ParsedOffer[] = [];
    const scrapeResults: { source: string; status: string; offers_found: number; error?: string }[] = [];

    const scrapePromises = AGGREGATOR_URLS.map(async (url) => {
      try {
        console.log(`Scraping aggregator: ${url}`);
        const resp = await fetch("https://api.firecrawl.dev/v1/scrape", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${firecrawlKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url, formats: ["markdown"], onlyMainContent: true, waitFor: 5000 }),
        });

        if (!resp.ok) {
          const errText = await resp.text();
          console.error(`Firecrawl error for ${url}: ${resp.status} ${errText}`);
          return { url, markdown: "", error: `HTTP ${resp.status}` };
        }

        const d = await resp.json();
        const md = d?.data?.markdown || d?.markdown || "";
        console.log(`Got ${md.length} chars from ${url}`);
        return { url, markdown: md, error: null };
      } catch (e) {
        console.error(`Error scraping ${url}:`, e);
        return { url, markdown: "", error: String(e) };
      }
    });

    const scrapeData = await Promise.all(scrapePromises);

    // ─── Parse each source ───
    for (const { url, markdown, error } of scrapeData) {
      if (error || !markdown) {
        scrapeResults.push({ source: url, status: "error", offers_found: 0, error: error || "Empty response" });
        continue;
      }

      let parsed: ParsedOffer[] = [];
      if (url.includes("casinopenge.dk")) {
        parsed = parseCasinopenge(markdown, url);
      } else if (url.includes("spilxperten.com")) {
        parsed = parseSpilxperten(markdown, url);
      } else if (url.includes("casinoonline.dk")) {
        parsed = parseCasinoonline(markdown, url);
      }

      scrapeResults.push({ source: url, status: "ok", offers_found: parsed.length });
      allParsedOffers.push(...parsed);
    }

    console.log(`Total parsed offers (all spin_count > 0): ${allParsedOffers.length}`);

    // ─── Deduplicate: keep BEST offer per casino_slug + offer_type ───
    const bestPerCasinoType = new Map<string, ParsedOffer>();

    for (const offer of allParsedOffers) {
      const key = `${offer.casino_slug}:${offer.offer_type}`;
      const existing = bestPerCasinoType.get(key);
      if (!existing || calculateScore(offer) > calculateScore(existing)) {
        bestPerCasinoType.set(key, offer);
      }
    }

    const uniqueOffers = Array.from(bestPerCasinoType.values());
    console.log(`Unique offers after dedup (best per casino+type): ${uniqueOffers.length}`);

    // ─── Map to campaign records ───
    const campaigns = uniqueOffers
      .map((offer) => {
        const casino = casinoMap.get(offer.casino_slug);
        const score = calculateScore(offer);
        return {
          casino_id: casino?.id || null,
          casino_name: casino?.name || offer.casino_name,
          casino_slug: offer.casino_slug,
          title: offer.title,
          description: offer.description,
          spin_count: offer.spin_count,
          for_new_players: offer.for_new_players,
          for_existing_players: offer.for_existing_players,
          requires_deposit: offer.requires_deposit,
          wagering_requirement: offer.wagering_requirement,
          min_deposit: offer.min_deposit,
          expiry_date: null,
          source_type: "aggregator",
          source_url: offer.source_url,
          is_active: true,
          offer_type: offer.offer_type,
          casino_logo_url: casino?.logo_url || null,
          affiliate_url: casino?.affiliate_url || null,
          last_checked: new Date().toISOString(),
          score,
        };
      })
      .filter((c) => casinoMap.has(c.casino_slug)); // Only include casinos we have in our DB

    console.log(`Campaigns to insert (matched to DB casinos): ${campaigns.length}`);

    // ─── TRUNCATE old campaigns (clean slate) ───
    await admin.from("free_spin_campaigns").delete().in("source_type", ["scraped", "aggregator", "database"]);

    // ─── Insert new campaigns ───
    if (campaigns.length > 0) {
      const { error: insertError } = await admin.from("free_spin_campaigns").insert(campaigns);
      if (insertError) {
        console.error("Error inserting campaigns:", insertError);
        throw insertError;
      }
    }

    // ─── Sync to legacy table ───
    await admin.from("daily_free_spins_offers").delete().eq("is_manually_added", false);

    if (campaigns.length > 0) {
      const legacyOffers = campaigns.map((c) => ({
        casino_id: c.casino_id,
        casino_name: c.casino_name,
        casino_slug: c.casino_slug,
        offer_title: c.title,
        offer_description: c.description,
        free_spins_count: c.spin_count,
        min_deposit: c.min_deposit,
        wagering_requirement: c.wagering_requirement,
        valid_until: null,
        offer_type: c.offer_type,
        is_active: true,
        is_manually_added: false,
        scraped_at: new Date().toISOString(),
        scrape_source_url: c.source_url,
      }));
      await admin.from("daily_free_spins_offers").insert(legacyOffers);
    }

    const summary = {
      success: true,
      totalOffersFound: allParsedOffers.length,
      uniqueOffers: uniqueOffers.length,
      campaignsInserted: campaigns.length,
      scrapeResults,
      campaignsByCasino: campaigns.reduce((acc, c) => {
        acc[c.casino_slug] = (acc[c.casino_slug] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };

    console.log("Done:", JSON.stringify(summary, null, 2));

    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in scrape-daily-offers:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

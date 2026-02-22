import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ─── Expanded keyword list ───
const FREE_SPINS_KEYWORDS = [
  "free spins", "free spin", "gratis spins", "gratis spin",
  "fs ", "freespin", "freespins", "spins uden indbetaling",
  "bonus spins", "ekstra spins", "daglige spins",
  "spin gratis", "spil og vind free spins", "dagens spin",
  "lykkehjul", "spin & win", "spin and win",
];

// ─── Priority paths to crawl (reduced for speed) ───
const CRAWL_PATHS = [
  "/kampagner", "/free-spins", "/bonus",
];

interface CasinoRow {
  id: string;
  name: string;
  slug: string;
  website_url: string | null;
  bonus_page_url: string | null;
  bonus_title: string;
  bonus_amount: string;
  free_spins: string | null;
  wagering_requirements: string;
  min_deposit: string;
  affiliate_url: string | null;
  logo_url: string | null;
}

interface DetectedCampaign {
  casino_id: string;
  casino_name: string;
  casino_slug: string;
  title: string;
  description: string | null;
  spin_count: number;
  for_new_players: boolean;
  for_existing_players: boolean;
  requires_deposit: boolean;
  wagering_requirement: string | null;
  min_deposit: string | null;
  expiry_date: string | null;
  source_type: string;
  source_url: string | null;
  is_active: boolean;
  offer_type: string;
  casino_logo_url: string | null;
  affiliate_url: string | null;
}

function containsFreeSpinsKeyword(text: string): boolean {
  const lower = text.toLowerCase();
  return FREE_SPINS_KEYWORDS.some((kw) => lower.includes(kw));
}

function detectSpinCount(text: string): number[] {
  const regex = /(\d+)\s*(?:gratis\s*)?(?:free\s*)?(?:bonus\s*)?spins?/gi;
  const counts: number[] = [];
  for (const m of text.matchAll(regex)) {
    const n = parseInt(m[1], 10);
    if (n > 0 && n <= 5000) counts.push(n);
  }
  return [...new Set(counts)];
}

function detectWagering(text: string): string | null {
  const m = text.match(/(\d+)\s*x\s*(?:gennemspilning|omsætning|wagering|gennemspils|gange)/i);
  if (m) return `${m[1]}x`;
  const m2 = text.match(/(\d+)x/i);
  if (m2) return `${m2[1]}x`;
  return null;
}

function detectMinDeposit(text: string): string | null {
  const m = text.match(/(?:min(?:imum)?\.?\s*(?:ind(?:betaling|skud))?|deposit)\s*:?\s*(\d+)\s*(?:kr|dkk)/i);
  if (m) return `${m[1]} kr.`;
  return null;
}

function classifyOffer(text: string): { type: string; forNew: boolean; forExisting: boolean; requiresDeposit: boolean } {
  const lower = text.toLowerCase();
  let type = "welcome";
  let forNew = false;
  let forExisting = false;
  let requiresDeposit = true;

  if (/uden\s*indbetaling|no\s*deposit|gratis\s*uden/i.test(lower)) {
    type = "no_deposit";
    requiresDeposit = false;
    forNew = true;
  } else if (/daglig|daily|i\s*dag|hver\s*dag|dagens\s*spin/i.test(lower)) {
    type = "daily";
    forExisting = true;
  } else if (/weekend/i.test(lower)) {
    type = "weekend";
    forExisting = true;
  } else if (/vip|loyal|eksisterende/i.test(lower)) {
    type = "existing";
    forExisting = true;
  } else if (/velkomst|welcome|ny\s*spiller|nye\s*spillere|tilmeld/i.test(lower)) {
    type = "welcome";
    forNew = true;
  } else if (/lykkehjul|spin\s*&\s*win|spin\s*and\s*win/i.test(lower)) {
    type = "daily";
    forExisting = true;
  }

  // Text mentions both
  if (/nye\s*spillere/i.test(lower)) forNew = true;
  if (/eksisterende\s*spillere|alle\s*spillere/i.test(lower)) forExisting = true;
  if (/alle\s*spillere/i.test(lower)) forNew = true;

  return { type, forNew, forExisting, requiresDeposit };
}

function cleanText(text: string): string {
  return text.replace(/[#*_\[\]()]/g, "").replace(/\s+/g, " ").replace(/\n+/g, " ").trim();
}

/** Extract campaigns from markdown content */
function extractCampaignsFromMarkdown(
  markdown: string,
  casino: CasinoRow,
  sourceUrl: string
): DetectedCampaign[] {
  const campaigns: DetectedCampaign[] = [];
  if (!containsFreeSpinsKeyword(markdown)) return campaigns;

  const spinCounts = detectSpinCount(markdown);
  if (spinCounts.length === 0) return campaigns;

  // Split into sections and find contexts around each spin count
  const seenCounts = new Set<number>();
  const regex = /(\d+)\s*(?:gratis\s*)?(?:free\s*)?(?:bonus\s*)?spins?/gi;

  for (const match of markdown.matchAll(regex)) {
    const count = parseInt(match[1], 10);
    if (count <= 0 || count > 5000 || seenCounts.has(count)) continue;
    seenCounts.add(count);

    const idx = match.index || 0;
    const context = markdown.substring(
      Math.max(0, idx - 300),
      Math.min(markdown.length, idx + 300)
    );

    const classification = classifyOffer(context);
    const wager = detectWagering(context);
    const minDep = detectMinDeposit(context);

    campaigns.push({
      casino_id: casino.id,
      casino_name: casino.name,
      casino_slug: casino.slug,
      title: `${count} Free Spins hos ${casino.name}`,
      description: cleanText(context).substring(0, 400),
      spin_count: count,
      for_new_players: classification.forNew,
      for_existing_players: classification.forExisting,
      requires_deposit: classification.requiresDeposit,
      wagering_requirement: wager,
      min_deposit: minDep,
      expiry_date: null,
      source_type: "scraped",
      source_url: sourceUrl,
      is_active: true,
      offer_type: classification.type,
      casino_logo_url: casino.logo_url,
      affiliate_url: casino.affiliate_url,
    });
  }

  return campaigns;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");

    const admin = createClient(supabaseUrl, serviceRoleKey);

    // Fetch all active casinos with website_url
    const { data: casinos, error: casinoError } = await admin
      .from("casinos")
      .select("id, name, slug, website_url, bonus_page_url, bonus_title, bonus_amount, free_spins, wagering_requirements, min_deposit, affiliate_url, logo_url")
      .eq("is_active", true)
      .order("position");

    if (casinoError) throw casinoError;

    console.log(`Found ${casinos?.length || 0} active casinos`);

    const allCampaigns: DetectedCampaign[] = [];
    const scrapeResults: { casino: string; method: string; urls_tried: number; campaigns_found: number; error?: string }[] = [];

    // Process casinos in parallel batches of 5, limit crawling to top 15 casinos
    const casinoList = (casinos || []) as CasinoRow[];
    const crawlableCasinos = casinoList.filter((c) => c.website_url);
    const nonCrawlable = casinoList.filter((c) => !c.website_url);
    const BATCH_SIZE = 5;

    // Process crawlable casinos (limit to first 15 for speed)
    const crawlBatch = crawlableCasinos.slice(0, 15);

    for (let batchStart = 0; batchStart < crawlBatch.length; batchStart += BATCH_SIZE) {
      const batch = crawlBatch.slice(batchStart, batchStart + BATCH_SIZE);

      const batchResults = await Promise.allSettled(
        batch.map(async (casino) => {
          let casinoCampaigns: DetectedCampaign[] = [];

          if (casino.website_url && firecrawlKey) {
            const urlsToScrape: string[] = [];
            if (casino.bonus_page_url) urlsToScrape.push(casino.bonus_page_url);
            for (const path of CRAWL_PATHS) {
              const url = casino.website_url.replace(/\/$/, "") + path;
              if (!urlsToScrape.includes(url)) urlsToScrape.push(url);
            }

            // Scrape up to 3 URLs per casino in parallel
            const maxUrls = Math.min(urlsToScrape.length, 3);
            const scrapePromises = urlsToScrape.slice(0, maxUrls).map(async (url) => {
              try {
                const resp = await fetch("https://api.firecrawl.dev/v1/scrape", {
                  method: "POST",
                  headers: {
                    "Authorization": `Bearer ${firecrawlKey}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ url, formats: ["markdown"], onlyMainContent: true, waitFor: 2000 }),
                });

                if (resp.ok) {
                  const d = await resp.json();
                  const md = d?.data?.markdown || d?.markdown || "";
                  if (md) return extractCampaignsFromMarkdown(md, casino, url);
                } else {
                  await resp.text(); // consume body
                }
              } catch { /* skip */ }
              return [] as DetectedCampaign[];
            });

            const results = await Promise.allSettled(scrapePromises);
            for (const r of results) {
              if (r.status === "fulfilled" && r.value.length > 0) {
                casinoCampaigns.push(...r.value);
              }
            }

            scrapeResults.push({
              casino: casino.name,
              method: "multi_path_crawl",
              urls_tried: maxUrls,
              campaigns_found: casinoCampaigns.length,
            });
          }

          // Fallback to DB data
          if (casinoCampaigns.length === 0) {
            const fallback = buildFallbackCampaign(casino);
            if (fallback) {
              casinoCampaigns.push(fallback);
              scrapeResults.push({ casino: casino.name, method: "database_fallback", urls_tried: 0, campaigns_found: 1 });
            } else {
              scrapeResults.push({ casino: casino.name, method: "no_data", urls_tried: 0, campaigns_found: 0 });
            }
          }

          // Deduplicate by spin_count
          const seen = new Set<number>();
          for (const c of casinoCampaigns) {
            if (!seen.has(c.spin_count)) {
              seen.add(c.spin_count);
              allCampaigns.push(c);
            }
          }
        })
      );

      // Log errors
      for (let i = 0; i < batchResults.length; i++) {
        const r = batchResults[i];
        if (r.status === "rejected") {
          console.error(`Error processing ${batch[i].name}:`, r.reason);
          scrapeResults.push({ casino: batch[i].name, method: "error", urls_tried: 0, campaigns_found: 0, error: String(r.reason) });
        }
      }
    }

    // Process remaining non-crawlable casinos (DB fallback only)
    for (const casino of [...nonCrawlable, ...crawlableCasinos.slice(15)]) {
      const fallback = buildFallbackCampaign(casino);
      if (fallback) {
        allCampaigns.push(fallback);
        scrapeResults.push({ casino: casino.name, method: "database_fallback", urls_tried: 0, campaigns_found: 1 });
      } else {
        scrapeResults.push({ casino: casino.name, method: "no_data", urls_tried: 0, campaigns_found: 0 });
      }
    }

    // ─── Deactivate old scraped campaigns ───
    const { error: deactivateError } = await admin
      .from("free_spin_campaigns")
      .update({ is_active: false })
      .eq("source_type", "scraped");

    if (deactivateError) console.error("Error deactivating old campaigns:", deactivateError);

    // ─── Insert new campaigns ───
    if (allCampaigns.length > 0) {
      const { error: insertError } = await admin
        .from("free_spin_campaigns")
        .insert(allCampaigns.map((c) => ({
          ...c,
          last_checked: new Date().toISOString(),
        })));

      if (insertError) {
        console.error("Error inserting campaigns:", insertError);
        throw insertError;
      }
    }

    // ─── Also sync to daily_free_spins_offers for backward compat ───
    await admin
      .from("daily_free_spins_offers")
      .update({ is_active: false })
      .eq("is_manually_added", false);

    if (allCampaigns.length > 0) {
      const legacyOffers = allCampaigns.map((c) => ({
        casino_id: c.casino_id,
        casino_name: c.casino_name,
        casino_slug: c.casino_slug,
        offer_title: c.title,
        offer_description: c.description,
        free_spins_count: c.spin_count,
        min_deposit: c.min_deposit,
        wagering_requirement: c.wagering_requirement,
        valid_until: c.expiry_date,
        offer_type: c.offer_type,
        is_active: true,
        is_manually_added: false,
        scraped_at: new Date().toISOString(),
        scrape_source_url: c.source_url,
      }));

      await admin.from("daily_free_spins_offers").insert(legacyOffers);
    }

    console.log(`Done: ${allCampaigns.length} campaigns from ${casinos?.length || 0} casinos`);

    return new Response(
      JSON.stringify({
        success: true,
        totalCampaigns: allCampaigns.length,
        casinosProcessed: casinos?.length || 0,
        scrapeResults,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in scrape-daily-offers:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

/** Build a campaign from existing database fields if free_spins is populated */
function buildFallbackCampaign(casino: CasinoRow): DetectedCampaign | null {
  if (!casino.free_spins || casino.free_spins === "N/A" || casino.free_spins.trim() === "") {
    return null;
  }

  const count = parseInt(casino.free_spins.replace(/\D/g, ""), 10);
  if (isNaN(count) || count <= 0) return null;

  const combined = `${casino.bonus_title} ${casino.free_spins}`.toLowerCase();
  const classification = classifyOffer(combined);

  return {
    casino_id: casino.id,
    casino_name: casino.name,
    casino_slug: casino.slug,
    title: `${casino.free_spins} Free Spins hos ${casino.name}`,
    description: `${casino.name} tilbyder ${casino.free_spins} free spins. Omsætningskrav: ${casino.wagering_requirements}.`,
    spin_count: count,
    for_new_players: classification.forNew,
    for_existing_players: classification.forExisting,
    requires_deposit: classification.requiresDeposit,
    wagering_requirement: casino.wagering_requirements,
    min_deposit: casino.min_deposit,
    expiry_date: null,
    source_type: "database",
    source_url: null,
    is_active: true,
    offer_type: classification.type,
    casino_logo_url: casino.logo_url,
    affiliate_url: casino.affiliate_url,
  };
}

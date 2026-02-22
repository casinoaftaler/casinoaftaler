import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CasinoToScrape {
  id: string;
  name: string;
  slug: string;
  bonus_page_url: string | null;
  bonus_title: string;
  bonus_amount: string;
  free_spins: string;
  wagering_requirements: string;
  min_deposit: string;
  affiliate_url: string | null;
  logo_url: string | null;
}

interface ParsedOffer {
  offer_title: string;
  offer_description: string;
  free_spins_count: number;
  min_deposit: string | null;
  wagering_requirement: string | null;
  valid_until: string | null;
  offer_type: string;
}

/** Keywords that indicate free spins content */
const FREE_SPINS_KEYWORDS = [
  "free spins", "free spin", "gratis spins", "gratis spin",
  "fs", "freespin", "freespins", "spins uden indbetaling",
  "bonus spins", "ekstra spins", "daglige spins",
];

function containsFreeSpinsKeyword(text: string): boolean {
  const lower = text.toLowerCase();
  return FREE_SPINS_KEYWORDS.some((kw) => lower.includes(kw));
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

    const { data: casinos, error: casinoError } = await admin
      .from("casinos")
      .select("id, name, slug, bonus_page_url, bonus_title, bonus_amount, free_spins, wagering_requirements, min_deposit, affiliate_url, logo_url")
      .eq("is_active", true)
      .order("position");

    if (casinoError) throw casinoError;

    console.log(`Found ${casinos?.length || 0} active casinos`);

    const allOffers: any[] = [];
    const scrapeResults: { casino: string; method: string; success: boolean; error?: string }[] = [];

    for (const casino of (casinos || []) as CasinoToScrape[]) {
      try {
        let offers: ParsedOffer[] = [];

        // Method 1: Scrape bonus page URL if available (using Firecrawl)
        if (casino.bonus_page_url && firecrawlKey) {
          console.log(`Scraping ${casino.name}: ${casino.bonus_page_url}`);

          const scrapeResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${firecrawlKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: casino.bonus_page_url,
              formats: ["markdown"],
              onlyMainContent: true,
              waitFor: 3000,
            }),
          });

          if (scrapeResponse.ok) {
            const scrapeData = await scrapeResponse.json();
            const markdown = scrapeData?.data?.markdown || scrapeData?.markdown || "";

            if (markdown && containsFreeSpinsKeyword(markdown)) {
              offers = parseOffersFromMarkdown(markdown, casino.name);
              scrapeResults.push({ casino: casino.name, method: "firecrawl", success: true });
            } else {
              console.log(`No free spins keywords found in scraped content for ${casino.name}`);
              scrapeResults.push({ casino: casino.name, method: "firecrawl_no_fs", success: true });
            }
          } else {
            const errText = await scrapeResponse.text();
            console.error(`Firecrawl error for ${casino.name}: ${errText}`);
            scrapeResults.push({ casino: casino.name, method: "firecrawl", success: false, error: errText });
          }
        }

        // Method 2: Fall back to existing database data ONLY if free_spins field has a real value
        if (offers.length === 0) {
          offers = buildOffersFromExistingData(casino);
          if (offers.length > 0) {
            scrapeResults.push({ casino: casino.name, method: "database_fallback", success: true });
          }
        }

        // Add all offers for this casino
        for (const offer of offers) {
          allOffers.push({
            casino_id: casino.id,
            casino_name: casino.name,
            casino_slug: casino.slug,
            offer_title: offer.offer_title,
            offer_description: offer.offer_description,
            free_spins_count: offer.free_spins_count,
            min_deposit: offer.min_deposit,
            wagering_requirement: offer.wagering_requirement,
            valid_until: offer.valid_until,
            offer_type: offer.offer_type,
            is_active: true,
            is_manually_added: false,
            scraped_at: new Date().toISOString(),
            scrape_source_url: casino.bonus_page_url,
          });
        }
      } catch (err) {
        console.error(`Error processing ${casino.name}:`, err);
        scrapeResults.push({ casino: casino.name, method: "error", success: false, error: String(err) });
      }
    }

    // Deactivate old auto-scraped offers (keep manual ones)
    const { error: deactivateError } = await admin
      .from("daily_free_spins_offers")
      .update({ is_active: false })
      .eq("is_manually_added", false);

    if (deactivateError) {
      console.error("Error deactivating old offers:", deactivateError);
    }

    // Insert new offers (only if we have any)
    if (allOffers.length > 0) {
      const { error: insertError } = await admin
        .from("daily_free_spins_offers")
        .insert(allOffers);

      if (insertError) {
        console.error("Error inserting offers:", insertError);
        throw insertError;
      }
    }

    console.log(`Successfully processed ${allOffers.length} free spins offers from ${casinos?.length || 0} casinos`);

    return new Response(
      JSON.stringify({
        success: true,
        totalOffers: allOffers.length,
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

/**
 * Parse markdown content from a casino's bonus page to extract ONLY free spins offers
 */
function parseOffersFromMarkdown(markdown: string, casinoName: string): ParsedOffer[] {
  const offers: ParsedOffer[] = [];

  const freeSpinsRegex = /(\d+)\s*(?:gratis\s*)?(?:free\s*)?(?:bonus\s*)?spins?/gi;
  const matches = [...markdown.matchAll(freeSpinsRegex)];

  if (matches.length > 0) {
    const seenCounts = new Set<number>();

    for (const match of matches) {
      const count = parseInt(match[1], 10);
      if (count > 0 && count <= 5000 && !seenCounts.has(count)) {
        seenCounts.add(count);

        const idx = match.index || 0;
        const context = markdown.substring(Math.max(0, idx - 200), Math.min(markdown.length, idx + 200));

        // Detect offer type
        let offerType = "welcome";
        if (/uden\s*indbetaling|no\s*deposit|gratis\s*uden/i.test(context)) offerType = "no_deposit";
        else if (/daglig|daily|i\s*dag|hver\s*dag/i.test(context)) offerType = "daily";
        else if (/weekend/i.test(context)) offerType = "weekend";
        else if (/vip|loyal|eksisterende/i.test(context)) offerType = "existing";
        else if (/velkomst|welcome|ny\s*spiller|nye\s*spillere/i.test(context)) offerType = "welcome";

        // Try to find wagering requirement
        let wager: string | null = null;
        const wagerMatch = context.match(/(\d+)x\s*(?:gennemspilning|omsætning|wagering|gennemspils)/i);
        if (wagerMatch) wager = `${wagerMatch[1]}x`;

        // Try to find min deposit
        let minDep: string | null = null;
        const depMatch = context.match(/(?:min(?:imum)?\.?\s*(?:ind(?:betaling|skud))?|deposit)\s*:?\s*(\d+)\s*(?:kr|dkk)/i);
        if (depMatch) minDep = `${depMatch[1]} kr.`;

        offers.push({
          offer_title: `${count} Free Spins hos ${casinoName}`,
          offer_description: cleanContext(context),
          free_spins_count: count,
          min_deposit: minDep,
          wagering_requirement: wager,
          valid_until: null,
          offer_type: offerType,
        });
      }
    }
  }

  return offers;
}

/**
 * Build offers from existing casino data ONLY if the casino actually has free spins
 */
function buildOffersFromExistingData(casino: CasinoToScrape): ParsedOffer[] {
  const offers: ParsedOffer[] = [];

  // Only create an offer if free_spins has a real numeric value (not "N/A")
  if (casino.free_spins && casino.free_spins !== "N/A" && casino.free_spins.trim() !== "") {
    const count = parseInt(casino.free_spins.replace(/\D/g, ""), 10);
    if (!isNaN(count) && count > 0) {
      // Determine type based on keywords in the title/description
      let offerType = "welcome";
      const combined = `${casino.bonus_title} ${casino.free_spins}`.toLowerCase();
      if (/uden\s*indbetaling|no\s*deposit/i.test(combined)) offerType = "no_deposit";
      else if (/daglig|daily/i.test(combined)) offerType = "daily";
      else if (/eksisterende|existing|loyal/i.test(combined)) offerType = "existing";

      offers.push({
        offer_title: `${casino.free_spins} Free Spins hos ${casino.name}`,
        offer_description: `${casino.name} tilbyder ${casino.free_spins} free spins som en del af deres velkomstpakke. Omsætningskrav: ${casino.wagering_requirements}.`,
        free_spins_count: count,
        min_deposit: casino.min_deposit,
        wagering_requirement: casino.wagering_requirements,
        valid_until: null,
        offer_type: offerType,
      });
    }
  }

  return offers;
}

function cleanContext(text: string): string {
  return text
    .replace(/[#*_\[\]()]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\n+/g, " ")
    .trim()
    .substring(0, 300);
}

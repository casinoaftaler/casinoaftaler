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
}

interface ParsedOffer {
  offer_title: string;
  offer_description: string;
  free_spins_count: number | null;
  min_deposit: string | null;
  wagering_requirement: string | null;
  valid_until: string | null;
  offer_type: string;
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

    // 1. Get all active casinos
    const { data: casinos, error: casinoError } = await admin
      .from("casinos")
      .select("id, name, slug, bonus_page_url, bonus_title, bonus_amount, free_spins, wagering_requirements, min_deposit")
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

            if (markdown) {
              // Parse the scraped content for free spins offers
              offers = parseOffersFromMarkdown(markdown, casino.name);
              scrapeResults.push({ casino: casino.name, method: "firecrawl", success: true });
            }
          } else {
            const errText = await scrapeResponse.text();
            console.error(`Firecrawl error for ${casino.name}: ${errText}`);
            scrapeResults.push({ casino: casino.name, method: "firecrawl", success: false, error: errText });
          }
        }

        // Method 2: Fall back to existing database data
        if (offers.length === 0) {
          offers = buildOffersFromExistingData(casino);
          scrapeResults.push({ casino: casino.name, method: "database_fallback", success: true });
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

    // 3. Deactivate old auto-scraped offers (keep manual ones)
    const { error: deactivateError } = await admin
      .from("daily_free_spins_offers")
      .update({ is_active: false })
      .eq("is_manually_added", false);

    if (deactivateError) {
      console.error("Error deactivating old offers:", deactivateError);
    }

    // 4. Insert new offers
    if (allOffers.length > 0) {
      const { error: insertError } = await admin
        .from("daily_free_spins_offers")
        .insert(allOffers);

      if (insertError) {
        console.error("Error inserting offers:", insertError);
        throw insertError;
      }
    }

    console.log(`Successfully processed ${allOffers.length} offers from ${casinos?.length || 0} casinos`);

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
 * Parse markdown content from a casino's bonus page to extract free spins offers
 */
function parseOffersFromMarkdown(markdown: string, casinoName: string): ParsedOffer[] {
  const offers: ParsedOffer[] = [];
  const lowerMd = markdown.toLowerCase();

  // Look for free spins mentions
  const freeSpinsRegex = /(\d+)\s*(?:gratis\s*)?(?:free\s*)?spins?/gi;
  const matches = [...markdown.matchAll(freeSpinsRegex)];

  if (matches.length > 0) {
    // Deduplicate by count
    const seenCounts = new Set<number>();
    
    for (const match of matches) {
      const count = parseInt(match[1], 10);
      if (count > 0 && count <= 5000 && !seenCounts.has(count)) {
        seenCounts.add(count);

        // Try to find surrounding context for the offer
        const idx = match.index || 0;
        const context = markdown.substring(Math.max(0, idx - 200), Math.min(markdown.length, idx + 200));

        // Detect offer type
        let offerType = "welcome";
        if (/uden\s*indbetaling|no\s*deposit/i.test(context)) offerType = "no_deposit";
        else if (/daglig|daily|i\s*dag/i.test(context)) offerType = "daily";
        else if (/weekend/i.test(context)) offerType = "weekend";
        else if (/vip|loyal/i.test(context)) offerType = "vip";

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

  // Also look for bonus offers without explicit free spins count
  if (offers.length === 0 && /bonus|velkomst|tilbud/i.test(lowerMd)) {
    const bonusMatch = markdown.match(/(\d+%)\s*(?:bonus|match|op\s*til)/i);
    if (bonusMatch) {
      offers.push({
        offer_title: `${bonusMatch[1]} Bonus hos ${casinoName}`,
        offer_description: `Få ${bonusMatch[1]} bonus hos ${casinoName}. Se vilkår og betingelser på casinoets hjemmeside.`,
        free_spins_count: null,
        min_deposit: null,
        wagering_requirement: null,
        valid_until: null,
        offer_type: "welcome",
      });
    }
  }

  return offers;
}

/**
 * Build offers from existing casino data in our database as fallback
 */
function buildOffersFromExistingData(casino: CasinoToScrape): ParsedOffer[] {
  const offers: ParsedOffer[] = [];

  // Parse free_spins field
  if (casino.free_spins && casino.free_spins !== "N/A") {
    const count = parseInt(casino.free_spins.replace(/\D/g, ""), 10);
    offers.push({
      offer_title: `${casino.free_spins} Free Spins hos ${casino.name}`,
      offer_description: `${casino.name} tilbyder ${casino.free_spins} free spins som en del af deres velkomstpakke. ${casino.bonus_amount ? `Derudover kan du få ${casino.bonus_amount} i bonus.` : ""} Omsætningskrav: ${casino.wagering_requirements}.`,
      free_spins_count: isNaN(count) ? null : count,
      min_deposit: casino.min_deposit,
      wagering_requirement: casino.wagering_requirements,
      valid_until: null,
      offer_type: "welcome",
    });
  }

  // Always include the main bonus offer
  if (casino.bonus_amount && casino.bonus_title) {
    offers.push({
      offer_title: `${casino.bonus_title} hos ${casino.name}`,
      offer_description: `${casino.name} tilbyder ${casino.bonus_amount}. Minimumsindbetaling: ${casino.min_deposit}. Omsætningskrav: ${casino.wagering_requirements}.`,
      free_spins_count: null,
      min_deposit: casino.min_deposit,
      wagering_requirement: casino.wagering_requirements,
      valid_until: null,
      offer_type: "welcome",
    });
  }

  return offers;
}

/**
 * Clean scraped context to create a readable description
 */
function cleanContext(text: string): string {
  return text
    .replace(/[#*_\[\]()]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\n+/g, " ")
    .trim()
    .substring(0, 300);
}

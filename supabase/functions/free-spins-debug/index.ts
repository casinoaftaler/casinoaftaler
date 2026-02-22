import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceRoleKey);

    // 1. Total casinos
    const { count: totalCasinos } = await admin
      .from("casinos")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    // 2. Casinos with website_url
    const { count: casinosWithUrl } = await admin
      .from("casinos")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
      .not("website_url", "is", null);

    // 3. Casinos with bonus_page_url
    const { count: casinosWithBonusUrl } = await admin
      .from("casinos")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
      .not("bonus_page_url", "is", null);

    // 4. Casinos with actual free_spins data
    const { count: casinosWithSpins } = await admin
      .from("casinos")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
      .not("free_spins", "is", null)
      .neq("free_spins", "N/A");

    // 5. Active campaigns in free_spin_campaigns
    const { count: activeCampaigns } = await admin
      .from("free_spin_campaigns")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    // 6. Total campaigns ever
    const { count: totalCampaigns } = await admin
      .from("free_spin_campaigns")
      .select("*", { count: "exact", head: true });

    // 7. Active daily_free_spins_offers (legacy)
    const { count: legacyActive } = await admin
      .from("daily_free_spins_offers")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    // 8. Campaign breakdown by type
    const { data: campaignsByType } = await admin
      .from("free_spin_campaigns")
      .select("offer_type")
      .eq("is_active", true);

    const typeBreakdown: Record<string, number> = {};
    for (const c of campaignsByType || []) {
      typeBreakdown[c.offer_type] = (typeBreakdown[c.offer_type] || 0) + 1;
    }

    // 9. Campaign breakdown by source
    const { data: campaignsBySource } = await admin
      .from("free_spin_campaigns")
      .select("source_type")
      .eq("is_active", true);

    const sourceBreakdown: Record<string, number> = {};
    for (const c of campaignsBySource || []) {
      sourceBreakdown[c.source_type] = (sourceBreakdown[c.source_type] || 0) + 1;
    }

    // 10. Latest scrape info
    const { data: latestCampaign } = await admin
      .from("free_spin_campaigns")
      .select("last_checked, casino_name")
      .order("last_checked", { ascending: false })
      .limit(1);

    // 11. Sample active campaigns
    const { data: sampleCampaigns } = await admin
      .from("free_spin_campaigns")
      .select("casino_name, title, spin_count, offer_type, source_type, source_url, last_checked")
      .eq("is_active", true)
      .order("spin_count", { ascending: false })
      .limit(10);

    const report = {
      timestamp: new Date().toISOString(),
      casinos: {
        total_active: totalCasinos,
        with_website_url: casinosWithUrl,
        with_bonus_page_url: casinosWithBonusUrl,
        with_free_spins_data: casinosWithSpins,
      },
      campaigns: {
        active: activeCampaigns,
        total_ever: totalCampaigns,
        legacy_active: legacyActive,
        by_type: typeBreakdown,
        by_source: sourceBreakdown,
      },
      latest_scrape: latestCampaign?.[0] || null,
      sample_active_campaigns: sampleCampaigns || [],
      diagnosis: {
        has_firecrawl: !!Deno.env.get("FIRECRAWL_API_KEY"),
        issue_no_website_urls: (casinosWithUrl || 0) === 0
          ? "CRITICAL: No casinos have website_url set. The scraper cannot crawl any sites."
          : null,
        issue_no_campaigns: (activeCampaigns || 0) === 0
          ? "No active campaigns found. Run the scraper or add manual entries."
          : null,
      },
    };

    return new Response(JSON.stringify(report, null, 2), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

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

    // 2. Casinos with .dk website_url
    const { data: casinosWithUrl } = await admin
      .from("casinos")
      .select("name, website_url")
      .eq("is_active", true)
      .not("website_url", "is", null);

    const dkDomainCasinos = (casinosWithUrl || []).filter((c) => {
      try {
        return new URL(c.website_url!).hostname.endsWith(".dk");
      } catch { return false; }
    });

    const nonDkCasinos = (casinosWithUrl || []).filter((c) => {
      try {
        return !new URL(c.website_url!).hostname.endsWith(".dk");
      } catch { return false; }
    });

    // 3. All campaigns
    const { count: totalCampaigns } = await admin
      .from("free_spin_campaigns")
      .select("*", { count: "exact", head: true });

    const { count: activeCampaigns } = await admin
      .from("free_spin_campaigns")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    // 4. Campaign breakdown
    const { data: activeCampaignData } = await admin
      .from("free_spin_campaigns")
      .select("casino_name, casino_slug, title, spin_count, offer_type, source_type, source_url, last_checked, is_active")
      .eq("is_active", true)
      .order("spin_count", { ascending: false });

    const byType: Record<string, number> = {};
    const bySource: Record<string, number> = {};
    for (const c of activeCampaignData || []) {
      byType[c.offer_type] = (byType[c.offer_type] || 0) + 1;
      bySource[c.source_type] = (bySource[c.source_type] || 0) + 1;
    }

    // 5. Legacy table
    const { count: legacyActive } = await admin
      .from("daily_free_spins_offers")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    // 6. Latest scrape
    const { data: latestCampaign } = await admin
      .from("free_spin_campaigns")
      .select("last_checked, casino_name")
      .order("last_checked", { ascending: false })
      .limit(1);

    const report = {
      timestamp: new Date().toISOString(),
      casinos: {
        total_active: totalCasinos,
        with_website_url: casinosWithUrl?.length || 0,
        dk_domain_count: dkDomainCasinos.length,
        dk_domains: dkDomainCasinos.map((c) => ({ name: c.name, url: c.website_url })),
        non_dk_domains: nonDkCasinos.map((c) => ({ name: c.name, url: c.website_url })),
      },
      campaigns: {
        total_ever: totalCampaigns,
        active: activeCampaigns,
        legacy_active: legacyActive,
        by_type: byType,
        by_source: bySource,
        shown_on_frontend: activeCampaigns,
      },
      active_campaigns: activeCampaignData || [],
      latest_scrape: latestCampaign?.[0] || null,
      diagnosis: {
        has_firecrawl: !!Deno.env.get("FIRECRAWL_API_KEY"),
        issue_no_dk_casinos: dkDomainCasinos.length === 0
          ? "CRITICAL: No casinos have .dk domains. Add website_url for Danish casinos."
          : null,
        issue_no_campaigns: (activeCampaigns || 0) === 0
          ? "No active campaigns. Run the scraper or add manual entries."
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

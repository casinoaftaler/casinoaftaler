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

    // 4. Campaign breakdown with enriched data
    const { data: activeCampaignData } = await admin
      .from("free_spin_campaigns")
      .select("casino_name, casino_slug, title, spin_count, offer_type, source_type, source_url, last_checked, is_active, game_name, required_action, spin_value, confidence_score, last_verified_at, expiry_date, dedup_key")
      .eq("is_active", true)
      .order("spin_count", { ascending: false });

    const byType: Record<string, number> = {};
    const bySource: Record<string, number> = {};
    const byConfidence: Record<string, number> = { high: 0, medium: 0, low: 0 };
    let expiredButActive = 0;
    const now = new Date();

    for (const c of activeCampaignData || []) {
      byType[c.offer_type] = (byType[c.offer_type] || 0) + 1;
      bySource[c.source_type] = (bySource[c.source_type] || 0) + 1;
      const cs = c.confidence_score || 0;
      if (cs >= 80) byConfidence.high++;
      else if (cs >= 60) byConfidence.medium++;
      else byConfidence.low++;
      if (c.expiry_date && new Date(c.expiry_date) < now) expiredButActive++;
    }

    // 5. Low confidence campaigns (hidden from public)
    const lowConfidenceCampaigns = (activeCampaignData || []).filter((c) => (c.confidence_score || 0) < 60);

    // 6. Expired campaigns
    const { count: expiredCount } = await admin
      .from("free_spin_campaigns")
      .select("*", { count: "exact", head: true })
      .eq("is_active", false);

    // 7. Legacy table
    const { count: legacyActive } = await admin
      .from("daily_free_spins_offers")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    // 8. Latest scrape
    const { data: latestCampaign } = await admin
      .from("free_spin_campaigns")
      .select("last_checked, casino_name")
      .order("last_checked", { ascending: false })
      .limit(1);

    // 9. Dedup analysis
    const dedupKeys = new Set((activeCampaignData || []).map((c) => c.dedup_key).filter(Boolean));

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
        expired: expiredCount,
        legacy_active: legacyActive,
        by_type: byType,
        by_source: bySource,
        by_confidence: byConfidence,
        shown_on_frontend: (activeCampaignData || []).filter((c) => (c.confidence_score || 0) >= 60 && c.spin_count > 0).length,
        expired_but_still_active: expiredButActive,
        unique_dedup_keys: dedupKeys.size,
      },
      low_confidence_hidden: lowConfidenceCampaigns.map((c) => ({
        casino: c.casino_name,
        title: c.title,
        confidence: c.confidence_score,
        source: c.source_type,
      })),
      active_campaigns: (activeCampaignData || []).map((c) => ({
        ...c,
        confidence_label: (c.confidence_score || 0) >= 80 ? "HIGH" : (c.confidence_score || 0) >= 60 ? "MEDIUM" : "LOW (hidden)",
      })),
      latest_scrape: latestCampaign?.[0] || null,
      diagnosis: {
        has_firecrawl: !!Deno.env.get("FIRECRAWL_API_KEY"),
        issue_no_dk_casinos: dkDomainCasinos.length === 0
          ? "CRITICAL: No casinos have .dk domains. Add website_url for Danish casinos."
          : null,
        issue_no_campaigns: (activeCampaigns || 0) === 0
          ? "No active campaigns. Run the scraper or add manual entries."
          : null,
        issue_expired_active: expiredButActive > 0
          ? `WARNING: ${expiredButActive} campaigns are expired but still marked active. Run scraper to clean up.`
          : null,
        issue_low_confidence: lowConfidenceCampaigns.length > 0
          ? `INFO: ${lowConfidenceCampaigns.length} campaigns hidden due to low confidence score (<60).`
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

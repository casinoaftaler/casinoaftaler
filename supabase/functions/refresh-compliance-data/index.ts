import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ─── String Similarity (Dice coefficient) ────────────────────────────
function bigrams(str: string): Set<string> {
  const s = str.toLowerCase().replace(/\s+/g, '');
  const bg = new Set<string>();
  for (let i = 0; i < s.length - 1; i++) bg.add(s.substring(i, i + 2));
  return bg;
}

function similarity(a: string, b: string): number {
  const bgA = bigrams(a);
  const bgB = bigrams(b);
  if (bgA.size === 0 && bgB.size === 0) return 1;
  if (bgA.size === 0 || bgB.size === 0) return 0;
  let intersection = 0;
  bgA.forEach(bg => { if (bgB.has(bg)) intersection++; });
  return (2 * intersection) / (bgA.size + bgB.size);
}

// ─── Rate limiter (delay between requests) ──────────────────────────
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Main Handler ───────────────────────────────────────────────────
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Fetch active casinos (max 30)
    const { data: casinos, error: casinoError } = await adminClient
      .from('casinos')
      .select('slug, name, bonus_amount, wagering_requirements, is_active')
      .eq('is_active', true)
      .order('position')
      .limit(30);

    if (casinoError) throw new Error(`Failed to fetch casinos: ${casinoError.message}`);

    const now = new Date().toISOString();
    let updated = 0;
    let scraped = 0;
    let failed = 0;
    const alerts: { casino: string; type: string; detail: string }[] = [];

    for (const casino of casinos || []) {
      const casinoSlug = casino.slug;
      const casinoName = casino.name;
      const scrapeUrl = `https://spillemyndigheden.dk/telefonbog?title=${encodeURIComponent(casinoName)}`;
      const requestStart = Date.now();

      let scrapeStatus: 'success' | 'failed' | 'partial' = 'failed';
      let licenseStatus: 'valid' | 'suspended' | 'revoked' | null = null;
      let licenseHolderName: string | null = null;
      let licenseTypeFound: string | null = null;
      let matchedName: string | null = null;
      let similarityScore: number | null = null;
      let logStatus = 'success';
      let logSeverity = 'info';
      let errorMessage: string | null = null;
      let rawSnippet: string | null = null;
      let responseCode: number | null = null;

      try {
        // Rate limit: 3 seconds between requests
        if (scraped > 0) {
          await sleep(3000);
        }

        // Fetch with 10s timeout
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(scrapeUrl, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'CasinoAftalerComplianceBot/1.0 (compliance-check)',
            'Accept': 'text/html,application/xhtml+xml',
            'Accept-Language': 'da-DK,da;q=0.9',
          },
        });

        clearTimeout(timeout);
        responseCode = response.status;

        if (response.status !== 200) {
          // Server blocked or error
          logStatus = response.status === 429 ? 'blocked' : 'failed';
          logSeverity = response.status === 429 ? 'high' : 'warning';
          errorMessage = `HTTP ${response.status}`;

          if (response.status === 429) {
            // Stop entire run if rate limited
            await logScrape(adminClient, {
              casino_slug: casinoSlug, casino_name: casinoName, scrape_url: scrapeUrl,
              status: 'blocked', severity: 'critical', response_code: 429,
              error_message: 'Rate limited by regulator - stopping run',
              duration_ms: Date.now() - requestStart,
            });
            failed++;
            break; // STOP entire run
          }

          // Non-200: keep existing data
          await logScrape(adminClient, {
            casino_slug: casinoSlug, casino_name: casinoName, scrape_url: scrapeUrl,
            status: logStatus, severity: logSeverity, response_code: responseCode,
            error_message: errorMessage, duration_ms: Date.now() - requestStart,
          });

          // Mark as failed but keep existing data
          await adminClient.from('casino_compliance').update({
            scrape_status: 'failed',
            license_last_scraped_at: now,
          }).eq('casino_slug', casinoSlug);

          failed++;
          scraped++;
          continue;
        }

        const html = await response.text();
        rawSnippet = html.substring(0, 500); // Store first 500 chars for debugging

        // ─── Parse HTML for license info ─────────────────────────
        // Look for the casino name in the page content
        // Spillemyndigheden's telefonbog page lists license holders
        
        // Check if any result was found
        const hasResults = html.includes('field-content') || html.includes('views-row') || html.includes('tilladelsesindehaver');
        
        if (!hasResults) {
          // No results found for this casino name
          logStatus = 'no_match';
          logSeverity = 'warning';
          errorMessage = `No results found for \"${casinoName}\" on Spillemyndigheden`;
          scrapeStatus = 'partial';
          
          await logScrape(adminClient, {
            casino_slug: casinoSlug, casino_name: casinoName, scrape_url: scrapeUrl,
            status: logStatus, severity: logSeverity, response_code: responseCode,
            error_message: errorMessage, duration_ms: Date.now() - requestStart,
          });

          await adminClient.from('casino_compliance').update({
            scrape_status: 'partial',
            license_last_scraped_at: now,
          }).eq('casino_slug', casinoSlug);

          failed++;
          scraped++;
          continue;
        }

        // Extract entity names from the HTML
        // Look for company/holder names in the content
        const nameMatches = html.match(/(?:title|name|indehaver|udbyder)[^>]*>([^<]+)</gi) || [];
        const companyNames = nameMatches
          .map(m => m.replace(/.*>/, '').trim())
          .filter(n => n.length > 2 && n.length < 100);

        // Find best match using string similarity
        let bestMatch = '';
        let bestScore = 0;
        
        for (const name of companyNames) {
          const score = similarity(casinoName, name);
          if (score > bestScore) {
            bestScore = score;
            bestMatch = name;
          }
        }

        matchedName = bestMatch || null;
        similarityScore = bestScore;

        // Check if \"onlinekasino\" or \"online kasino\" is mentioned
        const hasOnlineCasino = /online\s*kasino/i.test(html);

        if (bestScore >= 0.8 && hasOnlineCasino) {
          // Strong match - license verified
          scrapeStatus = 'success';
          licenseStatus = 'valid';
          licenseHolderName = bestMatch;
          licenseTypeFound = 'Onlinekasino';
          logStatus = 'success';
          logSeverity = 'info';
        } else if (bestScore >= 0.5) {
          // Partial match - needs manual review
          scrapeStatus = 'partial';
          logStatus = 'no_match';
          logSeverity = 'warning';
          errorMessage = `Partial match (${Math.round(bestScore * 100)}% similarity). Manual review required.`;
        } else {
          // No match
          scrapeStatus = 'partial';
          logStatus = 'no_match';
          logSeverity = 'warning';
          errorMessage = `No matching name found (best: ${bestMatch || 'none'} at ${Math.round(bestScore * 100)}%)`;
        }

      } catch (err) {
        const isTimeout = err instanceof DOMException && err.name === 'AbortError';
        logStatus = isTimeout ? 'timeout' : 'failed';
        logSeverity = 'warning';
        errorMessage = isTimeout ? 'Request timed out after 10s' : (err instanceof Error ? err.message : 'Unknown error');
        scrapeStatus = 'failed';
      }

      // Log scrape result
      await logScrape(adminClient, {
        casino_slug: casinoSlug, casino_name: casinoName, scrape_url: scrapeUrl,
        status: logStatus, severity: logSeverity, response_code: responseCode,
        error_message: errorMessage, matched_name: matchedName,
        similarity_score: similarityScore, license_type_found: licenseTypeFound,
        raw_snippet: rawSnippet, duration_ms: Date.now() - requestStart,
      });

      // ─── Update compliance record ─────────────────────────────
      // CRITICAL: Only update license fields if scrape was successful
      // Otherwise keep existing data (fail-safe)
      
      // Parse bonus data (same as before - always from DB)
      const bonusMatch = casino.bonus_amount?.match(/(\d[\d.,]*)/);
      const bonusMax = bonusMatch
        ? parseFloat(bonusMatch[1].replace('.', '').replace(',', '.'))
        : 0;
      const wagerMatch = casino.wagering_requirements?.match(/(\d+)/);
      const wagerReq = wagerMatch ? parseInt(wagerMatch[1], 10) : 0;
      const bonusCompliant = bonusMax <= 1000 && wagerReq <= 10;

      // Fetch current record to check for changes
      const { data: currentRecord } = await adminClient
        .from('casino_compliance')
        .select('license_status, license_holder_name')
        .eq('casino_slug', casinoSlug)
        .single();

      // Build update object
      const updateData: Record<string, unknown> = {
        casino_name: casinoName,
        bonus_max_amount: bonusMax,
        bonus_wager_requirement: wagerReq,
        bonus_compliant: bonusCompliant,
        bonus_source_url: `https://casinoaftaler.dk/casino-anmeldelser/${casinoSlug}`,
        bonus_verified_at: now,
        license_last_scraped_at: now,
        scrape_status: scrapeStatus,
        last_checked: now,
        source_url: 'https://spillemyndigheden.dk/tilladelsesindehavere',
      };

      if (scrapeStatus === 'success' && licenseStatus) {
        // Only update license fields on successful scrape
        updateData.license_status = licenseStatus;
        updateData.license_holder_name = licenseHolderName;
        updateData.license_source_url = scrapeUrl;
        updateData.license_verified_at = now;

        // Check for status change alerts
        if (currentRecord && currentRecord.license_status !== licenseStatus) {
          const oldStatus = currentRecord.license_status;
          if (oldStatus === 'valid' && licenseStatus !== 'valid') {
            alerts.push({
              casino: casinoName,
              type: 'LICENSE_REVOKED',
              detail: `Status changed from ${oldStatus} to ${licenseStatus}`,
            });
          }
        }
      }

      // Calculate score
      const effectiveLicenseStatus = scrapeStatus === 'success' && licenseStatus
        ? licenseStatus
        : currentRecord?.license_status || 'valid';
      const score = (effectiveLicenseStatus === 'valid' ? 50 : 0) + (bonusCompliant ? 50 : 0);
      updateData.compliance_score = score;

      const { error: upsertError } = await adminClient
        .from('casino_compliance')
        .upsert(
          { casino_slug: casinoSlug, ...updateData },
          { onConflict: 'casino_slug' }
        );

      if (upsertError) {
        console.error(`Failed to upsert ${casinoSlug}:`, upsertError.message);
        continue;
      }

      if (scrapeStatus === 'success') updated++;
      else failed++;
      scraped++;
    }

    // Log alerts (HIGH severity)
    for (const alert of alerts) {
      await logScrape(adminClient, {
        casino_slug: alert.casino,
        casino_name: alert.casino,
        scrape_url: 'system-alert',
        status: 'success',
        severity: 'critical',
        error_message: `ALERT: ${alert.type} - ${alert.detail}`,
        duration_ms: 0,
      });
    }

    const totalDuration = Date.now() - startTime;

    return new Response(
      JSON.stringify({
        success: true,
        verified: updated,
        failed,
        total: casinos?.length || 0,
        alerts: alerts.length,
        duration_ms: totalDuration,
        timestamp: now,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Compliance refresh error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// ─── Helper: Log scrape to DB ──────────────────────────────────────
async function logScrape(
  client: ReturnType<typeof createClient>,
  data: {
    casino_slug: string;
    casino_name: string;
    scrape_url: string;
    status: string;
    severity: string;
    response_code?: number | null;
    error_message?: string | null;
    matched_name?: string | null;
    similarity_score?: number | null;
    license_type_found?: string | null;
    raw_snippet?: string | null;
    duration_ms: number;
  }
) {
  const { error } = await client.from('compliance_scrape_logs').insert({
    casino_slug: data.casino_slug,
    casino_name: data.casino_name,
    scrape_url: data.scrape_url,
    status: data.status,
    severity: data.severity,
    response_code: data.response_code ?? null,
    error_message: data.error_message ?? null,
    matched_name: data.matched_name ?? null,
    similarity_score: data.similarity_score ?? null,
    license_type_found: data.license_type_found ?? null,
    raw_snippet: data.raw_snippet ?? null,
    duration_ms: data.duration_ms,
  });

  if (error) {
    console.error(`Failed to log scrape for ${data.casino_slug}:`, error.message);
  }
}

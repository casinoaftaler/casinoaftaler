import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface Finding {
  category: 'wagering' | 'bonus_cap' | 'min_deposit' | 'db_integrity';
  severity: 'error' | 'warning';
  casino?: string;
  message: string;
  current_value?: string;
  expected_value?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const userId = claimsData.claims.sub as string;

    // Check admin role
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: roleData } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Fetch all casinos
    const { data: casinos, error: casinoError } = await adminClient
      .from('casinos')
      .select('*')
      .order('position');

    if (casinoError) {
      throw new Error(`Failed to fetch casinos: ${casinoError.message}`);
    }

    const findings: Finding[] = [];

    // Danish regulatory constants
    const ALLOWED_WAGERING = ['10x', '5x'];
    const MAX_BONUS_KR = 1000;
    const EXPECTED_MIN_DEPOSIT = '100 kr.';

    for (const casino of casinos || []) {
      // Check wagering requirements
      if (!ALLOWED_WAGERING.includes(casino.wagering_requirements)) {
        findings.push({
          category: 'wagering',
          severity: 'error',
          casino: casino.name,
          message: `Ulovligt omsætningskrav: ${casino.wagering_requirements} (skal være 10x eller 5x)`,
          current_value: casino.wagering_requirements,
          expected_value: '10x',
        });
      }

      // Check bonus cap (parse number from bonus_amount)
      const bonusMatch = casino.bonus_amount?.match(/(\d[\d.,]*)/);
      if (bonusMatch) {
        const amount = parseFloat(bonusMatch[1].replace('.', '').replace(',', '.'));
        if (amount > MAX_BONUS_KR) {
          findings.push({
            category: 'bonus_cap',
            severity: 'error',
            casino: casino.name,
            message: `Bonus overstiger 1.000 kr.-grænsen: ${casino.bonus_amount}`,
            current_value: casino.bonus_amount,
            expected_value: 'Maks 1.000 kr.',
          });
        }
      }

      // Check min deposit
      if (casino.min_deposit !== EXPECTED_MIN_DEPOSIT) {
        findings.push({
          category: 'min_deposit',
          severity: 'warning',
          casino: casino.name,
          message: `Min. indbetaling afviger: "${casino.min_deposit}" (forventet: "${EXPECTED_MIN_DEPOSIT}")`,
          current_value: casino.min_deposit,
          expected_value: EXPECTED_MIN_DEPOSIT,
        });
      }

      // Check for missing critical fields
      if (!casino.affiliate_url) {
        findings.push({
          category: 'db_integrity',
          severity: 'warning',
          casino: casino.name,
          message: 'Mangler affiliate URL',
        });
      }

      if (!casino.logo_url) {
        findings.push({
          category: 'db_integrity',
          severity: 'warning',
          casino: casino.name,
          message: 'Mangler logo',
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        total_casinos: casinos?.length || 0,
        findings,
        summary: {
          errors: findings.filter(f => f.severity === 'error').length,
          warnings: findings.filter(f => f.severity === 'warning').length,
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Fact-check error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

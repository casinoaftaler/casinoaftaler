import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    const admin = createClient(supabaseUrl, serviceRoleKey);

    if (!lovableApiKey) {
      return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Find slots missing metadata (max 5 per run)
    const { data: slots, error } = await admin
      .from('slot_catalog')
      .select('id, slot_name, provider, rtp, volatility, max_potential')
      .or('volatility.is.null,max_potential.is.null')
      .order('updated_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    if (!slots || slots.length === 0) {
      return new Response(JSON.stringify({ message: 'No slots to enrich' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results: any[] = [];

    for (const slot of slots) {
      try {
        const prompt = `For the online slot machine "${slot.slot_name}"${slot.provider && slot.provider !== 'Unknown' ? ` by ${slot.provider}` : ''}:
1. What is the RTP? If available on SpilDanskNu (Danish casino), use that value. Give as a number like 96.5
2. What is the volatility level? Answer with exactly one of: Low, Medium, High, Extreme
3. What is the maximum win potential? Answer like "10,000x" or "50,000x"
4. Who is the game provider/developer? Answer with the studio name.

Return ONLY valid JSON with no extra text: {"rtp": number|null, "volatility": "Low"|"Medium"|"High"|"Extreme"|null, "max_potential": "string"|null, "provider": "string"|null}`;

        const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${lovableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'system', content: 'You are a slot machine database expert. Return ONLY valid JSON, no markdown, no explanation.' },
              { role: 'user', content: prompt },
            ],
          }),
        });

        if (!aiResponse.ok) {
          const errText = await aiResponse.text();
          console.error(`AI error for ${slot.slot_name}:`, aiResponse.status, errText);
          results.push({ slot: slot.slot_name, status: 'ai_error', code: aiResponse.status });
          continue;
        }

        const aiData = await aiResponse.json();
        const rawContent = aiData.choices?.[0]?.message?.content || '';
        
        // Extract JSON from response (handle markdown code blocks)
        const jsonMatch = rawContent.match(/\{[\s\S]*?\}/);
        if (!jsonMatch) {
          console.error(`No JSON found for ${slot.slot_name}:`, rawContent);
          results.push({ slot: slot.slot_name, status: 'parse_error' });
          continue;
        }

        const parsed = JSON.parse(jsonMatch[0]);
        
        // Build update - only fill NULL fields, never overwrite existing data
        const update: Record<string, any> = {};
        
        if (!slot.volatility && parsed.volatility) {
          update.volatility = parsed.volatility;
        }
        if (!slot.max_potential && parsed.max_potential) {
          update.max_potential = parsed.max_potential;
        }
        if (!slot.rtp && parsed.rtp && typeof parsed.rtp === 'number') {
          update.rtp = parsed.rtp;
        }
        if (slot.provider === 'Unknown' && parsed.provider) {
          update.provider = parsed.provider;
        }

        if (Object.keys(update).length > 0) {
          update.updated_at = new Date().toISOString();
          await admin
            .from('slot_catalog')
            .update(update)
            .eq('id', slot.id);
          
          results.push({ slot: slot.slot_name, status: 'enriched', fields: Object.keys(update) });
        } else {
          results.push({ slot: slot.slot_name, status: 'no_updates_needed' });
        }
      } catch (slotError) {
        console.error(`Error enriching ${slot.slot_name}:`, slotError);
        results.push({ slot: slot.slot_name, status: 'error', message: String(slotError) });
      }
    }

    return new Response(JSON.stringify({ success: true, enriched: results.length, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Enrich error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

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

    // Find slots missing metadata OR description (max 10 per run)
    const { data: slots, error } = await admin
      .from('slot_catalog')
      .select('id, slot_name, provider, rtp, volatility, max_potential, description, meta_description')
      .or('volatility.is.null,max_potential.is.null,description.is.null')
      .order('bonus_count', { ascending: false })
      .limit(10);

    if (error) throw error;
    if (!slots || slots.length === 0) {
      return new Response(JSON.stringify({ message: 'No slots to enrich' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results: any[] = [];

    for (const slot of slots) {
      try {
        const needsMetadata = !slot.volatility || !slot.max_potential;
        const needsDescription = !slot.description;

        if (!needsMetadata && !needsDescription) {
          results.push({ slot: slot.slot_name, status: 'no_updates_needed' });
          continue;
        }

        let prompt = '';
        
        if (needsMetadata && needsDescription) {
          prompt = `For the online slot machine "${slot.slot_name}"${slot.provider && slot.provider !== 'Unknown' ? ` by ${slot.provider}` : ''}:

1. RTP: If available on SpilDanskNu (Danish casino), use that value. Give as a number like 96.5
2. Volatility: Answer with exactly one of: Low, Medium, High, Extreme
3. Max win potential: Answer like "10,000x" or "50,000x"
4. Provider/developer: Answer with the studio name.
5. Description: Write a unique 300-400 word description in DANISH about this slot. Cover: theme and visual design, key game mechanics (reels, paylines, special features), bonus rounds and free spins mechanics, who the slot appeals to, and how it compares to similar slots from the same provider. Write in an informative, expert tone. Do NOT include the slot name as a heading.

Return ONLY valid JSON: {"rtp": number|null, "volatility": "Low"|"Medium"|"High"|"Extreme"|null, "max_potential": "string"|null, "provider": "string"|null, "description": "string"}`;
        } else if (needsDescription) {
          prompt = `Write a unique 300-400 word description in DANISH about the online slot machine "${slot.slot_name}"${slot.provider && slot.provider !== 'Unknown' ? ` by ${slot.provider}` : ''}.
RTP: ${slot.rtp || 'unknown'}%, Volatility: ${slot.volatility || 'unknown'}, Max win: ${slot.max_potential || 'unknown'}.

Cover: theme and visual design, key game mechanics (reels, paylines, special features), bonus rounds and free spins mechanics, who the slot appeals to, and how it compares to similar slots from the same provider. Write in an informative, expert tone. Do NOT include the slot name as a heading.

Return ONLY valid JSON: {"description": "string"}`;
        } else {
          prompt = `For the online slot machine "${slot.slot_name}"${slot.provider && slot.provider !== 'Unknown' ? ` by ${slot.provider}` : ''}:
1. RTP: number like 96.5
2. Volatility: Low, Medium, High, or Extreme
3. Max win potential: like "10,000x"
4. Provider name

Return ONLY valid JSON: {"rtp": number|null, "volatility": "Low"|"Medium"|"High"|"Extreme"|null, "max_potential": "string"|null, "provider": "string"|null}`;
        }

        const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${lovableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'system', content: 'You are a slot machine database expert writing for a Danish casino community site. Return ONLY valid JSON, no markdown, no explanation.' },
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
        
        const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          console.error(`No JSON found for ${slot.slot_name}:`, rawContent);
          results.push({ slot: slot.slot_name, status: 'parse_error' });
          continue;
        }

        const parsed = JSON.parse(jsonMatch[0]);
        
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
        if (!slot.description && parsed.description && parsed.description.length > 100) {
          update.description = parsed.description;
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

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Edge functions have ~150s timeout. Stop at 120s to return cleanly.
const MAX_RUNTIME_MS = 120_000;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

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

    // Fetch slots missing meta_description (max 500 per run to stay within timeout)
    const { data: slots, error } = await admin
      .from('slot_catalog')
      .select('id, slot_name, provider, rtp, volatility, max_potential, bonus_count, highest_x')
      .is('meta_description', null)
      .order('bonus_count', { ascending: false })
      .limit(500);

    if (error) throw error;
    if (!slots || slots.length === 0) {
      return new Response(JSON.stringify({ message: 'All slots already have meta descriptions', remaining: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing ${slots.length} slots missing meta_description`);

    const BATCH_SIZE = 25;
    let processed = 0;
    let errors = 0;
    let stoppedEarly = false;

    for (let i = 0; i < slots.length; i += BATCH_SIZE) {
      // Check time budget
      if (Date.now() - startTime > MAX_RUNTIME_MS) {
        stoppedEarly = true;
        console.log(`Stopping early at ${processed} processed (time limit)`);
        break;
      }

      const batch = slots.slice(i, i + BATCH_SIZE);
      
      const slotList = batch.map((s, idx) => {
        const parts = [`${idx + 1}. "${s.slot_name}"`];
        if (s.provider && s.provider !== 'Unknown') parts.push(`by ${s.provider}`);
        if (s.rtp) parts.push(`RTP ${s.rtp}%`);
        if (s.volatility) parts.push(`${s.volatility} vol`);
        if (s.max_potential) parts.push(`max ${s.max_potential}`);
        return parts.join(', ');
      }).join('\n');

      try {
        const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${lovableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'system', content: 'Return ONLY a raw JSON array. No markdown, no ```json, no explanation. Each object has slot_name and meta_description (120-155 chars, Danish, unique, SEO-optimized, action-oriented ending).' },
              { role: 'user', content: `Generate unique Danish SEO meta descriptions for these slots. Each 120-155 chars, mention slot name + key feature. End with CTA like "Se data her", "Tjek statistikker", "Udforsk spillet".\n\n${slotList}` },
            ],
          }),
        });

        if (!aiResponse.ok) {
          if (aiResponse.status === 429) {
            console.log('Rate limited, waiting 15s...');
            await new Promise(r => setTimeout(r, 15000));
            i -= BATCH_SIZE;
            continue;
          }
          console.error(`AI error:`, aiResponse.status);
          errors += batch.length;
          continue;
        }

        const aiData = await aiResponse.json();
        const rawContent = aiData.choices?.[0]?.message?.content || '';
        
        // Strip markdown fences if present
        const cleaned = rawContent.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        
        let parsed: any[];
        try {
          parsed = JSON.parse(cleaned);
        } catch {
          const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
          if (!jsonMatch) {
            console.error(`Parse error batch ${Math.floor(i / BATCH_SIZE)}:`, cleaned.slice(0, 100));
            errors += batch.length;
            continue;
          }
          parsed = JSON.parse(jsonMatch[0]);
        }
        
        // Bulk update
        for (const item of parsed) {
          if (!item.meta_description || item.meta_description.length < 50) continue;
          
          const matchingSlot = batch.find(s => 
            s.slot_name.toLowerCase() === item.slot_name?.toLowerCase()
          );
          
          if (matchingSlot) {
            const metaDesc = item.meta_description.length > 155 
              ? item.meta_description.slice(0, 152) + '…'
              : item.meta_description;

            const { error: updateError } = await admin
              .from('slot_catalog')
              .update({ meta_description: metaDesc, updated_at: new Date().toISOString() })
              .eq('id', matchingSlot.id);

            if (!updateError) processed++;
            else errors++;
          }
        }

        console.log(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${processed} total processed`);
        
      } catch (batchError) {
        console.error(`Batch error:`, batchError);
        errors += batch.length;
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      processed, 
      errors,
      remaining: slots.length - processed,
      stoppedEarly,
      runtime_ms: Date.now() - startTime,
      message: stoppedEarly ? 'Stopped early due to time limit. Call again to continue.' : 'Batch complete. Call again if more remain.',
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Meta description error:', error);
    return new Response(JSON.stringify({ error: error.message, processed: 0, runtime_ms: Date.now() - startTime }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

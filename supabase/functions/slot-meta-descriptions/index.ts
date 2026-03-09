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

    // Fetch ALL slots missing meta_description using batch pagination
    let allSlots: any[] = [];
    const PAGE_SIZE = 1000;
    let from = 0;
    
    while (true) {
      const { data, error } = await admin
        .from('slot_catalog')
        .select('id, slot_name, provider, rtp, volatility, max_potential, bonus_count, highest_x')
        .is('meta_description', null)
        .order('slot_name')
        .range(from, from + PAGE_SIZE - 1);

      if (error) throw error;
      if (!data || data.length === 0) break;
      allSlots = allSlots.concat(data);
      if (data.length < PAGE_SIZE) break;
      from += PAGE_SIZE;
    }

    if (allSlots.length === 0) {
      return new Response(JSON.stringify({ message: 'All slots already have meta descriptions', total: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Found ${allSlots.length} slots missing meta_description`);

    // Process in batches of 20 slots per AI call (one prompt generates 20 meta descriptions)
    const BATCH_SIZE = 20;
    let processed = 0;
    let errors = 0;

    for (let i = 0; i < allSlots.length; i += BATCH_SIZE) {
      const batch = allSlots.slice(i, i + BATCH_SIZE);
      
      const slotList = batch.map((s, idx) => {
        const parts = [`${idx + 1}. "${s.slot_name}"`];
        if (s.provider && s.provider !== 'Unknown') parts.push(`by ${s.provider}`);
        if (s.rtp) parts.push(`RTP ${s.rtp}%`);
        if (s.volatility) parts.push(`${s.volatility} volatility`);
        if (s.max_potential) parts.push(`max win ${s.max_potential}`);
        if (s.bonus_count > 0) parts.push(`tested in ${s.bonus_count} bonus hunts`);
        return parts.join(', ');
      }).join('\n');

      const prompt = `Generate unique SEO meta descriptions in DANISH for these ${batch.length} online slot machines. Each description must be 120-155 characters, compelling, mention the slot name and a unique selling point (theme, mechanic, max win, or volatility). End with an action phrase like "Se data her", "Tjek statistikker", "Udforsk spillet" etc. Vary the style.

Slots:
${slotList}

Return ONLY a valid JSON array of objects: [{"slot_name": "exact name", "meta_description": "danish text 120-155 chars"}]`;

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
              { role: 'system', content: 'You are an SEO expert writing for a Danish casino community. Return ONLY valid JSON, no markdown, no explanation.' },
              { role: 'user', content: prompt },
            ],
          }),
        });

        if (!aiResponse.ok) {
          console.error(`AI error batch ${i / BATCH_SIZE}:`, aiResponse.status);
          errors += batch.length;
          // Rate limit - wait and retry
          if (aiResponse.status === 429) {
            console.log('Rate limited, waiting 10s...');
            await new Promise(r => setTimeout(r, 10000));
            i -= BATCH_SIZE; // retry this batch
          }
          continue;
        }

        const aiData = await aiResponse.json();
        const rawContent = aiData.choices?.[0]?.message?.content || '';
        
        const jsonMatch = rawContent.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
          console.error(`No JSON array found for batch ${i / BATCH_SIZE}:`, rawContent.slice(0, 200));
          errors += batch.length;
          continue;
        }

        const parsed = JSON.parse(jsonMatch[0]);
        
        // Update each slot
        for (const item of parsed) {
          if (!item.meta_description || item.meta_description.length < 50) continue;
          
          // Find matching slot by name
          const matchingSlot = batch.find(s => 
            s.slot_name.toLowerCase() === item.slot_name?.toLowerCase()
          );
          
          if (matchingSlot) {
            // Truncate to 155 chars if needed
            const metaDesc = item.meta_description.length > 155 
              ? item.meta_description.slice(0, 152) + '…'
              : item.meta_description;

            const { error: updateError } = await admin
              .from('slot_catalog')
              .update({ meta_description: metaDesc, updated_at: new Date().toISOString() })
              .eq('id', matchingSlot.id);

            if (updateError) {
              console.error(`Update error for ${matchingSlot.slot_name}:`, updateError);
              errors++;
            } else {
              processed++;
            }
          }
        }

        console.log(`Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(allSlots.length / BATCH_SIZE)}: processed ${processed} total`);
        
        // Small delay between batches to avoid rate limiting
        if (i + BATCH_SIZE < allSlots.length) {
          await new Promise(r => setTimeout(r, 1000));
        }
      } catch (batchError) {
        console.error(`Batch error:`, batchError);
        errors += batch.length;
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      total_slots: allSlots.length,
      processed, 
      errors,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Meta description error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

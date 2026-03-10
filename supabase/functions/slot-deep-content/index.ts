import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    // Fetch slots missing deep_content (max 200 per run)
    const { data: slots, error } = await admin
      .from('slot_catalog')
      .select('id, slot_name, provider, rtp, volatility, max_potential, bonus_count, highest_x, highest_win')
      .is('deep_content', null)
      .order('bonus_count', { ascending: false })
      .limit(200);

    if (error) throw error;
    if (!slots || slots.length === 0) {
      return new Response(JSON.stringify({ message: 'All slots already have deep_content', remaining: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing ${slots.length} slots missing deep_content`);

    const BATCH_SIZE = 5; // Fewer per batch since each generates ~6 paragraphs
    let processed = 0;
    let errors = 0;
    let stoppedEarly = false;

    for (let i = 0; i < slots.length; i += BATCH_SIZE) {
      if (Date.now() - startTime > MAX_RUNTIME_MS) {
        stoppedEarly = true;
        console.log(`Stopping early at ${processed} processed (time limit)`);
        break;
      }

      const batch = slots.slice(i, i + BATCH_SIZE);

      const slotDescriptions = batch.map((s, idx) => {
        const parts: string[] = [`${idx + 1}. "${s.slot_name}"`];
        if (s.provider && s.provider !== 'Unknown') parts.push(`provider: ${s.provider}`);
        if (s.rtp) parts.push(`RTP: ${s.rtp}%`);
        if (s.volatility) parts.push(`volatilitet: ${s.volatility}`);
        if (s.max_potential) parts.push(`max win: ${s.max_potential}`);
        if (s.bonus_count > 0) parts.push(`bonus hunts: ${s.bonus_count}`);
        if (s.highest_x && s.highest_x > 0) parts.push(`højeste x: ${s.highest_x.toFixed(1)}x`);
        if (s.highest_win && s.highest_win > 0) parts.push(`højeste gevinst: ${s.highest_win} kr`);
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
              {
                role: 'system',
                content: `Du er en dansk casino-ekspert der skriver unikt SEO-indhold til spillemaskine-sider.

KRITISK: Hvert afsnit SKAL være 100% unikt for den specifikke slot. Nævn ALDRIG generiske fraser der kan genbruges. Brug slottens faktiske data (RTP, volatilitet, provider, max win, bonus hunt resultater) til at skabe helt unikke perspektiver.

Returner KUN et raw JSON array. Ingen markdown, ingen forklaring.

Hvert objekt har:
- slot_name (string)
- rtp_analysis (string, 80-150 ord, dansk) – Unik RTP-analyse baseret på slottens faktiske tal. Sammenlign med branchegennemsnit. Beregn house edge. Perspektiver det specifikt for DENNE slot.
- volatility_insight (string, 80-150 ord, dansk) – Unik volatilitets-vurdering. Beskriv hvad volatiliteten konkret betyder for DENNE slots gevinstmønster. Sammenlign med andre slots fra SAMME provider hvis muligt.
- bonus_hunt_analysis (string, 80-150 ord, dansk) – Unik bonus hunt analyse. Brug de faktiske data (antal hunts, højeste x, højeste gevinst) til at vurdere performance. Hvis ingen data, beskriv hvad man kan forvente baseret på volatiliteten.
- provider_context (string, 80-150 ord, dansk) – Unik kontekst om slottens plads i providerens portefølje. Hvad gør DENNE slot anderledes? Hvad er providerens kendetegn i forhold til dette specifikke spil?
- game_mechanics (string, 80-150 ord, dansk) – Unik beskrivelse af spillets mekanik baseret på navn, provider og volatilitet. Hvad kan spillere forvente af features, bonusrunder og gameplay?
- bankroll_advice (string, 80-150 ord, dansk) – Specifik bankroll-anbefaling for DENNE slot baseret på dens volatilitet og RTP. Konkrete tal for indsatsstørrelse og sessionsbudget.

VIGTIGT: Skriv IKKE i template-stil. Hvert afsnit skal læses som om det er skrevet specifikt og kun for denne ene slot. Varier sætningsstruktur, vinkel og tone mellem slots.`
              },
              {
                role: 'user',
                content: `Generer unikt dansk deep content for disse slots:\n\n${slotDescriptions}`
              },
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
        const cleaned = rawContent.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

        let parsed: any[];
        try {
          parsed = JSON.parse(cleaned);
        } catch {
          // Try extracting JSON array
          const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
          if (!jsonMatch) {
            console.error(`No JSON array found in batch ${Math.floor(i / BATCH_SIZE)}:`, cleaned.slice(0, 300));
            errors += batch.length;
            continue;
          }
          let fixedJson = jsonMatch[0];
          // Fix common AI JSON issues: trailing commas before ] or }
          fixedJson = fixedJson.replace(/,\s*([}\]])/g, '$1');
          // Fix single quotes to double quotes (naive but catches most)
          // Only do this if double-quote parse still fails
          try {
            parsed = JSON.parse(fixedJson);
          } catch {
            // Try replacing unescaped single quotes used as JSON delimiters
            fixedJson = fixedJson.replace(/'/g, '"');
            try {
              parsed = JSON.parse(fixedJson);
            } catch (e3) {
              console.error(`JSON parse failed batch ${Math.floor(i / BATCH_SIZE)} after fixes:`, (e3 as Error).message, fixedJson.slice(0, 300));
              errors += batch.length;
              continue;
            }
          }
        }

        for (const item of parsed) {
          if (!item.rtp_analysis || !item.volatility_insight) continue;

          const matchingSlot = batch.find(s =>
            s.slot_name.toLowerCase() === item.slot_name?.toLowerCase()
          );

          if (matchingSlot) {
            const deepContent = JSON.stringify({
              rtp_analysis: item.rtp_analysis,
              volatility_insight: item.volatility_insight,
              bonus_hunt_analysis: item.bonus_hunt_analysis,
              provider_context: item.provider_context,
              game_mechanics: item.game_mechanics,
              bankroll_advice: item.bankroll_advice,
            });

            const { error: updateError } = await admin
              .from('slot_catalog')
              .update({ deep_content: deepContent, updated_at: new Date().toISOString() })
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
    console.error('Deep content error:', error);
    return new Response(JSON.stringify({ error: error.message, processed: 0, runtime_ms: Date.now() - startTime }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

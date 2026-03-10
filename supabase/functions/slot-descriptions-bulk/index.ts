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

    const { data: slots, error } = await admin
      .from('slot_catalog')
      .select('id, slot_name, provider, rtp, volatility, max_potential, bonus_count, highest_x, highest_win')
      .is('description', null)
      .order('bonus_count', { ascending: false })
      .limit(200);

    if (error) throw error;
    if (!slots || slots.length === 0) {
      return new Response(JSON.stringify({ message: 'All slots already have descriptions', remaining: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing ${slots.length} slots missing description`);

    const BATCH_SIZE = 3;
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
        if (s.provider && s.provider !== 'Unknown') parts.push(`developer: ${s.provider}`);
        if (s.rtp) parts.push(`RTP: ${s.rtp}%`);
        if (s.volatility) parts.push(`volatilitet: ${s.volatility}`);
        if (s.max_potential) parts.push(`max win: ${s.max_potential}`);
        if (s.bonus_count > 0) parts.push(`set i ${s.bonus_count} bonus hunts`);
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
                content: `Du er en dansk casino-ekspert og skribent for SpilDanskNu, Danmarks førende casino-community. Du skriver unikke, engagerende og informative beskrivelser af spillemaskiner.

KRITISK VIGTIGT:
- Hver beskrivelse SKAL være 100% unik. INGEN genbrugelige sætninger, skabeloner eller formuleringer.
- Varier ALTID din åbningssætning. Brug ALDRIG den samme åbning to gange.
- Skriv som en erfaren anmelder der har spillet slotten hundredvis af gange.
- Brug specifik viden om providerens stil og spillets mekanik.
- Undgå AI-typiske vendinger som "I denne slot...", "Denne spillemaskine tilbyder...", "Spillere kan forvente..." som åbning.
- Varier tone: nogle slots kan beskrives poetisk, andre teknisk, andre med humor eller nostalgi.
- Hvert afsnit skal have sin egen "vinkel" og personlighed.

Returner KUN et raw JSON array. Ingen markdown, ingen forklaring.

Hvert objekt har:
- slot_name (string, præcis match)
- description (string, 300-400 ord, dansk, unik prosatekst)

Beskrivelsen skal dække:
1. Tema og visuel identitet (hvad gør det unikt visuelt?)
2. Spillets opbygning (reels, rækker, gevinstlinjer, specielle features)
3. Bonusrunder og free spins mekanik (detaljer om triggers og gameplay)
4. Hvem appellerer spillet til? (casual, highroller, feature-jægere?)
5. Sammenligning med lignende slots fra samme provider

VIGTIGST: Hver beskrivelse skal læses som om den er skrevet af en anden person med en anden skrivestil. Varier sætningslængde, ordvalg, perspektiv og tone drastisk mellem slots.`
              },
              {
                role: 'user',
                content: `Skriv unikke danske beskrivelser for disse slots:\n\n${slotDescriptions}`
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
          const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
          if (!jsonMatch) {
            console.error(`No JSON array found in batch ${Math.floor(i / BATCH_SIZE)}:`, cleaned.slice(0, 300));
            errors += batch.length;
            continue;
          }
          let fixedJson = jsonMatch[0];
          fixedJson = fixedJson.replace(/,\s*([}\]])/g, '$1');
          try {
            parsed = JSON.parse(fixedJson);
          } catch {
            fixedJson = fixedJson.replace(/'/g, '"');
            try {
              parsed = JSON.parse(fixedJson);
            } catch (e3) {
              console.error(`JSON parse failed batch ${Math.floor(i / BATCH_SIZE)}:`, (e3 as Error).message);
              errors += batch.length;
              continue;
            }
          }
        }

        for (const item of parsed) {
          if (!item.description || item.description.length < 200) continue;

          const matchingSlot = batch.find(s =>
            s.slot_name.toLowerCase() === item.slot_name?.toLowerCase()
          );

          if (matchingSlot) {
            const { error: updateError } = await admin
              .from('slot_catalog')
              .update({ description: item.description, updated_at: new Date().toISOString() })
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
    console.error('Description bulk error:', error);
    return new Response(JSON.stringify({ error: error.message, processed: 0, runtime_ms: Date.now() - startTime }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

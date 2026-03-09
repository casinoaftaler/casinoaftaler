import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DEFAULT_PROVIDERS = [
  "Pragmatic Play",
  "NetEnt",
  "Play'n GO",
  "Hacksaw Gaming",
  "Nolimit City",
  "Big Time Gaming",
  "Red Tiger",
  "ELK Studios",
  "Yggdrasil",
  "Microgaming",
  "Relax Gaming",
  "Push Gaming",
  "Thunderkick",
  "Blueprint Gaming",
  "iSoftBet",
];

interface SlotData {
  name: string;
  rtp: number | null;
  volatility: string | null;
  max_potential: string | null;
}

async function fetchSlotsForProvider(
  provider: string,
  apiKey: string
): Promise<SlotData[]> {
  const prompt = `List the 40 most popular and well-known online casino slot machines made by "${provider}".

For each slot return a JSON object with these fields:
- "name": the official slot name (English title, no provider prefix)
- "rtp": the default RTP as a number (e.g. 96.50). Use null if unknown.
- "volatility": one of "Low", "Medium", "High", or "Extreme". Use null if unknown.
- "max_potential": the maximum win potential as a string like "5000x" or "20000x". Use null if unknown.

Return ONLY a JSON array, no markdown, no explanation. Example:
[{"name":"Sweet Bonanza","rtp":96.48,"volatility":"High","max_potential":"21175x"}]`;

  const response = await fetch(
    "https://ai.gateway.lovable.dev/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "You are an expert on online casino slot machines. Return only valid JSON arrays. Be accurate with RTP values and volatility ratings.",
          },
          { role: "user", content: prompt },
        ],
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error(`AI gateway error for ${provider}: ${response.status}`, errText);
    throw new Error(`AI gateway error for ${provider}: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";

  // Extract JSON array from response (strip markdown fences if present)
  const jsonMatch = content.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    console.error(`No JSON array found in AI response for ${provider}:`, content.substring(0, 500));
    throw new Error(`Invalid AI response for ${provider}`);
  }

  const slots: SlotData[] = JSON.parse(jsonMatch[0]);
  return slots.filter((s) => s.name && typeof s.name === "string");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json().catch(() => ({}));
    const requestedProviders: string[] = body.providers || DEFAULT_PROVIDERS;
    // Allow seeding a single provider at a time for progress tracking
    const singleProvider: string | undefined = body.provider;
    const providers = singleProvider ? [singleProvider] : requestedProviders;

    const results: Record<string, { slots_processed: number; errors: string[] }> = {};

    for (const provider of providers) {
      console.log(`Seeding slots for provider: ${provider}`);
      const providerResult = { slots_processed: 0, errors: [] as string[] };

      try {
        const slots = await fetchSlotsForProvider(provider, LOVABLE_API_KEY);
        console.log(`Got ${slots.length} slots from AI for ${provider}`);

        for (const slot of slots) {
          try {
            const { error } = await supabase.rpc("upsert_slot_catalog", {
              p_slot_name: slot.name,
              p_provider: provider,
              p_rtp: slot.rtp,
              p_win: 0,
              p_multiplier: 0,
            });

            if (error) {
              console.error(`Upsert error for ${slot.name}:`, error.message);
              providerResult.errors.push(`${slot.name}: ${error.message}`);
            } else {
              providerResult.slots_processed++;
            }
          } catch (e) {
            providerResult.errors.push(`${slot.name}: ${e.message}`);
          }
        }

        // Now update volatility and max_potential for newly seeded slots
        // (upsert_slot_catalog doesn't handle these fields, so we update directly)
        for (const slot of slots) {
          if (slot.volatility || slot.max_potential) {
            const { error } = await supabase
              .from("slot_catalog")
              .update({
                volatility: slot.volatility || undefined,
                max_potential: slot.max_potential || undefined,
              })
              .ilike("slot_name", slot.name)
              .is("volatility", null); // Only update if not already set
          }
        }
      } catch (e) {
        providerResult.errors.push(`Provider-level error: ${e.message}`);
      }

      results[provider] = providerResult;
    }

    const totalProcessed = Object.values(results).reduce(
      (sum, r) => sum + r.slots_processed,
      0
    );
    const totalErrors = Object.values(results).reduce(
      (sum, r) => sum + r.errors.length,
      0
    );

    return new Response(
      JSON.stringify({
        success: true,
        total_processed: totalProcessed,
        total_errors: totalErrors,
        providers: results,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("slot-catalog-seed error:", e);
    return new Response(
      JSON.stringify({ error: e.message || "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

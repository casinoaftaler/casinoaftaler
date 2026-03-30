import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/* ── Anti-footprint: randomize structural elements ───────────── */

const SECTION_HEADINGS = [
  (name: string) => `Hvad gør ${name} unik?`,
  (name: string) => `${name} – Dybdegående performance-analyse`,
  (name: string) => `Sådan præsterer ${name} i praksis`,
  (name: string) => `Community-data afslører ${name}`,
  (name: string) => `${name}: Mellem matematik og mekanik`,
  (name: string) => `Den faktiske oplevelse med ${name}`,
  (name: string) => `Bag tallene: ${name}`,
  (name: string) => `Analyse: Er ${name} værd at spille?`,
  (name: string) => `${name} set med danske spilleres øjne`,
  (name: string) => `Performance-profil: ${name}`,
  (name: string) => `${name} i bonus hunt-laboratoriet`,
  (name: string) => `Data-drevet vurdering af ${name}`,
];

const TONE_DESCRIPTORS = [
  "Skriv som en erfaren spilleanmelder der taler direkte til læseren. Brug 'du'-form.",
  "Skriv analytisk og datadrevet. Fokuser på tal og mønstre. Undgå overflødige tillægsord.",
  "Skriv med en afslappet, community-orienteret tone. Referer til 'vi' og fællesskabet.",
  "Skriv som en matematisk kyndig journalist. Forklar mekanikker præcist men tilgængeligt.",
  "Skriv som en skeptisk tester der har set det hele. Vær ærlig om begrænsninger.",
  "Skriv med en entusiastisk men fakta-baseret tilgang. Fremhæv det der gør slotten speciel.",
];

const STRUCTURE_TEMPLATES = [
  "Start med en observation om slottens volatilitetsprofil. Derefter analyser RTP i kontekst. Afslut med community-erfaringer.",
  "Begynd med det mest overraskende datapunkt. Byg derefter kontekst. Slut med en praktisk vurdering.",
  "Åbn med en kort sammenligning med gennemsnittet. Gå derefter i dybden med de unikke egenskaber.",
  "Start med community-data (bonus hunts). Sæt derefter tallene i perspektiv med tekniske specs.",
  "Begynd med udbyderens designfilosofi. Kobl derefter til de faktiske performance-tal.",
  "Åbn med en ærlig vurdering. Underbyg derefter med konkrete datapunkter og community-resultater.",
];

const CLOSING_STYLES = [
  "Afslut med et konkret perspektiv på hvem denne slot passer til.",
  "Afslut med en bemærkning om hvad der gør denne slot anderledes end lignende titler.",
  "Lad analysen stå for sig selv – ingen eksplicit konklusion.",
  "Afslut med et datapunkt der sætter slotten i perspektiv.",
  "Rund af med en observation baseret på community-erfaringerne.",
];

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + ch;
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function buildPrompt(slot: any): string {
  const archetype = slot.content_archetype || "stats-heavy";
  const seed = hashCode(slot.slot_name + (slot.provider || ""));
  const tone = pick(TONE_DESCRIPTORS, seed);
  const structure = pick(STRUCTURE_TEMPLATES, seed + 3);
  const closing = pick(CLOSING_STYLES, seed + 7);
  const wordCount = archetype === "community-driven" ? 200 + (seed % 150) : 280 + (seed % 220);

  const dataPoints: string[] = [];
  if (slot.rtp) dataPoints.push(`RTP: ${slot.rtp}%`);
  if (slot.volatility) dataPoints.push(`Volatilitet: ${slot.volatility}`);
  if (slot.max_potential) dataPoints.push(`Max win: ${slot.max_potential}`);
  if (slot.bonus_count) dataPoints.push(`Testet i ${slot.bonus_count} bonus hunts`);
  if (slot.highest_x) dataPoints.push(`Højeste multiplikator registreret: ${slot.highest_x}x`);
  if (slot.highest_win) dataPoints.push(`Største gevinst: ${slot.highest_win} kr`);

  const focusInstruction = archetype === "community-driven"
    ? `FOKUS: Denne slot har begrænset teknisk data, men ægte community-erfaringer fra bonus hunts. Fokuser primært på de faktiske resultater fra fællesskabet – hvad der er observeret, oplevet og registreret. Hold teksten jordnær og erfaringsbaseret.`
    : `FOKUS: Denne slot har rig teknisk data OG community-erfaringer. Analyser begge dimensioner i dybden – sæt RTP, volatilitet og max win i kontekst med de faktiske bonus hunt resultater.`;

  return `Du er en dansk casino-content specialist.

OPGAVE: Skriv en UNIK analyse af spillemaskinen "${slot.slot_name}" fra ${slot.provider || "ukendt udbyder"}.

${focusInstruction}

TILGÆNGELIGE DATA:
${dataPoints.join("\n")}

TONE-INSTRUKTION: ${tone}

STRUKTUR-INSTRUKTION: ${structure}

AFSLUTNING: ${closing}

VIGTIGE REGLER:
- Skriv præcis ca. ${wordCount} ord (ikke mere, ikke mindre)
- Skriv KUN på dansk
- Brug ALDRIG generiske fraser som "denne populære slot", "spændende gameplay" eller "med sine imponerende funktioner"
- Nævn ALDRIG ordene "konklusion", "sammenfattende" eller "alt i alt"
- Brug IKKE lister eller bullet points – kun løbende tekst i afsnit
- Referer naturligt til de konkrete datapunkter
- Nævn bonus hunts og community-data specifikt – det er vores unikke data
- Inkluder INGEN H2/H3 overskrifter – kun flade afsnit
- Undgå klichéer og AI-sprog. Skriv som en rigtig person med erfaring
- Varier sætningslængde: bland korte, punchede sætninger med længere forklaringer
- Returner KUN selve teksten – ingen indledning, ingen metadata`;
}

async function enrichSlot(slot: any, apiKey: string, sb: any): Promise<{ name: string; status: string }> {
  try {
    const prompt = buildPrompt(slot);
    const seed = hashCode(slot.slot_name);
    const heading = pick(SECTION_HEADINGS, seed)(slot.slot_name);

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (aiRes.status === 429) {
      await aiRes.text();
      return { name: slot.slot_name, status: "rate-limited" };
    }

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error(`AI error for ${slot.slot_name}:`, errText);
      return { name: slot.slot_name, status: `AI error: ${aiRes.status}` };
    }

    const aiData = await aiRes.json();
    const content = aiData.choices?.[0]?.message?.content?.trim();

    if (!content || content.length < 100) {
      return { name: slot.slot_name, status: "empty/short response" };
    }

    const enrichedPayload = JSON.stringify({ heading, body: content });

    const { error: updateErr } = await sb
      .from("slot_catalog")
      .update({ enriched_analysis: enrichedPayload })
      .eq("id", slot.id);

    if (updateErr) {
      return { name: slot.slot_name, status: `DB error: ${updateErr.message}` };
    }
    return { name: slot.slot_name, status: "ok" };
  } catch (err: any) {
    return { name: slot.slot_name, status: `error: ${err.message}` };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const sb = createClient(supabaseUrl, supabaseKey);

    const { limit = 30 } = await req.json().catch(() => ({}));

    // Fetch stats-heavy AND community-driven slots without enriched_analysis
    const { data: slots, error: fetchErr } = await sb
      .from("slot_catalog")
      .select("id, slot_name, provider, rtp, volatility, max_potential, bonus_count, highest_win, highest_x, content_archetype")
      .in("content_archetype", ["stats-heavy", "community-driven"])
      .is("enriched_analysis", null)
      .order("bonus_count", { ascending: false })
      .limit(limit);

    if (fetchErr) throw fetchErr;
    if (!slots || slots.length === 0) {
      return new Response(
        JSON.stringify({ message: "Alle stats-heavy & community-driven slots er beriget!", enriched: 0, remaining: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Process in parallel batches of 5 for speed while respecting rate limits
    const CONCURRENCY = 5;
    const results: { name: string; status: string }[] = [];
    let rateLimited = false;

    for (let i = 0; i < slots.length && !rateLimited; i += CONCURRENCY) {
      const batch = slots.slice(i, i + CONCURRENCY);
      const batchResults = await Promise.all(
        batch.map(slot => enrichSlot(slot, LOVABLE_API_KEY, sb))
      );
      
      for (const r of batchResults) {
        results.push(r);
        if (r.status === "rate-limited") rateLimited = true;
      }

      // Small pause between batches
      if (i + CONCURRENCY < slots.length && !rateLimited) {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    const enriched = results.filter(r => r.status === "ok").length;

    // Count remaining
    const { count } = await sb
      .from("slot_catalog")
      .select("id", { count: "exact", head: true })
      .eq("content_archetype", "stats-heavy")
      .is("enriched_analysis", null);

    return new Response(
      JSON.stringify({ enriched, total: slots.length, remaining: count || 0, results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("slot-enrich-analysis error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

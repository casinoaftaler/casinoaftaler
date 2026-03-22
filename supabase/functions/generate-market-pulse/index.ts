import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const fourDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString();

    // 1. Fetch compliance changes
    const { data: complianceChanges } = await supabase
      .from("casino_compliance_history")
      .select("*")
      .gte("changed_at", fourDaysAgo)
      .order("changed_at", { ascending: false })
      .limit(20);

    // 2. Fetch new/updated campaigns
    const { data: campaigns } = await supabase
      .from("free_spin_campaigns")
      .select("casino_name, title, spin_count, wagering_requirement, offer_type, source_type")
      .gte("updated_at", fourDaysAgo)
      .eq("is_active", true)
      .order("updated_at", { ascending: false })
      .limit(15);

    // 3. Fetch market intelligence events
    const { data: miEvents } = await supabase
      .from("market_intelligence_events")
      .select("headline, summary, category, impact_level, casino_slug")
      .gte("published_at", fourDaysAgo)
      .eq("is_public", true)
      .order("published_at", { ascending: false })
      .limit(10);

    // If no data at all, skip
    const totalChanges = (complianceChanges?.length || 0) + (campaigns?.length || 0) + (miEvents?.length || 0);
    if (totalChanges === 0) {
      return new Response(
        JSON.stringify({ status: "skipped", reason: "No changes in last 4 days" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build data summary for AI
    const dataSummary = {
      compliance: (complianceChanges || []).map(c => ({
        casino: c.casino_slug,
        field: c.field_changed,
        old: c.old_value,
        new: c.new_value,
        type: c.change_type,
      })),
      campaigns: (campaigns || []).map(c => ({
        casino: c.casino_name,
        title: c.title,
        spins: c.spin_count,
        wagering: c.wagering_requirement,
        type: c.offer_type,
      })),
      events: (miEvents || []).map(e => ({
        headline: e.headline,
        summary: e.summary,
        category: e.category,
        impact: e.impact_level,
        casino: e.casino_slug,
      })),
    };

    // Generate article via Lovable AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const today = new Date().toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" });

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Du er en dansk casino-journalist der skriver faktabaserede markedsopdateringer for Casinoaftaler.dk. 
Skriv ALTID på flydende dansk. Brug data du får – opfind ALDRIG fakta.
Artiklen skal være 1000-1500 ord i HTML format med følgende struktur:
<p>[Indledning – 2-3 sætninger der opsummerer de vigtigste ændringer]</p>
<h2>Hvad er ændret</h2>
<p>[Konkrete ændringer fra data, brug <strong> til at fremhæve vigtige tal]</p>
<h2>Kontekst i dansk marked</h2>
<p>[Sæt ændringerne i kontekst – hvad betyder det for markedet]</p>
<h2>Konsekvenser for spillerne</h2>
<p>[Praktisk betydning for danske spillere]</p>
<h2>Top 3 berørte casinoer</h2>
<p>[List de mest berørte casinoer med korte forklaringer]</p>
<h2>FAQ</h2>
<p><strong>Hvad betyder disse ændringer?</strong><br>[Svar]</p>
<p><strong>Skal jeg skifte casino?</strong><br>[Svar]</p>
<p><strong>Er mine penge sikre?</strong><br>[Svar]</p>

VIGTIGE REGLER:
- Brug KUN data fra det vedlagte datasæt
- Nævn kun casinoer der faktisk optræder i data
- Hold en neutral, journalistisk tone
- Inkludér konkrete tal (bonus beløb, omsætningskrav, RTP etc.)`,
          },
          {
            role: "user",
            content: `Dato: ${today}\n\nHer er data fra de seneste 4 dage:\n\n${JSON.stringify(dataSummary, null, 2)}\n\nSkriv markedspuls-artiklen.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_article",
              description: "Create a market pulse article",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Article title in Danish, max 80 chars" },
                  excerpt: { type: "string", description: "Short excerpt in Danish, max 200 chars" },
                  content: { type: "string", description: "Full HTML article content" },
                  meta_title: { type: "string", description: "SEO meta title, max 60 chars" },
                  meta_description: { type: "string", description: "SEO meta description, 140-155 chars" },
                  tags: { type: "array", items: { type: "string" }, description: "3-5 relevant tags" },
                },
                required: ["title", "excerpt", "content", "meta_title", "meta_description", "tags"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "create_article" } },
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI error:", aiResponse.status, errText);
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("No tool call in AI response");
    }

    const article = JSON.parse(toolCall.function.arguments);

    // Generate slug from title
    const slug = article.title
      .toLowerCase()
      .replace(/æ/g, "ae").replace(/ø/g, "oe").replace(/å/g, "aa")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .substring(0, 60);

    // Insert as draft
    const { data: inserted, error: insertError } = await supabase
      .from("casino_news")
      .insert({
        title: article.title,
        slug: `markedspuls-${slug}`,
        excerpt: article.excerpt,
        content: article.content,
        category: "markedspuls",
        tags: article.tags,
        status: "draft",
        meta_title: article.meta_title,
        meta_description: article.meta_description,
        author_id: "system",
      })
      .select("id, slug")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error(`Failed to insert article: ${insertError.message}`);
    }

    // Touch news hub page
    await supabase
      .from("page_metadata")
      .update({ updated_at: new Date().toISOString() })
      .eq("path", "/casino-nyheder");

    return new Response(
      JSON.stringify({
        status: "created",
        article_id: inserted.id,
        slug: inserted.slug,
        data_sources: {
          compliance_changes: complianceChanges?.length || 0,
          campaigns: campaigns?.length || 0,
          market_events: miEvents?.length || 0,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("generate-market-pulse error:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

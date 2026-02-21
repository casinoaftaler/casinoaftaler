import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check how many articles were published this week (max 2)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const { count: weekCount } = await supabase
      .from("casino_news")
      .select("*", { count: "exact", head: true })
      .gte("created_at", weekAgo.toISOString());

    if ((weekCount ?? 0) >= 2) {
      return new Response(
        JSON.stringify({ success: false, message: "Max 2 artikler pr. uge nået" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check for duplicate topics in last 30 days
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);

    const { data: recentArticles } = await supabase
      .from("casino_news")
      .select("title, slug, category")
      .gte("created_at", monthAgo.toISOString());

    const recentTopics = (recentArticles || []).map((a: any) => a.title.toLowerCase()).join(", ");

    // Topics to cover
    const topicCategories = [
      "Nye licensudstedelser fra Spillemyndigheden",
      "Nye casino-lanceringer i Danmark",
      "Ændringer i betalingsmetoder (Trustly, MobilePay, MitID)",
      "Bonusvilkårsændringer hos danske casinoer",
      "Lovgivningsændringer for online gambling i Danmark",
      "Teknologitrends (VR casino, crypto, live casino innovation)",
    ];

    const randomTopic = topicCategories[Math.floor(Math.random() * topicCategories.length)];

    // Generate article using Lovable AI
    const aiResponse = await fetch(`${supabaseUrl}/functions/v1/lovable-ai`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Du er en erfaren dansk casino-journalist. Skriv en nyhedsartikel om det danske online casino-marked.

KRAV:
- Minimum 900 ord, maximum 1500 ord
- Dansk kontekst – referer til Spillemyndigheden, danske regler, dansk licens
- Professionelt sprog – IKKE generisk AI-sprog
- Ingen affiliate-links eller kommercielle CTA'er
- IKKE genbruge emner der allerede er dækket: ${recentTopics}

STRUKTUR:
- Klar intro (2-3 sætninger)
- 3-5 H2 sektioner med <h2> tags
- En sektion med titlen "Hvad betyder det for danske spillere?"
- En kort FAQ sektion med 3 spørgsmål (brug <h3> for spørgsmål)
- Brug <p>, <h2>, <h3>, <ul>, <li>, <strong> tags
- Inkluder 3-5 interne link-forslag som kommentarer: <!-- link: /casino-bonus -->

Returnér JSON med denne struktur:
{
  "title": "Artikel titel (max 60 tegn)",
  "slug": "url-venlig-slug",
  "excerpt": "2-3 sætningers resumé (max 160 tegn)",
  "content": "HTML indhold",
  "category": "en af: generelt, licenser, bonusser, betalingsmetoder, lovgivning, teknologi, nye-casinoer",
  "tags": ["tag1", "tag2"],
  "meta_title": "SEO titel (max 60 tegn)",
  "meta_description": "Meta beskrivelse (max 160 tegn)"
}`,
          },
          {
            role: "user",
            content: `Skriv en nyhedsartikel om: ${randomTopic}. Dato: ${new Date().toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" })}.`,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI generation failed:", errText);
      return new Response(
        JSON.stringify({ success: false, error: "AI generation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    // Parse JSON from AI response
    let articleData: any;
    try {
      // Extract JSON from possible markdown code blocks
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch?.[1] || jsonMatch?.[0] || content;
      articleData = JSON.parse(jsonStr);
    } catch (parseErr) {
      console.error("Failed to parse AI response:", content);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to parse AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate minimum length
    if (!articleData.content || articleData.content.length < 800) {
      return new Response(
        JSON.stringify({ success: false, error: "Generated article too short (< 800 chars)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert as DRAFT
    const { data: inserted, error: insertErr } = await supabase
      .from("casino_news")
      .insert({
        title: articleData.title,
        slug: articleData.slug,
        excerpt: articleData.excerpt,
        content: articleData.content,
        category: articleData.category || "generelt",
        tags: articleData.tags || [],
        meta_title: articleData.meta_title,
        meta_description: articleData.meta_description,
        status: "draft",
        author_id: "jonas",
      })
      .select()
      .single();

    if (insertErr) {
      console.error("Insert error:", insertErr);
      return new Response(
        JSON.stringify({ success: false, error: insertErr.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create admin notification
    await supabase.from("notifications").insert({
      title: "Ny nyhedskladde klar",
      message: `AI-genereret kladde: "${articleData.title}" er klar til review i admin-panelet.`,
    });

    console.log("Draft created:", inserted.id);

    return new Response(
      JSON.stringify({ success: true, articleId: inserted.id, title: articleData.title }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

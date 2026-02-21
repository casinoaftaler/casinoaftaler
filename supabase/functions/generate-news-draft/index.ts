import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ALLOWED_CATEGORIES = [
  "regulering",
  "betalingsteknologi",
  "markedsbevægelser",
  "juridisk",
  "teknologi-sikkerhed",
] as const;

const TOPIC_SEARCHES = [
  "Spillemyndigheden nye licenser Danmark 2026",
  "dansk online casino regulering ændringer 2026",
  "Trustly MobilePay MitID casino betalinger Danmark",
  "nye online casino lanceringer Danmark 2026",
  "dansk gambling lovgivning forbrugerbeskyttelse 2026",
  "iGaming teknologi sikkerhed AI 2026",
  "anti-hvidvask online casino Danmark",
  "online gambling markedsandel Danmark omsætning",
];

const SYSTEM_PROMPT = `Du er en erfaren dansk casino-journalist på casinoaftaler.dk.
Du skriver præcise, faktuelle nyhedsartikler om det danske online casino-marked.

🚫 STRENGE REGLER:
- INGEN hallucinationer – hvis du ikke har en verificeret kilde, SKRIV DET IKKE
- INGEN affiliate-links eller kommercielle CTA'er
- INGEN generisk AI-sprog ("i en verden hvor...", "det er vigtigt at bemærke...")
- INGEN referencer uden kildelink
- Minimum 800 ord, maximum 1500 ord

📌 GODKENDTE KATEGORIER (vælg kun én):
- regulering: Nye licenser, regulatoriske ændringer i DK/EU
- betalingsteknologi: Trustly, MitID, Pay N Play, nye betalingsudbydere
- markedsbevægelser: Casino-lanceringer, markedsandele, omsætningsrapporter
- juridisk: Lovændringer, forbrugerbeskyttelse, anti-hvidvask, ansvarligt spil
- teknologi-sikkerhed: Nye sikkerhedsforanstaltninger, AI i iGaming, databeskyttelse

📌 GODKENDTE KILDER (brug KUN disse):
- Spillemyndigheden (spillemyndigheden.dk)
- Reuters / AP
- Børsen / Finans.dk
- GamingIndustry.biz / iGamingBusiness / SBC News
- Bloomberg / Financial Times
- Danske erhvervs- eller juridiske medier
⚠️ IKKE Reddit, Twitter, blogs uden referencer, AI-scraped summaries

🧵 STRUKTUR (OBLIGATORISK):
1) Headline: [Emne] – Hvad det betyder for danske spillere i 2026 (max 60 tegn)
2) Intro: 2-3 sætninger om hvorfor dette er vigtigt
3) Body (800-1200 ord) med <h2> sektioner:
   - Hvad der skete (med kildehenvisninger)
   - Kontekst i dansk marked
   - Konsekvenser for spillerne
   - Ekspertanalyse
4) Fact Box med kildelinks som bullets
5) FAQ: 2-3 spørgsmål med faktuelle svar

Brug HTML tags: <p>, <h2>, <h3>, <ul>, <li>, <strong>, <a href="...">
Alle kildehenvisninger skal være <a href="URL" target="_blank" rel="noopener">Kildenavn</a>

Returnér UDELUKKENDE valid JSON (ingen markdown code blocks):
{
  "title": "Artikel titel (max 60 tegn)",
  "slug": "url-venlig-slug-uden-æøå",
  "excerpt": "2-3 sætningers resumé (max 160 tegn)",
  "content": "HTML indhold med kildelinks",
  "category": "en af: regulering, betalingsteknologi, markedsbevægelser, juridisk, teknologi-sikkerhed",
  "tags": ["tag1", "tag2", "tag3"],
  "meta_title": "SEO titel (max 60 tegn)",
  "meta_description": "Meta beskrivelse (max 160 tegn)",
  "sources": ["https://kilde1.dk/artikel", "https://kilde2.com/artikel"],
  "rejection_reason": null
}

Hvis du IKKE kan finde verificerbare kilder til emnet, returnér:
{
  "rejection_reason": "Ingen verificerbare kilder fundet for dette emne",
  "title": null
}`;

async function searchForSources(topic: string): Promise<string> {
  const PERPLEXITY_KEY = Deno.env.get("PERPLEXITY_API_KEY");

  if (!PERPLEXITY_KEY) {
    console.log("No Perplexity key – skipping source research");
    return "Ingen ekstern søgning tilgængelig. Basér artiklen KUN på din træningsdata og angiv at kilder skal verificeres manuelt.";
  }

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content:
              "Du er en research-assistent. Find de seneste faktuelle nyheder om det givne emne relateret til dansk online casino/gambling. Returnér kun verificerede fakta med præcise kildelinks. Fokusér på: Spillemyndigheden, Reuters, Børsen, Finans.dk, GamingIndustry.biz, iGamingBusiness, SBC News. Skriv på dansk.",
          },
          {
            role: "user",
            content: `Find de seneste nyheder og verificerbare fakta om: ${topic}. Inkludér præcise links til kilderne.`,
          },
        ],
        search_recency_filter: "month",
        search_domain_filter: [
          "spillemyndigheden.dk",
          "reuters.com",
          "borsen.dk",
          "finans.dk",
          "igamingbusiness.com",
          "sbcnews.co.uk",
          "gamblingindustry.biz",
          "bloomberg.com",
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Perplexity search failed:", errText);
      return "Søgning fejlede. Basér artiklen KUN på din træningsdata og angiv at kilder skal verificeres manuelt.";
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    const citations = data.citations || [];

    return `RESEARCH RESULTATER:\n${content}\n\nKILDER FUNDET:\n${citations.map((c: string, i: number) => `${i + 1}. ${c}`).join("\n")}`;
  } catch (err) {
    console.error("Perplexity error:", err);
    return "Søgning fejlede. Basér artiklen KUN på din træningsdata og angiv at kilder skal verificeres manuelt.";
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: "LOVABLE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check how many drafts/articles were created this week (max 2)
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

    // Get recent articles to avoid duplicate topics
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);

    const { data: recentArticles } = await supabase
      .from("casino_news")
      .select("title, slug, category")
      .gte("created_at", monthAgo.toISOString());

    const recentTopics = (recentArticles || []).map((a: any) => `"${a.title}"`).join(", ");

    // Pick a random topic to search for
    const searchQuery = TOPIC_SEARCHES[Math.floor(Math.random() * TOPIC_SEARCHES.length)];

    // Step 1: Research real sources via Perplexity (if available)
    console.log("Researching topic:", searchQuery);
    const sourceResearch = await searchForSources(searchQuery);

    // Step 2: Generate article using Lovable AI with real source data
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Dato: ${new Date().toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" })}.

EMNESØGNING: ${searchQuery}

${sourceResearch}

ALLEREDE DÆKKEDE EMNER (undgå gentagelse):
${recentTopics || "Ingen tidligere artikler"}

Skriv en nyhedsartikel baseret på ovenstående research. Brug KUN de kilder der er fundet. Hvis kilderne er utilstrækkelige, returnér rejection_reason.`,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI generation failed:", aiResponse.status, errText);

      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: "Rate limit – prøv igen om et minut" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: "Ingen AI-credits tilgængelige" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: false, error: "AI generation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    // Parse JSON from AI response
    let articleData: any;
    try {
      const jsonMatch = rawContent.match(/```json\s*([\s\S]*?)\s*```/) || rawContent.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch?.[1] || jsonMatch?.[0] || rawContent;
      articleData = JSON.parse(jsonStr);
    } catch (parseErr) {
      console.error("Failed to parse AI response:", rawContent.substring(0, 500));
      return new Response(
        JSON.stringify({ success: false, error: "AI returnerede ugyldigt format" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if AI rejected the draft
    if (articleData.rejection_reason) {
      console.log("AI rejected draft:", articleData.rejection_reason);
      return new Response(
        JSON.stringify({
          success: false,
          rejected: true,
          reason: articleData.rejection_reason,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate minimum content length
    if (!articleData.content || articleData.content.length < 800) {
      return new Response(
        JSON.stringify({ success: false, error: "Genereret artikel for kort (< 800 tegn)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate category
    const category = articleData.category || "regulering";
    if (!ALLOWED_CATEGORIES.includes(category)) {
      articleData.category = "regulering"; // fallback
    }

    // Insert as DRAFT
    const { data: inserted, error: insertErr } = await supabase
      .from("casino_news")
      .insert({
        title: articleData.title,
        slug: articleData.slug,
        excerpt: articleData.excerpt,
        content: articleData.content,
        category: articleData.category,
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
      title: "Ny nyhedskladde klar til review",
      message: `AI-genereret kladde: "${articleData.title}" – baseret på ${(articleData.sources || []).length} kilder. Klar til review i admin-panelet.`,
    });

    console.log("Draft created:", inserted.id, "Sources:", articleData.sources?.length || 0);

    return new Response(
      JSON.stringify({
        success: true,
        articleId: inserted.id,
        title: articleData.title,
        category: articleData.category,
        sources: articleData.sources || [],
      }),
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

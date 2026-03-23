import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function dataUrlToBytes(dataUrl: string): { bytes: Uint8Array; mimeType: string } {
  const [meta, base64] = dataUrl.split(",");
  const mimeMatch = meta?.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64$/);

  if (!mimeMatch || !base64) {
    throw new Error("Invalid generated image format");
  }

  const mimeType = mimeMatch[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return { bytes, mimeType };
}

function imageExtensionFromMime(mimeType: string): string {
  if (mimeType.includes("png")) return "png";
  if (mimeType.includes("webp")) return "webp";
  if (mimeType.includes("jpeg") || mimeType.includes("jpg")) return "jpg";
  return "png";
}

const MONEY_PAGE_LINKS = [
  { href: "/casino-bonus", label: "Casino bonus" },
  { href: "/free-spins-i-dag", label: "Free spins i dag" },
  { href: "/velkomstbonus", label: "Velkomstbonus" },
  { href: "/cashback-bonus", label: "Cashback bonus" },
  { href: "/reload-bonus", label: "Reload bonus" },
  { href: "/vip-program", label: "VIP program" },
  { href: "/nye-casinoer", label: "Nye casinoer" },
  { href: "/top-10-casino-online", label: "Top 10 casino online" },
  { href: "/casino-anmeldelser", label: "Casino anmeldelser" },
  { href: "/betalingsmetoder", label: "Betalingsmetoder" },
  { href: "/casino-med-mobilepay", label: "Casino med MobilePay" },
  { href: "/casino-med-trustly", label: "Casino med Trustly" },
  { href: "/ansvarligt-spil", label: "Ansvarligt spil" },
  { href: "/ordbog/omsaetningskrav", label: "Omsætningskrav" },
  { href: "/ordbog/spillemyndigheden", label: "Spillemyndigheden" },
  { href: "/casino-licenser", label: "Casino licenser" },
];

const INLINE_LINK_TARGETS = MONEY_PAGE_LINKS
  .slice(0, 9)
  .map((l) => `${l.label} → ${l.href}`)
  .join("\n");

// --- ANTI-FOOTPRINT: Structure variants ---
const STRUCTURE_VARIANTS = [
  {
    id: "A",
    sections: [
      "De vigtigste ændringer",
      "Bag om tallene",
      "Spillernes muligheder",
      "Casinoer i fokus",
    ],
  },
  {
    id: "B",
    sections: [
      "Overblik over ugen",
      "Hvad tallene viser",
      "Ekspertens perspektiv",
      "Hvem er mest berørt",
    ],
  },
  {
    id: "C",
    sections: [
      "Nye tendenser",
      "Markedsdata i dybden",
      "Hvad det betyder for dig",
      "Vindere og tabere",
    ],
  },
  {
    id: "D",
    sections: [
      "Ugens highlights",
      "Analyse af ændringerne",
      "Spillerens fordele",
      "De mest aktive casinoer",
    ],
  },
  {
    id: "E",
    sections: [
      "Hvad sker der lige nu",
      "Data og kontekst",
      "Konsekvenser i praksis",
      "Casinoer der skiller sig ud",
    ],
  },
  {
    id: "F",
    sections: [
      "Markedsudvikling",
      "Tal og tendenser",
      "Sådan påvirker det spillere",
      "Fokus på operatørerne",
    ],
  },
];

const FAQ_POOL = [
  "Hvad betyder disse ændringer for mig som spiller?",
  "Skal jeg overveje at skifte casino?",
  "Er mine penge og data sikre?",
  "Hvornår træder ændringerne i kraft?",
  "Hvilke casinoer er bedst lige nu?",
  "Hvordan finder jeg det bedste tilbud?",
  "Er omsætningskravene fair?",
  "Kan jeg kombinere flere tilbud?",
  "Hvad siger Spillemyndigheden til udviklingen?",
  "Er det sikkert at spille online i Danmark?",
  "Hvordan sammenligner jeg bonusser korrekt?",
  "Hvad bør nye spillere være opmærksomme på?",
];

function pickRandom<T>(arr: readonly T[], count: number, seed?: number): T[] {
  const shuffled = [...arr];
  let s = seed ?? Math.floor(Math.random() * 2147483647);
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = ((s * 1103515245 + 12345) & 0x7fffffff);
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function simpleHash(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function appendInternalLinksSection(html: string, slug: string): string {
  if (!html) return html;
  if (html.includes('data-enterprise-news-links="true"')) return html;

  const limit = 12;
  const offset = MONEY_PAGE_LINKS.length > 0 ? simpleHash(slug) % MONEY_PAGE_LINKS.length : 0;
  const rotated = [...MONEY_PAGE_LINKS.slice(offset), ...MONEY_PAGE_LINKS.slice(0, offset)];
  const selected = rotated.slice(0, limit);

  const listHtml = selected
    .map((link) => `<li><a href="${link.href}">${link.label}</a></li>`)
    .join("");

  return `${html}\n\n<section data-enterprise-news-links="true"><h2>Relaterede guider og anmeldelser</h2><ul>${listHtml}</ul></section>`;
}

function slugify(title: string): string {
  // Remove "markedspuls" from title to avoid double prefix
  const cleaned = title.replace(/markedspuls[:\-–—\s]*/gi, "").trim();

  const slug = cleaned
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // Limit to ~5 meaningful words (max 50 chars)
  const words = slug.split("-").slice(0, 5).join("-");
  return words.substring(0, 50).replace(/-$/, "");
}

function buildHeroImagePrompt(
  articleTitle: string,
  articleExcerpt: string,
  dataSummary: {
    campaigns: Array<{ casino: string; title: string; spins: number | null; type: string }>;
    events: Array<{ headline: string; category: string; impact: string }>;
  }
): string {
  const campaignSignals = dataSummary.campaigns
    .slice(0, 4)
    .map((c) => `${c.casino}: ${c.title} (${c.spins ?? 0} spins, ${c.type})`)
    .join(" | ");

  const eventSignals = dataSummary.events
    .slice(0, 3)
    .map((e) => `${e.headline} (${e.category}, ${e.impact})`)
    .join(" | ");

  return `Create a cinematic editorial hero image for a Danish casino market news article.

Context:
- Title: ${articleTitle}
- Excerpt: ${articleExcerpt}
- Campaign signals: ${campaignSignals || "No campaign signals"}
- Market event signals: ${eventSignals || "No market signals"}

Visual direction:
- Premium online casino atmosphere in Denmark
- Abstract slot reels, chips, subtle digital depth and motion feel
- Clear focus on competition around free spins and bonus campaigns
- Blue-indigo high-contrast palette with professional newsroom mood
- Modern, realistic, high-detail, wide composition
- No people, no faces

CRITICAL constraints:
- ABSOLUTELY NO text, NO letters, NO words, NO readable symbols
- NO logos, NO brand names, NO watermark
- NO webpage or UI mockup
- Image only, clean hero composition for article header`;
}

async function generateHeroImageDataUrl(apiKey: string, prompt: string): Promise<string> {
  const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      messages: [{ role: "user", content: prompt }],
      modalities: ["image", "text"],
    }),
  });

  if (!imageResponse.ok) {
    const imageErr = await imageResponse.text();
    console.error("Hero image generation error:", imageResponse.status, imageErr);
    throw new Error(`Hero image generation failed: ${imageResponse.status}`);
  }

  const imageData = await imageResponse.json();
  const heroDataUrl = imageData?.choices?.[0]?.message?.images?.[0]?.image_url?.url as string | undefined;

  if (!heroDataUrl) {
    throw new Error("Hero image generation returned no image");
  }

  return heroDataUrl;
}

async function imageHasReadableText(apiKey: string, imageDataUrl: string): Promise<boolean> {
  const checkResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Check if this image contains prominent overlay text such as headlines, watermarks, brand names, or readable words/sentences. Ignore normal slot symbols/icons (like fruits or number symbols on reels) and decorative graphics. Return has_text=true only when obvious typographic text is visible.",
            },
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl,
              },
            },
          ],
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "text_check",
            description: "Check whether an image contains readable text",
            parameters: {
              type: "object",
              properties: {
                has_text: { type: "boolean" },
              },
              required: ["has_text"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "text_check" } },
    }),
  });

  if (!checkResponse.ok) {
    const errText = await checkResponse.text();
    console.error("Hero image text-check error:", checkResponse.status, errText);
    throw new Error(`Hero image text-check failed: ${checkResponse.status}`);
  }

  const checkData = await checkResponse.json();
  const toolCall = checkData?.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall?.function?.arguments) {
    throw new Error("Hero image text-check returned no result");
  }

  const parsed = JSON.parse(toolCall.function.arguments);
  return Boolean(parsed?.has_text);
}

function buildSystemPrompt(
  structureVariant: typeof STRUCTURE_VARIANTS[number],
  faqQuestions: string[],
  previousArticle: { title: string; headings: string } | null
): string {
  const h2Template = structureVariant.sections
    .map((s) => `<h2>${s}</h2>\n<p>[Relevant indhold baseret på data]</p>`)
    .join("\n");

  const faqTemplate = faqQuestions
    .map((q) => `<p><strong>${q}</strong><br>[Svar baseret på data]</p>`)
    .join("\n");

  const dedupInstruction = previousArticle
    ? `\n\nDEDUPLIKERING (KRITISK):
Den seneste markedspuls-artikel havde titlen: "${previousArticle.title}"
Med følgende H2-struktur: ${previousArticle.headings}
Du SKAL bruge en HELT ANDEN vinkel, tone og opbygning. Gentag IKKE samme pointer eller formuleringer.`
    : "";

  return `Du er en dansk casino-journalist der skriver faktabaserede markedsopdateringer for Casinoaftaler.dk.
Skriv ALTID på flydende dansk. Brug data du får – opfind ALDRIG fakta.
Artiklen skal være 1000-1500 ord i HTML format med følgende struktur:

<p>[Indledning – 2-3 sætninger der opsummerer de vigtigste ændringer. Variér åbningen – brug IKKE altid "Det danske casinomarked". Start med et tal, en observation, eller en direkte konstatering.]</p>

${h2Template}

<h2>FAQ</h2>
${faqTemplate}

VIGTIGE REGLER:
- Brug KUN data fra det vedlagte datasæt
- Nævn kun casinoer der faktisk optræder i data
- Hold en neutral, journalistisk tone
- Inkludér konkrete tal (bonus beløb, omsætningskrav, RTP etc.)
- BRUG IKKE <strong> til casinonavne eller tal i brødtekst. Brug KUN <strong> i FAQ-spørgsmål og i <li> labels (fx "Velkomstbonusser:"). Artiklen skal læses naturligt uden overdreven fremhævning.
- Brug <ul>/<li> lister til at strukturere data, ikke lange tekstblokke
- Variér sætningsstrukturer – undgå at starte flere afsnit med samme ordmønster
- Brug IKKE ordene "markedspuls" eller "markedsopdatering" i overskriften

INTERNE LINKS (MEGET VIGTIGT):
- Indsæt 3-5 naturlige inline links i brødteksten til relevante sider på Casinoaftaler.dk.
- Link KUN første forekomst af hvert begreb. Varier ankerteksterne naturligt.
- Brug ALDRIG den nøjagtige sidetitel som ankertekst – brug naturlige variationer.
- Tilladt link-liste (brug href som angivet):
${INLINE_LINK_TARGETS}
- Eksempel: I stedet for "free spins tilbud", skriv <a href="/free-spins-i-dag">free spins tilbud</a>
- Indsæt IKKE links i overskrifter (<h2>) eller FAQ-spørgsmål.${dedupInstruction}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Reduced lookback: 72 hours instead of 4 days
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

    const { data: complianceChanges } = await supabase
      .from("casino_compliance_history")
      .select("*")
      .gte("changed_at", threeDaysAgo)
      .order("changed_at", { ascending: false })
      .limit(20);

    const { data: campaigns } = await supabase
      .from("free_spin_campaigns")
      .select("casino_name, title, spin_count, wagering_requirement, offer_type, source_type")
      .gte("updated_at", threeDaysAgo)
      .eq("is_active", true)
      .order("updated_at", { ascending: false })
      .limit(15);

    const { data: miEvents } = await supabase
      .from("market_intelligence_events")
      .select("headline, summary, category, impact_level, casino_slug")
      .gte("published_at", threeDaysAgo)
      .eq("is_public", true)
      .order("published_at", { ascending: false })
      .limit(10);

    const totalChanges = (complianceChanges?.length || 0) + (campaigns?.length || 0) + (miEvents?.length || 0);
    if (totalChanges === 0) {
      return new Response(
        JSON.stringify({ status: "skipped", reason: "No changes in last 3 days" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- DEDUPLICATION: Fetch previous markedspuls article ---
    const { data: previousArticles } = await supabase
      .from("casino_news")
      .select("title, content")
      .eq("category", "markedspuls")
      .order("created_at", { ascending: false })
      .limit(1);

    let previousArticle: { title: string; headings: string } | null = null;
    if (previousArticles && previousArticles.length > 0) {
      const prev = previousArticles[0];
      // Extract H2 headings from previous article
      const h2Matches = prev.content.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
      const headings = h2Matches
        .map((h: string) => h.replace(/<[^>]+>/g, "").trim())
        .join(" → ");
      previousArticle = { title: prev.title, headings };
    }

    const dataSummary = {
      compliance: (complianceChanges || []).map((c) => ({
        casino: c.casino_slug,
        field: c.field_changed,
        old: c.old_value,
        new: c.new_value,
        type: c.change_type,
      })),
      campaigns: (campaigns || []).map((c) => ({
        casino: c.casino_name,
        title: c.title,
        spins: c.spin_count,
        wagering: c.wagering_requirement,
        type: c.offer_type,
      })),
      events: (miEvents || []).map((e) => ({
        headline: e.headline,
        summary: e.summary,
        category: e.category,
        impact: e.impact_level,
        casino: e.casino_slug,
      })),
    };

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const today = new Date().toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" });

    // --- ANTI-FOOTPRINT: Pick random structure + FAQ questions ---
    // Exclude the variant used in previous article (if detectable)
    let availableVariants = STRUCTURE_VARIANTS;
    if (previousArticle) {
      availableVariants = STRUCTURE_VARIANTS.filter(
        (v) => !v.sections.some((s) => previousArticle!.headings.includes(s))
      );
      if (availableVariants.length === 0) availableVariants = STRUCTURE_VARIANTS;
    }
    const chosenVariant = availableVariants[Math.floor(Math.random() * availableVariants.length)];
    const chosenFAQs = pickRandom(FAQ_POOL, 3);

    console.log(`Anti-footprint: Using structure variant ${chosenVariant.id}, FAQs: ${chosenFAQs.join(" | ")}`);

    const systemPrompt = buildSystemPrompt(chosenVariant, chosenFAQs, previousArticle);

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
            content: systemPrompt,
          },
          {
            role: "user",
            content: `Dato: ${today}\n\nHer er data fra de seneste 3 dage:\n\n${JSON.stringify(dataSummary, null, 2)}\n\nSkriv markedspuls-artiklen.`,
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
                  title: { type: "string", description: "Article title in Danish, max 80 chars. Do NOT include 'markedspuls' in the title." },
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

    const slug = slugify(article.title);

    const heroPrompt = buildHeroImagePrompt(article.title, article.excerpt, {
      campaigns: dataSummary.campaigns,
      events: dataSummary.events,
    });

    const heroDataUrl = await generateHeroImageDataUrl(LOVABLE_API_KEY, heroPrompt);
    const hasText = await imageHasReadableText(LOVABLE_API_KEY, heroDataUrl);

    if (hasText) {
      throw new Error("Generated hero image contained readable text; article skipped to keep image quality standard");
    }

    const { bytes, mimeType } = dataUrlToBytes(heroDataUrl);
    const imageExt = imageExtensionFromMime(mimeType);
    const imagePath = `market-pulse/${new Date().toISOString().slice(0, 10)}/${slug}.${imageExt}`;

    const { error: uploadError } = await supabase.storage
      .from("news-images")
      .upload(imagePath, bytes, {
        contentType: mimeType,
        upsert: true,
        cacheControl: "31536000",
      });

    if (uploadError) {
      console.error("Hero image upload error:", uploadError);
      throw new Error(`Hero image upload failed: ${uploadError.message}`);
    }

    const { data: publicImage } = supabase.storage.from("news-images").getPublicUrl(imagePath);
    const featuredImageUrl = publicImage.publicUrl;

    const { data: inserted, error: insertError } = await supabase
      .from("casino_news")
      .insert({
        title: article.title,
        slug: `markedspuls-${slug}`,
        excerpt: article.excerpt,
        content: appendInternalLinksSection(article.content, slug),
        category: "markedspuls",
        tags: article.tags,
        status: "draft",
        meta_title: article.meta_title,
        meta_description: article.meta_description,
        author_id: "ajse",
        featured_image: featuredImageUrl,
      })
      .select("id, slug")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error(`Failed to insert article: ${insertError.message}`);
    }

    await supabase
      .from("page_metadata")
      .update({ updated_at: new Date().toISOString() })
      .eq("path", "/casino-nyheder");

    return new Response(
      JSON.stringify({
        status: "created",
        article_id: inserted.id,
        slug: inserted.slug,
        featured_image: featuredImageUrl,
        structure_variant: chosenVariant.id,
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

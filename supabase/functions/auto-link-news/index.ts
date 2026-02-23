import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/**
 * Casino name variants mapped to their review slugs.
 * Only casinos with existing review pages are included.
 */
const CASINO_VARIANTS: Record<string, string[]> = {
  betinia: ["Betinia"],
  spilleautomaten: ["Spilleautomaten"],
  campobet: ["Campobet"],
  "swift-casino": ["Swift Casino"],
  "luna-casino": ["Luna Casino"],
  spildansknu: ["SpilDanskNu", "Spil Dansk Nu"],
  leovegas: ["LeoVegas", "Leo Vegas"],
  "danske-spil": ["Danske Spil"],
  bet365: ["bet365", "Bet365"],
  "mr-green": ["Mr Green", "MrGreen", "Mr. Green"],
  unibet: ["Unibet"],
  "royal-casino": ["Royal Casino"],
  pokerstars: ["PokerStars"],
  "888casino": ["888casino", "888 Casino"],
  videoslots: ["Videoslots"],
  comeon: ["ComeOn", "Come On"],
  betano: ["Betano"],
  "stake-casino": ["Stake Casino"],
  nordicbet: ["NordicBet", "Nordic Bet"],
  bwin: ["bwin", "Bwin"],
  "mr-vegas": ["Mr Vegas", "MrVegas", "Mr. Vegas"],
  "maria-casino": ["Maria Casino"],
  getlucky: ["GetLucky", "Get Lucky"],
  spilnu: ["Spilnu", "Spil Nu"],
  "kapow-casino": ["Kapow Casino"],
  marathonbet: ["MarathonBet", "Marathon Bet"],
  expekt: ["Expekt"],
  onecasino: ["OneCasino", "One Casino"],
  casinostuen: ["Casinostuen"],
};

/**
 * Check if a position in HTML is inside an existing <a> tag, heading, or alt attribute.
 * We do this by scanning backwards for unclosed tags.
 */
function isInsideForbiddenContext(html: string, pos: number): boolean {
  const before = html.slice(0, pos);

  // Check if inside an <a ...>...</a> tag (no closing </a> after last <a)
  const lastAOpen = before.lastIndexOf("<a ");
  const lastAOpenAlt = before.lastIndexOf("<a\n");
  const lastAStart = Math.max(lastAOpen, lastAOpenAlt);
  if (lastAStart !== -1) {
    const lastAClose = before.lastIndexOf("</a>");
    if (lastAClose < lastAStart) return true; // inside an anchor
  }

  // Check if inside heading tags h1-h6
  for (let i = 1; i <= 6; i++) {
    const lastHOpen = before.lastIndexOf(`<h${i}`);
    if (lastHOpen !== -1) {
      const lastHClose = before.lastIndexOf(`</h${i}>`);
      if (lastHClose < lastHOpen) return true;
    }
  }

  // Check if inside an HTML tag attribute (e.g., alt="...", title="...")
  // Find the last '<' that hasn't been closed with '>'
  const lastTagOpen = before.lastIndexOf("<");
  if (lastTagOpen !== -1) {
    const lastTagClose = before.lastIndexOf(">");
    if (lastTagClose < lastTagOpen) return true; // inside an HTML tag
  }

  return false;
}

/**
 * Check if a link to this casino review already exists in the HTML.
 */
function hasExistingLink(html: string, slug: string): boolean {
  const reviewUrl = `/casino-anmeldelser/${slug}`;
  return html.includes(reviewUrl);
}

/**
 * Insert a single internal link for the first valid occurrence of a casino name.
 * Returns the modified HTML or null if no change was made.
 */
function insertLink(
  html: string,
  slug: string,
  variants: string[]
): string | null {
  // Skip if link already exists
  if (hasExistingLink(html, slug)) return null;

  for (const name of variants) {
    // Build regex for word-boundary match (case-insensitive)
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Use a pattern that avoids matching inside HTML tags
    const regex = new RegExp(
      `(?<=>)([^<]*?)\\b(${escaped})\\b`,
      "i"
    );

    const match = regex.exec(html);
    if (!match || match.index === undefined) continue;

    // The actual casino name position in the full string
    const fullMatchStart = match.index;
    const textBeforeName = match[1];
    const matchedName = match[2];
    const nameStart = fullMatchStart + 1 + textBeforeName.length; // +1 for the '>'

    // Verify we're not in a forbidden context
    if (isInsideForbiddenContext(html, nameStart)) continue;

    // Insert the link
    const link = `<a href="/casino-anmeldelser/${slug}">${matchedName}</a>`;
    const result =
      html.slice(0, nameStart) + link + html.slice(nameStart + matchedName.length);

    return result;
  }

  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Optional: target a specific casino slug (e.g., when a new review is published)
    let targetSlug: string | null = null;
    try {
      const body = await req.json();
      targetSlug = body?.casino_slug || null;
    } catch {
      // No body = scan all casinos
    }

    // Determine which casinos to process
    const casinosToProcess = targetSlug
      ? { [targetSlug]: CASINO_VARIANTS[targetSlug] || [] }
      : CASINO_VARIANTS;

    // Fetch all published news articles
    const { data: articles, error: fetchErr } = await supabase
      .from("casino_news")
      .select("id, content, slug, title")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (fetchErr) throw fetchErr;
    if (!articles || articles.length === 0) {
      return new Response(
        JSON.stringify({ message: "No articles found", updated: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let totalUpdated = 0;
    const changes: { articleSlug: string; linkedTo: string[] }[] = [];

    for (const article of articles) {
      let html = article.content;
      let modified = false;
      const linkedSlugs: string[] = [];

      for (const [slug, variants] of Object.entries(casinosToProcess)) {
        if (!variants || variants.length === 0) continue;

        const result = insertLink(html, slug, variants);
        if (result) {
          html = result;
          modified = true;
          linkedSlugs.push(slug);
        }
      }

      if (modified) {
        // Update the article content and updated_at (but NOT published_at)
        const { error: updateErr } = await supabase
          .from("casino_news")
          .update({
            content: html,
            updated_at: new Date().toISOString(),
          })
          .eq("id", article.id);

        if (updateErr) {
          console.error(`Failed to update article ${article.slug}:`, updateErr);
          continue;
        }

        totalUpdated++;
        changes.push({ articleSlug: article.slug, linkedTo: linkedSlugs });
        console.log(
          `Updated article "${article.slug}": linked to [${linkedSlugs.join(", ")}]`
        );
      }
    }

    const summary = {
      message: "Auto-linking complete",
      articlesScanned: articles.length,
      articlesUpdated: totalUpdated,
      changes,
      timestamp: new Date().toISOString(),
    };

    console.log(JSON.stringify(summary));

    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Auto-link error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

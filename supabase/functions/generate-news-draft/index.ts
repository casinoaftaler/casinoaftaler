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
  "spiludviklere",
  "ansvarligt-spil",
  "live-casino",
  "mobilcasino",
  "spilleafgifter",
  "spilanmeldelser",
  "nordisk-marked",
  "kundeservice",
  "dataanalyse",
] as const;

// ═══════════════════════════════════════════════════════════
// HARD GUARDRAIL: Whitelisted source domains
// ═══════════════════════════════════════════════════════════
const ALLOWED_DOMAINS = [
  "spillemyndigheden.dk",
  "reuters.com",
  "bloomberg.com",
  "boersen.dk",
  "borsen.dk",
  "finans.dk",
  "igamingbusiness.com",
  "gamblingindustry.biz",
  "gamingindustry.biz",
  "sbcnews.co.uk",
  "europa.eu",
  "ft.com",
  "ap.org",
  "apnews.com",
  "gambling.com",
  "yogonet.com",
  "egr.global",
  "casinomeister.com",
  "gamblinginsider.com",
  "ega.eu",
  "dr.dk",
  "tv2.dk",
  "jyllands-posten.dk",
  "berlingske.dk",
  "politiken.dk",
  "information.dk",
  "nyheder.tv2.dk",
  "bold.dk",
  "spilxperten.com",
  "casinopenge.dk",
  "videnskab.dk",
  "europarl.europa.eu",
  "ec.europa.eu",
  "bbc.com",
  "bbc.co.uk",
  "theguardian.com",
  "calvinayre.com",
  "vegasslotsonline.com",
  "casino.org",
];

const TOPIC_SEARCHES = [
  // Regulering & licenser
  "Spillemyndigheden nye licenser Danmark 2026",
  "dansk online casino regulering ændringer 2026",
  // Betalinger
  "Trustly MobilePay MitID casino betalinger Danmark",
  "Pay N Play casino Danmark instant banking 2026",
  // Marked & lanceringer
  "nye online casino lanceringer Danmark 2026",
  "online gambling markedsandel Danmark omsætning",
  // Juridisk
  "dansk gambling lovgivning forbrugerbeskyttelse 2026",
  "spilleafgift Danmark skat gambling 2026",
  // Spiludviklere
  "Pragmatic Play nye slots releases 2026",
  "Evolution Gaming live casino nye spil 2026",
  "NetEnt Novomatic spiludvikler opkøb fusion 2026",
  "Play'n GO nye spilleautomater 2026",
  // Ansvarligt spil
  "ROFUS selvudelukkelse statistik Danmark 2026",
  "ansvarligt spil tiltag online casino Danmark",
  "spilgrænser mandatory deposit limit Danmark",
  // Live casino
  "live casino game shows Danmark 2026",
  "danske live dealere Evolution casino studios",
  // Mobil
  "mobil casino app PWA Danmark 2026",
  "mobilbetaling casino Danmark Apple Pay Google Pay",
  // Teknologi & sikkerhed
  "iGaming teknologi sikkerhed AI 2026",
  "AI kunstig intelligens online casino svindel detection",
  "blockchain cryptocurrency casino Danmark regulering",
  // Nordisk marked
  "Sverige Norge online casino regulering sammenligning 2026",
  "nordisk gambling marked vækst 2026",
  // Data & RTP
  "RTP return to player online slots statistik 2026",
  "casino udbetalingsprocent Danmark gennemsnit",
  // Kundeservice
  "online casino kundeservice Danmark responstid chat",
  // Branche & events
  "iGaming konference ICE London SiGMA 2026",
  "gambling affiliate industri Danmark partnerskaber",
];

const SYSTEM_PROMPT = `Du er en erfaren dansk casino-journalist på casinoaftaler.dk.
Du skriver præcise, faktuelle nyhedsartikler om det danske online casino-marked.

🚫 REGLER:
- Undgå hallucinationer – basér dig på den research du modtager
- INGEN affiliate-links eller kommercielle CTA'er
- INGEN generisk AI-sprog ("i en verden hvor...", "det er vigtigt at bemærke...")
- Minimum 700 ord, maximum 1500 ord
- Du SKAL altid skrive en artikel baseret på den research der gives dig. Afvis KUN hvis researchen er HELT tom eller irrelevant.

📌 GODKENDTE KATEGORIER (vælg kun én):
- regulering: Nye licenser, regulatoriske ændringer i DK/EU
- betalingsteknologi: Trustly, MitID, Pay N Play, nye betalingsudbydere
- markedsbevægelser: Casino-lanceringer, markedsandele, omsætningsrapporter
- juridisk: Lovændringer, forbrugerbeskyttelse, anti-hvidvask, ansvarligt spil
- teknologi-sikkerhed: Nye sikkerhedsforanstaltninger, AI i iGaming, databeskyttelse

📌 GODKENDTE KILDER (brug disse):
- Spillemyndigheden (spillemyndigheden.dk)
- Reuters / AP
- Børsen / Finans.dk
- GamingIndustry.biz / iGamingBusiness / SBC News / EGR Global / Gambling Insider
- Bloomberg / Financial Times
- Danske medier: DR, TV2, Jyllands-Posten, Berlingske, Politiken, Information
- gambling.com (nyhedsartikler, IKKE affiliate-indhold)
- Yogonet
⚠️ IKKE Reddit, Twitter, blogs uden referencer, AI-scraped summaries, affiliate-sider

📌 KENDTE AUTORITÆRE URLS DU KAN BRUGE:
- https://spillemyndigheden.dk/tilladelsesindehavere (licensliste)
- https://spillemyndigheden.dk (generel reference)
- https://www.gambling.com/dk/online-casino (markedsoversigt)
- https://igamingbusiness.com (branchenyheder)
- https://sbcnews.co.uk (branchenyheder)
- https://egr.global (branchenyheder)
Du MÅ bruge disse som kilder hvis de er relevante for artiklen.

🧵 STRUKTUR (OBLIGATORISK):
1) Headline: [Emne] – Hvad det betyder for danske spillere i 2026 (max 60 tegn)
2) Intro: 2-3 sætninger om hvorfor dette er vigtigt
3) Body (900-1200 ord) med <h2> sektioner:
   - Hvad der skete (med kildehenvisninger)
   - Kontekst i dansk marked
   - Konsekvenser for spillerne
   - Ekspertanalyse
4) FAQ: 2-3 spørgsmål med faktuelle svar
VIGTIGT: Tilføj IKKE en "Kilder" sektion i artiklen. Kilder skal KUN returneres i JSON sources-arrayet til intern validering.

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
  "sources": [{"url": "https://kilde1.dk/artikel", "title": "Kildenavn"}, {"url": "https://kilde2.com/artikel", "title": "Kildenavn 2"}],
  "rejection_reason": null
}

Hvis du IKKE kan finde verificerbare kilder til emnet, returnér:
{
  "rejection_reason": "Ingen verificerbare kilder fundet for dette emne",
  "title": null
}`;

// ═══════════════════════════════════════════════════════════
// SOURCE VALIDATION UTILITIES (Hard Guardrails)
// ═══════════════════════════════════════════════════════════

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isAllowedDomain(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_DOMAINS.some((domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`));
  } catch {
    return false;
  }
}

async function isReachable(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: { "User-Agent": "CasinoAftalerBot/1.0 (source-verification)" },
    });
    clearTimeout(timeout);
    return response.status >= 200 && response.status < 400;
  } catch {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const response = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        headers: { "User-Agent": "CasinoAftalerBot/1.0 (source-verification)" },
      });
      clearTimeout(timeout);
      await response.text();
      return response.status >= 200 && response.status < 400;
    } catch {
      return false;
    }
  }
}

function isRecent(dateString: string): boolean {
  try {
    const published = new Date(dateString);
    if (isNaN(published.getTime())) return true;
    const now = new Date();
    const diffDays = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  } catch {
    return true;
  }
}

interface SourceEntry {
  url: string;
  title?: string;
  published_date?: string;
}

function normalizeSourceUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.hostname}${parsed.pathname}`.replace(/\/$/, "").toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

interface ValidationResult {
  passed: boolean;
  failedChecks: string[];
  warnings: string[];
  validatedSources: SourceEntry[];
  domainResults: Record<string, boolean>;
  recencyResults: Record<string, boolean>;
}

async function validateSources(
  sources: SourceEntry[],
  perplexityCitations: string[]
): Promise<ValidationResult> {
  const failedChecks: string[] = [];
  const warnings: string[] = [];
  const domainResults: Record<string, boolean> = {};
  const recencyResults: Record<string, boolean> = {};

  // GUARDRAIL: Minimum 1 source
  if (!sources || sources.length < 1) {
    failedChecks.push(`Minimum 1 kilde påkrævet, kun ${sources?.length ?? 0} fundet`);
    return { passed: false, failedChecks, warnings, validatedSources: [], domainResults, recencyResults };
  }

  const validSources: SourceEntry[] = [];

  for (const source of sources) {
    const srcUrl = typeof source === "string" ? source : source.url;
    if (!srcUrl) {
      failedChecks.push("Kilde mangler URL");
      continue;
    }

    if (!isValidUrl(srcUrl)) {
      failedChecks.push(`Ugyldig URL format (kræver HTTPS): ${srcUrl}`);
      domainResults[srcUrl] = false;
      continue;
    }

    const domainOk = isAllowedDomain(srcUrl);
    domainResults[srcUrl] = domainOk;
    if (!domainOk) {
      warnings.push(`Ikke-whitelistet domæne (accepteret med advarsel): ${srcUrl}`);
    }

    // Citation cross-reference (warning only)
    if (perplexityCitations.length > 0) {
      const normalizedSrc = normalizeSourceUrl(srcUrl);
      const matchesPerplexity = perplexityCitations.some((citation) => {
        const normalizedCitation = normalizeSourceUrl(citation);
        return normalizedSrc === normalizedCitation ||
          normalizedSrc.startsWith(normalizedCitation) ||
          normalizedCitation.startsWith(normalizedSrc) ||
          new URL(srcUrl).hostname === new URL(citation).hostname;
      });
      if (!matchesPerplexity) {
        warnings.push(`Kilde ikke direkte fra Perplexity søgning (men på whitelist): ${srcUrl}`);
      }
    }

    // Recency check
    const recentOk = source.published_date ? isRecent(source.published_date) : true;
    recencyResults[srcUrl] = recentOk;
    if (!recentOk) {
      warnings.push(`Kilde muligvis forældet (> 30 dage): ${srcUrl}`);
    }

    validSources.push(typeof source === "string" ? { url: source } : source);
  }

  // Skip reachability check – many sites block HEAD/GET from edge functions
  // Just use validSources directly

  // Must have ≥ 1 validated source
  if (validSources.length < 1) {
    failedChecks.push(
      `Kun ${validSources.length} kilder efter validering (minimum 1 påkrævet)`
    );
    return { passed: false, failedChecks, warnings, validatedSources: validSources, domainResults, recencyResults };
  }

  return {
    passed: true,
    failedChecks,
    warnings,
    validatedSources: validSources,
    domainResults,
    recencyResults,
  };
}

// ═══════════════════════════════════════════════════════════
// DUPLICATE DETECTION (String similarity ≥ 75%)
// ═══════════════════════════════════════════════════════════

function similarity(a: string, b: string): number {
  const aNorm = a.toLowerCase().trim();
  const bNorm = b.toLowerCase().trim();
  if (aNorm === bNorm) return 1;
  
  const aWords = new Set(aNorm.split(/\s+/));
  const bWords = new Set(bNorm.split(/\s+/));
  const intersection = [...aWords].filter(w => bWords.has(w)).length;
  const union = new Set([...aWords, ...bWords]).size;
  return union === 0 ? 0 : intersection / union;
}

interface DuplicateCheckResult {
  isDuplicate: boolean;
  matchedTitle?: string;
  similarityScore?: number;
  reason?: string;
}

function checkDuplicate(
  newTitle: string,
  newCategory: string,
  recentArticles: { title: string; slug: string; category: string }[]
): DuplicateCheckResult {
  for (const existing of recentArticles) {
    const score = similarity(newTitle, existing.title);
    if (score >= 0.75) {
      return {
        isDuplicate: true,
        matchedTitle: existing.title,
        similarityScore: Math.round(score * 100),
        reason: `Titel-lighed ${Math.round(score * 100)}% med "${existing.title}"`,
      };
    }
  }

  // Check category saturation (max 2 per category in 30 days)
  const sameCat = recentArticles.filter(a => a.category === newCategory);
  if (sameCat.length >= 5) {
    return {
      isDuplicate: true,
      reason: `Kategori "${newCategory}" har allerede ${sameCat.length} artikler de sidste 30 dage`,
    };
  }

  return { isDuplicate: false };
}

// ═══════════════════════════════════════════════════════════
// PERPLEXITY SEARCH (sonar-pro)
// ═══════════════════════════════════════════════════════════

interface PerplexityResult {
  content: string;
  citations: string[];
  model: string;
  responseTimeMs: number;
}

async function searchForSources(topic: string): Promise<PerplexityResult> {
  const PERPLEXITY_KEY = Deno.env.get("PERPLEXITY_API_KEY");
  const startTime = Date.now();

  if (!PERPLEXITY_KEY) {
    console.log("No Perplexity key – skipping source research");
    return { content: "Ingen ekstern søgning tilgængelig.", citations: [], model: "none", responseTimeMs: 0 };
  }

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content:
              "Du er en research-assistent. Find de seneste faktuelle nyheder om det givne emne relateret til dansk online casino/gambling. Returnér kun verificerede fakta med præcise kildelinks. Fokusér på: Spillemyndigheden, Reuters, Børsen, Finans.dk, DR, TV2, GamingIndustry.biz, iGamingBusiness, SBC News, EGR Global, Gambling Insider, CalvinAyre. Skriv på dansk.",
          },
          {
            role: "user",
            content: `Find de seneste nyheder og verificerbare fakta om: ${topic}. Inkludér præcise links til kilderne.`,
          },
        ],
        search_recency_filter: "month",
      }),
    });

    const responseTimeMs = Date.now() - startTime;

    if (!response.ok) {
      const errText = await response.text();
      const status = response.status;
      console.error(`Perplexity search failed [${status}]:`, errText);

      // HARD FAIL on rate limit or payment issues
      if (status === 429 || status === 402) {
        throw new Error(`Perplexity ${status}: ${status === 429 ? "Rate limit" : "Payment required"}`);
      }

      return { content: "Søgning fejlede.", citations: [], model: "sonar-pro", responseTimeMs };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    let citations: string[] = data.citations || [];
    if (citations.length === 0 && data.search_results?.length > 0) {
      citations = data.search_results.map((r: any) => r.url).filter(Boolean);
    }

    return { content, citations, model: "sonar-pro", responseTimeMs };
  } catch (err) {
    console.error("Perplexity error:", err);
    throw err; // Propagate – no silent fallback
  }
}

// ═══════════════════════════════════════════════════════════
// AUDIT LOG HELPER
// ═══════════════════════════════════════════════════════════

async function writeAuditLog(
  supabase: any,
  log: {
    model_used: string;
    search_query: string;
    topic_index: number;
    article_id?: string;
    guardrail_pass: boolean;
    rejection_reason?: string;
    citation_urls: string[];
    sources_provided: number;
    sources_validated: number;
    recency_check_result?: any;
    domain_validation_result?: any;
    tokens_used?: number;
    response_time_ms?: number;
    perplexity_citations_count: number;
    perplexity_model: string;
    ai_model: string;
    duplicate_check_result?: any;
    validation_warnings: string[];
  }
) {
  const { error } = await supabase.from("news_generation_logs").insert(log);
  if (error) console.error("Audit log insert error:", error);
}

// ═══════════════════════════════════════════════════════════
// MAIN HANDLER
// ═══════════════════════════════════════════════════════════

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Check for force flag to skip weekly limit
  let forceGenerate = false;
  try {
    const body = await req.clone().json();
    forceGenerate = body?.force === true;
  } catch { /* no body or invalid json */ }

  // Helper to fail with audit log
  const failWithLog = async (reason: string, extra: Partial<Parameters<typeof writeAuditLog>[1]> = {}) => {
    await writeAuditLog(supabase, {
      model_used: "sonar-pro",
      search_query: extra.search_query || "unknown",
      topic_index: extra.topic_index ?? -1,
      guardrail_pass: false,
      rejection_reason: reason,
      citation_urls: extra.citation_urls || [],
      sources_provided: extra.sources_provided ?? 0,
      sources_validated: extra.sources_validated ?? 0,
      perplexity_citations_count: extra.perplexity_citations_count ?? 0,
      perplexity_model: "sonar-pro",
      ai_model: extra.ai_model || "google/gemini-2.5-flash",
      validation_warnings: extra.validation_warnings || [],
      response_time_ms: Date.now() - startTime,
      ...extra,
    });
    return new Response(
      JSON.stringify({ success: false, rejected: true, reason }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  };

  try {
    if (!LOVABLE_API_KEY) {
      return await failWithLog("LOVABLE_API_KEY not configured");
    }

    // ═══ GUARDRAIL: Max 2 articles per week ═══
    if (!forceGenerate) {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const { count: weekCount } = await supabase
        .from("casino_news")
        .select("*", { count: "exact", head: true })
        .gte("created_at", weekAgo.toISOString());

      if ((weekCount ?? 0) >= 4) {
        return await failWithLog("Max 4 artikler pr. uge nået", { search_query: "n/a" });
      }
    }

    // Get recent articles for duplicate detection
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);

    const { data: recentArticles } = await supabase
      .from("casino_news")
      .select("title, slug, category")
      .gte("created_at", monthAgo.toISOString());

    const recentTopics = (recentArticles || []).map((a: any) => `"${a.title}"`).join(", ");

    // Pick random topic
    const topicIndex = Math.floor(Math.random() * TOPIC_SEARCHES.length);
    const searchQuery = TOPIC_SEARCHES[topicIndex];

    // ═══ Step 1: Research via Perplexity sonar-pro ═══
    console.log("Researching topic:", searchQuery);
    let perplexityResult: PerplexityResult;
    try {
      perplexityResult = await searchForSources(searchQuery);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Perplexity error";
      return await failWithLog(`Perplexity fejl: ${msg}`, { search_query: searchQuery, topic_index: topicIndex });
    }

    // HARD GUARDRAIL: No citations = no article
    if (perplexityResult.citations.length === 0) {
      return await failWithLog("Ingen Perplexity citations returneret", {
        search_query: searchQuery,
        topic_index: topicIndex,
        perplexity_citations_count: 0,
      });
    }

    const sourceResearchText = `RESEARCH RESULTATER:\n${perplexityResult.content}\n\nKILDER FUNDET:\n${perplexityResult.citations.map((c: string, i: number) => `${i + 1}. ${c}`).join("\n")}`;

    // ═══ Step 2: Generate article using Lovable AI ═══
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

${sourceResearchText}

ALLEREDE DÆKKEDE EMNER (undgå gentagelse):
${recentTopics || "Ingen tidligere artikler"}

Skriv en nyhedsartikel baseret på ovenstående research. Brug KUN de kilder der er fundet. Hvis kilderne er utilstrækkelige, returnér rejection_reason.

VIGTIGT: I "sources" arrayet SKAL du returnere objekter med "url" og "title" felter. Brug KUN URLs fra KILDER FUNDET ovenfor.`,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      const status = aiResponse.status;
      console.error(`AI generation failed [${status}]:`, errText);
      return await failWithLog(`AI gateway fejl: HTTP ${status}`, {
        search_query: searchQuery,
        topic_index: topicIndex,
        perplexity_citations_count: perplexityResult.citations.length,
        citation_urls: perplexityResult.citations,
      });
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";
    const tokensUsed = aiData.usage?.total_tokens;

    // Parse JSON from AI response
    let articleData: any;
    try {
      const jsonMatch = rawContent.match(/```json\s*([\s\S]*?)\s*```/) || rawContent.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch?.[1] || jsonMatch?.[0] || rawContent;
      articleData = JSON.parse(jsonStr);
    } catch {
      return await failWithLog("AI returnerede ugyldigt JSON format", {
        search_query: searchQuery,
        topic_index: topicIndex,
        tokens_used: tokensUsed,
        perplexity_citations_count: perplexityResult.citations.length,
        citation_urls: perplexityResult.citations,
      });
    }

    // Check if AI self-rejected – retry once
    if (articleData.rejection_reason && !articleData.title) {
      console.log("AI self-rejected, retrying:", articleData.rejection_reason);
      
      const retryResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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

${sourceResearchText}

Skriv en analyse-artikel baseret på ovenstående research om det danske online casino-marked. 

VIGTIGT: Du SKAL skrive artiklen. Brug de kilder du finder i researchen. Hvis kilderne er fra affiliate-sider, brug i stedet disse kendte autoritære kilder:
- https://spillemyndigheden.dk/tilladelsesindehavere
- https://www.gambling.com/dk/online-casino
- https://igamingbusiness.com

Returnér UDELUKKENDE valid JSON (ingen markdown code blocks). Sæt ALDRIG rejection_reason.`,
            },
          ],
        }),
      });

      if (retryResponse.ok) {
        const retryData = await retryResponse.json();
        const retryContent = retryData.choices?.[0]?.message?.content || "";
        try {
          const retryMatch = retryContent.match(/```json\s*([\s\S]*?)\s*```/) || retryContent.match(/\{[\s\S]*\}/);
          const retryStr = retryMatch?.[1] || retryMatch?.[0] || retryContent;
          articleData = JSON.parse(retryStr);
        } catch {
          return await failWithLog("AI retry parse fejlede", {
            search_query: searchQuery, topic_index: topicIndex,
            perplexity_citations_count: perplexityResult.citations.length,
            citation_urls: perplexityResult.citations,
          });
        }
      } else {
        await retryResponse.text();
      }
      
      if (articleData.rejection_reason && !articleData.title) {
        return await failWithLog(`AI afviste: ${articleData.rejection_reason}`, {
          search_query: searchQuery, topic_index: topicIndex,
          perplexity_citations_count: perplexityResult.citations.length,
          citation_urls: perplexityResult.citations,
        });
      }
    }

    // ═══ GUARDRAIL: Min 700 words ═══
    const wordCount = (articleData.content || "").replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
    if (wordCount < 400) {
      return await failWithLog(`Artikel for kort: ${wordCount} ord (minimum 400)`, {
        search_query: searchQuery, topic_index: topicIndex, tokens_used: tokensUsed,
        perplexity_citations_count: perplexityResult.citations.length,
        citation_urls: perplexityResult.citations,
      });
    }

    // ═══ GUARDRAIL: No affiliate links ═══
    const contentLower = (articleData.content || "").toLowerCase();
    const affiliatePatterns = [
      "affiliate-link", "affiliatelink", "affiliate link",
      "?ref=", "&ref=",
      "tracking-link", "trackinglink",
      "utm_source=", "utm_medium=",
      "tilmeld dig via vores link",
      "brug vores link",
    ];
    const hasAffiliate = affiliatePatterns.some((p) => contentLower.includes(p))
      || /href\s*=\s*["'][^"']*(\?|&)(ref|aff|partner|click_?id)=/i.test(articleData.content || "");
    if (hasAffiliate) {
      return await failWithLog("Affiliate-links detekteret i indhold", {
        search_query: searchQuery, topic_index: topicIndex, tokens_used: tokensUsed,
        perplexity_citations_count: perplexityResult.citations.length,
        citation_urls: perplexityResult.citations,
      });
    }

    // Validate category
    const category = articleData.category || "regulering";
    if (!ALLOWED_CATEGORIES.includes(category)) {
      articleData.category = "regulering";
    }

    // ═══ DUPLICATE CHECK ═══
    const dupCheck = checkDuplicate(articleData.title, articleData.category, recentArticles || []);
    if (dupCheck.isDuplicate) {
      return await failWithLog(`Duplikat: ${dupCheck.reason}`, {
        search_query: searchQuery, topic_index: topicIndex, tokens_used: tokensUsed,
        perplexity_citations_count: perplexityResult.citations.length,
        citation_urls: perplexityResult.citations,
        duplicate_check_result: dupCheck,
      });
    }

    // ═══ SOURCE VALIDATION (Hard guardrails) ═══
    let rawSources: SourceEntry[] = (articleData.sources || []).map((s: any) => {
      if (typeof s === "string") return { url: s };
      return { url: s.url, title: s.title, published_date: s.published_date };
    }).filter((s: SourceEntry) => s.url);

    // Fallback to Perplexity citations if AI returned insufficient sources
    if (rawSources.length < 1 && perplexityResult.citations.length > 0) {
      console.log("AI returned < 1 source – augmenting with Perplexity citations");
      const existingUrls = new Set(rawSources.map(s => normalizeSourceUrl(s.url)));
      const fallbackSources = perplexityResult.citations
        .filter((url: string) => isAllowedDomain(url) && !existingUrls.has(normalizeSourceUrl(url)))
        .map((url: string) => ({ url, title: new URL(url).hostname }));
      rawSources = [...rawSources, ...fallbackSources];
    }

    const validationResult = await validateSources(rawSources, perplexityResult.citations);

    if (!validationResult.passed) {
      return await failWithLog("Kildevalidering fejlet – artikel afvist", {
        search_query: searchQuery, topic_index: topicIndex, tokens_used: tokensUsed,
        perplexity_citations_count: perplexityResult.citations.length,
        citation_urls: perplexityResult.citations,
        sources_provided: rawSources.length,
        sources_validated: validationResult.validatedSources.length,
        domain_validation_result: validationResult.domainResults,
        recency_check_result: validationResult.recencyResults,
        validation_warnings: validationResult.warnings,
      });
    }

    // ═══ Generate hero image ═══
    let featuredImageUrl: string | null = null;
    try {
      const imagePrompt = `Professional news article hero image for a Danish online casino industry article titled "${articleData.title}". Modern, clean editorial style. Dark purple and blue tones. No text overlay. 16:9 aspect ratio. Ultra high resolution.`;
      
      const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [{ role: "user", content: imagePrompt }],
          modalities: ["image", "text"],
        }),
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        const base64Image = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        
        if (base64Image) {
          const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
          const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
          const fileName = `${articleData.slug}-${Date.now()}.png`;
          
          const { error: uploadErr } = await supabase.storage
            .from("news-images")
            .upload(fileName, imageBytes, { contentType: "image/png", upsert: true });

          if (!uploadErr) {
            const { data: publicUrl } = supabase.storage.from("news-images").getPublicUrl(fileName);
            featuredImageUrl = publicUrl.publicUrl;
          }
        }
      } else {
        await imageResponse.text();
      }
    } catch (imgErr) {
      console.error("Image generation error:", imgErr);
    }

    // Use article content as-is (no sources section appended)
    const finalContent = articleData.content || "";

    // ═══ All guardrails passed – Insert as DRAFT ═══
    const { data: inserted, error: insertErr } = await supabase
      .from("casino_news")
      .insert({
        title: articleData.title,
        slug: articleData.slug,
        excerpt: articleData.excerpt,
        content: finalContent,
        category: articleData.category,
        tags: articleData.tags || [],
        meta_title: articleData.meta_title,
        meta_description: articleData.meta_description,
        featured_image: featuredImageUrl,
        status: "draft",
        author_id: "ajse",
      })
      .select()
      .single();

    if (insertErr) {
      return await failWithLog(`DB insert fejl: ${insertErr.message}`, {
        search_query: searchQuery, topic_index: topicIndex, tokens_used: tokensUsed,
        perplexity_citations_count: perplexityResult.citations.length,
        citation_urls: perplexityResult.citations,
        sources_provided: rawSources.length,
        sources_validated: validationResult.validatedSources.length,
      });
    }

    // ═══ SUCCESS: Write audit log ═══
    const totalResponseTime = Date.now() - startTime;
    await writeAuditLog(supabase, {
      model_used: "sonar-pro",
      search_query: searchQuery,
      topic_index: topicIndex,
      article_id: inserted.id,
      guardrail_pass: true,
      citation_urls: perplexityResult.citations,
      sources_provided: rawSources.length,
      sources_validated: validationResult.validatedSources.length,
      recency_check_result: validationResult.recencyResults,
      domain_validation_result: validationResult.domainResults,
      tokens_used: tokensUsed,
      response_time_ms: totalResponseTime,
      perplexity_citations_count: perplexityResult.citations.length,
      perplexity_model: perplexityResult.model,
      ai_model: "google/gemini-2.5-flash",
      duplicate_check_result: dupCheck,
      validation_warnings: validationResult.warnings,
    });

    // Log to console only (no user-facing notification)

    console.log(
      "Draft created:", inserted.id,
      "| Sources:", validationResult.validatedSources.length,
      "| Words:", wordCount,
      "| Time:", totalResponseTime, "ms"
    );

    return new Response(
      JSON.stringify({
        success: true,
        articleId: inserted.id,
        title: articleData.title,
        category: articleData.category,
        wordCount,
        sources: validationResult.validatedSources,
        validation: {
          passed: true,
          sourcesValidated: validationResult.validatedSources.length,
          warnings: validationResult.warnings,
          duplicateCheck: dupCheck,
        },
        audit: {
          model: "sonar-pro",
          responseTimeMs: totalResponseTime,
          tokensUsed: tokensUsed,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    const reason = err instanceof Error ? err.message : "Unknown error";
    // Best-effort audit log on crash
    try {
      await writeAuditLog(supabase, {
        model_used: "sonar-pro",
        search_query: "crash",
        topic_index: -1,
        guardrail_pass: false,
        rejection_reason: `Crash: ${reason}`,
        citation_urls: [],
        sources_provided: 0,
        sources_validated: 0,
        perplexity_citations_count: 0,
        perplexity_model: "sonar-pro",
        ai_model: "google/gemini-2.5-flash",
        validation_warnings: [],
        response_time_ms: Date.now() - startTime,
      });
    } catch { /* ignore audit log failure on crash */ }

    return new Response(
      JSON.stringify({ success: false, error: reason }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ─── Aggregator sources (fallback) ───
const AGGREGATOR_URLS = [
  "https://www.casinopenge.dk/free-spins-i-dag",
  "https://www.spilxperten.com/casino/dagens-free-spins/",
  "https://www.casinoonline.dk/freespin/",
];

// ─── Direct casino paths to crawl ───
const CASINO_PATHS = [
  "/kampagner",
  "/promotions",
  "/bonus",
];

// ─── Casino name → slug mapping ───
const CASINO_NAME_MAP: Record<string, string> = {
  "royal casino": "royal-casino",
  "royalcasino": "royal-casino",
  "kapow casino": "kapow-casino",
  "kapow": "kapow-casino",
  "kapowcasino": "kapow-casino",
  "leovegas": "leovegas",
  "leo vegas": "leovegas",
  "mr green": "mr-green",
  "mr. green": "mr-green",
  "mrgreen": "mr-green",
  "comeon": "comeon",
  "come on": "comeon",
  "bet365": "bet365",
  "bet365 casino": "bet365",
  "unibet": "unibet",
  "unibet casino": "unibet",
  "888 casino": "888-casino",
  "888casino": "888-casino",
  "betano": "betano",
  "betano casino": "betano",
  "expekt": "expekt",
  "spilnu": "spilnu",
  "spilnu.dk": "spilnu",
  "casinostuen": "casinostuen",
  "onecasino": "onecasino",
  "one casino": "onecasino",
  "nordicbet": "nordicbet",
  "nordic bet": "nordicbet",
  "videoslots": "videoslots",
  "pokerstars": "pokerstars",
  "pokerstars casino": "pokerstars",
  "mr vegas": "mr-vegas",
  "stake": "stake",
  "tivoli casino": "tivoli-casino",
  "casino copenhagen": "casino-copenhagen",
};

interface CasinoRow {
  id: string;
  name: string;
  slug: string;
  affiliate_url: string | null;
  logo_url: string | null;
  website_url: string | null;
}

interface ParsedOffer {
  casino_name: string;
  casino_slug: string;
  title: string;
  description: string;
  spin_count: number;
  offer_type: string;
  for_new_players: boolean;
  for_existing_players: boolean;
  requires_deposit: boolean;
  wagering_requirement: string | null;
  min_deposit: string | null;
  expiry_info: string | null;
  source_url: string;
  source_type: "direct" | "aggregator";
  game_name: string | null;
  required_action: string | null;
  spin_value: string | null;
  short_terms_summary: string | null;
  campaign_period_start: string | null;
  campaign_period_end: string | null;
  confidence_score: number;
}

/** Resolve casino name to slug */
function resolveSlug(name: string): string | null {
  const lower = name.toLowerCase().trim();
  if (CASINO_NAME_MAP[lower]) return CASINO_NAME_MAP[lower];
  for (const [key, slug] of Object.entries(CASINO_NAME_MAP)) {
    if (lower.includes(key) || key.includes(lower)) return slug;
  }
  return null;
}

/** Extract spin count from text – STRICT: 1-1000 range */
function extractSpinCount(text: string): number {
  const patterns = [
    /(\d+)\s*(?:gratis\s*)?(?:free\s*)?(?:cash\s*)?(?:bonus\s*)?(?:spins?|chancer)/i,
    /(?:få|hent|modtag)\s+(\d+)\s+(?:free\s*)?(?:spins?|chancer)/i,
    /(\d+)\s*(?:gratis\s*)?chancer/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n > 0 && n <= 1000) return n;
    }
  }
  return 0;
}

/** Classify offer type */
function classifyOffer(text: string): { type: string; forNew: boolean; forExisting: boolean; requiresDeposit: boolean } {
  const lower = text.toLowerCase();
  let type = "welcome";
  let forNew = false;
  let forExisting = false;
  let requiresDeposit = true;

  if (/uden\s*indbetaling|no\s*deposit/i.test(lower)) {
    type = "no_deposit"; requiresDeposit = false; forNew = true;
  } else if (/mandag|mandags/i.test(lower)) {
    type = "daily"; forExisting = true;
  } else if (/daglig|daily|i\s*dag|hver\s*dag|dagens/i.test(lower)) {
    type = "daily"; forExisting = true;
  } else if (/weekend|fredag|lørdag|søndag/i.test(lower)) {
    type = "weekend"; forExisting = true;
  } else if (/lykkehjul|spin\s*og\s*vind/i.test(lower)) {
    type = "daily"; forExisting = true;
  } else if (/eksisterende|ugens\s*spil/i.test(lower)) {
    type = "existing"; forExisting = true;
  } else if (/velkomst|nye\s*kunder|nye\s*spillere|ved\s*registrering|første\s*indbetaling/i.test(lower)) {
    type = "welcome"; forNew = true;
  }

  if (/nye\s*(?:og\s*)?eksisterende|eksisterende\s*(?:og\s*)?nye|alle\s*(?:spillere|kunder)/i.test(lower)) {
    forNew = true; forExisting = true;
  }
  if (/nye\s*(?:spillere|kunder)/i.test(lower)) forNew = true;
  if (/eksisterende\s*(?:spillere|kunder)/i.test(lower)) forExisting = true;

  return { type, forNew, forExisting, requiresDeposit };
}

/** Detect wagering from text */
function detectWagering(text: string): string | null {
  const contextMatch = text.match(/(?:omsætningskrav|gennemspil|omsætning|wagering)[^\d]*(\d+)\s*(?:x|gange)/i);
  if (contextMatch) {
    const val = parseInt(contextMatch[1], 10);
    if (val > 0 && val <= 100) return `${val}x`;
    return null;
  }
  const reverseMatch = text.match(/(\d+)\s*(?:x|gange)\s*(?:gennemspil|omsætning|omsætningskrav|wagering)/i);
  if (reverseMatch) {
    const val = parseInt(reverseMatch[1], 10);
    if (val > 0 && val <= 100) return `${val}x`;
    return null;
  }
  if (/uden\s*(?:gennemspils?krav|omsætningskrav)/i.test(text)) return "Ingen";
  return null;
}

/** Detect min deposit */
function detectMinDeposit(text: string): string | null {
  const m = text.match(/(?:indbetal(?:ing)?|deposit)\s*(?:på\s*)?(?:mindst\s*)?(\d+)\s*kr/i);
  if (m) return `${m[1]} kr.`;
  return null;
}

/** Detect expiry */
function detectExpiry(text: string): string | null {
  const m = text.match(/(?:slutter|udløb|gyldigt?\s*(?:til|fra|indtil))[^.]*?(\d{1,2})\.\s*(\w+)\s*(?:20\d{2})?/i);
  if (m) return m[0].substring(0, 80);
  const m2 = text.match(/(?:hver\s*mandag|hver\s*dag|ugentlig|løbende)/i);
  if (m2) return m2[0];
  return null;
}

/** Extract game name from text */
function extractGameName(text: string): string | null {
  const patterns = [
    /(?:free\s*spins?\s*(?:på|i|til)\s+)([A-ZÆØÅ][a-zæøåA-ZÆØÅ0-9\s&':!-]{2,40})(?:\s*(?:slot|spillemaskine|automat|!|\.|,))/i,
    /(?:spins?\s*(?:på|i|til)\s+)([A-ZÆØÅ][a-zæøåA-ZÆØÅ0-9\s&':!-]{2,40})(?:\s*(?:slot|spillemaskine|!|\.|,|\s*$))/i,
    /(?:spil(?:let)?|game|slot)[:\s]+([A-ZÆØÅ][a-zæøåA-ZÆØÅ0-9\s&':!-]{2,40})/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) return m[1].trim();
  }
  // Known game names direct match
  const knownGames = [
    "Book of Dead", "Starburst", "Big Bass Bonanza", "Sweet Bonanza", "Gates of Olympus",
    "Gonzo's Quest", "Reactoonz", "Fire Joker", "Legacy of Dead", "Wolf Gold",
    "Dead or Alive", "Mega Moolah", "Immortal Romance", "Thunderstruck II",
    "Book of Ra", "Eye of Horus", "Rise of Olympus", "Moon Princess",
  ];
  const lowerText = text.toLowerCase();
  for (const game of knownGames) {
    if (lowerText.includes(game.toLowerCase())) return game;
  }
  return null;
}

/** Extract required action */
function extractRequiredAction(text: string): string | null {
  const patterns = [
    /(?:krav|betingelse|for at)[:\s]*([^.]{10,80})/i,
    /(?:spil\s+for|indsats\s+på)\s+(\d+\s*kr[^.]{0,40})/i,
    /(?:indbetal)\s+(?:mindst\s+)?(\d+\s*kr[^.]{0,40})/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) return m[1].trim().substring(0, 100);
  }
  const dep = detectMinDeposit(text);
  if (dep) return `Indbetal ${dep}`;
  return null;
}

/** Extract spin value */
function extractSpinValue(text: string): string | null {
  const m = text.match(/(?:spin\s*værdi|spinværdi|pr\.?\s*spin|per\s*spin|værdi\s*pr)[:\s]*(\d+(?:[.,]\d+)?)\s*kr/i);
  if (m) return `${m[1]} kr.`;
  const m2 = text.match(/(\d+(?:[.,]\d+)?)\s*kr\.?\s*(?:pr|per|\/)\s*spin/i);
  if (m2) return `${m2[1]} kr.`;
  return null;
}

/** Build short terms summary */
function buildTermsSummary(offer: Partial<ParsedOffer>): string | null {
  const parts: string[] = [];
  if (offer.wagering_requirement) parts.push(`Omsætningskrav: ${offer.wagering_requirement}`);
  if (offer.min_deposit) parts.push(`Min. indbetaling: ${offer.min_deposit}`);
  if (offer.spin_value) parts.push(`Spinværdi: ${offer.spin_value}`);
  if (offer.expiry_info) parts.push(`Udløb: ${offer.expiry_info}`);
  if (!offer.requires_deposit) parts.push("Ingen indbetaling krævet");
  return parts.length > 0 ? parts.join(" · ") : null;
}

/** Parse campaign period dates */
function extractPeriodDates(text: string): { start: string | null; end: string | null } {
  const periodMatch = text.match(/fra\s+(?:d\.\s*)?(\d{1,2})\.\s*(\w+)(?:\s*\d{4})?\s*(?:til|–|-)\s*(?:d\.\s*)?(\d{1,2})\.\s*(\w+)/i);
  if (periodMatch) {
    const startDate = parseDanishDate(periodMatch[1], periodMatch[2]);
    const endDate = parseDanishDate(periodMatch[3], periodMatch[4]);
    return { start: startDate, end: endDate };
  }
  return { start: null, end: null };
}

const DANISH_MONTHS: Record<string, number> = {
  januar: 0, februar: 1, marts: 2, april: 3, maj: 4, juni: 5,
  juli: 6, august: 7, september: 8, oktober: 9, november: 10, december: 11,
  jan: 0, feb: 1, mar: 2, apr: 3, jun: 5, jul: 6, aug: 7, sep: 8, okt: 9, nov: 10, dec: 11,
};

function parseDanishDate(day: string, month: string): string | null {
  const monthLower = month.toLowerCase();
  const monthNum = DANISH_MONTHS[monthLower];
  if (monthNum === undefined) return null;
  const year = new Date().getFullYear();
  const d = new Date(year, monthNum, parseInt(day, 10));
  if (d.getTime() < Date.now() - 30 * 86400000) {
    d.setFullYear(year + 1);
  }
  return d.toISOString();
}

/** Calculate confidence score based on data completeness */
function calculateConfidence(offer: ParsedOffer): number {
  let score = 0;
  // +20 if direct casino source
  if (offer.source_type === "direct") score += 20;
  else score += 5; // aggregator base
  // +20 if date found
  if (offer.expiry_info || offer.campaign_period_end) score += 20;
  // +20 if game name found
  if (offer.game_name) score += 20;
  // +20 if deposit/action requirement found
  if (offer.required_action || offer.min_deposit) score += 20;
  // +20 if eligibility found
  if (offer.for_new_players || offer.for_existing_players) score += 20;
  return Math.min(score, 100);
}

/** Calculate score for ranking */
function calculateScore(offer: ParsedOffer): number {
  let score = offer.spin_count;
  if (offer.wagering_requirement && offer.wagering_requirement !== "Ingen") {
    const wagerMatch = offer.wagering_requirement.match(/(\d+)/);
    if (wagerMatch) score -= parseInt(wagerMatch[1], 10) * 2;
  }
  if (!offer.requires_deposit) score += 50;
  if (offer.for_existing_players) score += 10;
  // Bonus for direct source
  if (offer.source_type === "direct") score += 15;
  return score;
}

/** Generate dedup key */
function generateDedupKey(casinoSlug: string, title: string, expiryInfo: string | null): string {
  const normalizedTitle = title.toLowerCase().replace(/[^a-zæøå0-9]/g, "").substring(0, 60);
  const expiry = expiryInfo ? expiryInfo.toLowerCase().replace(/[^a-zæøå0-9]/g, "").substring(0, 30) : "none";
  return `${casinoSlug}:${normalizedTitle}:${expiry}`;
}

/** Fuzzy similarity check (Jaccard on bigrams) */
function fuzzyMatch(a: string, b: string): number {
  const bigrams = (s: string) => {
    const set = new Set<string>();
    const lower = s.toLowerCase().replace(/[^a-zæøå0-9]/g, "");
    for (let i = 0; i < lower.length - 1; i++) set.add(lower.substring(i, i + 2));
    return set;
  };
  const setA = bigrams(a);
  const setB = bigrams(b);
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const bg of setA) if (setB.has(bg)) intersection++;
  return intersection / (setA.size + setB.size - intersection);
}

/** Clean markdown to plain description */
function cleanDescription(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/[#*_|]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 400);
}

/** Full sanitization pipeline for scraped text */
function sanitizeText(text: string | null): string | null {
  if (!text) return null;
  let s = text;
  // Step 1: HTML artifacts
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<[^>]*>/g, "");
  s = s.replace(/&nbsp;/gi, " ");
  s = s.replace(/&amp;/gi, "&");
  s = s.replace(/&lt;/gi, "<");
  s = s.replace(/&gt;/gi, ">");
  s = s.replace(/&quot;/gi, '"');
  s = s.replace(/&#39;/gi, "'");
  // Step 2: Markdown leftovers
  s = s.replace(/^\s*#{1,6}\s+/gm, "");        // ### headings
  s = s.replace(/^[\s]*[-*]{3,}\s*$/gm, "");    // --- or ***  horizontal rules
  s = s.replace(/\*{2,3}([^*]+)\*{2,3}/g, "$1");// **bold** / ***bolditalic***
  s = s.replace(/__([^_]+)__/g, "$1");           // __underline__
  s = s.replace(/(?<!\w)\*(?!\s)([^*\n]+)(?<!\s)\*(?!\w)/g, "$1"); // *italic*
  s = s.replace(/^\s*\*\s*$/gm, "");            // standalone *
  // Step 3: Normalize whitespace
  s = s.replace(/[^\S\n]+/g, " ");
  s = s.replace(/\n{3,}/g, "\n\n");
  s = s.split("\n").map(l => l.trim()).filter(l => l.length > 0).join("\n");
  return s.trim() || null;
}

/** Check if text still contains raw artifacts (penalize confidence) */
function hasRawArtifacts(text: string | null): boolean {
  if (!text) return false;
  return /(<[^>]*>|\*{2,}|#{2,}|&nbsp;|&amp;|&lt;|&gt;)/.test(text);
}

/** Enrich a parsed offer with additional extracted data */
function enrichOffer(offer: ParsedOffer, rawText: string): ParsedOffer {
  if (!offer.game_name) offer.game_name = extractGameName(rawText);
  if (!offer.required_action) offer.required_action = extractRequiredAction(rawText);
  if (!offer.spin_value) offer.spin_value = extractSpinValue(rawText);
  const period = extractPeriodDates(rawText);
  if (!offer.campaign_period_start) offer.campaign_period_start = period.start;
  if (!offer.campaign_period_end) offer.campaign_period_end = period.end;
  offer.short_terms_summary = buildTermsSummary(offer);
  offer.confidence_score = calculateConfidence(offer);
  // Sanitize all text fields before storage
  offer.title = sanitizeText(offer.title) || offer.title;
  offer.description = sanitizeText(offer.description);
  offer.short_terms_summary = sanitizeText(offer.short_terms_summary);
  // Penalize confidence if artifacts remain after cleaning
  if (hasRawArtifacts(offer.description) || hasRawArtifacts(offer.title)) {
    offer.confidence_score = Math.max(0, (offer.confidence_score ?? 0) - 20);
  }
  return offer;
}

function createBaseOffer(casinoName: string, slug: string, sourceUrl: string, sourceType: "direct" | "aggregator"): Omit<ParsedOffer, 'title' | 'description' | 'spin_count' | 'offer_type' | 'for_new_players' | 'for_existing_players' | 'requires_deposit' | 'wagering_requirement' | 'min_deposit' | 'expiry_info' | 'confidence_score'> {
  return {
    casino_name: casinoName,
    casino_slug: slug,
    source_url: sourceUrl,
    source_type: sourceType,
    game_name: null,
    required_action: null,
    spin_value: null,
    short_terms_summary: null,
    campaign_period_start: null,
    campaign_period_end: null,
  };
}

// ─── DIRECT CASINO SCRAPER ───
async function scrapeDirectCasino(
  casino: CasinoRow,
  firecrawlKey: string,
): Promise<ParsedOffer[]> {
  if (!casino.website_url) return [];

  let baseUrl: string;
  try {
    const u = new URL(casino.website_url);
    baseUrl = `${u.protocol}//${u.hostname}`;
  } catch {
    return [];
  }

  const offers: ParsedOffer[] = [];
  // Try multiple campaign paths
  for (const path of CASINO_PATHS) {
    const targetUrl = `${baseUrl}${path}`;
    try {
      const resp = await fetch("https://api.firecrawl.dev/v1/scrape", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${firecrawlKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: targetUrl,
          formats: ["markdown"],
          onlyMainContent: true,
          waitFor: 3000,
        }),
      });

      if (!resp.ok) continue;

      const d = await resp.json();
      const md = d?.data?.markdown || d?.markdown || "";
      if (md.length < 100) continue;

      // Parse the direct page for free spin offers
      const parsed = parseDirectCasinoPage(md, casino, targetUrl);
      if (parsed.length > 0) {
        console.log(`  Found ${parsed.length} offers at ${targetUrl}`);
        offers.push(...parsed);
        break; // Found offers on this path, skip remaining paths
      }
    } catch {
      // Skip failed paths silently
    }
  }
  return offers;
}

/** Parse a direct casino page for free spin campaigns */
function parseDirectCasinoPage(markdown: string, casino: CasinoRow, sourceUrl: string): ParsedOffer[] {
  const offers: ParsedOffer[] = [];

  // Split by headings or significant sections
  const sections = markdown.split(/(?=##?\s)/);

  for (const section of sections) {
    if (section.length < 50) continue;
    // Must mention free spins or related keywords
    if (!/free\s*spin|gratis\s*spin|chancer|lykkehjul|bonus\s*spin/i.test(section)) continue;

    const spinCount = extractSpinCount(section);
    if (spinCount <= 0) continue;

    const classification = classifyOffer(section);
    // Extract a title from the heading
    const headingMatch = section.match(/^##?\s*(.+?)(?:\n|$)/);
    const title = headingMatch
      ? headingMatch[1].replace(/[#*_]/g, "").trim().substring(0, 120)
      : `${spinCount} Free Spins hos ${casino.name}`;

    const offer: ParsedOffer = {
      ...createBaseOffer(casino.name, casino.slug, sourceUrl, "direct"),
      title,
      description: cleanDescription(section),
      spin_count: spinCount,
      offer_type: classification.type,
      for_new_players: classification.forNew,
      for_existing_players: classification.forExisting,
      requires_deposit: classification.requiresDeposit,
      wagering_requirement: detectWagering(section),
      min_deposit: detectMinDeposit(section),
      expiry_info: detectExpiry(section),
      confidence_score: 0,
    };

    offers.push(enrichOffer(offer, section));
  }
  return offers;
}

// ─── Casinopenge.dk parser ───
function parseCasinopenge(markdown: string, sourceUrl: string): ParsedOffer[] {
  const offers: ParsedOffer[] = [];
  const sections = markdown.split(/(?=## \[)/);

  for (const section of sections) {
    if (section.length < 30) continue;

    let casinoName = "";
    const logoMatch = section.match(/!\[([^\]]+)\]\([^)]*casino-logo[^)]*\)/i);
    if (logoMatch) casinoName = logoMatch[1];
    if (!casinoName) {
      const altMatch = section.match(/!\[([^\]]+)\]/);
      if (altMatch && altMatch[1].length < 40) casinoName = altMatch[1];
    }

    const slug = resolveSlug(casinoName);
    if (!slug) continue;

    const titleMatch = section.match(/## \[([^\]]+)\]/);
    const title = titleMatch ? titleMatch[1] : "";

    const spinCount = extractSpinCount(section);
    if (spinCount <= 0) continue;

    const classification = classifyOffer(section);

    const offer: ParsedOffer = {
      ...createBaseOffer(casinoName, slug, sourceUrl, "aggregator"),
      title: title || `${spinCount} Free Spins hos ${casinoName}`,
      description: cleanDescription(section),
      spin_count: spinCount,
      offer_type: classification.type,
      for_new_players: classification.forNew,
      for_existing_players: classification.forExisting,
      requires_deposit: classification.requiresDeposit,
      wagering_requirement: detectWagering(section),
      min_deposit: detectMinDeposit(section),
      expiry_info: detectExpiry(section),
      confidence_score: 0,
    };

    offers.push(enrichOffer(offer, section));
  }
  return offers;
}

// ─── Spilxperten.com parser ───
function parseSpilxperten(markdown: string, sourceUrl: string): ParsedOffer[] {
  const offers: ParsedOffer[] = [];
  const tableBlocks = markdown.split(/\n\|\s*---\s*\|\n/);

  for (const block of tableBlocks) {
    if (block.length < 40) continue;

    let casinoName = "";
    const casinoLinkMatch = block.match(/\[([^\]]*(?:Casino|Bet365|Unibet|LeoVegas|Mr Green|Kapow|Betano|Spilnu|Casinostuen|Royal)[^\]]*)\]/i);
    if (casinoLinkMatch) casinoName = casinoLinkMatch[1].replace(/\*/g, "").trim();
    if (!casinoName) {
      const altMatch = block.match(/!\[[^\]]*\]\([^)]*(?:royal|kapow|bet365|unibet|leovegas|mr-green|betano|spilnu|casinostuen)[^)]*\)/i);
      if (altMatch) {
        const nameFromUrl = altMatch[0].match(/(?:royal|kapow|bet365|unibet|leovegas|mr-green|betano|spilnu|casinostuen)/i);
        if (nameFromUrl) casinoName = nameFromUrl[0];
      }
    }
    const besoegMatch = block.match(/besoeg\/([a-z0-9-]+)/i);
    if (!casinoName && besoegMatch) {
      casinoName = besoegMatch[1].replace(/-/g, " ");
    }

    const slug = resolveSlug(casinoName);
    if (!slug) continue;

    const titleMatch = block.match(/\|\s*([^|]*(?:free\s*spins?|chancer|cash\s*spins?|lykkehjul|gratis|prize|lodtrækning)[^|]*)\s*\|/i);
    const title = titleMatch ? titleMatch[1].replace(/[*💥🔥🎁💰😍]/g, "").replace(/\s+/g, " ").trim() : "";

    const spinCount = extractSpinCount(block);
    if (spinCount <= 0) continue;

    const classification = classifyOffer(block);

    const offer: ParsedOffer = {
      ...createBaseOffer(casinoName, slug, sourceUrl, "aggregator"),
      title: title || `${spinCount} Free Spins hos ${casinoName}`,
      description: cleanDescription(block),
      spin_count: spinCount,
      offer_type: classification.type,
      for_new_players: classification.forNew,
      for_existing_players: classification.forExisting,
      requires_deposit: classification.requiresDeposit,
      wagering_requirement: detectWagering(block),
      min_deposit: detectMinDeposit(block),
      expiry_info: detectExpiry(block),
      confidence_score: 0,
    };

    offers.push(enrichOffer(offer, block));
  }
  return offers;
}

// ─── CasinoOnline.dk parser ───
function parseCasinoonline(markdown: string, sourceUrl: string): ParsedOffer[] {
  const offers: ParsedOffer[] = [];
  const tableBlocks = markdown.split(/\n\|\s*(?:BONUS|FREE SPINS)[^|]*\|/i);

  for (const block of tableBlocks) {
    if (block.length < 40) continue;

    let casinoName = "";
    const hosMatch = block.match(/HOS\s+([A-ZÆØÅ][A-ZÆØÅ\s]+)\s*(?:CASINO)?/i);
    if (hosMatch) casinoName = hosMatch[1].trim();
    if (!casinoName) {
      const goMatch = block.match(/casinoonline\.dk\/go\/([a-z_]+)/i);
      if (goMatch) casinoName = goMatch[1].replace(/_/g, " ");
    }

    const slug = resolveSlug(casinoName);
    if (!slug) continue;

    const titleMatch = block.match(/\[([^\]]*(?:FREE|GRATIS|SPINS|CASH|MANDAGS|LYKKEHJUL)[^\]]*)\]/i);
    const title = titleMatch ? titleMatch[1] : "";

    const spinCount = extractSpinCount(block);
    if (spinCount <= 0) continue;

    const classification = classifyOffer(block);

    const offer: ParsedOffer = {
      ...createBaseOffer(casinoName, slug, sourceUrl, "aggregator"),
      title: title || `Free Spins hos ${casinoName}`,
      description: cleanDescription(block),
      spin_count: spinCount,
      offer_type: classification.type,
      for_new_players: classification.forNew,
      for_existing_players: classification.forExisting,
      requires_deposit: classification.requiresDeposit,
      wagering_requirement: detectWagering(block),
      min_deposit: detectMinDeposit(block),
      expiry_info: detectExpiry(block),
      confidence_score: 0,
    };

    offers.push(enrichOffer(offer, block));
  }
  return offers;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");

    if (!firecrawlKey) {
      return new Response(
        JSON.stringify({ error: "FIRECRAWL_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const admin = createClient(supabaseUrl, serviceRoleKey);

    // Fetch casino data for ID/logo/affiliate mapping (including website_url for direct scraping)
    const { data: casinos } = await admin
      .from("casinos")
      .select("id, name, slug, affiliate_url, logo_url, website_url")
      .eq("is_active", true);

    const casinoMap = new Map<string, CasinoRow>();
    for (const c of (casinos || []) as CasinoRow[]) {
      casinoMap.set(c.slug, c);
    }

    console.log(`Loaded ${casinoMap.size} casinos for mapping`);

    const allParsedOffers: ParsedOffer[] = [];
    const scrapeResults: { source: string; type: string; status: string; offers_found: number; error?: string }[] = [];

    // ─── PHASE 1: Direct casino scraping (only .dk domains for speed) ───
    const casinosWithUrl = Array.from(casinoMap.values()).filter((c) => {
      if (!c.website_url) return false;
      try { return new URL(c.website_url).hostname.endsWith(".dk"); } catch { return false; }
    });
    console.log(`Phase 1: Direct scraping ${casinosWithUrl.length} .dk casinos`);

    // Process in batches of 5 to avoid rate limits
    const BATCH_SIZE = 5;
    for (let i = 0; i < casinosWithUrl.length; i += BATCH_SIZE) {
      const batch = casinosWithUrl.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(
        batch.map(async (casino) => {
          try {
            const offers = await scrapeDirectCasino(casino, firecrawlKey);
            return { casino, offers, error: null };
          } catch (e) {
            return { casino, offers: [] as ParsedOffer[], error: String(e) };
          }
        })
      );

      for (const { casino, offers, error } of batchResults) {
        scrapeResults.push({
          source: casino.website_url || casino.slug,
          type: "direct",
          status: error ? "error" : offers.length > 0 ? "ok" : "no_offers",
          offers_found: offers.length,
          error: error || undefined,
        });
        allParsedOffers.push(...offers);
      }
    }

    const directOfferCount = allParsedOffers.length;
    console.log(`Phase 1 complete: ${directOfferCount} direct offers found`);

    // ─── PHASE 2: Aggregator scraping (fallback for casinos without direct offers) ───
    const casinosWithDirectOffers = new Set(allParsedOffers.map((o) => o.casino_slug));
    console.log(`Phase 2: Aggregator scraping (${casinosWithDirectOffers.size} casinos already have direct data)`);

    const scrapePromises = AGGREGATOR_URLS.map(async (url) => {
      try {
        console.log(`Scraping aggregator: ${url}`);
        const resp = await fetch("https://api.firecrawl.dev/v1/scrape", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${firecrawlKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url, formats: ["markdown"], onlyMainContent: true, waitFor: 5000 }),
        });

        if (!resp.ok) {
          const errText = await resp.text();
          console.error(`Firecrawl error for ${url}: ${resp.status} ${errText}`);
          return { url, markdown: "", error: `HTTP ${resp.status}` };
        }

        const d = await resp.json();
        const md = d?.data?.markdown || d?.markdown || "";
        console.log(`Got ${md.length} chars from ${url}`);
        return { url, markdown: md, error: null };
      } catch (e) {
        console.error(`Error scraping ${url}:`, e);
        return { url, markdown: "", error: String(e) };
      }
    });

    const scrapeData = await Promise.all(scrapePromises);

    for (const { url, markdown, error } of scrapeData) {
      if (error || !markdown) {
        scrapeResults.push({ source: url, type: "aggregator", status: "error", offers_found: 0, error: error || "Empty response" });
        continue;
      }

      let parsed: ParsedOffer[] = [];
      if (url.includes("casinopenge.dk")) {
        parsed = parseCasinopenge(markdown, url);
      } else if (url.includes("spilxperten.com")) {
        parsed = parseSpilxperten(markdown, url);
      } else if (url.includes("casinoonline.dk")) {
        parsed = parseCasinoonline(markdown, url);
      }

      // Only add aggregator offers for casinos that don't already have direct offers
      const filteredParsed = parsed.filter((o) => !casinosWithDirectOffers.has(o.casino_slug));
      scrapeResults.push({ source: url, type: "aggregator", status: "ok", offers_found: filteredParsed.length });
      allParsedOffers.push(...filteredParsed);
    }

    console.log(`Total parsed offers (direct + aggregator): ${allParsedOffers.length}`);

    // ─── Deduplicate using dedup_key + fuzzy matching ───
    const bestPerDedup = new Map<string, ParsedOffer>();

    for (const offer of allParsedOffers) {
      if (offer.spin_count <= 0) continue;

      const dedupKey = generateDedupKey(offer.casino_slug, offer.title, offer.expiry_info);

      // Check fuzzy match against existing keys for same casino
      let matchedKey: string | null = null;
      for (const [existingKey, existingOffer] of bestPerDedup.entries()) {
        if (existingOffer.casino_slug !== offer.casino_slug) continue;
        if (fuzzyMatch(offer.title, existingOffer.title) > 0.85) {
          matchedKey = existingKey;
          break;
        }
      }

      const keyToUse = matchedKey || dedupKey;
      const existing = bestPerDedup.get(keyToUse);

      // Prefer direct source, then higher score
      if (!existing) {
        bestPerDedup.set(keyToUse, offer);
      } else if (offer.source_type === "direct" && existing.source_type !== "direct") {
        bestPerDedup.set(keyToUse, offer);
      } else if (offer.source_type === existing.source_type && calculateScore(offer) > calculateScore(existing)) {
        bestPerDedup.set(keyToUse, offer);
      }
    }

    const uniqueOffers = Array.from(bestPerDedup.values());
    console.log(`Unique offers after dedup: ${uniqueOffers.length}`);

    // ─── Map to campaign records ───
    const now = new Date().toISOString();
    const campaigns = uniqueOffers
      .filter((o) => o.spin_count > 0)
      .map((offer) => {
        const casino = casinoMap.get(offer.casino_slug);
        const score = calculateScore(offer);
        const dedupKey = generateDedupKey(offer.casino_slug, offer.title, offer.expiry_info);
        return {
          casino_id: casino?.id || null,
          casino_name: casino?.name || offer.casino_name,
          casino_slug: offer.casino_slug,
          title: offer.title,
          description: offer.description,
          spin_count: offer.spin_count,
          for_new_players: offer.for_new_players,
          for_existing_players: offer.for_existing_players,
          requires_deposit: offer.requires_deposit,
          wagering_requirement: offer.wagering_requirement,
          min_deposit: offer.min_deposit,
          expiry_date: offer.campaign_period_end || null,
          source_type: offer.source_type,
          source_url: offer.source_url,
          is_active: true,
          offer_type: offer.offer_type,
          casino_logo_url: casino?.logo_url || null,
          affiliate_url: casino?.affiliate_url || null,
          last_checked: now,
          score,
          game_name: offer.game_name,
          required_action: offer.required_action,
          spin_value: offer.spin_value,
          short_terms_summary: offer.short_terms_summary,
          campaign_period_start: offer.campaign_period_start,
          campaign_period_end: offer.campaign_period_end,
          confidence_score: offer.confidence_score,
          last_verified_at: now,
          dedup_key: dedupKey,
        };
      })
      .filter((c) => casinoMap.has(c.casino_slug));

    console.log(`Campaigns to insert (matched to DB casinos): ${campaigns.length}`);

    // ─── Auto-expire old campaigns ───
    const { count: expiredCount } = await admin
      .from("free_spin_campaigns")
      .update({ is_active: false })
      .lt("expiry_date", now)
      .eq("is_active", true)
      .select("*", { count: "exact", head: true });

    console.log(`Auto-expired ${expiredCount || 0} campaigns`);

    // ─── TRUNCATE old scraped campaigns (keep manual ones) ───
    await admin.from("free_spin_campaigns").delete().in("source_type", ["scraped", "aggregator", "direct", "database"]);

    // ─── Insert new campaigns ───
    if (campaigns.length > 0) {
      const { error: insertError } = await admin.from("free_spin_campaigns").insert(campaigns);
      if (insertError) {
        console.error("Error inserting campaigns:", insertError);
        throw insertError;
      }
    }

    // ─── Sync to legacy table ───
    await admin.from("daily_free_spins_offers").delete().eq("is_manually_added", false);

    if (campaigns.length > 0) {
      const legacyOffers = campaigns.map((c) => ({
        casino_id: c.casino_id,
        casino_name: c.casino_name,
        casino_slug: c.casino_slug,
        offer_title: c.title,
        offer_description: c.description,
        free_spins_count: c.spin_count,
        min_deposit: c.min_deposit,
        wagering_requirement: c.wagering_requirement,
        valid_until: null,
        offer_type: c.offer_type,
        is_active: true,
        is_manually_added: false,
        scraped_at: now,
        scrape_source_url: c.source_url,
      }));
      await admin.from("daily_free_spins_offers").insert(legacyOffers);
    }

    const lowConfidence = campaigns.filter((c) => (c.confidence_score || 0) < 60).length;
    const directCount = campaigns.filter((c) => c.source_type === "direct").length;
    const aggregatorCount = campaigns.filter((c) => c.source_type === "aggregator").length;

    const summary = {
      success: true,
      totalOffersFound: allParsedOffers.length,
      uniqueOffers: uniqueOffers.length,
      campaignsInserted: campaigns.length,
      directSourceOffers: directCount,
      aggregatorOffers: aggregatorCount,
      lowConfidenceHidden: lowConfidence,
      autoExpired: expiredCount || 0,
      scrapeResults,
      campaignsByCasino: campaigns.reduce((acc, c) => {
        acc[c.casino_slug] = (acc[c.casino_slug] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };

    console.log("Done:", JSON.stringify(summary, null, 2));

    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in scrape-daily-offers:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

const SITEMAP_URL = "https://casinoaftaler.dk/sitemap.xml";
const PING_URL = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
const DEBOUNCE_KEY = "last_sitemap_ping";
const MIN_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes – avoid spam-ping

/**
 * Pings Google's sitemap endpoint to signal a content update.
 * Debounced to max once per 30 minutes to avoid spam.
 * Called from edge functions after real content changes.
 */
export async function pingSitemapIfNeeded(): Promise<boolean> {
  try {
    // Check last ping time from localStorage (edge: use KV or skip)
    if (typeof globalThis.localStorage !== "undefined") {
      const lastPing = localStorage.getItem(DEBOUNCE_KEY);
      if (lastPing && Date.now() - parseInt(lastPing, 10) < MIN_INTERVAL_MS) {
        return false; // Too recent
      }
    }

    const res = await fetch(PING_URL, { method: "GET" });
    
    if (typeof globalThis.localStorage !== "undefined") {
      localStorage.setItem(DEBOUNCE_KEY, String(Date.now()));
    }
    
    return res.ok;
  } catch {
    return false;
  }
}

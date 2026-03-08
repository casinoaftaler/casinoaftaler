import { supabase } from "@/integrations/supabase/client";

let lastErrorTime = 0;
const ERROR_THROTTLE_MS = 2000;
const errorCache = new Set<string>();

/**
 * Lightweight error tracker that logs errors to the database.
 * Deduplicates and throttles to avoid flooding.
 */
export async function trackError(
  error: unknown,
  context?: { componentName?: string }
) {
  try {
    const now = Date.now();
    if (now - lastErrorTime < ERROR_THROTTLE_MS) return;

    const message =
      error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack ?? null : null;

    // Deduplicate by message within session
    const dedupeKey = `${message}:${context?.componentName ?? ""}`;
    if (errorCache.has(dedupeKey)) return;
    errorCache.add(dedupeKey);

    lastErrorTime = now;

    await (supabase as any).from("error_logs").insert({
      error_message: message.slice(0, 2000),
      error_stack: stack?.slice(0, 5000) ?? null,
      component_name: context?.componentName ?? null,
      url: window.location.href,
      user_agent: navigator.userAgent,
    });
  } catch {
    // Silently fail — we never want error tracking to break the app
  }
}

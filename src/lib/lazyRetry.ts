import { lazy, type ComponentType } from "react";

/**
 * Wrapper around React.lazy that retries failed chunk imports once
 * by reloading the page. This fixes the white-screen issue when users
 * have stale chunks cached after a new deploy.
 *
 * Uses sessionStorage to prevent infinite reload loops.
 */
export function lazyRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  chunkName?: string
) {
  return lazy(() =>
    factory().catch((err) => {
      const key = `chunk-retry-${chunkName ?? "global"}`;
      const hasRetried = sessionStorage.getItem(key);

      if (!hasRetried) {
        sessionStorage.setItem(key, "1");
        window.location.reload();
        // Return a never-resolving promise so React doesn't render the error
        return new Promise<{ default: T }>(() => {});
      }

      // Already retried once — clear flag and let the error propagate
      sessionStorage.removeItem(key);
      throw err;
    })
  );
}

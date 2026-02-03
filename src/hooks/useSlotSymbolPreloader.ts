import { useEffect, useState, useCallback } from "react";
import type { SlotSymbol } from "@/lib/slotGameLogic";

// Cache for preloaded images
const imageCache = new Map<string, HTMLImageElement>();
// Track which URLs failed to load
const failedUrls = new Set<string>();

interface PreloaderOptions {
  symbols?: SlotSymbol[];
  additionalUrls?: (string | undefined | null)[];
}

interface SymbolValidation {
  isValid: boolean;
  missingSymbols: string[];
  failedUrls: string[];
}

export function useSlotSymbolPreloader(symbols: SlotSymbol[] | undefined, additionalUrls?: (string | undefined | null)[]) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  useEffect(() => {
    // Collect all URLs to preload
    const urlsToPreload: string[] = [];
    
    // Add symbol image URLs
    if (symbols) {
      symbols.forEach(s => {
        if (s.image_url && !imageCache.has(s.image_url)) {
          urlsToPreload.push(s.image_url);
        }
      });
    }
    
    // Add additional URLs (frame, background, title, etc.)
    if (additionalUrls) {
      additionalUrls.forEach(url => {
        if (url && !imageCache.has(url)) {
          urlsToPreload.push(url);
        }
      });
    }

    // If nothing to preload, we're done
    if (urlsToPreload.length === 0) {
      setIsLoaded(true);
      const cachedSymbolCount = symbols?.filter(s => s.image_url && imageCache.has(s.image_url)).length || 0;
      const cachedAdditionalCount = additionalUrls?.filter(url => url && imageCache.has(url)).length || 0;
      setLoadedCount(cachedSymbolCount + cachedAdditionalCount);
      setTotalCount(cachedSymbolCount + cachedAdditionalCount);
      return;
    }

    setTotalCount(urlsToPreload.length);
    setLoadedCount(0);
    setFailedCount(0);
    setIsLoaded(false);

    let loadedImages = 0;
    let failedImages = 0;
    const imagePromises: Promise<void>[] = [];

    urlsToPreload.forEach(url => {
      const promise = new Promise<void>((resolve) => {
        const img = new Image();
        
        // Use decoding hint for faster rendering
        img.decoding = "async";
        
        img.onload = () => {
          imageCache.set(url, img);
          failedUrls.delete(url); // Remove from failed if it was there
          loadedImages++;
          setLoadedCount(loadedImages);
          resolve();
        };
        
        img.onerror = () => {
          // Track failed URLs
          console.warn(`Failed to preload image: ${url}`);
          failedUrls.add(url);
          failedImages++;
          setFailedCount(failedImages);
          loadedImages++;
          setLoadedCount(loadedImages);
          resolve();
        };

        // Start loading
        img.src = url;
      });

      imagePromises.push(promise);
    });

    // Wait for all images to load
    Promise.all(imagePromises).then(() => {
      setIsLoaded(true);
    });
  }, [symbols, additionalUrls?.join(",")]); // Join additionalUrls for stable dependency

  // Validate that all symbols have loaded images
  const validateSymbols = useCallback((): SymbolValidation => {
    if (!symbols) {
      return { isValid: false, missingSymbols: [], failedUrls: [] };
    }

    const missingSymbols: string[] = [];
    const failedSymbolUrls: string[] = [];

    for (const symbol of symbols) {
      if (!symbol.image_url) {
        missingSymbols.push(symbol.name);
      } else if (failedUrls.has(symbol.image_url)) {
        failedSymbolUrls.push(symbol.name);
      } else if (!imageCache.has(symbol.image_url)) {
        missingSymbols.push(symbol.name);
      }
    }

    return {
      isValid: missingSymbols.length === 0 && failedSymbolUrls.length === 0,
      missingSymbols,
      failedUrls: failedSymbolUrls,
    };
  }, [symbols]);

  return {
    isLoaded,
    loadedCount,
    totalCount,
    failedCount,
    progress: totalCount > 0 ? (loadedCount / totalCount) * 100 : 100,
    validateSymbols,
  };
}

// Helper to check if an image is cached
export function isImageCached(url: string): boolean {
  return imageCache.has(url);
}

// Helper to get cached image
export function getCachedImage(url: string): HTMLImageElement | undefined {
  return imageCache.get(url);
}

// Helper to check if a URL failed to load
export function isImageFailed(url: string): boolean {
  return failedUrls.has(url);
}

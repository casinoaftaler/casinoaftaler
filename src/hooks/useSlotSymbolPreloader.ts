import { useEffect, useState } from "react";
import type { SlotSymbol } from "@/lib/slotGameLogic";

// Cache for preloaded images
const imageCache = new Map<string, HTMLImageElement>();

interface PreloaderOptions {
  symbols?: SlotSymbol[];
  additionalUrls?: (string | undefined | null)[];
}

export function useSlotSymbolPreloader(symbols: SlotSymbol[] | undefined, additionalUrls?: (string | undefined | null)[]) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

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
    setIsLoaded(false);

    let loadedImages = 0;
    const imagePromises: Promise<void>[] = [];

    urlsToPreload.forEach(url => {
      const promise = new Promise<void>((resolve) => {
        const img = new Image();
        
        // Use decoding hint for faster rendering
        img.decoding = "async";
        
        img.onload = () => {
          imageCache.set(url, img);
          loadedImages++;
          setLoadedCount(loadedImages);
          resolve();
        };
        
        img.onerror = () => {
          // Still resolve on error to not block loading
          console.warn(`Failed to preload image: ${url}`);
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

  return {
    isLoaded,
    loadedCount,
    totalCount,
    progress: totalCount > 0 ? (loadedCount / totalCount) * 100 : 100,
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

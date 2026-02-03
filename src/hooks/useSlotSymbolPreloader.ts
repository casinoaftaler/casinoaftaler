import { useEffect, useState } from "react";
import type { SlotSymbol } from "@/lib/slotGameLogic";

// Cache for preloaded images
const imageCache = new Map<string, HTMLImageElement>();

export function useSlotSymbolPreloader(symbols: SlotSymbol[] | undefined) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!symbols || symbols.length === 0) {
      setIsLoaded(true);
      return;
    }

    // Filter symbols that have image URLs and aren't already cached
    const symbolsWithImages = symbols.filter(s => s.image_url && !imageCache.has(s.image_url));
    
    // If all images are cached, we're done
    if (symbolsWithImages.length === 0) {
      setIsLoaded(true);
      setLoadedCount(symbols.filter(s => s.image_url).length);
      setTotalCount(symbols.filter(s => s.image_url).length);
      return;
    }

    setTotalCount(symbolsWithImages.length);
    setLoadedCount(0);
    setIsLoaded(false);

    let loadedImages = 0;
    const imagePromises: Promise<void>[] = [];

    symbolsWithImages.forEach(symbol => {
      if (!symbol.image_url) return;

      const promise = new Promise<void>((resolve) => {
        const img = new Image();
        
        // Use decoding hint for faster rendering
        img.decoding = "async";
        
        img.onload = () => {
          imageCache.set(symbol.image_url!, img);
          loadedImages++;
          setLoadedCount(loadedImages);
          resolve();
        };
        
        img.onerror = () => {
          // Still resolve on error to not block loading
          console.warn(`Failed to preload symbol image: ${symbol.name}`);
          loadedImages++;
          setLoadedCount(loadedImages);
          resolve();
        };

        // Start loading
        img.src = symbol.image_url;
      });

      imagePromises.push(promise);
    });

    // Wait for all images to load
    Promise.all(imagePromises).then(() => {
      setIsLoaded(true);
    });
  }, [symbols]);

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

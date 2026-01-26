import { useState, useEffect } from "react";

interface RGB {
  r: number;
  g: number;
  b: number;
}

// Extract dominant color from an image URL
export function useLogoColor(logoUrl: string | null | undefined): string | null {
  const [dominantColor, setDominantColor] = useState<string | null>(null);

  useEffect(() => {
    if (!logoUrl) {
      setDominantColor(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          setDominantColor(null);
          return;
        }

        // Scale down for performance
        const scale = Math.min(50 / img.width, 50 / img.height, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        
        // Collect colors, excluding very dark and very light pixels
        const colorCounts: Map<string, { count: number; rgb: RGB }> = new Map();
        
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];
          
          // Skip transparent pixels
          if (a < 128) continue;
          
          // Skip very dark (near black) and very light (near white) pixels
          const brightness = (r + g + b) / 3;
          if (brightness < 30 || brightness > 225) continue;
          
          // Quantize colors to reduce variations
          const quantizedR = Math.round(r / 32) * 32;
          const quantizedG = Math.round(g / 32) * 32;
          const quantizedB = Math.round(b / 32) * 32;
          
          const key = `${quantizedR},${quantizedG},${quantizedB}`;
          const existing = colorCounts.get(key);
          
          if (existing) {
            existing.count++;
          } else {
            colorCounts.set(key, { count: 1, rgb: { r: quantizedR, g: quantizedG, b: quantizedB } });
          }
        }
        
        // Find the most common vibrant color
        let maxCount = 0;
        let dominantRGB: RGB = { r: 100, g: 50, b: 150 }; // Default purple
        
        colorCounts.forEach((value) => {
          // Calculate saturation to prefer more vibrant colors
          const max = Math.max(value.rgb.r, value.rgb.g, value.rgb.b);
          const min = Math.min(value.rgb.r, value.rgb.g, value.rgb.b);
          const saturation = max > 0 ? (max - min) / max : 0;
          
          // Weight by both count and saturation
          const score = value.count * (1 + saturation * 2);
          
          if (score > maxCount) {
            maxCount = score;
            dominantRGB = value.rgb;
          }
        });
        
        // Convert RGB to HSL for gradient
        const { h, s, l } = rgbToHsl(dominantRGB.r, dominantRGB.g, dominantRGB.b);
        
        // Create a darker, more saturated version for the gradient
        const darkL = Math.max(l - 30, 15);
        const boostS = Math.min(s + 20, 100);
        
        setDominantColor(`${h} ${boostS}% ${darkL}%`);
      } catch (error) {
        console.error("Error extracting color from logo:", error);
        setDominantColor(null);
      }
    };

    img.onerror = () => {
      setDominantColor(null);
    };

    img.src = logoUrl;
  }, [logoUrl]);

  return dominantColor;
}

// Convert RGB to HSL
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

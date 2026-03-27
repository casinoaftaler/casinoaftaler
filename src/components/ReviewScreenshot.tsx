/**
 * ReviewScreenshot – Reusable component for casino review screenshots.
 * Uses semantic <figure>/<figcaption> for SEO (Google Image search).
 * Images are lazy-loaded by default (set eager=true for above-the-fold).
 * Includes an evergreen "Verificeret screenshot" badge for E-E-A-T.
 *
 * Size variants:
 *   - "full"    → full container width (default, for wide landscape screenshots)
 *   - "medium"  → max 600px, centered (for UI dialogs, login screens, etc.)
 *   - "compact" → max 420px, centered (for narrow/portrait screenshots)
 */

import { Camera } from "lucide-react";

type ScreenshotSize = "full" | "medium" | "compact";

interface ReviewScreenshotProps {
  /** Full URL to the image (storage bucket or import) */
  src: string;
  /** Unique, descriptive alt text – critical for SEO */
  alt: string;
  /** Optional visible caption below the image */
  caption?: string;
  /** Set to true for the first image in the article */
  eager?: boolean;
  /** Controls the max-width of the screenshot */
  size?: ScreenshotSize;
}

const sizeClasses: Record<ScreenshotSize, string> = {
  full: "w-full",
  medium: "w-full max-w-[600px] mx-auto",
  compact: "w-full max-w-[420px] mx-auto",
};

export function ReviewScreenshot({ src, alt, caption, eager = false, size = "full" }: ReviewScreenshotProps) {
  return (
    <figure className="my-6">
      <div className={`relative ${sizeClasses[size]}`}>
        <img
          src={src}
          alt={alt}
          className="rounded-lg border border-border w-full"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-background/80 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-muted-foreground border border-border/50">
          <Camera className="h-3 w-3" />
          Verificeret dansk screenshot
        </span>
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

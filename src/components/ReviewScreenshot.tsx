/**
 * ReviewScreenshot – Reusable component for casino review screenshots.
 * Uses semantic <figure>/<figcaption> for SEO (Google Image search).
 * Images are lazy-loaded by default (set eager=true for above-the-fold).
 *
 * Usage:
 *   <ReviewScreenshot
 *     src="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/news-images/reviews/spildansknu/registrering.webp"
 *     alt="SpilDanskNu registrering via MitID – trin 1"
 *     caption="SpilDanskNus registreringsproces med MitID-verifikation."
 *   />
 */

interface ReviewScreenshotProps {
  /** Full URL to the image (storage bucket) */
  src: string;
  /** Unique, descriptive alt text – critical for SEO */
  alt: string;
  /** Optional visible caption below the image */
  caption?: string;
  /** Set to true for the first image in the article */
  eager?: boolean;
}

export function ReviewScreenshot({ src, alt, caption, eager = false }: ReviewScreenshotProps) {
  return (
    <figure className="my-6">
      <img
        src={src}
        alt={alt}
        className="rounded-lg border border-border w-full"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

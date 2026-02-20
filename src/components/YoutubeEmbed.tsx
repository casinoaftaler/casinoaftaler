import { Helmet } from "react-helmet-async";
import { Play } from "lucide-react";
import { buildVideoSchema } from "@/lib/seo";

interface YoutubeEmbedProps {
  videoId: string;
  title: string;
  description: string;
  /** ISO 8601 upload date, e.g. "2026-02-18" */
  uploadDate: string;
  /** ISO 8601 duration, e.g. "PT1M14S" – required for Google video rich results */
  duration: string;
  /** Total view count – used in interactionStatistic for Google rich results */
  viewCount?: number;
  /** Thumbnail URL – defaults to YouTube's maxresdefault */
  thumbnailUrl?: string;
  /**
   * Canonical article URL (no trailing slash) – used to generate @id and isPartOf binding.
   * e.g. "https://casinoaftaler.dk/sticky-bonus"
   * Replaces the old contentUrl prop.
   */
  articleUrl?: string;
  /** @deprecated Use articleUrl instead. Kept for backward compatibility. */
  contentUrl?: string;
}

/**
 * Renders a responsive YouTube embed with full VideoObject JSON-LD schema.
 * When articleUrl is provided, the VideoObject gets an explicit @id and
 * isPartOf binding to the parent Article entity.
 * Covers all Google Rich Results requirements:
 * - name, description, thumbnailUrl, uploadDate, embedUrl, contentUrl
 */
export function YoutubeEmbed({
  videoId,
  title,
  description,
  uploadDate,
  duration,
  viewCount,
  thumbnailUrl,
  articleUrl,
}: YoutubeEmbedProps) {
  const videoSchema = buildVideoSchema(
    articleUrl || `https://casinoaftaler.dk`,
    videoId,
    { title, description, uploadDate, duration, viewCount, thumbnailUrl }
  );

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(videoSchema)}</script>
      </Helmet>

      <div className="my-8 overflow-hidden rounded-xl border border-border shadow-sm">
        {/* Label */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
          <Play className="h-4 w-4 text-primary fill-primary" />
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>

        {/* 16:9 responsive iframe */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </>
  );
}

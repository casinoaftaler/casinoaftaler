import { Play } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;

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
   * Canonical article URL (no trailing slash).
   * Video JSON-LD is now handled by the parent page via buildVideoSchema()
   * passed to <SEO jsonLd={[articleSchema, videoSchema, faqSchema]} />,
   * which merges everything into a single unified @graph.
   */
  articleUrl?: string;
  /** @deprecated Use articleUrl instead. Kept for backward compatibility. */
  contentUrl?: string;
}

/**
 * Pure UI component: renders a responsive YouTube iframe.
 *
 * JSON-LD for the VideoObject is intentionally NOT emitted here.
 * Instead, the parent page passes buildVideoSchema() output to <SEO jsonLd={[...]} />,
 * so all entities (Article, Person, VideoObject, FAQPage) are merged into
 * one unified @graph — the only pattern Google reliably parses for entity binding.
 */
export function YoutubeEmbed({
  videoId,
  title,
}: YoutubeEmbedProps) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-border shadow-sm">
      {/* Label */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
        <MenuIcon iconName="play" className="h-4 w-4 text-primary fill-primary" />
        <span className="text-sm font-medium text-foreground">{title}</span>
      </div>

      {/* 16:9 responsive iframe – paddingBottom prevents CLS */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}

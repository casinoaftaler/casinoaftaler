import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import type { Highlight } from "@/hooks/useHighlights";

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
}

function getYouTubeThumbnail(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

function getTwitchClipSlug(url: string): string | null {
  const clipMatch = url.match(/clips\.twitch\.tv\/([^?]+)/);
  const channelClipMatch = url.match(/twitch\.tv\/[^/]+\/clip\/([^?]+)/);
  return clipMatch?.[1] || channelClipMatch?.[1] || null;
}

function getTwitchClipEmbedUrl(url: string): string | null {
  const slug = getTwitchClipSlug(url);
  return slug ? `https://clips.twitch.tv/embed?clip=${slug}&parent=${window.location.hostname}&autoplay=true` : null;
}

function getTwitchClipThumbnail(url: string): string | null {
  const slug = getTwitchClipSlug(url);
  // Twitch clip thumbnails follow this pattern
  return slug ? `https://clips-media-assets2.twitch.tv/${slug}-preview-480x272.jpg` : null;
}

function detectPlatform(url: string): "youtube" | "twitch" {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  }
  return "twitch";
}

interface HighlightCardProps {
  highlight: Highlight;
  isPlaying: boolean;
  onPlay: (id: string) => void;
}

export function HighlightCard({ highlight, isPlaying, onPlay }: HighlightCardProps) {
  const platform = detectPlatform(highlight.url);
  const embedUrl =
    platform === "youtube"
      ? getYouTubeEmbedUrl(highlight.url)
      : getTwitchClipEmbedUrl(highlight.url);
  
  // For thumbnails: use manual thumbnail_url if provided, otherwise auto-generate
  const autoThumbnail = platform === "youtube" 
    ? getYouTubeThumbnail(highlight.url) 
    : getTwitchClipThumbnail(highlight.url);
  const thumbnail = highlight.thumbnail_url || autoThumbnail;

  const handleClick = () => {
    onPlay(highlight.id);
  };

  return (
    <Card className="overflow-hidden">
      <AspectRatio ratio={16 / 9}>
        {isPlaying && embedUrl ? (
          <iframe
            src={embedUrl}
            title={highlight.title}
            className="h-full w-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <button
            onClick={handleClick}
            className="relative h-full w-full group cursor-pointer bg-muted"
          >
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={highlight.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="text-sm text-muted-foreground">Ingen thumbnail</span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
              <div className="rounded-full bg-primary p-4 group-hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-primary-foreground fill-current" />
              </div>
            </div>
          </button>
        )}
      </AspectRatio>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold line-clamp-2">{highlight.title}</h3>
          <Badge variant={platform === "youtube" ? "destructive" : "secondary"} className="shrink-0">
            {platform === "youtube" ? "YouTube" : "Twitch"}
          </Badge>
        </div>
        {highlight.description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {highlight.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

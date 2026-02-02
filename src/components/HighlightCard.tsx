import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Highlight } from "@/hooks/useHighlights";

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function getTwitchClipEmbedUrl(url: string): string | null {
  const clipMatch = url.match(/clips\.twitch\.tv\/([^?]+)/);
  const channelClipMatch = url.match(/twitch\.tv\/[^/]+\/clip\/([^?]+)/);
  const slug = clipMatch?.[1] || channelClipMatch?.[1];
  return slug ? `https://clips.twitch.tv/embed?clip=${slug}&parent=${window.location.hostname}` : null;
}

function detectPlatform(url: string): "youtube" | "twitch" {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  }
  return "twitch";
}

interface HighlightCardProps {
  highlight: Highlight;
}

export function HighlightCard({ highlight }: HighlightCardProps) {
  const platform = detectPlatform(highlight.url);
  const embedUrl =
    platform === "youtube"
      ? getYouTubeEmbedUrl(highlight.url)
      : getTwitchClipEmbedUrl(highlight.url);

  return (
    <Card className="overflow-hidden">
      <AspectRatio ratio={16 / 9}>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={highlight.title}
            className="h-full w-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <p className="text-sm text-muted-foreground">Ugyldig video URL</p>
          </div>
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

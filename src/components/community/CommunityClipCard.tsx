import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CommunityClipWithStats,
  getEmbedUrl,
  useToggleLike,
} from "@/hooks/useCommunityClips";
import { Heart, MessageCircle, Play, User, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { da } from "date-fns/locale";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { ClipCategoryBadges } from "./ClipCategoryBadges";

interface CommunityClipCardProps {
  clip: CommunityClipWithStats;
  onOpenDetail: (clip: CommunityClipWithStats) => void;
}

export function CommunityClipCard({ clip, onOpenDetail }: CommunityClipCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useAuth();
  const toggleLike = useToggleLike();

  const isEmbeddable = clip.playback_type === 'embed';
  const embedUrl = isEmbeddable ? getEmbedUrl(clip.url, clip.platform) : null;
  const timeAgo = formatDistanceToNow(new Date(clip.approved_at || clip.created_at), {
    addSuffix: true,
    locale: da,
  });

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    toggleLike.mutate({ clipId: clip.id, hasLiked: clip.user_has_liked });
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEmbeddable) {
      setIsPlaying(true);
    } else {
      // External clips open in new tab
      window.open(clip.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenExternal = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(clip.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-shadow hover:shadow-lg group"
      onClick={() => onOpenDetail(clip)}
    >
      {/* Video/Thumbnail Area */}
      <div className="relative aspect-video bg-muted">
        {isPlaying && isEmbeddable && embedUrl ? (
          <iframe
            src={embedUrl}
            className="absolute inset-0 h-full w-full"
            allowFullScreen
            allow="autoplay; encrypted-media"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <>
            {clip.thumbnail_url ? (
              <img
                src={clip.thumbnail_url}
                alt={clip.title || "Clip thumbnail"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                <Play className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            <button
              onClick={isEmbeddable ? handlePlay : handleOpenExternal}
              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
            >
              <div className="rounded-full bg-primary p-4">
                {isEmbeddable ? (
                  <Play className="h-8 w-8 text-primary-foreground" fill="currentColor" />
                ) : (
                  <ExternalLink className="h-8 w-8 text-primary-foreground" />
                )}
              </div>
            </button>
            <div className="absolute left-2 top-2 flex gap-1">
              <Badge
                variant="secondary"
                className="capitalize"
              >
                {clip.platform}
              </Badge>
              {!isEmbeddable && (
                <Badge variant="outline" className="bg-background/80">
                  Åbner i ny fane
                </Badge>
              )}
            </div>
          </>
        )}
      </div>

      <CardContent className="p-4">
        {/* Categories */}
        {clip.categories && clip.categories.length > 0 && (
          <div className="mb-2">
            <ClipCategoryBadges categories={clip.categories} size="sm" />
          </div>
        )}

        {/* Title */}
        <h3 className="font-semibold line-clamp-1 mb-2">
          {clip.title || "Uden titel"}
        </h3>

        {/* Description */}
        {clip.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {clip.description}
          </p>
        )}

        {/* Submitter Info */}
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={clip.submitter_avatar || undefined} />
            <AvatarFallback>
              <User className="h-3 w-3" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {clip.submitter_name || "Anonym"}
          </span>
          <span className="text-xs text-muted-foreground">• {timeAgo}</span>
        </div>

        {/* Interactions */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "gap-1.5 px-2",
              clip.user_has_liked && "text-red-500"
            )}
            onClick={handleLike}
            disabled={!user || toggleLike.isPending}
          >
            <Heart
              className={cn("h-4 w-4", clip.user_has_liked && "fill-current")}
            />
            <span>{clip.likes_count}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 px-2"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(clip);
            }}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{clip.comments_count}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

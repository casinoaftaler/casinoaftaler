import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CommunityClipWithStats,
  getEmbedUrl,
  useToggleLike,
} from "@/hooks/useCommunityClips";
import {
  useClipComments,
  useAddComment,
  useDeleteComment,
} from "@/hooks/useCommunityClipComments";
import { Heart, MessageCircle, Send, Trash2, User, Loader2, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { da } from "date-fns/locale";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface CommunityClipDetailProps {
  clip: CommunityClipWithStats | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommunityClipDetail({
  clip,
  open,
  onOpenChange,
}: CommunityClipDetailProps) {
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const toggleLike = useToggleLike();
  const { data: comments, isLoading: commentsLoading } = useClipComments(
    clip?.id || null
  );
  const addComment = useAddComment();
  const deleteComment = useDeleteComment();

  if (!clip) return null;
  const isEmbeddable = clip.playback_type === 'embed';
  const embedUrl = isEmbeddable ? getEmbedUrl(clip.url, clip.platform) : null;
  const timeAgo = formatDistanceToNow(
    new Date(clip.approved_at || clip.created_at),
    { addSuffix: true, locale: da }
  );

  const handleLike = () => {
    if (!user) return;
    toggleLike.mutate({ clipId: clip.id, hasLiked: clip.user_has_liked });
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;

    await addComment.mutateAsync({ clipId: clip.id, content: comment });
    setComment("");
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment.mutate({ commentId, clipId: clip.id });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Video Section */}
          <div className="lg:col-span-3 bg-black">
            <div className="aspect-video">
              {isEmbeddable && embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="h-full w-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-muted-foreground p-4">
                  <ExternalLink className="h-12 w-12" />
                  <p className="text-center text-sm">
                    Denne video kan ikke vises her.
                  </p>
                  <Button
                    variant="secondary"
                    className="gap-2"
                    onClick={() => window.open(clip.url, '_blank', 'noopener,noreferrer')}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Åbn Clip
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Details & Comments Section */}
          <div className="lg:col-span-2 flex flex-col max-h-[60vh] lg:max-h-[80vh]">
            <DialogHeader className="p-4 pb-2">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="secondary" className="capitalize">
                  {clip.platform}
                </Badge>
                {!isEmbeddable && (
                  <Badge variant="outline">Eksternt link</Badge>
                )}
                <span className="text-xs text-muted-foreground">{timeAgo}</span>
              </div>
              <DialogTitle className="text-lg">
                {clip.title || "Uden titel"}
              </DialogTitle>
              {clip.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {clip.description}
                </p>
              )}
            </DialogHeader>

            {/* Submitter & Actions */}
            <div className="px-4 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={clip.submitter_avatar || undefined} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {clip.submitter_name || "Anonym"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "gap-1.5",
                      clip.user_has_liked && "text-red-500"
                    )}
                    onClick={handleLike}
                    disabled={!user || toggleLike.isPending}
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        clip.user_has_liked && "fill-current"
                      )}
                    />
                    <span>{clip.likes_count}</span>
                  </Button>

                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MessageCircle className="h-4 w-4" />
                    <span>{comments?.length || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Comments */}
            <ScrollArea className="flex-1 p-4">
              {commentsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : comments && comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((c) => (
                    <div key={c.id} className="flex gap-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={c.commenter_avatar || undefined} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {c.commenter_name || "Anonym"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(c.created_at), {
                              addSuffix: true,
                              locale: da,
                            })}
                          </span>
                          {user?.id === c.user_id && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 ml-auto"
                              onClick={() => handleDeleteComment(c.id)}
                              disabled={deleteComment.isPending}
                            >
                              <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                            </Button>
                          )}
                        </div>
                        <p className="text-sm mt-1 break-words">{c.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Ingen kommentarer endnu. Vær den første!
                </p>
              )}
            </ScrollArea>

            {/* Add Comment */}
            {user ? (
              <form
                onSubmit={handleSubmitComment}
                className="p-4 pt-2 border-t flex gap-2"
              >
                <Textarea
                  placeholder="Skriv en kommentar..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[60px] resize-none"
                  maxLength={500}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!comment.trim() || addComment.isPending}
                >
                  {addComment.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            ) : (
              <div className="p-4 pt-2 border-t text-center text-sm text-muted-foreground">
                Log ind for at kommentere
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

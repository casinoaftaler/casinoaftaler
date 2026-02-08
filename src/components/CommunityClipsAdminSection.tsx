import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  useAdminClips,
  useApproveClip,
  useRejectClip,
  useDeleteClip,
  ClipStatus,
  getEmbedUrl,
} from "@/hooks/useCommunityClips";
import {
  Check,
  X,
  Trash2,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Play,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { da } from "date-fns/locale";

export function CommunityClipsAdminSection() {
  const [activeTab, setActiveTab] = useState<ClipStatus | "all">("pending");
  const [rejectReason, setRejectReason] = useState("");
  const [previewClipId, setPreviewClipId] = useState<string | null>(null);

  const statusFilter = activeTab === "all" ? undefined : activeTab;
  const { data: clips, isLoading } = useAdminClips(statusFilter);

  const approveClip = useApproveClip();
  const rejectClip = useRejectClip();
  const deleteClip = useDeleteClip();

  const pendingCount =
    clips?.filter((c) => c.status === "pending").length || 0;

  const getStatusBadge = (status: ClipStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            Afventer
          </Badge>
        );
      case "approved":
        return (
          <Badge className="gap-1 bg-green-500/20 text-green-600 border-green-500/30">
            <CheckCircle className="h-3 w-3" />
            Godkendt
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Afvist
          </Badge>
        );
    }
  };

  const handleReject = async (clipId: string) => {
    await rejectClip.mutateAsync({ clipId, reason: rejectReason || undefined });
    setRejectReason("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Community Highlights</span>
          {pendingCount > 0 && (
            <Badge variant="secondary">{pendingCount} afventer</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as ClipStatus | "all")}
        >
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="pending" className="gap-1">
              <Clock className="h-4 w-4" />
              Afventer
            </TabsTrigger>
            <TabsTrigger value="approved" className="gap-1">
              <CheckCircle className="h-4 w-4" />
              Godkendt
            </TabsTrigger>
            <TabsTrigger value="rejected" className="gap-1">
              <XCircle className="h-4 w-4" />
              Afvist
            </TabsTrigger>
            <TabsTrigger value="all">Alle</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : clips && clips.length > 0 ? (
              <div className="space-y-4">
                {clips.map((clip) => {
                  const isEmbeddable = clip.playback_type === 'embed';
                  const embedUrl = isEmbeddable ? getEmbedUrl(clip.url, clip.platform) : null;
                  const isPreviewOpen = previewClipId === clip.id;

                  return (
                    <Card key={clip.id} className="overflow-hidden">
                      <div className="flex flex-col lg:flex-row">
                        {/* Preview */}
                        <div className="lg:w-80 flex-shrink-0">
                          <div className="aspect-video bg-muted relative">
                            {isPreviewOpen && isEmbeddable && embedUrl ? (
                              <iframe
                                src={embedUrl}
                                className="absolute inset-0 h-full w-full"
                                allowFullScreen
                                allow="autoplay; encrypted-media"
                              />
                            ) : clip.thumbnail_url ? (
                              <>
                                <img
                                  src={clip.thumbnail_url}
                                  alt="Thumbnail"
                                  className="h-full w-full object-cover"
                                />
                                {isEmbeddable ? (
                                  <button
                                    onClick={() => setPreviewClipId(clip.id)}
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors"
                                  >
                                    <Play className="h-12 w-12 text-white" />
                                  </button>
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <ExternalLink className="h-12 w-12 text-white" />
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="flex h-full w-full flex-col items-center justify-center bg-muted gap-2">
                                {isEmbeddable ? (
                                  <button
                                    onClick={() => setPreviewClipId(clip.id)}
                                    className="flex h-full w-full items-center justify-center hover:bg-muted/80"
                                  >
                                    <Play className="h-12 w-12 text-muted-foreground" />
                                  </button>
                                ) : (
                                  <>
                                    <ExternalLink className="h-12 w-12 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">Eksternt link</span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                {getStatusBadge(clip.status)}
                                <Badge variant="outline" className="capitalize">
                                  {clip.platform === "unknown" ? "Ukendt" : clip.platform}
                                </Badge>
                                <Badge variant={isEmbeddable ? "secondary" : "outline"} className="gap-1">
                                  {isEmbeddable ? (
                                    <>
                                      <Play className="h-3 w-3" />
                                      Embed
                                    </>
                                  ) : (
                                    <>
                                      <ExternalLink className="h-3 w-3" />
                                      Eksternt
                                    </>
                                  )}
                                </Badge>
                                {clip.requires_manual_review && (
                                  <Badge variant="secondary" className="gap-1 bg-amber-500/20 text-amber-600 border-amber-500/30">
                                    <AlertTriangle className="h-3 w-3" />
                                    Kræver manuel gennemgang
                                  </Badge>
                                )}
                              </div>

                              <h3 className="font-semibold mb-1">
                                {clip.title || "Uden titel"}
                              </h3>

                              {clip.description && (
                                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                  {clip.description}
                                </p>
                              )}

                              {/* Validation notes for admin */}
                              {clip.validation_notes && (
                                <div className="bg-amber-500/10 border border-amber-500/20 rounded-md p-2 mb-2">
                                  <p className="text-xs text-amber-600">
                                    <AlertTriangle className="h-3 w-3 inline mr-1" />
                                    {clip.validation_notes}
                                  </p>
                                </div>
                              )}

                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                <div className="flex items-center gap-1">
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage
                                      src={clip.submitter_avatar || undefined}
                                    />
                                    <AvatarFallback>
                                      <User className="h-3 w-3" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{clip.submitter_name || "Anonym"}</span>
                                </div>
                                <span>
                                  Indsendt{" "}
                                  {formatDistanceToNow(
                                    new Date(clip.created_at),
                                    { addSuffix: true, locale: da }
                                  )}
                                </span>
                              </div>

                              {clip.status === "approved" && clip.approved_at && (
                                <p className="text-xs text-muted-foreground">
                                  Godkendt:{" "}
                                  {format(
                                    new Date(clip.approved_at),
                                    "d. MMM yyyy 'kl.' HH:mm",
                                    { locale: da }
                                  )}
                                </p>
                              )}

                              {clip.status === "rejected" &&
                                clip.rejection_reason && (
                                  <p className="text-xs text-destructive mt-1">
                                    Årsag: {clip.rejection_reason}
                                  </p>
                                )}

                              {/* Show original URL if different from resolved */}
                              {clip.original_url && (
                                <div className="mt-2 text-xs text-muted-foreground">
                                  <span className="font-medium">Original URL: </span>
                                  <a
                                    href={clip.original_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline break-all"
                                  >
                                    {clip.original_url}
                                  </a>
                                </div>
                              )}

                              <a
                                href={clip.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                              >
                                <ExternalLink className="h-3 w-3" />
                                {clip.original_url ? "Åbn resolved URL" : "Åbn original"}
                              </a>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                              {clip.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      approveClip.mutate(clip.id)
                                    }
                                    disabled={approveClip.isPending}
                                    className="gap-1"
                                  >
                                    <Check className="h-4 w-4" />
                                    Godkend
                                  </Button>

                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-1"
                                      >
                                        <X className="h-4 w-4" />
                                        Afvis
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Afvis clip?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Denne clip vil ikke blive vist
                                          offentligt.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <div className="py-4">
                                        <Label htmlFor="reject-reason">
                                          Årsag (valgfri)
                                        </Label>
                                        <Textarea
                                          id="reject-reason"
                                          placeholder="Beskriv hvorfor clip'en afvises..."
                                          value={rejectReason}
                                          onChange={(e) =>
                                            setRejectReason(e.target.value)
                                          }
                                          className="mt-2"
                                        />
                                      </div>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel
                                          onClick={() => setRejectReason("")}
                                        >
                                          Annuller
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleReject(clip.id)}
                                        >
                                          Afvis
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </>
                              )}

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="gap-1 text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    Slet
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Slet clip permanent?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Denne handling kan ikke fortrydes. Alle
                                      likes og kommentarer vil også blive
                                      slettet.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Annuller
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteClip.mutate(clip.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Slet
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Ingen clips fundet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

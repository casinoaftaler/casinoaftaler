import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Check, X, MessageSquare, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";

type ReviewStatus = "pending" | "approved" | "rejected";

interface ReviewProfile {
  display_name: string | null;
  twitch_username: string | null;
  avatar_url: string | null;
}

export function ReviewModerationSection() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<ReviewStatus | "all">("pending");
  const [rejectionReasons, setRejectionReasons] = useState<Record<string, string>>({});

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["admin-reviews", filter],
    queryFn: async () => {
      let query = supabase
        .from("casino_user_reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (filter !== "all") {
        query = query.eq("status", filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch profiles for all user_ids in the reviews
  const userIds = [...new Set((reviews || []).filter(r => r.user_id).map(r => r.user_id!))];
  const { data: profilesMap } = useQuery({
    queryKey: ["admin-review-profiles", userIds.join(",")],
    queryFn: async () => {
      if (userIds.length === 0) return new Map<string, ReviewProfile>();
      const { data } = await supabase
        .from("profiles")
        .select("user_id, display_name, twitch_username, avatar_url")
        .in("user_id", userIds);
      const map = new Map<string, ReviewProfile>();
      (data || []).forEach((p) => {
        map.set(p.user_id, {
          display_name: p.display_name,
          twitch_username: p.twitch_username,
          avatar_url: p.avatar_url,
        });
      });
      return map;
    },
    enabled: userIds.length > 0,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status, rejectionReason }: { id: string; status: ReviewStatus; rejectionReason?: string }) => {
      const updateData: Record<string, unknown> = { status };
      if (rejectionReason) updateData.rejection_reason = rejectionReason;
      
      const { error } = await supabase
        .from("casino_user_reviews")
        .update(updateData as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      toast.success(vars.status === "approved" ? "Anmeldelse godkendt" : "Anmeldelse afvist");
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["casino-user-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["casino-review-aggregate"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("casino_user_reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Anmeldelse slettet");
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    },
  });

  const pendingCount = reviews?.filter((r) => r.status === "pending").length ?? 0;

  function getReviewerInfo(review: NonNullable<typeof reviews>[number]) {
    const profile = review.user_id ? profilesMap?.get(review.user_id) : null;
    const name = profile?.display_name || profile?.twitch_username || review.guest_name || "Anonym";
    const twitchName = profile?.twitch_username || null;
    const avatarUrl = profile?.avatar_url || null;
    const initial = name.charAt(0).toUpperCase();
    const isRegistered = !!review.user_id;
    return { name, twitchName, avatarUrl, initial, isRegistered };
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Brugeranmeldelser
          {pendingCount > 0 && (
            <Badge variant="destructive" className="text-xs">{pendingCount} afventer</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4 flex-wrap">
          {(["pending", "approved", "rejected", "all"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === "pending" ? "Afventer" : f === "approved" ? "Godkendt" : f === "rejected" ? "Afvist" : "Alle"}
            </Button>
          ))}
        </div>

        {isLoading && <p className="text-sm text-muted-foreground">Henter...</p>}

        {!isLoading && reviews?.length === 0 && (
          <p className="text-sm text-muted-foreground">Ingen anmeldelser med denne status.</p>
        )}

        <div className="space-y-4">
          {reviews?.map((review) => {
            const reviewer = getReviewerInfo(review);
            return (
              <div key={review.id} className="border border-border rounded-lg p-4 space-y-3">
                {/* Header with reviewer info */}
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      {reviewer.avatarUrl ? (
                        <img src={reviewer.avatarUrl} alt={reviewer.name} className="h-full w-full object-cover rounded-full" />
                      ) : (
                        <AvatarFallback className="text-sm bg-primary/10 text-primary font-bold">
                          {reviewer.initial}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">{reviewer.name}</span>
                        {reviewer.twitchName && (
                          <span className="text-xs text-muted-foreground">@{reviewer.twitchName}</span>
                        )}
                        <Badge variant="outline" className="text-xs">{review.casino_slug}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        {reviewer.isRegistered ? (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 gap-1 border-blue-500/40 text-blue-400">
                            <User className="h-2.5 w-2.5" /> Registreret bruger
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 gap-1 text-muted-foreground">
                            Gæst
                          </Badge>
                        )}
                        {review.is_verified_player && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 gap-1 text-emerald-400 border-emerald-500/40">
                            <ShieldCheck className="h-2.5 w-2.5" /> Verificeret
                          </Badge>
                        )}
                        <Badge
                          variant={review.status === "approved" ? "default" : review.status === "rejected" ? "destructive" : "secondary"}
                          className="text-[10px] px-1.5 py-0"
                        >
                          {review.status === "pending" ? "Afventer" : review.status === "approved" ? "Godkendt" : "Afvist"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"}`} />
                    ))}
                  </div>
                </div>

                {/* Email (admin-only info) */}
                {review.guest_email && (
                  <p className="text-xs text-muted-foreground">📧 {review.guest_email}</p>
                )}
                {review.user_id && (
                  <p className="text-[10px] text-muted-foreground/60 font-mono">ID: {review.user_id}</p>
                )}

                {review.title && <p className="text-sm font-semibold">{review.title}</p>}
                <p className="text-sm text-muted-foreground leading-relaxed">{review.review_text}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.created_at).toLocaleString("da-DK")}
                </p>

                {review.status === "pending" && (
                  <div className="flex items-center gap-2 pt-2 flex-wrap">
                    <Button
                      size="sm"
                      className="gap-1"
                      onClick={() => updateMutation.mutate({ id: review.id, status: "approved" })}
                      disabled={updateMutation.isPending}
                    >
                      <Check className="h-3.5 w-3.5" /> Godkend
                    </Button>
                    <Input
                      placeholder="Afvisningsgrund (valgfrit)"
                      className="h-8 text-xs max-w-[200px]"
                      value={rejectionReasons[review.id] || ""}
                      onChange={(e) => setRejectionReasons((prev) => ({ ...prev, [review.id]: e.target.value }))}
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="gap-1"
                      onClick={() => updateMutation.mutate({
                        id: review.id,
                        status: "rejected",
                        rejectionReason: rejectionReasons[review.id] || undefined,
                      })}
                      disabled={updateMutation.isPending}
                    >
                      <X className="h-3.5 w-3.5" /> Afvis
                    </Button>
                  </div>
                )}

                {review.status !== "pending" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs text-destructive"
                    onClick={() => deleteMutation.mutate(review.id)}
                  >
                    Slet permanent
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

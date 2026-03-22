import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Check, X, MessageSquare } from "lucide-react";
import { toast } from "sonner";

type ReviewStatus = "pending" | "approved" | "rejected";

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
      return data;
    },
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
          {reviews?.map((review) => (
            <div key={review.id} className="border border-border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{review.guest_name || review.user_id?.slice(0, 8) || "Anonym"}</span>
                  <Badge variant="outline" className="text-xs">{review.casino_slug}</Badge>
                  {review.is_verified_player && (
                    <Badge variant="outline" className="text-xs text-green-400 border-green-500/40">Verificeret</Badge>
                  )}
                  <Badge
                    variant={review.status === "approved" ? "default" : review.status === "rejected" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {review.status === "pending" ? "Afventer" : review.status === "approved" ? "Godkendt" : "Afvist"}
                  </Badge>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/20"}`} />
                  ))}
                </div>
              </div>

              {review.guest_email && (
                <p className="text-xs text-muted-foreground">E-mail: {review.guest_email}</p>
              )}

              {review.title && <p className="text-sm font-semibold">{review.title}</p>}
              <p className="text-sm text-muted-foreground">{review.review_text}</p>
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

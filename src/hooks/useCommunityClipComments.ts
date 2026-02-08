import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ClipComment {
  id: string;
  clip_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  commenter_name: string | null;
  commenter_avatar: string | null;
}

// Fetch comments for a specific clip
export function useClipComments(clipId: string | null) {
  return useQuery({
    queryKey: ["clip-comments", clipId],
    queryFn: async (): Promise<ClipComment[]> => {
      if (!clipId) return [];

      const { data: comments, error } = await supabase
        .from("community_clip_comments")
        .select("*")
        .eq("clip_id", clipId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      if (!comments || comments.length === 0) return [];

      // Fetch commenter profiles
      const userIds = [...new Set(comments.map((c) => c.user_id))];
      const { data: profiles } = await supabase
        .from("profiles_leaderboard")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) || []);

      return comments.map((comment) => {
        const profile = profileMap.get(comment.user_id);
        return {
          ...comment,
          commenter_name: profile?.display_name || null,
          commenter_avatar: profile?.avatar_url || null,
        };
      });
    },
    enabled: !!clipId,
  });
}

// Add a comment
export function useAddComment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      clipId,
      content,
    }: {
      clipId: string;
      content: string;
    }) => {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) throw new Error("Du skal være logget ind");

      const { data, error } = await supabase
        .from("community_clip_comments")
        .insert({
          clip_id: clipId,
          user_id: user.user.id,
          content: content.trim(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["clip-comments", variables.clipId] });
      queryClient.invalidateQueries({ queryKey: ["community-clips"] });
      toast({
        title: "Kommentar tilføjet!",
      });
    },
    onError: (error) => {
      toast({
        title: "Fejl",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Delete a comment
export function useDeleteComment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      commentId,
      clipId,
    }: {
      commentId: string;
      clipId: string;
    }) => {
      const { error } = await supabase
        .from("community_clip_comments")
        .delete()
        .eq("id", commentId);

      if (error) throw error;
      return clipId;
    },
    onSuccess: (clipId) => {
      queryClient.invalidateQueries({ queryKey: ["clip-comments", clipId] });
      queryClient.invalidateQueries({ queryKey: ["community-clips"] });
      toast({
        title: "Kommentar slettet",
      });
    },
    onError: (error) => {
      toast({
        title: "Fejl",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

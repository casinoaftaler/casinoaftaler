import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type ClipStatus = "pending" | "approved" | "rejected";
export type PlaybackType = "embed" | "external";
export type ClipCategory = "big_win" | "funny";

export const CLIP_CATEGORIES: { value: ClipCategory; label: string; emoji: string }[] = [
  { value: "big_win", label: "Big Win", emoji: "🏆" },
  { value: "funny", label: "Funny Moment", emoji: "😂" },
];

export interface CommunityClip {
  id: string;
  user_id: string;
  url: string;
  title: string | null;
  description: string | null;
  platform: string;
  playback_type: PlaybackType;
  thumbnail_url: string | null;
  duration_seconds: number | null;
  status: ClipStatus;
  approved_by: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  original_url: string | null;
  requires_manual_review: boolean | null;
  validation_notes: string | null;
  categories: ClipCategory[];
}

export interface CommunityClipWithStats extends CommunityClip {
  likes_count: number;
  comments_count: number;
  user_has_liked: boolean;
  submitter_name: string | null;
  submitter_avatar: string | null;
}

export interface ClipValidationResult {
  valid: boolean;
  error?: string;
  originalUrl: string;
  resolvedUrl: string | null;
  platform: 'twitch' | 'youtube' | 'unknown';
  playbackType: PlaybackType;
  clipId: string | null;
  metadata: {
    title?: string;
    thumbnailUrl?: string;
    durationSeconds?: number;
    requiresManualReview: boolean;
    validationNotes?: string;
  };
}

// Validate clip URL server-side (resolves redirects, validates platform)
export async function validateClipUrl(url: string): Promise<ClipValidationResult> {
  const { data, error } = await supabase.functions.invoke('validate-clip-url', {
    body: { url },
  });

  if (error) {
    return {
      valid: false,
      error: error.message || 'Failed to validate URL',
      originalUrl: url,
      resolvedUrl: null,
      platform: 'unknown',
      playbackType: 'external',
      clipId: null,
      metadata: { requiresManualReview: false },
    };
  }

  return data as ClipValidationResult;
}

// Detect platform from URL (client-side for display purposes only)
export function detectPlatform(url: string): string {
  if (url.includes("twitch.tv") || url.includes("clips.twitch.tv")) {
    return "twitch";
  }
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  }
  return "unknown";
}

// Extract video ID for embedding
export function getEmbedUrl(url: string, platform: string): string | null {
  try {
    if (platform === "twitch") {
      // Handle clips.twitch.tv/ClipName format
      const clipsMatch = url.match(/clips\.twitch\.tv\/([^?/]+)/);
      if (clipsMatch) {
        return `https://clips.twitch.tv/embed?clip=${clipsMatch[1]}&parent=${window.location.hostname}`;
      }
      // Handle twitch.tv/channel/clip/ClipName format
      const clipMatch = url.match(/twitch\.tv\/[^/]+\/clip\/([^?/]+)/);
      if (clipMatch) {
        return `https://clips.twitch.tv/embed?clip=${clipMatch[1]}&parent=${window.location.hostname}`;
      }
    }
    if (platform === "youtube") {
      // Handle youtu.be/ID format
      const shortMatch = url.match(/youtu\.be\/([^?/]+)/);
      if (shortMatch) {
        return `https://www.youtube.com/embed/${shortMatch[1]}`;
      }
      // Handle youtube.com/watch?v=ID format
      const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
      if (watchMatch) {
        return `https://www.youtube.com/embed/${watchMatch[1]}`;
      }
      // Handle youtube.com/embed/ID format
      const embedMatch = url.match(/youtube\.com\/embed\/([^?/]+)/);
      if (embedMatch) {
        return `https://www.youtube.com/embed/${embedMatch[1]}`;
      }
      // Handle youtube.com/shorts/ID format
      const shortsMatch = url.match(/youtube\.com\/shorts\/([^?/]+)/);
      if (shortsMatch) {
        return `https://www.youtube.com/embed/${shortsMatch[1]}`;
      }
    }
    return null;
  } catch {
    return null;
  }
}

// Get thumbnail URL (fallback for client-side)
export function getThumbnailUrl(url: string, platform: string): string | null {
  try {
    if (platform === "youtube") {
      const shortMatch = url.match(/youtu\.be\/([^?/]+)/);
      if (shortMatch) {
        return `https://img.youtube.com/vi/${shortMatch[1]}/maxresdefault.jpg`;
      }
      const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
      if (watchMatch) {
        return `https://img.youtube.com/vi/${watchMatch[1]}/maxresdefault.jpg`;
      }
      const shortsMatch = url.match(/youtube\.com\/shorts\/([^?/]+)/);
      if (shortsMatch) {
        return `https://img.youtube.com/vi/${shortsMatch[1]}/maxresdefault.jpg`;
      }
    }
    return null;
  } catch {
    return null;
  }
}

// Fetch approved clips for public display
export function useApprovedClips() {
  return useQuery({
    queryKey: ["community-clips", "approved"],
    queryFn: async (): Promise<CommunityClipWithStats[]> => {
      const { data: user } = await supabase.auth.getUser();
      const userId = user?.user?.id;

      // Fetch approved clips
      const { data: clips, error } = await supabase
        .from("community_clips")
        .select("*")
        .eq("status", "approved")
        .order("approved_at", { ascending: false });

      if (error) throw error;
      if (!clips || clips.length === 0) return [];

      const clipIds = clips.map((c) => c.id);

      // Fetch likes counts
      const { data: likesData } = await supabase
        .from("community_clip_likes")
        .select("clip_id")
        .in("clip_id", clipIds);

      // Fetch comments counts
      const { data: commentsData } = await supabase
        .from("community_clip_comments")
        .select("clip_id")
        .in("clip_id", clipIds);

      // Fetch user's likes if logged in
      let userLikes: string[] = [];
      if (userId) {
        const { data: userLikesData } = await supabase
          .from("community_clip_likes")
          .select("clip_id")
          .eq("user_id", userId)
          .in("clip_id", clipIds);
        userLikes = userLikesData?.map((l) => l.clip_id) || [];
      }

      // Fetch submitter profiles
      const userIds = [...new Set(clips.map((c) => c.user_id))];
      const { data: profiles } = await supabase
        .from("profiles_leaderboard")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) || []);

      // Count likes and comments per clip
      const likesCount = new Map<string, number>();
      const commentsCount = new Map<string, number>();

      likesData?.forEach((l) => {
        likesCount.set(l.clip_id, (likesCount.get(l.clip_id) || 0) + 1);
      });

      commentsData?.forEach((c) => {
        commentsCount.set(c.clip_id, (commentsCount.get(c.clip_id) || 0) + 1);
      });

      return clips.map((clip) => {
        const profile = profileMap.get(clip.user_id);
        return {
          ...clip,
          status: clip.status as ClipStatus,
          playback_type: (clip.playback_type as PlaybackType) || 'embed',
          categories: (clip.categories as ClipCategory[]) || [],
          likes_count: likesCount.get(clip.id) || 0,
          comments_count: commentsCount.get(clip.id) || 0,
          user_has_liked: userLikes.includes(clip.id),
          submitter_name: profile?.display_name || null,
          submitter_avatar: profile?.avatar_url || null,
        };
      });
    },
  });
}

// Fetch all clips for admin
export function useAdminClips(statusFilter?: ClipStatus) {
  return useQuery({
    queryKey: ["community-clips", "admin", statusFilter],
    queryFn: async (): Promise<CommunityClipWithStats[]> => {
      let query = supabase
        .from("community_clips")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter) {
        query = query.eq("status", statusFilter);
      }

      const { data: clips, error } = await query;

      if (error) throw error;
      if (!clips || clips.length === 0) return [];

      // Fetch submitter profiles
      const userIds = [...new Set(clips.map((c) => c.user_id))];
      const { data: profiles } = await supabase
        .from("profiles_leaderboard")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) || []);

      return clips.map((clip) => {
        const profile = profileMap.get(clip.user_id);
        return {
          ...clip,
          status: clip.status as ClipStatus,
          playback_type: (clip.playback_type as PlaybackType) || 'embed',
          categories: (clip.categories as ClipCategory[]) || [],
          likes_count: 0,
          comments_count: 0,
          user_has_liked: false,
          submitter_name: profile?.display_name || null,
          submitter_avatar: profile?.avatar_url || null,
        };
      });
    },
  });
}

// Fetch user's own clips
export function useMyClips() {
  return useQuery({
    queryKey: ["community-clips", "my-clips"],
    queryFn: async (): Promise<CommunityClip[]> => {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) return [];

      const { data, error } = await supabase
        .from("community_clips")
        .select("*")
        .eq("user_id", user.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []).map((clip) => ({
        ...clip,
        status: clip.status as ClipStatus,
        playback_type: (clip.playback_type as PlaybackType) || 'embed',
        categories: (clip.categories as ClipCategory[]) || [],
      }));
    },
  });
}

// Submit a new clip with server-side URL validation
export function useSubmitClip() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      url,
      title,
      description,
      categories,
    }: {
      url: string;
      title?: string;
      description?: string;
      categories: ClipCategory[];
    }) => {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) throw new Error("Du skal være logget ind");

      // Validate URL server-side (resolves redirects, validates platform, fetches metadata)
      const validation = await validateClipUrl(url);

      if (!validation.valid) {
        throw new Error(validation.error || "Ugyldigt clip URL");
      }

      // Use the resolved URL if available, otherwise use original
      const finalUrl = validation.resolvedUrl || url;
      const requiresManualReview = validation.metadata.requiresManualReview;

      // Insert the clip with validation metadata
      const { data, error } = await supabase
        .from("community_clips")
        .insert({
          user_id: user.user.id,
          url: finalUrl,
          original_url: url !== finalUrl ? url : null,
          title: title || validation.metadata.title || null,
          description: description || null,
          platform: validation.platform,
          playback_type: validation.playbackType,
          thumbnail_url: validation.metadata.thumbnailUrl || null,
          duration_seconds: validation.metadata.durationSeconds || null,
          requires_manual_review: requiresManualReview,
          validation_notes: validation.metadata.validationNotes || null,
          categories: categories,
        })
        .select()
        .single();

      if (error) throw error;

      return { 
        clip: data, 
        requiresManualReview,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-clips"] });
      // Always show neutral message - don't expose validation details
      toast({
        title: "Clip indsendt!",
        description: "Din clip er indsendt og afventer gennemgang.",
      });
    },
    onError: (error) => {
      toast({
        title: "Fejl ved indsendelse",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Approve a clip (admin only)
export function useApproveClip() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (clipId: string) => {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) throw new Error("Ikke logget ind");

      const { error } = await supabase
        .from("community_clips")
        .update({
          status: "approved",
          approved_by: user.user.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", clipId);

      if (error) throw error;

      // Auto-generate thumbnail if clip doesn't have one (fire-and-forget)
      const { data: clip } = await supabase
        .from("community_clips")
        .select("thumbnail_url")
        .eq("id", clipId)
        .single();

      if (clip && !clip.thumbnail_url) {
        supabase.functions.invoke("generate-clip-thumbnail", {
          body: { clipId },
        }).then((res) => {
          if (res.error) console.error("Thumbnail generation failed:", res.error);
          else console.log("Thumbnail generated for clip", clipId);
        }).catch((e) => console.error("Thumbnail generation error:", e));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-clips"] });
      toast({
        title: "Clip godkendt!",
        description: "Clip'en er nu synlig for alle. Thumbnail genereres automatisk.",
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

// Reject a clip (admin only)
export function useRejectClip() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      clipId,
      reason,
    }: {
      clipId: string;
      reason?: string;
    }) => {
      const { error } = await supabase
        .from("community_clips")
        .update({
          status: "rejected",
          rejection_reason: reason || null,
        })
        .eq("id", clipId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-clips"] });
      toast({
        title: "Clip afvist",
        description: "Clip'en er blevet afvist.",
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

// Delete a clip (admin only)
export function useDeleteClip() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (clipId: string) => {
      const { error } = await supabase
        .from("community_clips")
        .delete()
        .eq("id", clipId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-clips"] });
      toast({
        title: "Clip slettet",
        description: "Clip'en er blevet slettet.",
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

// Toggle like on a clip
export function useToggleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      clipId,
      hasLiked,
    }: {
      clipId: string;
      hasLiked: boolean;
    }) => {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) throw new Error("Du skal være logget ind");

      if (hasLiked) {
        // Remove like
        const { error } = await supabase
          .from("community_clip_likes")
          .delete()
          .eq("clip_id", clipId)
          .eq("user_id", user.user.id);
        if (error) throw error;
      } else {
        // Add like
        const { error } = await supabase
          .from("community_clip_likes")
          .insert({ clip_id: clipId, user_id: user.user.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-clips"] });
    },
  });
}

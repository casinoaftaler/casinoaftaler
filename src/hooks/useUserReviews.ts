import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type SortOption = "newest" | "highest" | "lowest" | "helpful";

export interface UserReview {
  id: string;
  casino_slug: string;
  user_id: string | null;
  guest_name: string | null;
  rating: number;
  title: string | null;
  review_text: string;
  status: string;
  helpful_count: number;
  is_verified_player: boolean;
  created_at: string;
  // Joined profile data
  display_name?: string | null;
  avatar_url?: string | null;
}

export interface ReviewAggregate {
  casino_slug: string;
  avg_rating: number;
  review_count: number;
}

export interface SubmitReviewData {
  casino_slug: string;
  rating: number;
  review_text: string;
  title?: string;
  guest_name?: string;
  guest_email?: string;
}

const PAGE_SIZE = 10;

export function useUserReviews(casinoSlug: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(0);

  // Fetch approved reviews
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
  } = useQuery({
    queryKey: ["casino-user-reviews", casinoSlug, sort, page],
    queryFn: async () => {
      let query = supabase
        .from("casino_user_reviews")
        .select("*")
        .eq("casino_slug", casinoSlug)
        .eq("status", "approved");

      switch (sort) {
        case "newest": query = query.order("created_at", { ascending: false }); break;
        case "highest": query = query.order("rating", { ascending: false }); break;
        case "lowest": query = query.order("rating", { ascending: true }); break;
        case "helpful": query = query.order("helpful_count", { ascending: false }); break;
      }

      query = query.range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
      const { data, error } = await query;
      if (error) throw error;
      return data as UserReview[];
    },
  });

  // Fetch aggregates
  const { data: aggregate } = useQuery({
    queryKey: ["casino-review-aggregate", casinoSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casino_review_aggregates")
        .select("*")
        .eq("casino_slug", casinoSlug)
        .maybeSingle();
      if (error) throw error;
      return data as ReviewAggregate | null;
    },
  });

  // Check if current user already reviewed
  const { data: userHasReviewed } = useQuery({
    queryKey: ["casino-user-has-reviewed", casinoSlug, user?.id],
    queryFn: async () => {
      if (!user?.id) return false;
      const { count } = await supabase
        .from("casino_user_reviews")
        .select("id", { count: "exact", head: true })
        .eq("casino_slug", casinoSlug)
        .eq("user_id", user.id);
      return (count ?? 0) > 0;
    },
    enabled: !!user?.id,
  });

  // Submit review
  const submitMutation = useMutation({
    mutationFn: async (data: SubmitReviewData) => {
      const insertData: Record<string, unknown> = {
        casino_slug: data.casino_slug,
        rating: data.rating,
        review_text: data.review_text,
        title: data.title || null,
        status: "pending",
      };

      if (user?.id) {
        insertData.user_id = user.id;
        insertData.is_verified_player = true;
      } else {
        insertData.guest_name = data.guest_name;
        insertData.guest_email = data.guest_email;
        insertData.is_verified_player = false;
      }

      const { error } = await supabase
        .from("casino_user_reviews")
        .insert(insertData as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["casino-user-reviews", casinoSlug] });
      queryClient.invalidateQueries({ queryKey: ["casino-user-has-reviewed", casinoSlug] });
    },
  });

  // Helpful vote
  const helpfulMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      if (!user?.id) throw new Error("Must be logged in");
      // Toggle: check if already voted
      const { data: existing } = await supabase
        .from("casino_review_helpful_votes")
        .select("id")
        .eq("review_id", reviewId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (existing) {
        await supabase.from("casino_review_helpful_votes").delete().eq("id", existing.id);
      } else {
        await supabase.from("casino_review_helpful_votes").insert({
          review_id: reviewId,
          user_id: user.id,
        } as any);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["casino-user-reviews", casinoSlug] });
    },
  });

  const loadMore = useCallback(() => setPage((p) => p + 1), []);

  return {
    reviews: reviewsData ?? [],
    reviewsLoading,
    aggregate,
    sort,
    setSort,
    page,
    loadMore,
    hasMore: (reviewsData?.length ?? 0) === PAGE_SIZE,
    userHasReviewed: userHasReviewed ?? false,
    submitReview: submitMutation.mutateAsync,
    submitLoading: submitMutation.isPending,
    submitSuccess: submitMutation.isSuccess,
    toggleHelpful: helpfulMutation.mutateAsync,
    isLoggedIn: !!user?.id,
  };
}

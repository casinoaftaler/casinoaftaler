import { toast } from "@/hooks/use-toast";

export async function getAffiliateRedirect(slug: string, userId?: string): Promise<void> {
  try {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    let redirectUrl = `https://${projectId}.supabase.co/functions/v1/affiliate-redirect?slug=${encodeURIComponent(
      slug
    )}`;

    // Add userId if provided (for tracking logged-in users)
    if (userId) {
      redirectUrl += `&userId=${encodeURIComponent(userId)}`;
    }

    // Open immediately (sync) so browsers treat it as a user-initiated navigation.
    // The backend will respond with a 302 redirect to the real affiliate URL,
    // so we never expose the affiliate URL in client code/HTML.
    const opened = window.open(redirectUrl, "_blank", "noopener,noreferrer");

    if (!opened) {
      return;
    }
  } catch (error) {
    console.error("Affiliate redirect error:", error);
    toast({
      title: "Fejl",
      description: "Kunne ikke åbne affiliate link",
      variant: "destructive",
    });
    return;
  }
}

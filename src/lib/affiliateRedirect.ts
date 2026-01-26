import { toast } from "@/hooks/use-toast";

export async function getAffiliateRedirect(slug: string): Promise<void> {
  try {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    const redirectUrl = `https://${projectId}.supabase.co/functions/v1/affiliate-redirect?slug=${encodeURIComponent(
      slug
    )}`;

    // Open immediately (sync) so browsers treat it as a user-initiated navigation.
    // The backend will respond with a 302 redirect to the real affiliate URL,
    // so we never expose the affiliate URL in client code/HTML.
    const opened = window.open(redirectUrl, "_blank", "noopener,noreferrer");

    if (!opened) {
    toast({
      title: "Popup blokeret",
      description: "Tillad venligst popups for denne side og prøv igen",
      variant: "destructive",
    });
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

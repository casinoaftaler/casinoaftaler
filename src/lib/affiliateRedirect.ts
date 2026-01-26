import { toast } from "@/hooks/use-toast";

export async function getAffiliateRedirect(slug: string): Promise<void> {
  // Open window synchronously to avoid popup blocker
  // Browser allows popups only when triggered directly by user action
  const newWindow = window.open("about:blank", "_blank", "noopener,noreferrer");
  
  try {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/affiliate-redirect?slug=${encodeURIComponent(slug)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Affiliate redirect error:", errorData);
      if (newWindow) newWindow.close();
      throw new Error(errorData.error || "Could not get affiliate link");
    }

    const result = await response.json();
    
    if (result.url && newWindow) {
      newWindow.location.href = result.url;
    } else {
      if (newWindow) newWindow.close();
      toast({
        title: "Fejl",
        description: "Affiliate link ikke tilgængeligt",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error("Affiliate redirect error:", error);
    toast({
      title: "Fejl",
      description: "Kunne ikke åbne affiliate link",
      variant: "destructive",
    });
  }
}

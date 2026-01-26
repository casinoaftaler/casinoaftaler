import { toast } from "@/hooks/use-toast";

export async function getAffiliateRedirect(slug: string): Promise<void> {
  console.log("getAffiliateRedirect called with slug:", slug);
  
  // Open window synchronously to avoid popup blocker
  // Browser allows popups only when triggered directly by user action
  const newWindow = window.open("about:blank", "_blank");
  console.log("newWindow created:", newWindow);
  
  if (!newWindow) {
    console.error("Popup was blocked by browser");
    toast({
      title: "Popup blokeret",
      description: "Tillad venligst popups for denne side og prøv igen",
      variant: "destructive",
    });
    return;
  }
  
  try {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    console.log("Fetching affiliate URL for project:", projectId);
    
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/affiliate-redirect?slug=${encodeURIComponent(slug)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Affiliate redirect error:", errorData);
      newWindow.close();
      throw new Error(errorData.error || "Could not get affiliate link");
    }

    const result = await response.json();
    console.log("Affiliate result:", result);
    
    if (result.url) {
      console.log("Redirecting to:", result.url);
      newWindow.location.href = result.url;
    } else {
      console.error("No URL in result");
      newWindow.close();
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

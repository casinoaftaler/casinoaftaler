import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export async function getAffiliateRedirect(slug: string): Promise<void> {
  try {
    const { data, error } = await supabase.functions.invoke("affiliate-redirect", {
      body: null,
      method: "GET",
    });
    
    // Use fetch directly since we need query params
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/affiliate-redirect?slug=${encodeURIComponent(slug)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Could not get affiliate link");
    }

    const result = await response.json();
    
    if (result.url) {
      window.open(result.url, "_blank", "noopener,noreferrer");
    } else {
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

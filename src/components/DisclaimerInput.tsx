import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const DEFAULT_DISCLAIMER = `Annoncering | 18+ | Spil ansvarligt | Selvudelukkelse via Rofus.nu | Kontakt Spillemyndighedens hjælpelinje på StopSpillet.dk – rådgivning om spilafhængighed | spillemyndigheden.dk |

Tilbud til nye spillere. Gælder indtil videre. Min. indbetaling: 100 kr. Max. bonus: 1000 kr. Tilbuddet gælder kun ved første indbetaling. Bonus og indbetalt beløb skal omsættes 10 gange. Bonusser kan kun anvendes på udvalgte spilleautomater. Bonus er gyldig i 60 dage. Regler og vilkår gælder. CasinoAftaler er ikke ansvarlig for eventuelle fejl i den offentliggjorte tilbudsinformation.`;

export function DisclaimerInput() {
  const [disclaimer, setDisclaimer] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    async function fetchDisclaimer() {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "casino_card_disclaimer")
        .single();

      if (!error && data?.value) {
        setDisclaimer(data.value);
      } else {
        setDisclaimer(DEFAULT_DISCLAIMER);
      }
      setInitialLoading(false);
    }

    fetchDisclaimer();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .upsert(
          { key: "casino_card_disclaimer", value: disclaimer },
          { onConflict: "key" }
        );

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Disclaimer gemt!");
    } catch (error) {
      console.error("Error saving disclaimer:", error);
      toast.error("Kunne ikke gemme disclaimer");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Textarea
        value={disclaimer}
        onChange={(e) => setDisclaimer(e.target.value)}
        placeholder="Indtast disclaimer tekst..."
        rows={6}
        className="text-sm"
      />
      <p className="text-xs text-muted-foreground">
        Brug | som separator mellem sektioner. De første 3 sektioner vises altid, resten kan scrolles.
      </p>
      <Button onClick={handleSave} disabled={loading} size="sm">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Gem Disclaimer
      </Button>
    </div>
  );
}

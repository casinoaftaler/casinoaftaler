import { useSiteSettings } from "@/hooks/useSiteSettings";
import { ScrollArea } from "@/components/ui/scroll-area";

const DEFAULT_DISCLAIMER = `Annoncering | 18+ | Spil ansvarligt | Selvudelukkelse via Rofus.nu | Kontakt Spillemyndighedens hjælpelinje på StopSpillet.dk – rådgivning om spilafhængighed | spillemyndigheden.dk |

Tilbud til nye spillere. Gælder indtil videre. Min. indbetaling: 100 kr. Max. bonus: 1000 kr. Tilbuddet gælder kun ved første indbetaling. Bonus og indbetalt beløb skal omsættes 10 gange. Bonusser kan kun anvendes på udvalgte spilleautomater. Bonus er gyldig i 60 dage. Regler og vilkår gælder. CasinoAftaler er ikke ansvarlig for eventuelle fejl i den offentliggjorte tilbudsinformation.`;

export function CasinoCardDisclaimer() {
  const { data: settings } = useSiteSettings();
  const disclaimerText = settings?.casino_card_disclaimer || DEFAULT_DISCLAIMER;

  // Split by | separator to get segments
  const segments = disclaimerText.split('|').map(s => s.trim()).filter(Boolean);
  
  // First 3 segments shown prominently
  const visibleSegments = segments.slice(0, 3);
  const remainingSegments = segments.slice(3);
  
  // Check if there's additional text after the pipe-separated segments (the second paragraph)
  const hasRemainingContent = remainingSegments.length > 0;

  return (
    <div className="text-[10px] text-white/60 text-center mt-2">
      {/* First 3 segments always visible */}
      <div className="leading-relaxed">
        {visibleSegments.join(' | ')}
        {hasRemainingContent && ' |'}
      </div>
      
      {/* Scrollable area for remaining content */}
      {hasRemainingContent && (
        <ScrollArea className="max-h-[60px] mt-1">
          <div className="leading-relaxed opacity-80 px-1">
            {remainingSegments.join(' | ')}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

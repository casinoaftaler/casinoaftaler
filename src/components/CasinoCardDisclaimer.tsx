import { useState } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { ChevronDown } from "lucide-react";

const DEFAULT_DISCLAIMER = `Annoncering | 18+ | Spil ansvarligt | Selvudelukkelse via Rofus.nu | Kontakt Spillemyndighedens hjælpelinje på StopSpillet.dk – rådgivning om spilafhængighed | spillemyndigheden.dk |

Tilbud til nye spillere. Gælder indtil videre. Min. indbetaling: 100 kr. Max. bonus: 1000 kr. Tilbuddet gælder kun ved første indbetaling. Bonus og indbetalt beløb skal omsættes 10 gange. Bonusser kan kun anvendes på udvalgte spilleautomater. Bonus er gyldig i 60 dage. Regler og vilkår gælder. CasinoAftaler er ikke ansvarlig for eventuelle fejl i den offentliggjorte tilbudsinformation.`;

// Links to make clickable
const LINK_MAP: Record<string, string> = {
  "Rofus.nu": "https://rofus.nu",
  "StopSpillet.dk": "https://stopspillet.dk",
  "spillemyndigheden.dk": "https://spillemyndigheden.dk",
};

// Convert text with known domains into clickable links
function renderWithLinks(text: string) {
  const parts: (string | JSX.Element)[] = [];
  let remaining = text;
  let keyIndex = 0;

  // Sort by length descending to match longer strings first
  const sortedLinks = Object.keys(LINK_MAP).sort((a, b) => b.length - a.length);

  while (remaining.length > 0) {
    let earliestMatch: { index: number; key: string } | null = null;

    for (const linkText of sortedLinks) {
      const index = remaining.indexOf(linkText);
      if (index !== -1 && (earliestMatch === null || index < earliestMatch.index)) {
        earliestMatch = { index, key: linkText };
      }
    }

    if (earliestMatch) {
      // Add text before the match
      if (earliestMatch.index > 0) {
        parts.push(remaining.slice(0, earliestMatch.index));
      }
      // Add the link
      parts.push(
        <a
          key={keyIndex++}
          href={LINK_MAP[earliestMatch.key]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white/80 transition-colors min-h-[44px] inline-flex items-center"
          aria-label={`${earliestMatch.key} – åbner i nyt vindue`}
        >
          {earliestMatch.key}
        </a>
      );
      remaining = remaining.slice(earliestMatch.index + earliestMatch.key.length);
    } else {
      // No more matches, add the rest
      parts.push(remaining);
      break;
    }
  }

  return parts;
}

export function CasinoCardDisclaimer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: settings } = useSiteSettings();
  const disclaimerText = settings?.casino_card_disclaimer || DEFAULT_DISCLAIMER;

  // Split by | separator to get segments
  const segments = disclaimerText.split('|').map(s => s.trim()).filter(Boolean);
  
  // First 6 segments shown prominently
  const visibleSegments = segments.slice(0, 6);
  const remainingSegments = segments.slice(6);
  
  // Check if there's additional text after the pipe-separated segments
  const hasRemainingContent = remainingSegments.length > 0;

  const visibleText = visibleSegments.join(' | ');
  const remainingText = remainingSegments.join(' | ');

  return (
    <div className="text-[10px] text-white/60 text-center mt-2">
      {/* First 3 segments always visible */}
      <div className="leading-relaxed">
        {renderWithLinks(visibleText)}
      </div>
      
      {/* Expandable area for remaining content */}
      {hasRemainingContent && (
        <>
          <div 
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="leading-relaxed opacity-80 px-1 pt-1">
              {renderWithLinks(remainingText)}
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-1 mx-auto mt-2 text-xs min-h-[44px] px-3 text-white/50 hover:text-white/70 transition-colors"
          >
            {isExpanded ? 'Vis mindre' : 'Vis vilkår'}
            <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </>
      )}
    </div>
  );
}

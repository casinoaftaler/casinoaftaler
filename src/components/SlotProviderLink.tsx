import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SLOT_TO_PROVIDER, PROVIDER_DISPLAY_NAMES } from "@/lib/slotProviderLinks";

/**
 * Shows a contextual link to the slot's provider page.
 * Used on slot guide pages for bidirectional equity flow.
 */
interface SlotProviderLinkProps {
  slotSlug: string;
}

export function SlotProviderLink({ slotSlug }: SlotProviderLinkProps) {
  const providerSlug = SLOT_TO_PROVIDER[slotSlug];

  if (!providerSlug) return null;

  const providerName = PROVIDER_DISPLAY_NAMES[providerSlug] || providerSlug;

  return (
    <div className="mb-6">
      <Link
        to={`/spiludviklere/${providerSlug}`}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all hover:border-primary/50 hover:shadow-sm"
      >
        Udviklet af {providerName}
        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
      </Link>
    </div>
  );
}

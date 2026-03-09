import { Link } from "react-router-dom";
import { BarChart3, ArrowRight } from "lucide-react";

/**
 * Cross-link from static slot guide pages to their /slot-katalog/ data counterpart.
 * Provides bidirectional link equity between guide (commercial) and data (authority) pages.
 */
interface SlotDataLinkProps {
  slotSlug: string;
  slotName: string;
}

export function SlotDataLink({ slotSlug, slotName }: SlotDataLinkProps) {
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 mb-8">
      <div className="flex items-start gap-3">
        <BarChart3 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium mb-1">Live Community-Data</p>
          <p className="text-sm text-muted-foreground mb-2">
            Se {slotName}'s resultater fra vores bonus hunts – inkl. højeste multiplikator, antal tests og community-statistikker.
          </p>
          <Link
            to={`/slot-katalog/${slotSlug}`}
            className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold text-sm"
          >
            Se {slotName} statistik & data
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

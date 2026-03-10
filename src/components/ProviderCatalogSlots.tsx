import { useState } from "react";
import { Link } from "react-router-dom";
import { Gamepad2, ArrowRight, ChevronDown, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROVIDER_TO_SLOTS, PROVIDER_DISPLAY_NAMES } from "@/lib/slotProviderLinks";
import { useProviderSlots, useLatestCatalogUpdate } from "@/hooks/useProviderSlots";
import { slugifySlotName } from "@/lib/slugify";

interface ProviderCatalogSlotsProps {
  providerSlug: string;
}

const INITIAL_SHOW = 20;
const BATCH_SIZE = 50;

export function ProviderCatalogSlots({ providerSlug }: ProviderCatalogSlotsProps) {
  const providerName = PROVIDER_DISPLAY_NAMES[providerSlug] || providerSlug;
  const { data: catalogSlots, isLoading } = useProviderSlots(providerSlug);
  const { data: freshness } = useLatestCatalogUpdate();
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);

  // Featured guide slots (manually mapped)
  const featuredSlugs = PROVIDER_TO_SLOTS[providerSlug] || [];
  const featuredNames = new Set(featuredSlugs.map((s) => s.name.toLowerCase()));

  if (isLoading) {
    return (
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
          <Gamepad2 className="h-7 w-7 text-primary" />
          Alle spillemaskiner fra {providerName}
        </h2>
        <p className="text-muted-foreground">Indlæser slot-data...</p>
      </section>
    );
  }

  const allSlots = catalogSlots || [];
  if (allSlots.length === 0 && featuredSlugs.length === 0) return null;

  // Split into featured (have guide pages) and catalog-only
  const catalogOnly = allSlots.filter(
    (s) => !featuredNames.has(s.slot_name.toLowerCase())
  );

  const visibleCatalog = catalogOnly.slice(0, visibleCount);
  const hasMore = visibleCount < catalogOnly.length;
  const remaining = catalogOnly.length - visibleCount;

  // Format freshness date
  const freshnessLabel = freshness?.latestHuntNumber
    ? `Data opdateret efter Bonus Hunt #${freshness.latestHuntNumber}${
        freshness.latestHuntDate ? ` · ${freshness.latestHuntDate}` : ""
      }`
    : null;

  return (
    <section className="mb-12">
      <h3 className="mb-4 text-xl font-bold flex items-center gap-2">
        <Gamepad2 className="h-7 w-7 text-primary" />
        Alle spillemaskiner fra {providerName}
      </h3>
      <p className="mb-2 text-muted-foreground leading-relaxed">
        Komplet oversigt over {allSlots.length} spillemaskiner fra {providerName} i vores database.
        Hver maskine er testet i vores live bonus hunts med ægte community-data.
      </p>

      {freshnessLabel && (
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            <RefreshCw className="h-3 w-3 mr-1" />
            {freshnessLabel}
          </Badge>
        </div>
      )}

      {/* Featured guides with dedicated pages */}
      {featuredSlugs.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Dybdegående spilguides</h3>
          <ul className="space-y-2">
            {featuredSlugs.map((slot) => (
              <li key={slot.slug}>
                <Link
                  to={`/casinospil/spillemaskiner/${slot.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm font-medium transition-all hover:border-primary/50 hover:shadow-sm"
                >
                  <Gamepad2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="flex-1">{slot.name} – komplet guide</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Full catalog table */}
      {catalogOnly.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-3">
            Alle {providerName}-slots i databasen ({catalogOnly.length})
          </h3>
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr className="border-b border-border">
                    <th className="px-4 py-2.5 text-left font-medium text-foreground">Slot</th>
                    <th className="px-4 py-2.5 text-center font-medium text-foreground">RTP</th>
                    <th className="px-4 py-2.5 text-center font-medium text-foreground">Volatilitet</th>
                    <th className="px-4 py-2.5 text-center font-medium text-foreground">Højeste X</th>
                    <th className="px-4 py-2.5 text-center font-medium text-foreground">Hunts</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleCatalog.map((slot) => (
                    <tr key={slot.slot_name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        <Link
                          to={`/slot-katalog/${slugifySlotName(slot.slot_name)}`}
                        >
                          {slot.slot_name}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-center text-muted-foreground">
                        {slot.rtp ? `${slot.rtp}%` : "–"}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {slot.volatility ? (
                          <Badge variant="secondary" className="text-xs">{slot.volatility}</Badge>
                        ) : "–"}
                      </td>
                      <td className="px-4 py-2.5 text-center font-semibold text-foreground">
                        {slot.highest_x && slot.highest_x > 0 ? `${Number(slot.highest_x.toFixed(1))}x` : "–"}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <Badge variant="outline" className="text-xs">{slot.bonus_count}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {hasMore && (
            <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={() => setVisibleCount((prev) => prev + BATCH_SIZE)}
            >
              <ChevronDown className="h-4 w-4 mr-2" />
              Vis {Math.min(BATCH_SIZE, remaining)} mere ({remaining} tilbage)
            </Button>
          )}

          {/* noscript fallback – full list of slot links for crawlers */}
          <noscript>
            <ul>
              {featuredSlugs.map((slot) => (
                <li key={slot.slug}>
                  <a href={`/casinospil/spillemaskiner/${slot.slug}`}>
                    {slot.name} – komplet guide
                  </a>
                </li>
              ))}
              {catalogOnly.map((slot) => (
                <li key={slot.slot_name}>
                  <a href={`/slot-katalog/${slugifySlotName(slot.slot_name)}`}>
                    {slot.slot_name}
                    {slot.rtp ? ` – RTP: ${slot.rtp}%` : ""}
                    {slot.volatility ? ` – ${slot.volatility}` : ""}
                  </a>
                </li>
              ))}
            </ul>
          </noscript>
        </>
      )}
    </section>
  );
}

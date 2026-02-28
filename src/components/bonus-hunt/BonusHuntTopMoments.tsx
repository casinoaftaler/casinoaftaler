import { useMemo } from "react";
import { Trophy, Zap } from "lucide-react";
import type { BonusHuntSlot } from "@/hooks/useBonusHuntData";
import { useProviderOverrides, useSlotCatalogMap } from "@/hooks/useSlotCatalog";

interface Props {
  slots: BonusHuntSlot[];
}

export function BonusHuntTopMoments({ slots }: Props) {
  const { data: overrides } = useProviderOverrides();
  const { data: catalogData } = useSlotCatalogMap();

  const topSlots = useMemo(() => {
    const overrideMap = new Map<string, string>();
    overrides?.forEach((o) => overrideMap.set(o.slot_name.toLowerCase(), o.provider_override));

    const enriched = slots
      .filter((s) => s.opened && s.multiplier > 0)
      .map((s) => {
        const key = s.slot.toLowerCase();
        let provider = s.provider;
        let slotName = s.slot;

        if (catalogData?.nameMap?.has(key)) slotName = catalogData.nameMap.get(key)!;
        if (provider === "Custom Slot") {
          if (overrideMap.has(key)) provider = overrideMap.get(key)!;
          else if (catalogData?.providerMap?.has(key)) provider = catalogData.providerMap.get(key)!;
        }

        return { ...s, slot: slotName, provider };
      })
      .sort((a, b) => b.multiplier - a.multiplier)
      .slice(0, 5);

    return enriched;
  }, [slots, overrides, catalogData]);

  if (topSlots.length === 0) return null;

  return (
    <section className="space-y-3" aria-label="Top moments">
      <div className="flex items-center gap-2">
        <Trophy className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-bold text-foreground">Top Moments</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {topSlots.map((slot, i) => (
          <div
            key={`${slot.slot}-${i}`}
            className="group relative rounded-lg border border-border/50 bg-card p-3 space-y-1.5 hover:border-primary/30 transition-colors"
          >
            {i === 0 && (
              <div className="absolute -top-2 -right-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  🏆
                </span>
              </div>
            )}
            <p className="text-sm font-semibold text-foreground truncate" title={slot.slot}>
              {slot.slot}
            </p>
            <p className="text-xs text-muted-foreground">{slot.provider}</p>
            <div className="flex items-end justify-between pt-1">
              <div>
                <p className="text-2xl font-black text-primary">{slot.multiplier}x</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {slot.win.toLocaleString("da-DK")} kr
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                  <Zap className="h-3 w-3" />
                  {slot.bet} kr bet
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

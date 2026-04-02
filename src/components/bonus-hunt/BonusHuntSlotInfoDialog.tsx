import { useSlotCatalogEntry } from "@/hooks/useSlotCatalog";
import { Loader2 } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { Button } from "@/components/ui/button";

interface Props {
  slotName: string;
}

export function BonusHuntSlotPopoverContent({ slotName }: Props) {
  const { data: slot, isLoading } = useSlotCatalogEntry(slotName);

  return (
    <div className="w-[260px] bg-[#0a0e1a] border border-border/30 rounded-lg p-4 shadow-xl">
      <h3 className="font-bold text-sm text-foreground mb-3 truncate">{slotName}</h3>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          <InfoRow icon={<MenuIcon iconName="percent" className="h-3.5 w-3.5 text-pink-500" />} label="RTP" value={slot?.rtp ? `${slot.rtp}%` : '—'} />
          <InfoRow icon={<MenuIcon iconName="bar-chart3" className="h-3.5 w-3.5 text-blue-500" />} label="Volatilitet" value={slot?.volatility || '—'} />
          <InfoRow icon={<MenuIcon iconName="star" className="h-3.5 w-3.5 text-orange-500" />} label="Max Potentiale" value={slot?.max_potential || '—'} />
          <InfoRow icon={<MenuIcon iconName="trophy" className="h-3.5 w-3.5 text-green-500" />} label="Vores Højeste Gevinst" value={slot?.highest_win ? `${slot.highest_win.toLocaleString('da-DK')} kr${slot.bonus_count ? ` (${slot.bonus_count})` : ''}` : '—'} />
          <InfoRow icon={<MenuIcon iconName="zap" className="h-3.5 w-3.5 text-purple-500" />} label="Vores Højeste X" value={slot?.highest_x ? `${slot.highest_x}x${slot.bonus_count ? ` (${slot.bonus_count})` : ''}` : '—'} />
        </div>
      )}

      <Button variant="outline" size="sm" className="w-full mt-3 text-xs h-7 border-border/30">
        MORE INFO
      </Button>
    </div>
  );
}

function InfoRow({ icon, label, value }: { iconName: "react".ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {icon}
      <span className="text-muted-foreground flex-1">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

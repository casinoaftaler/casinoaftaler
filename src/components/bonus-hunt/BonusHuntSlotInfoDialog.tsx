import { useSlotCatalogEntry } from "@/hooks/useSlotCatalog";
import { Loader2, Percent, BarChart3, Star, Trophy, Zap } from "lucide-react";
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
          <InfoRow icon={<Percent className="h-3.5 w-3.5 text-pink-500" />} label="RTP" value={slot?.rtp ? `${slot.rtp}%` : '—'} />
          <InfoRow icon={<BarChart3 className="h-3.5 w-3.5 text-blue-500" />} label="Volatilitet" value={slot?.volatility || '—'} />
          <InfoRow icon={<Star className="h-3.5 w-3.5 text-orange-500" />} label="Max Potentiale" value={slot?.max_potential || '—'} />
          <InfoRow icon={<Trophy className="h-3.5 w-3.5 text-green-500" />} label="Vores Højeste Gevinst" value={slot?.highest_win ? `${slot.highest_win.toLocaleString('da-DK')} kr` : '—'} />
          <InfoRow icon={<Zap className="h-3.5 w-3.5 text-purple-500" />} label="Vores Højeste X" value={slot?.highest_x ? `${slot.highest_x}x` : '—'} />
        </div>
      )}

      <Button variant="outline" size="sm" className="w-full mt-3 text-xs h-7 border-border/30">
        MORE INFO
      </Button>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {icon}
      <span className="text-muted-foreground flex-1">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

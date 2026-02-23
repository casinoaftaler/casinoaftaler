import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSlotCatalogEntry } from "@/hooks/useSlotCatalog";
import { Loader2 } from "lucide-react";

interface Props {
  slotName: string | null;
  onClose: () => void;
}

export function BonusHuntSlotInfoDialog({ slotName, onClose }: Props) {
  const { data: slot, isLoading } = useSlotCatalogEntry(slotName);

  return (
    <Dialog open={!!slotName} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{slotName}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : !slot ? (
          <p className="text-sm text-muted-foreground py-4">
            Ingen data fundet for denne slot. Admins kan tilføje info i Slot Katalog.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <InfoRow label="Provider" value={slot.provider || '—'} />
            <InfoRow label="RTP" value={slot.rtp ? `${slot.rtp}%` : '—'} />
            <InfoRow label="Volatilitet" value={slot.volatility || '—'} />
            <InfoRow label="Max Potentiale" value={slot.max_potential || '—'} />
            <InfoRow label="Vores Højeste Gevinst" value={slot.highest_win ? `${slot.highest_win.toLocaleString('da-DK')} kr` : '—'} />
            <InfoRow label="Vores Højeste X" value={slot.highest_x ? `${slot.highest_x}x` : '—'} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

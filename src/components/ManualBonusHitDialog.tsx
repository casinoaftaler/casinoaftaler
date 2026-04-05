import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Search, Loader2 } from "lucide-react";
import { useBonusHuntData } from "@/hooks/useBonusHuntData";
import { useBonusHuntSlotRequesters, findBestRequesterMatch, useUpdateSlotRequestStatus } from "@/hooks/useSlotRequests";
import { useBonusHuntSession } from "@/hooks/useBonusHuntSession";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestId: string;
  userId: string;
  slotName: string;
}

export function ManualBonusHitDialog({ open, onOpenChange, requestId, userId, slotName }: Props) {
  const [search, setSearch] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const { data: session } = useBonusHuntSession();
  const huntNumber = session?.hunt_number;
  const { data: huntData, isLoading: huntLoading } = useBonusHuntData(huntNumber);
  const { data: requesterMap } = useBonusHuntSlotRequesters(huntNumber);
  const updateStatus = useUpdateSlotRequestStatus();

  const unmatchedSlots = useMemo(() => {
    if (!huntData?.slots || !requesterMap) return [];
    return huntData.slots.filter((slot) => {
      const direct = requesterMap.get(slot.slot.toLowerCase());
      if (direct) return false;
      const fuzzy = findBestRequesterMatch(slot.slot, requesterMap);
      return !fuzzy;
    });
  }, [huntData?.slots, requesterMap]);

  const filtered = useMemo(() => {
    if (!search.trim()) return unmatchedSlots;
    const q = search.toLowerCase();
    return unmatchedSlots.filter(
      (s) => s.slot.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q)
    );
  }, [unmatchedSlots, search]);

  // Pre-select best fuzzy match to the request's slot name
  const suggestedSlot = useMemo(() => {
    if (!unmatchedSlots.length) return null;
    const norm = slotName.toLowerCase();
    const exact = unmatchedSlots.find((s) => s.slot.toLowerCase() === norm);
    if (exact) return exact.slot;
    // simple includes match
    const partial = unmatchedSlots.find((s) => s.slot.toLowerCase().includes(norm) || norm.includes(s.slot.toLowerCase()));
    return partial?.slot || null;
  }, [unmatchedSlots, slotName]);

  const handleConfirm = () => {
    if (!selectedSlot) return;
    updateStatus.mutate(
      { requestId, status: "bonus_hit", userId, awardCredits: true, huntNumber },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Vælg slot til bonus hit
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Request: <span className="font-medium text-foreground">{slotName}</span>
        </p>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Søg i slots..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {huntLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-6">
            Ingen ledige slots fundet
          </p>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-1 pr-3">
              {filtered.map((slot) => {
                const isSuggested = slot.slot === suggestedSlot;
                const isSelected = selectedSlot === slot.slot;
                return (
                  <button
                    key={slot.slot}
                    onClick={() => setSelectedSlot(slot.slot)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors",
                      isSelected
                        ? "bg-primary/20 border border-primary/40"
                        : isSuggested
                        ? "bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20"
                        : "hover:bg-muted/50 border border-transparent"
                    )}
                  >
                    <div>
                      <span className="font-medium">{slot.slot}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{slot.provider}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {slot.bet.toFixed(2)} kr
                      {isSuggested && !isSelected && (
                        <span className="ml-1.5 text-yellow-500 font-medium">Foreslået</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Annuller
          </Button>
          <Button
            size="sm"
            disabled={!selectedSlot || updateStatus.isPending}
            onClick={handleConfirm}
            className="gap-1"
          >
            {updateStatus.isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trophy className="h-3.5 w-3.5" />
            )}
            Bekræft Bonus Hit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

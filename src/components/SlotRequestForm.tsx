import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useMySlotRequests, useCreateSlotRequest, usePendingQueuePositions } from "@/hooks/useSlotRequests";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSlotCatalog } from "@/hooks/useSlotCatalog";
import { Clock, Filter, Loader2, Minus, Plus, Search, Send, User } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";
import { Link } from "react-router-dom";

const STATUS_CONFIG: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; iconName: string }> = {
  pending: { label: "Afventer", variant: "secondary", iconName: "clock" },
  bonus_hit: { label: "Bonus Hit! 🎉", variant: "default", iconName: "check-circle2" },
  no_bonus: { label: "Ingen Bonus", variant: "outline", iconName: "minus" },
  rejected: { label: "Afvist", variant: "destructive", iconName: "x-circle" },
};

export function SlotRequestForm({ openedBonuses = 0 }: { openedBonuses?: number }) {
  const { user } = useAuth();
  const { data: myRequests, isLoading: requestsLoading } = useMySlotRequests();
  const { data: queuePositions } = usePendingQueuePositions();
  const createRequest = useCreateSlotRequest();
  const { data: siteSettings } = useSiteSettings();
  const { data: slots, isLoading: slotsLoading } = useSlotCatalog();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<{ slot_name: string; provider: string } | null>(null);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customSlotName, setCustomSlotName] = useState("");
  const [customProvider, setCustomProvider] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAllRequests, setShowAllRequests] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pendingCount = myRequests?.filter((r) => r.status === "pending").length ?? 0;
  const maxPending = 2;
  const hasReachedLimit = pendingCount >= maxPending;

  // Filter slots based on search query
  const filteredSlots = useMemo(() => {
    if (!searchQuery.trim() || !slots) return [];
    const q = searchQuery.toLowerCase();
    return slots
      .filter((s) => s.slot_name.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q))
      .slice(0, 15);
  }, [searchQuery, slots]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const canSubmit =
    user &&
    !hasReachedLimit &&
    !createRequest.isPending &&
    (isCustomMode
      ? customSlotName.trim() && customProvider.trim()
      : !!selectedSlot);

  const handleSelectSlot = (slot: { slot_name: string; provider: string }) => {
    setSelectedSlot(slot);
    setSearchQuery("");
    setShowDropdown(false);
    setIsCustomMode(false);

    if (!user || hasReachedLimit || createRequest.isPending) return;
    createRequest.reset();
    createRequest.mutate(
      { slot_name: slot.slot_name, provider: slot.provider, is_custom: false },
      {
        onSuccess: () => {
          setSelectedSlot(null);
        },
      }
    );
  };

  const handleSwitchToCustom = () => {
    setIsCustomMode(true);
    setSelectedSlot(null);
    setCustomSlotName(searchQuery);
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    const finalSlotName = isCustomMode ? customSlotName.trim() : selectedSlot!.slot_name;
    const finalProvider = isCustomMode ? customProvider.trim() : selectedSlot!.provider;

    createRequest.mutate(
      { slot_name: finalSlotName, provider: finalProvider, is_custom: isCustomMode },
      {
        onSuccess: () => {
          setSearchQuery("");
          setSelectedSlot(null);
          setIsCustomMode(false);
          setCustomSlotName("");
          setCustomProvider("");
        },
      }
    );
  };

  if (!user) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground mb-3">Log ind for at sende en slot request.</p>
        <Button asChild>
          <Link to="/auth">Log ind</Link>
        </Button>
      </div>
    );
  }

  if (openedBonuses >= 1) {
    return (
      <div className="space-y-6">
        <div className="text-center py-4 bg-muted/50 rounded-lg border border-border/50 p-4">
          <MenuIcon iconName="x-circle" className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-medium text-foreground mb-1">Requests er lukket</p>
          <p className="text-xs text-muted-foreground">
            Den første bonus er åbnet – requests lukkes automatisk når bonusåbningen begynder.
          </p>
        </div>

        {/* Still show user's existing requests */}
        {myRequests && myRequests.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Dine requests</h4>
            <div className="space-y-2">
              {(showAllRequests ? myRequests : myRequests.slice(0, 5)).map((req) => {
                const config = STATUS_CONFIG[req.status] || STATUS_CONFIG.pending;
                // icon resolved via iconName on config
                return (
                  <div key={req.id} className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <MenuIcon iconName={config.iconName} className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{req.slot_name}</span>
                      <span className="text-muted-foreground">({req.provider})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {req.credits_awarded > 0 && (
                        <span className="text-xs text-primary font-medium">+{req.credits_awarded} credits</span>
                      )}
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
            {myRequests.length > 5 && (
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={() => setShowAllRequests(!showAllRequests)}>
                {showAllRequests ? "Vis færre" : `Vis alle (${myRequests.length})`}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="space-y-4">
        {hasReachedLimit && (
          <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
            Du har {pendingCount}/{maxPending} aktive requests. Vent til en er behandlet, før du sender en ny.
          </p>
        )}

        {!isCustomMode ? (
          <div className="space-y-2 relative" ref={dropdownRef}>
            <Label>Søg efter slot</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                placeholder="Skriv slot navn eller udbyder..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedSlot(null);
                  setShowDropdown(true);
                }}
                onFocus={() => {
                  if (searchQuery.trim()) setShowDropdown(true);
                }}
                className="pl-9"
              />
            </div>

            {showDropdown && searchQuery.trim().length >= 2 && (
              <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {slotsLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredSlots.length > 0 ? (
                  <>
                    {filteredSlots.map((slot) => (
                      <button
                        key={slot.id}
                        className="w-full text-left px-4 py-2.5 hover:bg-muted/50 flex items-center justify-between transition-colors"
                        onClick={() => handleSelectSlot(slot)}
                      >
                        <span className="font-medium text-foreground">{slot.slot_name}</span>
                        <span className="text-xs text-muted-foreground">{slot.provider}</span>
                      </button>
                    ))}
                    <button
                      className="w-full text-left px-4 py-2.5 hover:bg-muted/50 flex items-center gap-2 text-primary border-t border-border transition-colors"
                      onClick={handleSwitchToCustom}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="text-sm">Kan ikke finde den? Skriv manuelt</span>
                    </button>
                  </>
                ) : (
                  <div className="p-3 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Ingen slots fundet for "{searchQuery}"
                    </p>
                    <button
                      className="w-full text-left px-2 py-2 hover:bg-muted/50 rounded flex items-center gap-2 text-primary transition-colors"
                      onClick={handleSwitchToCustom}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="text-sm">Tilføj som custom slot</span>
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Custom Slot</Label>
              <button
                className="text-xs text-primary hover:underline"
                onClick={() => {
                  setIsCustomMode(false);
                  setCustomSlotName("");
                  setCustomProvider("");
                }}
              >
                ← Tilbage til søgning
              </button>
            </div>

            <div className="space-y-2">
              <Label>Slot navn</Label>
              <Input
                placeholder="Skriv slottens navn..."
                value={customSlotName}
                onChange={(e) => setCustomSlotName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Udbyder</Label>
              <Input
                placeholder="Skriv udbyderens navn..."
                value={customProvider}
                onChange={(e) => setCustomProvider(e.target.value)}
              />
            </div>
          </div>
        )}

        {isCustomMode && (
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full sm:w-auto gap-2"
          >
            {createRequest.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MenuIcon iconName="send" className="h-4 w-4" />
            )}
            Send Request
          </Button>
        )}
      </div>

      {/* User's requests */}
      {requestsLoading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : myRequests && myRequests.length > 0 ? (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Dine requests</h4>
          <div className="space-y-2">
            {(showAllRequests ? myRequests : myRequests.slice(0, 5)).map((req) => {
              const config = STATUS_CONFIG[req.status] || STATUS_CONFIG.pending;
              // icon resolved via iconName on config
              return (
                <div
                  key={req.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <MenuIcon iconName={config.iconName} className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{req.slot_name}</span>
                    <span className="text-muted-foreground">({req.provider})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {req.status === "pending" && queuePositions?.get(req.id) && (
                      <Badge variant="outline" className="text-xs">#{queuePositions.get(req.id)} i køen</Badge>
                    )}
                    {req.credits_awarded > 0 && (
                      <span className="text-xs text-primary font-medium">+{req.credits_awarded} credits</span>
                    )}
                    <Badge variant={config.variant}>{config.label}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
          {myRequests.length > 5 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground"
              onClick={() => setShowAllRequests(!showAllRequests)}
            >
              {showAllRequests ? "Vis færre" : `Vis alle (${myRequests.length})`}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}

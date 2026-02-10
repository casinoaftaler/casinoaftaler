import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useMySlotRequests, useCreateSlotRequest } from "@/hooks/useSlotRequests";
import { Loader2, Send, Clock, CheckCircle2, XCircle, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const PRESET_SLOTS: Record<string, string[]> = {
  "Relax Gaming": ["Money Train 4", "Dream Drop Jackpot", "Temple Tumble 2", "Snake Arena"],
  "Pragmatic Play": ["Gates of Olympus", "Sweet Bonanza", "Sugar Rush", "Big Bass Bonanza", "Starlight Princess"],
  "Play'n GO": ["Book of Dead", "Reactoonz 2", "Rise of Olympus", "Fire Joker"],
  "Thunderkick": ["Pink Elephants 2", "Flame Busters", "Esqueleto Explosivo 2"],
  "Hacksaw Gaming": ["Wanted Dead or a Wild", "Chaos Crew", "Stick 'Em", "Hand of Anubis"],
  "Quickspin": ["Big Bad Wolf", "Sakura Fortune 2", "Sticky Bandits"],
};

const PROVIDERS = Object.keys(PRESET_SLOTS);

const STATUS_CONFIG: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: typeof Clock }> = {
  pending: { label: "Afventer", variant: "secondary", icon: Clock },
  bonus_hit: { label: "Bonus Hit! 🎉", variant: "default", icon: CheckCircle2 },
  no_bonus: { label: "Ingen Bonus", variant: "outline", icon: Minus },
  rejected: { label: "Afvist", variant: "destructive", icon: XCircle },
};

export function SlotRequestForm() {
  const { user } = useAuth();
  const { data: myRequests, isLoading: requestsLoading } = useMySlotRequests();
  const createRequest = useCreateSlotRequest();

  const [provider, setProvider] = useState("");
  const [customProvider, setCustomProvider] = useState("");
  const [slot, setSlot] = useState("");
  const [customSlot, setCustomSlot] = useState("");

  const isAndetProvider = provider === "Andet";
  const isAndetSlot = slot === "Andet";
  const slotsForProvider = !isAndetProvider && provider ? PRESET_SLOTS[provider] ?? [] : [];

  const hasPendingRequest = myRequests?.some((r) => r.status === "pending");

  const canSubmit =
    user &&
    !hasPendingRequest &&
    !createRequest.isPending &&
    (isAndetProvider
      ? customProvider.trim() && customSlot.trim()
      : provider &&
        (isAndetSlot ? customSlot.trim() : slot && slot !== ""));

  const handleSubmit = () => {
    if (!canSubmit) return;

    const finalProvider = isAndetProvider ? customProvider.trim() : provider;
    const finalSlot = isAndetProvider || isAndetSlot ? customSlot.trim() : slot;
    const isCustom = isAndetProvider || isAndetSlot;

    createRequest.mutate(
      { slot_name: finalSlot, provider: finalProvider, is_custom: isCustom },
      {
        onSuccess: () => {
          setProvider("");
          setCustomProvider("");
          setSlot("");
          setCustomSlot("");
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

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="space-y-4">
        {hasPendingRequest && (
          <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
            Du har allerede en aktiv request. Vent til den er behandlet, før du sender en ny.
          </p>
        )}

        <div className="space-y-2">
          <Label>Udbyder</Label>
          <Select value={provider} onValueChange={(v) => { setProvider(v); setSlot(""); setCustomSlot(""); setCustomProvider(""); }}>
            <SelectTrigger>
              <SelectValue placeholder="Vælg udbyder..." />
            </SelectTrigger>
            <SelectContent>
              {PROVIDERS.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
              <SelectItem value="Andet">Andet (skriv selv)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isAndetProvider && (
          <div className="space-y-2">
            <Label>Udbyder navn</Label>
            <Input
              placeholder="Skriv udbyderens navn..."
              value={customProvider}
              onChange={(e) => setCustomProvider(e.target.value)}
            />
          </div>
        )}

        {(provider && !isAndetProvider) && (
          <div className="space-y-2">
            <Label>Slot</Label>
            <Select value={slot} onValueChange={(v) => { setSlot(v); setCustomSlot(""); }}>
              <SelectTrigger>
                <SelectValue placeholder="Vælg slot..." />
              </SelectTrigger>
              <SelectContent>
                {slotsForProvider.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
                <SelectItem value="Andet">Andet (skriv selv)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {(isAndetProvider || isAndetSlot) && (
          <div className="space-y-2">
            <Label>Slot navn</Label>
            <Input
              placeholder="Skriv slottens navn..."
              value={customSlot}
              onChange={(e) => setCustomSlot(e.target.value)}
            />
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full sm:w-auto gap-2"
        >
          {createRequest.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Send Request
        </Button>
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
            {myRequests.map((req) => {
              const config = STATUS_CONFIG[req.status] || STATUS_CONFIG.pending;
              const Icon = config.icon;
              return (
                <div
                  key={req.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
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
        </div>
      ) : null}
    </div>
  );
}

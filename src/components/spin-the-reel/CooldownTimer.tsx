import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CooldownTimerProps {
  cooldownEnd: string | null;
  onExpired: () => void;
}

export function CooldownTimer({ cooldownEnd, onExpired }: CooldownTimerProps) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!cooldownEnd) {
      setIsExpired(true);
      return;
    }

    const endTime = new Date(cooldownEnd).getTime();

    const update = () => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft("");
        onExpired();
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
      setIsExpired(false);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [cooldownEnd, onExpired]);

  if (isExpired || !cooldownEnd) return null;

  return (
    <div className="flex items-center gap-2 text-muted-foreground bg-muted/30 rounded-lg px-4 py-2">
      <Clock className="h-4 w-4" />
      <span className="text-sm">Næste spin om:</span>
      <span className="font-mono font-bold text-foreground">{timeLeft}</span>
    </div>
  );
}

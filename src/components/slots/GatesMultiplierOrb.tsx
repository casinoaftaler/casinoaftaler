import { cn } from "@/lib/utils";
import multiplierOrbImg from "@/assets/slots/gates/multiplier-orb.png";

interface GatesMultiplierOrbProps {
  multiplierValue: number;
  isActive: boolean;
  compact?: boolean;
}

export function GatesMultiplierOrb({ multiplierValue, isActive, compact = false }: GatesMultiplierOrbProps) {
  if (!isActive) return null;

  const orbSize = compact ? 80 : 120;

  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="uppercase tracking-widest font-black text-blue-300/90"
        style={{
          fontSize: compact ? 8 : 10,
          textShadow: "0 1px 4px rgba(59,130,246,0.6)",
          letterSpacing: "0.12em",
        }}
      >
        Total Multiplier
      </span>
      <div className="relative flex items-center justify-center" style={{ width: orbSize * 1.4, height: orbSize }}>
        <img
          src={multiplierOrbImg}
          alt="Multiplier orb"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_0_20px_rgba(147,51,234,0.5)]"
          draggable={false}
        />
        <span
          className={cn(
            "relative z-10 font-black tabular-nums text-white",
            multiplierValue > 0 && "animate-pulse",
          )}
          style={{
            fontSize: compact ? 20 : 30,
            textShadow: "0 0 16px rgba(59,130,246,0.9), 0 2px 6px rgba(0,0,0,0.8), 0 0 40px rgba(147,51,234,0.5)",
            lineHeight: 1,
          }}
        >
          x{multiplierValue}
        </span>
      </div>
    </div>
  );
}

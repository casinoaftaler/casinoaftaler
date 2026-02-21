import React from "react";
import { cn } from "@/lib/utils";
import type { IntensityState } from "@/hooks/useGatesIntensity";
import zeusSprite from "@/assets/slots/gates/zeus-character.png";

interface GatesZeusCharacterProps {
  intensityState: IntensityState;
  chainLevel: number;
  isBonusActive?: boolean;
}

export function GatesZeusCharacter({ intensityState, chainLevel, isBonusActive = false }: GatesZeusCharacterProps) {
  return (
    <div className={cn(
      "gates-zeus-wrapper relative flex items-center justify-center",
      "w-[120px] h-[100px]",
      isBonusActive && "transform -translate-y-1",
    )}>
      {/* Background aura glow */}
      <div className={cn(
        "gates-zeus-aura absolute inset-0 rounded-full",
        intensityState === 'idle' && !isBonusActive && "gates-zeus-aura-idle",
        intensityState === 'idle' && isBonusActive && "gates-zeus-aura-win",
        intensityState === 'spin' && "gates-zeus-aura-spin",
        intensityState === 'win' && "gates-zeus-aura-win",
        intensityState === 'climax' && "gates-zeus-aura-climax",
      )} />

      {/* Zeus sprite image */}
      <div className={cn(
        "gates-zeus-body relative z-10 flex items-center justify-center",
        intensityState === 'idle' && !isBonusActive && "gates-zeus-idle",
        intensityState === 'idle' && isBonusActive && "gates-zeus-win",
        intensityState === 'spin' && "gates-zeus-spin",
        intensityState === 'win' && "gates-zeus-win",
        intensityState === 'climax' && "gates-zeus-climax",
      )}>
        <img
          src={zeusSprite}
          alt="Zeus"
          className={cn(
            "w-[120px] h-[120px] object-contain pointer-events-none select-none",
            "gates-zeus-img-idle",
            intensityState === 'spin' && "gates-zeus-img-spin",
            intensityState === 'win' && "gates-zeus-img-win",
            intensityState === 'climax' && "gates-zeus-img-climax",
            isBonusActive && "gates-zeus-img-bonus",
          )}
          draggable={false}
        />
      </div>

      {/* Hand lightning crackers */}
      <div className={cn(
        "gates-zeus-lightning-hands absolute z-20",
        "pointer-events-none",
        isBonusActive
          ? "gates-zeus-crackle-climax"
          : cn(
              intensityState === 'idle' && "gates-zeus-crackle-idle",
              intensityState === 'spin' && "opacity-0",
              intensityState === 'win' && "gates-zeus-crackle-win",
              intensityState === 'climax' && "gates-zeus-crackle-climax",
            ),
      )}>
        <div className="absolute -left-6 top-10 w-3 h-3 gates-zeus-spark" />
        <div className="absolute -right-6 top-10 w-3 h-3 gates-zeus-spark" style={{ animationDelay: '0.3s' }} />
      </div>
    </div>
  );
}

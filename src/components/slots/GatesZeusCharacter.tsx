import React from "react";
import { cn } from "@/lib/utils";
import type { IntensityState } from "@/hooks/useGatesIntensity";

interface GatesZeusCharacterProps {
  intensityState: IntensityState;
  chainLevel: number;
}

export function GatesZeusCharacter({ intensityState, chainLevel }: GatesZeusCharacterProps) {
  return (
    <div className={cn(
      "gates-zeus-wrapper relative flex items-center justify-center",
      "w-[120px] h-[100px]",
    )}>
      {/* Background aura glow */}
      <div className={cn(
        "gates-zeus-aura absolute inset-0 rounded-full",
        intensityState === 'idle' && "gates-zeus-aura-idle",
        intensityState === 'spin' && "gates-zeus-aura-spin",
        intensityState === 'win' && "gates-zeus-aura-win",
        intensityState === 'climax' && "gates-zeus-aura-climax",
      )} />

      {/* Zeus body silhouette */}
      <div className={cn(
        "gates-zeus-body relative z-10 flex flex-col items-center",
        intensityState === 'idle' && "gates-zeus-idle",
        intensityState === 'spin' && "gates-zeus-spin",
        intensityState === 'win' && "gates-zeus-win",
        intensityState === 'climax' && "gates-zeus-climax",
      )}>
        {/* Head */}
        <div className="relative">
          <div className={cn(
            "w-10 h-10 rounded-full relative",
            "bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500",
            "shadow-[0_0_12px_rgba(147,197,253,0.3)]",
          )}>
            {/* Eyes */}
            <div className="absolute top-[14px] left-[10px] flex gap-[8px]">
              <div className={cn(
                "gates-zeus-eye w-[5px] h-[5px] rounded-full",
                intensityState === 'idle' && "bg-blue-300/70 gates-zeus-eye-idle",
                intensityState === 'spin' && "bg-blue-200 gates-zeus-eye-spin",
                intensityState === 'win' && "bg-yellow-300 gates-zeus-eye-win shadow-[0_0_6px_rgba(250,204,21,0.6)]",
                intensityState === 'climax' && "bg-yellow-200 gates-zeus-eye-climax shadow-[0_0_10px_rgba(250,204,21,0.9)]",
              )} />
              <div className={cn(
                "gates-zeus-eye w-[5px] h-[5px] rounded-full",
                intensityState === 'idle' && "bg-blue-300/70 gates-zeus-eye-idle",
                intensityState === 'spin' && "bg-blue-200 gates-zeus-eye-spin",
                intensityState === 'win' && "bg-yellow-300 gates-zeus-eye-win shadow-[0_0_6px_rgba(250,204,21,0.6)]",
                intensityState === 'climax' && "bg-yellow-200 gates-zeus-eye-climax shadow-[0_0_10px_rgba(250,204,21,0.9)]",
              )} />
            </div>
            {/* Beard */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-4 bg-gradient-to-b from-slate-400 to-slate-500/60 rounded-b-full" />
          </div>
          {/* Crown / helmet */}
          <div className={cn(
            "absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3",
            "bg-gradient-to-t from-yellow-600 to-yellow-400",
            "clip-crown",
            intensityState === 'climax' && "shadow-[0_0_12px_rgba(250,204,21,0.7)]",
          )} style={{ clipPath: 'polygon(10% 100%, 0% 30%, 25% 60%, 50% 0%, 75% 60%, 100% 30%, 90% 100%)' }} />
        </div>

        {/* Torso + Arms */}
        <div className="relative -mt-1">
          {/* Arms */}
          <div className={cn(
            "gates-zeus-arms absolute top-1 flex justify-between w-16",
            "-left-[12px]",
          )}>
            {/* Left arm */}
            <div className={cn(
              "gates-zeus-arm-left w-2 h-8 rounded-full bg-gradient-to-b from-slate-400 to-slate-500",
              "origin-top",
              intensityState === 'idle' && "gates-zeus-arm-idle-left",
              intensityState === 'win' && "gates-zeus-arm-win-left",
              intensityState === 'climax' && "gates-zeus-arm-climax",
            )} />
            {/* Right arm */}
            <div className={cn(
              "gates-zeus-arm-right w-2 h-8 rounded-full bg-gradient-to-b from-slate-400 to-slate-500",
              "origin-top",
              intensityState === 'idle' && "gates-zeus-arm-idle-right",
              intensityState === 'win' && "gates-zeus-arm-win-right",
              intensityState === 'climax' && "gates-zeus-arm-climax",
            )} />
          </div>
          {/* Torso */}
          <div className="w-8 h-10 bg-gradient-to-b from-slate-400 via-blue-800/80 to-blue-900/70 rounded-b-lg mx-auto" />
        </div>
      </div>

      {/* Hand lightning crackers (idle random + climax constant) */}
      <div className={cn(
        "gates-zeus-lightning-hands absolute z-20",
        "pointer-events-none",
        intensityState === 'idle' && "gates-zeus-crackle-idle",
        intensityState === 'spin' && "opacity-0",
        intensityState === 'win' && "gates-zeus-crackle-win",
        intensityState === 'climax' && "gates-zeus-crackle-climax",
      )}>
        {/* Left spark */}
        <div className="absolute -left-6 top-10 w-3 h-3 gates-zeus-spark" />
        {/* Right spark */}
        <div className="absolute -right-6 top-10 w-3 h-3 gates-zeus-spark" style={{ animationDelay: '0.3s' }} />
      </div>
    </div>
  );
}

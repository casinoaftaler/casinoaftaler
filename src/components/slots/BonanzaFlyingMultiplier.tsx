import React from "react";

export interface FlyingMultiplier {
  id: string;
  value: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
}

interface BonanzaFlyingMultiplierProps {
  flyers: FlyingMultiplier[];
  className?: string;
}

export function BonanzaFlyingMultiplier({ flyers, className }: BonanzaFlyingMultiplierProps) {
  return (
    <>
      {flyers.map((f) => {
        const dx = f.targetX - f.startX;
        const dy = f.targetY - f.startY;
        return (
          <div
            key={f.id}
            className={`${className || 'bonanza-mult-fly'} absolute pointer-events-none z-50`}
            style={{
              left: f.startX,
              top: f.startY,
              "--fly-dx": `${dx}px`,
              "--fly-dy": `${dy}px`,
            } as React.CSSProperties}
          >
            <span className={`text-3xl font-black drop-shadow-[0_0_16px_rgba(59,130,246,0.8)] [text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_0_20px_rgba(59,130,246,0.6)] ${className ? 'text-blue-300' : 'text-yellow-300'}`}>
              {f.value}x
            </span>
          </div>
        );
      })}
    </>
  );
}

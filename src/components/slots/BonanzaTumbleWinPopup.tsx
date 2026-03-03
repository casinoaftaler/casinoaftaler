import React from "react";

export interface TumbleWinPopup {
  id: string;
  amount: number;
  x: number;
  y: number;
}

interface BonanzaTumbleWinPopupProps {
  popups: TumbleWinPopup[];
}

export function BonanzaTumbleWinPopup({ popups }: BonanzaTumbleWinPopupProps) {
  return (
    <>
      {popups.map((p) => (
        <div
          key={p.id}
          className="bonanza-win-float absolute pointer-events-none z-50"
          style={{
            left: p.x,
            top: p.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span className="text-5xl font-black text-pink-300 drop-shadow-[0_0_12px_rgba(236,72,153,0.7)] [text-shadow:0_2px_6px_rgba(0,0,0,0.9),0_0_16px_rgba(236,72,153,0.5)]">
            +{p.amount.toLocaleString()}
          </span>
        </div>
      ))}
    </>
  );
}

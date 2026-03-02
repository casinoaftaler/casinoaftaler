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
          <span className="text-lg font-black text-green-300 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)] [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
            +{p.amount.toLocaleString()}
          </span>
        </div>
      ))}
    </>
  );
}

import React, { useMemo } from "react";

const GRID = 4; // 4x4 = 16 fragments
const TOTAL = GRID * GRID;

interface BombFractureExplosionProps {
  imageUrl?: string | null;
  fallbackValue?: number;
  scaleValue: number;
  width: number;
  height: number;
}

function buildFragments(width: number, height: number) {
  const fragments: Array<{
    row: number;
    col: number;
    clipInset: string;
    tx: number;
    ty: number;
    rot: number;
    delay: number;
  }> = [];

  const centerCol = (GRID - 1) / 2;
  const centerRow = (GRID - 1) / 2;

  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      const top = (r / GRID) * 100;
      const left = (c / GRID) * 100;
      const bottom = ((GRID - r - 1) / GRID) * 100;
      const right = ((GRID - c - 1) / GRID) * 100;
      const clipInset = `${top}% ${right}% ${bottom}% ${left}%`;

      // Direction from center
      const dx = c - centerCol;
      const dy = r - centerRow;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.5;
      const spread = 60 + dist * 30; // px outward

      const tx = (dx / dist) * spread + (Math.random() - 0.5) * 20;
      const ty = (dy / dist) * spread + (Math.random() - 0.5) * 20;
      const rot = (Math.random() - 0.5) * 360;
      const delay = Math.random() * 80;

      fragments.push({ row: r, col: c, clipInset, tx, ty, rot, delay });
    }
  }

  return fragments;
}

export const BombFractureExplosion = React.memo(function BombFractureExplosion({
  imageUrl,
  fallbackValue,
  scaleValue,
  width,
  height,
}: BombFractureExplosionProps) {
  const fragments = useMemo(() => buildFragments(width, height), [width, height]);

  return (
    <div className="absolute inset-0" style={{ width, height }}>
      {fragments.map((frag, i) => (
        <div
          key={i}
          className="absolute inset-0 bonanza-bomb-fracture"
          style={{
            clipPath: `inset(${frag.clipInset})`,
            '--frag-tx': `${frag.tx}px`,
            '--frag-ty': `${frag.ty}px`,
            '--frag-rot': `${frag.rot}deg`,
            animationDelay: `${frag.delay}ms`,
          } as React.CSSProperties}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="bomb exploding"
              className="w-full h-full object-contain"
              style={{ transform: `scale(${scaleValue})` }}
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-3xl">💣</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

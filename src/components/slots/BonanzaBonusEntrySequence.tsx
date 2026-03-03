import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

type BonusEntryPhase = 'idle' | 'flash' | 'explosion' | 'vignette' | 'reveal' | 'hold';

interface BonanzaBonusEntrySequenceProps {
  isActive: boolean;
  freeSpinsAwarded: number;
  onComplete: () => void;
}

/* ── Particle system ── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; color: string;
  alpha: number; decay: number;
  gravity: number;
}

const COLORS = [
  'rgba(236,72,153,', // pink-500
  'rgba(217,70,239,', // fuchsia-500
  'rgba(250,204,21,', // yellow-400
  'rgba(251,191,36,', // amber-400
  'rgba(255,255,255,', // white
  'rgba(244,114,182,', // pink-400
];

function spawnParticles(cx: number, cy: number, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 8;
    particles.push({
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 2 + Math.random() * 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 1,
      decay: 0.008 + Math.random() * 0.012,
      gravity: 0.04 + Math.random() * 0.04,
    });
  }
  return particles;
}

export function BonanzaBonusEntrySequence({ isActive, freeSpinsAwarded, onComplete }: BonanzaBonusEntrySequenceProps) {
  const [phase, setPhase] = useState<BonusEntryPhase>('idle');
  const [spinsCountUp, setSpinsCountUp] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const stableComplete = useRef(onComplete);
  stableComplete.current = onComplete;

  // Canvas particle loop
  const startParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    particlesRef.current = spawnParticles(w / 2, h / 2, 140);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      let alive = 0;
      for (const p of particlesRef.current) {
        if (p.alpha <= 0) continue;
        alive++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;
        p.size *= 0.995;
        if (p.alpha <= 0) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();
      }
      if (alive > 0) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    draw();
  }, []);

  // Phase sequencing
  useEffect(() => {
    if (!isActive) { setPhase('idle'); setSpinsCountUp(0); return; }

    setPhase('flash');
    const t0 = setTimeout(() => { setPhase('explosion'); startParticles(); }, 300);
    const t1 = setTimeout(() => setPhase('vignette'), 1200);
    const t2 = setTimeout(() => setPhase('reveal'), 2000);
    const t3 = setTimeout(() => setPhase('hold'), 3500);
    const t4 = setTimeout(() => stableComplete.current(), 5000);

    return () => { [t0, t1, t2, t3, t4].forEach(clearTimeout); cancelAnimationFrame(rafRef.current); };
  }, [isActive, startParticles]);

  // Drum-roll counter
  useEffect(() => {
    if (phase !== 'reveal') return;
    setSpinsCountUp(0);
    let current = 0;
    const step = Math.max(1, Math.floor(freeSpinsAwarded / 20));
    const interval = setInterval(() => {
      current += step;
      if (current >= freeSpinsAwarded) { current = freeSpinsAwarded; clearInterval(interval); }
      setSpinsCountUp(current);
    }, 60);
    return () => clearInterval(interval);
  }, [phase, freeSpinsAwarded]);

  if (!isActive) return null;

  const showVignette = phase === 'vignette' || phase === 'reveal' || phase === 'hold';
  const showContent = phase === 'reveal' || phase === 'hold';
  const isCountingDone = spinsCountUp >= freeSpinsAwarded;

  return (
    <div className={cn(
      "fixed inset-0 z-50 pointer-events-auto",
      phase === 'flash' && "bonanza-screen-shake"
    )}>
      {/* Flash overlay */}
      <div className={cn(
        "absolute inset-0 z-[5] transition-opacity duration-150",
        phase === 'flash' ? "opacity-100" : "opacity-0"
      )} style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(236,72,153,0.7) 60%, rgba(217,70,239,0.5) 100%)' }} />

      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[10]"
        style={{ pointerEvents: 'none' }}
      />

      {/* Vignette removed */}

      {/* Radial light burst behind text */}
      {showContent && (
        <div className="absolute inset-0 z-[18] flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(251,191,36,0.35) 0%, rgba(236,72,153,0.15) 40%, transparent 70%)',
              animation: 'glow-pulse 2s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* Content: title + counter */}
      <div className={cn(
        "absolute inset-0 z-[20] flex flex-col items-center justify-center",
        showContent ? "opacity-100" : "opacity-0"
      )}>
        {/* Starburst SVG */}
        <svg className="bonanza-title-scale-in mb-2" width="80" height="80" viewBox="0 0 80 80" fill="none">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const inner = 12;
            const outer = i % 2 === 0 ? 38 : 26;
            return (
              <line
                key={i}
                x1={40 + Math.cos(angle) * inner}
                y1={40 + Math.sin(angle) * inner}
                x2={40 + Math.cos(angle) * outer}
                y2={40 + Math.sin(angle) * outer}
                stroke="rgba(251,191,36,0.9)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}
          <circle cx="40" cy="40" r="10" fill="rgba(251,191,36,0.85)" />
        </svg>

        {/* FREE SPINS metallic title */}
        <h2
          className="bonanza-title-scale-in text-4xl sm:text-6xl font-black tracking-widest"
          style={{
            backgroundImage: 'linear-gradient(90deg, #b8860b 0%, #ffd700 25%, #fffacd 50%, #ffd700 75%, #b8860b 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'bonanza-gold-sweep 1.5s ease-out forwards',
            filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.6)) drop-shadow(0 0 40px rgba(251,191,36,0.3))',
          }}
        >
          FREE SPINS
        </h2>

        {/* Spin count with drum-roll */}
        <div className="mt-6">
          <div
            className={cn(
              "text-7xl sm:text-9xl font-black",
              !isCountingDone && "bonanza-counter-drum"
            )}
            style={{
              backgroundImage: 'linear-gradient(180deg, #ffd700 0%, #ff8c00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(250,204,21,0.5))',
            }}
          >
            {spinsCountUp}
          </div>
        </div>

        {/* Subtitle */}
        <div
          className="mt-4 text-lg sm:text-xl font-medium"
          style={{
            color: 'rgba(244,114,182,0.9)',
            opacity: showContent ? 1 : 0,
            transition: 'opacity 0.6s ease 0.5s',
          }}
        >
          Multiplier bomber aktive! 💣
        </div>
      </div>
    </div>
  );
}

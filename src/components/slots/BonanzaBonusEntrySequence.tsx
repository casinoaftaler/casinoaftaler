import React, { useState, useEffect, useRef, useCallback } from "react";
import { BonanzaOverlayCard } from "./BonanzaOverlayCard";

type BonusEntryPhase = 'idle' | 'flash' | 'explosion' | 'reveal' | 'hold';

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
  'rgba(236,72,153,', 'rgba(217,70,239,', 'rgba(250,204,21,',
  'rgba(251,191,36,', 'rgba(255,255,255,', 'rgba(244,114,182,',
];

function spawnParticles(cx: number, cy: number, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 8;
    particles.push({
      x: cx, y: cy,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      size: 2 + Math.random() * 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 1, decay: 0.008 + Math.random() * 0.012,
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
        p.x += p.vx; p.y += p.vy; p.vy += p.gravity;
        p.alpha -= p.decay; p.size *= 0.995;
        if (p.alpha <= 0) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();
      }
      if (alive > 0) rafRef.current = requestAnimationFrame(draw);
    };
    draw();
  }, []);

  // Phase sequencing
  useEffect(() => {
    if (!isActive) { setPhase('idle'); setSpinsCountUp(0); return; }
    setPhase('flash');
    const t0 = setTimeout(() => { setPhase('explosion'); startParticles(); }, 300);
    const t1 = setTimeout(() => setPhase('reveal'), 1200);
    const t2 = setTimeout(() => setPhase('hold'), 3000);
    return () => { [t0, t1, t2].forEach(clearTimeout); cancelAnimationFrame(rafRef.current); };
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

  const showContent = phase === 'reveal' || phase === 'hold';

  return (
    <>
      {/* Flash overlay */}
      {phase === 'flash' && (
        <div className="fixed inset-0 z-50 animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(236,72,153,0.7) 60%, rgba(217,70,239,0.5) 100%)' }}
        />
      )}

      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-50 pointer-events-none"
      />

      <BonanzaOverlayCard
        showContent={showContent}
        onDismiss={() => stableComplete.current()}
        bubbleContent={
          <span className="relative z-10 text-5xl sm:text-6xl font-black text-white tabular-nums"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.3)' }}>
            {spinsCountUp}
          </span>
        }
        bottomLabel="FREE SPINS"
      />
    </>
  );
}

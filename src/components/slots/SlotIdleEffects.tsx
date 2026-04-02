import React, { useRef, useEffect, useCallback } from "react";

type Theme = "gold" | "purple" | "pink" | "blue";

interface SlotIdleEffectsProps {
  isIdle: boolean;
  theme: Theme;
  width: number;
  height: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  color: string;
}

const THEME_COLORS: Record<Theme, string[]> = {
  gold: ["rgba(251,191,36,", "rgba(255,215,0,", "rgba(245,158,11,"],
  purple: ["rgba(168,85,247,", "rgba(192,132,252,", "rgba(139,92,246,"],
  pink: ["rgba(236,72,153,", "rgba(244,114,182,", "rgba(251,113,133,"],
  blue: ["rgba(59,130,246,", "rgba(96,165,250,", "rgba(37,99,235,"],
};

const MAX_PARTICLES = 18;
const SPAWN_INTERVAL = 400; // ms between spawns

export const SlotIdleEffects = React.memo(function SlotIdleEffects({
  isIdle,
  theme,
  width,
  height,
}: SlotIdleEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);
  const isIdleRef = useRef(isIdle);

  isIdleRef.current = isIdle;

  const spawnParticle = useCallback(() => {
    const colors = THEME_COLORS[theme];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const maxAlpha = 0.15 + Math.random() * 0.2;
    return {
      x: Math.random() * width,
      y: height + 4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(0.3 + Math.random() * 0.5),
      size: 1.5 + Math.random() * 2.5,
      alpha: 0,
      maxAlpha,
      life: 0,
      maxLife: 3000 + Math.random() * 2000,
      color,
    } as Particle;
  }, [theme, width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Detect mobile for reduced particle work
    const isMobile = window.innerWidth < 768;
    const maxParticles = isMobile ? 8 : MAX_PARTICLES;
    const spawnDelay = isMobile ? 800 : SPAWN_INTERVAL;

    let lastTime = performance.now();
    let running = true;

    const draw = (now: number) => {
      if (!running) return;
      const dt = now - lastTime;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      if (isIdleRef.current) {
        if (now - lastSpawnRef.current > spawnDelay && particlesRef.current.length < maxParticles) {
          particlesRef.current.push(spawnParticle());
          lastSpawnRef.current = now;
        }
      }

      const alive: Particle[] = [];
      for (const p of particlesRef.current) {
        p.life += dt;
        p.x += p.vx;
        p.y += p.vy;
        p.x += Math.sin(p.life * 0.002 + p.y * 0.01) * 0.15;

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.2) {
          p.alpha = p.maxAlpha * (lifeRatio / 0.2);
        } else if (lifeRatio > 0.7) {
          p.alpha = p.maxAlpha * (1 - (lifeRatio - 0.7) / 0.3);
        } else {
          p.alpha = p.maxAlpha;
        }

        if (p.life < p.maxLife && p.y > -10) {
          alive.push(p);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.fill();
          // Skip glow on mobile to reduce overdraw
          if (!isMobile) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `${p.color}${p.alpha * 0.3})`;
            ctx.fill();
          }
        }
      }
      particlesRef.current = alive;

      // Stop RAF when not idle and no particles remain
      if (!isIdleRef.current && alive.length === 0) {
        ctx.clearRect(0, 0, width, height);
        rafRef.current = 0;
        return;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [width, height, spawnParticle]);

  // Clear particles when not idle
  useEffect(() => {
    if (!isIdle) {
      // Let existing particles fade naturally — just stop spawning (handled by isIdleRef)
    }
  }, [isIdle]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none z-[2]"
      style={{ width, height }}
    />
  );
});

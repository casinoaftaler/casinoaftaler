import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  rotSpeed: number;
  delay: number;
}

const COLORS = [
  "hsl(260, 70%, 60%)",
  "hsl(280, 80%, 55%)",
  "hsl(210, 80%, 60%)",
  "hsl(45, 100%, 60%)",
  "hsl(150, 70%, 50%)",
  "hsl(340, 80%, 55%)",
];

export function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 20,
      y: 30,
      rotation: Math.random() * 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 4 + Math.random() * 6,
      speedX: (Math.random() - 0.5) * 80,
      speedY: -30 - Math.random() * 60,
      rotSpeed: (Math.random() - 0.5) * 720,
      delay: Math.random() * 0.3,
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), 2500);
    return () => clearTimeout(timer);
  }, [active]);

  if (!particles.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: "1px",
            animation: `confetti-fall 2s cubic-bezier(0.25, 0, 0.5, 1) ${p.delay}s forwards`,
            ["--tx" as string]: `${p.speedX}px`,
            ["--ty" as string]: `${Math.abs(p.speedY) + 400}px`,
            ["--rot" as string]: `${p.rotSpeed}deg`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

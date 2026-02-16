import { useEffect, useRef, useState, ReactNode } from "react";

interface EnergySweepProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a section and plays a horizontal energy sweep once when it enters viewport.
 * No layout impact — purely overlay-based.
 */
export function EnergySweep({ children, className }: EnergySweepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Skip on low-end devices
    if (typeof navigator !== "undefined" && (navigator as any).hardwareConcurrency < 4) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          setAnimating(true);
          // Stop animating after the sweep completes
          setTimeout(() => setAnimating(false), 5000);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <div ref={ref} className={`relative ${className || ""}`}>
      {children}

      {/* Energy sweep overlay — no layout impact */}
      {animating && (
        <div
          className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
          aria-hidden="true"
        >
          {/* Main energy line */}
          <div
            className="energy-sweep-line"
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: "120px",
              height: "2px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, transparent, hsl(260 70% 60%), hsl(220 80% 60%), transparent)",
              boxShadow: "0 0 20px 6px hsl(260 60% 50% / 0.3), 0 0 60px 12px hsl(220 70% 50% / 0.15)",
              opacity: 0,
              transform: "translateX(-150px) translateY(-50%)",
              animation: "energy-sweep 5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
            }}
          />

          {/* Diffused glow behind the line */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: "200px",
              height: "80px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, hsl(260 60% 50% / 0.12), transparent 70%)",
              opacity: 0,
              transform: "translateX(-200px) translateY(-50%)",
              animation: "energy-sweep-glow 5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
            }}
          />

          {/* Particle trail */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${48 + (i % 3 - 1) * 4}%`,
                left: 0,
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: i % 2 === 0
                  ? "hsl(260 70% 65%)"
                  : "hsl(220 80% 65%)",
                opacity: 0,
                transform: "translateX(-100px)",
                animation: `energy-particle 5s cubic-bezier(0.25, 0.1, 0.25, 1) ${i * 0.15}s forwards`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

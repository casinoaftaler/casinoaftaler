import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import "@/styles/slot-animations.css";

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  type: "coin" | "sparkle" | "star" | "orb" | "rune" | "lightning" | "ring" | "firework";
  delay: number;
  rising?: boolean;
}

interface AmbientOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

interface WinCelebrationProps {
  isActive: boolean;
  winAmount: number;
  bet: number;
  gameId?: string;
  onAnimationComplete?: () => void;
}

const EGYPTIAN_COLORS = [
  "hsl(45, 100%, 50%)",
  "hsl(36, 100%, 50%)",
  "hsl(51, 100%, 60%)",
  "hsl(42, 95%, 55%)",
];

const WIZARD_COLORS = [
  "hsl(270, 80%, 60%)",
  "hsl(260, 90%, 55%)",
  "hsl(280, 70%, 65%)",
  "hsl(250, 75%, 60%)",
  "hsl(290, 85%, 70%)",
  "hsl(240, 70%, 55%)",
];

const BONANZA_COLORS = [
  "hsl(330, 80%, 65%)",
  "hsl(340, 90%, 60%)",
  "hsl(320, 70%, 70%)",
  "hsl(350, 85%, 65%)",
  "hsl(45, 100%, 60%)",
  "hsl(300, 75%, 60%)",
];

const FIREWORK_COLORS = [
  "hsl(0, 100%, 65%)",
  "hsl(45, 100%, 60%)",
  "hsl(120, 80%, 55%)",
  "hsl(200, 90%, 60%)",
  "hsl(280, 80%, 65%)",
  "hsl(330, 90%, 65%)",
  "hsl(60, 100%, 70%)",
];

const WIZARD_RUNES = ["᛭", "ᚹ", "ᛟ", "ᛏ", "ᚨ", "ᛗ", "ᚠ", "ᛉ"];
const EGYPTIAN_HIEROGLYPHS = ["𓂀", "𓃭", "𓆣", "𓇳", "𓊝", "𓋴", "𓌙", "𓏏"];
const BONANZA_CANDIES = ["🍭", "🍬", "🍰", "🧁", "🎂", "🍩", "🍪", "🍫"];
const FIREWORK_EMOJIS = ["🎆", "🎇", "✨", "💥", "🌟", "⭐", "💫", "🔥"];

export function WinCelebration({ isActive, winAmount, bet, gameId, onAnimationComplete }: WinCelebrationProps) {
  const isWizard = gameId === "rise-of-fedesvin";
  const isBonanza = gameId === "fedesvin-bonanza";
  const COLORS = isBonanza ? BONANZA_COLORS : isWizard ? WIZARD_COLORS : EGYPTIAN_COLORS;
  const SYMBOLS = isBonanza ? BONANZA_CANDIES : isWizard ? WIZARD_RUNES : EGYPTIAN_HIEROGLYPHS;
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showBigWin, setShowBigWin] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showShockwave, setShowShockwave] = useState(false);
  const [counterSkipped, setCounterSkipped] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [fireworkBursts, setFireworkBursts] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);
  const hasTriggeredCompleteRef = useRef(false);
  const skipRef = useRef(false);
  const clickCountRef = useRef(0);

  const handleSkip = useCallback(() => {
    if (hasTriggeredCompleteRef.current) return;
    
    clickCountRef.current += 1;
    const clicks = clickCountRef.current;
    
    // Progressive speed-up: each click doubles speed
    if (!isPulsing) {
      const newSpeed = Math.min(1 + clicks * 1.5, 12);
      setSpeedMultiplier(newSpeed);
      
      // After 5+ clicks or if speed is maxed, skip to end
      if (clicks >= 5 || newSpeed >= 10) {
        setCounterSkipped(true);
      }
      return;
    }
    
    // Click during pulse: dismiss
    if (skipRef.current) return;
    skipRef.current = true;
    setIsPulsing(false);
    setIsFadingOut(true);
    setTimeout(() => {
      setShowBigWin(false);
      setParticles([]);
      setFireworkBursts([]);
      setIsFadingOut(false);
      setShowShockwave(false);
      hasTriggeredCompleteRef.current = true;
      onAnimationComplete?.();
    }, 400);
  }, [onAnimationComplete, isPulsing]);
  
  const winMultiplier = bet > 0 ? winAmount / bet : 0;
  // New tiers: BigWin 20x-99x, GigantiskWin 100x+
  const isBigWin = winMultiplier >= 20;
  const isGigantisk = winMultiplier >= 100;

  // For backward compat with effects code
  const isMegaWin = isGigantisk;
  const isEpicWin = isGigantisk;

  const pulseDuration = isGigantisk ? 7000 : 3500;
  const counterDuration = isGigantisk ? 10000 : 4000;
  const fadeDuration = isGigantisk ? 1500 : 800;
  
  const displayAmount = useAnimatedCounter(showBigWin ? winAmount : 0, { 
    duration: counterDuration, 
    startFrom: 0,
    playSound: showBigWin,
    isBigWin: true,
    skipToEnd: counterSkipped,
    speedMultiplier,
  });

  // Theme colors for effects
  const themeColors = useMemo(() => {
    if (isBonanza) {
      return {
        primary: "236, 72, 153",
        secondary: "250, 204, 21",
        accent: "192, 132, 252",
        glow: "rgba(236, 72, 153,",
        vignetteColor: "rgba(0,0,0,",
      };
    }
    if (isWizard) {
      return {
        primary: "168, 85, 247",
        secondary: "236, 72, 153",
        accent: "6, 182, 212",
        glow: "rgba(168, 85, 247,",
        vignetteColor: "rgba(0,0,0,",
      };
    }
    return {
      primary: "251, 191, 36",
      secondary: "255, 107, 107",
      accent: "255, 215, 0",
      glow: "rgba(251, 191, 36,",
      vignetteColor: "rgba(0,0,0,",
    };
  }, [isWizard, isBonanza]);

  // Ambient orbs for big wins
  const ambientOrbs = useMemo<AmbientOrb[]>(() => {
    if (!isActive || !isBigWin) return [];
    const count = isGigantisk ? 14 : 5;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 40 + Math.random() * 80,
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 3,
    }));
  }, [isActive, isBigWin, isGigantisk]);

  // Shockwave rings count
  const shockwaveCount = isGigantisk ? 5 : isBigWin ? 1 : 0;

  // Symbol orbit for gigantisk
  const orbitSymbols = useMemo(() => {
    if (!isActive || !isGigantisk) return [];
    const count = 10;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      symbol: SYMBOLS[i % SYMBOLS.length],
      delay: (i / count) * 3,
    }));
  }, [isActive, isGigantisk]);

  // Repeating firework bursts for GIGANTISK
  useEffect(() => {
    if (!showBigWin || !isGigantisk) {
      setFireworkBursts([]);
      return;
    }
    
    let burstId = 0;
    const spawnBurst = () => {
      const newBursts = Array.from({ length: 3 }, (_, i) => ({
        id: burstId++,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 60,
        delay: i * 0.15,
      }));
      setFireworkBursts(prev => [...prev.slice(-20), ...newBursts]);
    };
    
    spawnBurst(); // immediate
    const interval = setInterval(spawnBurst, 1200);
    return () => clearInterval(interval);
  }, [showBigWin, isGigantisk]);

  // Detect when counting is done and start pulse animation
  useEffect(() => {
    if (showBigWin && displayAmount === winAmount && winAmount > 0 && !hasTriggeredCompleteRef.current) {
      setIsPulsing(true);
      
      const pulseTimeout = setTimeout(() => {
        setIsPulsing(false);
        setIsFadingOut(true);
        
        const fadeTimeout = setTimeout(() => {
          setShowBigWin(false);
          setParticles([]);
          setFireworkBursts([]);
          setIsFadingOut(false);
          setShowShockwave(false);
          hasTriggeredCompleteRef.current = true;
          onAnimationComplete?.();
        }, fadeDuration);
        
        return () => clearTimeout(fadeTimeout);
      }, pulseDuration);
      
      return () => clearTimeout(pulseTimeout);
    }
  }, [displayAmount, winAmount, showBigWin, onAnimationComplete, pulseDuration, fadeDuration]);

  useEffect(() => {
    if (!isActive || winAmount <= 0) {
      setParticles([]);
      setShowBigWin(false);
      setIsFadingOut(false);
      setIsPulsing(false);
      setShowShockwave(false);
      setFireworkBursts([]);
      hasTriggeredCompleteRef.current = false;
      skipRef.current = false;
      setCounterSkipped(false);
      setSpeedMultiplier(1);
      clickCountRef.current = 0;
      return;
    }

    const baseCount = isGigantisk ? 120 : isBigWin ? 40 : 20;
    
    const newParticles: Particle[] = [];
    for (let i = 0; i < baseCount; i++) {
      const typeRoll = Math.random();
      let type: Particle["type"];
      if (isGigantisk) {
        // Gigantisk gets firework particles mixed in
        if (typeRoll > 0.8) type = "firework";
        else if (typeRoll > 0.6) type = "orb";
        else if (typeRoll > 0.35) type = "rune";
        else if (typeRoll > 0.15) type = "sparkle";
        else type = "star";
      } else if (isBonanza) {
        if (typeRoll > 0.7) type = "orb";
        else if (typeRoll > 0.45) type = "rune";
        else if (typeRoll > 0.2) type = "sparkle";
        else type = "star";
      } else if (isWizard) {
        if (typeRoll > 0.75) type = "orb";
        else if (typeRoll > 0.5) type = "rune";
        else if (typeRoll > 0.25) type = "sparkle";
        else type = "star";
      } else {
        if (typeRoll > 0.55) type = "coin";
        else if (typeRoll > 0.4) type = "orb";
        else if (typeRoll > 0.2) type = "sparkle";
        else type = "star";
      }

      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 1,
        color: isGigantisk 
          ? [...COLORS, ...FIREWORK_COLORS][Math.floor(Math.random() * (COLORS.length + FIREWORK_COLORS.length))]
          : COLORS[Math.floor(Math.random() * COLORS.length)],
        type,
        delay: Math.random() * 0.5,
      });
    }

    // Rising energy particles
    if (isBigWin) {
      const risingCount = isGigantisk ? 30 : 10;
      for (let i = 0; i < risingCount; i++) {
        newParticles.push({
          id: baseCount + i,
          x: Math.random() * 100,
          y: 0,
          rotation: Math.random() * 360,
          scale: 0.3 + Math.random() * 0.8,
          color: isGigantisk
            ? FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]
            : COLORS[Math.floor(Math.random() * COLORS.length)],
          type: isGigantisk ? (Math.random() > 0.5 ? "firework" : "sparkle") 
            : isBonanza ? (Math.random() > 0.5 ? "orb" : "sparkle") 
            : isWizard ? (Math.random() > 0.5 ? "orb" : "sparkle") 
            : (Math.random() > 0.5 ? "coin" : "sparkle"),
          delay: Math.random() * 1.5,
          rising: true,
        });
      }
    }

    // Lightning for gigantisk
    if (isGigantisk) {
      const lightningStart = newParticles.length;
      for (let i = 0; i < 5; i++) {
        newParticles.push({
          id: lightningStart + i,
          x: 10 + Math.random() * 80,
          y: 0,
          rotation: Math.random() * 30 - 15,
          scale: 1,
          color: isBonanza ? "hsl(330, 100%, 80%)" : isWizard ? "hsl(280, 100%, 80%)" : "hsl(45, 100%, 75%)",
          type: "lightning",
          delay: i * 0.2,
        });
      }
    }

    setParticles(newParticles);
    hasTriggeredCompleteRef.current = false;
    
    if (isBigWin) {
      setShowBigWin(true);
      setShowShockwave(true);
    } else {
      const timeout = setTimeout(() => {
        setParticles([]);
        onAnimationComplete?.();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isActive, winAmount, bet]);

  if (!isActive || winAmount <= 0) return null;

  return (
    <>
      {/* Shockwave rings */}
      {showShockwave && Array.from({ length: shockwaveCount }).map((_, i) => (
        <div
          key={`shockwave-${i}`}
          className="absolute pointer-events-none z-15"
          style={{
            top: "50%",
            left: "50%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            border: `3px solid rgba(${themeColors.primary}, 0.7)`,
            animation: `shockwave 0.8s ease-out ${i * 0.15}s forwards`,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Ambient floating orbs */}
      {showBigWin && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-12">
          {ambientOrbs.map((orb) => (
            <div
              key={`orb-${orb.id}`}
              className="absolute rounded-full"
              style={{
                left: `${orb.x}%`,
                top: `${orb.y}%`,
                width: `${orb.size}px`,
                height: `${orb.size}px`,
                background: `radial-gradient(circle, ${orb.color}40, ${orb.color}10, transparent)`,
                boxShadow: `0 0 ${orb.size / 2}px ${orb.color}30`,
                animation: `orb-float ${orb.duration}s ease-in-out ${orb.delay}s infinite`,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      )}

      {/* GIGANTISK: Full-screen pulsating glow overlay */}
      {showBigWin && isGigantisk && (
        <div
          className="absolute inset-0 pointer-events-none z-11"
          style={{
            background: isBonanza
              ? "radial-gradient(ellipse at center, rgba(236,72,153,0.25) 0%, rgba(250,204,21,0.15) 30%, rgba(168,85,247,0.1) 60%, transparent 80%)"
              : isWizard
              ? "radial-gradient(ellipse at center, rgba(168,85,247,0.25) 0%, rgba(236,72,153,0.15) 30%, rgba(6,182,212,0.1) 60%, transparent 80%)"
              : "radial-gradient(ellipse at center, rgba(255,215,0,0.3) 0%, rgba(255,140,0,0.15) 30%, rgba(255,69,0,0.1) 60%, transparent 80%)",
            animation: "gigantisk-glow-pulse 1.5s ease-in-out infinite",
          }}
        />
      )}

      {/* Lightning flash overlay for Gigantisk */}
      {showBigWin && isGigantisk && (
        <div
          className="absolute inset-0 pointer-events-none z-25"
          style={{
            background: isBonanza
              ? "radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(250,204,21,0.3) 40%, transparent 70%)"
              : isWizard
              ? "radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(236,72,153,0.3) 40%, transparent 70%)"
              : "radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,140,0,0.3) 40%, transparent 70%)",
            animation: "lightning-flash 1s ease-out forwards",
          }}
        />
      )}

      {/* GIGANTISK: Firework burst effects */}
      {showBigWin && isGigantisk && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-22">
          {fireworkBursts.map((burst) => (
            <div
              key={burst.id}
              className="absolute"
              style={{
                left: `${burst.x}%`,
                top: `${burst.y}%`,
                animationDelay: `${burst.delay}s`,
              }}
            >
              {/* Central flash */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: "8px",
                  height: "8px",
                  background: "white",
                  boxShadow: `0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(${themeColors.primary}, 0.6)`,
                  animation: "firework-flash 0.8s ease-out forwards",
                  animationDelay: `${burst.delay}s`,
                }}
              />
              {/* Radiating sparks */}
              {Array.from({ length: 12 }).map((_, j) => {
                const angle = (j / 12) * 360;
                const color = FIREWORK_COLORS[j % FIREWORK_COLORS.length];
                return (
                  <div
                    key={j}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: color,
                      boxShadow: `0 0 6px ${color}, 0 0 12px ${color}80`,
                      animation: `firework-spark 1s ease-out ${burst.delay}s forwards`,
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: "center center",
                      // CSS custom property for direction
                      ["--spark-x" as any]: `${Math.cos((angle * Math.PI) / 180) * (60 + Math.random() * 40)}px`,
                      ["--spark-y" as any]: `${Math.sin((angle * Math.PI) / 180) * (60 + Math.random() * 40)}px`,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Particle container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={cn(
              "absolute",
              particle.type === "lightning"
                ? "animate-[particle-fall_1.5s_ease-out_forwards]"
                : particle.rising
                ? "animate-[particle-rise_2.5s_ease-out_forwards]"
                : "animate-[particle-fall_2s_ease-out_forwards]"
            )}
            style={{
              left: `${particle.x}%`,
              top: particle.rising ? `110%` : particle.type === "lightning" ? `-5%` : `-10%`,
              animationDelay: `${particle.delay}s`,
              transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            }}
          >
            {particle.type === "coin" && (
              <div
                className="w-6 h-6 rounded-full animate-[coin-spin_0.5s_linear_infinite]"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${particle.color}, hsl(36, 80%, 30%))`,
                  boxShadow: `0 0 10px ${particle.color}, 0 0 20px ${particle.color}60`,
                }}
              />
            )}
            {particle.type === "firework" && (
              <div
                className="text-xl animate-[sparkle_0.6s_ease-in-out_infinite]"
                style={{
                  color: particle.color,
                  textShadow: `0 0 12px ${particle.color}, 0 0 24px ${particle.color}60`,
                  filter: `drop-shadow(0 0 8px ${particle.color})`,
                }}
              >
                {FIREWORK_EMOJIS[particle.id % FIREWORK_EMOJIS.length]}
              </div>
            )}
            {particle.type === "orb" && (
              <div
                className="w-5 h-5 rounded-full animate-[sparkle_1.2s_ease-in-out_infinite]"
                style={{
                  background: isBonanza
                    ? `radial-gradient(circle at 35% 35%, hsl(330, 90%, 85%), ${particle.color}, hsl(320, 60%, 20%))`
                    : isWizard
                      ? `radial-gradient(circle at 35% 35%, hsl(280, 90%, 85%), ${particle.color}, hsl(270, 60%, 20%))`
                      : `radial-gradient(circle at 35% 35%, hsl(45, 100%, 90%), ${particle.color}, hsl(36, 80%, 25%))`,
                  boxShadow: isBonanza
                    ? `0 0 14px ${particle.color}, 0 0 28px ${particle.color}40, inset 0 0 8px hsl(330, 90%, 90%)`
                    : isWizard
                      ? `0 0 14px ${particle.color}, 0 0 28px ${particle.color}40, inset 0 0 8px hsl(280, 90%, 90%)`
                      : `0 0 14px ${particle.color}, 0 0 28px ${particle.color}40, inset 0 0 8px hsl(45, 100%, 90%)`,
                }}
              />
            )}
            {particle.type === "rune" && (
              <div
                className="text-lg font-bold animate-[sparkle_0.9s_ease-in-out_infinite]"
                style={{
                  color: particle.color,
                  textShadow: `0 0 10px ${particle.color}, 0 0 20px ${particle.color}60`,
                }}
              >
                {SYMBOLS[particle.id % SYMBOLS.length]}
              </div>
            )}
            {particle.type === "sparkle" && (
              <div
                className="text-2xl animate-[sparkle_0.8s_ease-in-out_infinite]"
                style={{ color: particle.color }}
              >
                ✦
              </div>
            )}
            {particle.type === "star" && (
              <div
                className="text-xl animate-[sparkle_0.6s_ease-in-out_infinite]"
                style={{ color: particle.color }}
              >
                ★
              </div>
            )}
            {particle.type === "lightning" && (
              <div
                className="animate-[sparkle_0.3s_ease-in-out_infinite]"
                style={{
                  width: "4px",
                  height: "60px",
                  background: isBonanza
                    ? `linear-gradient(180deg, transparent, ${particle.color}, hsl(330, 100%, 95%), ${particle.color}, transparent)`
                    : isWizard
                      ? `linear-gradient(180deg, transparent, ${particle.color}, hsl(280, 100%, 95%), ${particle.color}, transparent)`
                      : `linear-gradient(180deg, transparent, ${particle.color}, hsl(45, 100%, 95%), ${particle.color}, transparent)`,
                  boxShadow: `0 0 15px ${particle.color}, 0 0 30px ${particle.color}60`,
                  clipPath: "polygon(40% 0%, 60% 0%, 70% 30%, 55% 35%, 65% 65%, 50% 60%, 60% 100%, 40% 100%, 50% 60%, 35% 65%, 45% 35%, 30% 30%)",
                  transform: `scale(${1 + Math.random()})`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Symbol orbit ring for gigantisk */}
      {showBigWin && orbitSymbols.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-28">
          <div className="relative" style={{ width: "280px", height: "280px" }}>
            {orbitSymbols.map((r) => (
              <div
                key={`orbit-${r.id}`}
                className="absolute top-1/2 left-1/2 text-xl font-bold"
                style={{
                  color: COLORS[r.id % COLORS.length],
                  textShadow: `0 0 12px ${COLORS[r.id % COLORS.length]}, 0 0 24px ${COLORS[r.id % COLORS.length]}60`,
                  animation: `rune-orbit 3s linear ${r.delay}s infinite`,
                  willChange: "transform",
                }}
              >
                {r.symbol}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Big Win / GIGANTISK WIN Text Overlay */}
      {showBigWin && (
        <div 
          onClick={handleSkip}
          className={cn(
            "absolute inset-0 flex items-center justify-center z-30 cursor-pointer",
            isFadingOut 
              ? isGigantisk 
                ? "opacity-0 scale-50 blur-sm transition-all duration-[1500ms]"
                : "opacity-0 scale-75 transition-all duration-[800ms]"
              : isGigantisk
              ? "animate-[epic-win-entry_0.8s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
              : "animate-[big-win-entry_0.4s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
          )}
        >
          <div
            className={cn(
              "rounded-2xl backdrop-blur-md border border-white/10",
              isGigantisk ? "px-8 sm:px-12 py-5 sm:py-7" : "px-5 sm:px-7 py-3 sm:py-4"
            )}
            style={{
              background: isGigantisk ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.25)",
              boxShadow: isGigantisk
                ? `0 0 60px rgba(${themeColors.primary}, 0.5), 0 0 120px rgba(${themeColors.primary}, 0.2), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`
                : "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div
              className={cn(
                "text-center animate-[big-win-pop_0.6s_ease-out_forwards]",
                isGigantisk && "animate-[epic-win-shake_0.1s_ease-in-out_infinite]"
              )}
            >
              {/* GIGANTISK gets crown emoji */}
              {isGigantisk && (
                <div 
                  className="text-5xl sm:text-6xl mb-2"
                  style={{ 
                    animation: "sparkle 1.5s ease-in-out infinite",
                    filter: "drop-shadow(0 0 20px rgba(255,215,0,0.8))",
                  }}
                >
                  👑
                </div>
              )}
              <div
                className={cn(
                  "font-bold tracking-wider animate-[text-glow-breathe_2s_ease-in-out_infinite]",
                  isGigantisk ? "text-4xl sm:text-7xl" : "text-xl sm:text-3xl"
                )}
                style={{
                  background: isGigantisk
                    ? isBonanza
                      ? "linear-gradient(135deg, #ec4899, #facc15, #ec4899, #c084fc, #facc15, #ec4899)"
                      : isWizard
                      ? "linear-gradient(135deg, #ec4899, #a855f7, #06b6d4, #a855f7, #ec4899, #a855f7)"
                      : "linear-gradient(135deg, #ffd700, #ff4500, #ffd700, #ff6b6b, #ffd700, #ff4500)"
                    : isBonanza
                    ? "linear-gradient(135deg, #ec4899, #f9a8d4)"
                    : isWizard
                    ? "linear-gradient(135deg, #a855f7, #c084fc)"
                    : "linear-gradient(135deg, #ffd700, #ffb347)",
                  backgroundSize: isGigantisk ? "600% 600%" : "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: isGigantisk 
                    ? "gradient-shift 0.3s ease infinite, text-glow-breathe 1.5s ease-in-out infinite, gigantisk-text-scale 2s ease-in-out infinite" 
                    : "gradient-shift 1s ease infinite, text-glow-breathe 2s ease-in-out infinite",
                  textShadow: isBonanza
                    ? "0 0 30px rgba(236, 72, 153, 0.9)"
                    : isWizard
                      ? "0 0 30px rgba(168, 85, 247, 0.9)"
                      : "0 0 30px rgba(255, 215, 0, 0.9)",
                  filter: isGigantisk
                    ? isBonanza
                      ? "drop-shadow(0 0 25px rgba(236, 72, 153, 0.9)) drop-shadow(0 0 50px rgba(250, 204, 21, 0.5)) drop-shadow(0 0 80px rgba(236, 72, 153, 0.3))"
                      : isWizard
                      ? "drop-shadow(0 0 25px rgba(168, 85, 247, 0.9)) drop-shadow(0 0 50px rgba(236, 72, 153, 0.5)) drop-shadow(0 0 80px rgba(168, 85, 247, 0.3))"
                      : "drop-shadow(0 0 25px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 50px rgba(255, 140, 0, 0.5)) drop-shadow(0 0 80px rgba(255, 215, 0, 0.3))"
                    : isBonanza
                    ? "drop-shadow(0 0 15px rgba(236, 72, 153, 0.6))"
                    : isWizard
                    ? "drop-shadow(0 0 15px rgba(168, 85, 247, 0.6))"
                    : "drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))",
                }}
              >
                {isGigantisk ? "GIGANTISK WIN!!!" : "BIG WIN!"}
              </div>
              <div
                className={cn(
                  "h-px mx-auto my-2 sm:my-3 opacity-40",
                  isGigantisk ? "w-4/5" : "w-2/3"
                )}
                style={{
                  background: isBonanza
                    ? "linear-gradient(90deg, transparent, rgba(236,72,153,0.8), transparent)"
                    : isWizard
                      ? "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(255,215,0,0.8), transparent)",
                }}
              />
              <div
                className={cn(
                  "font-bold",
                  isGigantisk ? "text-3xl sm:text-6xl" : "text-lg sm:text-2xl",
                  isPulsing && "animate-[win-amount-pulse-loop_0.6s_ease-in-out_infinite]"
                )}
                style={{
                  color: isBonanza ? "#f9a8d4" : isWizard ? "#c084fc" : "#ffd700",
                  textShadow: isBonanza
                    ? "0 0 20px rgba(236, 72, 153, 0.8), 0 0 40px rgba(236, 72, 153, 0.4)"
                    : isWizard
                      ? "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)"
                      : "0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)",
                }}
              >
                {Number.isInteger(displayAmount) ? displayAmount : parseFloat(displayAmount.toFixed(2))} POINT!
              </div>
              {/* Tap hint */}
              {!isPulsing && !counterSkipped && (
                <p className="text-white/40 text-xs mt-2 animate-pulse">
                  Tryk for at tælle hurtigere
                </p>
              )}
              {isPulsing && (
                <p className="text-white/30 text-xs mt-2 animate-pulse">
                  Tryk for at fortsætte
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Screen flash effect for non-gigantisk big wins */}
      {showBigWin && !isGigantisk && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none z-10",
            "animate-[flash_0.3s_ease-out]"
          )}
          style={{
            background: `radial-gradient(circle, rgba(${themeColors.primary}, 0.3) 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Expanding ring effects */}
      {showBigWin && Array.from({ length: shockwaveCount }).map((_, i) => (
        <div
          key={`ring-${i}`}
          className="absolute pointer-events-none z-15"
          style={{
            top: "50%",
            left: "50%",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: `2px solid rgba(${themeColors.primary}, ${0.5 - i * 0.08})`,
            boxShadow: `0 0 20px rgba(${themeColors.primary}, ${0.3 - i * 0.04}), inset 0 0 20px rgba(${themeColors.primary}, ${0.2 - i * 0.03})`,
            animation: `ring-expand 1.2s ease-out ${0.2 + i * 0.2}s forwards`,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Subtle edge vignette for wins */}
      {isBigWin && (
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-lg"
          style={{
            boxShadow: isGigantisk
              ? `inset 0 0 30px rgba(${themeColors.primary}, 0.25), inset 0 0 60px rgba(${themeColors.primary}, 0.1)`
              : `inset 0 0 10px rgba(${themeColors.primary}, 0.1)`,
          }}
        />
      )}
    </>
  );
}

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { VolumeX } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import "@/styles/spin-the-reel.css";

const SEGMENTS = [
  { id: 0, label: "100\nPoints", color: "hsl(260, 60%, 45%)", accent: "hsl(260, 70%, 55%)" },
  { id: 1, label: "200\nPoints", color: "hsl(280, 60%, 40%)", accent: "hsl(280, 70%, 50%)" },
  { id: 2, label: "300\nPoints", color: "hsl(260, 60%, 45%)", accent: "hsl(260, 70%, 55%)" },
  { id: 3, label: "400\nPoints", color: "hsl(280, 60%, 40%)", accent: "hsl(280, 70%, 50%)" },
  { id: 4, label: "500\nPoints", color: "hsl(260, 60%, 45%)", accent: "hsl(260, 70%, 55%)" },
  { id: 5, label: "50\nSpins", color: "hsl(150, 60%, 35%)", accent: "hsl(150, 70%, 45%)" },
  { id: 6, label: "100\nSpins", color: "hsl(150, 50%, 30%)", accent: "hsl(150, 60%, 40%)" },
  { id: 7, label: "200\nPoints", color: "hsl(280, 60%, 40%)", accent: "hsl(280, 70%, 50%)" },
  { id: 8, label: "Ingenting", color: "hsl(220, 15%, 25%)", accent: "hsl(220, 15%, 35%)" },
  { id: 9, label: "Ingenting", color: "hsl(220, 15%, 25%)", accent: "hsl(220, 15%, 35%)" },
];

const SEGMENT_COUNT = SEGMENTS.length;
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT;

interface SpinWheelProps {
  onSpinComplete: (segmentId: number) => void;
  targetSegmentId: number | null;
  isSpinning: boolean;
  onSpinStart: () => void;
  disabled: boolean;
  disabledReason?: string;
  muted: boolean;
  onToggleMute: () => void;
  onSpinAnimStart?: () => void;
  onSpinAnimEnd?: () => void;
}

export function SpinWheel({
  onSpinComplete,
  targetSegmentId,
  isSpinning,
  onSpinStart,
  disabled,
  disabledReason,
  muted,
  onToggleMute,
  onSpinAnimStart,
  onSpinAnimEnd,
}: SpinWheelProps) {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);
  const [landed, setLanded] = useState(false);
  const [landedSegment, setLandedSegment] = useState<number | null>(null);

  const spin = useCallback(() => {
    if (disabled || isSpinning) return;
    hasCompletedRef.current = false;
    setLanded(false);
    setLandedSegment(null);
    onSpinStart();
  }, [disabled, isSpinning, onSpinStart]);

  const prevTargetRef = useRef<number | null>(null);
  if (targetSegmentId !== null && targetSegmentId !== prevTargetRef.current && isSpinning) {
    prevTargetRef.current = targetSegmentId;

    const segmentMiddle = targetSegmentId * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const targetAngle = 360 - segmentMiddle;
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    const newRotation = rotation + fullSpins * 360 + ((targetAngle - (rotation % 360) + 360) % 360);

    setRotation(newRotation);
    onSpinAnimStart?.();

    setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        setLanded(true);
        setLandedSegment(targetSegmentId);
        onSpinAnimEnd?.();
        onSpinComplete(targetSegmentId);
      }
    }, 5500);
  }

  useEffect(() => {
    if (landed) {
      const timer = setTimeout(() => {
        setLanded(false);
        setLandedSegment(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [landed]);

  const isLoseResult = landedSegment !== null && (landedSegment === 8 || landedSegment === 9);

  return (
    <div className="relative flex flex-col items-center gap-6">
      {/* Mute toggle */}
      <button
        onClick={onToggleMute}
        className="absolute -top-2 -right-2 z-30 p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={muted ? "Slå lyd til" : "Slå lyd fra"}
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <MenuIcon iconName="volume2" className="h-4 w-4" />}
      </button>

      {/* Halo glow behind wheel */}
      <div
        className={cn(
          "absolute inset-0 -m-16 rounded-full pointer-events-none transition-opacity duration-700",
          disabled && !isSpinning ? "opacity-30" : "opacity-100"
        )}
        style={{
          background: "radial-gradient(circle, hsla(260, 80%, 50%, 0.2) 0%, hsla(280, 60%, 40%, 0.08) 40%, transparent 65%)",
        }}
      />

      {/* Wheel container */}
      <div className={cn("relative", landed && isLoseResult && "shake-feedback")}>
        {/* Outer glow ring */}
        <div
          className={cn(
            "absolute -inset-5 rounded-full transition-all duration-500",
            isSpinning
              ? "wheel-glow-active"
              : "shadow-[0_0_40px_rgba(168,85,247,0.2)]"
          )}
        />

        {/* LED dots ring */}
        <div className="absolute -inset-3 rounded-full border-2 border-primary/20">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * 360;
            const rad = (angle * Math.PI) / 180;
            const r = 50;
            return (
              <div
                key={i}
                className={cn(
                  "absolute w-1.5 h-1.5 rounded-full transition-all duration-300",
                  isSpinning
                    ? "bg-primary shadow-[0_0_6px_rgba(168,85,247,0.8)]"
                    : "bg-primary/30"
                )}
                style={{
                  left: `calc(50% + ${Math.cos(rad) * r}% - 3px)`,
                  top: `calc(50% + ${Math.sin(rad) * r}% - 3px)`,
                  animationDelay: isSpinning ? `${i * 40}ms` : undefined,
                }}
              />
            );
          })}
        </div>

        {/* Pointer */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-t-[32px] border-l-transparent border-r-transparent border-t-primary drop-shadow-[0_0_14px_hsl(var(--primary))]" />
        </div>

        {/* Wheel SVG - larger */}
        <div
          ref={wheelRef}
          className={cn(
            "relative rounded-full overflow-hidden",
            "border-[3px] border-primary/40",
            "shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]",
            isSpinning && "spin-active",
            // Responsive sizes: mobile large, desktop larger
            "w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] lg:w-[520px] lg:h-[520px] xl:w-[580px] xl:h-[580px]"
          )}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? "transform 5s cubic-bezier(0.15, 0, 0.05, 1)"
              : "none",
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              {SEGMENTS.map((seg, i) => (
                <radialGradient key={`grad-${i}`} id={`seg-grad-${i}`} cx="50%" cy="50%" r="50%">
                  <stop offset="30%" stopColor={seg.color} />
                  <stop offset="100%" stopColor={seg.accent} />
                </radialGradient>
              ))}
            </defs>
            {SEGMENTS.map((seg, i) => {
              const startAngle = (i * SEGMENT_ANGLE - 90) * (Math.PI / 180);
              const endAngle = ((i + 1) * SEGMENT_ANGLE - 90) * (Math.PI / 180);
              const x1 = 100 + 100 * Math.cos(startAngle);
              const y1 = 100 + 100 * Math.sin(startAngle);
              const x2 = 100 + 100 * Math.cos(endAngle);
              const y2 = 100 + 100 * Math.sin(endAngle);
              const largeArc = SEGMENT_ANGLE > 180 ? 1 : 0;
              const midAngle = ((i + 0.5) * SEGMENT_ANGLE - 90) * (Math.PI / 180);
              const textX = 100 + 62 * Math.cos(midAngle);
              const textY = 100 + 62 * Math.sin(midAngle);
              const textRotation = (i + 0.5) * SEGMENT_ANGLE;
              const lines = seg.label.split("\n");
              const isHighlighted = landed && landedSegment === i;

              return (
                <g key={seg.id}>
                  <path
                    d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc},1 ${x2},${y2} Z`}
                    fill={`url(#seg-grad-${i})`}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.5"
                    className={isHighlighted ? "glow-highlight" : ""}
                  />
                  <line x1="100" y1="100" x2={x1} y2={y1} stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                  <text
                    x={textX} y={textY}
                    textAnchor="middle" dominantBaseline="central"
                    fill="white" fontSize="7" fontWeight="bold"
                    transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
                  >
                    {lines.map((line, li) => (
                      <tspan key={li} x={textX} dy={li === 0 ? `-${(lines.length - 1) * 4}` : "9"}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}
            <circle cx="100" cy="100" r="16" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2.5"
              className={isSpinning ? "center-pulse-active" : ""} style={{ transformOrigin: "100px 100px" }} />
            <circle cx="100" cy="100" r="14" fill="none" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" />
            <text x="100" y="100" textAnchor="middle" dominantBaseline="central"
              fill="hsl(var(--primary))" fontSize="6.5" fontWeight="bold" letterSpacing="0.5">
              SPIN
            </text>
          </svg>
        </div>
      </div>

      {/* Spin button */}
      <button
        onClick={spin}
        disabled={disabled || isSpinning}
        className={cn(
          "relative px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300",
          "bg-primary text-primary-foreground",
          "hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-105",
          "active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none",
          !disabled && !isSpinning && "shadow-[0_0_24px_rgba(168,85,247,0.3)] animate-pulse",
          disabled && !isSpinning && "shadow-[0_0_12px_rgba(168,85,247,0.15)]"
        )}
      >
        <span className="relative z-10">
          {isSpinning
            ? "Spinner..."
            : disabled
              ? disabledReason || "Ikke tilgængelig"
              : "🎡 Spin!"}
        </span>
      </button>
    </div>
  );
}

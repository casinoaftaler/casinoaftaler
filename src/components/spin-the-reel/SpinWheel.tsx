import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const SEGMENTS = [
  { id: 0, label: "100\nPoints", color: "hsl(var(--primary))" },
  { id: 1, label: "200\nPoints", color: "hsl(280, 70%, 45%)" },
  { id: 2, label: "300\nPoints", color: "hsl(var(--primary))" },
  { id: 3, label: "400\nPoints", color: "hsl(280, 70%, 45%)" },
  { id: 4, label: "500\nPoints", color: "hsl(var(--primary))" },
  { id: 5, label: "50\nSpins", color: "hsl(150, 70%, 40%)" },
  { id: 6, label: "100\nSpins", color: "hsl(150, 70%, 30%)" },
  { id: 7, label: "200\nPoints", color: "hsl(280, 70%, 45%)" },
  { id: 8, label: "Ingenting", color: "hsl(var(--muted))" },
  { id: 9, label: "Ingenting", color: "hsl(var(--muted))" },
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
}

export function SpinWheel({
  onSpinComplete,
  targetSegmentId,
  isSpinning,
  onSpinStart,
  disabled,
  disabledReason,
}: SpinWheelProps) {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);

  const spin = useCallback(() => {
    if (disabled || isSpinning) return;
    hasCompletedRef.current = false;
    onSpinStart();
  }, [disabled, isSpinning, onSpinStart]);

  // When targetSegmentId is set by parent, animate to it
  const prevTargetRef = useRef<number | null>(null);
  if (targetSegmentId !== null && targetSegmentId !== prevTargetRef.current && isSpinning) {
    prevTargetRef.current = targetSegmentId;
    
    // Calculate target rotation
    // The pointer is at top (0 degrees). Segments go clockwise.
    // Segment 0 starts at 0 degrees, etc.
    // To land on segment N, we need the middle of that segment at the top.
    const segmentMiddle = targetSegmentId * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    // We need to rotate so this segment is at the pointer (top = 360 - segmentMiddle)
    const targetAngle = 360 - segmentMiddle;
    // Add multiple full rotations for visual effect (5-8 full spins)
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    const newRotation = rotation + fullSpins * 360 + ((targetAngle - (rotation % 360) + 360) % 360);
    
    setRotation(newRotation);

    // Fire completion after animation
    setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onSpinComplete(targetSegmentId);
      }
    }, 5500);
  }

  return (
    <div className="relative flex flex-col items-center gap-6">
      {/* Wheel container with glow */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className={cn(
          "absolute -inset-3 rounded-full transition-all duration-500",
          isSpinning 
            ? "shadow-[0_0_60px_rgba(168,85,247,0.6),0_0_120px_rgba(168,85,247,0.3)] animate-pulse" 
            : "shadow-[0_0_30px_rgba(168,85,247,0.3)]"
        )} />

        {/* Pointer (top) */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-primary drop-shadow-[0_0_10px_hsl(var(--primary))]" />

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full border-4 border-primary/50 overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? "transform 5s cubic-bezier(0.15, 0, 0.05, 1)"
              : "none",
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
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

              return (
                <g key={seg.id}>
                  <path
                    d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc},1 ${x2},${y2} Z`}
                    fill={seg.color}
                    stroke="hsl(var(--border))"
                    strokeWidth="0.5"
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize="7"
                    fontWeight="bold"
                    transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                    style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
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
            {/* Center circle */}
            <circle cx="100" cy="100" r="14" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
            <text x="100" y="100" textAnchor="middle" dominantBaseline="central" fill="hsl(var(--primary))" fontSize="6" fontWeight="bold">
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
          "px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300",
          "bg-primary text-primary-foreground",
          "hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105",
          "active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
        )}
      >
        {isSpinning ? "Spinner..." : disabled ? (disabledReason || "Ikke tilgængelig") : "🎡 Spin!"}
      </button>
    </div>
  );
}

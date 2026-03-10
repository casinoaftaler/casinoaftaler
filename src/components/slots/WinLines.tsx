import React, { useEffect, useState } from "react";
import { PAY_LINES, type LineWin } from "@/lib/slotGameLogic";
import { cn } from "@/lib/utils";

interface WinLinesProps {
  wins: LineWin[];
  symbolSize: number;
  gap: number;
  isVisible: boolean;
  gameId?: string;
}

// Egyptian gold/amber colors for each pay line (10 lines)
const EGYPTIAN_LINE_COLORS = [
  "#FFD700", "#FFC107", "#F59E0B", "#D97706", "#FBBF24",
  "#EAB308", "#CA8A04", "#FFB300", "#FF8F00", "#FFA000",
];

// Wizard purple/violet colors for each pay line (10 lines)
const WIZARD_LINE_COLORS = [
  "#A855F7", "#9333EA", "#7C3AED", "#8B5CF6", "#C084FC",
  "#A78BFA", "#6D28D9", "#B57BFF", "#7E57C2", "#9F7AEA",
];

export const WinLines = React.memo(function WinLines({ wins, symbolSize, gap, isVisible, gameId }: WinLinesProps) {
  const isWizard = gameId === "rise-of-fedesvin";
  const LINE_COLORS = isWizard ? WIZARD_LINE_COLORS : EGYPTIAN_LINE_COLORS;
  const coreLineColor = isWizard ? "#E9D5FF" : "#FFFACD";
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  // Animate lines appearing one by one
  useEffect(() => {
    if (!isVisible || wins.length === 0) {
      setVisibleLines([]);
      return;
    }

    // Show all lines at once with a stagger effect
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    wins.forEach((win, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => [...prev, win.lineIndex]);
      }, index * 150); // 150ms stagger between lines
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isVisible, wins]);

  if (!isVisible || wins.length === 0) return null;

  // Calculate dimensions
  const totalWidth = 5 * symbolSize + 4 * gap;
  const totalHeight = 3 * symbolSize + 2 * gap;

  // Calculate center point of a symbol at given column and row
  const getSymbolCenter = (col: number, row: number) => {
    const x = col * (symbolSize + gap) + symbolSize / 2;
    const y = row * (symbolSize + gap) + symbolSize / 2;
    return { x, y };
  };

  // Generate SVG path for a winning line (straight lines)
  const generateLinePath = (lineIndex: number, _count: number) => {
    const pattern = PAY_LINES[lineIndex];
    const points: { x: number; y: number }[] = [];

    // Always draw the full line (all 5 positions)
    for (let col = 0; col < 5; col++) {
      const row = pattern[col];
      points.push(getSymbolCenter(col, row));
    }

    if (points.length < 2) return "";

    // Use straight lines between symbol centers
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }

    return path;
  };

  return (
    <div 
      className={cn(
        "absolute inset-0 pointer-events-none z-10 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      style={{
        // Center the SVG over the reels
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg 
        width={totalWidth} 
        height={totalHeight}
        className="overflow-visible"
        style={{ position: "absolute" }}
      >
        {/* Define glow filter and shimmer gradients for lines */}
        <defs>
          {LINE_COLORS.map((color, index) => (
            <filter key={index} id={`glow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
          
          {/* Shimmer gradient for each line */}
          {LINE_COLORS.map((_, index) => (
            <linearGradient 
              key={`shimmer-${index}`} 
              id={`shimmer-gradient-${index}`}
              x1="0%" y1="0%" x2="100%" y2="0%"
            >
              <stop offset="0%" stopColor="transparent" />
              <stop offset="40%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="60%" stopColor="transparent" />
              <stop offset="100%" stopColor="transparent" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                from="-1 0"
                to="1 0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </linearGradient>
          ))}
        </defs>

        {/* Render winning lines */}
        {wins.map((win) => {
          const isLineVisible = visibleLines.includes(win.lineIndex);
          const color = LINE_COLORS[win.lineIndex] || LINE_COLORS[0];
          const path = generateLinePath(win.lineIndex, win.count);

          if (!path) return null;

            return (
            <g key={win.lineIndex} className={isLineVisible ? "animate-line-blink" : ""}>
              {/* Background glow line */}
              <path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth={8}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#glow-${win.lineIndex})`}
                className={cn(
                  "transition-all duration-500",
                  isLineVisible ? "opacity-60" : "opacity-0"
                )}
                style={{
                  strokeDasharray: 1000,
                  strokeDashoffset: isLineVisible ? 0 : 1000,
                  transition: "stroke-dashoffset 0.5s ease-out, opacity 0.3s ease-out",
                }}
              />
              
              {/* Main line with blinking effect */}
              <path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "transition-all duration-500",
                  isLineVisible ? "opacity-100" : "opacity-0"
                )}
                style={{
                  strokeDasharray: 1000,
                  strokeDashoffset: isLineVisible ? 0 : 1000,
                  transition: "stroke-dashoffset 0.5s ease-out, opacity 0.3s ease-out",
                  animation: isLineVisible ? "line-blink 0.5s ease-in-out infinite" : "none",
                }}
              />

              {/* Inner bright core line */}
              {isLineVisible && (
                <path
                  d={path}
                  fill="none"
                  stroke={coreLineColor}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    animation: "line-blink 0.5s ease-in-out infinite",
                  }}
                />
              )}

              {/* Shimmer effect moving along the line */}
              {isLineVisible && (
                <path
                  d={path}
                  fill="none"
                  stroke={`url(#shimmer-gradient-${win.lineIndex})`}
                  strokeWidth={6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.7 }}
                />
              )}

              {/* Win amount badge at end of line */}
              {isLineVisible && win.count > 0 && (
                <g>
                  {/* Position badge at the last winning symbol */}
                  {(() => {
                    const pattern = PAY_LINES[win.lineIndex];
                    // Always place badge at the end of the line (5th reel / position 4)
                    const lastCol = 4;
                    const center = getSymbolCenter(lastCol, pattern[lastCol]);
                    
                    return (
                      <>
                        <rect
                          x={center.x + symbolSize / 4}
                          y={center.y - 12}
                          width={40}
                          height={24}
                          rx={4}
                          fill={color}
                          className="animate-pulse"
                        />
                        <text
                          x={center.x + symbolSize / 4 + 20}
                          y={center.y + 2}
                          textAnchor="middle"
                          fill="black"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          +{win.payout}
                        </text>
                      </>
                    );
                  })()}
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
});

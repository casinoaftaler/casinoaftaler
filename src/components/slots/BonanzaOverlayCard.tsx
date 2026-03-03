import React from "react";

interface BonanzaOverlayCardProps {
  header?: string;
  subtitle?: string;
  bubbleContent: React.ReactNode;
  bottomLabel: React.ReactNode;
  onDismiss: () => void;
  showContent: boolean;
}

/* Decorative star SVG */
function CandyStar({ className }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 0L19.5 12.5L32 16L19.5 19.5L16 32L12.5 19.5L0 16L12.5 12.5Z"
        fill="rgba(255,215,0,0.85)"
      />
    </svg>
  );
}

export function BonanzaOverlayCard({
  header = "CONGRATULATIONS",
  subtitle = "YOU HAVE WON",
  bubbleContent,
  bottomLabel,
  onDismiss,
  showContent,
}: BonanzaOverlayCardProps) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center cursor-pointer"
      onClick={onDismiss}
      style={{ pointerEvents: "auto" }}
    >
      {/* Card */}
      <div
        className={`relative flex flex-col items-center justify-center gap-4 px-6 py-6 sm:px-10 sm:py-8 rounded-lg transition-all duration-500 ${
          showContent ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        style={{
          background: "linear-gradient(180deg, rgba(120,40,140,0.92) 0%, rgba(80,20,100,0.95) 100%)",
          width: "100%",
          height: "100%",
          boxShadow: "0 0 40px rgba(200,80,200,0.4), 0 0 80px rgba(160,40,180,0.2)",
        }}
      >
        {/* Candy stripe border */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none bonanza-candy-stripe-border"
          style={{ padding: "5px" }}
        />

        {/* Decorative stars */}
        <CandyStar className="absolute -top-3 -left-3 bonanza-star-spin w-7 h-7" />
        <CandyStar className="absolute -top-2 -right-4 bonanza-star-spin-reverse w-5 h-5" />
        <CandyStar className="absolute -bottom-3 -left-4 bonanza-star-spin-reverse w-6 h-6" />
        <CandyStar className="absolute -bottom-2 -right-3 bonanza-star-spin w-4 h-4" />
        <CandyStar className="absolute top-1/4 -right-5 bonanza-star-spin w-5 h-5 opacity-60" />
        <CandyStar className="absolute top-1/3 -left-5 bonanza-star-spin-reverse w-4 h-4 opacity-50" />

        {/* Header — golden "CONGRATULATIONS" */}
        <h2
          className="text-4xl sm:text-5xl font-black tracking-[0.15em] uppercase text-center"
          style={{
            backgroundImage: "linear-gradient(180deg, #fffacd 0%, #ffd700 40%, #daa520 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(255,215,0,0.4))",
          }}
        >
          {header}
        </h2>

        {/* Subtitle — "YOU HAVE WON" */}
        <p
          className="text-2xl sm:text-3xl font-bold tracking-wider uppercase text-center"
          style={{
            backgroundImage: "linear-gradient(180deg, #fff8dc 0%, #ffd700 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.4))",
          }}
        >
          {subtitle}
        </p>

        {/* Candy bubble */}
        <div
          className="bonanza-candy-bubble relative flex items-center justify-center mt-3 mb-3"
          style={{
            width: "min(320px, 65%)",
            height: "100px",
            background: "linear-gradient(180deg, #ff69b4 0%, #e91e90 40%, #c71585 100%)",
            borderRadius: "50px",
            boxShadow:
              "inset 0 4px 12px rgba(255,255,255,0.35), inset 0 -4px 8px rgba(0,0,0,0.2), 0 6px 24px rgba(200,20,100,0.5)",
          }}
        >
          {/* Inner highlight */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
            style={{
              width: "60%",
              height: "30%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 100%)",
            }}
          />
          {bubbleContent}
        </div>

        {/* Bottom label — "FREE SPINS" etc. */}
        <div
          className="text-center font-bold text-2xl sm:text-3xl tracking-wider uppercase"
          style={{
            backgroundImage: "linear-gradient(180deg, #fffacd 0%, #ffd700 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.3))",
          }}
        >
          {bottomLabel}
        </div>

        {/* Press anywhere prompt */}
        <p
          className="mt-4 text-base font-medium tracking-wide animate-pulse"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Tryk hvor som helst for at fortsætte
        </p>
      </div>
    </div>
  );
}

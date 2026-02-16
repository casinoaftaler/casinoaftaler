import { useState, useEffect } from "react";

const ACTIVITY_MESSAGES = [
  { emoji: "🔴", text: "3 spillere spiller Book of Fedesvin lige nu" },
  { emoji: "🏆", text: "Ny highscore i Rise of Fedesvin!" },
  { emoji: "🎉", text: "1200x blev ramt på Book of Fedesvin" },
  { emoji: "🚀", text: "2 nye spillere joined community" },
  { emoji: "⚡", text: "Bonusrunden er aktiv i Rise of Fedesvin" },
  { emoji: "🔥", text: "5 spillere kæmper om førstepladsen" },
];

export function LiveActivityTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ACTIVITY_MESSAGES.length);
        setVisible(true);
      }, 400);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const msg = ACTIVITY_MESSAGES[currentIndex];

  return (
    <div
      className="relative rounded-lg px-4 py-2.5 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(260 30% 14% / 0.6), hsl(220 30% 14% / 0.6))",
        border: "1px solid hsl(260 40% 30% / 0.2)",
      }}
    >
      {/* Subtle animated border glow */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(260 60% 50% / 0.05), transparent)",
          animation: "divider-sweep 6s ease-in-out infinite",
        }}
      />

      <div className="flex items-center gap-3 relative z-10">
        {/* Live indicator dot */}
        <div className="relative flex items-center shrink-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-40" />
        </div>

        <span className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider shrink-0">
          Live
        </span>

        <div
          className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-400"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-4px)",
            transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <span className="animate-pulse" style={{ animationDuration: "2s" }}>{msg.emoji}</span>
          <span>{msg.text}</span>
        </div>
      </div>
    </div>
  );
}

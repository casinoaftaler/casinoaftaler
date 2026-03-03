import React from "react";
import { cn } from "@/lib/utils";

type Theme = "gold" | "purple" | "pink" | "blue";

interface SlotAmbientLightProps {
  isIdle: boolean;
  theme: Theme;
}

const THEME_GRADIENT: Record<Theme, string> = {
  gold: "radial-gradient(ellipse at var(--ambient-x, 30%) var(--ambient-y, 20%), rgba(251,191,36,0.08) 0%, transparent 60%)",
  purple: "radial-gradient(ellipse at var(--ambient-x, 30%) var(--ambient-y, 20%), rgba(168,85,247,0.08) 0%, transparent 60%)",
  pink: "radial-gradient(ellipse at var(--ambient-x, 30%) var(--ambient-y, 20%), rgba(236,72,153,0.08) 0%, transparent 60%)",
  blue: "radial-gradient(ellipse at var(--ambient-x, 30%) var(--ambient-y, 20%), rgba(59,130,246,0.08) 0%, transparent 60%)",
};

export const SlotAmbientLight = React.memo(function SlotAmbientLight({
  isIdle,
  theme,
}: SlotAmbientLightProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none z-[1] rounded-xl transition-opacity duration-700",
        isIdle ? "opacity-100 slot-ambient-drift" : "opacity-0"
      )}
      style={{ background: THEME_GRADIENT[theme] }}
    />
  );
});

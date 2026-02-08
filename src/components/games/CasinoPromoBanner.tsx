import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface CasinoPromoBannerProps {
  name: string;
  tagline?: string;
  bonusText: string;
  bonusHighlight?: string;
  ctaText?: string;
  href: string;
  logoUrl?: string;
  accentColor?: "amber" | "purple" | "blue" | "green";
  className?: string;
}

const accentStyles = {
  amber: {
    border: "border-amber-500/30 hover:border-amber-500/50",
    glow: "shadow-[0_0_30px_rgba(251,191,36,0.15)] hover:shadow-[0_0_40px_rgba(251,191,36,0.25)]",
    button: "bg-amber-500 hover:bg-amber-400 text-black",
    highlight: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  purple: {
    border: "border-purple-500/30 hover:border-purple-500/50",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]",
    button: "bg-purple-500 hover:bg-purple-400 text-white",
    highlight: "text-purple-400",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  blue: {
    border: "border-blue-500/30 hover:border-blue-500/50",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]",
    button: "bg-blue-500 hover:bg-blue-400 text-white",
    highlight: "text-blue-400",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  green: {
    border: "border-emerald-500/30 hover:border-emerald-500/50",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]",
    button: "bg-emerald-500 hover:bg-emerald-400 text-black",
    highlight: "text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
};

export function CasinoPromoBanner({
  name,
  tagline,
  bonusText,
  bonusHighlight,
  ctaText = "Hent Bonus",
  href,
  logoUrl,
  accentColor = "amber",
  className,
}: CasinoPromoBannerProps) {
  const styles = accentStyles[accentColor];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-300",
        "bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-sm",
        styles.border,
        styles.glow,
        className
      )}
    >
      {/* Top section: Logo/Name + Tagline */}
      <div className="flex items-start gap-4 mb-4">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={name}
            className="h-10 w-auto object-contain shrink-0"
          />
        ) : (
          <div className={cn("text-lg font-bold", styles.highlight)}>{name}</div>
        )}
        {tagline && (
          <span className={cn("text-xs px-2 py-1 rounded-full border shrink-0", styles.badge)}>
            {tagline}
          </span>
        )}
      </div>

      {/* Bonus text */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {bonusText}
          {bonusHighlight && (
            <span className={cn("font-semibold", styles.highlight)}> {bonusHighlight}</span>
          )}
        </p>
      </div>

      {/* CTA Button */}
      <Button
        size="sm"
        className={cn(
          "w-full font-semibold transition-transform group-hover:scale-[1.02]",
          styles.button
        )}
      >
        {ctaText}
        <ExternalLink className="ml-2 h-3.5 w-3.5" />
      </Button>

      {/* Subtle decorative gradient */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none -z-10">
        <div
          className={cn(
            "absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20",
            accentColor === "amber" && "bg-amber-500",
            accentColor === "purple" && "bg-purple-500",
            accentColor === "blue" && "bg-blue-500",
            accentColor === "green" && "bg-emerald-500"
          )}
        />
      </div>
    </a>
  );
}

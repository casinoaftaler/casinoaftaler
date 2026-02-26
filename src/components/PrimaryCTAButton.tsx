import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CTAVariant = "bonus" | "free-spins" | "tilbud";

interface PrimaryCTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CTAVariant;
  /** Custom label overrides the variant default */
  label?: string;
  /** Size: default or compact */
  size?: "default" | "compact" | "large";
  /** Full width */
  fullWidth?: boolean;
}

const VARIANT_LABELS: Record<CTAVariant, string> = {
  bonus: "Aktivér Bonus",
  "free-spins": "Hent Free Spins",
  tilbud: "Se Tilbud",
};

/**
 * Global standardised CTA button – solid brand-blue, fintech feel.
 * Usage: <PrimaryCTAButton variant="bonus" onClick={...} />
 */
export const PrimaryCTAButton = forwardRef<HTMLButtonElement, PrimaryCTAButtonProps>(
  ({ variant = "bonus", label, size = "default", fullWidth = false, className, children, ...props }, ref) => {
    const text = label ?? children ?? VARIANT_LABELS[variant];

    return (
      <button
        ref={ref}
        className={cn(
          // Base
          "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-semibold text-white transition-all duration-200",
          // Solid brand blue
          "bg-[hsl(210,90%,45%)] hover:bg-[hsl(210,90%,38%)]",
          // Shadow – clear layer separation
          "shadow-[0_4px_14px_hsl(210_90%_45%/0.4)]",
          // Hover (desktop)
          "hover:-translate-y-[2px] hover:shadow-[0_8px_24px_hsl(210_90%_45%/0.5)]",
          // Active / press
          "active:translate-y-0 active:shadow-[0_2px_8px_hsl(210_90%_45%/0.3)]",
          // Focus
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // Sizes
          size === "compact" && "px-5 py-2.5 text-xs",
          size === "default" && "px-7 py-3.5 text-sm",
          size === "large" && "px-9 py-[18px] text-base",
          // Width
          fullWidth && "w-full",
          className,
        )}
        data-sponsored="true"
        {...props}
      >
        <span className="relative z-10">{text}</span>
        <ArrowRight className={cn(
          "relative z-10 transition-transform duration-200 group-hover:translate-x-0.5",
          size === "compact" && "h-3.5 w-3.5",
          size === "default" && "h-4 w-4",
          size === "large" && "h-5 w-5",
        )} />
      </button>
    );
  }
);

PrimaryCTAButton.displayName = "PrimaryCTAButton";

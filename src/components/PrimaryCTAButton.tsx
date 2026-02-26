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
 * Global standardised CTA button with premium gradient.
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
          // Gradient – uses primary/accent design tokens
          "bg-gradient-to-r from-[hsl(260,70%,50%)] via-[hsl(240,65%,48%)] to-[hsl(210,90%,45%)]",
          // Shadow
          "shadow-[0_4px_14px_hsl(260_70%_50%/0.35)]",
          // Hover (desktop)
          "hover:-translate-y-[1px] hover:shadow-[0_6px_20px_hsl(260_70%_50%/0.45)] hover:brightness-110",
          // Active / press
          "active:translate-y-0 active:shadow-[0_2px_8px_hsl(260_70%_50%/0.3)] active:brightness-95",
          // Focus
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // Sizes
          size === "compact" && "px-4 py-2 text-xs",
          size === "default" && "px-6 py-3 text-sm",
          size === "large" && "px-8 py-4 text-base",
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

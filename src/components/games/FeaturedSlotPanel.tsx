import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Clock } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { useRef, useState } from "react";
import { AgeVerificationDialog } from "./AgeVerificationDialog";
import { useAgeVerification } from "@/hooks/useAgeVerification";

interface FeaturedSlotPanelProps {
  title: string;
  description: string;
  image: string;
  href: string;
  badge?: string;
  priority?: "primary" | "secondary";
  showScrollHint?: boolean;
  imagePosition?: string;
  disabled?: boolean;
}

export function FeaturedSlotPanel({
  title,
  description,
  image,
  href,
  badge,
  priority = "primary",
  showScrollHint = false,
  imagePosition = "center",
  disabled = false,
}: FeaturedSlotPanelProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [showAgeDialog, setShowAgeDialog] = useState(false);
  const { ageVerified, isLoggedIn } = useAgeVerification();
  const navigate = useNavigate();

  const handlePlayClick = (e: React.MouseEvent) => {
    if (isLoggedIn && ageVerified === false) {
      e.preventDefault();
      setShowAgeDialog(true);
    }
  };

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled || !imgRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 5;
    imgRef.current.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
  }

  function handleMouseLeave() {
    if (imgRef.current) {
      imgRef.current.style.transform = "scale(1) translate(0, 0)";
    }
  }

  return (
    <>
      <div className="relative h-full aspect-video">
        <div
          className={`card-depth group relative overflow-hidden rounded-2xl border border-amber-500/15 h-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            disabled
              ? ""
              : "hover:border-amber-500/30 hover:-translate-y-1 hover:scale-[1.01]"
          }`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Top edge highlight */}
          <div
            className="absolute top-0 left-0 right-0 h-px z-10 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.06) 50%, transparent 90%)",
            }}
          />

          {/* Hero image */}
          <div className="relative overflow-hidden h-full">
            <img
              ref={imgRef}
              src={image}
              alt={title}
              width={1200}
              height={675}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ objectPosition: imagePosition }}
            />

            {/* Bottom gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Inner bottom glow */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{
                background: "linear-gradient(to top, hsl(260 50% 20% / 0.15), transparent)",
              }}
            />

            {/* Subtle shine on hover */}
            {!disabled && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/8 to-transparent -skew-x-12" />
              </div>
            )}

            {/* Badge with shimmer + glow */}
            {badge && (
              <div className="absolute top-3 left-3 z-10 animate-fade-in" style={{ animationDelay: "300ms", animationFillMode: "both" }}>
                <Badge
                  className="animate-badge-glow animate-badge-shimmer border-amber-500/25 text-amber-300/90 text-[10px] px-2 py-0.5 backdrop-blur-md font-medium tracking-wider uppercase"
                  style={{
                    background: "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(251,191,36,0.08) 50%, rgba(0,0,0,0.45) 100%)",
                  }}
                >
                  {badge}
                </Badge>
              </div>
            )}

            {/* Content overlay – bottom */}
            <div className="absolute bottom-0 inset-x-0 p-5 md:p-7 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
                <div className="space-y-1.5 max-w-lg">
                  <h2
                    className={`font-bold text-white tracking-tight leading-tight transition-all duration-300 ${
                      priority === "primary" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                    } ${!disabled ? "group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]" : ""}`}
                  >
                    {title}
                  </h2>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed line-clamp-2">
                    {description}
                  </p>
                </div>
                {disabled ? (
                  <Button disabled size="default" variant="secondary" className="gap-2 shrink-0 text-sm px-6">
                    <MenuIcon iconName="clock" className="h-4 w-4" />
                    Kommer snart
                  </Button>
                ) : (
                  <Button
                    asChild
                    size="default"
                    className="bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-2 shrink-0 shadow-[0_2px_12px_rgba(251,191,36,0.25)] group-hover:shadow-[0_4px_24px_rgba(251,191,36,0.5)] transition-all duration-300 text-sm px-6"
                  >
                    <Link to={href} onClick={handlePlayClick}>
                      <MenuIcon iconName="play" className="h-4 w-4" />
                      <span>Spil nu</span>
                      <span className="btn-arrow-shift inline-block">→</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        {showScrollHint && (
          <div className="flex justify-center mt-3 animate-fade-in" style={{ animationDelay: "800ms", animationFillMode: "both" }}>
            <span className="text-muted-foreground/40 text-[11px] tracking-wide">
              ↓ Scroll for flere spil
            </span>
          </div>
        )}
      </div>

      <AgeVerificationDialog
        open={showAgeDialog}
        onOpenChange={setShowAgeDialog}
        targetHref={href}
      />
    </>
  );
}

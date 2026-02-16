import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface FeaturedSlotPanelProps {
  title: string;
  description: string;
  image: string;
  href: string;
  badge?: string;
  priority?: "primary" | "secondary";
  showScrollHint?: boolean;
}

export function FeaturedSlotPanel({
  title,
  description,
  image,
  href,
  badge,
  priority = "primary",
  showScrollHint = false,
}: FeaturedSlotPanelProps) {
  return (
    <div className="relative">
      <div className="group relative overflow-hidden rounded-2xl border border-amber-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_8px_40px_rgba(251,191,36,0.08)]">
        {/* Hero image – constrained height */}
        <div
          className="relative overflow-hidden"
          style={{ maxHeight: "clamp(280px, 55vh, 520px)" }}
        >
          <img
            src={image}
            alt={title}
            width={1200}
            height={675}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            style={{ minHeight: "280px" }}
          />

          {/* Stronger bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

          {/* Subtle shine on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12" />
          </div>

          {/* Badge – refined & subtle */}
          {badge && (
            <div className="absolute top-3 left-3 z-10 animate-fade-in" style={{ animationDelay: "300ms", animationFillMode: "both" }}>
              <Badge className="border-amber-500/20 bg-black/40 text-amber-300/90 text-[10px] px-2 py-0.5 backdrop-blur-md font-medium tracking-wider uppercase">
                {badge}
              </Badge>
            </div>
          )}

          {/* Content overlay – bottom 30% */}
          <div className="absolute bottom-0 inset-x-0 p-5 md:p-7 lg:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
              <div className="space-y-1.5 max-w-lg">
                <h2 className={`font-bold text-white tracking-tight leading-tight ${priority === "primary" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
                  {title}
                </h2>
                <p className="text-white/60 text-sm md:text-base leading-relaxed line-clamp-2">
                  {description}
                </p>
              </div>
              <Button
                asChild
                size="default"
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-2 shrink-0 shadow-[0_2px_12px_rgba(251,191,36,0.25)] hover:shadow-[0_4px_20px_rgba(251,191,36,0.4)] transition-all duration-300 text-sm px-6"
              >
                <Link to={href}>
                  <Play className="h-4 w-4" />
                  Spil nu
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      {showScrollHint && (
        <div className="flex justify-center mt-4 animate-fade-in" style={{ animationDelay: "800ms", animationFillMode: "both" }}>
          <span className="text-muted-foreground/50 text-xs tracking-wide animate-bounce" style={{ animationDuration: "2.5s" }}>
            ↓ Scroll for flere spil
          </span>
        </div>
      )}
    </div>
  );
}

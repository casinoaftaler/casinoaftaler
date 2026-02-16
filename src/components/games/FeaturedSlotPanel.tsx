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
}

export function FeaturedSlotPanel({
  title,
  description,
  image,
  href,
  badge,
  priority = "primary",
}: FeaturedSlotPanelProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-amber-500/20 transition-all duration-500 hover:border-amber-500/40 hover:shadow-[0_0_60px_rgba(251,191,36,0.12)]">
      {/* Subtle glow behind panel */}
      <div className="absolute -inset-1 rounded-2xl bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />

      {/* Hero image 16:9 */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          width={1200}
          height={675}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/8 to-transparent -skew-x-12" />
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="border-amber-500/30 bg-amber-500/20 text-amber-300 text-xs px-3 py-1 backdrop-blur-sm font-semibold tracking-wide">
              {badge}
            </Badge>
          </div>
        )}

        {/* Content overlay at bottom */}
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <h2 className={`font-bold text-white tracking-tight ${priority === "primary" ? "text-3xl md:text-4xl lg:text-5xl" : "text-2xl md:text-3xl lg:text-4xl"}`}>
                {title}
              </h2>
              <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed line-clamp-2">
                {description}
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold gap-2.5 shrink-0 shadow-[0_4px_20px_rgba(251,191,36,0.3)] hover:shadow-[0_4px_30px_rgba(251,191,36,0.5)] transition-all duration-300 text-base px-8"
            >
              <Link to={href}>
                <Play className="h-5 w-5" />
                Spil nu
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

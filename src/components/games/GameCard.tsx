import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  status: "active" | "coming-soon";
}

export function GameCard({ title, description, image, href, status }: GameCardProps) {
  const isActive = status === "active";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-amber-500/20 bg-card/80 backdrop-blur-sm transition-all duration-300",
        isActive
          ? "hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)] cursor-pointer"
          : "opacity-60 cursor-default"
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500",
            isActive && "group-hover:scale-105"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Status badge */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Badge className="border-amber-500/30 bg-amber-500/20 text-amber-300 text-sm px-4 py-1.5 gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Kommer snart
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        {isActive ? (
          <Button
            asChild
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-2"
          >
            <Link to={href}>
              <Play className="h-4 w-4" />
              Spil nu
            </Link>
          </Button>
        ) : (
          <Button disabled className="w-full gap-2" variant="secondary">
            <Clock className="h-4 w-4" />
            Kommer snart
          </Button>
        )}
      </div>
    </div>
  );
}

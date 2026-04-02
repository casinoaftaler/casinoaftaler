import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Badge, Clock, Link, Play } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AgeVerificationDialog } from "./AgeVerificationDialog";
import { useAgeVerification } from "@/hooks/useAgeVerification";

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  status: "active" | "coming-soon";
  badge?: string;
  titleLogo?: string;
}

export function GameCard({ title, description, image, href, status, badge, titleLogo }: GameCardProps) {
  const isActive = status === "active";
  const [showAgeDialog, setShowAgeDialog] = useState(false);
  const { ageVerified, isLoggedIn } = useAgeVerification();
  const navigate = useNavigate();

  const handlePlayClick = (e: React.MouseEvent) => {
    if (isLoggedIn && ageVerified === false) {
      e.preventDefault();
      setShowAgeDialog(true);
    }
  };

  return (
    <>
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl border border-amber-500/20 bg-card/80 backdrop-blur-sm transition-all duration-300",
          isActive
            ? "hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)] hover:scale-[1.02] cursor-pointer"
            : "opacity-60 cursor-default"
        )}
      >
        {/* Image section with overlay content */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            width={600}
            height={450}
            loading="lazy"
            className={cn(
              "h-full w-full object-cover transition-transform duration-500",
              isActive && "group-hover:scale-110"
            )}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Shine effect on hover */}
          {isActive && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" />
            </div>
          )}

          {/* Badge top-right */}
          {isActive && badge && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="border-amber-500/30 bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 backdrop-blur-sm">
                {badge}
              </Badge>
            </div>
          )}

          {/* Title logo overlay - centered in image */}
          {titleLogo && (
            <div className={cn(
              "absolute inset-0 flex items-center justify-center pointer-events-none",
              !isActive && "bg-black/40 backdrop-blur-[1px]"
            )}>
              <div className="flex flex-col items-center gap-4">
                <img
                  src={titleLogo}
                  alt={title}
                  width={280}
                  height={80}
                  className="w-3/4 max-w-[280px] h-auto drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                />
                {!isActive && (
                  <Badge className="border-amber-500/30 bg-amber-500/20 text-amber-300 text-sm px-4 py-1.5 gap-1.5">
                    <MenuIcon iconName="clock" className="h-3.5 w-3.5" />
                    Kommer snart
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Coming soon overlay (no logo) */}
          {!isActive && !titleLogo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
              <Badge className="border-amber-500/30 bg-amber-500/20 text-amber-300 text-sm px-4 py-1.5 gap-1.5">
                <MenuIcon iconName="clock" className="h-3.5 w-3.5" />
                Kommer snart
              </Badge>
            </div>
          )}

          {/* Overlaid content at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 space-y-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{title}</h3>
              <p className="text-sm sm:text-base text-white/70 line-clamp-2 mt-1.5">{description}</p>
            </div>

            {isActive ? (
              <Button
                asChild
                size="sm"
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-2"
              >
                <Link to={href} onClick={handlePlayClick}>
                  <MenuIcon iconName="play" className="h-4 w-4" />
                  Spil nu
                </Link>
              </Button>
            ) : (
              <Button disabled size="sm" className="w-full gap-2" variant="secondary">
                <MenuIcon iconName="clock" className="h-4 w-4" />
                Kommer snart
              </Button>
            )}
          </div>
        </div>
      </div>

      <AgeVerificationDialog
        open={showAgeDialog}
        onOpenChange={setShowAgeDialog}
        targetHref={href}
      />
    </>
  );
}

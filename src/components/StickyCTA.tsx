import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";

interface StickyCTAProps {
  casinoSlug: string;
  casinoName: string;
  bonusAmount: string;
  bonusType: string;
  freeSpins: string;
  wageringRequirements: string;
  rating: number;
  logoUrl: string | null;
  isRecommended?: boolean;
  isHot?: boolean;
}

export function StickyCTA({
  casinoSlug,
  casinoName,
  bonusAmount,
  bonusType,
  freeSpins,
  wageringRequirements,
  rating,
  logoUrl,
  isRecommended,
  isHot,
}: StickyCTAProps) {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const footer = document.querySelector("footer");
    const footerInView = footer
      ? footer.getBoundingClientRect().top < window.innerHeight
      : false;

    setVisible(scrollPercent >= 0.12 && !footerInView);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleClick = () => {
    const deviceType = window.innerWidth < 768 ? "mobile" : "desktop";
    const scrollDepth = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    supabase
      .from("click_events")
      .insert({
        casino_slug: casinoSlug,
        casino_name: casinoName,
        event_type: "sticky_offer_click",
        user_id: user?.id || null,
        user_agent: navigator.userAgent,
        referrer: `scroll_depth:${scrollDepth}|device:${deviceType}|position:bottom`,
      })
      .then(() => {});

    getAffiliateRedirect(casinoSlug, user?.id);
  };

  // Parse bonus percentage from bonusType or bonusAmount
  const bonusPercent = bonusType?.match(/\d+\s*%/) ? bonusType.match(/\d+\s*%/)?.[0] : "100%";

  const renderStars = (value: number) => {
    const full = Math.floor(value);
    const hasHalf = value - full >= 0.3;
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i < full
                ? "fill-primary text-primary"
                : i === full && hasHalf
                ? "fill-primary/50 text-primary"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
        <span className="ml-1 text-xs font-semibold text-foreground">{value.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/98 backdrop-blur-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Desktop */}
      <div className="container hidden lg:flex items-center justify-between h-[110px] gap-6">
        {/* Left: Logo + Name + Rating + Badges */}
        <div className="flex items-center gap-4 min-w-0 shrink-0">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={`${casinoName} logo`}
              className="h-[68px] w-auto max-w-[80px] rounded-xl object-contain bg-background/50 p-1.5"
              loading="lazy"
            />
          )}
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-foreground leading-tight">{casinoName}</h3>
            {renderStars(rating)}
            <div className="flex items-center gap-1.5 mt-0.5">
              {isRecommended && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 font-medium">
                  Anbefalet
                </Badge>
              )}
              {isHot && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 font-medium">
                  🔥 Populær
                </Badge>
              )}
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-medium border-primary/30 text-primary">
                Eksklusiv Bonus
              </Badge>
            </div>
          </div>
        </div>

        {/* Center: Bonus Data Grid */}
        <div className="flex items-center gap-6 border-l border-r border-border/50 px-8">
          <div className="text-center">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Procent</p>
            <p className="text-xl font-bold text-foreground">{bonusPercent}</p>
          </div>
          <div className="text-center">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Op til</p>
            <p className="text-xl font-bold text-foreground">{bonusAmount}</p>
          </div>
          <div className="text-center">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Gratis spins</p>
            <p className="text-xl font-bold text-foreground">{freeSpins || "N/A"}</p>
          </div>
          <div className="text-center">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Omsætning</p>
            <p className="text-xl font-bold text-foreground">{wageringRequirements}</p>
          </div>
        </div>

        {/* Right: CTA */}
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <Button
            onClick={handleClick}
            size="lg"
            className="font-bold text-base min-w-[200px] h-12 shadow-lg"
            data-sponsored="true"
          >
            HENT BONUS NU
          </Button>
          <span className="text-[10px] text-muted-foreground">18+ | Spil ansvarligt</span>
        </div>
      </div>

      {/* Mobile */}
      <div className="container flex lg:hidden flex-col py-2.5 max-h-[110px] gap-1.5">
        {/* Row 1: Logo + Name + Rating */}
        <div className="flex items-center gap-2.5">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={`${casinoName} logo`}
              className="h-9 w-auto max-w-[44px] rounded-lg object-contain flex-shrink-0"
              loading="lazy"
            />
          )}
          <span className="text-sm font-bold text-foreground truncate">{casinoName}</span>
          <div className="flex items-center gap-0.5 flex-shrink-0 ml-auto">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="text-xs font-semibold text-foreground">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Row 2: Bonus text */}
        <p className="text-xs font-semibold text-muted-foreground truncate">
          {bonusPercent} op til {bonusAmount} + {freeSpins || "0"} free spins
        </p>

        {/* Row 3: CTA */}
        <Button
          onClick={handleClick}
          className="w-full font-bold h-9 shadow-md"
          data-sponsored="true"
        >
          HENT BONUS NU
        </Button>
      </div>
    </div>
  );
}

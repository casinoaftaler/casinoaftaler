import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface StickyCTAProps {
  casinoSlug: string;
  casinoName: string;
  bonusText: string;
  logoUrl: string | null;
}

export function StickyCTA({ casinoSlug, casinoName, bonusText, logoUrl }: StickyCTAProps) {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const footer = document.querySelector("footer");
    const footerInView = footer
      ? footer.getBoundingClientRect().top < window.innerHeight
      : false;

    setVisible(scrollPercent >= 0.15 && !footerInView);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleClick = () => {
    // Track sticky CTA click
    const deviceType = window.innerWidth < 768 ? "mobile" : "desktop";
    const scrollDepth = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    supabase
      .from("click_events")
      .insert({
        casino_slug: casinoSlug,
        casino_name: casinoName,
        event_type: "sticky_cta_click",
        user_id: user?.id || null,
        user_agent: navigator.userAgent,
        referrer: `scroll_depth:${scrollDepth}|device:${deviceType}`,
      })
      .then(() => {});

    getAffiliateRedirect(casinoSlug, user?.id);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-sm transition-transform duration-300"
      style={{ transform: visible ? "translateY(0)" : "translateY(100%)" }}
    >
      {/* Desktop */}
      <div className="container hidden md:flex items-center justify-between py-3 max-h-[90px]">
        <div className="flex items-center gap-4">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={`${casinoName} logo`}
              className="h-10 w-10 rounded-lg object-contain"
              loading="lazy"
            />
          )}
          <div>
            <p className="text-sm font-semibold">{casinoName}</p>
            <p className="text-xs text-muted-foreground">{bonusText}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">18+ | Spil ansvarligt</span>
          <Button onClick={handleClick} size="sm" className="font-bold px-6" data-sponsored="true">
            HENT BONUS
          </Button>
        </div>
      </div>

      {/* Mobile */}
      <div className="container flex md:hidden items-center justify-between py-2.5 max-h-[70px]">
        <div className="flex items-center gap-3">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={`${casinoName} logo`}
              className="h-8 w-8 rounded-lg object-contain"
              loading="lazy"
            />
          )}
          <p className="text-sm font-semibold">{casinoName}</p>
        </div>
        <Button onClick={handleClick} size="sm" className="font-bold px-4" data-sponsored="true">
          HENT BONUS
        </Button>
      </div>
    </div>
  );
}

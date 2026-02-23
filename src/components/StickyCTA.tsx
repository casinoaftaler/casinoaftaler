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
      <div className="container hidden md:flex items-center justify-between py-4 h-[100px]">
        <div className="flex items-center gap-5">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={`${casinoName} logo`}
              className="h-12 w-12 rounded-lg object-contain"
              loading="lazy"
            />
          )}
          <div>
            <p className="text-base font-semibold">{casinoName}</p>
            <p className="text-lg font-bold text-foreground">{bonusText}</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-xs text-muted-foreground">18+ | Spil ansvarligt</span>
          <Button onClick={handleClick} size="lg" className="font-bold text-base min-w-[180px] shadow-md" data-sponsored="true">
            HENT BONUS NU
          </Button>
        </div>
      </div>

      {/* Mobile */}
      <div className="container flex md:hidden items-center justify-between py-3 min-h-[75px]">
        <div className="flex items-center gap-3 min-w-0">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={`${casinoName} logo`}
              className="h-9 w-9 rounded-lg object-contain flex-shrink-0"
              loading="lazy"
            />
          )}
          <p className="text-sm font-bold truncate">{bonusText}</p>
        </div>
        <Button onClick={handleClick} className="font-bold px-5 flex-shrink-0 min-w-[40%] shadow-md" data-sponsored="true">
          HENT BONUS NU
        </Button>
      </div>
    </div>
  );
}

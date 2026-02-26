import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in" style={{ contain: 'layout' }}>
      <div className="container">
        <div className="relative mx-auto max-w-4xl rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-xl">
          {/* Close button */}
          <button
            onClick={handleDecline}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Luk"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:gap-6">
            {/* Icon and Text */}
            <div className="flex items-start gap-3 sm:gap-4 flex-1">
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-0.5 sm:space-y-1 pr-6 sm:pr-0">
                <h3 className="text-sm sm:text-base font-semibold text-foreground">Vi bruger cookies 🍪</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Vi bruger cookies for at forbedre din oplevelse og analysere trafik.{" "}
                  <Link to="/cookies" className="text-primary hover:underline">
                    Læs mere
                  </Link>
                </p>
              </div>
            </div>

            {/* Buttons - side by side on mobile */}
            <div className="flex flex-row gap-2 sm:shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="flex-1 sm:flex-none text-xs sm:text-sm"
              >
                Kun nødvendige
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="flex-1 sm:flex-none text-xs sm:text-sm"
              >
                Accepter alle
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

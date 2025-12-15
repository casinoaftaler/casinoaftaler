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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in">
      <div className="container">
        <div className="relative mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-xl">
          {/* Close button */}
          <button
            onClick={handleDecline}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Luk"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            {/* Icon and Text */}
            <div className="flex items-start gap-4 flex-1">
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">Vi bruger cookies 🍪</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Vi bruger cookies for at forbedre din oplevelse på vores website, analysere trafik og vise relevante annoncer. 
                  Ved at klikke &quot;Accepter&quot; samtykker du til vores brug af cookies.{" "}
                  <Link to="/cookies" className="text-primary hover:underline">
                    Læs mere
                  </Link>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:shrink-0">
              <Button
                variant="outline"
                onClick={handleDecline}
                className="order-2 sm:order-1"
              >
                Kun nødvendige
              </Button>
              <Button
                onClick={handleAccept}
                className="order-1 sm:order-2"
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

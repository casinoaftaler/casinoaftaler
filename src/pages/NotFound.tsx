import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SafeHelmet } from "@/lib/reactCompat";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEO
        title="Side ikke fundet (404) | Casinoaftaler"
        description="Siden du leder efter blev ikke fundet. Gå tilbage til forsiden for at finde det du søger."
        noindex
      />
      <SafeHelmet>
        <meta name="prerender-status-code" content="404" />
      </SafeHelmet>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

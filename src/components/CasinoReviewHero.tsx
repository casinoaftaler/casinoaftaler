import { Badge } from "@/components/ui/badge";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useCasinos } from "@/hooks/useCasinos";
import type { ReactNode } from "react";

interface CasinoReviewHeroProps {
  casinoSlug: string;
  title: string;
  subtitle: string;
  badge: ReactNode;
}

export function CasinoReviewHero({ casinoSlug, title, subtitle, badge }: CasinoReviewHeroProps) {
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos } = useCasinos();
  const heroBackgroundImage = siteSettings?.hero_background_image;

  const casino = casinos?.find((c) => c.slug === casinoSlug);
  const logoUrl = casino?.logo_url;

  return (
    <section
      className="relative overflow-hidden py-12 text-white md:py-20"
      style={{
        backgroundImage: heroBackgroundImage
          ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
          : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          {logoUrl && (
            <div className="mb-6 flex justify-center">
              <img
                src={logoUrl}
                alt={casino?.name || casinoSlug}
                className="h-20 w-20 rounded-2xl object-contain bg-white/10 p-2 backdrop-blur-sm border border-white/20 shadow-lg md:h-24 md:w-24"
              />
            </div>
          )}
          <Badge variant="secondary" className="mb-4">
            {badge}
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
          <p className="mb-6 text-lg text-white/80">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

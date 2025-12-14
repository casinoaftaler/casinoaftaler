import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, BookOpen } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function HeroSection() {
  const { data: siteSettings } = useSiteSettings();
  
  const heroTitle = siteSettings?.hero_title || "Find de Bedste Casinobonusser i 2024";
  const heroSubtitle = siteSettings?.hero_subtitle || "Sammenlign velkomstbonusser, gratis spins og eksklusive tilbud fra de bedste online casinoer. Vi hjælper dig med at finde den perfekte bonus til din spillestil.";
  const heroBackgroundImage = siteSettings?.hero_background_image;

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-br from-secondary to-secondary/80 py-16 text-secondary-foreground md:py-24"
      style={heroBackgroundImage ? {
        backgroundImage: `linear-gradient(to bottom right, hsl(var(--secondary) / 0.9), hsl(var(--secondary) / 0.8)), url(${heroBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>
          <p className="mb-8 text-lg text-secondary-foreground/80 md:text-xl">
            {heroSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a href="#top-casinos">
                <Award className="mr-2 h-5 w-5" />
                Se Bedste Bonusser
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-secondary-foreground/30 hover:bg-secondary-foreground/10">
              <Link to="/bonus-guide">
                <BookOpen className="mr-2 h-5 w-5" />
                Læs Bonus Guide
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      {!heroBackgroundImage && (
        <div className="absolute left-0 top-0 h-full w-full opacity-10">
          <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-primary" />
          <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-primary" />
          <div className="absolute left-1/3 top-1/2 h-24 w-24 rounded-full bg-primary" />
        </div>
      )}
    </section>
  );
}

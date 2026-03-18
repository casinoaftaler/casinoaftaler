import { Link } from "react-router-dom";
import { SafeHelmet } from "@/lib/reactCompat";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, ShieldCheck } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useTwitchStatus } from "@/hooks/useTwitchStatus";
import { formatLastmodDanish, getRouteLastmod } from "@/lib/seoRoutes";

export function HeroSection() {
  const { data: siteSettings, isLoading: settingsLoading } = useSiteSettings();
  const { data: twitchStatus } = useTwitchStatus(siteSettings?.twitch_url);

  const heroTitle = siteSettings?.hero_title || "Sammenlign Danmarks bedste online casinoer – testet og verificeret";
  const heroSubtitle = siteSettings?.hero_subtitle || "Vi har analyseret 29+ danske casinoer med licens fra Spillemyndigheden. Se hvilke der scorer højest på bonus, udbetalingstid og spiludvalg.";
  const heroBackgroundImage = siteSettings?.hero_background_image;
  const isLive = twitchStatus?.isLive ?? false;
  const contentReady = !settingsLoading;
  const homepageLastmod = getRouteLastmod("/");
  const freshnessLabel = homepageLastmod ? formatLastmodDanish(homepageLastmod) : "løbende";

  return (
    <>
      {heroBackgroundImage && (
        <SafeHelmet>
          <link rel="preload" as="image" href={heroBackgroundImage} />
        </SafeHelmet>
      )}
      <section
        className="relative overflow-hidden py-6 text-white md:py-8 min-h-[320px] md:min-h-[320px] max-h-[85vh] md:max-h-[70vh]"
        style={{
          contain: "layout style paint",
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container relative z-10">
          <div className={`mx-auto max-w-3xl text-center transition-opacity duration-200 ${contentReady ? "opacity-100" : "opacity-0"}`}>
            {/* Twitch Live Indicator – always reserves space */}
            <div className="mb-6 min-h-[40px]">
              {siteSettings?.twitch_url && (
                <a
                  href={siteSettings.twitch_url}
                  target="_blank"
                  rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-medium transition-all hover:bg-primary/30 hover:scale-105"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Twitch">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                </svg>
                {isLive ? (
                  <>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-destructive"></span>
                    </span>
                    <span>LIVE NU</span>
                  </>
                ) : (
                  <span>Se Twitch Kanal</span>
                )}
              </a>
            )}
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {heroTitle}
          </h1>
          <p className="mb-6 text-base text-white/80 md:text-lg">
            {heroSubtitle}
          </p>
          {/* Social proof bar */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              29+ casinoer testet
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-accent" />
              100% dansk licens
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
              Opdateret {freshnessLabel}
            </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <a href="#top-casinos">
                  <Award className="mr-2 h-5 w-5" />
                  Se Top 10 Casinoer
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Link to="/casino-bonus">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Læs Bonus Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute left-0 top-0 h-full w-full opacity-20 pointer-events-none" aria-hidden="true" style={{ contain: "strict" }}>
          <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-primary/60 blur-xl will-change-transform animate-hero-float" />
          <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-accent/60 blur-xl will-change-transform animate-hero-float-slow" />
          <div className="absolute left-1/3 top-1/2 h-24 w-24 rounded-full bg-primary/40 blur-xl will-change-transform animate-hero-float-mid" />
        </div>
      </section>
    </>
  );
}

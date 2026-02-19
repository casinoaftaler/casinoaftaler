import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, BookOpen } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useTwitchStatus } from "@/hooks/useTwitchStatus";

export function HeroSection() {
  const { data: siteSettings, isLoading: settingsLoading } = useSiteSettings();
  const { data: twitchStatus } = useTwitchStatus(siteSettings?.twitch_url);
  
  const heroTitle = siteSettings?.hero_title || "Online Casino i Danmark – Sammenlign og Vælg Rigtigt";
  const heroSubtitle = siteSettings?.hero_subtitle || "Uafhængige anmeldelser og sammenligninger af danske online casinoer. Vi tester spiludvalg, udbetalinger, vilkår og sikkerhed, så du kan træffe det bedste valg.";
  const heroBackgroundImage = siteSettings?.hero_background_image;
  const isLive = twitchStatus?.isLive ?? false;
  const contentReady = !settingsLoading;

  return (
    <section 
      className="relative overflow-hidden py-8 text-white md:py-12 min-h-[280px] md:min-h-[320px]"
      style={{
        backgroundImage: heroBackgroundImage 
          ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
          : 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container relative z-10">
        <div className={`mx-auto max-w-3xl text-center transition-opacity duration-200 ${contentReady ? 'opacity-100' : 'opacity-0'}`}>
          {/* Twitch Live Indicator – always reserves space */}
          <div className="mb-6 min-h-[40px]">
            {siteSettings?.twitch_url && (
              <a
                href={siteSettings.twitch_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#9146FF]/20 px-4 py-2 text-sm font-medium transition-all hover:bg-[#9146FF]/30 hover:scale-105"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
                {isLive ? (
                  <>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
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
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <a href="#top-casinos">
                <Award className="mr-2 h-5 w-5" />
                Se Bedste Bonusser
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
      <div className="absolute left-0 top-0 h-full w-full opacity-20">
        <div 
          className="absolute left-10 top-10 h-32 w-32 rounded-full bg-[hsl(210_80%_60%)] blur-xl"
          style={{ animation: "float 6s ease-in-out infinite" }}
        />
        <div 
          className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-[hsl(260_70%_60%)] blur-xl"
          style={{ animation: "float 8s ease-in-out infinite 1s" }}
        />
        <div 
          className="absolute left-1/3 top-1/2 h-24 w-24 rounded-full bg-[hsl(230_70%_50%)] blur-xl"
          style={{ animation: "float 7s ease-in-out infinite 0.5s" }}
        />
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-15px) translateX(5px); }
          50% { transform: translateY(-8px) translateX(-5px); }
          75% { transform: translateY(-20px) translateX(3px); }
        }
      `}</style>
    </section>
  );
}

import { useEffect, useState, useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import defaultTitleImage from "@/assets/slots/book-of-fedesvin-title.png";
import riseTitleImage from "@/assets/slots/rise/title-logo.png";
import defaultSlotBackground from "@/assets/slots/slot-background.jpg";
import riseSlotBackground from "@/assets/slots/rise/background.jpg";
import gatesSlotBackground from "@/assets/slots/gates/background.jpg";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useSlotSymbolPreloader } from "@/hooks/useSlotSymbolPreloader";
import { useSlotSoundFiles } from "@/hooks/useSlotSoundFiles";
import { cn } from "@/lib/utils";
import { getSlotTheme } from "@/lib/slotTheme";

interface SlotLoadingScreenProps {
  onComplete: () => void;
  gameId?: string;
}

/**
 * Preload an array of audio URLs and return a readiness flag.
 * Each URL creates an HTMLAudioElement whose `canplaythrough` (or error) event
 * counts toward completion.
 */
function useAudioPreloader(urls: (string | null | undefined)[]) {
  const [ready, setReady] = useState(false);

  const key = urls.filter(Boolean).join(",");

  useEffect(() => {
    const validUrls = urls.filter(Boolean) as string[];
    if (validUrls.length === 0) {
      setReady(true);
      return;
    }

    setReady(false);
    let loaded = 0;
    let settled = false;

    const done = () => {
      if (settled) return;
      loaded++;
      if (loaded >= validUrls.length) {
        settled = true;
        setReady(true);
      }
    };

    // Timeout fallback: if sounds haven't loaded in 4s, mark ready anyway
    const timeout = setTimeout(() => {
      if (!settled) {
        settled = true;
        setReady(true);
      }
    }, 4000);

    const elements: HTMLAudioElement[] = validUrls.map((url) => {
      const a = new Audio();
      a.preload = "auto";
      a.addEventListener("canplaythrough", done, { once: true });
      a.addEventListener("error", done, { once: true });
      a.src = url;
      return a;
    });

    return () => {
      clearTimeout(timeout);
      elements.forEach((a) => {
        a.removeEventListener("canplaythrough", done);
        a.removeEventListener("error", done);
        a.pause();
        a.src = "";
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return ready;
}

export function SlotLoadingScreen({ onComplete, gameId = "book-of-fedesvin" }: SlotLoadingScreenProps) {
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const { data: siteSettings, isLoading: settingsLoading } = useSiteSettings();
  const { data: symbols } = useSlotSymbols(gameId);
  const { data: soundFiles } = useSlotSoundFiles(gameId);
  const theme = getSlotTheme(gameId);
  const isWizard = gameId === "rise-of-fedesvin";
  const isOlympus = gameId === "gates-of-fedesvin";
  const isBonanza = gameId === "fedesvin-bonanza";
  
  const titleKey = gameId === "book-of-fedesvin" ? "slot_title_image"
    : `${gameId.replace(/-/g, "_")}_title_image`;
  const titleImage = siteSettings?.[titleKey] || (isWizard ? riseTitleImage : isBonanza ? null : defaultTitleImage);

  const bgKey = gameId === "book-of-fedesvin" ? "slot_background_image"
    : `${gameId.replace(/-/g, "_")}_background_image`;
  const gameDefaultBackground = isOlympus ? gatesSlotBackground : isWizard ? riseSlotBackground : isBonanza ? null : defaultSlotBackground;
  const backgroundImage = siteSettings?.[bgKey] || gameDefaultBackground;

  const frameKey = gameId === "book-of-fedesvin" ? "slot_machine_frame_image"
    : `${gameId.replace(/-/g, "_")}_frame_image`;
  const frameImage = siteSettings?.[frameKey] || siteSettings?.slot_machine_frame_image;
  
  // ── Image preloading ──────────────────────────────────────────────
  // Only build the list once siteSettings has loaded so we don't
  // accidentally preload an empty list and mark "done" instantly.
  const additionalImages = useMemo(() => {
    if (settingsLoading) return []; // settings not ready yet – keep list empty
    return [frameImage, siteSettings?.[titleKey], siteSettings?.[bgKey]];
  }, [frameImage, siteSettings, titleKey, bgKey, settingsLoading]);
  
  const { isLoaded: assetsLoaded, progress: assetProgress } = useSlotSymbolPreloader(symbols, additionalImages);

  // ── Sound preloading ──────────────────────────────────────────────
  const soundUrls = useMemo(() => {
    if (!soundFiles) return [];
    return Object.values(soundFiles).filter(Boolean) as string[];
  }, [soundFiles]);

  const soundsReady = useAudioPreloader(soundUrls);

  // ── Gate: everything must be ready ────────────────────────────────
  // Settings, symbols, images AND sounds must all be loaded.
  const allDataReady = !settingsLoading && !!siteSettings && !!symbols;
  const everythingLoaded = allDataReady && assetsLoaded && soundsReady;

  // Minimum display time for loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Complete when both minimum time has passed AND everything is loaded
  useEffect(() => {
    if (minTimeElapsed && everythingLoaded) {
      setTimeout(onComplete, 200);
    }
  }, [minTimeElapsed, everythingLoaded, onComplete]);

  // Combined progress: 40% for time, 40% for images, 20% for sounds
  const timeProgress = minTimeElapsed ? 40 : 0;
  const assetProgressScaled = (assetProgress / 100) * 40;
  const soundProgress = soundsReady ? 20 : (soundUrls.length > 0 ? 5 : 20); // small base while loading
  const totalProgress = Math.min(timeProgress + assetProgressScaled + soundProgress, 100);

  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 -z-10" />
      {isWizard && (
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-indigo-900/20 to-purple-950/40 -z-10" />
      )}
      {isBonanza && (
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/40 via-fuchsia-900/20 to-pink-950/40 -z-10" />
      )}

      {/* Wizard animated particles */}
      {isWizard && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${3 + Math.random() * 5}px`,
                height: `${3 + Math.random() * 5}px`,
                background: `radial-gradient(circle, rgba(168,85,247,${0.4 + Math.random() * 0.4}) 0%, transparent 70%)`,
                animation: `wizard-float ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 4}s infinite`,
                boxShadow: `0 0 ${6 + Math.random() * 10}px rgba(168,85,247,0.4)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col items-center gap-8 px-4 animate-fade-in">
        {/* Title */}
        {titleImage ? (
          <img 
            src={titleImage} 
            alt={isBonanza ? "Fedesvin Bonanza" : isWizard ? "Rise of Fedesvin" : "Book of Fedesvin"} 
            className="w-full max-w-[280px] sm:max-w-md md:max-w-lg h-auto"
            style={{
              filter: isBonanza
                ? 'drop-shadow(0 0 20px rgba(236,72,153,0.5)) drop-shadow(0 0 40px rgba(236,72,153,0.3))'
                : isWizard
                  ? 'drop-shadow(0 0 20px rgba(168,85,247,0.5)) drop-shadow(0 0 40px rgba(168,85,247,0.3))'
                  : 'drop-shadow(0 0 20px rgba(251,191,36,0.5)) drop-shadow(0 0 40px rgba(251,191,36,0.3))',
              animation: isWizard ? 'wizard-title-glow 3s ease-in-out infinite'
                : isBonanza ? 'bonanza-title-glow 3s ease-in-out infinite' : undefined,
            }}
          />
        ) : (
          <h1 className={cn(
            "text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight",
            isBonanza ? "text-pink-300" : "text-foreground"
          )} style={{
            filter: isBonanza
              ? 'drop-shadow(0 0 20px rgba(236,72,153,0.5)) drop-shadow(0 0 40px rgba(236,72,153,0.3))'
              : undefined,
            animation: isBonanza ? 'bonanza-title-glow 3s ease-in-out infinite' : undefined,
          }}>
            Fedesvin Bonanza
          </h1>
        )}
        
        {/* Loading Bar */}
        <div className="w-full max-w-xs sm:max-w-sm space-y-4">
          <div className={cn(
            "relative p-3 rounded-xl backdrop-blur-md border",
            isBonanza
              ? "bg-pink-950/40 border-pink-500/20 shadow-[0_0_30px_rgba(236,72,153,0.15)]"
              : isWizard
                ? "bg-purple-950/40 border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                : "bg-amber-950/40 border-amber-500/20 shadow-[0_0_30px_rgba(251,191,36,0.15)]"
          )}>
            <Progress 
              value={totalProgress} 
              className={cn(
                "h-5 rounded-full overflow-hidden border",
                isBonanza
                  ? "bg-pink-950/60 border-pink-500/40 [&>div]:bg-gradient-to-r [&>div]:from-pink-600 [&>div]:via-pink-400 [&>div]:to-fuchsia-400"
                  : isWizard
                    ? "bg-purple-950/60 border-purple-500/40 [&>div]:bg-gradient-to-r [&>div]:from-purple-600 [&>div]:via-purple-400 [&>div]:to-indigo-400"
                    : "bg-amber-950/60 border-amber-500/40"
              )}
            />
            {/* Shimmer overlay */}
            <div 
              className="absolute inset-3 rounded-full pointer-events-none overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)'
              }}
            />
          </div>
          
          <p className={cn(
            "text-center text-sm font-medium",
            isBonanza ? "text-pink-400/80" : isWizard ? "text-purple-400/80" : "text-amber-500/80"
          )}>
            {everythingLoaded ? "Klar!" : "Indlæser..."} {Math.round(totalProgress)}%
          </p>
        </div>
      </div>

      {/* Wizard-specific animations */}
      {isWizard && (
        <style>{`
          @keyframes wizard-float {
            0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
            25% { transform: translateY(-20px) translateX(10px) scale(1.2); opacity: 1; }
            50% { transform: translateY(-10px) translateX(-8px) scale(0.8); opacity: 0.4; }
            75% { transform: translateY(-25px) translateX(5px) scale(1.1); opacity: 0.8; }
          }
          @keyframes wizard-title-glow {
            0%, 100% { filter: drop-shadow(0 0 20px rgba(168,85,247,0.5)) drop-shadow(0 0 40px rgba(168,85,247,0.3)); }
            50% { filter: drop-shadow(0 0 30px rgba(168,85,247,0.7)) drop-shadow(0 0 60px rgba(168,85,247,0.4)); }
          }
        `}</style>
      )}

      {/* Bonanza-specific animations */}
      {isBonanza && (
        <style>{`
          @keyframes bonanza-title-glow {
            0%, 100% { filter: drop-shadow(0 0 20px rgba(236,72,153,0.5)) drop-shadow(0 0 40px rgba(236,72,153,0.3)); }
            50% { filter: drop-shadow(0 0 30px rgba(236,72,153,0.7)) drop-shadow(0 0 60px rgba(236,72,153,0.4)); }
          }
        `}</style>
      )}
    </div>
  );
}

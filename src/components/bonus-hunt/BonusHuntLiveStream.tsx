import { useState, useCallback } from "react";
import { Radio } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { Button } from "@/components/ui/button";

export function BonusHuntLiveStream({ huntNumber }: { huntNumber: number }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const twitchChannel = "fedesvinsejer";
  const hostname = typeof window !== "undefined" ? window.location.hostname : "casinoaftaler.lovable.app";
  const embedUrl = `https://player.twitch.tv/?channel=${twitchChannel}&parent=${hostname}&autoplay=true`;

  const handlePlay = useCallback(() => {
    setIframeLoaded(true);
  }, []);

  return (
    <section
      className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/5 via-card to-card overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/10"
      aria-label={`Live stream – Bonus Hunt #${huntNumber}`}
    >
      <div className="p-4 md:p-5 space-y-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-green-500 mb-0.5 flex items-center gap-1.5">
            <Radio className="h-3 w-3 animate-pulse" />
            Live nu på Twitch
          </p>
          <h2 className="text-base font-bold text-foreground">
            Bonus Hunt #{huntNumber} – Live Stream
          </h2>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Følg med live mens vi åbner bonusser. Placer dine bets og vind præmier!
          </p>
        </div>

        {/* Video container */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-border/50" style={{ aspectRatio: "16/9" }}>
          {iframeLoaded ? (
            <iframe
              src={embedUrl}
              title={`Bonus Hunt #${huntNumber} – Live Stream`}
              className="absolute inset-0 h-full w-full animate-in fade-in duration-500"
              allowFullScreen
              allow="autoplay; fullscreen"
            />
          ) : (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer group overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background"
              aria-label="Start live stream"
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 group-hover:scale-110 group-hover:shadow-green-500/50 transition-all duration-200">
                <MenuIcon iconName="play" className="h-6 w-6 ml-0.5" />
              </div>
              <span className="relative z-10 text-sm font-semibold text-foreground drop-shadow-md">Se live stream</span>
              <span className="relative z-10 text-xs text-muted-foreground drop-shadow-md">Klik for at indlæse Twitch-stream</span>
            </button>
          )}
        </div>

        {/* Badges & link */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 border border-green-500/20 px-2.5 py-1 text-[11px] text-green-500 font-medium">
            <Radio className="h-3 w-3 animate-pulse" />
            LIVE
          </span>
          <a
            href={`https://www.twitch.tv/${twitchChannel}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-muted/40 px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-muted/60 transition-colors"
          >
            <MenuIcon iconName="external-link" className="h-3 w-3" />
            Åbn på Twitch
          </a>
        </div>
      </div>
    </section>
  );
}

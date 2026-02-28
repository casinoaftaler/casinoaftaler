import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Play, Monitor, Trophy, BarChart3 } from "lucide-react";
import hunt5Thumbnail from "@/assets/bonus-hunt-5-thumbnail.jpg";

interface HuntVideoData {
  twitchVideoId: string;
  huntNumber: number;
  date: string;            // e.g. "28. februar 2026"
  casinoName: string;
  casinoSlug: string;
  bonusCount: number;
  avgX: number;
  highestWin?: number;
  highestMultiplier?: number;
  localThumbnail?: string;
}

/** Video metadata for hunts that have a Twitch recording */
const HUNT_VIDEOS: Record<number, Omit<HuntVideoData, "huntNumber">> = {
  5: {
    twitchVideoId: "2710088948",
    date: "28. februar 2026",
    casinoName: "SpilDanskNu",
    casinoSlug: "spildansknu",
    bonusCount: 23,
    avgX: 88.2,
    highestWin: 656,
    highestMultiplier: 328,
    localThumbnail: hunt5Thumbnail,
  },
};

export function getHuntVideo(huntNumber: number): HuntVideoData | null {
  const entry = HUNT_VIDEOS[huntNumber];
  if (!entry) return null;
  return { ...entry, huntNumber };
}

interface BonusHuntVideoSectionProps {
  video: HuntVideoData;
}

export function BonusHuntVideoSection({ video }: BonusHuntVideoSectionProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handlePlay = useCallback(() => {
    setIframeLoaded(true);

    // Track play event
    try {
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "hunt_video_play", {
          hunt_id: video.huntNumber,
          casino: video.casinoSlug,
        });
      }
    } catch {
      // Tracking failure is non-critical
    }
  }, [video.huntNumber, video.casinoSlug]);

  const embedUrl = `https://player.twitch.tv/?video=${video.twitchVideoId}&parent=${typeof window !== "undefined" ? window.location.hostname : "casinoaftaler.lovable.app"}&autoplay=true`;
  const twitchThumb = `https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zdc1j/thumb/thumb-${video.twitchVideoId}-640x360.jpg`;

  return (
    <>
      {/* VideoObject JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": `Bonus Hunt #${video.huntNumber} – ${video.casinoName} (${video.date})`,
        "description": `Live bonus hunt streamet på Twitch hos ${video.casinoName}. ${video.bonusCount} bonusser åbnet med ${video.avgX}x gennemsnit.`,
        "uploadDate": "2026-02-28T20:00:00+01:00",
        "duration": "PT2H",
        "thumbnailUrl": twitchThumb,
        "embedUrl": `https://player.twitch.tv/?video=${video.twitchVideoId}`,
        "contentUrl": `https://www.twitch.tv/videos/${video.twitchVideoId}`,
        "publisher": {
          "@type": "Organization",
          "name": "Casinoaftaler.dk",
        },
      }) }} />

      <section
        className="mb-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card overflow-hidden"
        aria-label={`Video af Bonus Hunt #${video.huntNumber}`}
      >
        <div className="p-5 md:p-6 space-y-4">
          {/* Heading */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
              🎥 Fuld stream optagelse
            </p>
            <h2 className="text-lg font-bold text-foreground">
              Se hele Bonus Hunt #{video.huntNumber} ({video.date})
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              Denne bonus hunt blev streamet live på Twitch hos {video.casinoName}.
              Se hele åbningen af {video.bonusCount} bonusser og det samlede resultat
              på {video.avgX}x gennemsnit.
            </p>
          </div>

          {/* Video container – fixed aspect ratio to prevent CLS */}
          <div className="relative w-full overflow-hidden rounded-xl border border-border/50" style={{ aspectRatio: "16/9" }}>
            {iframeLoaded ? (
              <iframe
                src={embedUrl}
                title={`Bonus Hunt #${video.huntNumber} – ${video.casinoName}`}
                className="absolute inset-0 h-full w-full"
                allowFullScreen
                allow="autoplay; fullscreen"
              />
            ) : (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer group overflow-hidden"
                aria-label="Afspil Twitch-video"
              >
                {video.localThumbnail ? (
                  <img
                    src={video.localThumbnail}
                    alt={`Bonus Hunt #${video.huntNumber} thumbnail`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    width={1280}
                    height={736}
                  />
                ) : (
                  <div className="absolute inset-0 bg-background/80" />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="h-7 w-7 ml-1" />
                </div>
                <span className="relative z-10 text-sm font-semibold text-white drop-shadow-md">Se streamen på Twitch</span>
                <span className="relative z-10 text-xs text-white/80 drop-shadow-md">Klik for at indlæse video</span>
              </button>
            )}
          </div>

          {/* Stream metadata */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Monitor className="h-3.5 w-3.5 text-primary" />
              Streamet: {video.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5 text-primary" />
              Casino: {video.casinoName}
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="h-3.5 w-3.5 text-primary" />
              Resultat: {video.avgX}x gennemsnit over {video.bonusCount} bonusser
            </span>
          </div>
        </div>

        {/* SEO crawlable summary */}
        <div className="border-t border-border/50 px-5 py-4 md:px-6 space-y-2">
          <h3 className="text-sm font-semibold text-foreground">
            Resultat af Bonus Hunt #{video.huntNumber}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I denne live-stream åbnede vi {video.bonusCount} bonusser på {video.casinoName}.
            Den samlede gennemsnitlige multiplier endte på {video.avgX}x
            {video.highestWin != null && `, med højeste win på ${video.highestWin} kr`}
            {video.highestMultiplier != null && ` og højeste multiplier på ${video.highestMultiplier}x`}
            .
          </p>
          <p className="text-xs text-muted-foreground">
            Alle resultater er dokumenteret i videoen ovenfor.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Læs også vores fulde{" "}
            <Link
              to={`/casino-anmeldelser/${video.casinoSlug}`}
              className="text-primary underline hover:text-primary/80"
              title={`Læs anmeldelse af ${video.casinoName}`}
            >
              {video.casinoName} anmeldelse
            </Link>{" "}
            med bonusvilkår og udbetalingstest.
          </p>
        </div>
      </section>
    </>
  );
}

import { useState, useCallback } from "react";
import { SafeHelmet } from "@/lib/reactCompat";
import { Play, Monitor, Video, MessageCircle, Calendar } from "lucide-react";
import hunt5Thumbnail from "@/assets/bonus-hunt-5-thumbnail.jpg";
import hunt4Thumbnail from "@/assets/bonus-hunt-4-thumbnail.png";
import hunt3Thumbnail from "@/assets/bonus-hunt-3-thumbnail.png";
import hunt2Thumbnail from "@/assets/bonus-hunt-2-thumbnail.png";

export interface HuntVideoData {
  twitchVideoId: string;
  huntNumber: number;
  date: string;
  isoDate: string;
  casinoName: string;
  casinoSlug: string;
  bonusCount: number;
  avgX: number;
  highestWin?: number;
  highestMultiplier?: number;
  localThumbnail?: string;
}

// Fallback thumbnails by VOD ID
const LOCAL_THUMBNAILS: Record<string, string> = {
  "2708438065": hunt4Thumbnail,
  "2710088948": hunt5Thumbnail,
  "2705907775": hunt3Thumbnail,
  "2716498380": hunt2Thumbnail,
};

/**
 * Build HuntVideoData from archive DB row.
 * Returns null if no twitch_vod_id is set on the archive.
 */
export function getHuntVideoFromArchive(archive: any): HuntVideoData | null {
  if (!archive?.twitch_vod_id) return null;

  const apiData = archive.api_data?.data || archive.api_data || {};
  const slots = apiData.slots || [];
  const openedSlots = slots.filter((s: any) => s.played);
  const openedWithWins = openedSlots.filter((s: any) => (s.bet || 0) > 0 && (s.win || 0) > 0);

  const avgX = archive.average_x
    ? Number(archive.average_x)
    : openedWithWins.length > 0
      ? openedWithWins.reduce((sum: number, s: any) => sum + ((s.win || 0) / (s.bet || 1)), 0) / openedWithWins.length
      : 0;

  const highestWin = openedSlots.reduce((max: number, s: any) => Math.max(max, s.win || 0), 0);
  const highestMultiplier = openedSlots.reduce((max: number, s: any) => {
    const bet = s.bet || 0;
    return bet > 0 ? Math.max(max, (s.win || 0) / bet) : max;
  }, 0);

  // Try to build a reasonable ISO date from vod_date or created_at
  let isoDate = "";
  if (archive.created_at) {
    isoDate = archive.created_at.slice(0, 10);
  }

  return {
    twitchVideoId: archive.twitch_vod_id,
    huntNumber: archive.hunt_number,
    date: archive.vod_date || archive.hunt_name || `Hunt #${archive.hunt_number}`,
    isoDate,
    casinoName: archive.casino_name || "Casino",
    casinoSlug: (archive.casino_name || "casino").toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    bonusCount: archive.total_slots || slots.length,
    avgX: Math.round(avgX * 100) / 100,
    highestWin: Math.round(highestWin),
    highestMultiplier: Math.round(highestMultiplier * 100) / 100,
    localThumbnail: LOCAL_THUMBNAILS[archive.twitch_vod_id] || undefined,
  };
}

/** @deprecated Use getHuntVideoFromArchive instead */
export function getHuntVideo(_huntNumber: number): HuntVideoData | null {
  return null;
}

interface BonusHuntVideoSectionProps {
  video: HuntVideoData;
}

export function BonusHuntVideoSection({ video }: BonusHuntVideoSectionProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handlePlay = useCallback(() => {
    setIframeLoaded(true);
    try {
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "hunt_video_play", {
          hunt_id: video.huntNumber,
          casino: video.casinoSlug,
        });
      }
    } catch {}
  }, [video.huntNumber, video.casinoSlug]);

  const embedUrl = `https://player.twitch.tv/?video=${video.twitchVideoId}&parent=${typeof window !== "undefined" ? window.location.hostname : "casinoaftaler.lovable.app"}&autoplay=true`;
  const twitchThumb = `https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zdc1j/thumb/thumb-${video.twitchVideoId}-640x360.jpg`;

  return (
    <>
      <SafeHelmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "@id": `https://casinoaftaler.dk/bonus-hunt#video-${video.huntNumber}`,
          "name": `Bonus Hunt #${video.huntNumber} – ${video.casinoName} (${video.date})`,
          "description": `Live bonus hunt streamet på Twitch hos ${video.casinoName}. ${video.bonusCount} bonusser åbnet med ${video.avgX}x gennemsnit.`,
          "uploadDate": `${video.isoDate}T20:00:00+01:00`,
          "duration": "PT2H",
          "thumbnailUrl": video.localThumbnail || twitchThumb,
          "embedUrl": `https://player.twitch.tv/?video=${video.twitchVideoId}`,
          "contentUrl": `https://www.twitch.tv/videos/${video.twitchVideoId}`,
          "publisher": { "@type": "Organization", "@id": "https://casinoaftaler.dk/#organization", "name": "Casinoaftaler.dk" },
        })}</script>
      </SafeHelmet>

      <section
        className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
        aria-label={`Video af Bonus Hunt #${video.huntNumber}`}
      >
        <div className="p-4 md:p-5 space-y-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-0.5 flex items-center gap-1">
              <Video className="h-3 w-3 text-primary" />
              Fuld stream optagelse
            </p>
            <h2 className="text-base font-bold text-foreground">
              Se hele Bonus Hunt #{video.huntNumber} ({video.date})
            </h2>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Streamet live på Twitch hos {video.casinoName} – {video.bonusCount} bonusser, {video.avgX}x snit.
            </p>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl border border-border/50" style={{ aspectRatio: "16/9" }}>
            {iframeLoaded ? (
              <iframe
                src={embedUrl}
                title={`Bonus Hunt #${video.huntNumber} – ${video.casinoName}`}
                className="absolute inset-0 h-full w-full animate-in fade-in duration-500"
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
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300" />
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:shadow-primary/50 transition-all duration-200">
                  <Play className="h-6 w-6 ml-0.5" />
                </div>
                <span className="relative z-10 text-sm font-semibold text-white drop-shadow-md">Se streamen på Twitch</span>
                <span className="relative z-10 text-xs text-white/80 drop-shadow-md">Klik for at indlæse video</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { icon: Monitor, label: "Streamet live", color: "text-green-500" },
              { icon: Video, label: "Fuld VOD", color: "text-primary" },
              { icon: MessageCircle, label: "Chat aktiv", color: "text-primary" },
              { icon: Calendar, label: video.date, color: "text-primary" },
            ].map((badge) => {
              const Icon = badge.icon;
              return (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1 rounded-full bg-muted/40 px-2.5 py-1 text-[11px] text-muted-foreground transition-all duration-[180ms] hover:bg-muted/60"
                >
                  <Icon className={`h-3 w-3 ${badge.color}`} />
                  {badge.label}
                </span>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

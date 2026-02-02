import { useState, useEffect } from "react";
import { X, Minus, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useTwitchStatus } from "@/hooks/useTwitchStatus";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type PlayerState = "expanded" | "minimized" | "closed";

function extractChannelName(twitchUrl: string): string | null {
  try {
    const url = new URL(twitchUrl);
    const pathParts = url.pathname.split("/").filter(Boolean);
    return pathParts[0] || null;
  } catch {
    return twitchUrl || null;
  }
}

export function TwitchLivePlayer() {
  const { data: settings } = useSiteSettings();
  const twitchUrl = settings?.twitch_url;
  const { data: twitchStatus, isLoading } = useTwitchStatus(twitchUrl);
  const isMobile = useIsMobile();
  
  const [playerState, setPlayerState] = useState<PlayerState>("expanded");
  const [wasLive, setWasLive] = useState(false);

  const isLive = twitchStatus?.isLive ?? false;
  const streamInfo = twitchStatus?.stream;
  const channelName = twitchUrl ? extractChannelName(twitchUrl) : null;

  // Reset closed state when stream goes offline -> online
  useEffect(() => {
    if (isLive && !wasLive && playerState === "closed") {
      setPlayerState(isMobile ? "minimized" : "expanded");
    }
    setWasLive(isLive);
  }, [isLive, wasLive, playerState, isMobile]);

  // Set initial state based on device
  useEffect(() => {
    if (isLive && !wasLive) {
      setPlayerState(isMobile ? "minimized" : "expanded");
    }
  }, [isMobile, isLive, wasLive]);

  // Don't render anything if not live, still loading, or no channel configured
  if (isLoading || !isLive || !channelName) {
    return null;
  }

  const hostname = typeof window !== "undefined" ? window.location.hostname : "localhost";
  const embedUrl = `https://player.twitch.tv/?channel=${channelName}&parent=${hostname}&muted=true`;

  if (playerState === "closed") {
    return null;
  }

  const handleMinimize = () => setPlayerState("minimized");
  const handleExpand = () => setPlayerState("expanded");
  const handleClose = () => setPlayerState("closed");

  // Minimized pill view
  if (playerState === "minimized") {
    return (
      <div
        className={cn(
          "fixed bottom-20 left-4 z-40 flex items-center gap-2 rounded-full bg-card border border-border px-3 py-2 shadow-lg transition-all duration-300 animate-in slide-in-from-left-4",
          isMobile && "left-2 right-2 bottom-16"
        )}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-destructive" />
        </span>
        <span className="text-sm font-medium text-foreground">LIVE</span>
        {streamInfo?.viewerCount !== undefined && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            {streamInfo.viewerCount.toLocaleString()}
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 ml-1"
          onClick={handleExpand}
          aria-label="Udvid afspiller"
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={handleClose}
          aria-label="Luk afspiller"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    );
  }

  // Expanded player view
  return (
    <div
      className={cn(
        "fixed bottom-20 left-4 z-40 w-80 overflow-hidden rounded-lg bg-card border border-border shadow-xl transition-all duration-300 animate-in slide-in-from-left-4",
        isMobile && "left-2 right-2 w-auto bottom-16"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-muted/50 px-3 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
          </span>
          <span className="text-xs font-medium text-foreground truncate">
            {streamInfo?.title || "LIVE"}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {streamInfo?.viewerCount !== undefined && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground mr-2">
              <Eye className="h-3 w-3" />
              {streamInfo.viewerCount.toLocaleString()}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleMinimize}
            aria-label="Minimér afspiller"
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleClose}
            aria-label="Luk afspiller"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Player iframe */}
      <div className="aspect-video w-full">
        <iframe
          src={embedUrl}
          className="h-full w-full"
          allowFullScreen
          allow="autoplay; encrypted-media"
          title="Twitch Live Stream"
        />
      </div>
    </div>
  );
}

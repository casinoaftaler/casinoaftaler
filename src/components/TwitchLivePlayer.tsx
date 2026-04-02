import { useState, useEffect, useRef, useCallback } from "react";
import { X, Plus, GripVertical, VolumeX } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useTwitchStatus } from "@/hooks/useTwitchStatus";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type PlayerState = "expanded" | "minimized" | "closed";

interface Position {
  x: number;
  y: number;
}

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
  const [position, setPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; posX: number; posY: number } | null>(null);

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

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!dragRef.current) return;
    e.preventDefault();
    
    const rect = dragRef.current.getBoundingClientRect();
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: rect.left,
      posY: rect.top,
    };
    setIsDragging(true);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!dragRef.current || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    const rect = dragRef.current.getBoundingClientRect();
    dragStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      posX: rect.left,
      posY: rect.top,
    };
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStartRef.current) return;
      
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      
      const newX = Math.max(0, Math.min(window.innerWidth - 100, dragStartRef.current.posX + deltaX));
      const newY = Math.max(0, Math.min(window.innerHeight - 50, dragStartRef.current.posY + deltaY));
      
      setPosition({ x: newX, y: newY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragStartRef.current || e.touches.length !== 1) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStartRef.current.x;
      const deltaY = touch.clientY - dragStartRef.current.y;
      
      const newX = Math.max(0, Math.min(window.innerWidth - 100, dragStartRef.current.posX + deltaX));
      const newY = Math.max(0, Math.min(window.innerHeight - 50, dragStartRef.current.posY + deltaY));
      
      setPosition({ x: newX, y: newY });
    };

    const handleEnd = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  // Don't render anything if not live, still loading, or no channel configured
  if (isLoading || !isLive || !channelName) {
    return null;
  }

  const hostname = typeof window !== "undefined" ? window.location.hostname : "localhost";
  const embedUrl = `https://player.twitch.tv/?channel=${channelName}&parent=${hostname}&muted=${isMuted}`;

  if (playerState === "closed") {
    return null;
  }

  const handleMinimize = () => setPlayerState("minimized");
  const handleExpand = () => setPlayerState("expanded");
  const handleClose = () => setPlayerState("closed");
  const toggleMute = () => setIsMuted(!isMuted);

  const positionStyles = position
    ? { left: position.x, top: position.y, bottom: "auto", right: "auto" }
    : {};

  // Minimized pill view
  if (playerState === "minimized") {
    return (
      <div
        ref={dragRef}
        style={positionStyles}
        className={cn(
          "fixed z-40 flex items-center gap-2 rounded-full bg-card border border-border px-3 py-2 shadow-lg transition-shadow duration-300",
          !position && "bottom-20 left-4",
          !position && isMobile && "left-2 right-2 bottom-16",
          isDragging ? "shadow-2xl cursor-grabbing" : "cursor-default"
        )}
      >
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="cursor-grab active:cursor-grabbing p-1 -ml-1 hover:bg-muted rounded"
          aria-label="Træk for at flytte"
        >
          <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-destructive" />
        </span>
        <span className="text-sm font-medium text-foreground">LIVE</span>
        {streamInfo?.viewerCount !== undefined && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MenuIcon iconName="eye" className="h-3 w-3" />
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
      ref={dragRef}
      style={positionStyles}
      className={cn(
        "fixed z-40 w-80 overflow-hidden rounded-lg bg-card border border-border shadow-xl transition-shadow duration-300",
        !position && "bottom-20 left-4",
        !position && isMobile && "left-2 right-2 w-auto bottom-16",
        isDragging && "shadow-2xl"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-muted/50 px-2 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded shrink-0"
            aria-label="Træk for at flytte"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
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
            <span className="flex items-center gap-1 text-xs text-muted-foreground mr-1">
              <MenuIcon iconName="eye" className="h-3 w-3" />
              {streamInfo.viewerCount.toLocaleString()}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={toggleMute}
            aria-label={isMuted ? "Slå lyd til" : "Slå lyd fra"}
          >
            {isMuted ? (
              <VolumeX className="h-3.5 w-3.5" />
            ) : (
              <MenuIcon iconName="volume2" className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleMinimize}
            aria-label="Minimér afspiller"
          >
            <MenuIcon iconName="minus" className="h-3.5 w-3.5" />
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
          key={isMuted ? "muted" : "unmuted"}
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

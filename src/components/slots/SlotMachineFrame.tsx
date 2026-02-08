import { useState, useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { cn } from "@/lib/utils";
import { getSlotTheme } from "@/lib/slotTheme";

interface SlotMachineFrameProps {
  children: React.ReactNode;
  isBonus?: boolean;
  isSpinning?: boolean;
  gameId?: string;
}

// Default frame sizes per game (used when no DB setting exists)
const GAME_FRAME_DEFAULTS: Record<string, number> = {
  "book-of-fedesvin": 90,
  "rise-of-fedesvin": 95,
};

// Per-game vertical offset for the frame IMAGE only (negative = frame moves up, positive = down)
// This moves the frame independently from the reels
const GAME_FRAME_VERTICAL_OFFSET: Record<string, number> = {
  "rise-of-fedesvin": -30,
};

// Per-game content (reels) vertical offset in px (positive = move reels down inside frame)
// This moves the reels independently from the frame
const GAME_CONTENT_VERTICAL_OFFSET: Record<string, number> = {
  "rise-of-fedesvin": 90,
};

// Calculate responsive frame size based on screen width
function getEffectiveFrameSize(windowWidth: number, baseSize: number): number {
  if (windowWidth < 400) return Math.round(baseSize * 0.35);  // Extra small
  if (windowWidth < 640) return Math.round(baseSize * 0.45);  // Mobile
  if (windowWidth < 768) return Math.round(baseSize * 0.60);  // Small tablet
  if (windowWidth < 1024) return Math.round(baseSize * 0.80); // Tablet/medium
  return baseSize; // Desktop - full size
}

export function SlotMachineFrame({ 
  children, 
  isBonus = false, 
  isSpinning = false,
  gameId = "book-of-fedesvin"
}: SlotMachineFrameProps) {
  const { data: settings } = useSiteSettings();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [windowWidth, setWindowWidth] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  // Listen for window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Use game-specific frame/size if available, fallback to global
  const gamePrefix = gameId === "book-of-fedesvin" ? "" : gameId.replace(/-/g, "_") + "_";
  const frameImageUrl = (gamePrefix ? settings?.[`${gamePrefix}frame_image`] : null) || settings?.slot_machine_frame_image;
  const frameSizeKey = gamePrefix ? `${gamePrefix}frame_size` : "slot_frame_size";
  const gameDefault = GAME_FRAME_DEFAULTS[gameId] ?? 90;
  const baseFrameSize = parseInt(settings?.[frameSizeKey] || settings?.slot_frame_size || String(gameDefault), 10);
  const effectiveFrameSize = getEffectiveFrameSize(windowWidth, baseFrameSize);
  const hasFrame = !!frameImageUrl && !imageError;
  
  // Frame offset (moves ONLY the frame image, not the reels)
  const frameVerticalOffset = GAME_FRAME_VERTICAL_OFFSET[gameId] ?? 0;
  const effectiveFrameOffset = getEffectiveFrameSize(windowWidth, Math.abs(frameVerticalOffset)) * Math.sign(frameVerticalOffset);
  
  // Content offset (moves ONLY the reels, not the frame)
  const contentVerticalOffset = GAME_CONTENT_VERTICAL_OFFSET[gameId] ?? 0;
  const effectiveContentOffset = getEffectiveFrameSize(windowWidth, contentVerticalOffset);

  // Margins use the max extent to prevent clipping (frame size + whichever offset pushes further)
  const marginTop = hasFrame && imageLoaded 
    ? effectiveFrameSize + Math.max(0, -effectiveFrameOffset)
    : undefined;
  const marginBottom = hasFrame && imageLoaded 
    ? effectiveFrameSize + Math.max(0, effectiveFrameOffset)
    : undefined;

  return (
    <div 
      className="relative"
      style={{
        marginTop: marginTop != null ? `${marginTop}px` : undefined,
        marginLeft: hasFrame && imageLoaded ? `${effectiveFrameSize}px` : undefined,
        marginRight: hasFrame && imageLoaded ? `${effectiveFrameSize}px` : undefined,
        marginBottom: marginBottom != null ? `${marginBottom}px` : undefined,
      }}
    >
      {/* Frame Image Overlay - moves independently from reels */}
      {hasFrame && (
        <div 
          className={cn(
            "absolute pointer-events-none -z-10 transition-opacity duration-500",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            top: `-${effectiveFrameSize + effectiveFrameOffset}px`,
            left: `-${effectiveFrameSize}px`,
            right: `-${effectiveFrameSize}px`,
            bottom: `-${effectiveFrameSize - effectiveFrameOffset}px`,
            filter: getSlotTheme(gameId).frameDropShadow,
          }}
        >
          <img
            src={frameImageUrl}
            alt="Slot Frame"
            className="w-full h-full object-fill"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </div>
      )}

      {/* Content wrapper with padding to account for frame */}
      <div 
        className={cn(
          "relative",
          hasFrame && imageLoaded && (
            gameId === "rise-of-fedesvin" 
              ? "p-2 sm:p-3 md:p-4" 
              : "p-4 sm:p-6 md:p-8"
          )
        )}
        style={{
          paddingTop: hasFrame && imageLoaded && effectiveContentOffset > 0
            ? `${effectiveContentOffset + (gameId === "rise-of-fedesvin" ? 8 : 16)}px`
            : undefined,
        }}
      >
        {/* Fallback CSS frame corners when no image or loading */}
        {(!hasFrame || !imageLoaded) && (
          <>
            <div className={cn("absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-5 h-5 sm:w-8 sm:h-8 border-t-2 border-l-2 sm:border-t-4 sm:border-l-4 rounded-tl-lg hidden xs:block", getSlotTheme(gameId).frameBorderColor)} />
            <div className={cn("absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-5 h-5 sm:w-8 sm:h-8 border-t-2 border-r-2 sm:border-t-4 sm:border-r-4 rounded-tr-lg hidden xs:block", getSlotTheme(gameId).frameBorderColor)} />
            <div className={cn("absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-5 h-5 sm:w-8 sm:h-8 border-b-2 border-l-2 sm:border-b-4 sm:border-l-4 rounded-bl-lg hidden xs:block", getSlotTheme(gameId).frameBorderColor)} />
            <div className={cn("absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-5 h-5 sm:w-8 sm:h-8 border-b-2 border-r-2 sm:border-b-4 sm:border-r-4 rounded-br-lg hidden xs:block", getSlotTheme(gameId).frameBorderColor)} />
          </>
        )}

        {/* Actual slot content */}
        {children}
      </div>
    </div>
  );
}

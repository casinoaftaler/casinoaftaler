import { useState, useEffect, useRef, useCallback } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { cn } from "@/lib/utils";
import { getSlotTheme } from "@/lib/slotTheme";

interface SlotMachineFrameProps {
  children: React.ReactNode;
  isBonus?: boolean;
  isSpinning?: boolean;
  gameId?: string;
}

// Helper to derive settings keys per game
function getFrameSettingsKeys(gameId: string) {
  const prefix = gameId === "book-of-fedesvin" ? "slot" : gameId.replace(/-/g, "_");
  const isDefault = gameId === "book-of-fedesvin";
  return {
    frameImageKey: isDefault ? "slot_machine_frame_image" : `${prefix}_frame_image`,
    frameWidthKey: `${prefix}_frame_width`,
    frameHeightKey: `${prefix}_frame_height`,
    frameOffsetXKey: `${prefix}_frame_offset_x`,
    frameOffsetYKey: `${prefix}_frame_offset_y`,
  };
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
  const imgRef = useRef<HTMLImageElement>(null);

  const { frameImageKey, frameWidthKey, frameHeightKey, frameOffsetXKey, frameOffsetYKey } = getFrameSettingsKeys(gameId);

  const frameImageUrl = settings?.[frameImageKey] || null;
  const frameWidth = parseInt(settings?.[frameWidthKey] || "130", 10);
  const frameHeight = parseInt(settings?.[frameHeightKey] || "130", 10);
  const frameOffsetX = parseInt(settings?.[frameOffsetXKey] || "0", 10);
  const frameOffsetY = parseInt(settings?.[frameOffsetYKey] || "0", 10);
  const hasFrame = !!frameImageUrl && !imageError;

  // Reset loaded/error state when the frame image URL changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [frameImageUrl]);

  // Handle cached images
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setImageLoaded(true);
    }
  }, [frameImageUrl]);

  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleImageError = useCallback(() => setImageError(true), []);

  return (
    <div className="relative" style={{ overflow: "visible" }}>
      {/* Frame Image Overlay - freely positioned, purely decorative */}
      {hasFrame && (
        <div 
          className={cn(
            "absolute pointer-events-none z-10 transition-opacity duration-500",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            width: `${frameWidth}%`,
            height: `${frameHeight}%`,
            left: `calc(50% + ${frameOffsetX}px)`,
            top: `calc(50% + ${frameOffsetY}px)`,
            transform: "translate(-50%, -50%)",
            filter: getSlotTheme(gameId).frameDropShadow,
          }}
        >
          <img
            ref={imgRef}
            src={frameImageUrl}
            alt="Slot Frame"
            className="w-full h-full object-contain"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>
      )}

      {/* Content wrapper */}
      <div className="relative">
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

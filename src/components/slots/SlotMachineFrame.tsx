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

  useEffect(() => { setImageLoaded(false); setImageError(false); }, [frameImageUrl]);
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setImageLoaded(true);
  }, [frameImageUrl]);

  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleImageError = useCallback(() => setImageError(true), []);

  const isBonanza = gameId === "fedesvin-bonanza";

  return (
    <div className="relative" style={{ overflow: "visible" }}>
      {hasFrame && (
        <div 
          className={cn("absolute pointer-events-none z-0 transition-opacity duration-500", imageLoaded ? "opacity-100" : "opacity-0")}
          style={{
            width: `${frameWidth}%`,
            height: `${frameHeight}%`,
            left: `calc(50% + ${frameOffsetX}px)`,
            top: `calc(50% + ${frameOffsetY}px)`,
            transform: "translate(-50%, -50%)",
            filter: getSlotTheme(gameId).frameDropShadow,
          }}
        >
          <img ref={imgRef} src={frameImageUrl} alt="Slot Frame" className="w-full h-full object-contain" onLoad={handleImageLoad} onError={handleImageError} />
        </div>
      )}

      {/* Candy stripe border for Bonanza */}
      {isBonanza && (
        <div
          className="absolute pointer-events-none z-10 bonanza-candy-stripe-border"
          style={{
            inset: "-8px",
            borderRadius: "1rem",
          }}
        />
      )}

      <div className="relative">
        {(!hasFrame || !imageLoaded) && !isBonanza && (
          <>
            <div className={cn("absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 rounded-tl-lg", getSlotTheme(gameId).frameBorderColor)} />
            <div className={cn("absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 rounded-tr-lg", getSlotTheme(gameId).frameBorderColor)} />
            <div className={cn("absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 rounded-bl-lg", getSlotTheme(gameId).frameBorderColor)} />
            <div className={cn("absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 rounded-br-lg", getSlotTheme(gameId).frameBorderColor)} />
          </>
        )}
        {children}
      </div>
    </div>
  );
}

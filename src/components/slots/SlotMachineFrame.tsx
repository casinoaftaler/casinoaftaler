import { useState } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { cn } from "@/lib/utils";

interface SlotMachineFrameProps {
  children: React.ReactNode;
  isBonus?: boolean;
  isSpinning?: boolean;
}

export function SlotMachineFrame({ 
  children, 
  isBonus = false, 
  isSpinning = false 
}: SlotMachineFrameProps) {
  const { data: settings } = useSiteSettings();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const frameImageUrl = settings?.slot_machine_frame_image;
  const frameSize = parseInt(settings?.slot_frame_size || "90", 10);
  const hasFrame = !!frameImageUrl && !imageError;

  return (
    <div 
      className="relative"
      style={{
        // Add margin to prevent frame from being clipped
        // Minimal top margin to reduce space between title and slot
        marginTop: hasFrame && imageLoaded ? `${Math.max(frameSize * 0.1, 8)}px` : undefined,
        marginLeft: hasFrame && imageLoaded ? `${frameSize}px` : undefined,
        marginRight: hasFrame && imageLoaded ? `${frameSize}px` : undefined,
        marginBottom: hasFrame && imageLoaded ? `${frameSize}px` : undefined,
      }}
    >
      {/* Egyptian Frame Image Overlay */}
      {hasFrame && (
        <div 
          className={cn(
            "absolute pointer-events-none -z-10 transition-opacity duration-500",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            top: `-${frameSize}px`,
            left: `-${frameSize}px`,
            right: `-${frameSize}px`,
            bottom: `-${frameSize}px`,
            filter: `drop-shadow(0 0 20px rgba(0,0,0,0.6)) 
                     drop-shadow(0 0 40px rgba(0,0,0,0.4)) 
                     drop-shadow(0 0 80px rgba(0,0,0,0.3))
                     drop-shadow(0 4px 30px rgba(251,191,36,0.15))`,
          }}
        >
          <img
            src={frameImageUrl}
            alt="Egyptian Slot Frame"
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
          hasFrame && imageLoaded && "p-4 sm:p-6 md:p-8"
        )}
      >
        {/* Fallback CSS frame corners when no image or loading */}
        {(!hasFrame || !imageLoaded) && (
          <>
            <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-5 h-5 sm:w-8 sm:h-8 border-t-2 border-l-2 sm:border-t-4 sm:border-l-4 rounded-tl-lg hidden xs:block border-amber-400" />
            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-5 h-5 sm:w-8 sm:h-8 border-t-2 border-r-2 sm:border-t-4 sm:border-r-4 rounded-tr-lg hidden xs:block border-amber-400" />
            <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-5 h-5 sm:w-8 sm:h-8 border-b-2 border-l-2 sm:border-b-4 sm:border-l-4 rounded-bl-lg hidden xs:block border-amber-400" />
            <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-5 h-5 sm:w-8 sm:h-8 border-b-2 border-r-2 sm:border-b-4 sm:border-r-4 rounded-br-lg hidden xs:block border-amber-400" />
          </>
        )}

        {/* Actual slot content */}
        {children}
      </div>
    </div>
  );
}

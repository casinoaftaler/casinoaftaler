import { useState, useEffect } from "react";
import { SlotCasinoCard } from "./SlotCasinoCard";
import { GiveawayBanner } from "./GiveawayBanner";
import type { Casino } from "@/hooks/useCasinos";

interface SlotPromoSliderProps {
  casino: Casino;
  backgroundImage: string;
}

export function SlotPromoSlider({ casino, backgroundImage }: SlotPromoSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % totalSlides);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full animate-fade-in">
      <div className="overflow-hidden rounded-xl aspect-[3/4] border border-amber-500/20 shadow-[0_0_20px_rgba(251,191,36,0.08)]">
        <div 
          className="flex h-full transition-transform duration-600 ease-in-out"
          style={{ 
            transform: `translateX(-${activeSlide * 100}%)`,
            transitionDuration: '600ms'
          }}
        >
          {/* Slide 1: Casino Card */}
          <div className="w-full h-full flex-shrink-0">
            <SlotCasinoCard casino={casino} backgroundImage={backgroundImage} />
          </div>
          
          {/* Slide 2: Giveaway Banner */}
          <div className="w-full h-full flex-shrink-0">
            <GiveawayBanner />
          </div>
        </div>
      </div>
      
      {/* Indicator dots */}
      <div className="flex justify-center gap-2 mt-3">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSlide === index 
                ? 'bg-amber-500 w-4' 
                : 'bg-amber-500/30 hover:bg-amber-500/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

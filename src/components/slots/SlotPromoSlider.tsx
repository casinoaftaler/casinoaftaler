import { SlotCasinoCard } from "./SlotCasinoCard";
import type { Casino } from "@/hooks/useCasinos";

interface SlotPromoSliderProps {
  casino: Casino;
  backgroundImage: string;
}

export function SlotPromoSlider({ casino, backgroundImage }: SlotPromoSliderProps) {
  return (
    <div className="w-full animate-fade-in">
      <div className="overflow-hidden rounded-xl aspect-[3/4] border border-amber-500/20 shadow-[0_0_20px_rgba(251,191,36,0.08)]">
        <SlotCasinoCard casino={casino} backgroundImage={backgroundImage} />
      </div>
    </div>
  );
}

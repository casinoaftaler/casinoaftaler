import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton loading state that matches the slot machine layout.
 * Shows 5 reel columns with 3 symbols each, plus control panel skeleton.
 */
export function SlotGameSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Slot frame skeleton */}
      <div className="relative p-4 sm:p-6 md:p-8 rounded-xl bg-gradient-to-b from-amber-900/40 via-stone-900/60 to-amber-950/40 border-2 border-amber-600/30">
        {/* Reels container skeleton */}
        <div className="flex gap-1 xs:gap-1.5 sm:gap-2 md:gap-3">
          {[0, 1, 2, 3, 4].map((col) => (
            <div key={col} className="flex flex-col gap-1 xs:gap-1.5 sm:gap-2 md:gap-3">
              {[0, 1, 2].map((row) => (
                <Skeleton
                  key={`${col}-${row}`}
                  className="w-[61px] h-[61px] xs:w-[71px] xs:h-[71px] sm:w-[92px] sm:h-[92px] md:w-[109px] md:h-[109px] lg:w-[133px] lg:h-[133px] xl:w-[150px] xl:h-[150px] rounded-lg bg-amber-950/50"
                />
              ))}
            </div>
          ))}
        </div>
        
        {/* Control panel skeleton */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <Skeleton className="h-10 w-24 rounded-lg bg-amber-950/50" />
          <Skeleton className="h-14 w-14 rounded-full bg-amber-950/50" />
          <Skeleton className="h-10 w-24 rounded-lg bg-amber-950/50" />
        </div>
      </div>
    </div>
  );
}

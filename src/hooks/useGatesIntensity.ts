import { useMemo } from "react";

export type IntensityState = 'idle' | 'spin' | 'win' | 'climax';
export type BonusIntensityTier = 'low' | 'mid' | 'high' | 'extreme';

interface UseGatesIntensityParams {
  tumblePhase: 'idle' | 'spinning' | 'showing-wins' | 'tumbling';
  tumbleChainLength: number;
  winAmount: number;
  bet: number;
  isBonusActive?: boolean;
  cumulativeMultiplier?: number;
}

interface UseGatesIntensityResult {
  intensityState: IntensityState;
  chainLevel: number;
  bonusIntensityTier: BonusIntensityTier;
}

export function useGatesIntensity({
  tumblePhase,
  tumbleChainLength,
  winAmount,
  bet,
  isBonusActive = false,
  cumulativeMultiplier = 0,
}: UseGatesIntensityParams): UseGatesIntensityResult {
  const intensityState: IntensityState = useMemo(() => {
    if (isBonusActive) {
      // Bonus mode: intensity floor is 'win', never drops to 'idle'
      if (tumblePhase === 'idle') return 'win'; // floor
      if (tumblePhase === 'spinning') return 'spin';

      // showing-wins or tumbling — climax triggers earlier in bonus
      if (tumbleChainLength >= 2 || winAmount >= bet * 10) return 'climax';
      if (tumbleChainLength >= 1) return 'win';

      return 'spin';
    }

    // Base game
    if (tumblePhase === 'idle') return 'idle';
    if (tumblePhase === 'spinning') return 'spin';

    if (tumbleChainLength >= 3 || winAmount >= bet * 20) return 'climax';
    if (tumbleChainLength >= 1) return 'win';

    return 'spin';
  }, [tumblePhase, tumbleChainLength, winAmount, bet, isBonusActive]);

  const bonusIntensityTier: BonusIntensityTier = useMemo(() => {
    if (cumulativeMultiplier >= 51) return 'extreme';
    if (cumulativeMultiplier >= 26) return 'high';
    if (cumulativeMultiplier >= 11) return 'mid';
    return 'low';
  }, [cumulativeMultiplier]);

  return { intensityState, chainLevel: tumbleChainLength, bonusIntensityTier };
}

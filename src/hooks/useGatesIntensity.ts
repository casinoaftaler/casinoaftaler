import { useMemo } from "react";

export type IntensityState = 'idle' | 'spin' | 'win' | 'climax';

interface UseGatesIntensityParams {
  tumblePhase: 'idle' | 'spinning' | 'showing-wins' | 'tumbling';
  tumbleChainLength: number;
  winAmount: number;
  bet: number;
}

interface UseGatesIntensityResult {
  intensityState: IntensityState;
  chainLevel: number;
}

export function useGatesIntensity({
  tumblePhase,
  tumbleChainLength,
  winAmount,
  bet,
}: UseGatesIntensityParams): UseGatesIntensityResult {
  const intensityState: IntensityState = useMemo(() => {
    if (tumblePhase === 'idle') return 'idle';
    if (tumblePhase === 'spinning') return 'spin';

    // showing-wins or tumbling
    if (tumbleChainLength >= 3 || winAmount >= bet * 20) return 'climax';
    if (tumbleChainLength >= 1) return 'win';

    return 'spin';
  }, [tumblePhase, tumbleChainLength, winAmount, bet]);

  return { intensityState, chainLevel: tumbleChainLength };
}

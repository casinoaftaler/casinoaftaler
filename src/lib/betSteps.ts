export function getNextBet(current: number, max: number): number {
  const step = current >= 20 ? 5 : current >= 10 ? 2 : 1;
  return Math.min(current + step, max);
}

export function getPrevBet(current: number, min: number): number {
  const step = current > 20 ? 5 : current > 10 ? 2 : 1;
  return Math.max(current - step, min);
}

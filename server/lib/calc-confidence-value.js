const aoMintFromBridgedPreTrade = (21_000_000 * 0.15) * 0.64

// June 18 2024
const preTradeStartTime = new Date(2024, 5, 18).getTime();
// Feb 1 2025
export const preTradeEndTime = new Date(2025, 1, 1).getTime();

export function calculateConfidence({ bridgedTimeValue, aoBalance, now }) {
  const proportionTimeElapsedClamped = Math.min(1, Math.max(0, (now - preTradeStartTime) / (preTradeEndTime - preTradeStartTime)));
  const aoMintedFromBridgedAssets = (aoMintFromBridgedPreTrade * proportionTimeElapsedClamped)

  const proportionateAoBalance = aoBalance / aoMintedFromBridgedAssets;
  const proportionateBridgedTimeValue = bridgedTimeValue * proportionateAoBalance;

  return proportionateBridgedTimeValue;
}

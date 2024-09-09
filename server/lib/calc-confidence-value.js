const aoFullyDilutedTokenSupply = 21_000_000;
const aoFromArPreBridgedAssets = aoFullyDilutedTokenSupply * 0.0277; // TODO: Confirm this constant

export function calculateConfidence({ bridgedTimeValue, aoTokenSupply, aoBalance }) {
  const aoToDateFromBridgedAssets = (aoTokenSupply - aoFromArPreBridgedAssets) * 0.666;

  const proportionateAoBalance = aoBalance / aoToDateFromBridgedAssets;
  const proportionateBridgedTimeValue = bridgedTimeValue * proportionateAoBalance;

  return proportionateBridgedTimeValue;
}

const aoMintFromStethPreTrade = (21_000_000 / 10) * 0.66

export function calculateConfidence({ stethTimeValue, aoBalance }) {
  const proportionateAoBalance = aoBalance / aoMintFromStethPreTrade;
  const proportionateStethTimeValue = stethTimeValue * proportionateAoBalance;

  return proportionateStethTimeValue;
}

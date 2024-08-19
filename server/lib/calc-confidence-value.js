// constants
const ARMSTRONG_MULTIPLIER = 1_000_000_000_000; // 10^12 -- 1 Trillion
const AO_PRICE = 50;

export function calculate({ balance }) {
  // calculateConfidenceValue.js
  const confidenceValue = (balance / ARMSTRONG_MULTIPLIER) * AO_PRICE;
  return confidenceValue;
}

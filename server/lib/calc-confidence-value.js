// constants
const ARMSTRONG_MULTIPLIER = 21_000_000;
const AO_PRICE = 50;

export function calculate({ balance }) {
  // calculateConfidenceValue.js
  const confidenceValue = (balance / ARMSTRONG_MULTIPLIER) * AO_PRICE;
  return confidenceValue;
}

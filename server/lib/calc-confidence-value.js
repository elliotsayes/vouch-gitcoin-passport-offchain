const minScore = 10;
const scoreMultiplier = 0.1;

export function calculateConfidence(passportResponse) {
  if (!passportResponse || passportResponse.status !== "DONE") {
    throw new Error('Invalid passport response')
  }

  const score = parseFloat(passportResponse.score)

  if (isNaN(score)) {
    throw new Error('Invalid score')
  }

  if (score < minScore) {
    return 0
  }

  return score * scoreMultiplier;
}

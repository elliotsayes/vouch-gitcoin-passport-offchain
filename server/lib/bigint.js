export const bigintDivide = (a, b, precisionTruncation = 0) => {
  const truncation = (BigInt(precisionTruncation) ** BigInt(10))
  return Number(BigInt(a) / truncation) / Number(BigInt(b) / truncation)
}
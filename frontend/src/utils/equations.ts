export function getRoundedRating(
  ratingSum: number,
  numberOfReviewers: number
): number {
  if (numberOfReviewers === 0) return 0;
  const rawAverage = ratingSum / numberOfReviewers;
  return Math.round(rawAverage * 2) / 2;
}

export default function calculateWpm(
  typed: string,
  sentence: string,
  startTime: number,
) {
  if (typed.length === 0) return 0;

  const correctChars = typed
    .split("")
    .filter((char, i) => char === sentence[i]).length;

  const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;

  return Math.round(correctChars / 5 / elapsedMinutes);
}

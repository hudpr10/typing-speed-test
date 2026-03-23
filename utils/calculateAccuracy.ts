export default function calculateAccuracy(typed: string, sentence: string) {
  if (typed.length === 0) return 100;

  const correctChars = typed
    .split("")
    .filter((char, i) => char === sentence[i]).length;

  return Math.round((correctChars * 100) / typed.length);
}

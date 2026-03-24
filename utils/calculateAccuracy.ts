import getCorrectAndWrongChars from "./getCorrectAndWrongChars";

export default function calculateAccuracy(typed: string, sentence: string) {
  if (typed.length === 0) return 100;

  const correctChars = getCorrectAndWrongChars(typed, sentence).correct;
  return Math.round((correctChars * 100) / typed.length);
}

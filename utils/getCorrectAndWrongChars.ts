export default function getCorrectAndWrongChars(
  typed: string,
  sentence: string,
): { correct: number; wrong: number; notTyped: number } {
  const chars = {
    correct: 0,
    wrong: 0,
    notTyped: 0,
  };

  for (let i = 0; i < sentence.length; i++) {
    if (i >= typed.length) {
      chars.notTyped++;
    } else if (sentence[i] === typed[i]) {
      chars.correct++;
    } else {
      chars.wrong++;
    }
  }

  if (typed.length > sentence.length) {
    chars.wrong += typed.length - sentence.length;
  }

  return chars;
}

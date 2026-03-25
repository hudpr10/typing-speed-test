import ResultCard from "@/components/ui/ResultCard";
import { useGame } from "@/context/GameContext";
import getCorrectAndWrongChars from "@/utils/getCorrectAndWrongChars";

export default function ResultDetails() {
  const { stats, typed, sentence } = useGame();
  const { correct, wrong } = getCorrectAndWrongChars(typed, sentence);

  return (
    <ul className="flex gap-4 my-8">
      <ResultCard label="PPM" value={stats.wpm.toString()} style="wpm" />
      <ResultCard
        label="Precisão"
        value={`${stats.accuracy}%`}
        style="accuracy"
      />
      <ResultCard
        label="Caracteres"
        value={`${correct}/${wrong}`}
        style="characters"
      />
    </ul>
  );
}

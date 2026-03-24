import Button from "@/components/ui/Button";
import Completed from "@/components/ui/icons/Completed";
import Restart from "@/components/ui/icons/Restart";
import ResultCard from "@/components/ui/ResultCard";
import { useGame } from "@/context/GameContext";

export default function Result() {
  const { wpm, accuracy, typed, sentence } = useGame();

  function getCorrectAndWrongChars(typed: string, sentence: string) {
    const chars = {
      correct: 0,
      wrong: 0,
    };

    for (let i = 0; i < sentence.length; i++) {
      if (sentence[i] === typed[i]) {
        chars.correct++;
      } else {
        chars.wrong++;
      }
    }

    return chars;
  }

  return (
    <div className="flex flex-col items-center">
      <Completed />
      <div className="text-center mt-4">
        <h2 className="text-3xl font-bold">Referência Estabelecida</h2>
        <p className="text-sm text-gray-400">
          Você definiu sua base. Agora começa o verdadeiro desafio - é hora de
          se superar.
        </p>
      </div>

      <ul className="flex gap-4 mt-8">
        <ResultCard label="PPM" value={wpm.toString()} style="wpm" />
        <ResultCard
          label="Precisão"
          value={`${accuracy.toString()}%`}
          style="accuracy"
        />
        <ResultCard label="Caracteres" value="120/5" style="characters" />
      </ul>

      <Button handleClick={() => {}} style="secondary">
        Tentar Novamente <Restart />
      </Button>
    </div>
  );
}

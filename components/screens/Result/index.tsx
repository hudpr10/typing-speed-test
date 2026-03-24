import Button from "@/components/ui/Button";
import Completed from "@/components/ui/icons/Completed";
import Restart from "@/components/ui/icons/Restart";
import ResultCard from "@/components/ui/ResultCard";
import { useGame } from "@/context/GameContext";
import getCorrectAndWrongChars from "@/utils/getCorrectAndWrongChars";

export default function Result() {
  const { stats, typed, sentence, resetGame } = useGame();
  const { correct, wrong } = getCorrectAndWrongChars(typed, sentence);

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

      <Button handleClick={resetGame} style="secondary">
        Tentar Novamente <Restart fill="#000" />
      </Button>
    </div>
  );
}

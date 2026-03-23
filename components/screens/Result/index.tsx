import Button from "@/components/ui/Button";
import Completed from "@/components/ui/icons/Completed";
import Restart from "@/components/ui/icons/Restart";
import ResultCard from "@/components/ui/ResultCard";

export default function Result() {
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
        <ResultCard label="PPM" value="92" style="wpm" />
        <ResultCard label="Precisão" value="90%" style="accuracy" />
        <ResultCard label="Caracteres" value="120/5" style="characters" />
      </ul>

      <Button handleClick={() => {}} style="secondary">
        Tentar Novamente <Restart />
      </Button>
    </div>
  );
}

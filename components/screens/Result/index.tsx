import Button from "@/components/ui/Button";
import Restart from "@/components/ui/icons/Restart";
import ResultHero from "@/components/screens/Result/ResultHero";
import { useGame } from "@/context/GameContext";
import ResultDetails from "./ResultDetails";

export default function Result() {
  const { resetGame } = useGame();

  return (
    <div className="flex flex-col items-center">
      <ResultHero />
      <ResultDetails />

      <Button handleClick={resetGame} style="secondary">
        Tentar Novamente <Restart fill="#000" />
      </Button>
    </div>
  );
}

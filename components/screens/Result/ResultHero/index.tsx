import { useGame } from "@/context/GameContext";
import Completed from "../../../ui/icons/Completed";
import Confetti from "../../../ui/icons/Confetti";
import Star1 from "../../../ui/icons/Star1";
import Star2 from "../../../ui/icons/Star2";
import { useWindowSize } from "react-use";
import ReactConfetti from "react-confetti";

export default function ResultHero() {
  const { finishType } = useGame();
  const { width, height } = useWindowSize();

  const text = () => {
    switch (finishType) {
      case "first":
        return {
          icon: <Completed />,
          h2: "Referência Estabelecida!",
          p: "Você definiu sua base. Agora começa o verdadeiro desafio - é hora de se superar.",
        };
      case "normal":
        return {
          icon: <Completed />,
          h2: "Teste Completo!",
          p: "Boa velocidade. Continue tentando para bater seu recorde.",
        };
      case "record":
        return {
          icon: <Confetti />,
          h2: "Novo Recorde!!!",
          p: "Você está ficando mais rápido. A digitação foi incrível.",
        };
      default:
        return {
          icon: <Completed />,
          h2: "Teste Completo!",
          p: "Boa velocidade. Continue tentando para bater seu recorde.",
        };
    }
  };

  return (
    <>
      {text().icon}
      <div className="text-center mt-4">
        <h2 className="text-3xl font-bold">{text().h2}</h2>
        <p className="text-sm text-gray-400">{text().p}</p>
      </div>

      {finishType !== "record" && (
        <>
          <div className="absolute right-32 bottom-50">
            <Star1 />
          </div>
          <div className="absolute left-24 top-40">
            <Star2 />
          </div>
        </>
      )}

      {finishType === "record" && (
        <ReactConfetti
          width={width}
          height={height}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            pointerEvents: "none",
          }}
          numberOfPieces={200}
          recycle={true}
          gravity={0.15}
        />
      )}
    </>
  );
}

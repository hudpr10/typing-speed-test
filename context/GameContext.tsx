"use client";
import { Difficulty, GameMode } from "@/types/game";
import calculateAccuracy from "@/utils/calculateAccuracy";
import calculateWpm from "@/utils/calculateWPM";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type GameStats = {
  wpm: number;
  accuracy: number;
  isFinished: boolean;
};

type FinishType = "first" | "record" | "normal" | null;

type GameContextType = {
  sentence: string;
  stats: GameStats;
  typed: string;
  setTyped: (typed: string) => void;
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
  gameMode: GameMode;
  changeGameMode: (mode: GameMode) => void;
  timeLeft: number;
  isRunning: boolean;
  record: number;
  finishType: FinishType;

  startGame: () => void;
  resetGame: () => void;
};

const GameContext = createContext({} as GameContextType);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const sentence =
    "As amostras de vírus que teriam sido furtadas do laboratório de virologia da Unicamp foram retiradas de uma área de nível 3 de biossegurança (NB-3), que exige protocolos rigorosos e é, atualmente, o nível mais alto possível para se estudar agentes infecciosos (como vírus e bactérias) em laboratórios no Brasil.";

  const [stats, setStats] = useState<GameStats>({
    wpm: 0,
    accuracy: 100,
    isFinished: false,
  });

  const [typed, setTyped] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [gameMode, setGameMode] = useState<GameMode>("time");

  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  const [finishType, setFinishType] = useState<FinishType>(null);
  const [record, setRecord] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  function startGame() {
    if (!isRunning) setIsRunning(true);
    setStartTime(Date.now());
  }

  const finishGame = useCallback(() => {
    setIsRunning(false);
    setStats((prev) => ({ ...prev, isFinished: true }));
  }, []);

  function resetGame() {
    setIsRunning(false);
    setTimeLeft(60);
    setStartTime(null);
    setTyped("");
    setStats({ wpm: 0, accuracy: 0, isFinished: false });
  }

  function changeGameMode(mode: GameMode) {
    setGameMode(mode);
    if (mode === "sentence") setTimeLeft(0);
    if (mode === "time") setTimeLeft(60);
  }

  // Referente ao tempo decorrido
  useEffect(() => {
    if (!isRunning || !startTime) return;

    const interval = setInterval(() => {
      if (timeLeft - 1 === 0) {
        finishGame();
        return;
      }

      if (gameMode === "sentence") setTimeLeft((prev) => prev + 1);
      if (gameMode === "time") setTimeLeft((prev) => prev - 1);

      setStats((prev) => ({
        ...prev,
        wpm: calculateWpm(typed, sentence, startTime),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, startTime, finishGame, typed, sentence, gameMode]);

  // Referente a atualizar variáveis, precisão, PPM e se o jogo foi finalizado
  useEffect(() => {
    const newWpm = startTime ? calculateWpm(typed, sentence, startTime) : 0;
    const finished = typed.length === sentence.length;

    setStats((prev) => ({
      ...prev,
      accuracy: calculateAccuracy(typed, sentence),
      wpm: newWpm,
      isFinished: finished,
    }));

    if (finished) setIsRunning(false);
  }, [typed, sentence, startTime]);

  // Corrige o record para quando a pagina carregar
  useEffect(() => {
    const storage = localStorage.getItem("highScore") ?? -1;
    setRecord(Number(storage));
    setIsMounted(true);
  }, []);

  // Atualizar Record
  useEffect(() => {
    if (!stats.isFinished || !isMounted) {
      setFinishType(null);
      return;
    }

    if (record === -1) {
      setFinishType("first");
      setRecord(stats.wpm);
      localStorage.setItem("highScore", stats.wpm.toString());
    } else if (stats.wpm > record) {
      setFinishType("record");
      setRecord(stats.wpm);
      localStorage.setItem("highScore", stats.wpm.toString());
    } else {
      setFinishType("normal");
    }
  }, [stats.isFinished, isMounted]);

  return (
    <GameContext.Provider
      value={{
        sentence,
        stats,
        typed,
        setTyped,
        difficulty,
        setDifficulty,
        gameMode,
        changeGameMode,
        timeLeft,
        startGame,
        resetGame,
        isRunning,
        record,
        finishType,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);

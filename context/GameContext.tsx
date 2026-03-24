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

type GameContextType = {
  sentence: string;
  stats: GameStats;
  typed: string;
  setTyped: (typed: string) => void;
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
  gameMode: GameMode;
  setGameMode: (value: GameMode) => void;
  timeLeft: number;
  isRunning: boolean;
  record: number;

  startGame: () => void;
  resetGame: () => void;
};

const GameContext = createContext({} as GameContextType);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const sentence = "Fim.";

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

  const [record, setRecord] = useState<number>(() => {
    const storage = localStorage.getItem("record") ?? -1;
    return Number(storage);
  });

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

  // Referente ao tempo decorrido
  useEffect(() => {
    if (!isRunning || !startTime) return;

    const interval = setInterval(() => {
      if (timeLeft - 1 === 0) {
        finishGame();
        return;
      }

      setTimeLeft((prev) => prev - 1);
      setStats((prev) => ({
        ...prev,
        wpm: calculateWpm(typed, sentence, startTime),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, startTime, finishGame, typed, sentence]);

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

  useEffect(() => {
    if (!stats.isFinished) return;

    if (stats.wpm > record) {
      setRecord(stats.wpm);
      localStorage.setItem("record", stats.wpm.toString());
    }
  }, [stats, record]);

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
        setGameMode,
        timeLeft,
        startGame,
        resetGame,
        isRunning,
        record,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);

"use client";
import { Difficulty, GameMode } from "@/types/game";
import calculateAccuracy from "@/utils/calculateAccuracy";
import calculateWpm from "@/utils/calculateWPM";
import React, { createContext, useContext, useEffect, useState } from "react";

type GameContextType = {
  sentence: string;
  wpm: number;
  setWpm: (wpm: number) => void;
  accuracy: number;
  setAccuracy: (accuracy: number) => void;
  typed: string;
  setTyped: (typed: string) => void;
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
  gameMode: GameMode;
  setGameMode: (value: GameMode) => void;
  timeLeft: number;
  isRunning: boolean;
  isFinished: boolean;

  startGame: () => void;
  resetGame: () => void;
};

const GameContext = createContext({} as GameContextType);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const sentence = "Fim.";

  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [typed, setTyped] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [gameMode, setGameMode] = useState<GameMode>("time");
  const [isFinished, setIsFinhised] = useState<boolean>(false);

  // Tempo
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setAccuracy(calculateAccuracy(typed, sentence));
    if (startTime) setWpm(calculateWpm(typed, sentence, startTime));
    if (typed.length === sentence.length) finishGame();
  }, [typed]);

  useEffect(() => {
    if (!isRunning || !startTime) return;

    if (timeLeft === 0) {
      finishGame();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      setWpm(calculateWpm(typed, sentence, startTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, startTime]);

  function startGame() {
    if (!isRunning) setIsRunning(true);
    setStartTime(Date.now());
  }

  function resetGame() {
    finishGame();
    setTimeLeft(60);
    setStartTime(null);
    setTyped("");
    setWpm(0);
  }

  function finishGame() {
    setIsRunning(false);
    setIsFinhised(true);
  }

  return (
    <GameContext.Provider
      value={{
        sentence,
        wpm,
        setWpm,
        accuracy,
        setAccuracy,
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
        isFinished,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);

"use client";
import Result from "@/components/screens/Result";
import TypingContainer from "@/components/screens/TypingContainer/intex";
import { useGame } from "@/context/GameContext";

export default function Home() {
  const { isFinished } = useGame();

  if (isFinished) return <Result />;
  return <TypingContainer />;
}

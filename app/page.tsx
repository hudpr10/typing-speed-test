"use client";
import Result from "@/components/screens/Result";
import TypingContainer from "@/components/screens/TypingContainer/intex";
import { useGame } from "@/context/GameContext";

export default function Home() {
  const { stats } = useGame();

  if (stats.isFinished) return <Result />;
  return <TypingContainer />;
}

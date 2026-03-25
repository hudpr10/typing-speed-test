"use client";
import Button from "@/components/ui/Button";
import Restart from "@/components/ui/icons/Restart";
import { useGame } from "@/context/GameContext";
import { useEffect, useRef } from "react";

export default function TypingField() {
  const { sentence, typed, setTyped, startGame, resetGame, isRunning } =
    useGame();

  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTyped(e.target.value);
  }

  function startOnClick() {
    inputRef.current?.focus();
    startGame();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const blockedKeys = [
      "ArrowRight",
      "ArrowLeft",
      "ArrowUp",
      "ArrowDown",
      "End",
      "Home",
    ];

    if (blockedKeys.includes(e.key)) {
      e.preventDefault();
    }
  }

  function handleSelect(e: React.SyntheticEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    input.setSelectionRange(input.value.length, input.value.length);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isRunning) {
        e.preventDefault();
        startGame();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, startGame]);

  return (
    <div>
      <input
        className="sr-only"
        autoFocus
        ref={inputRef}
        value={typed}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onSelect={handleSelect}
      />

      <div className="mt-4 border-y border-gray-400 py-8 text-4xl relative">
        {sentence.split("").map((char, i) => {
          let color = "text-gray-400";

          if (i < typed.length) {
            color =
              typed[i] === char ? "text-green-500" : "text-red-500 underline";
          }

          if (typed.length === i) {
            color = "bg-gray-700 text-gray-400";
          }

          return (
            <span key={i} className={color}>
              {char}
            </span>
          );
        })}

        {!isRunning && (
          <div className="absolute inset-0 backdrop-blur-sm bg-background/80 flex items-center justify-center flex-col">
            <Button handleClick={startOnClick}>Começar Typing Text</Button>
            <span className="text-base mt-2">
              ou pressione &quot;Espaço&quot; para começar
            </span>
          </div>
        )}
      </div>

      {isRunning && (
        <div className="flex justify-center mt-4">
          <Button handleClick={resetGame} style="ghost">
            Recomeçar <Restart fill="#fff" />
          </Button>
        </div>
      )}
    </div>
  );
}

"use client";
import InputRadio from "@/components/ui/InputRadio";
import { difficultyArr, gameModeArr } from "@/constants/game";
import { useGame } from "@/context/GameContext";
import { Difficulty, GameMode } from "@/types/game";
import timeFormat from "@/utils/timeFormat";

export default function TypingLabel() {
  const { stats, setDifficulty, gameMode, setGameMode, timeLeft } = useGame();

  return (
    <div className="flex items-center justify-between">
      <ul className="flex divide-x divide-gray-400 gap-4">
        <li className="pr-4">
          <p className="text-gray-400">
            PPM: <strong className="text-white">{stats.wpm}</strong>
          </p>
        </li>
        <li className="pr-4">
          <p className="text-gray-400">
            Precisão: <strong className="text-white">{stats.accuracy}%</strong>
          </p>
        </li>
        {gameMode === "time" && (
          <li>
            <p className="text-gray-400">
              Tempo:{" "}
              <strong
                className={timeLeft <= 10 ? "text-red-500" : "text-white"}
              >
                {timeFormat(timeLeft)}
              </strong>
            </p>
          </li>
        )}
      </ul>

      <div className="flex gap-4 divide-x divide-gray-400">
        <section className="flex items-center gap-2 pr-4">
          <p className="text-gray-400 text-sm">Dificuldade: </p>
          <ul className="flex gap-2">
            {difficultyArr.map(({ id, label, isDefault }) => (
              <li key={id}>
                <InputRadio
                  id={id}
                  name="difficulty"
                  label={label}
                  handleChange={(e) => setDifficulty(e.target.id as Difficulty)}
                  isDefault={isDefault}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="flex items-center gap-2">
          <p className="text-gray-400 text-sm">Modo: </p>
          <ul className="flex gap-2">
            {gameModeArr.map(({ id, label, isDefault }) => (
              <li key={id}>
                <InputRadio
                  id={id}
                  name="mode"
                  label={label}
                  handleChange={(e) => setGameMode(e.target.id as GameMode)}
                  isDefault={isDefault}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

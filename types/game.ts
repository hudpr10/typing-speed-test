import { difficultyArr, gameModeArr } from "@/constants/game";

export type Difficulty = (typeof difficultyArr)[number]["id"];
export type GameMode = (typeof gameModeArr)[number]["id"];

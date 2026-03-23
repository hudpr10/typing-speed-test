export const difficultyArr = [
  { id: "easy", label: "Fácil", isDefault: true },
  { id: "medium", label: "Médio", isDefault: false },
  { id: "hard", label: "Difícil", isDefault: false },
] as const;

export const gameModeArr = [
  { id: "time", label: "60 segundos", isDefault: true },
  { id: "sentence", label: "Texto", isDefault: false },
] as const;

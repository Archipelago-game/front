import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import type { DiceRollRequest, DiceRollResultCallback } from "./types.ts";

interface DiceRollBlockProps {
  diceRequest: DiceRollRequest;
  onDiceResult: DiceRollResultCallback;
  disabled?: boolean;
}

function rollDice(sides: number, count: number): number[] {
  return Array.from(
    { length: count },
    () => Math.floor(Math.random() * sides) + 1,
  );
}

export default function DiceRollBlock({
  diceRequest,
  onDiceResult,
  disabled = false,
}: DiceRollBlockProps) {
  const [lastResult, setLastResult] = useState<number[] | null>(null);
  const { sides, count } = diceRequest;

  const handleRoll = () => {
    const values = rollDice(sides, count);
    setLastResult(values);
    onDiceResult(values);
  };

  const isValid = count >= 1 && sides >= 2;
  if (!isValid) return null;

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Button
        variant="outlined"
        onClick={handleRoll}
        disabled={disabled || lastResult !== null}
      >
        Бросить кубики
      </Button>
      {lastResult !== null && (
        <Typography sx={{ mt: 1 }}>
          Результат:{" "}
          {lastResult.length === 1 ? lastResult[0] : lastResult.join(", ")}
        </Typography>
      )}
    </Box>
  );
}

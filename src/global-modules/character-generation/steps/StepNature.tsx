import { useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { mapRace } from "../../../modules/game-form/consts/map-race.const.ts";
import type { Race } from "../../../modules/game-form/types/form/form.type.ts";
import DiceRollBlock from "../DiceRollBlock.tsx";
import type {
  DiceRollRequest,
  DiceRollResultCallback,
  GenerationStepComponentProps,
} from "../types.ts";

function getRaceByD20(value: number): Race {
  if (value === 4) return "immortal";
  if (value === 11) return "cat";
  return "human";
}

const RACES: Race[] = ["human", "immortal", "cat"];

// todo перенести спинер на isSubmitting в GenerationWizard

export default function StepNature({
  characterData,
  isSubmitting = false,
  currentValue,
  setCurrentSelectValue,
}: GenerationStepComponentProps) {
  // todo удалить
  console.log(isSubmitting);

  useEffect(() => {
    setCurrentSelectValue({ race: characterData?.race ?? "human" });
  }, []);

  const diceRequest: DiceRollRequest = { sides: 20, count: 1 };
  const handleDiceResult: DiceRollResultCallback = (values) => {
    const race = getRaceByD20(values[0]);
    setCurrentSelectValue({ race });
  };

  return (
    <Box>
      <Typography variant="h6">Выберите природу персонажа</Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2, mb: 2 }}>
        {RACES.map((race) => (
          <Button
            key={race}
            variant={currentValue?.race === race ? "contained" : "outlined"}
            onClick={() => setCurrentSelectValue({ race })}
          >
            {mapRace[race]}
          </Button>
        ))}
      </Box>
      <DiceRollBlock
        diceRequest={diceRequest}
        onDiceResult={handleDiceResult}
      />
    </Box>
  );
}

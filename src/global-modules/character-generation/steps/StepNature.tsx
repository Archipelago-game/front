import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { mapRace } from "../../../modules/game-form/consts/map-race.const.ts";
import type { Race } from "../../../modules/game-form/types/form/form.type.ts";
import DiceRollBlock from "../DiceRollBlock.tsx";
import type {
  DiceRollRequest,
  DiceRollResultCallback,
  GenerationStepPayload,
} from "../types.ts";
import StepLayout from "../../../pages/CharacterGenerationPage/StepLayout.tsx";

function getRaceByD20(value: number): Race {
  if (value === 4) return "immortal";
  if (value === 11) return "cat";
  return "human";
}

interface StepNatureProps {
  characterData?: { race?: Race };
  onComplete?: (payload?: GenerationStepPayload) => void;
  isSubmitting?: boolean;
}

const RACES: Race[] = ["human", "immortal", "cat"];

export default function StepNature({
  characterData,
  onComplete,
  isSubmitting = false,
}: StepNatureProps) {
  const [selected, setSelected] = useState<Race>(
    characterData?.race ?? "human",
  );

  const handleNext = () => {
    onComplete?.({ race: selected });
  };

  const diceRequest: DiceRollRequest = { sides: 20, count: 1 };
  const handleDiceResult: DiceRollResultCallback = (values) => {
    const race = getRaceByD20(values[0]);
    setSelected(race);
  };

  return (
    <StepLayout backward={() => {}} forward={handleNext}>
      <Box>
        <Typography variant="h6">Выберите природу персонажа</Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2, mb: 2 }}>
          {RACES.map((race) => (
            <Button
              key={race}
              variant={selected === race ? "contained" : "outlined"}
              onClick={() => setSelected(race)}
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
    </StepLayout>
  );
}

import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { mapRace } from "../../../modules/game-form/consts/map-race.const.ts";
import type { Race } from "../../../modules/game-form/types/form/form.type.ts";
import type { GenerationStepPayload } from "../types.ts";

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

  return (
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
      <Button variant="contained" onClick={handleNext} disabled={isSubmitting}>
        Далее
      </Button>
    </Box>
  );
}

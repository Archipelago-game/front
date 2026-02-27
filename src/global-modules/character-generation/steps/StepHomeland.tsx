import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import DiceRollBlock from "../DiceRollBlock.tsx";
import type {
  DiceRollRequest,
  DiceRollResultCallback,
  GenerationStepComponentProps,
} from "../types.ts";
import {
  HOMELAND_OPTIONS,
  CAT_HOMELAND_OPTION,
  getHomelandByD20,
  type HomelandOption,
} from "../consts/homeland-options.const.ts";

function getVisibleOptions(race?: string): HomelandOption[] {
  if (race === "cat") return [CAT_HOMELAND_OPTION, ...HOMELAND_OPTIONS];
  return HOMELAND_OPTIONS;
}

function getInitialHomeland(characterData?: {
  race?: string;
  homeland?: string;
}): HomelandOption | null {
  const options = getVisibleOptions(characterData?.race);
  if (characterData?.race === "cat" && !characterData?.homeland)
    return CAT_HOMELAND_OPTION;
  if (!characterData?.homeland) return null;
  return options.find((o) => o.displayName === characterData.homeland) ?? null;
}

export default function StepHomeland({
  characterData,
  onComplete,
  isSubmitting = false,
}: GenerationStepComponentProps) {
  const isCat = characterData?.race === "cat";
  const visibleOptions = getVisibleOptions(characterData?.race);
  const [selected, setSelected] = useState<HomelandOption | null>(
    () => getInitialHomeland(characterData) ?? null,
  );

  const handleNext = () => {
    if (selected)
      onComplete?.({
        homeland: selected.displayName,
        languages: selected.language,
      });
  };

  const diceRequest: DiceRollRequest = { sides: 20, count: 1 };
  const handleDiceResult: DiceRollResultCallback = (values) => {
    const id = getHomelandByD20(values[0]);
    const option = visibleOptions.find((o) => o.id === id);
    if (option) setSelected(option);
  };

  return (
    <Box>
      <Typography variant="h6">Родина</Typography>
      {isCat && (
        <Typography sx={{ mt: 1, mb: 1 }} color="text.secondary">
          Кошки родом с Островов Кошек. Вы можете выбрать родину для бэкстори;
          талант родины при этом не добавляется.
        </Typography>
      )}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2, mb: 2 }}>
        {visibleOptions.map((opt) => (
          <Button
            key={opt.id}
            variant={selected?.id === opt.id ? "contained" : "outlined"}
            onClick={() => setSelected(opt)}
          >
            {opt.displayName}
          </Button>
        ))}
      </Box>
      <DiceRollBlock
        diceRequest={diceRequest}
        onDiceResult={handleDiceResult}
        disabled={isSubmitting}
      />
      <Button
        variant="contained"
        onClick={handleNext}
        disabled={isSubmitting || !selected}
      >
        Далее
      </Button>
    </Box>
  );
}

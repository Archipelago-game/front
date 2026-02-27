import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import { GENERATION_STEPS } from "./generation-steps.config.ts";
import type { FormType } from "../../modules/game-form/types/form/form.type.ts";
import type { GenerationStepPayload } from "./types.ts";

import { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface CharacterGenerationWizardProps {
  currentStepIndex: number;
  characterData?: FormType | null;
  onStepComplete: (payload?: GenerationStepPayload) => void;
  isSubmitting?: boolean;
}

export default function CharacterGenerationWizard({
  currentStepIndex,
  characterData,
  onStepComplete,
  isSubmitting = false,
}: CharacterGenerationWizardProps) {
  const [currentSelectValue, setCurrentSelectValue] =
    useState<GenerationStepPayload | null>(null);

  const step = GENERATION_STEPS[currentStepIndex];
  const StepComponent = step?.component;

  const handleForward = () => {
    if (currentSelectValue !== null) {
      onStepComplete(currentSelectValue);
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto 1fr auto",
        height: "100%",
        border: "1px solid red",
      }}
    >
      <Stepper activeStep={currentStepIndex} sx={{ mb: 3 }}>
        {GENERATION_STEPS.map((s, i) => (
          <Step key={s.id} sx={{ paddingLeft: i == 0 ? "0" : "8px" }}>
            <StepLabel sx={{ padding: 0 }}>{s.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {StepComponent && (
        <StepComponent
          characterData={characterData ?? undefined}
          onComplete={onStepComplete}
          isSubmitting={isSubmitting}
          currentValue={currentSelectValue}
          setCurrentSelectValue={setCurrentSelectValue}
        />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBlock: 1,
        }}
      >
        <Button variant="contained" onClick={() => {}}>
          <ArrowBack fontSize="small" /> Назад
        </Button>
        <Button variant="contained" onClick={handleForward}>
          Далее
          <ArrowForward />
        </Button>
      </Box>
    </Box>
  );
}

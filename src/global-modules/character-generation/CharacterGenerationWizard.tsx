import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { GENERATION_STEPS } from "./generation-steps.config.ts";
import type { FormType } from "../../modules/game-form/types/form/form.type.ts";
import type { GenerationStepPayload } from "./types.ts";

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
  const step = GENERATION_STEPS[currentStepIndex];
  const StepComponent = step?.component;

  return (
    <Box>
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
        />
      )}
    </Box>
  );
}

import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  IconButton,
} from "@mui/material";
import { GENERATION_STEPS } from "./generation-steps.config.ts";
import type { FormType } from "../../modules/game-form/types/form/form.type.ts";
import type { GenerationStepPayload } from "./types.ts";
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
  const step = GENERATION_STEPS[currentStepIndex];
  const StepComponent = step?.component;

  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto 1fr auto",
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
        />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBlock: 1,
        }}
      >
        <Button variant="contained">
          <ArrowBack fontSize="small" /> Назад
        </Button>
        <Button variant="contained">
          <ArrowForward />
          Далее
        </Button>
      </Box>
    </Box>
  );
}

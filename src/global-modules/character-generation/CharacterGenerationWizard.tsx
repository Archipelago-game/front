import { Box, Stepper, Step, StepLabel, Button, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const [currentSelectValue, setCurrentSelectValue] =
    useState<GenerationStepPayload | null>(null);

  const step = GENERATION_STEPS[currentStepIndex];

  const [context, setContext] = useState<unknown | null>(
    step.getInitialContext(),
  );

  const StepComponent = step?.component;
  const isStepValid = step?.validate?.(currentSelectValue, context) ?? true;
  console.log("isStepValid ", isStepValid);

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
      }}
    >
      <Stepper activeStep={currentStepIndex} sx={{ mb: 3 }}>
        {GENERATION_STEPS.map((s, i) => (
          <Step key={s.id} sx={{ paddingLeft: i == 0 ? "0" : "8px" }}>
            <StepLabel
              sx={{
                padding: 0,
                "& .MuiStepLabel-label": {
                  transition: "font-size .5s ease",
                },
                "& .MuiStepLabel-label.Mui-active": {
                  color: "primary.main",
                  fontSize: "1.1em",
                },
              }}
            >
              {s.title}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          overflowY: "auto",
        }}
      >
        {StepComponent && (
          <StepComponent
            characterData={characterData ?? undefined}
            onComplete={onStepComplete}
            isSubmitting={isSubmitting}
            currentValue={currentSelectValue}
            setCurrentSelectValue={setCurrentSelectValue}
            context={context}
            setContext={setContext}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBlock: 1,
          borderTop: `1px solid ${theme.palette.primary.main}`,
        }}
      >
        <Button variant="contained" onClick={() => {}}>
          <ArrowBack fontSize="small" /> Назад
        </Button>
        <Button
          disabled={isSubmitting || !isStepValid}
          variant="contained"
          onClick={handleForward}
        >
          Далее
          <ArrowForward />
        </Button>
      </Box>
    </Box>
  );
}

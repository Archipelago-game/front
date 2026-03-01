import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { GENERATION_STEPS } from "./generation-steps.config.ts";
import type { FormType } from "../../modules/game-form/types/form/form.type.ts";
import type { GenerationStepPayload } from "./types.ts";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { overflowYBaseStyles } from "../../common/styles/overflow-y-base.css.ts";

interface CharacterGenerationWizardProps {
  currentStepIndex: number;
  setCurrentStepIndex: Dispatch<SetStateAction<number>>;
  characterData?: FormType | null;
  onStepComplete: (payload?: GenerationStepPayload) => void;
  isSubmitting?: boolean;
}

export default function CharacterGenerationWizard({
  currentStepIndex,
  setCurrentStepIndex,
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

  useEffect(() => {
    setContext(step.getInitialContext());
  }, [currentStepIndex]);

  const StepComponent = step?.component;
  const isStepValid = step?.validate?.(currentSelectValue, context) ?? true;

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
          position: "relative",
          ...overflowYBaseStyles,
          overflow: isSubmitting ? "hidden" : "auto",
        }}
      >
        {isSubmitting && (
          <Box
            sx={{
              position: "absolute",
              inset: "0",
              zIndex: "10000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backdropFilter: "blur(2px)",
            }}
          >
            <CircularProgress />
          </Box>
        )}

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
        <Button
          disabled={currentStepIndex === 0}
          variant="contained"
          onClick={() =>
            setCurrentStepIndex((prev) => (prev === 0 ? 0 : prev - 1))
          }
        >
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

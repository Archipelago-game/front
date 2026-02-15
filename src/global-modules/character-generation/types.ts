import type { ComponentType } from "react";
import type { FormType } from "../../modules/game-form/types/form/form.type.ts";

export interface GenerationStepPayload {
  race?: import("../../modules/game-form/types/form/form.type.ts").Race;
}

/** Пропсы компонента шага визарда */
export interface GenerationStepComponentProps {
  characterData?: FormType;
  onComplete?: (payload?: GenerationStepPayload) => void;
  isSubmitting?: boolean;
}

/** Описание шага визарда */
export interface GenerationStep {
  id: string;
  title: string;
  component: ComponentType<GenerationStepComponentProps>;
}

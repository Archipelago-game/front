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

/** Параметры запроса броска для блока кубиков */
export interface DiceRollRequest {
  /** Число граней (d20 → 20, d6 → 6) */
  sides: number;
  /** Количество кубиков */
  count: number;
}

/** Callback результата броска: массив значений по одному на каждый кубик */
export type DiceRollResultCallback = (values: number[]) => void;

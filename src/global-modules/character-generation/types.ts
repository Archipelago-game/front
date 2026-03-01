import type { ComponentType, Dispatch, SetStateAction } from "react";
import type {
  FormType,
  MoralValue,
  Race,
} from "../../modules/game-form/types/form/form.type.ts";
import type { Stats } from "../../modules/game-form/types/form/attributes.type.ts";

export interface GenerationStepPayload {
  race?: Race;
  moralValue?: MoralValue;
  homeland?: string;
  languages?: string;
  /** Значения атрибутов (только value); ключи — ключи Stats */
  attributeValues?: Partial<Record<keyof Stats, number>>;
}

/** Пропсы компонента шага визарда */
export interface GenerationStepComponentProps {
  characterData?: FormType;
  onComplete?: (payload?: GenerationStepPayload) => void;
  isSubmitting?: boolean;
  currentValue: GenerationStepPayload | null;
  setCurrentSelectValue: Dispatch<SetStateAction<GenerationStepPayload | null>>;
  context: unknown;
  setContext: Dispatch<SetStateAction<unknown | null>>;
}

/** Описание шага визарда */
export interface GenerationStep {
  id: string;
  title: string;
  component: ComponentType<GenerationStepComponentProps>;
  validate?: (
    payload: GenerationStepPayload | null,
    context: unknown,
  ) => boolean;
  getInitialContext: () => unknown;
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

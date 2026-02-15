import type { GenerationStep } from "./types.ts";
import StepNature from "./steps/StepNature.tsx";
import StepValues from "./steps/StepValues.tsx";

export const GENERATION_STEPS: GenerationStep[] = [
  { id: "nature", title: "Природа персонажа", component: StepNature },
  { id: "values", title: "Ценности", component: StepValues },
];

import type { GenerationStep } from "./types.ts";
import StepNature from "./steps/StepNature.tsx";

export const GENERATION_STEPS: GenerationStep[] = [
  { id: "nature", title: "Природа персонажа", component: StepNature },
];

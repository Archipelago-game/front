import type { GenerationStep } from "./types.ts";
import StepNature from "./steps/StepNature.tsx";
import StepValues from "./steps/StepValues.tsx";
import StepHemland from "./steps/StepHemland.tsx";
import StepAttributes from "./steps/StepAttributes.tsx";

export const GENERATION_STEPS: GenerationStep[] = [
  { id: "nature", title: "Природа персонажа", component: StepNature },
  { id: "values", title: "Ценности", component: StepValues },
  { id: "homeland", title: "Родина", component: StepHemland },
  { id: "attributes", title: "Атрибуты", component: StepAttributes },
];

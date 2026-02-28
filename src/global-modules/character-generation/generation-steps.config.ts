import type { GenerationStep } from "./types.ts";
import StepNature from "./steps/StepNature.tsx";
import StepValues from "./steps/StepValues.tsx";
import StepHomeland from "./steps/StepHomeland.tsx";
import StepAttributes from "./steps/step-attributes/StepAttributes.tsx";
import type { StepAttributesContext } from "./steps/step-attributes/step-attributes.type.ts";
import {
  isPurchaseValid,
  isRandomValid,
  isStandardValid,
} from "./steps/step-attributes/payload-validation.util.ts";

export const GENERATION_STEPS: GenerationStep[] = [
  { id: "nature", title: "Природа персонажа", component: StepNature },
  { id: "values", title: "Ценности", component: StepValues },
  { id: "homeland", title: "Родина", component: StepHomeland },
  {
    id: "attributes",
    title: "Атрибуты",
    component: StepAttributes,
    validate: (payload, context: StepAttributesContext) => {
      if (!payload?.attributeValues) {
        return false;
      }

      switch (context.method) {
        case "purchase":
          return isPurchaseValid(payload.attributeValues);

        case "standard":
          return isStandardValid(payload.attributeValues);

        case "random":
          return isRandomValid(payload.attributeValues);
      }
    },
  },
];

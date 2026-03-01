import type { GenerationStep } from "./types.ts";
import StepNature from "./steps/StepNature.tsx";
import StepValues from "./steps/StepValues.tsx";
import StepHomeland from "./steps/StepHomeland.tsx";
import StepAttributes from "./steps/step-attributes/StepAttributes.tsx";
import type {
  DistributionMethod,
  StepAttributesContext,
} from "./steps/step-attributes/step-attributes.type.ts";
import {
  isPurchaseValid,
  isRandomValid,
  isStandardValid,
} from "./steps/step-attributes/payload-validation.util.ts";

export const GENERATION_STEPS: GenerationStep[] = [
  {
    id: "nature",
    title: "Природа персонажа",
    component: StepNature,
    getInitialContext() {
      return null;
    },
  },
  {
    id: "values",
    title: "Ценности",
    component: StepValues,
    getInitialContext() {
      return null;
    },
  },
  {
    id: "homeland",
    title: "Родина",
    component: StepHomeland,
    getInitialContext() {
      return null;
    },
  },
  {
    id: "attributes",
    title: "Атрибуты",
    component: StepAttributes,
    validate: (payload, context) => {
      if (!payload?.attributeValues) {
        return false;
      }

      if (!context) {
        return false;
      }

      const ctx = context as StepAttributesContext;

      if (!ctx?.method) {
        return false;
      }

      switch (ctx.method) {
        case "purchase":
          return isPurchaseValid(payload.attributeValues);

        case "standard":
          return isStandardValid(payload.attributeValues);

        case "random":
          return isRandomValid(payload.attributeValues);
      }
    },
    getInitialContext() {
      return { method: "standard" } as { method: DistributionMethod };
    },
  },
];

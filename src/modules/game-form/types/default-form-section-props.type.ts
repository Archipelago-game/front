import type { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import type { FormType } from "./form-values.type.ts";
import type { ChangeEvent } from "react";

export interface DefaultFormSectionProps {
  formHook: UseFormReturn<FormType>;
  onChange: (
    field: ControllerRenderProps<FormType>,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => Promise<void> | void;
}

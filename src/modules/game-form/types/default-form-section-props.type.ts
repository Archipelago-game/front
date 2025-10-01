import type { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import type { FormValues } from "./form-values.type.ts";
import type { ChangeEvent } from "react";

export interface DefaultFormSectionProps {
  formHook: UseFormReturn<FormValues>;
  onChange: (
    field: ControllerRenderProps<FormValues>,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => Promise<void> | void;
}

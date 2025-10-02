import type { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import type { FormType } from "./form.type.ts";
import type { ChangeEvent } from "react";

export interface DefaultFormComponentProps {
  formHook: UseFormReturn<FormType>;
  onChange: (
    field: ControllerRenderProps<FormType>,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => Promise<void> | void;
}

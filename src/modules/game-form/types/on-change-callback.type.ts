import type { ControllerRenderProps } from "react-hook-form";
import type { FormType } from "./form.type.ts";
import type { ChangeEvent } from "react";

export type OnChangeCallbackType = (
  field: ControllerRenderProps<FormType>,
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => Promise<void> | void;

import { createContext, useContext } from "react";

import type { OnChangeCallbackType } from "../types/on-change-callback.type.ts";
import type { FormHookType } from "../types/form-hook.type.ts";
import type { FormType } from "../types/form.type.ts";

interface FormContext {
  methods: FormHookType;
  onChange: OnChangeCallbackType;
  values: FormType | null;
}

export const FormContext = createContext<FormContext | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormContextProvider");
  }
  return context;
}

import { createContext, useContext } from "react";

import type { OnChangeCallbackType } from "../types/on-change-callback.type.ts";
import type { FormHookType } from "../types/form-hook.type.ts";
import type { FormType } from "../types/form/form.type.ts";

interface FormContext {
  methods: FormHookType;
  onChange: OnChangeCallbackType;
  values: FormType | null;
}

export const CustomFormContext = createContext<FormContext | null>(null);

export function useCustomFormContext() {
  const context = useContext(CustomFormContext);
  if (!context) {
    throw new Error(
      "useCustomFormContext must be used within FormContextProvider",
    );
  }
  return context;
}

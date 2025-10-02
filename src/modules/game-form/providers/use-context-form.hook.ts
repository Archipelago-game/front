import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";

import type { OnChangeCallbackType } from "../types/on-change-callback.type.ts";
import type { FormHookType } from "../types/form-hook.type.ts";

interface FormContextItem<T> {
  value: T | null;
  set: Dispatch<SetStateAction<T | null>>;
}

interface FormContext {
  formHook: FormContextItem<FormHookType> | null;
  onChange: FormContextItem<OnChangeCallbackType> | null;
}

export const FormContext = createContext<FormContext | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within useFormContext");
  }
  return context;
}

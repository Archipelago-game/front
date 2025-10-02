import { type ReactNode, useMemo, useState } from "react";
import { FormContext } from "./use-context-form.hook.ts";

import type { OnChangeCallbackType } from "../types/on-change-callback.type.ts";
import type { FormHookType } from "../types/form-hook.type.ts";

interface Props {
  children: ReactNode;
}

export function FormContextProvider({ children }: Props) {
  const [formHook, setFormHook] = useState<FormHookType | null>(null);

  const [onChange, setChange] = useState<OnChangeCallbackType | null>(null);

  const value = useMemo(
    () => ({
      formHook: {
        value: formHook,
        set: setFormHook,
      },
      onChange: {
        value: onChange,
        set: setChange,
      },
    }),
    [formHook, onChange],
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

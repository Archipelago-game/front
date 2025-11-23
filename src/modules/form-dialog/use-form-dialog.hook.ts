import { createContext, useContext } from "react";
import type { FormDialogProps } from "./FormDialog.tsx";

export interface FormDialogType {
  open: (data: Omit<FormDialogProps, "isOpen">) => void;
}

export const FormDialogContext = createContext<FormDialogType | null>(null);

export function useFormDialogContext() {
  const context = useContext(FormDialogContext);
  if (!context)
    throw new Error(
      "useFormDialogContext must be used as useFormDialogContext",
    );
  return context;
}

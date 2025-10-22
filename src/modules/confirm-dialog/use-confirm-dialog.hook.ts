import { createContext, useContext } from "react";
import type { ConfirmDialogProps } from "./ConfirmDialog.tsx";

export interface ConfirmDialogType {
  open: (data: Omit<ConfirmDialogProps, "isOpen">) => void;
}

export const ConfirmDialogContext = createContext<ConfirmDialogType | null>(
  null,
);

export function useConfirmDialogContext() {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error(
      "useConfirmDialogContext must be used within a useConfirmDialogContext",
    );
  }
  return context;
}

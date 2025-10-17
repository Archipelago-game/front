import type { AlertColor } from "@mui/material";
import { createContext, useContext } from "react";

export interface ShowMessageParams {
  message: string;
  severity?: AlertColor;
}

interface SnackbarContextType {
  showMessage: (params: ShowMessageParams) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error("useSnackbar must be used within SnackbarProvider");
  return context;
};

import { type ReactNode, useCallback, useState } from "react";
import { Alert, Snackbar, type AlertColor } from "@mui/material";
import {
  type ShowMessageParams,
  SnackbarContext,
} from "./use-snackbar-context.hook";

interface Props {
  children: ReactNode;
}
export function SnackbarProvider({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const showMessage = useCallback(
    ({ message, severity = "success" }: ShowMessageParams) => {
      setMessage(message);
      setSeverity(severity);
      setOpen(true);
    },
    [],
  );

  const handleClose = () => setOpen(false);

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleClose}
      >
        <Alert severity={severity} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

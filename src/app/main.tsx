import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../common/styles/index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../common/styles/theme/custom-theme.ts";
import { AuthContextProvider } from "./providers/auth-provider/auth-context.provider.tsx";
import { SnackbarProvider } from "./providers/snackbar-provider/snackbar-context.provider.tsx";
import { ConfirmDialogContextProvider } from "../modules/confirm-dialog/ConfirmDialogContextProvider.tsx";
import { ScreenSaverProvider } from "../modules/screen-saver/screen-saver.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ScreenSaverProvider>
        <AuthContextProvider>
          <SnackbarProvider>
            <ConfirmDialogContextProvider>
              <RouterProvider router={router} />
            </ConfirmDialogContextProvider>
          </SnackbarProvider>
        </AuthContextProvider>
      </ScreenSaverProvider>
    </ThemeProvider>
  </StrictMode>,
);

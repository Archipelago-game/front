import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../common/styles/index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";

import { AuthContextProvider } from "./providers/auth-provider/auth-context.provider.tsx";
import { SnackbarProvider } from "./providers/snackbar-provider/snackbar-context.provider.tsx";
import { ConfirmDialogContextProvider } from "../modules/confirm-dialog/ConfirmDialogContextProvider.tsx";

import { ModalProvider } from "./providers/global-modal/ModalProvider.tsx";
import CustomThemeProvider from "./providers/theme-provider/custom-theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomThemeProvider>
      <AuthContextProvider>
        <SnackbarProvider>
          <ModalProvider>
            <ConfirmDialogContextProvider>
              <RouterProvider router={router} />
            </ConfirmDialogContextProvider>
          </ModalProvider>
        </SnackbarProvider>
      </AuthContextProvider>
    </CustomThemeProvider>
  </StrictMode>,
);

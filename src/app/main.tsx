import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../common/styles/index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../common/styles/theme/custom-theme.ts";
import { UserContextProvider } from "./providers/user-provider/user-context.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </ThemeProvider>
  </StrictMode>,
);

import type { ReactNode } from "react";
import { getTheme } from "../../../common/styles/theme/custom-theme.ts";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";

interface Props {
  children: ReactNode;
}

export default function CustomThemeProvider({ children }: Props) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = getTheme(prefersDark ? "dark" : "light");
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

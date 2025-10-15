// import { PaletteOptions, Palette } from "@mui/material/styles";

import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    primary: string;
    secondary: string;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    label: {
      text: {
        primary: string;
        secondary: string;
      };
      background: {
        primary: string;
        secondary: string;
      };
    };
  }

  interface PaletteOptions {
    label: {
      text: {
        primary: string;
        secondary: string;
      };
      background: {
        primary: string;
        secondary: string;
      };
    };
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    tablet: true;
    phablet: true;
  }
}

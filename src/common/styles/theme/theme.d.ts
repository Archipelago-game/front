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
    base: {
      background: string;
      surfaceBase: string;
      surfaceAccent: string;
      surfaceLowered: string;
      accent: string;

      divider: string;
      outline: string;
      outlineStrong: string;
      outlineSubtitle: string;

      text: {
        title: string;
        primary: string;
        primaryLight: string;
        secondary: string;
        onLowered: string;
        onLoweredStrong: string;
      };
    };

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
    base: {
      background: string;
      surfaceBase: string;
      surfaceAccent: string;
      surfaceLowered: string;
      accent: string;

      divider: string;
      outline: string;
      outlineStrong: string;
      outlineSubtitle: string;

      text: {
        title: string;
        primary: string;
        primaryLight: string;
        secondary: string;
        onLowered: string;
        onLoweredStrong: string;
      };
    };

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

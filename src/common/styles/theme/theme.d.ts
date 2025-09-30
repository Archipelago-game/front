// import { PaletteOptions, Palette } from "@mui/material/styles";

import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    main: string;
    light?: string;
    dark?: string;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    label: {
      text: {
        main: string;
        light: string;
        dark: string;
      };
      background: {
        main: string;
        light: string;
        dark: string;
      };
    };
  }

  interface PaletteOptions {
    label: {
      text: {
        main: string;
        light: string;
        dark: string;
      };
      background: {
        main: string;
        light: string;
        dark: string;
      };
    };
  }
}

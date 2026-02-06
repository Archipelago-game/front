import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,

      ...(mode === "light"
        ? {
            background: {
              default: "#777060",
              paper: "#ffffff",
            },
            text: {
              primary: "#1a1a1a",
              secondary: "#555555",
            },
            divider: "#e0e0e0",
          }
        : {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#ffffff",
              secondary: "#b0b0b0",
            },
            divider: "#2a2a2a",
          }),

      // твоя кастомная палитра label
      label: {
        text: {
          primary: "#ffffff",
          secondary: mode === "light" ? "#ffffff" : "#e0e0e0",
        },
        background: {
          primary: mode === "light" ? "#000000" : "#2b2b2b",
          secondary: mode === "light" ? "#707442" : "#8a8f4f",
        },
      },
    },

    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "4px 8px",
          },
        },
      },
    },

    breakpoints: {
      values: {
        xs: 0,
        phablet: 560,
        sm: 600,
        tablet: 730,
        md: 960,
        lg: 1260,
        xl: 1536,
      },
    },
  });

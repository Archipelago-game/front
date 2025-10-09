import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    label: {
      text: {
        primary: "#ffffff",
        secondary: "#ffffff",
      },
      background: {
        primary: "#000000",
        secondary: "#707442",
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
      sm: 600,
      md: 960, // ← изменили стандартное значение
      lg: 1200,
      xl: 1536,
    },
  },
});

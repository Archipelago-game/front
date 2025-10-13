import type { Theme } from "@mui/material";

export const defaultLabelTextStyles = (
  theme: Theme,
  color?: keyof typeof theme.palette.label.text,
) => ({
  alignItems: "center",
  paddingInline: "0.5rem",
  minHeight: "30px",
  color: theme.palette.label.text[color ?? "primary"],
  backgroundColor: theme.palette.label.background[color ?? "primary"],
});

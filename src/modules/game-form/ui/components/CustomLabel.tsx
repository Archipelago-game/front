import { type SxProps, Typography } from "@mui/material";
import { useTheme, type TypographyVariant } from "@mui/material/styles";
import { Box } from "@mui/system";
import type { ReactNode } from "react";
import { defaultLabelTextStyles } from "./styles/label.styles.ts";

export interface CustomLabelProps {
  label?: {
    text?: string;
    size?: TypographyVariant;
    color?: "primary" | "secondary";
  };
  orientation?: "column" | "row";
  children?: ReactNode;
  sx?: SxProps;
}

export default function CustomLabel(props: CustomLabelProps) {
  const theme = useTheme();
  const { label, orientation, children, sx } = props;
  return (
    <Box
      sx={{
        flex: "1 1 0",
        display: "flex",
        flexDirection: orientation ?? "column",
        ...sx,
      }}
    >
      {/* todo выделить в отдельный компонент */}
      <Box
        sx={{
          width: children ? "unset" : "100%",
          display: "flex",
          ...defaultLabelTextStyles(theme, label?.color),
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: {
              xs: ".8em", // <600px
              sm: ".9em",
              md: "0.9em", // ≥960px
            },
          }}
          variant={label?.size ?? "h6"}
        >
          {label?.text}
        </Typography>
      </Box>
      {children && <Box sx={{ flex: 1 }}>{children}</Box>}
    </Box>
  );
}

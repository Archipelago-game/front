import { type SxProps, Typography } from "@mui/material";
import { useTheme, type TypographyVariant } from "@mui/material/styles";
import { Box } from "@mui/system";
import type { ReactNode } from "react";

export interface CustomLabelProps {
  label?: {
    text?: string;
    size?: TypographyVariant;
    color?: "primary" | "secondary";
  };
  orientation?: "column" | "row";
  children: ReactNode;
  sx?: SxProps;
}

export default function CustomLabel(props: CustomLabelProps) {
  const theme = useTheme();
  const { label, orientation, children, sx } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flex: "1 1 0",
        flexDirection: orientation ?? "column",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingInline: "0.5em",
          minHeight: "32px",
          color: theme.palette.label.text[label?.color ?? "primary"],
          backgroundColor:
            theme.palette.label.background[label?.color ?? "primary"],
        }}
      >
        <Typography sx={{ textAlign: "center" }} variant={label?.size ?? "h6"}>
          {label?.text}
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  );
}

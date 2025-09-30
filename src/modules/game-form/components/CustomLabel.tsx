import { Typography } from "@mui/material";
import { useTheme, type TypographyVariant } from "@mui/material/styles";
import { Box } from "@mui/system";
import type { ReactNode } from "react";

interface Props {
  label: {
    text?: string;
    size?: TypographyVariant;
    color?: "primary" | "secondary";
  };

  labelSize?: TypographyVariant;
  children: ReactNode;
}

export default function CustomLabel(props: Props) {
  const theme = useTheme();
  const { label, children } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: "0.1em",
          color: theme.palette.label.text[label.color ?? "primary"],
          backgroundColor:
            theme.palette.label.background[label.color ?? "primary"],
        }}
      >
        <Typography sx={{ textAlign: "center" }} variant={label.size ?? "h6"}>
          {label.text}
        </Typography>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}

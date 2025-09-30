import { Typography } from "@mui/material";
import { useTheme, type TypographyVariant } from "@mui/material/styles";
import { Box } from "@mui/system";
import type { ReactNode } from "react";

interface Props {
  label?: string;
  labelSize?: TypographyVariant;
  children: ReactNode;
}

export default function CustomLabel(props: Props) {
  const theme = useTheme();
  const { label = "", labelSize = "h6", children } = props;
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
          color: theme.palette.label.text.main,
          backgroundColor: theme.palette.label.background.main,
        }}
      >
        <Typography sx={{ textAlign: "center" }} variant={labelSize}>
          {label}
        </Typography>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}

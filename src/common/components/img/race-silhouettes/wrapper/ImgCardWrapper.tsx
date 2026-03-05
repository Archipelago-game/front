import { Box, type SxProps } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  sx?: SxProps;
  children: ReactNode;
}
export default function ImgCardWrapper({ sx, children }: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: "3 / 5",
        position: "relative",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

import type { ReactNode } from "react";
import { Box, type SxProps } from "@mui/material";
import { printDisplayOnStyles } from "./print.styles.ts";

interface Props {
  children: ReactNode;
  sx?: SxProps;
}
export default function PrintOn({ children, sx }: Props) {
  return <Box sx={{ ...printDisplayOnStyles, ...sx }}>{children}</Box>;
}

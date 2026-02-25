import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { printDisplayOnStyles } from "./print.styles.ts";

interface Props {
  children: ReactNode;
}
export default function PrintOn({ children }: Props) {
  return <Box sx={printDisplayOnStyles}>{children}</Box>;
}

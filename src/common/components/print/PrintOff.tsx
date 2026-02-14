import type { ReactNode } from "react";
import { Box } from "@mui/material";

interface Props {
  children: ReactNode;
}
export default function PrintOff({ children }: Props) {
  return <Box className="no-print">{children}</Box>;
}

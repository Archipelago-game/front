import type { ReactNode } from "react";
import { Box } from "@mui/system";

interface Props {
  children: ReactNode;
}
export default function Attribute({ children }: Props) {
  return (
    <Box
      sx={{
        minWidth: "260px",
      }}
    >
      {children}
    </Box>
  );
}

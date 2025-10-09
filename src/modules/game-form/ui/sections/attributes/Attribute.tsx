import type { ReactNode } from "react";
import { Box } from "@mui/system";

interface Props {
  children: ReactNode;
}
export default function Attribute({ children }: Props) {
  return (
    <Box className={"test"} sx={{ minWidth: "330px" }}>
      {children}
    </Box>
  );
}

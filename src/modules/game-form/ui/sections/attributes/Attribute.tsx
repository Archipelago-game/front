import type { ReactNode } from "react";
import { Box } from "@mui/system";

interface Props {
  children: ReactNode;
}
export default function Attribute({ children }: Props) {
  return (
    <Box
      className={"test"}
      sx={{
        minWidth: "330px",
        ["@media (max-width: 400px)"]: {
          minWidth: "290px",
          fontSize: "12px",
        },
      }}
    >
      {children}
    </Box>
  );
}

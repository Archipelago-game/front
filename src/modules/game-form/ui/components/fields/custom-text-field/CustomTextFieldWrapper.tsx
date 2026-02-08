import Stack from "@mui/material/Stack";
import type { ReactNode } from "react";

interface Props {
  orientation?: "column" | "row";
  children: ReactNode;
}
export default function CustomTextFieldWrapper({
  orientation = "row",
  children,
}: Props) {
  const spacing = orientation === "row" ? 1 : 0;

  return (
    <Stack direction={orientation} alignItems="center" spacing={spacing}>
      {children}
    </Stack>
  );
}

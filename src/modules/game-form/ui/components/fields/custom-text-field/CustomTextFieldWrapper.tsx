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
  const isRow = orientation === "row";
  const spacing = isRow ? 1 : 0;
  const alignItems = isRow ? "center" : "flex-start";

  return (
    <Stack direction={orientation} alignItems={alignItems} spacing={spacing}>
      {children}
    </Stack>
  );
}

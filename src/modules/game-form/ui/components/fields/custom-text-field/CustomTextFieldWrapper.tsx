import Stack, { type StackProps } from "@mui/material/Stack";
import type { ReactNode } from "react";

interface Props {
  stackProps?: StackProps;
  children: ReactNode;
}
export default function CustomTextFieldWrapper({
  stackProps,
  children,
}: Props) {
  const { direction: propDirection = "row", ...restStackProps } =
    stackProps ?? {};

  const isRow = propDirection === "row";
  const alignItems = isRow ? "center" : "flex-start";

  return (
    <Stack
      direction={propDirection}
      columnGap={1}
      m={0}
      alignItems={alignItems}
      {...restStackProps}
    >
      {children}
    </Stack>
  );
}

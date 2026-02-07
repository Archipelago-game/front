import Stack from "@mui/material/Stack";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function CustomTextFieldWrapper({ children }: Props) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {children}
    </Stack>
  );
}

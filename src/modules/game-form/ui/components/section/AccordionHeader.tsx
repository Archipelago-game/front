import { IconButton, Stack } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

export default function AccordionHeader({ children, onClick }: Props) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      {children}
      <IconButton onClick={onClick}>
        <ExpandMoreIcon />
      </IconButton>
    </Stack>
  );
}

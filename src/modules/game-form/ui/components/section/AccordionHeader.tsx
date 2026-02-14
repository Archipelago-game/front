import { IconButton, Stack, type SxProps } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
  sx?: SxProps;
}

export default function AccordionHeader({ children, onClick, sx }: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={sx}
    >
      {children}
      <IconButton onClick={onClick} color="inherit" className="no-print">
        <ExpandMoreIcon />
      </IconButton>
    </Stack>
  );
}

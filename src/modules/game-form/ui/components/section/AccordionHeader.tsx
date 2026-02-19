import { IconButton, Stack, type SxProps } from "@mui/material";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
  isExpanded: boolean;
  sx?: SxProps;
}

export default function AccordionHeader({
  children,
  onClick,
  isExpanded,
  sx,
}: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={sx}
    >
      {children}
      <IconButton onClick={onClick} color="inherit">
        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
    </Stack>
  );
}

import type { ReactNode } from "react";
import { Box } from "@mui/system";
import { IconButton, Tooltip } from "@mui/material";
import { QuestionMark } from "@mui/icons-material";

interface Props {
  children: ReactNode;
  text: string;
}

export default function TooltipWrapper({ children, text }: Props) {
  return (
    <Box>
      <Box display="flex" alignItems="flex-start">
        {children}
        <Tooltip
          title={text}
          placement="auto"
          enterTouchDelay={0}
          leaveTouchDelay={1000}
          tabIndex={0}
        >
          <IconButton sx={{ padding: 0 }}>
            <QuestionMark fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

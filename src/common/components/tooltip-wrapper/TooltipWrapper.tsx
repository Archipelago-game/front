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
          <IconButton
            sx={{
              padding: 0,
              transition: "all .2s",
              "&:hover": {
                color: "success.main",
                transform: "scale(1.1)",
              },
              "&:active": {
                color: "success.dark",
                transform: "scale(0.95)",
              },
              "&:focus-visible": {
                outline: "1px solid",
                outlineColor: "success.light",
                outlineOffset: "2px",
              },
              "&:disabled": {
                opacity: 0.5,
                cursor: "not-allowed",
              },
            }}
          >
            <QuestionMark fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

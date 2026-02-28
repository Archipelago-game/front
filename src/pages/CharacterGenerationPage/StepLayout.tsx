import type { ReactNode } from "react";
import { Box, Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface Props {
  children: ReactNode;
  forward: () => void;
  backward: () => void;
}

export default function StepLayout({ children, forward, backward }: Props) {
  return (
    <Box
      className="step-layout"
      sx={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr auto",
      }}
    >
      {children}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBlock: 1,
        }}
      >
        <Button variant="contained" onClick={backward}>
          <ArrowBack fontSize="small" /> Назад
        </Button>
        <Button variant="contained" onClick={forward}>
          <ArrowForward />
          Далее
        </Button>
      </Box>
    </Box>
  );
}

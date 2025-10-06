import { Box } from "@mui/material";
import PhysicalDefence from "./PhysicalDefence.tsx";

export default function SideDefence() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <PhysicalDefence />
    </Box>
  );
}

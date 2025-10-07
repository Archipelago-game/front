import { Box } from "@mui/material";
import PhysicalDefence from "./PhysicalDefence.tsx";
import MentalDefence from "./MentalDefence.tsx";
import Wounds from "./Wounds.tsx";
import Injuries from "./Injuries.tsx";

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
      <Wounds />
      <MentalDefence />
      <Injuries />
    </Box>
  );
}

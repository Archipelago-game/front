import { Box } from "@mui/material";
import PhysicalDefence from "./PhysicalDefence.tsx";
import MentalDefence from "./MentalDefence.tsx";
import Wounds from "./Wounds.tsx";
import Injuries from "./Injuries.tsx";

export default function SideDefence() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 1,
        ["@media (max-width: 390px)"]: {
          gridTemplateColumns: "1fr 1fr",
        },
      }}
    >
      <Box>
        <PhysicalDefence />
        <Wounds />
      </Box>
      <Box>
        <MentalDefence />
        <Injuries />
      </Box>
    </Box>
  );
}

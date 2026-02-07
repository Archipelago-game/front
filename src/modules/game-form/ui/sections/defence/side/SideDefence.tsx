import { Box, Divider } from "@mui/material";
import PhysicalDefence from "./PhysicalDefence.tsx";
import MentalDefence from "./MentalDefence.tsx";
import Wounds from "./Wounds.tsx";
import Injuries from "./Injuries.tsx";
import SubSection from "../../../components/section/SubSection.tsx";
import { useTheme } from "@mui/material/styles";

export default function SideDefence() {
  const theme = useTheme();
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
      <SubSection>
        <PhysicalDefence />
        <Divider sx={{ borderColor: theme.palette.base.outline }} />
        <Wounds />
      </SubSection>
      <SubSection>
        <MentalDefence />
        <Divider sx={{ borderColor: theme.palette.base.outline }} />
        <Injuries />
      </SubSection>
    </Box>
  );
}

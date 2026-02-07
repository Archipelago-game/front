import { Box } from "@mui/material";

import DamageBonus from "./damage-bonus/DamageBonus.tsx";
import DamageMethods from "./damage-methods/DamageMethods.tsx";

import SectionTitle from "../../components/section/SectionTitle.tsx";

export default function Attack() {
  return (
    <Box>
      <SectionTitle title="Атака" />
      <Box mb={1}>
        <DamageBonus />
      </Box>
      <DamageMethods />
    </Box>
  );
}

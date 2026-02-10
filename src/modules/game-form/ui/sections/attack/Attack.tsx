import BaseSectionCard from "../../components/section/BaseSectionCard.tsx";

import DamageMethods from "./damage-methods/DamageMethods.tsx";
import DamageBonus from "./damage-bonus/DamageBonus.tsx";
import { Box } from "@mui/system";

export default function Attack() {
  return (
    <BaseSectionCard title="Атака">
      <Box mb={2}>
        <DamageBonus />
      </Box>
      <DamageMethods />
    </BaseSectionCard>
  );
}

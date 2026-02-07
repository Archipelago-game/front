import { Box } from "@mui/material";

import SubSection from "../../../components/section/SubSection.tsx";
import Slot from "./Slot.tsx";
import HeroSilhouette from "./HeroSilhouette.tsx";

export default function Armor() {
  return (
    <SubSection title="Броня">
      <Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "320px",
            margin: "0 auto",
          }}
        >
          {/* Силуэт */}
          <HeroSilhouette />

          {/* Голова */}
          <Slot top="2%" left="70%" fieldName="defence.armor.slots.head" />

          {/* Тело */}
          <Slot top="28%" left="50%" fieldName="defence.armor.slots.body" />

          {/* Правая рука */}
          <Slot
            top="30%"
            left="92%"
            fieldName="defence.armor.slots.rightHand"
          />

          {/* Левая рука */}
          <Slot top="30%" left="8%" fieldName="defence.armor.slots.leftHand" />

          {/* Правая нога */}
          <Slot top="62%" left="80%" fieldName="defence.armor.slots.rightLeg" />

          {/* Левая нога */}
          <Slot top="62%" left="20%" fieldName="defence.armor.slots.leftLeg" />
        </Box>
      </Box>
    </SubSection>
  );
}

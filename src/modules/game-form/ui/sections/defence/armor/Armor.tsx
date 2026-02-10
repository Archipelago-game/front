import { Box } from "@mui/material";

import Slot from "./Slot.tsx";

import SubSection from "../../../components/section/SubSection.tsx";
import SectionTitle from "../../../components/section/SectionTitle.tsx";

import CurrentSilhouette from "./siluets/CurrentSilhouette.tsx";

export default function Armor() {
  return (
    <SubSection>
      <SectionTitle title="Броня" />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minWidth: "158px",
          // note вполне возможно это ограничение будет мешать мобильной верстке
          maxWidth: "320px",
          margin: "0 auto",
        }}
      >
        <CurrentSilhouette />
        {/* Голова */}
        <Slot top="6%" left="71%" fieldName="defence.armor.slots.head" />

        {/* Тело */}
        <Slot top="28%" left="50%" fieldName="defence.armor.slots.body" />

        {/* Правая рука */}
        <Slot top="30%" left="92%" fieldName="defence.armor.slots.rightHand" />

        {/* Левая рука */}
        <Slot top="30%" left="8%" fieldName="defence.armor.slots.leftHand" />

        {/* Правая нога */}
        <Slot top="62%" left="80%" fieldName="defence.armor.slots.rightLeg" />

        {/* Левая нога */}
        <Slot top="62%" left="20%" fieldName="defence.armor.slots.leftLeg" />
      </Box>
    </SubSection>
  );
}

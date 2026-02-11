import { Box } from "@mui/material";
import Brave from "./Brave.tsx";

import SideDefence from "./side/SideDefence.tsx";

import BaseSectionCard from "../../components/section/BaseSectionCard.tsx";
import ArmorSection from "./armor/ArmorSection.tsx";
import { ContainerWrapper } from "../../../../../common/components/container-wrapper/ContainerWrapper.ts";
import { DefenceContainer } from "./DefenceContainer.ts";

export default function Defence() {
  return (
    <BaseSectionCard title="Защита">
      <Box mb={1}>
        <Brave />
      </Box>
      <ContainerWrapper>
        <DefenceContainer>
          <ArmorSection />
          <SideDefence />
        </DefenceContainer>
      </ContainerWrapper>
    </BaseSectionCard>
  );
}

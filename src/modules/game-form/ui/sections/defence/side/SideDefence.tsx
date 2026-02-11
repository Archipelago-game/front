import { Stack } from "@mui/material";
import PhysicalDefence from "./PhysicalDefence.tsx";
import MentalDefence from "./MentalDefence.tsx";

import SubSection from "../../../components/section/SubSection.tsx";

export default function SideDefence() {
  return (
    <Stack direction="row" flexWrap="wrap" rowGap={1} columnGap={1}>
      <SubSection>
        <PhysicalDefence />
      </SubSection>
      <SubSection>
        <MentalDefence />
      </SubSection>
    </Stack>
  );
}

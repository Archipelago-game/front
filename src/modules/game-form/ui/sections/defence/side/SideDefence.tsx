import { Box, Stack } from "@mui/material";
import PhysicalDefence from "./PhysicalDefence.tsx";
import MentalDefence from "./MentalDefence.tsx";

import SubSection from "../../../components/section/SubSection.tsx";

const wrapperStyles = {
  sx: {
    flexGrow: 1,
  },
};

export default function SideDefence() {
  return (
    <Stack direction="row" flexWrap="wrap" rowGap={1} columnGap={1}>
      <Box {...wrapperStyles}>
        <SubSection>
          <PhysicalDefence />
        </SubSection>
      </Box>
      <Box {...wrapperStyles}>
        <SubSection>
          <MentalDefence />
        </SubSection>
      </Box>
    </Stack>
  );
}

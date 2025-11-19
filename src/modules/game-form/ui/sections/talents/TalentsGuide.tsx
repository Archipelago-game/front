import { Grid, type SelectChangeEvent } from "@mui/material";
import {
  type TalentGuideType,
  talentsGuide,
} from "../../../../../data/talents-guide.ts";
import TalentsGuideLine from "./TalentsGuideLine.tsx";
import { Box } from "@mui/system";
import { useState } from "react";

import TalentsFilterForm from "./TalentsFilterForm.tsx";

export default function TalentsGuide() {
  const [talents, setTalents] = useState<TalentGuideType[]>(talentsGuide);

  return (
    <>
      <TalentsFilterForm />
      <Box
        sx={{
          overflowY: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          paddingBottom: "30px",
        }}
      >
        <Grid container gap={2} justifyContent={"flex-end"} mb={1}>
          {talents.map((talent) => (
            <TalentsGuideLine
              key={`${talent.branch}${talent.rang}`}
              {...talent}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
}

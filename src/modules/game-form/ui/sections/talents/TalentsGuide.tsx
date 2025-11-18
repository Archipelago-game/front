import { Grid } from "@mui/material";
import {
  type TalentGuideType,
  talentsGuide,
} from "../../../../../data/talents-guide.ts";
import TalentsGuideLine from "./TalentsGuideLine.tsx";
import { Box } from "@mui/system";
import { useState } from "react";

export default function TalentsGuide() {
  const [talents, setTalents] = useState<TalentGuideType[]>(talentsGuide);
  return (
    <>
      <Box sx={{ position: "sticky" }}>
        <Box>TESt</Box>
      </Box>
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
              key={`${talent.branch}${talent.level}`}
              {...talent}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
}

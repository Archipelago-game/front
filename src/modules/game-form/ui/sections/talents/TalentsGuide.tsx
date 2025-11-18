import { Grid } from "@mui/material";
import { talentsGuide } from "../../../../../data/talents-guide.ts";
import TalentsGuideLine from "./TalentsGuideLine.tsx";
import { Box } from "@mui/system";

export default function TalentsGuide() {
  return (
    <Box
      sx={{
        overflowY: "auto",
        scrollBehavior: "smooth",
        scrollbarWidth: "none",
        paddingBottom: "30px",
      }}
    >
      <Grid container gap={2} justifyContent={"flex-end"} mb={1}>
        {talentsGuide.map((talent) => (
          <TalentsGuideLine
            key={`${talent.branch}${talent.level}`}
            {...talent}
          />
        ))}
      </Grid>
    </Box>
  );
}

import { Grid } from "@mui/material";
import { talentsGuide } from "../../../../../data/talents-guide.ts";
import TalentsGuideLine from "./TalentsGuideLine.tsx";

export default function TalentsGuide() {
  return (
    <Grid container gap={2} justifyContent={"flex-end"} mb={1}>
      {talentsGuide.map((talent) => (
        <TalentsGuideLine key={`${talent.branch}${talent.level}`} {...talent} />
      ))}
    </Grid>
  );
}

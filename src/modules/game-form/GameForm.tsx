import { Box, Grid } from "@mui/material";

import BaseInfo from "./sections/base-info/BaseInfo.tsx";

export default function GameForm() {
  return (
    <Grid container spacing={5}>
      <Grid size={3}>
        <Box>Атака</Box>
      </Grid>
      <Grid size={9}>
        <BaseInfo />
      </Grid>
    </Grid>
  );
}

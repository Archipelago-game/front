import { Box, Grid, Typography } from "@mui/material";
import Brave from "./Brave.tsx";
import Armor from "./armor/Armor.tsx";
import ArmorProperty from "./armor/ArmorProperty.tsx";
import SideDefence from "./side/SideDefence.tsx";
import { fitContentStyle } from "./side/styles/side-defence.styles.ts";

export default function Defence() {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
        }}
      >
        Защита
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        <Grid sx={{ ...fitContentStyle }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Brave />
            <Armor />
            <ArmorProperty />
          </Box>
        </Grid>
        <Grid sx={{ ...fitContentStyle }}>
          <SideDefence />
        </Grid>
      </Box>
    </Box>
  );
}

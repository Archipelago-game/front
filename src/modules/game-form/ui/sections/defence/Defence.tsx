import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import Brave from "./Brave.tsx";
import Armor from "./armor/Armor.tsx";
import ArmorProperty from "./armor/ArmorProperty.tsx";
import SideDefence from "./side/SideDefence.tsx";

export default function Defence() {
  const isBelow450 = useMediaQuery("(max-width:450px)");
  return (
    <>
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
        <Grid>
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
        <Grid size={isBelow450 ? 12 : { xs: 5, sm: 4, md: 5, xl: 4 }}>
          <SideDefence />
        </Grid>
      </Box>
    </>
  );
}

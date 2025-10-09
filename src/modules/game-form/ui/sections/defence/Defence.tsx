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
      <Grid container spacing={2}>
        <Grid size={isBelow450 ? 12 : { xs: 7, sm: 8, md: 7, xl: 8 }}>
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
      </Grid>
    </>
  );
}

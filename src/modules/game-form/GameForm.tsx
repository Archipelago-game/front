import { Box, Grid, Typography } from "@mui/material";
import BaseInfo from "./ui/sections/base-info/BaseInfo.tsx";

import Luck from "./ui/sections/luck/Luck.tsx";
import Experience from "./ui/sections/experience/Experience.tsx";
import Attack from "./ui/sections/attack/Attack.tsx";
import Defence from "./ui/sections/defence/Defence.tsx";
import { useCustomFormContext } from "./providers/use-custom-context-form.hook.ts";

import Attributes from "./ui/sections/attributes/Attributes.tsx";
import Inventory from "./ui/sections/inventory/Inventory.tsx";

import Talents from "./ui/sections/talants/Talents.tsx";
import Header from "./ui/sections/header/Header.tsx";

export default function GameForm() {
  const formContext = useCustomFormContext();
  const { methods, onChange, values } = useCustomFormContext();

  if (!formContext || !values) {
    return null;
  }

  return (
    // <Grid container spacing={2}>
    <Grid
      sx={{
        display: "grid",
        gridTemplateColumns: "auto, 1fr",
      }}
    >
      <Grid
        sx={{
          gridColumn: "span 2",
        }}
      >
        <Header />
      </Grid>
      {/*<Grid size={{ md: 3 }} order={{ xs: 2, md: 1 }}>*/}
      <Grid>
        <Attack values={values} formHook={methods} onChange={onChange} />
        <Defence />
        <Inventory />
      </Grid>
      {/*<Grid size={{ md: 9 }} order={{ xs: 1, md: 2 }}>*/}
      <Grid>
        <Grid container spacing={2}>
          <Grid size={12}>
            <BaseInfo />
          </Grid>
          <Grid size={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Luck values={values} formHook={methods} onChange={onChange} />
              <Experience />
            </Box>
          </Grid>

          <Grid size={12}>
            <Attributes />
          </Grid>
          <Grid size={12}>
            <Talents />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

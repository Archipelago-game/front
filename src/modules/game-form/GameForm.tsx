import { Box, Grid } from "@mui/material";
import BaseInfo from "./ui/sections/base-info/BaseInfo.tsx";

import Luck from "./ui/sections/luck/Luck.tsx";
import Experience from "./ui/sections/experience/Experience.tsx";
import Attack from "./ui/sections/attack/Attack.tsx";
import Defence from "./ui/sections/defence/Defence.tsx";
import { useCustomFormContext } from "./providers/use-custom-context-form.hook.ts";

import Attributes from "./ui/sections/attributes/Attributes.tsx";
import Inventory from "./ui/sections/inventory/Inventory.tsx";

import Talents from "./ui/sections/talants/Talents.tsx";

export default function GameForm() {
  const formContext = useCustomFormContext();
  const { methods, onChange, values } = useCustomFormContext();

  if (!formContext || !values) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ md: 5 }} order={{ xs: 2, md: 1 }}>
        <Attack values={values} formHook={methods} onChange={onChange} />
        <Defence />
        <Inventory />
      </Grid>
      <Grid size={{ md: 7 }} order={{ xs: 1, md: 2 }}>
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

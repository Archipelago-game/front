import { Box, Grid } from "@mui/material";
import BaseInfo from "./ui/sections/base-info/BaseInfo.tsx";

import Luck from "./ui/sections/luck/Luck.tsx";
import Experience from "./ui/sections/experience/Experience.tsx";
import Attack from "./ui/sections/attack/Attack.tsx";
import Defence from "./ui/sections/defence/Defence.tsx";
import { useFormContext } from "./providers/use-context-form.hook.ts";
import Dexterity from "./ui/sections/dexterity/Dexterity.tsx";

export default function GameForm() {
  const formContext = useFormContext();
  const { methods, onChange, values } = useFormContext();

  if (!formContext || !values) {
    return null;
  }

  return (
    <Grid container spacing={5}>
      <Grid size={4}>
        <Attack values={values} formHook={methods} onChange={onChange} />
        <Defence formHook={methods} onChange={onChange} />
      </Grid>
      <Grid size={8}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <BaseInfo formHook={methods} onChange={onChange} />
          </Grid>
          <Grid size={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Luck values={values} formHook={methods} onChange={onChange} />
              <Experience formHook={methods} onChange={onChange} />
            </Box>
          </Grid>

          <Grid size={12}>
            <Dexterity />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

import type { DefaultFormComponentProps } from "../../../types/default-form-section-props.type.ts";
import { Box, Grid, Typography } from "@mui/material";
import Brave from "./Brave.tsx";
import Armor from "./armor/Armor.tsx";
import ArmorProperty from "./armor/ArmorProperty.tsx";
import SideDefence from "./side/SideDefence.tsx";

export default function Defence({
  formHook,
  onChange,
}: DefaultFormComponentProps) {
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
        <Grid size={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Brave formHook={formHook} onChange={onChange} />
            <Armor />
            <ArmorProperty />
          </Box>
        </Grid>
        <Grid size={4}>
          <SideDefence />
        </Grid>
      </Grid>
    </>
  );
}

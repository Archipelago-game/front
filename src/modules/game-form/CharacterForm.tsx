import { Box, Grid, Stack, useTheme } from "@mui/material";

import Luck from "./ui/sections/luck/Luck.tsx";
import Experience from "./ui/sections/experience/Experience.tsx";
import Attack from "./ui/sections/attack/Attack.tsx";
import Defence from "./ui/sections/defence/Defence.tsx";
import { useCustomFormContext } from "./providers/use-custom-context-form.hook.ts";

import Inventory from "./ui/sections/inventory/Inventory.tsx";

import DraggableFab from "../draggable-fab/DraggableSpeedDial.tsx";
import AttributesAndTalentsPanel from "./ui/sections/attrubutes-talents-tabs/AttributesAndTalentsPanel.tsx";
import BaseInfo from "./ui/sections/base-info/BaseInfo.tsx";

export default function CharacterForm() {
  const formContext = useCustomFormContext();
  const theme = useTheme();
  const { values } = formContext;

  if (!formContext || !values) {
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.base.background,
      }}
    >
      <DraggableFab />
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "450px 1fr",

          ["@media (max-width: 959px)"]: {
            gridTemplateColumns: "auto auto",
          },

          ["@media (max-width: 730px)"]: {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box
          sx={{
            gridColumn: "span 2",
            ["@media (max-width: 730px)"]: {
              gridColumn: "span 1",
            },
          }}
        >
          <BaseInfo />
        </Box>
        <Stack
          spacing={2}
          sx={{
            ["@media (max-width: 730px)"]: {
              order: "2",
            },
          }}
        >
          <Attack />
          <Defence />
          <Inventory />
        </Stack>

        <Box>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "stretch",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Luck />
                <Experience />
              </Box>
            </Grid>

            <Grid size={12}>
              <AttributesAndTalentsPanel />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

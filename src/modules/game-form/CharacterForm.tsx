import { Box, Grid } from "@mui/material";
import BaseInfo from "./ui/sections/base-info/BaseInfo.tsx";

import Luck from "./ui/sections/luck/Luck.tsx";
import Experience from "./ui/sections/experience/Experience.tsx";
import Attack from "./ui/sections/attack/Attack.tsx";
import Defence from "./ui/sections/defence/Defence.tsx";
import { useCustomFormContext } from "./providers/use-custom-context-form.hook.ts";

import Inventory from "./ui/sections/inventory/Inventory.tsx";

import DraggableFab from "../draggable-fab/DraggableSpeedDial.tsx";
import AttributesAndTalentsPanel from "./ui/sections/attrubutes-talents-tabs/AttributesAndTalentsPanel.tsx";
import BaseInfoNew from "./ui/sections/base-info/BaseInfoNew.tsx";

export default function CharacterForm() {
  const formContext = useCustomFormContext();
  const { values } = formContext;

  if (!formContext || !values) {
    return null;
  }

  return (
    <>
      <BaseInfoNew />

      <DraggableFab />
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "370px 1fr",

          ["@media (max-width: 730px)"]: {
            display: "grid",
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box
          sx={{
            ["@media (max-width: 730px)"]: {
              order: "2",
            },
          }}
        >
          <Attack />
          <Defence />
          <Inventory />
        </Box>

        <Box>
          <Grid container spacing={1}>
            <Grid size={12}>
              <BaseInfo />
            </Grid>
            <Grid size={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
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
    </>
  );
}

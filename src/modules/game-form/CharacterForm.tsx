import { Box, Grid, Stack, useTheme } from "@mui/material";

import Luck from "./ui/sections/luck/Luck.tsx";
import Experience from "./ui/sections/experience/Experience.tsx";
import Attack from "./ui/sections/attack/Attack.tsx";
import Defence from "./ui/sections/defence/Defence.tsx";
import { useCustomFormContext } from "./providers/use-custom-context-form.hook.ts";

import Inventory from "./ui/sections/inventory/Inventory.tsx";

import DraggableFab from "../draggable-fab/DraggableSpeedDial.tsx";
import TabsPanel from "./ui/sections/attrubutes-talents-tabs/TabsPanel.tsx";
import BaseInfo from "./ui/sections/base-info/BaseInfo.tsx";
import PrintOn from "../../common/components/print/PrintOn.tsx";
import MoralValues from "./ui/sections/moral-values/MoralValues.tsx";
import Notes from "./ui/sections/notes/Notes.tsx";
import PrintOff from "../../common/components/print/PrintOff.tsx";
import Talents from "./ui/sections/talents/Talents.tsx";

export default function CharacterForm() {
  const formContext = useCustomFormContext();
  const theme = useTheme();
  const { values } = formContext;

  if (!formContext || !values) {
    return null;
  }

  return (
    <Box
      className="character-form"
      sx={{
        backgroundColor: theme.palette.base.background,
      }}
    >
      <DraggableFab />
      <Box
        className="character-form__grid"
        sx={{
          display: "grid",
          gridTemplateColumns: "450px 1fr",
          gap: 2,

          ["@media (max-width: 959px)"]: {
            gridTemplateColumns: "auto auto",
          },

          ["@media (max-width: 730px)"]: {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box
          className="baseinfo-wrapper"
          sx={{
            gridColumn: "span 2",
            ["@media (max-width: 730px)"]: {
              gridColumn: "auto",
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
          <PrintOff>
            <Inventory />
          </PrintOff>
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
              <TabsPanel />
            </Grid>
          </Grid>
        </Box>

        <PrintOn
          sx={{
            gridColumn: "span 2",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
            <Box
              sx={{
                gridColumn: "span 2",
              }}
            >
              <Talents />
            </Box>
            <Stack rowGap={2}>
              <Inventory />
              <Notes />
            </Stack>
            <Box>
              <MoralValues />
            </Box>
          </Box>
        </PrintOn>
      </Box>
    </Box>
  );
}

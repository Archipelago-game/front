import { Box, Divider, IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import type { ReactNode } from "react";
import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { mapRace } from "../../../consts/map-race.const.ts";

import OppositeColorSectionCard from "../../components/section/OppositeColorSectionCard.tsx";

const HighlightSpan = (props: { children: ReactNode }) => {
  const theme = useTheme();
  return (
    <Box
      component={"span"}
      sx={{ color: theme.palette.base.text.onLoweredStrong }}
    >
      {props.children}
    </Box>
  );
};

export default function BaseInfo() {
  const theme = useTheme();
  const { values } = useCustomFormContext();
  const base = theme.palette.base;
  if (!values) {
    return null;
  }

  return (
    <OppositeColorSectionCard>
      <Stack
        direction="row"
        columnGap={2}
        mb={1}
        pl={1}
        pr={3}
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Box>
          <HighlightSpan>
            <b>{values.name}</b>
          </HighlightSpan>
        </Box>
        <Stack
          direction="row"
          columnGap={2}
          rowGap={0}
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          <Stack
            direction="row"
            columnGap={2}
            flexWrap="wrap"
            justifyContent="flex-start"
          >
            <Box>
              Возраст:&nbsp;
              <HighlightSpan>{values.age}</HighlightSpan>
            </Box>
            <Box>
              Родина:&nbsp;
              <HighlightSpan>{values.homeland}</HighlightSpan>
            </Box>
          </Stack>
          <Stack
            direction="row"
            columnGap={2}
            flexWrap="wrap"
            justifyContent="flex-start"
          >
            <Box>Язык: {values.languages}</Box>
            <Box>
              Раса:&nbsp;
              <HighlightSpan>{mapRace[values.race]}</HighlightSpan>
            </Box>
          </Stack>
        </Stack>
      </Stack>
      <Divider sx={{ borderColor: base.outline }} />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <IconButton>
          <EditIcon sx={{ color: base.text.onLowered }} />
        </IconButton>
      </Box>
    </OppositeColorSectionCard>
  );
}

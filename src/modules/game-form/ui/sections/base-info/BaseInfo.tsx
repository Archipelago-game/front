import { Box, Divider, IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import type { ReactNode } from "react";
import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { mapRace } from "../../../consts/map-race.const.ts";

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
    <Box
      sx={{
        position: "relative",
        padding: 2,
        borderRadius: 1,
        background: base.surfaceLowered,
        color: base.text.onLowered,
      }}
    >
      <Stack direction="row" mb={1} pl={1} pr={1}>
        <Box>
          <HighlightSpan>
            <b>{values.name}</b>
          </HighlightSpan>
        </Box>
        <Stack direction="row" spacing={2} justifyContent="center" flexGrow={1}>
          <Box>
            Возраст:&nbsp;
            <HighlightSpan>{values.age}</HighlightSpan>
          </Box>
          <Box>
            Родина:&nbsp;
            <HighlightSpan>{values.homeland}</HighlightSpan>
          </Box>
          <Box>Язык: {values.languages}</Box>
          <Box>
            Раса:&nbsp;
            <HighlightSpan>{mapRace[values.race]}</HighlightSpan>
          </Box>
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
    </Box>
  );
}

import { Box, Divider, IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import type { JSX, ReactNode } from "react";
import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { mapRace } from "../../../consts/map-race.const.ts";

import OppositeColorSectionCard from "../../components/section/OppositeColorSectionCard.tsx";
import { useFormDialogContext } from "../../../../form-dialog/use-form-dialog.hook.ts";
import FormBaseInfo from "./FormBaseInfo.tsx";
import { useWatch } from "react-hook-form";

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
  const { methods } = useCustomFormContext();
  const [name, age, homeland, languages, race] = useWatch({
    control: methods.control,
    name: ["name", "age", "homeland", "languages", "race"],
  });
  const base = theme.palette.base;

  const { open } = useFormDialogContext();

  const callModal = (Content: () => JSX.Element) => {
    const content = () => <Content />;
    open({
      title: "Герой",
      content,
      onConfirm: () => {},
    });
  };

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
            <b>{name}</b>
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
              <HighlightSpan>{age}</HighlightSpan>
            </Box>
            <Box>
              Родина:&nbsp;
              <HighlightSpan>{homeland}</HighlightSpan>
            </Box>
          </Stack>
          <Stack
            direction="row"
            columnGap={2}
            flexWrap="wrap"
            justifyContent="flex-start"
          >
            <Box>Язык: {languages}</Box>
            <Box>
              Раса:&nbsp;
              <HighlightSpan>{mapRace[race]}</HighlightSpan>
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
        <IconButton onClick={() => callModal(FormBaseInfo)}>
          <EditIcon sx={{ color: base.text.onLowered }} fontSize="small" />
        </IconButton>
      </Box>
    </OppositeColorSectionCard>
  );
}

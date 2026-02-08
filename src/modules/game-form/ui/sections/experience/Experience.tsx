import { Box, useMediaQuery, Stack } from "@mui/material";
import { useWatch } from "react-hook-form";

import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useWatchRace } from "../base-info/use-watch-race.ts";

import BaseSectionCard from "../../components/section/BaseSectionCard.tsx";
import CustomTextField from "../../components/fields/custom-text-field/CustomTextField.tsx";
import { useTheme } from "@mui/material/styles";

export default function Experience() {
  const theme = useTheme();
  const { methods } = useCustomFormContext();
  const isBelow560 = useMediaQuery("(max-width: 560px)");
  const race = useWatchRace();
  const isImmortal = race === "immortal";

  // Отслеживаем изменения полей для вычисления оставшегося опыта
  const total = useWatch({
    control: methods.control,
    name: "experience.total",
    defaultValue: 0,
  });

  const used = useWatch({
    control: methods.control,
    name: "experience.used",
    defaultValue: 0,
  });

  // Вычисляем оставшийся опыт
  const remaining = total - used;

  return (
    <BaseSectionCard title="Опыт">
      <Box
        sx={{
          width: isBelow560 ? "100%" : isImmortal ? "100%" : "420px",
          ["@media (max-width: 868px)"]: {
            order: -1,
          },
          ["@media (max-width: 730px)"]: {
            order: 1,
          },
          ["@media (max-width: 560px)"]: {
            order: -1,
          },
          transition: "width 1s ease",
        }}
      >
        <Stack columnGap={3} rowGap={1} direction="row">
          {/* Засоленный опыт - только для бессмертных */}
          {isImmortal && (
            <CustomTextField
              title="Засоленный"
              textField={{ fieldName: "immortal.experience.salted" }}
            />
          )}

          <CustomTextField
            textField={{ fieldName: "experience.total" }}
            title="Всего"
          />

          <CustomTextField
            textField={{ fieldName: "experience.used" }}
            title="Исп."
          />

          {/* Оставшийся опыт - для всех персонажей */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
            <Box component="span" color={theme.palette.base.text.primary}>
              Оставшийся:
            </Box>
            <Box
              component="span"
              sx={{
                fontSize: "1.3em",
                fontWeight: 600,
                color: remaining < 0 ? "error.main" : theme.palette.base.accent,
              }}
            >
              {remaining}
            </Box>
          </Box>
        </Stack>
      </Box>
    </BaseSectionCard>
  );
}

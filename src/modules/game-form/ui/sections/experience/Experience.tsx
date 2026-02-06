import CustomLabel from "../../components/CustomLabel.tsx";

import { Box, useMediaQuery, Typography } from "@mui/material";
import { useWatch } from "react-hook-form";
import BaseField from "../../components/BaseField.tsx";

import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useWatchRace } from "../base-info/use-watch-race.ts";

const styles = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.2em",
};

export default function Experience() {
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
      <CustomLabel
        label={{ text: "Опыт" }}
        sx={{
          flex: "1 1 1px",
        }}
      >
        <Box
          sx={{
            ...styles,
          }}
        >
          {/* Засоленный опыт - только для бессмертных */}
          {isImmortal && (
            <BaseField
              fieldName="immortal.experience.salted"
              label={{
                color: "secondary",
                text: "Засоленный",
              }}
              orientation="row"
            />
          )}

          <BaseField
            fieldName="experience.total"
            label={{
              color: "secondary",
              text: "Всего",
            }}
            orientation="row"
          />

          <BaseField
            fieldName="experience.used"
            label={{
              color: "secondary",
              text: "Исп.",
            }}
            orientation="row"
          />

          {/* Оставшийся опыт - для всех персонажей */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
            <Typography variant="body2" color="text.secondary">
              Оставшийся:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: remaining < 0 ? "error.main" : "text.primary",
              }}
            >
              {remaining}
            </Typography>
          </Box>
        </Box>
      </CustomLabel>
    </Box>
  );
}

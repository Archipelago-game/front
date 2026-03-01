import { useMemo, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import type { MoralValue } from "../../../modules/game-form/types/form/form.type.ts";
import type { GenerationStepComponentProps } from "../types.ts";

const MORAL_VALUE_PROMPTS: MoralValue = {
  authority: "К тем, кто превосходит меня… мой персонаж относится…",
  pride: "К тем, кто слабее меня… мой персонаж относится…",
  rivalry: "К тем, кто равен мне… мой персонаж относится…",
  idealism:
    "Мой персонаж убеждён, что с течением времени он и мир вокруг него…",
  individualism: "Глубоко внутри мой персонаж убеждён, что…",
};

const LABELS: { key: keyof MoralValue; label: string }[] = [
  { key: "authority", label: "Авторитет" },
  { key: "pride", label: "Гордыня" },
  { key: "rivalry", label: "Соперничество" },
  { key: "idealism", label: "Идеализм" },
  { key: "individualism", label: "Личность" },
];

function getInitialValues(
  characterData?: GenerationStepComponentProps["characterData"],
): MoralValue {
  const mv = characterData?.moralValue;
  if (!mv) {
    return { ...MORAL_VALUE_PROMPTS };
  }

  const empty = (v: string) => v == null || v.trim() === "";
  if (Object.values(mv).every(empty)) {
    return { ...MORAL_VALUE_PROMPTS };
  }

  return { ...MORAL_VALUE_PROMPTS, ...mv };
}

export default function StepValues({
  characterData,
  currentValue,
  setCurrentSelectValue,
}: GenerationStepComponentProps) {
  const isCat = characterData?.race === "cat";
  const initial = useMemo(
    () => getInitialValues(characterData),
    [characterData],
  );

  useEffect(() => {
    setCurrentSelectValue({ moralValue: initial });
  }, []);

  if (isCat) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography>
          Ценности недоступны вашему персонажу из-за природы.
        </Typography>
        <Typography>
          <a
            href="/character-rules/create-character"
            target="_blank"
            rel="noopener noreferrer"
          >
            Правила
          </a>
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 1 }}
    >
      {LABELS.map(({ key, label }) => (
        <TextField
          key={key}
          label={label}
          multiline
          variant="outlined"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          rows={4}
          value={currentValue?.moralValue?.[key]}
          onChange={(e) => {
            setCurrentSelectValue((prev) => {
              return {
                moralValue: {
                  ...(prev?.moralValue ?? initial),
                  [key]: e.target.value,
                },
              };
            });
          }}
        />
      ))}
    </Box>
  );
}

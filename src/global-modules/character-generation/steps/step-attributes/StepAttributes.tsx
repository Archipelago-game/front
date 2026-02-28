import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { GenerationStepComponentProps } from "../../types.ts";
import type { DiceRollRequest, DiceRollResultCallback } from "../../types.ts";
import DiceRollBlock from "../../DiceRollBlock.tsx";
import {
  ATTRIBUTE_ORDER,
  ATTRIBUTE_MAX_MORTAL,
  ATTRIBUTE_POINTS_TOTAL,
  ATTRIBUTE_BASE_PURCHASE,
  getAttributeBonusFromD6,
} from "../../consts/attribute-options.const.ts";
import type { Stats } from "../../../../modules/game-form/types/form/attributes.type.ts";
import type { DistributionMethod } from "./step-attributes.type.ts";
import { getRemainingForStandard } from "./get-remaining-for-standard.ts";

const ATTRIBUTE_NAMES: Record<keyof Stats, string> = {
  dexterity: "Ловкость",
  strength: "Сила",
  coordination: "Координация",
  insight: "Проницательность",
  intelligence: "Интеллект",
  willpower: "Воля",
};

export default function StepAttributes({
  characterData,
  isSubmitting = false,
  currentValue,
  setCurrentSelectValue,
}: GenerationStepComponentProps) {
  const [method, setMethod] = useState<DistributionMethod>("standard");

  const race = characterData?.race;
  const isImmortal = race === "immortal";

  const spentPoints = useMemo(() => {
    return ATTRIBUTE_ORDER.reduce(
      (sum, key) =>
        sum +
        ((currentValue?.attributeValues?.[key] ?? ATTRIBUTE_BASE_PURCHASE) -
          ATTRIBUTE_BASE_PURCHASE),
      0,
    );
  }, [currentValue?.attributeValues]);

  const hasValueBelow6 = useMemo(() => {
    return ATTRIBUTE_ORDER.some((k) => {
      const v = currentValue?.attributeValues?.[k];
      return typeof v === "number" && v < 6;
    });
  }, [currentValue?.attributeValues]);

  const diceRequest: DiceRollRequest = { sides: 6, count: 6 };
  const handleDiceResult: DiceRollResultCallback = (values) => {
    const next: Partial<Record<keyof Stats, number>> = {};
    ATTRIBUTE_ORDER.forEach((key, i) => {
      next[key] = 8 + getAttributeBonusFromD6(values[i]);
    });
    handleSelect(next);
  };

  const resetForMethod = (newMethod: DistributionMethod) => {
    setMethod(newMethod);
    if (newMethod === "purchase") {
      const initial: Partial<Record<keyof Stats, number>> = {};
      ATTRIBUTE_ORDER.forEach((k) => {
        initial[k] = ATTRIBUTE_BASE_PURCHASE;
      });
      handleSelect(initial);
    } else {
      handleSelect({});
    }
  };

  useEffect(() => {
    handleSelect({});
  }, []);

  const handleSelect = (selected: Partial<Record<keyof Stats, number>>) => {
    setCurrentSelectValue((prev) => ({
      attributeValues: { ...prev?.attributeValues, ...selected },
    }));
  };

  return (
    <Box>
      <Typography variant="h6">Атрибуты</Typography>
      {isImmortal && (
        <Typography sx={{ mt: 1, mb: 1 }} color="text.secondary">
          На старте лимит 12; до 14 — только «засоленным» опытом после смерти.
        </Typography>
      )}
      <Box sx={{ display: "flex", gap: 1, mt: 2, mb: 2, flexWrap: "wrap" }}>
        <Button
          variant={method === "standard" ? "contained" : "outlined"}
          onClick={() => resetForMethod("standard")}
        >
          Стандартный набор
        </Button>
        <Button
          variant={method === "purchase" ? "contained" : "outlined"}
          onClick={() => resetForMethod("purchase")}
        >
          Покупка очками
        </Button>
        <Button
          variant={method === "random" ? "contained" : "outlined"}
          onClick={() => resetForMethod("random")}
        >
          Случайные
        </Button>
      </Box>

      {method === "standard" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Назначьте каждое значение из набора [8, 8, 9, 9, 10, 11] одному
            атрибуту.
          </Typography>
          {ATTRIBUTE_ORDER.map((key) => (
            <FormControl key={key} size="small" sx={{ minWidth: 160 }}>
              <InputLabel>{ATTRIBUTE_NAMES[key]}</InputLabel>
              <Select
                value={currentValue?.attributeValues?.[key] ?? ""}
                label={ATTRIBUTE_NAMES[key]}
                onChange={(e: SelectChangeEvent<number>) =>
                  handleSelect({ [key]: Number(e.target.value) })
                }
              >
                {currentValue?.attributeValues &&
                  getRemainingForStandard(
                    currentValue.attributeValues,
                    key,
                  ).map((v, i) => (
                    <MenuItem key={`${key}-${i}-${v}`} value={v}>
                      {v}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          ))}
        </Box>
      )}

      {method === "purchase" && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            База 6 для всех. Очков: {spentPoints} / {ATTRIBUTE_POINTS_TOTAL}.
            Мин 6, макс {ATTRIBUTE_MAX_MORTAL}. Один атрибут может быть 6, один
            — 12.
          </Typography>
          {ATTRIBUTE_ORDER.map((key) => (
            <Box key={key} sx={{ mb: 1 }}>
              <Typography variant="body2">
                {ATTRIBUTE_NAMES[key]}:{" "}
                {currentValue?.attributeValues?.[key] ??
                  ATTRIBUTE_BASE_PURCHASE}
              </Typography>
              <Slider
                value={
                  currentValue?.attributeValues?.[key] ??
                  ATTRIBUTE_BASE_PURCHASE
                }
                min={ATTRIBUTE_BASE_PURCHASE}
                max={ATTRIBUTE_MAX_MORTAL}
                step={1}
                marks
                valueLabelDisplay="auto"
                onChange={(_, value) =>
                  handleSelect({
                    [key]: Array.isArray(value) ? value[0] : value,
                  })
                }
              />
            </Box>
          ))}
        </Box>
      )}

      {method === "random" && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            К6 на каждый атрибут. Бонус: 1→+1, 2→+2, 3–4→0, 5→+2, 6→+3. База 8.
          </Typography>
          <DiceRollBlock
            diceRequest={diceRequest}
            onDiceResult={handleDiceResult}
            disabled={isSubmitting}
          />
          {currentValue?.attributeValues &&
            Object.keys(currentValue?.attributeValues).length > 0 && (
              <Box sx={{ mt: 2 }}>
                {ATTRIBUTE_ORDER.map((key) => (
                  <Typography key={key}>
                    {ATTRIBUTE_NAMES[key]}:{" "}
                    {currentValue?.attributeValues?.[key]}
                  </Typography>
                ))}
              </Box>
            )}
        </>
      )}

      {hasValueBelow6 && (
        <Typography sx={{ mt: 1, mb: 1 }} color="warning.main">
          Значение ниже 6 — заметный изъян по правилам.
        </Typography>
      )}
    </Box>
  );
}

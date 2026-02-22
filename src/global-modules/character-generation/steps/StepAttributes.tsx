import { useState, useMemo } from "react";
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
import type { GenerationStepComponentProps } from "../types.ts";
import type { DiceRollRequest, DiceRollResultCallback } from "../types.ts";
import DiceRollBlock from "../DiceRollBlock.tsx";
import {
  ATTRIBUTE_ORDER,
  ATTRIBUTE_MAX_MORTAL,
  STANDARD_ATTRIBUTE_SET,
  ATTRIBUTE_POINTS_TOTAL,
  ATTRIBUTE_BASE_PURCHASE,
  getAttributeBonusFromD6,
} from "../consts/attribute-options.const.ts";
import type { Stats } from "../../../modules/game-form/types/form/attributes.type.ts";

type DistributionMethod = "standard" | "purchase" | "random";

const ATTRIBUTE_NAMES: Record<keyof Stats, string> = {
  dexterity: "Ловкость",
  strength: "Сила",
  coordination: "Координация",
  insight: "Проницательность",
  intelligence: "Интеллект",
  willpower: "Воля",
};

function getRemainingForStandard(
  attributeValues: Partial<Record<keyof Stats, number>>,
  excludeKey: keyof Stats,
): number[] {
  const used = ATTRIBUTE_ORDER.filter((k) => k !== excludeKey)
    .map((k) => attributeValues[k])
    .filter((v): v is number => typeof v === "number");
  const remaining = STANDARD_ATTRIBUTE_SET.slice();
  for (const v of used) {
    const idx = remaining.indexOf(v);
    if (idx !== -1) remaining.splice(idx, 1);
  }
  return remaining.sort((a, b) => a - b);
}

function isStandardValid(
  attributeValues: Partial<Record<keyof Stats, number>>,
): boolean {
  const values = ATTRIBUTE_ORDER.map((k) => attributeValues[k]).filter(
    (v): v is number => typeof v === "number",
  );
  if (values.length !== 6) return false;
  const sorted = [...values].sort((a, b) => a - b);
  const expected = [...STANDARD_ATTRIBUTE_SET].sort((a, b) => a - b);
  return sorted.every((v, i) => v === expected[i]);
}

function isPurchaseValid(
  attributeValues: Partial<Record<keyof Stats, number>>,
): boolean {
  const values = ATTRIBUTE_ORDER.map(
    (k) => attributeValues[k] ?? ATTRIBUTE_BASE_PURCHASE,
  );
  const spent = values.reduce((s, v) => s + (v - ATTRIBUTE_BASE_PURCHASE), 0);
  if (spent !== ATTRIBUTE_POINTS_TOTAL) return false;
  const inRange = values.every(
    (v) => v >= ATTRIBUTE_BASE_PURCHASE && v <= ATTRIBUTE_MAX_MORTAL,
  );
  if (!inRange) return false;
  const count6 = values.filter((v) => v === 6).length;
  const count12 = values.filter((v) => v === 12).length;
  return count6 <= 1 && count12 <= 1;
}

export default function StepAttributes({
  characterData,
  onComplete,
  isSubmitting = false,
}: GenerationStepComponentProps) {
  const [method, setMethod] = useState<DistributionMethod>("standard");
  const [attributeValues, setAttributeValues] = useState<
    Partial<Record<keyof Stats, number>>
  >({});

  const race = characterData?.race;
  const isImmortal = race === "immortal";
  const maxAttr = ATTRIBUTE_MAX_MORTAL;

  const spentPoints = useMemo(() => {
    return ATTRIBUTE_ORDER.reduce(
      (sum, key) =>
        sum +
        ((attributeValues[key] ?? ATTRIBUTE_BASE_PURCHASE) -
          ATTRIBUTE_BASE_PURCHASE),
      0,
    );
  }, [attributeValues]);

  const hasValueBelow6 = useMemo(() => {
    return ATTRIBUTE_ORDER.some((k) => {
      const v = attributeValues[k];
      return typeof v === "number" && v < 6;
    });
  }, [attributeValues]);

  function isValid(): boolean {
    if (method === "standard") return isStandardValid(attributeValues);
    if (method === "purchase") return isPurchaseValid(attributeValues);
    if (method === "random")
      return ATTRIBUTE_ORDER.every(
        (k) => typeof attributeValues[k] === "number",
      );
    return false;
  }

  const handleNext = () => {
    if (isValid() && attributeValues)
      onComplete?.({
        attributeValues: attributeValues as Partial<
          Record<keyof Stats, number>
        >,
      });
  };

  const handleStandardChange = (key: keyof Stats, value: number) => {
    setAttributeValues((prev) => ({ ...prev, [key]: value }));
  };

  const handlePurchaseChange = (key: keyof Stats, value: number) => {
    setAttributeValues((prev) => ({ ...prev, [key]: value }));
  };

  const diceRequest: DiceRollRequest = { sides: 6, count: 6 };
  const handleDiceResult: DiceRollResultCallback = (values) => {
    const next: Partial<Record<keyof Stats, number>> = {};
    ATTRIBUTE_ORDER.forEach((key, i) => {
      next[key] = 8 + getAttributeBonusFromD6(values[i]);
    });
    setAttributeValues(next);
  };

  const resetForMethod = (newMethod: DistributionMethod) => {
    setMethod(newMethod);
    if (newMethod === "purchase") {
      const initial: Partial<Record<keyof Stats, number>> = {};
      ATTRIBUTE_ORDER.forEach((k) => {
        initial[k] = ATTRIBUTE_BASE_PURCHASE;
      });
      setAttributeValues(initial);
    } else {
      setAttributeValues({});
    }
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
                value={attributeValues[key] ?? ""}
                label={ATTRIBUTE_NAMES[key]}
                onChange={(e: SelectChangeEvent<number>) =>
                  handleStandardChange(key, Number(e.target.value))
                }
              >
                {getRemainingForStandard(attributeValues, key).map((v, i) => (
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
            Мин 6, макс {maxAttr}. Один атрибут может быть 6, один — 12.
          </Typography>
          {ATTRIBUTE_ORDER.map((key) => (
            <Box key={key} sx={{ mb: 1 }}>
              <Typography variant="body2">
                {ATTRIBUTE_NAMES[key]}:{" "}
                {attributeValues[key] ?? ATTRIBUTE_BASE_PURCHASE}
              </Typography>
              <Slider
                value={attributeValues[key] ?? ATTRIBUTE_BASE_PURCHASE}
                min={ATTRIBUTE_BASE_PURCHASE}
                max={maxAttr}
                step={1}
                marks
                valueLabelDisplay="auto"
                onChange={(_, value) =>
                  handlePurchaseChange(
                    key,
                    Array.isArray(value) ? value[0] : value,
                  )
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
          {Object.keys(attributeValues).length > 0 && (
            <Box sx={{ mt: 2 }}>
              {ATTRIBUTE_ORDER.map((key) => (
                <Typography key={key}>
                  {ATTRIBUTE_NAMES[key]}: {attributeValues[key]}
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

      <Button
        variant="contained"
        onClick={handleNext}
        disabled={isSubmitting || !isValid()}
      >
        Далее
      </Button>
    </Box>
  );
}

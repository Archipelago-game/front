import type { Stats } from "../../../../modules/game-form/types/form/attributes.type.ts";
import {
  ATTRIBUTE_BASE_PURCHASE,
  ATTRIBUTE_MAX_MORTAL,
  ATTRIBUTE_ORDER,
  ATTRIBUTE_POINTS_TOTAL,
  STANDARD_ATTRIBUTE_SET,
} from "../../consts/attribute-options.const.ts";

type Props = Partial<Record<keyof Stats, number>>;

export function isStandardValid(attributeValues: Props): boolean {
  const values = ATTRIBUTE_ORDER.map((k) => attributeValues[k]).filter(
    (v): v is number => typeof v === "number",
  );
  if (values.length !== 6) return false;
  const sorted = [...values].sort((a, b) => a - b);
  const expected = [...STANDARD_ATTRIBUTE_SET].sort((a, b) => a - b);
  return sorted.every((v, i) => v === expected[i]);
}

export function isPurchaseValid(attributeValues: Props): boolean {
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

export function isRandomValid(attributeValues: Props) {
  return ATTRIBUTE_ORDER.every((k) => typeof attributeValues?.[k] === "number");
}

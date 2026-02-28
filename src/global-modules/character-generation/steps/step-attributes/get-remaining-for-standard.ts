import type { Stats } from "../../../../modules/game-form/types/form/attributes.type.ts";
import {
  ATTRIBUTE_ORDER,
  STANDARD_ATTRIBUTE_SET,
} from "../../consts/attribute-options.const.ts";

export function getRemainingForStandard(
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

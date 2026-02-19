import type { Stats } from "../../../modules/game-form/types/form/attributes.type.ts";

/** Стандартный набор значений для распределения по атрибутам */
export const STANDARD_ATTRIBUTE_SET: number[] = [8, 8, 9, 9, 10, 11];

/** Порядок атрибутов (по правилам): Ловкость, Сила, Координация, Проницательность, Интеллект, Воля */
export const ATTRIBUTE_ORDER: (keyof Stats)[] = [
  "dexterity",
  "strength",
  "coordination",
  "insight",
  "intelligence",
  "willpower",
];

/** Очков при покупке очками */
export const ATTRIBUTE_POINTS_TOTAL = 19;
/** Базовое значение при покупке */
export const ATTRIBUTE_BASE_PURCHASE = 6;
/** Максимум для смертных/вернувшихся на старте */
export const ATTRIBUTE_MAX_MORTAL = 12;

/**
 * Бонус к атрибуту от результата К6 (случайный метод): 1→+1, 2→+2, 3–4→0, 5→+2, 6→+3.
 */
export function getAttributeBonusFromD6(value: number): number {
  if (value === 1) return 1;
  if (value === 2) return 2;
  if (value === 3 || value === 4) return 0;
  if (value === 5) return 2;
  return 3; // 6
}

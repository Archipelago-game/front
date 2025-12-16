import type { StatementColorMapping } from "../../../../components/check-icon-box/check-icon-box.type.ts";

/**
 * Цветовая схема для чекбоксов зарядов оружия
 * - true (отмеченное) - зеленый цвет, символизирует доступный заряд
 * - false (неотмеченное) - серый цвет, символизирует использованный заряд
 */
export const LOADS_STATEMENT_COLOR_MAP: StatementColorMapping = new Map([
  [true, "#43a047"],  // Material Green 600 - отмеченное (заряд доступен)
  [false, "#666"],    // Серый - неотмеченное (заряд использован)
]);

import type { StatementColorMapping } from "../../components/fields/check-icon-box/check-icon-box.type.ts";

/**
 * Цветовая схема для чекбоксов удачи/решимости
 * - true (отмеченное) - золотой/янтарный цвет, символизирует использованную удачу
 * - false (неотмеченное) - серый цвет, символизирует доступную удачу
 */
export const LUCK_STATEMENT_COLOR_MAP: StatementColorMapping = new Map([
  [true, "#f57c00"], // Material Orange 700 - отмеченное (удача использована)
  [false, "#666"], // Серый - неотмеченное (удача доступна)
]);

import type { StatementColorMapping } from "../../../components/check-icon-box/check-icon-box.type.ts";

/**
 * Цветовая схема для чекбоксов физического здоровья
 * - true (отмеченное) - красный цвет, символизирует полученный урон
 * - false (неотмеченное) - серый цвет, символизирует доступное здоровье
 */
export const HEALTH_STATEMENT_COLOR_MAP: StatementColorMapping = new Map([
  [true, "#c62828"], // Material Red 800 - отмеченное (урон получен)
  [false, "#666"], // Серый - неотмеченное (здоровье доступно)
]);

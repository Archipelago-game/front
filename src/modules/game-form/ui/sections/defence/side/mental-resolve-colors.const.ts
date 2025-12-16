import type { StatementColorMapping } from "../../../components/check-icon-box/check-icon-box.type.ts";

/**
 * Цветовая схема для чекбоксов ментального здоровья (решимость)
 * - true (отмеченное) - фиолетовый цвет, символизирует психический урон/стресс
 * - false (неотмеченное) - серый цвет, символизирует доступную решимость
 */
export const MENTAL_RESOLVE_STATEMENT_COLOR_MAP: StatementColorMapping =
  new Map([
    [true, "#7b1fa2"], // Material Purple 700 - отмеченное (стресс получен)
    [false, "#666"], // Серый - неотмеченное (решимость доступна)
  ]);

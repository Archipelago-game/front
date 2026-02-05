import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import type { Talent } from "../../../types/form/form.type.ts";

/**
 * Преобразует Talent (форма персонажа) в TalentGuideType (для фильтров)
 *
 * Маппинг полей:
 * - effect → description
 * - остальные поля совпадают
 */
export function talentToGuide(talent: Talent): TalentGuideType {
  return {
    name: talent.name,
    branch: talent.branch,
    description: talent.effect,  // effect → description
    rang: talent.rang,
  };
}

/**
 * Преобразует TalentGuideType (справочник) в Talent (форма персонажа)
 *
 * Маппинг полей:
 * - description → effect
 * - остальные поля совпадают
 */
export function talentGuideToTalent(guide: TalentGuideType): Talent {
  return {
    name: guide.name,
    branch: guide.branch,
    effect: guide.description,  // description → effect
    rang: guide.rang,
  };
}

/**
 * Преобразует массив талантов персонажа в формат для фильтров
 */
export function talentsToGuides(talents: Talent[]): TalentGuideType[] {
  return talents.map(talentToGuide);
}

import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import type {
  AdaptedTalentField,
  Talent,
  TalentField,
} from "../../../types/form/form.type.ts";

/**
 * Преобразует массив талантов персонажа в формат для фильтров
 */
export function talentsToGuides(talents: Talent[]): TalentGuideType[] {
  return talents.map(talentToGuide);
}
export function talentToGuide(talent: Talent): TalentGuideType {
  return {
    name: talent.name,
    branch: talent.branch,
    description: talent.effect, // effect → description
    rang: talent.rang,
  };
}

/**
 * Адаптирует для работы с TalentsGuideFilter и отображением в HeroTalents
 *
 *
 */
export function adaptTalentFields(
  talents: TalentField[],
): AdaptedTalentField[] {
  return talents.map((talent, index) => ({
    description: talent.effect,
    ...talent,
    fieldIndex: index,
  }));
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
    effect: guide.description, // description → effect
    rang: guide.rang,
  };
}

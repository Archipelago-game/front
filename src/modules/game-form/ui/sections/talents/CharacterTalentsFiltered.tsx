import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import type { Talent } from "../../../types/form/form.type.ts";
import TalentsGuideFilteredList from "./TalentsGuideFilteredList.tsx";
import { talentsToGuides } from "./talent-converters.utils.ts";

export interface CharacterTalentsFilteredProps {
  /**
   * Таланты персонажа из формы
   */
  talents: Talent[];

  /**
   * Callback при выборе таланта
   * @param talent - выбранный талант в формате TalentGuideType
   */
  onChoose: (talent: TalentGuideType) => void;
}

/**
 * Компонент для отображения и фильтрации талантов персонажа
 *
 * Использует TalentsFilteredList с преобразованием типов:
 * Talent[] → TalentGuideType[]
 */
export default function CharacterTalentsFiltered({
  talents,
  onChoose,
}: CharacterTalentsFilteredProps) {
  // Преобразуем таланты персонажа в формат для фильтров
  const talentsForFilter = talentsToGuides(talents);

  return (
    <TalentsGuideFilteredList talents={talentsForFilter} onChoose={onChoose} />
  );
}

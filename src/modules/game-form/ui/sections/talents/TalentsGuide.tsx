import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import TalentsGuideFilteredList from "./TalentsGuideFilteredList.tsx";

interface Props<T extends TalentGuideType> {
  talents: T[];
  onChoose: (talent: T) => void;
}

/**
 * Справочник талантов с фильтрацией
 * Тонкая обертка над TalentsFilteredList для работы с глобальным справочником
 */
export default function TalentsGuide<T extends TalentGuideType>({
  onChoose,
  talents,
}: Props<T>) {
  return <TalentsGuideFilteredList<T> talents={talents} onChoose={onChoose} />;
}

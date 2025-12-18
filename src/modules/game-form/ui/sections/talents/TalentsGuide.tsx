import { talentsGuide } from "../../../../../data/talents-guide.ts";
import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import TalentsFilteredList from "./TalentsFilteredList.tsx";

interface Props {
  onChoose: (talent: TalentGuideType) => void;
}

/**
 * Справочник талантов с фильтрацией
 * Тонкая обертка над TalentsFilteredList для работы с глобальным справочником
 */
export default function TalentsGuide({ onChoose }: Props) {
  return <TalentsFilteredList talents={talentsGuide} onChoose={onChoose} />;
}

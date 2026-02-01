import type { TalentGuideType } from "../../../../../../data/talents-guide.ts";
import type { TalentsFilterFormValues } from "./TalentsFilterForm.tsx";

/**
 * Фильтрация талантов по ветке
 * @param talents - массив талантов для фильтрации
 * @param branch - название ветки или "allBranches" для всех веток
 * @returns отфильтрованный массив талантов
 */
export function filterByBranch<T extends TalentGuideType>(
  talents: T[],
  branch: string,
): T[] {
  if (branch === "allBranches") {
    return talents;
  }
  return talents.filter((talent) => talent.branch === branch);
}

/**
 * Фильтрация талантов по содержимому (имя или описание)
 * Case-insensitive поиск
 * @param talents - массив талантов для фильтрации
 * @param searchValue - строка для поиска
 * @returns отфильтрованный массив талантов
 */
export function filterByContent<T extends TalentGuideType>(
  talents: T[],
  searchValue: string,
): T[] {
  if (searchValue === "") {
    return talents;
  }

  const searchLower = searchValue.toLowerCase();

  return talents.filter(
    (talent) =>
      talent.name.toLowerCase().includes(searchLower) ||
      talent.description.toLowerCase().includes(searchLower),
  );
}

/**
 * Применяет все фильтры к списку талантов
 * Порядок: сначала по ветке, потом по содержимому
 * @param talents - полный массив талантов
 * @param filters - значения фильтров из формы
 * @returns отфильтрованный массив талантов
 */
export function applyTalentsFilters<T extends TalentGuideType>(
  talents: T[],
  filters: TalentsFilterFormValues,
): T[] {
  let filtered = filterByBranch(talents, filters.branch);
  filtered = filterByContent(filtered, filters.search);
  return filtered;
}

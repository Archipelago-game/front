import type { AdaptedTalentField } from "../../../../types/form/form.type.ts";

export interface TalentGroup {
  branch: string;
  talents: AdaptedTalentField[];
}

export function groupTalentsByBranch(
  fields: AdaptedTalentField[],
): TalentGroup[] {
  // Создаем Map для группировки
  const groupsMap = new Map<string, AdaptedTalentField[]>();

  // Группируем таланты, сохраняя индексы
  fields.forEach((talent) => {
    const branch = talent.branch || "Без ветки";
    if (!groupsMap.has(branch)) {
      groupsMap.set(branch, []);
    }
    groupsMap.get(branch)!.push(talent);
  });

  // Преобразуем Map в массив и сортируем
  return (
    Array.from(groupsMap.entries())
      .map(([branch, talents]) => ({
        branch,
        // Сортируем таланты внутри группы по рангу
        talents: talents.sort((a, b) => a.rang - b.rang),
      }))
      // Сортируем группы по названию ветки
      .sort((a, b) => a.branch.localeCompare(b.branch, "ru"))
  );
}

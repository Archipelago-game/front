import type { FieldArrayWithId } from "react-hook-form";
import type { FormType } from "../../../types/form/form.type.ts";

type TalentField = FieldArrayWithId<FormType, "talents.list", "id">;

export interface TalentWithIndex {
  talent: TalentField;
  index: number;
}

export interface TalentGroup {
  branch: string;
  talents: TalentWithIndex[];
}

export function groupTalentsByBranch(fields: TalentField[]): TalentGroup[] {
  // Создаем Map для группировки
  const groupsMap = new Map<string, TalentWithIndex[]>();

  // Группируем таланты, сохраняя индексы
  fields.forEach((talent, index) => {
    const branch = talent.branch || "Без ветки";
    if (!groupsMap.has(branch)) {
      groupsMap.set(branch, []);
    }
    groupsMap.get(branch)!.push({ talent, index });
  });

  // Преобразуем Map в массив и сортируем
  const groups: TalentGroup[] = Array.from(groupsMap.entries())
    .map(([branch, talents]) => ({
      branch,
      // Сортируем таланты внутри группы по рангу
      talents: talents.sort((a, b) => a.talent.rang - b.talent.rang),
    }))
    // Сортируем группы по названию ветки
    .sort((a, b) => a.branch.localeCompare(b.branch, "ru"));

  return groups;
}

import { useRef, useState } from "react";
import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import type { TalentsFilterFormValues } from "./TalentsGuideFilterForm.tsx";
import { TALENTS_FILTER_FORM_DEFAULT_VALUES } from "./filter-form-default-values.const.ts";
import { applyTalentsFilters } from "./talents-filter.utils.ts";

export function useTalentsGuideFilter<T extends TalentGuideType>(talents: T[]) {
  // Состояние отфильтрованного списка (изначально показываем все)
  const [filteredTalents, setFilteredTalents] = useState<T[]>(talents);

  // Ref для хранения текущих значений фильтров
  const filterValues = useRef<TalentsFilterFormValues>(
    TALENTS_FILTER_FORM_DEFAULT_VALUES,
  );

  const handleFilterChange = (values: TalentsFilterFormValues) => {
    const filtered = applyTalentsFilters(talents, values);
    setFilteredTalents(filtered);
    filterValues.current = values;
  };

  return { filteredTalents, setFilteredTalents, handleFilterChange };
}

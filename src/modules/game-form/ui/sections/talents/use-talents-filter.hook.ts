import { useMemo, useState } from "react";
import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import type { TalentsFilterFormValues } from "./TalentsFilterForm.tsx";
import { TALENTS_FILTER_FORM_DEFAULT_VALUES } from "./filter-form-default-values.const.ts";
import { applyTalentsFilters } from "./talents-filter.utils.ts";

export function useTalentsGuideFilter<T extends TalentGuideType>(talents: T[]) {
  const [filterValues, setFilterValues] = useState<TalentsFilterFormValues>(
    TALENTS_FILTER_FORM_DEFAULT_VALUES,
  );

  const handleFilterChange = (values: TalentsFilterFormValues) => {
    setFilterValues(values);
  };

  const filteredTalents = useMemo(() => {
    return applyTalentsFilters(talents, filterValues);
  }, [talents, filterValues]);

  return { filteredTalents, handleFilterChange };
}

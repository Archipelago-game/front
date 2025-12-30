import { Grid, Box } from "@mui/material";
import { useState, useRef } from "react";
import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import TalentsFilterForm, {
  type TalentsFilterFormValues,
} from "./TalentsFilterForm.tsx";
import TalentsGuideLine from "./TalentsGuideLine.tsx";
import { TALENTS_FILTER_FORM_DEFAULT_VALUES } from "./filter-form-default-values.const.ts";
import { applyTalentsFilters } from "./talents-filter.utils.ts";

export interface TalentsFilteredListProps {
  /**
   * Полный список талантов для фильтрации
   */
  talents: TalentGuideType[];

  /**
   * Callback при выборе таланта из списка
   */
  onChoose: (talent: TalentGuideType) => void;
}

/**
 * Универсальный компонент для фильтрации и отображения списка талантов
 * Управляет состоянием фильтров и отфильтрованного списка
 * Использует debounce для оптимизации производительности
 */
export default function TalentsFilteredList({
  talents,
  onChoose,
}: TalentsFilteredListProps) {
  // Состояние отфильтрованного списка (изначально показываем все)
  const [filteredTalents, setFilteredTalents] =
    useState<TalentGuideType[]>(talents);

  // Ref для хранения текущих значений фильтров
  const filterValues = useRef<TalentsFilterFormValues>(
    TALENTS_FILTER_FORM_DEFAULT_VALUES,
  );

  /**
   * Обработчик изменения значений фильтров
   * Вызывается из TalentsFilterForm с debounce 500ms
   */
  const handleFilterChange = (values: TalentsFilterFormValues) => {
    const filtered = applyTalentsFilters(talents, values);
    setFilteredTalents(filtered);
    filterValues.current = values;
  };

  return (
    <>
      {/* Форма фильтрации (sticky позиция) */}
      <TalentsFilterForm talents={talents} onFormChange={handleFilterChange} />

      {/* Прокручиваемый список результатов */}
      <Box
        sx={{
          overflowY: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          paddingBottom: "30px",
        }}
      >
        <Grid container gap={2} justifyContent={"flex-end"} mb={1}>
          {filteredTalents.map((talent) => (
            <TalentsGuideLine
              key={`${talent.branch}${talent.rang}${talent.name}`}
              talent={talent}
              onChange={onChoose}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
}

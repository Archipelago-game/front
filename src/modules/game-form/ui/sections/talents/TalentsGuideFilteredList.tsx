import { Grid, Box } from "@mui/material";

import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import TalentsFilterForm from "./TalentsFilterForm.tsx";
import TalentsGuideLine from "./TalentsGuideLine.tsx";

import { useTalentsGuideFilter } from "./use-talents-filter.hook.ts";

export interface TalentsFilteredListProps<T extends TalentGuideType> {
  /**
   * Полный список талантов для фильтрации
   */
  talents: T[];

  /**
   * Callback при выборе таланта из списка
   */
  onChoose: (talent: T) => void;
}

/**
 * Универсальный компонент для фильтрации и отображения списка талантов
 * Управляет состоянием фильтров и отфильтрованного списка
 * Использует debounce для оптимизации производительности
 */
export default function TalentsGuideFilteredList<T extends TalentGuideType>({
  talents,
  onChoose,
}: TalentsFilteredListProps<T>) {
  const { filteredTalents, handleFilterChange } =
    useTalentsGuideFilter(talents);

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

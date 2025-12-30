import { Grid, Box } from "@mui/material";

import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import TalentsGuideFilterForm from "./TalentsGuideFilterForm.tsx";
import TalentsGuideLine from "./TalentsGuideLine.tsx";

import { useTalentsGuideFilter } from "./use-talents-filter.hook.ts";

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
export default function TalentsGuideFilteredList({
  talents,
  onChoose,
}: TalentsFilteredListProps) {
  const { filteredTalents, handleFilterChange } =
    useTalentsGuideFilter(talents);

  return (
    <>
      {/* Форма фильтрации (sticky позиция) */}
      <TalentsGuideFilterForm
        talents={talents}
        onFormChange={handleFilterChange}
      />

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

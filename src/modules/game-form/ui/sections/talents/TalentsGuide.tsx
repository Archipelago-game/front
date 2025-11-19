import { Grid } from "@mui/material";
import {
  type TalentGuideType,
  talentsGuide,
} from "../../../../../data/talents-guide.ts";
import TalentsGuideLine from "./TalentsGuideLine.tsx";
import { Box } from "@mui/system";
import { useRef, useState } from "react";

import TalentsFilterForm, {
  type TalentsFilterFormValues,
} from "./TalentsFilterForm.tsx";

import { TALENTS_FILTER_FORM_DEFAULT_VALUES } from "./filter-form-default-values.const.ts";

function filterByBranch(talents: TalentGuideType[], branch: string) {
  if (!branch) {
    return talents;
  }
  return talents.filter((talent) => talent.branch === branch);
}

function filterByContent(talents: TalentGuideType[], value: string) {
  return talents.filter(
    (talent) =>
      talent.name.includes(value) ||
      talent.description.toLowerCase().includes(value.toLowerCase()),
  );
}

export default function TalentsGuide() {
  const [talents, setTalents] = useState<TalentGuideType[]>(talentsGuide);
  const filterValues = useRef<TalentsFilterFormValues>(
    TALENTS_FILTER_FORM_DEFAULT_VALUES,
  );

  const onFilterFormChange = (values: TalentsFilterFormValues) => {
    let talentsFiltered: TalentGuideType[] = [];
    console.log("branch", values.branch);
    if (filterValues.current.branch !== values.branch) {
      talentsFiltered = filterByBranch(talentsGuide, values.branch);
    } else {
      talentsFiltered = talents;
    }
    talentsFiltered = filterByContent(talentsFiltered, values.search);
    setTalents(talentsFiltered);
    filterValues.current = values;
  };

  return (
    <>
      <TalentsFilterForm onFormChange={onFilterFormChange} />
      <Box
        sx={{
          overflowY: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          paddingBottom: "30px",
        }}
      >
        <Grid container gap={2} justifyContent={"flex-end"} mb={1}>
          {talents.map((talent) => (
            <TalentsGuideLine
              key={`${talent.branch}${talent.rang}`}
              {...talent}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
}

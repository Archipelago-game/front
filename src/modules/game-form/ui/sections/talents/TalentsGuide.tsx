import { Grid, type SelectChangeEvent } from "@mui/material";
import {
  type TalentGuideType,
  talentsGuide,
} from "../../../../../data/talents-guide.ts";
import TalentsGuideLine from "./TalentsGuideLine.tsx";
import { Box } from "@mui/system";
import { useState } from "react";
import { getUniqueTalentBranches } from "./get-unique-talent-branches.utils.ts";
import CustomSelect from "../../../../../common/components/custom-select/CustomSelect.tsx";

const branchOptions = getUniqueTalentBranches(talentsGuide).map((branch) => ({
  value: branch,
  label: branch,
}));

export default function TalentsGuide() {
  const [talents, setTalents] = useState<TalentGuideType[]>(talentsGuide);
  const [currentBranch, setCurrentBranch] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <Box sx={{ position: "sticky" }}>
        <CustomSelect
          value={currentBranch}
          options={branchOptions}
          displayEmpty={true}
          emptyOption={{ value: "", label: "Все ветки" }}
          onChange={(e) => setCurrentBranch(e.target.value)}
        />
      </Box>
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

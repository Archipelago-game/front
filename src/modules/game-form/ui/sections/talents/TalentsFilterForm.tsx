import { useForm, Controller } from "react-hook-form";
import { TextField, Box, Typography } from "@mui/material";
import CustomSelect from "../../../../../common/components/custom-select/CustomSelect.tsx";

import debounce from "lodash.debounce";
import { getUniqueTalentBranches } from "./get-unique-talent-branches.utils.ts";

import { talentsGuide } from "../../../../../data/talents-guide.ts";
import { useMemo } from "react";
import { TALENTS_FILTER_FORM_DEFAULT_VALUES } from "./filter-form-default-values.const.ts";

export interface TalentsFilterFormValues {
  branch: string;
  search: string;
}

interface Props {
  onFormChange: (values: TalentsFilterFormValues) => void;
}

const branchOptions = getUniqueTalentBranches(talentsGuide).map((branch) => ({
  value: branch,
  label: branch,
}));

export default function TalentsFilterForm(props: Props) {
  const { control, getValues } = useForm<TalentsFilterFormValues>({
    defaultValues: TALENTS_FILTER_FORM_DEFAULT_VALUES,
  });

  const onFormChange = useMemo(
    () => debounce(props.onFormChange, 500),
    [props.onFormChange],
  );

  const handleFormChange = () => {
    onFormChange(getValues());
  };

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        pb: 2,
      }}
    >
      <Controller
        name="branch"
        defaultValue=""
        control={control}
        render={({ field }) => (
          <CustomSelect<string>
            sx={{
              "& .MuiSelect-select": {
                padding: "4px",
                fontSize: "12px",
              },
            }}
            {...field}
            options={branchOptions}
            label="ветки"
            displayEmpty={true}
            emptyOption={{ value: "", label: "Все ветки" }}
            onChange={(e) => {
              field.onChange(e.target.value);
              handleFormChange();
            }}
          />
        )}
      />
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <Box>
            <Typography variant="body2" component="div">
              поиск
            </Typography>
            <TextField
              size="small"
              sx={{
                "& .MuiInputBase-input": {
                  // note стили полей ввода
                  padding: "6px",
                  fontSize: "12px",
                },
              }}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleFormChange();
              }}
            />
          </Box>
        )}
      />
    </Box>
  );
}

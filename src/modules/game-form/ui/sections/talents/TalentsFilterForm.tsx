import { useForm, Controller } from "react-hook-form";
import { TextField, Box, Typography } from "@mui/material";
import CustomSelect from "../../../../../common/components/custom-select/CustomSelect.tsx";

import debounce from "lodash.debounce";
import { getUniqueTalentBranches } from "./get-unique-talent-branches.utils.ts";

import { talentsGuide } from "../../../../../data/talents-guide.ts";
import { useMemo } from "react";
import {
  EMPTY_BRANCH_OPTION,
  TALENTS_FILTER_FORM_DEFAULT_VALUES,
} from "./filter-form-default-values.const.ts";

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

const styles = {
  width: {
    xs: "100%",
    sm: "auto",
  },
  flexGrow: {
    xs: 1,
    sm: 0,
  },
};

export default function TalentsFilterForm(props: Props) {
  const { control, getValues } = useForm<TalentsFilterFormValues>({
    defaultValues: TALENTS_FILTER_FORM_DEFAULT_VALUES,
  });

  const onFormChangeDebounced = useMemo(
    () => debounce(props.onFormChange, 500),
    [props.onFormChange],
  );

  const handleFormChange = (partial?: Partial<TalentsFilterFormValues>) => {
    const values = { ...getValues(), ...partial };
    if (partial?.branch !== undefined) {
      props.onFormChange(values);
    } else {
      onFormChangeDebounced(values);
    }
  };

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        flexWrap: "wrap",
        columnGap: 2,
        rowGap: 1,
        pb: 2,
      }}
    >
      <Controller
        name="branch"
        control={control}
        render={({ field }) => (
          <CustomSelect<string>
            sxSelect={{
              "& .MuiSelect-select": {
                padding: "4px",
                fontSize: "12px",
              },
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
            sxContainer={styles}
            {...field}
            options={branchOptions}
            label="ветки"
            displayEmpty={true}
            emptyOption={EMPTY_BRANCH_OPTION}
            onChange={(e) => {
              const newBranch = e.target.value;
              field.onChange(newBranch);
              handleFormChange({ branch: newBranch });
            }}
          />
        )}
      />
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <Box
            sx={{
              ...styles,
            }}
          >
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
                ...styles,
              }}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleFormChange({ search: e.target.value });
              }}
            />
          </Box>
        )}
      />
    </Box>
  );
}

import { useForm, Controller } from "react-hook-form";
import { TextField, Box, Typography } from "@mui/material";
import CustomSelect from "../../../../../common/components/custom-select/CustomSelect.tsx";

import debounce from "lodash.debounce";
import { getUniqueTalentBranches } from "./get-unique-talent-branches.utils.ts";

import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import { useMemo } from "react";
import {
  EMPTY_BRANCH_OPTION,
  TALENTS_FILTER_FORM_DEFAULT_VALUES,
} from "./filter-form-default-values.const.ts";

export interface TalentsFilterFormValues {
  branch: string;
  search: string;
}

interface Props<T extends TalentGuideType> {
  talents: T[];
  defaultValues?: TalentsFilterFormValues;
  onFormChange: (values: TalentsFilterFormValues) => void;
}

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

/**
 * Properties for the TalentsFilterForm component.
 *
 * @property talents
 * A collection of talent entities used exclusively to derive
 * filter options (for example, available branches).
 * The component does not mutate or filter this data.
 *
 * @property defaultValues
 * Initial values of the filter form fields.
 * If omitted, predefined default values are applied.
 *
 * @property onFormChange
 * Callback invoked when the filter form state changes.
 * Receives the complete set of current filter values.
 * The consumer is responsible for applying the filtering logic
 * and managing the presentation of the filtered results.
 */
export default function TalentsGuideFilterForm<T extends TalentGuideType>(
  props: Props<T>,
) {
  const { talents, defaultValues = TALENTS_FILTER_FORM_DEFAULT_VALUES } = props;
  const { control, getValues } = useForm<TalentsFilterFormValues>({
    defaultValues,
  });

  const branchOptions = useMemo(
    () =>
      getUniqueTalentBranches(talents).map((branch) => ({
        value: branch,
        label: branch,
      })),
    [props.talents],
  );

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
        columnGap: 2,
        rowGap: 1,
        pb: 2,
      }}
    >
      <Controller
        name="branch"
        defaultValue=""
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
                handleFormChange();
              }}
            />
          </Box>
        )}
      />
    </Box>
  );
}

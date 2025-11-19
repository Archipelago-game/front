import { useForm, Controller } from "react-hook-form";
import { TextField, Box } from "@mui/material";
import CustomSelect from "../../../../../common/components/custom-select/CustomSelect.tsx";

import debounce from "lodash.debounce";
import { getUniqueTalentBranches } from "./get-unique-talent-branches.utils.ts";

import { talentsGuide } from "../../../../../data/talents-guide.ts";

interface TalentsFilterFormValues {
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
    defaultValues: {
      branch: "",
      search: "",
    },
  });

  const onFormChange = debounce(props.onFormChange, 500);

  const handleFormChange = () => {
    onFormChange(getValues());
  };

  return (
    <Box sx={{ position: "sticky" }}>
      <Controller
        name="branch"
        control={control}
        render={({ field }) => (
          <CustomSelect
            value={field.value}
            options={branchOptions}
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
          <TextField
            size="small"
            {...field}
            onChange={(e) => {
              field.onChange(e);
              handleFormChange();
            }}
          />
        )}
      />
    </Box>
  );
}

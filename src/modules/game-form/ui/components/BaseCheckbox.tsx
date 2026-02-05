import { Box, Checkbox, type CheckboxProps } from "@mui/material";
import CustomLabel, { type CustomLabelProps } from "./CustomLabel.tsx";
import { Controller } from "react-hook-form";
import { useCustomFormContext } from "../../providers/use-custom-context-form.hook.ts";
import type { OnChangeCallbackType } from "../../types/on-change-callback.type.ts";

import type { FormBooleanField } from "../../types/field-utils.type.ts";

interface Props extends CheckboxProps {
  fieldName: FormBooleanField;
  label: CustomLabelProps;
}

export default function BaseCheckbox({ fieldName, label }: Props) {
  const { methods, onChange } = useCustomFormContext();

  const handleOnChange: OnChangeCallbackType = (field, e) => {
    if (!(e?.target instanceof HTMLInputElement)) {
      return;
    }
    field?.onChange(e?.target.checked);
    onChange();
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      <CustomLabel {...label} />
      <Controller
        name={fieldName}
        control={methods.control}
        render={({ field }) => (
          <Checkbox
            size={"medium"}
            slotProps={{}}
            sx={{ padding: 0 }}
            {...field}
            checked={field.value}
            onChange={(e) => handleOnChange(field, e)}
          />
        )}
      />
    </Box>
  );
}

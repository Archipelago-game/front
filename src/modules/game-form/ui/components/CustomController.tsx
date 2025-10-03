import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { useFormContext } from "../../providers/use-context-form.hook.ts";
import type { FormNestedKeys } from "../../types/form-nested-keys.type.ts";

export interface CustomControllerProps {
  fieldName: FormNestedKeys;
}

export default function CustomController({ fieldName }: CustomControllerProps) {
  const customFormContext = useFormContext();
  const formHookValue = customFormContext.formHook?.value;
  const onChangeValue = customFormContext.onChange?.value;

  if (!formHookValue || !onChangeValue) {
    return null;
  }

  return (
    <Controller
      name={fieldName}
      control={formHookValue.control}
      render={({ field }) => (
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          type={"number"}
          {...field}
          onChange={(e) => onChangeValue(field, e)}
        />
      )}
    />
  );
}

import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import type { FormNestedKeys } from "../../types/form-nested-keys.type.ts";
import type { HTMLInputTypeAttribute } from "react";

import { useFormContext } from "../../providers/use-context-form.hook.ts";

export interface DefaultFieldControllerProps {
  fieldName: FormNestedKeys;
  fieldType?: HTMLInputTypeAttribute;
  // todo удалить: formHook onChange
  // formHook: FormHookType;
  // onChange: OnChangeCallbackType;
}

export default function TextFieldController(
  props: DefaultFieldControllerProps,
) {
  const { fieldType, fieldName } = props;

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
          type={fieldType ?? "number"}
          {...field}
          onChange={(e) => onChangeValue(field, e)}
        />
      )}
    />
  );
}

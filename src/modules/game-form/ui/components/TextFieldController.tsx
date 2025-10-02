import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import type { FormNestedKeys } from "../../types/form-nested-keys.type.ts";
import type { HTMLInputTypeAttribute } from "react";
import type { FormHookType } from "../../types/form-hook.type.ts";
import type { OnChangeCallbackType } from "../../types/on-change-callback.type.ts";

export interface DefaultFieldControllerProps {
  fieldName: FormNestedKeys;
  fieldType?: HTMLInputTypeAttribute;
  formHook: FormHookType;
  onChange: OnChangeCallbackType;
}

export default function TextFieldController(
  props: DefaultFieldControllerProps,
) {
  const { fieldType, fieldName, formHook, onChange } = props;

  return (
    <Controller
      name={fieldName}
      control={formHook.control}
      render={({ field }) => (
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          type={fieldType ?? "number"}
          {...field}
          onChange={(e) => onChange(field, e)}
        />
      )}
    />
  );
}

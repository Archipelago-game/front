import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import type { FormNestedKeys } from "../../types/form-nested-keys.type.ts";
import { type HTMLInputTypeAttribute } from "react";

import { useCustomFormContext } from "../../providers/use-custom-context-form.hook.ts";

export interface DefaultFieldControllerProps {
  fieldName: FormNestedKeys;
  fieldType?: HTMLInputTypeAttribute;
}

export default function TextFieldController(
  props: DefaultFieldControllerProps,
) {
  const { fieldType, fieldName } = props;

  const formContext = useCustomFormContext();
  const { methods, onChange } = formContext;

  if (!formContext) {
    return null;
  }

  return (
    <Controller
      name={fieldName}
      control={methods.control}
      render={({ field }) => (
        <TextField
          sx={{
            minWidth: "50px",

            "& input[type=number]": {
              MozAppearance: "textfield", // Firefox
              padding: "4px",
            },
            "& input[type=number]::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input[type=number]::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
          }}
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

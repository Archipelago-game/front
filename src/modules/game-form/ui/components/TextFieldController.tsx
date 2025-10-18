import { Controller, type FieldPath } from "react-hook-form";
import { type SxProps, TextField } from "@mui/material";

import { type HTMLInputTypeAttribute } from "react";

import { useCustomFormContext } from "../../providers/use-custom-context-form.hook.ts";
import type { FormType } from "../../types/form/form.type.ts";

export interface DefaultFieldControllerProps {
  fieldName: FieldPath<FormType>;
  fieldType?: HTMLInputTypeAttribute;
  sx?: SxProps;
}

export default function TextFieldController(
  props: DefaultFieldControllerProps,
) {
  const { fieldType, fieldName, sx } = props;
  const defaultValue = fieldType === "number" ? 0 : "";

  const formContext = useCustomFormContext();
  const { methods, onChange } = formContext;

  if (!formContext) {
    return null;
  }

  return (
    <Controller
      name={fieldName}
      control={methods.control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          sx={{
            minWidth: "35px",
            "& .MuiInputBase-input": {
              // note стили полей ввода
              padding: "4px 4px",
              fontSize: "12px",
            },
            "& input[type=number]::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input[type=number]::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },

            ...sx,
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

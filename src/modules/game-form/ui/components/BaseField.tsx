import CustomLabel, { type CustomLabelProps } from "./CustomLabel.tsx";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import type { DefaultFormComponentProps } from "../../types/default-form-section-props.type.ts";

import type { HTMLInputTypeAttribute } from "react";
import type { FormNestedKeys } from "../../types/form-nested-keys.type.ts";

type Props = DefaultFormComponentProps &
  Omit<CustomLabelProps, "children"> & {
    propName: FormNestedKeys;
    fieldType?: HTMLInputTypeAttribute;
  };

export default function BaseField(props: Props) {
  const { propName, fieldType, onChange, formHook } = props;

  return (
    <CustomLabel
      label={props.label}
      orientation={props.orientation}
      sx={props.sx}
    >
      <Controller
        name={propName}
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
    </CustomLabel>
  );
}

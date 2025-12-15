import type { ControllerRenderProps, FieldPath } from "react-hook-form";

import type { FormType } from "../../../types/form/form.type.ts";
import type { ChangeEvent } from "react";
import {
  Box,
  Checkbox,
  type CheckboxProps,
  FormControlLabel,
  type SxProps,
} from "@mui/material";

import { DEFAULT_STATEMENT_COLOR_MAP } from "./check-icon-box-default.const.ts";
import type {
  ComponentIcon,
  StatementColorMapping,
} from "./check-icon-box.type.ts";
import { hideStyles } from "./check-icon-box.styles.ts";

type FormBooleanField = FieldPath<FormType> & `${string}.checked`;

interface Props extends CheckboxProps {
  field: ControllerRenderProps<FormType, FormBooleanField>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  Icon?: ComponentIcon;
  colors?: StatementColorMapping;
  sx?: SxProps;
}
export default function CheckIconBox({
  field,
  onChange,
  Icon,
  colors = DEFAULT_STATEMENT_COLOR_MAP,
  sx,
  ...args
}: Props) {
  const currentStyles = () => (Icon ? hideStyles : { padding: 0 });

  return (
    <FormControlLabel
      className="form-label"
      sx={{
        display: "inline-block",
        verticalAlign: "top",
        margin: 0,
        color: colors.get(field.value),
        ...sx,
      }}
      control={
        <Checkbox
          {...args}
          size={"medium"}
          sx={currentStyles()}
          {...field}
          checked={field.value}
          onChange={onChange}
        />
      }
      label={
        Icon ? (
          <Box
            sx={{
              display: "inline-block",
              width: "24px",
              height: "24px",
              padding: "2px",
              boxSizing: "border-box",
            }}
          >
            <Icon />
          </Box>
        ) : (
          ""
        )
      }
    />
  );
}

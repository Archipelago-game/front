import type { FieldPath } from "react-hook-form";
import type { FormType } from "../../../types/form/form.type.ts";
import type { HTMLInputTypeAttribute } from "react";
import type { SxProps } from "@mui/material";

export interface ControllerProps {
  fieldName: FieldPath<FormType>;
  fieldType?: HTMLInputTypeAttribute;
  sx?: SxProps;
  sxSlotProps?: SxProps;
  orientation?: "column" | "row";
  disabled?: boolean;
}

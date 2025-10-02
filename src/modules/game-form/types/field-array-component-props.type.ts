import type { DefaultFormComponentProps } from "./default-form-section-props.type.ts";
import type { FieldArrayKeys } from "./field-array-key.type.ts";

export interface FieldArrayComponentProps extends DefaultFormComponentProps {
  name: FieldArrayKeys;
  amount: number;
  defaultValue: any;
}

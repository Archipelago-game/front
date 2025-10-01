import type { DefaultFormSectionProps } from "./default-form-section-props.type.ts";
import type { FieldArrayKeys } from "./field-array-key.type.ts";

export interface FieldArrayComponentProps extends DefaultFormSectionProps {
  name: FieldArrayKeys;
  amount: number;
  defaultValue: any;
}

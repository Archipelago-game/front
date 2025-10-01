import type { DefaultFormSectionProps } from "./default-form-section-props.type.ts";
import type { CheckBoxListKeys } from "./checkbox-list-key.type.ts";
import type { FormValues } from "./form-values.type.ts";

export interface FieldArrayComponentProps extends DefaultFormSectionProps {
  name: CheckBoxListKeys<FormValues>;
  amount: number;
}

import type { FieldArrayComponentProps } from "../types/field-array-component-props.type.ts";
import type { FormType } from "../types/form/form.type.ts";
import { useFieldArray, type FieldArrayPath } from "react-hook-form";
import { useEffect, useRef } from "react";

export function useSyncFieldArray(props: FieldArrayComponentProps) {
  const { name, amount, formHook, defaultValue } = props;

  const listPath = `${name}.list` as FieldArrayPath<FormType>;

  const { fields, append } = useFieldArray({
    name: listPath,
    control: formHook.control,
  });

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (fields.length === 0 && amount > 0) {
        for (let i = 0; i < amount; i++) {
          append(defaultValue ?? { checked: false });
        }
      }
      return;
    }

    if (amount > fields.length) {
      for (let i = fields.length; i < amount; i++) {
        append(defaultValue ?? { checked: false });
      }
    }
  }, [amount, defaultValue]);

  return fields;
}

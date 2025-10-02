import type { FieldArrayComponentProps } from "../types/field-array-component-props.type.ts";
import { useFieldArray } from "react-hook-form";
import { useEffect, useRef } from "react";

export function useSyncFieldArray(props: FieldArrayComponentProps) {
  const { name, amount, formHook, defaultValue } = props;
  const { fields, append } = useFieldArray({
    name: `${name}.list`,
    control: formHook.control,
  });

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current && amount > fields.length) {
      for (let i = fields.length; i < amount; i++) {
        append(defaultValue);
      }
    }

    initialized.current = true;

    if (fields.length === 0 && amount > 0) {
      for (let i = 0; i < amount; i++) {
        append(defaultValue ?? { checked: false });
      }
    }
  }, [amount, fields]);

  return fields;
}

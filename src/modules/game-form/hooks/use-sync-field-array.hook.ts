import type { FieldArrayComponentProps } from "../types/field-array-component-props.type.ts";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";

export function useSyncFieldArray(props: FieldArrayComponentProps) {
  const { name, amount, formHook, defaultValue } = props;
  const { fields, append } = useFieldArray({
    name: `${name}.list`,
    control: formHook.control,
  });

  useEffect(() => {
    if (amount > fields.length) {
      for (let i = fields.length; i < amount; i++) {
        append(defaultValue);
      }
    }
  }, [amount, fields, append]);

  return fields;
}

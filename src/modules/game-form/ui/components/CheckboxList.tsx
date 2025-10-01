import { Controller, useFieldArray } from "react-hook-form";
import type { FormValues } from "../../types/form-values.type.ts";
import type { CheckBoxListKeys } from "../../types/checkbox-list-key.type.ts";
import { Checkbox, type CheckboxProps } from "@mui/material";
import type { DefaultFormSectionProps } from "../../types/default-form-section.props.ts";
import { useEffect } from "react";

interface Props extends DefaultFormSectionProps {
  name: CheckBoxListKeys<FormValues>;
  amount: number;
  size?: CheckboxProps["size"];
}

export default function CheckboxList(props: Props) {
  const { name, amount, formHook, onChange } = props;
  const { fields, append } = useFieldArray({
    name: `${name}.list`,
    control: formHook.control,
  });

  useEffect(() => {
    if (amount > fields.length) {
      for (let i = fields.length; i < amount; i++) {
        append({ checked: false });
      }
    }
  }, [amount, fields, append]);

  return (
    <>
      {fields.map((field, index) => (
        <Controller
          key={field.id}
          name={`luck.list.${index}.checked`}
          control={formHook.control}
          render={({ field }) => (
            <Checkbox
              size={props.size ?? "small"}
              sx={{ padding: 0 }}
              {...field}
              checked={field.value}
              onChange={(e) => onChange(field, e)}
            />
          )}
        />
      ))}
    </>
  );
}

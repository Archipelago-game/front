import { Controller } from "react-hook-form";

import { Checkbox, type CheckboxProps } from "@mui/material";
import type { FieldArrayComponentProps } from "../../types/field-array-component-props.type.ts";
import { useSyncFieldArray } from "../../hooks/use-sync-field-array.hook.ts";

interface Props extends FieldArrayComponentProps {
  size?: CheckboxProps["size"];
}

export default function CheckboxList(props: Props) {
  const { formHook, onChange } = props;
  const fields = useSyncFieldArray(props);

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

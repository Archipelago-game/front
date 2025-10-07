import { Controller, useFieldArray } from "react-hook-form";
import { Checkbox } from "@mui/material";
import CustomLabel from "../../../components/CustomLabel.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { useEffect } from "react";

export default function Wounds() {
  const { methods, onChange, values } = useCustomFormContext();

  const { fields, replace } = useFieldArray({
    name: `defence.physical.wounds.list`,
    control: methods.control,
  });

  useEffect(() => {
    if (values) {
      replace(values.defence.physical.health.list);
    }
  }, [values?.defence.physical.health.list, replace]);

  return (
    <CustomLabel
      label={{
        text: "Раны",
        color: "secondary",
        size: "h6",
      }}
      orientation="column"
    >
      {fields.map((field, index) => (
        <Controller
          key={field.id}
          name={`defence.physical.wounds.list.${index}.checked`}
          control={methods.control}
          render={({ field }) => (
            <Checkbox
              size={"medium"}
              sx={{ padding: 0 }}
              {...field}
              checked={field.value}
              onChange={(e) => onChange(field, e)}
            />
          )}
        />
      ))}
    </CustomLabel>
  );
}

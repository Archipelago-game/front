import { Controller, useFieldArray } from "react-hook-form";
import { Box, Checkbox } from "@mui/material";
import CustomLabel from "../../../components/CustomLabel.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { useEffect } from "react";
import { gridStyle } from "./styles/side-defence.styles.ts";

export default function Injuries() {
  const { methods, onChange, values } = useCustomFormContext();

  const { fields, replace } = useFieldArray({
    name: `defence.mental.injuries.list`,
    control: methods.control,
  });

  useEffect(() => {
    if (values) {
      replace(values.defence.mental.injuries.list);
    }
  }, [values?.defence.mental.injuries.list, replace]);

  return (
    <CustomLabel
      label={{
        text: "Травмы",
        color: "secondary",
        size: "h6",
      }}
      orientation="column"
    >
      <Box sx={gridStyle}>
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            name={`defence.mental.injuries.list.${index}.checked`}
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
      </Box>
    </CustomLabel>
  );
}

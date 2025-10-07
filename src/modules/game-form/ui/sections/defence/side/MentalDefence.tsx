import { Box, Checkbox } from "@mui/material";
import CustomLabel from "../../../components/CustomLabel.tsx";

import { Controller, useFieldArray } from "react-hook-form";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import type { FormType } from "../../../../types/form/form.type.ts";
import { useEffect } from "react";

export default function MentalDefence() {
  const { values, methods, onChange } = useCustomFormContext();

  const { fields, replace } = useFieldArray<FormType>({
    name: "defence.mental.resolve.list",
    control: methods.control,
  });

  useEffect(() => {
    if (values) {
      replace(values.defence.physical.health.list);
    }
  }, [values?.defence.physical.health.list, replace]);

  return (
    <Box>
      <CustomLabel
        label={{ text: "Ментальная" }}
        orientation="row"
        sx={{ width: "100%" }}
      ></CustomLabel>

      <CustomLabel label={{ text: "Решимость", color: "secondary" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "120px" }}>
            {fields.map((field, i) => (
              <Controller
                key={field.id}
                name={`defence.mental.resolve.list.${i}.checked`}
                control={methods.control}
                render={({ field }) => (
                  <Checkbox
                    size="medium"
                    sx={{ padding: 0 }}
                    {...field}
                    checked={field.value}
                    onChange={(e) => onChange(field, e)}
                  />
                )}
              />
            ))}
          </Box>
        </Box>
      </CustomLabel>
    </Box>
  );
}

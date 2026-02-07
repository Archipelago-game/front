import { Controller, useFieldArray } from "react-hook-form";

import CustomLabel from "../../../components/CustomLabel.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { gridStyle } from "./styles/side-defence.styles.ts";

import ThreePositionBox from "../../../components/fields/three-position-box/ThreePositionBox.tsx";

export default function Wounds() {
  const { methods, onChange, values } = useCustomFormContext();

  const { fields, replace } = useFieldArray({
    name: `defence.physical.wounds.list`,
    control: methods.control,
  });

  useEffect(() => {
    if (values) {
      replace(values.defence.physical.wounds.list);
    }
  }, [values?.defence.physical.wounds.list, replace]);

  return (
    <CustomLabel
      label={{
        text: "Раны",
        color: "secondary",
        size: "h6",
      }}
      orientation="column"
    >
      <Box sx={gridStyle}>
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            name={`defence.physical.wounds.list.${index}.value`}
            control={methods.control}
            render={({ field }) => (
              <ThreePositionBox
                value={field.value}
                onChange={(newValue) => {
                  field.onChange(newValue);
                  onChange();
                }}
              />
            )}
          />
        ))}
      </Box>
    </CustomLabel>
  );
}

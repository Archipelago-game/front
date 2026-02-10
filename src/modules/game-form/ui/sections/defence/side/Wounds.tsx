import { Controller, useFieldArray } from "react-hook-form";

import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { defenceGridStyle } from "./styles/side-defence.styles.ts";

import ThreePositionBox from "../../../components/fields/three-position-box/ThreePositionBox.tsx";
import CustomTextFieldLabel from "../../../components/fields/custom-text-field/CustomTextFieldLabel.tsx";

export default function Wounds() {
  const theme = useTheme();
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
    <Box>
      <CustomTextFieldLabel title="Раны" />

      <Box sx={defenceGridStyle}>
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            name={`defence.physical.wounds.list.${index}.value`}
            control={methods.control}
            render={({ field }) => (
              <ThreePositionBox
                value={field.value}
                colors={{
                  empty: "#666",
                  full: theme.palette.base.conditions.physical.primary,
                  half: theme.palette.base.conditions.physical.primaryHalf,
                }}
                onChange={(newValue) => {
                  field.onChange(newValue);
                  onChange();
                }}
              />
            )}
          />
        ))}
      </Box>
    </Box>
  );
}

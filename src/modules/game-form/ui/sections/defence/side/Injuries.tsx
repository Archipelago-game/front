import { Controller, useFieldArray } from "react-hook-form";
import { Box } from "@mui/material";

import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { useEffect } from "react";
import { gridStyle } from "./styles/side-defence.styles.ts";
import ThreePositionBox from "../../../components/fields/three-position-box/ThreePositionBox.tsx";
import LotusIcon from "../../../../../../common/components/icons/LotusIcon.tsx";
import CustomTextFieldLabel from "../../../components/fields/custom-text-field/CustomTextFieldLabel.tsx";
import { useTheme } from "@mui/material/styles";

export default function Injuries() {
  const theme = useTheme();
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
    <Box>
      <CustomTextFieldLabel title="Травмы" />
      <Box sx={gridStyle}>
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            name={`defence.mental.injuries.list.${index}.value`}
            control={methods.control}
            render={({ field }) => (
              <ThreePositionBox
                value={field.value}
                colors={{
                  empty: "#666",
                  full: theme.palette.base.conditions.mental.primary,
                  half: theme.palette.base.conditions.mental.primaryHalf,
                }}
                onChange={(newValue) => {
                  field.onChange(newValue);
                  onChange();
                }}
                Icon={LotusIcon}
              />
            )}
          />
        ))}
      </Box>
    </Box>
  );
}

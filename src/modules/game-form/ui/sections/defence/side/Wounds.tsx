import {
  Controller,
  type ControllerRenderProps,
  useFieldArray,
} from "react-hook-form";
import { Checkbox } from "@mui/material";
import CustomLabel from "../../../components/CustomLabel.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { type ChangeEvent, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { gridStyle } from "./styles/side-defence.styles.ts";
import type { FormType } from "../../../../types/form/form.type.ts";
import ThreePositionBox from "../../../components/ThreePositionBox.tsx";

const indeterminate = "indeterminate";

export default function Wounds() {
  const [checked, setChecked] = useState<true | false | typeof indeterminate>(
    false,
  );

  const { methods, onChange, values } = useCustomFormContext();

  const handleChange = (
    field: ControllerRenderProps<FormType>,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const localChecked = e.target.checked
      ? false
      : checked === false
        ? indeterminate
        : true;
    setChecked(localChecked);
    field.onChange(e.target.checked);
    onChange();
  };

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
    <>
      <ThreePositionBox />
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
              name={`defence.physical.wounds.list.${index}.checked`}
              control={methods.control}
              render={({ field }) => (
                <Checkbox
                  indeterminate={checked === indeterminate}
                  size={"medium"}
                  sx={{ padding: 0 }}
                  {...field}
                  checked={field.value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(field, e)
                  }
                />
              )}
            />
          ))}
        </Box>
      </CustomLabel>
    </>
  );
}

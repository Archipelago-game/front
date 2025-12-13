import { Controller, useFieldArray } from "react-hook-form";
import { Box } from "@mui/material";
import CustomLabel from "../../../components/CustomLabel.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { useEffect } from "react";
import { gridStyle } from "./styles/side-defence.styles.ts";
import ThreePositionBox from "../../../components/three-position-box/ThreePositionBox.tsx";
import LotusIcon from "../../../../../../common/components/icons/LotusIcon.tsx";

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
            name={`defence.mental.injuries.list.${index}.value`}
            control={methods.control}
            render={({ field }) => (
              <ThreePositionBox
                value={field.value}
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
    </CustomLabel>
  );
}

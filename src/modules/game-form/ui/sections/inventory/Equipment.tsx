import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import CustomLabel from "../../components/CustomLabel.tsx";
import { Box } from "@mui/material";

import TextFieldController from "../../components/controllers/TextFieldController.tsx";

export default function Equipment() {
  const { methods, values } = useCustomFormContext();

  const { fields, replace } = useFieldArray({
    name: `inventory.equipment.list`,
    control: methods.control,
  });

  useEffect(() => {
    if (values) {
      replace(values.inventory.equipment.list);
    }
  }, [values?.inventory.equipment.list, replace]);

  return (
    <CustomLabel
      label={{
        text: "Личные вещи",
        color: "primary",
        size: "h6",
      }}
      orientation="column"
    >
      {fields.map((field, index) => (
        <Box key={field.id}>
          <TextFieldController
            fieldName={`inventory.equipment.list.${index}.value`}
            fieldType="text"
          />
        </Box>
      ))}
    </CustomLabel>
  );
}

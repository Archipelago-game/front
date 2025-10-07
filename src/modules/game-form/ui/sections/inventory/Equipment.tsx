import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { Controller, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import CustomLabel from "../../components/CustomLabel.tsx";
import { TextField } from "@mui/material";

export default function Equipment() {
  const { methods, onChange, values } = useCustomFormContext();

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
        <Controller
          key={field.id}
          name={`inventory.equipment.list.${index}.value`}
          control={methods.control}
          render={({ field }) => (
            <TextField
              sx={{
                minWidth: "50px",

                "& input[type=number]": {
                  MozAppearance: "textfield", // Firefox
                  padding: "4px",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }}
              fullWidth
              variant="outlined"
              size="small"
              type={"text"}
              {...field}
              onChange={(e) => onChange(field, e)}
            />
          )}
        />
      ))}
    </CustomLabel>
  );
}

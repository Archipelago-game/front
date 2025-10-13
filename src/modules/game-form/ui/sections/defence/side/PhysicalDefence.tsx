import { Box, Checkbox } from "@mui/material";
import CustomLabel from "../../../components/CustomLabel.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { Controller, useFieldArray } from "react-hook-form";
import type { FormType } from "../../../../types/form/form.type.ts";
import TextFieldController from "../../../components/TextFieldController.tsx";
import { useEffect } from "react";
import { gridStyle } from "./styles/side-defence.styles.ts";
import { useWatchCheckboxAmount } from "./useWatchCheckboxAmount.ts";

export default function PhysicalDefence() {
  const { values, methods, onChange } = useCustomFormContext();

  const { fields, replace } = useFieldArray<FormType>({
    name: "defence.physical.health.list",
    control: methods.control,
  });

  const { isDisabled } = useWatchCheckboxAmount({
    defaultAmount: values?.defence.mental.resolve.amount ?? 20,
    amountName: "defence.physical.health.amount",
    listName: "defence.physical.health.list",
  });

  useEffect(() => {
    if (values) {
      replace(values.defence.physical.health.list);
    }
  }, [values?.defence.physical.health.list, replace]);

  if (!values) return null;

  return (
    <Box>
      <CustomLabel
        label={{ text: "Физическая" }}
        orientation="row"
        sx={{ width: "100%" }}
      >
        <TextFieldController
          fieldName="defence.physical.health.amount"
          sx={{
            minWidth: "25px",
            width: "30px",
          }}
        />
      </CustomLabel>

      <CustomLabel label={{ text: "Здоровье", color: "secondary" }}>
        <Box sx={{ ...gridStyle }}>
          {fields.map((field, i) => (
            <Controller
              key={field.id}
              name={`defence.physical.health.list.${i}.checked`}
              control={methods.control}
              render={({ field }) => (
                <Checkbox
                  size="medium"
                  sx={{ padding: 0 }}
                  {...field}
                  disabled={isDisabled(i)}
                  checked={field.value}
                  onChange={(e) => onChange(field, e)}
                />
              )}
            />
          ))}
        </Box>
      </CustomLabel>
    </Box>
  );
}

import { Box, Checkbox } from "@mui/material";
import CustomLabel from "../../../components/CustomLabel.tsx";

import { Controller, useFieldArray } from "react-hook-form";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import type { FormType } from "../../../../types/form/form.type.ts";
import { useEffect } from "react";
import { gridStyle } from "./styles/side-defence.styles.ts";
import TextFieldController from "../../../components/TextFieldController.tsx";
import { useWatchCheckboxAmount } from "./useWatchCheckboxAmount.ts";

export default function MentalDefence() {
  const { values, methods, onChange } = useCustomFormContext();

  const { isDisabled } = useWatchCheckboxAmount({
    defaultAmount: values?.defence.mental.resolve.amount ?? 20,
    amountName: "defence.mental.resolve.amount",
    listName: "defence.mental.resolve.list",
  });

  const { fields, replace } = useFieldArray<FormType>({
    name: "defence.mental.resolve.list",
    control: methods.control,
  });

  useEffect(() => {
    if (values) {
      replace(values.defence.mental.resolve.list);
    }
  }, [values?.defence.mental.resolve.list, replace]);

  return (
    <Box>
      <CustomLabel
        label={{ text: "Ментальная" }}
        orientation="row"
        sx={{ width: "100%" }}
      >
        <TextFieldController
          fieldName="defence.mental.resolve.amount"
          sx={{
            minWidth: "25px",
            width: "30px",
          }}
        />
      </CustomLabel>

      <CustomLabel label={{ text: "Решимость", color: "secondary" }}>
        <Box sx={{ ...gridStyle }}>
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

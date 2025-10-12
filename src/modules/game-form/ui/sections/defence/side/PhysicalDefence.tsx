import { Box, Checkbox } from "@mui/material";
import CustomLabel from "../../../components/CustomLabel.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { Controller, useFieldArray } from "react-hook-form";
import type { FormType } from "../../../../types/form/form.type.ts";
import TextFieldController from "../../../components/TextFieldController.tsx";
import { useEffect, useState } from "react";
import { fitContentStyle, gridStyle } from "./styles/side-defence.styles.ts";

export default function PhysicalDefence() {
  const { values, methods, onChange } = useCustomFormContext();

  const { fields, replace } = useFieldArray<FormType>({
    name: "defence.physical.health.list",
    control: methods.control,
  });

  const [healthAmount, setHealthAmount] = useState(
    values?.defence.physical.health.amount ?? 0,
  );

  useEffect(() => {
    const subscription = methods.watch((_, { name }) => {
      if (name === "defence.physical.health.amount") {
        const amount = methods.getValues("defence.physical.health.amount");
        const list = methods.getValues("defence.physical.health.list");
        resetDisabledCheckboxes(amount, list);
        setHealthAmount(amount);
      }
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const isDisabled = (index: number) => index > healthAmount - 1;

  function resetDisabledCheckboxes(
    amount: number,
    list: { checked: boolean }[],
  ): void {
    for (let i = amount; i < list.length - 1; i++) {
      methods.setValue(`defence.physical.health.list.${i}.checked`, false);
    }
  }

  useEffect(() => {
    if (values) {
      replace(values.defence.physical.health.list);
    }
  }, [values?.defence.physical.health.list, replace]);

  useEffect(() => {
    if (values) {
      setHealthAmount(values?.defence.physical.health.amount);
    }
  }, [values?.defence.physical.health.amount]);

  if (!values) return null;

  return (
    <Box sx={fitContentStyle}>
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
        <Box sx={{ width: "120px", ...gridStyle }}>
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

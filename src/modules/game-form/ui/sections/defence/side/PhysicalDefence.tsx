import { Box } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CustomLabel from "../../../components/CustomLabel.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import type { FormType } from "../../../../types/form/form.type.ts";

import { useEffect } from "react";
import { gridStyle } from "./styles/side-defence.styles.ts";
import { useWatchCheckboxAmount } from "./useWatchCheckboxAmount.ts";
import { HEALTH_STATEMENT_COLOR_MAP } from "./health-colors.const.ts";

import CalculatedValue from "../../../components/CalculatedValue.tsx";
import CheckIconBox from "../../../components/check-icon-box/CheckIconBox.tsx";
import { useHealthCalc } from "../health-calc.hook.ts";
import BaseField from "../../../components/BaseField.tsx";

export default function PhysicalDefence() {
  const { values, methods, onChange } = useCustomFormContext();

  const healthValue = useHealthCalc({
    statValueName: "stats.strength.value",
    focusFieldNames: [
      "stats.strength.endurance.skills.athletics.focus",
      "stats.strength.endurance.skills.resistance.focus",
    ],
  });

  const tirednessValue = useWatch({
    control: methods.control,
    name: "defence.physical.tiredness.value",
    defaultValue: 0,
  });
  const tirednessNum = Number(tirednessValue) || 0;
  const effectivePhysical = Math.max(0, (healthValue ?? 20) - tirednessNum);

  const { fields, replace } = useFieldArray<FormType>({
    name: "defence.physical.health.list",
    control: methods.control,
  });

  const isDisabled = useWatchCheckboxAmount({
    amount: effectivePhysical,
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
      <CustomLabel label={{ text: "Физическая" }} orientation="row">
        <CalculatedValue value={healthValue} />
      </CustomLabel>

      <BaseField
        fieldName="defence.physical.tiredness.value"
        label={{
          text: "Усталость",
          color: "secondary",
        }}
        orientation="row"
        showSpinButtons
      />

      <CustomLabel label={{ text: "Здоровье", color: "secondary" }}>
        <Box sx={{ marginBottom: "4px", ...gridStyle }}>
          {fields.map((field, i) => (
            <Controller
              key={field.id}
              name={`defence.physical.health.list.${i}.checked`}
              control={methods.control}
              render={({ field }) => (
                // note для отображения иконки вместо checkbox, добавить пропу Icon c требуемой иконкой
                // todo addIcon
                <CheckIconBox
                  field={field}
                  onChange={(e) => {
                    onChange(field, e);
                  }}
                  Icon={WaterDropIcon}
                  colors={HEALTH_STATEMENT_COLOR_MAP}
                  disabled={isDisabled(i)}
                />
              )}
            />
          ))}
        </Box>
      </CustomLabel>
    </Box>
  );
}

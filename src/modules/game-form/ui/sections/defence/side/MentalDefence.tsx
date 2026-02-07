import { Box } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CustomLabel from "../../../components/CustomLabel.tsx";

import { Controller, useFieldArray } from "react-hook-form";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import type { FormType } from "../../../../types/form/form.type.ts";
import { useEffect } from "react";
import { gridStyle } from "./styles/side-defence.styles.ts";
import { MENTAL_RESOLVE_STATEMENT_COLOR_MAP } from "./mental-resolve-colors.const.ts";
import { useWatchCheckboxAmount } from "./useWatchCheckboxAmount.ts";

import CalculatedValue from "../../../components/CalculatedValue.tsx";
import CheckIconBox from "../../../components/fields/check-icon-box/CheckIconBox.tsx";
import { useHealthCalc } from "../health-calc.hook.ts";
import BaseCheckbox from "../../../components/fields/BaseCheckbox.tsx";

export default function MentalDefence() {
  const { values, methods, onChange } = useCustomFormContext();

  const healthValue = useHealthCalc({
    statValueName: "stats.willpower.value",
    focusFieldNames: [
      "stats.willpower.discipline.skills.order.focus",
      "stats.willpower.discipline.skills.navigation.focus",
      "stats.willpower.discipline.skills.faith.focus",
    ],
  });

  const isDisabled = useWatchCheckboxAmount({
    amount: healthValue ?? 20,
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
      <CustomLabel label={{ text: "Ментальная" }} orientation="row">
        <CalculatedValue value={healthValue} />
      </CustomLabel>

      <BaseCheckbox
        fieldName={`defence.mental.despair.checked`}
        label={{
          label: {
            text: "Отчаяние",
            color: "secondary",
          },
          orientation: "row",
        }}
      />

      <CustomLabel label={{ text: "Решимость", color: "secondary" }}>
        <Box sx={{ marginBottom: "4px", ...gridStyle }}>
          {fields.map((field, i) => (
            <Controller
              key={field.id}
              name={`defence.mental.resolve.list.${i}.checked`}
              control={methods.control}
              render={({ field }) => (
                <CheckIconBox
                  field={field}
                  onChange={(e) => {
                    onChange(field, e);
                  }}
                  Icon={PsychologyIcon}
                  colors={MENTAL_RESOLVE_STATEMENT_COLOR_MAP}
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

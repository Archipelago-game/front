import { Box, Divider, useTheme } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";

import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import type { FormType } from "../../../../types/form/form.type.ts";
import { useEffect } from "react";
import { gridStyle } from "./styles/side-defence.styles.ts";
import { MENTAL_RESOLVE_STATEMENT_COLOR_MAP } from "./mental-resolve-colors.const.ts";
import { useWatchCheckboxAmount } from "./useWatchCheckboxAmount.ts";

import CalculatedValue from "../../../components/CalculatedValue.tsx";

import { useHealthCalc } from "../health-calc.hook.ts";

import CheckIconBox from "../../../components/fields/check-icon-box/CheckIconBox.tsx";

import CustomTextFieldLabel from "../../../components/fields/custom-text-field/CustomTextFieldLabel.tsx";
import CustomTextFieldWrapper from "../../../components/fields/custom-text-field/CustomTextFieldWrapper.tsx";
import CustomTextField from "../../../components/fields/custom-text-field/CustomTextField.tsx";

export default function MentalDefence() {
  const theme = useTheme();
  const { values, methods, onChange } = useCustomFormContext();

  const healthValue = useHealthCalc({
    statValueName: "stats.willpower.value",
    focusFieldNames: [
      "stats.willpower.discipline.skills.order.focus",
      "stats.willpower.discipline.skills.navigation.focus",
      "stats.willpower.discipline.skills.faith.focus",
    ],
  });

  const despairValue = useWatch({
    control: methods.control,
    name: "defence.mental.despair.value",
    defaultValue: 0,
  });
  const despairNum = Number(despairValue) || 0;
  const effectiveMental = Math.max(0, (healthValue ?? 20) - despairNum);

  const isDisabled = useWatchCheckboxAmount({
    amount: effectiveMental,
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
      <CustomTextFieldWrapper>
        <CustomTextFieldLabel title="Ментальная" />
        <CalculatedValue value={healthValue} />
      </CustomTextFieldWrapper>

      <CustomTextField
        title="Отчаяние"
        textField={{
          fieldName: "defence.mental.despair.value",
          showChangeValueBtn: true,
        }}
      />

      <Divider sx={{ borderColor: theme.palette.base.outline }} />
      <CustomTextFieldLabel title="Решимость" />

      <Box sx={{ ...gridStyle }}>
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
    </Box>
  );
}

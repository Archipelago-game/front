import { Box, Divider, Stack } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import type { FormType } from "../../../../types/form/form.type.ts";

import { useEffect } from "react";
import { defenceGridStyle } from "./styles/side-defence.styles.ts";
import { useWatchCheckboxAmount } from "./useWatchCheckboxAmount.ts";
import { HEALTH_STATEMENT_COLOR_MAP } from "./health-colors.const.ts";

import CalculatedValue from "../../../components/CalculatedValue.tsx";

import { useHealthCalc } from "../health-calc.hook.ts";

import CheckIconBox from "../../../components/fields/check-icon-box/CheckIconBox.tsx";

import CustomTextFieldLabel from "../../../components/fields/custom-text-field/CustomTextFieldLabel.tsx";
import CustomTextFieldWrapper from "../../../components/fields/custom-text-field/CustomTextFieldWrapper.tsx";

import CustomTextField from "../../../components/fields/custom-text-field/CustomTextField.tsx";
import { useTheme } from "@mui/material/styles";

import SectionTitle from "../../../components/section/SectionTitle.tsx";
import Wounds from "./Wounds.tsx";

export default function PhysicalDefence() {
  const theme = useTheme();
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
    <Stack rowGap={1}>
      <CustomTextFieldWrapper>
        <SectionTitle title="Физическая" />
        <CalculatedValue value={healthValue} />
      </CustomTextFieldWrapper>

      <CustomTextField
        title="Усталость"
        textField={{
          fieldName: "defence.physical.tiredness.value",
          showChangeValueBtn: true,
        }}
      />

      <Divider
        sx={{ borderColor: theme.palette.base.outline, borderWidth: "1px" }}
      />

      <Box>
        <CustomTextFieldLabel title="Здоровье" />

        <Box sx={{ ...defenceGridStyle }}>
          {fields.map((field, i) => (
            <Controller
              key={field.id}
              name={`defence.physical.health.list.${i}.checked`}
              control={methods.control}
              render={({ field }) => (
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
      </Box>

      <Divider
        sx={{
          borderColor: theme.palette.base.conditions.physical.border,
          borderWidth: "1px",
        }}
      />
      <Wounds />
    </Stack>
  );
}

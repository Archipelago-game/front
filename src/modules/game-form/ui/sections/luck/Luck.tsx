import { Controller } from "react-hook-form";
import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useSyncFieldArray } from "../../../hooks/use-sync-field-array.hook.ts";

import { Box, Stack, useMediaQuery } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CustomLabel from "../../components/CustomLabel.tsx";
import CheckIconBox from "../../components/fields/check-icon-box/CheckIconBox.tsx";
import { LUCK_STATEMENT_COLOR_MAP } from "./luck-colors.const.ts";
import { useWatchRace } from "../base-info/use-watch-race.ts";
import CustomTextFieldLabel from "../../components/fields/custom-text-field/CustomTextFieldLabel.tsx";
import CustomTextField from "../../components/fields/custom-text-field/CustomTextField.tsx";
import BaseSectionCard from "../../components/section/BaseSectionCard.tsx";

// note в ui называется Решимость

export default function Luck() {
  const { methods, onChange, values } = useCustomFormContext();

  const race = useWatchRace();

  const isBelow560 = useMediaQuery("(max-width: 560px)");

  const fields = useSyncFieldArray({
    name: "luck",
    amount: values?.luck.amount ?? 5,
    defaultValue: { checked: false },
    formHook: methods,
    onChange: onChange,
  });

  if (race !== "human") {
    return null;
  }

  return (
    <BaseSectionCard
      card={{
        sx: {
          width: "100%",
        },
      }}
    >
      <CustomTextFieldLabel title="Решимость" />

      {fields.map((field, index) => (
        <Controller
          key={field.id}
          name={`luck.list.${index}.checked`}
          control={methods.control}
          render={({ field }) => (
            <CheckIconBox
              field={field}
              onChange={(e) => {
                onChange(field, e);
              }}
              Icon={WorkspacePremiumIcon}
              colors={LUCK_STATEMENT_COLOR_MAP}
            />
          )}
        />
      ))}
    </BaseSectionCard>
  );
}

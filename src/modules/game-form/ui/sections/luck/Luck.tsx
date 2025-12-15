import { Controller } from "react-hook-form";
import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useSyncFieldArray } from "../../../hooks/use-sync-field-array.hook.ts";
import { useWatchImmortal } from "../base-info/use-watch-immortal.hook.ts";

import { Box, useMediaQuery } from "@mui/material";
import CustomLabel from "../../components/CustomLabel.tsx";
import CheckIconBox from "../../components/check-icon-box/CheckIconBox.tsx";

export default function Luck() {
  const { methods, onChange, values } = useCustomFormContext();

  const isImmortal = useWatchImmortal();

  const isBelow560 = useMediaQuery("(max-width: 560px)");

  const fields = useSyncFieldArray({
    name: "luck",
    amount: values?.luck.amount ?? 5,
    defaultValue: { checked: false },
    formHook: methods,
    onChange: onChange,
  });

  if (isImmortal) {
    return null;
  }

  return (
    <Box
      className="luck"
      sx={{
        width: isBelow560 ? "100%" : "fit-content",
      }}
    >
      <CustomLabel
        label={{ text: "Удача/Решимость" }}
        sx={{ flex: "1 1 1px", justifyContent: "space-between" }}
      >
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            name={`luck.list.${index}.checked`}
            control={methods.control}
            render={({ field }) => (
              // note для отображения иконки вместо checkbox, добавить пропу Icon c требуемой иконкой
              // todo addIcon
              <CheckIconBox
                field={field}
                onChange={(e) => {
                  onChange(field, e);
                }}
              />
            )}
          />
        ))}
      </CustomLabel>
    </Box>
  );
}

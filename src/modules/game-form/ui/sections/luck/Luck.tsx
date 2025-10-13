import CustomLabel from "../../components/CustomLabel.tsx";

import { Box, Checkbox, useMediaQuery } from "@mui/material";
import { Controller } from "react-hook-form";
import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useSyncFieldArray } from "../../../hooks/use-sync-field-array.hook.ts";

export default function Luck() {
  const { methods, onChange, values } = useCustomFormContext();

  const fields = useSyncFieldArray({
    name: "luck",
    amount: values?.luck.amount ?? 5,
    defaultValue: { checked: false },
    formHook: methods,
    onChange: onChange,
  });

  const isBelow530 = useMediaQuery("(max-width: 530px)");

  return (
    <Box
      sx={{
        width: isBelow530 ? "100%" : "fit-content",
      }}
    >
      <CustomLabel label={{ text: "Удача/Решимость" }} sx={{ flex: "1 1 1" }}>
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            name={`luck.list.${index}.checked`}
            control={methods.control}
            render={({ field }) => (
              <Checkbox
                size={"large"}
                sx={{ padding: 0 }}
                {...field}
                checked={field.value}
                onChange={(e) => onChange(field, e)}
              />
            )}
          />
        ))}
      </CustomLabel>
    </Box>
  );
}

import { Controller } from "react-hook-form";
import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useSyncFieldArray } from "../../../hooks/use-sync-field-array.hook.ts";
import { useWatchImmortal } from "../base-info/use-watch-immortal.hook.ts";

import { Box, useMediaQuery } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CustomLabel from "../../components/CustomLabel.tsx";
import CheckIconBox from "../../components/check-icon-box/CheckIconBox.tsx";
import { LUCK_STATEMENT_COLOR_MAP } from "./luck-colors.const.ts";

// note в ui называется Решимость

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
        label={{ text: "Решимость" }}
        sx={{ flex: "1 1 1px", justifyContent: "space-between" }}
      >
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
      </CustomLabel>
    </Box>
  );
}

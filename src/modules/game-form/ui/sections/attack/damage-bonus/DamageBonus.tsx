import type { DefaultFormSectionProps } from "../../../../types/default-form-section-props.type.ts";
import CustomLabel from "../../../components/CustomLabel.tsx";
import { Box } from "@mui/system";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export default function DamageBonus({
  formHook,
  onChange,
}: DefaultFormSectionProps) {
  return (
    <CustomLabel
      label={{
        text: "Бонусы к урону",
        size: "h6",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.2em",
        }}
      >
        <CustomLabel
          label={{
            color: "secondary",
            text: "Физический",
          }}
          orientation="row"
        >
          <Controller
            name="attack.damageBonus.physical"
            control={formHook.control}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                type="number"
                {...field}
                onChange={(e) => onChange(field, e)}
              />
            )}
          />
        </CustomLabel>
        <CustomLabel
          label={{
            color: "secondary",
            text: "Ментальный",
          }}
          orientation="row"
        >
          <Controller
            name="attack.damageBonus.mental"
            control={formHook.control}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                type="number"
                {...field}
                onChange={(e) => onChange(field, e)}
              />
            )}
          />
        </CustomLabel>
      </Box>
    </CustomLabel>
  );
}

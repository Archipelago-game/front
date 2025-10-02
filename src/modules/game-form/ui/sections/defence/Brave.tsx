import type { DefaultFormComponentProps } from "../../../types/default-form-section-props.type.ts";
import CustomLabel from "../../components/CustomLabel.tsx";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export default function Brave({
  formHook,
  onChange,
}: DefaultFormComponentProps) {
  return (
    <CustomLabel
      label={{
        color: "primary",
        text: "Отвага",
      }}
      orientation="row"
    >
      <Controller
        name="defence.brave"
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
  );
}

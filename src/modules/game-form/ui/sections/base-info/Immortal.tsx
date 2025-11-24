import CustomLabel from "../../components/CustomLabel.tsx";
import { Controller } from "react-hook-form";
import { Checkbox } from "@mui/material";
import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";

export default function Immortal() {
  const { methods, onChange } = useCustomFormContext();
  return (
    <CustomLabel
      orientation="row"
      label={{ text: "Бессмертный" }}
      sx={{ flex: "1 1 1" }}
    >
      <Controller
        name={`immortal.checked`}
        control={methods.control}
        render={({ field }) => (
          <Checkbox
            size={"large"}
            slotProps={{}}
            sx={{ padding: 0 }}
            {...field}
            checked={field.value}
            onChange={(e) => onChange(field, e)}
          />
        )}
      />
    </CustomLabel>
  );
}

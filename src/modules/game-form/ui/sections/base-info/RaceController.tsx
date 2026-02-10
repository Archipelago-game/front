import { Controller } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";
import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";

export default function RaceController() {
  const { methods, onChange } = useCustomFormContext();
  return (
    <Controller
      name="race"
      control={methods.control}
      render={({ field }) => (
        <Select
          {...field}
          onChange={(e) => {
            field.onChange(e);
            onChange();
          }}
          size="small"
          sx={{
            minWidth: "200px",
            width: "100%",
            "& .MuiSelect-select": {
              padding: "4px",
              fontSize: "12px",
            },
          }}
        >
          <MenuItem value="human">Человек</MenuItem>
          <MenuItem value="immortal">Бессмертный</MenuItem>
          <MenuItem value="cat">Кот</MenuItem>
        </Select>
      )}
    />
  );
}

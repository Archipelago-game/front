import CustomLabel from "../../components/CustomLabel.tsx";
import { Controller } from "react-hook-form";
import { Box, Checkbox } from "@mui/material";
import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useConfirmDialogContext } from "../../../../confirm-dialog/use-confirm-dialog.hook.ts";
import type { OnChangeCallbackType } from "../../../types/on-change-callback.type.ts";

import { theme } from "../../../../../common/styles/theme/custom-theme.ts";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function Immortal() {
  const { methods, onChange } = useCustomFormContext();
  const { open } = useConfirmDialogContext();
  const handleOnChange: OnChangeCallbackType = (field, e) => {
    if (!(e?.target instanceof HTMLInputElement)) {
      return;
    }

    const checked = e?.target.checked;
    let message: string;

    if (checked) {
      message = "Ты уверен, что хочешь превратить героя в Бессмертного?";
    } else {
      message = "Ты уверен, что хочешь лишить героя Бессмертия?";
    }
    open({
      message,
      onConfirm: () => {
        field?.onChange(checked);
        onChange();
      },
    });
  };

  return (
    <>
      <CustomLabel label={{ text: "Раса" }} orientation={"row"}>
        <Controller
          name="race"
          control={methods.control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="age-label"
              label="Возраст"
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
      </CustomLabel>

      <Box
        display="flex"
        sx={{ backgroundColor: theme.palette.label.background.primary }}
        position="relative"
      >
        <Box
          sx={{
            position: "absolute",

            width: "25px",
            height: "25px",
            top: "5px",
            right: "5px",
            background: "white",
          }}
        />
        <CustomLabel orientation="row" label={{ text: "Бессмертный" }} />

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
              onChange={(e) => handleOnChange(field, e)}
            />
          )}
        />
      </Box>
    </>
  );
}

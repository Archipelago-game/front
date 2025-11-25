import CustomLabel from "../../components/CustomLabel.tsx";
import { Controller } from "react-hook-form";
import { Box, Checkbox } from "@mui/material";
import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useConfirmDialogContext } from "../../../../confirm-dialog/use-confirm-dialog.hook.ts";
import type { OnChangeCallbackType } from "../../../types/on-change-callback.type.ts";

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
    <Box display="flex">
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
  );
}

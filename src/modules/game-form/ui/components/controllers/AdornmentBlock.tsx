import { Box } from "@mui/system";
import { IconButton, InputAdornment } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import type { ControllerRenderProps } from "react-hook-form";
import type { FormType } from "../../../types/form/form.type.ts";

import type { OnChangeCallbackType } from "../../../types/on-change-callback.type.ts";

const inputAdornmentStyles = {
  wrapper: {
    display: "flex",
    gap: "8px",
    paddingRight: "2px",
    paddingBottom: "1px",
  },
  input: {
    margin: 0,
  },
  btn: { padding: "4px", border: "1px solid #000", borderRadius: "50%" },
  icon: {
    fontSize: "12px",
  },
};

interface Props {
  field: ControllerRenderProps<FormType>;
  onChange: OnChangeCallbackType;
}

export default function AdornmentBlock({ field, onChange }: Props) {
  const increaseValue = (field: ControllerRenderProps<FormType>) => {
    if (typeof field.value !== "number") {
      return;
    }

    field.onChange(field.value + 1);
    onChange();
  };

  const decreaseValue = (field: ControllerRenderProps<FormType>) => {
    const value = Number(field.value);

    if (Number.isNaN(value)) {
      return;
    }
    const next = value > 0 ? value - 1 : field.value;
    field.onChange(next);
    onChange();
  };

  return (
    <Box sx={inputAdornmentStyles.wrapper}>
      <InputAdornment position="start" sx={inputAdornmentStyles.input}>
        <IconButton
          sx={inputAdornmentStyles.btn}
          onClick={() => decreaseValue(field)}
        >
          <RemoveIcon sx={inputAdornmentStyles.icon} />
        </IconButton>
      </InputAdornment>
      <InputAdornment position="end" sx={inputAdornmentStyles.input}>
        <IconButton
          size="small"
          sx={inputAdornmentStyles.btn}
          onClick={() => increaseValue(field)}
        >
          <AddIcon sx={inputAdornmentStyles.icon} />
        </IconButton>
      </InputAdornment>
    </Box>
  );
}

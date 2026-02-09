import { Box } from "@mui/system";
import { IconButton, InputAdornment } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import type { ControllerRenderProps } from "react-hook-form";
import type { FormType } from "../../../types/form/form.type.ts";

import type { OnChangeCallbackType } from "../../../types/on-change-callback.type.ts";
import type { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";

const adornmentStyles = {
  wrapper: {
    display: "flex",
    gap: "4px",
    paddingRight: "2px",
    paddingBottom: "1px",
  },
  input: {
    margin: 0,
  },
  btn: { padding: "4px", border: "2px solid #000", borderRadius: "50%" },
  icon: {
    fontSize: "12px",
  },
};

interface Props {
  field: ControllerRenderProps<FormType>;
  onChange: OnChangeCallbackType;
  children: ReactNode;
  isShowButtons: boolean;
}

export default function AdornmentBlock({
  field,
  onChange,
  children,
  isShowButtons,
}: Props) {
  const theme = useTheme();
  const increaseValue = (field: ControllerRenderProps<FormType>) => {
    const value = Number(field.value);

    if (Number.isNaN(value)) {
      return;
    }

    field.onChange(value + 1);
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

  const btnStyles = {
    ...adornmentStyles.btn,
    borderColor: theme.palette.base.outline,
  };

  return (
    <Box sx={adornmentStyles.wrapper}>
      {isShowButtons && (
        <InputAdornment position="start" sx={adornmentStyles.input}>
          <IconButton sx={btnStyles} onClick={() => decreaseValue(field)}>
            <RemoveIcon sx={adornmentStyles.icon} />
          </IconButton>
        </InputAdornment>
      )}
      {children}
      {isShowButtons && (
        <InputAdornment position="end" sx={adornmentStyles.input}>
          <IconButton
            size="small"
            sx={btnStyles}
            onClick={() => increaseValue(field)}
          >
            <AddIcon sx={adornmentStyles.icon} />
          </IconButton>
        </InputAdornment>
      )}
    </Box>
  );
}

import { Controller, type ControllerRenderProps } from "react-hook-form";
import { IconButton, InputAdornment, TextField } from "@mui/material";

import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";

import type { ControllerProps } from "./controller-props.type.ts";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import type { FormType } from "../../../types/form/form.type.ts";
import { calcDynamicRadius } from "./calc-dynamic-radius.util.ts";

export interface DefaultFieldControllerProps extends ControllerProps {
  multiline?: {
    isMultiline?: boolean;
    rows?: number;
  };
  isShowChangeValueBtn?: boolean;
}

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

export default function TextFieldController(
  props: DefaultFieldControllerProps,
) {
  const {
    fieldType = "number",
    fieldName,
    sx,
    sxSlotProps = "",
    orientation = "column",
    disabled = false,
    multiline = {
      isMultiline: false,
      rows: 1,
    },
    isShowChangeValueBtn = false,
  } = props;
  const defaultValue = fieldType === "number" ? 0 : "";

  const formContext = useCustomFormContext();
  const { methods, onChange } = formContext;

  if (!formContext) {
    return null;
  }

  const increaseValue = (field: ControllerRenderProps<FormType>) => {
    if (typeof field.value !== "number") {
      return;
    }

    field.onChange(field.value + 1);
    onChange();
  };

  const decreaseValue = (field: ControllerRenderProps<FormType>) => {
    if (typeof field.value !== "number") {
      return;
    }
    const next = field.value > 0 ? field.value - 1 : field.value;
    field.onChange(next);
    onChange();
  };

  const { topLeft, topRight, bottomLeft, bottomRight } =
    calcDynamicRadius(orientation);

  return (
    <Controller
      name={fieldName}
      control={methods.control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          slotProps={{
            input: {
              sx: { ...sxSlotProps, padding: 0 },
              endAdornment:
                isShowChangeValueBtn && fieldType === "number" ? (
                  <Box sx={inputAdornmentStyles.wrapper}>
                    <InputAdornment
                      position="start"
                      sx={inputAdornmentStyles.input}
                    >
                      <IconButton
                        sx={inputAdornmentStyles.btn}
                        onClick={() => decreaseValue(field)}
                      >
                        <RemoveIcon sx={inputAdornmentStyles.icon} />
                      </IconButton>
                    </InputAdornment>
                    <InputAdornment
                      position="end"
                      sx={inputAdornmentStyles.input}
                    >
                      <IconButton
                        size="small"
                        sx={inputAdornmentStyles.btn}
                        onClick={() => increaseValue(field)}
                      >
                        <AddIcon sx={inputAdornmentStyles.icon} />
                      </IconButton>
                    </InputAdornment>
                  </Box>
                ) : null,
            },
          }}
          sx={{
            minWidth: "35px",
            "& .MuiOutlinedInput-root": {
              borderTopLeftRadius: `${topLeft}px`,
              borderTopRightRadius: `${topRight}px`,
              borderBottomLeftRadius: `${bottomLeft}px`,
              borderBottomRightRadius: `${bottomRight}px`,
            },

            "& .MuiInputBase-input": {
              // note стили полей ввода
              padding: "4px",
              fontSize: "12px",
            },
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000",
            },
            "& input[type=number]::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input[type=number]::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },

            ...sx,
          }}
          multiline={multiline.isMultiline}
          rows={multiline.rows}
          disabled={disabled}
          fullWidth
          variant="outlined"
          size="small"
          type={fieldType}
          {...field}
          onChange={(e) => onChange(field, e)}
        />
      )}
    />
  );
}

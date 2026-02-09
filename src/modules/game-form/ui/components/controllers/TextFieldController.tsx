import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";

import type { ControllerProps } from "./controller-props.type.ts";

import { calcDynamicRadius } from "./calc-dynamic-radius.util.ts";

export interface DefaultFieldControllerProps extends ControllerProps {
  multiline?: {
    isMultiline?: boolean;
    rows?: number;
  };
  isShowChangeValueBtn?: boolean;
  /** Показать стандартные кнопки +/- у number input (по умолчанию скрыты) */
  showSpinButtons?: boolean;
}

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
    showSpinButtons = false,
  } = props;
  const defaultValue = fieldType === "number" ? 0 : "";
  console.log(isShowChangeValueBtn);
  const formContext = useCustomFormContext();
  const { methods, onChange } = formContext;

  if (!formContext) {
    return null;
  }

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
            },
          }}
          sx={{
            minWidth: "35px",
            "& textarea": {
              resize: "vertical",
            },
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
            ...(!showSpinButtons && {
              "& input[type=number]::-webkit-outer-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
            }),

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
          onChange={(e) => {
            field.onChange(e.target.value);
            onChange();
          }}
        />
      )}
    />
  );
}

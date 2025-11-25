import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";

import type { ControllerProps } from "./controller-props.type.ts";

export interface DefaultFieldControllerProps extends ControllerProps {
  multiline?: {
    isMultiline?: boolean;
    rows?: number;
  };
}

export default function TextFieldController(
  props: DefaultFieldControllerProps,
) {
  const {
    fieldType,
    fieldName,
    sx,
    sxSlotProps = "",
    orientation = "column",
    disabled = false,
    multiline = {
      isMultiline: false,
      rows: 1,
    },
  } = props;
  const defaultValue = fieldType === "number" ? 0 : "";

  const formContext = useCustomFormContext();
  const { methods, onChange } = formContext;

  if (!formContext) {
    return null;
  }

  const dynamicRadius = (orientation: "column" | "row") => {
    let topLeft = 4;
    let topRight = 4;
    let bottomLeft = 4;
    const bottomRight = 4;

    if (orientation === "column") {
      topLeft = 0;
      topRight = 0;
    } else if (orientation === "row") {
      topLeft = 0;
      bottomLeft = 0;
    }

    return {
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
    };
  };

  const { topLeft, topRight, bottomLeft, bottomRight } =
    dynamicRadius(orientation);

  return (
    <Controller
      name={fieldName}
      control={methods.control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          slotProps={{
            input: {
              sx: { ...sxSlotProps },
            },
          }}
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000",
            },
            "& .MuiOutlinedInput-root": {
              borderTopLeftRadius: `${topLeft}px`,
              borderTopRightRadius: `${topRight}px`,
              borderBottomLeftRadius: `${bottomLeft}px`,
              borderBottomRightRadius: `${bottomRight}px`,
            },
            minWidth: "35px",
            "& .MuiInputBase-input": {
              // note стили полей ввода
              padding: "4px 4px",
              fontSize: "12px",
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
          type={fieldType ?? "number"}
          {...field}
          onChange={(e) => onChange(field, e)}
        />
      )}
    />
  );
}

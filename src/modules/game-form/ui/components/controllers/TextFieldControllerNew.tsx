// note new ui вместо TextFieldController
import type { ControllerProps } from "./controller-props.type.ts";
import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";

import { Controller } from "react-hook-form";
import { Box, TextField } from "@mui/material";
import AdornmentBlock from "./AdornmentBlock.tsx";
import { useTheme } from "@mui/material/styles";
import { calcWidth } from "./calc-width.util.ts";

type NewControllerProps = Omit<ControllerProps, "orientation">;

export interface DefaultFieldControllerProps extends NewControllerProps {
  showChangeValueBtn?: boolean;
  fullWidth?: boolean;
  multiline?: {
    isMultiline?: boolean;
    rows?: number;
  };
}

export default function TextFieldControllerNew(
  props: DefaultFieldControllerProps,
) {
  const {
    fieldType = "number",
    fieldName,
    sx,
    sxSlotProps = "",
    disabled = false,
    showChangeValueBtn = false,
    fullWidth = false,
    multiline = {
      isMultiline: false,
      rows: 1,
    },
  } = props;

  const theme = useTheme();
  const isNumberType = fieldType === "number";
  const defaultValue = isNumberType ? 0 : "";

  const formContext = useCustomFormContext();
  const { methods, onChange } = formContext;

  const componentWidth = calcWidth({
    fullWidth,
    isNumberType,
    showChangeValueBtn,
  });

  if (!formContext) {
    return null;
  }

  return (
    <Controller
      name={fieldName}
      control={methods.control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Box width={componentWidth}>
          <AdornmentBlock
            field={field}
            onChange={onChange}
            isShowButtons={isNumberType && showChangeValueBtn}
          >
            <TextField
              slotProps={{
                input: {
                  sx: { ...sxSlotProps, padding: 0 },
                },
              }}
              sx={{
                boxSizing: "border-box",
                width: "100%",
                "& textarea": {
                  resize: "vertical",
                },
                "& .MuiOutlinedInput-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },

                  border: 1,
                  borderColor: theme.palette.base.outline,
                  borderWidth: "1px",
                  transition: "border-color .4s ease",

                  "&:hover": {
                    borderColor: theme.palette.base.accent,
                    outline: "none",
                  },
                },

                "& .MuiInputBase-input": {
                  // note стили полей ввода
                  textAlign: isNumberType ? "center" : "left",
                  padding: "2px",
                  fontSize: "14px",
                  fontWeight: isNumberType ? 900 : 400,
                  color: theme.palette.base.text.primary,
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: theme.palette.base.text.primary,
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
              disabled={disabled}
              multiline={multiline.isMultiline}
              rows={multiline.rows}
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
          </AdornmentBlock>
        </Box>
      )}
    />
  );
}

// note new ui вместо TextFieldController
import type { ControllerProps } from "./controller-props.type.ts";
import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";

import { Controller } from "react-hook-form";
import { Stack, TextField } from "@mui/material";
import AdornmentBlock from "./AdornmentBlock.tsx";
import { useTheme } from "@mui/material/styles";

type NewControllerProps = Omit<ControllerProps, "orientation">;

export interface DefaultFieldControllerProps extends NewControllerProps {
  isShowChangeValueBtn?: boolean;
  showSpinButtons?: boolean;
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
    isShowChangeValueBtn = false,
    showSpinButtons = false,
  } = props;

  const theme = useTheme();
  const isNumberType = fieldType === "number";
  const defaultValue = isNumberType ? 0 : "";

  const formContext = useCustomFormContext();
  const { methods, onChange } = formContext;
  const ADDORMENT_BLOCK_WIDHT = 54;
  const FIELD_WIDTH = 35;
  const calcWidth = () => ADDORMENT_BLOCK_WIDHT + FIELD_WIDTH;

  if (!formContext) {
    return null;
  }

  return (
    <Controller
      name={fieldName}
      control={methods.control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Stack
          direction="row"
          sx={{ flexWrap: "no-wrap", width: isNumberType ? "35px" : "100%" }}
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
                border: 1,
                borderColor: theme.palette.base.outline,
                borderWidth: "1px",
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
          {isShowChangeValueBtn && isNumberType && (
            <AdornmentBlock field={field} onChange={onChange} />
          )}
        </Stack>
      )}
    />
  );
}

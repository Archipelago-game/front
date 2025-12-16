import { useSyncFieldArray } from "../../../../hooks/use-sync-field-array.hook.ts";
import { Controller } from "react-hook-form";
import { Box, type CheckboxProps } from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CustomLabel from "../../../components/CustomLabel.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import type { FieldArrayComponentShortProps } from "../../../../types/field-array-component-props.type.ts";
import CheckIconBox from "../../../components/check-icon-box/CheckIconBox.tsx";
import { LOADS_STATEMENT_COLOR_MAP } from "./loads-colors.const.ts";

interface Props extends FieldArrayComponentShortProps {
  size?: CheckboxProps["size"];
  index: number;
}

export default function Loads(props: Props) {
  const formContext = useCustomFormContext();
  const { methods, onChange } = formContext;

  const fields = useSyncFieldArray({
    ...props,
    formHook: methods,
    onChange,
  });

  if (!formContext) {
    return null;
  }

  return (
    <Box
      sx={{
        flexGrow: {
          md: 1,
          lg: 0,
        },
        [`@media (max-width:500px)`]: {
          width: "100%",
        },
      }}
    >
      <CustomLabel
        label={{
          text: "Заряды",
          color: "secondary",
          size: "body2",
        }}
        orientation="column"
      >
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            name={`attack.methods.list.${props.index}.loads.list.${index}.checked`}
            control={methods.control}
            render={({ field }) => (
              <CheckIconBox
                field={field}
                onChange={(e) => {
                  onChange(field, e);
                }}
                Icon={CelebrationIcon}
                colors={LOADS_STATEMENT_COLOR_MAP}
              />
            )}
          />
        ))}
      </CustomLabel>
    </Box>
  );
}

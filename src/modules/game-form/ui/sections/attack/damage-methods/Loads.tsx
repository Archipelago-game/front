import { useSyncFieldArray } from "../../../../hooks/use-sync-field-array.hook.ts";
import { Controller } from "react-hook-form";
import { Box, type CheckboxProps } from "@mui/material";
import CustomLabel from "../../../components/CustomLabel.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import type { FieldArrayComponentShortProps } from "../../../../types/field-array-component-props.type.ts";
import CheckIconBox from "../../../components/check-icon-box/CheckIconBox.tsx";

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
              // note для отображения иконки вместо checkbox, добавить пропу Icon c требуемой иконкой
              // todo addIcon
              <CheckIconBox
                field={field}
                onChange={(e) => {
                  onChange(field, e);
                }}
              />
            )}
          />
        ))}
      </CustomLabel>
    </Box>
  );
}

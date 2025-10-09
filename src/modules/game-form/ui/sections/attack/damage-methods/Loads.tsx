import type { FieldArrayComponentProps } from "../../../../types/field-array-component-props.type.ts";
import { useSyncFieldArray } from "../../../../hooks/use-sync-field-array.hook.ts";
import { Controller } from "react-hook-form";
import { Box, Checkbox, type CheckboxProps } from "@mui/material";
import CustomLabel from "../../../components/CustomLabel.tsx";

interface Props extends FieldArrayComponentProps {
  size?: CheckboxProps["size"];
  index: number;
}

export default function Loads(props: Props) {
  const { formHook, onChange } = props;
  const fields = useSyncFieldArray(props);

  return (
    <Box
      sx={{
        flexGrow: {
          md: 1,
          lg: 0,
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
            control={formHook.control}
            render={({ field }) => (
              <Checkbox
                size={props.size ?? "medium"}
                sx={{ padding: 0 }}
                {...field}
                checked={field.value}
                onChange={(e) => onChange(field, e)}
              />
            )}
          />
        ))}
      </CustomLabel>
    </Box>
  );
}

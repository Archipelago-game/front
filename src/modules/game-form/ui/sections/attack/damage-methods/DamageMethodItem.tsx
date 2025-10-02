import CustomLabel from "../../../components/CustomLabel.tsx";
import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import type { DefaultFormComponentProps } from "../../../../types/default-form-section-props.type.ts";
import type { AttackMethod, FormType } from "../../../../types/form.type.ts";
import Loads from "./Loads.tsx";

interface Props extends DefaultFormComponentProps {
  index: number;
  values: FormType;
}

interface FieldConfig {
  label: string;
  key: keyof Omit<AttackMethod, "loads" | "properties">;
}

const fieldConfigList: FieldConfig[] = [
  {
    label: "1/2р",
    key: "half",
  },
  {
    label: "Размер",
    key: "size",
  },
  {
    label: "Урон",
    key: "damage",
  },
];

export default function DamageMethodItem(props: Props) {
  const { index, formHook, onChange } = props;
  return (
    <Box key={index}>
      {/* note Название */}
      <CustomLabel
        label={{
          text: "Название",
        }}
        orientation="row"
      >
        <Controller
          name={`attack.methods.list.${index}.name`}
          control={formHook.control}
          render={({ field }) => (
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              {...field}
              onChange={(e) => onChange(field, e)}
            />
          )}
        />
      </CustomLabel>
      <Box
        display="flex"
        sx={{
          gap: "0.2em",
        }}
      >
        {fieldConfigList.map((fieldConfig) => (
          <CustomLabel
            key={fieldConfig.key}
            label={{
              text: fieldConfig.label,
              color: "secondary",
              size: "body2",
            }}
            orientation="column"
          >
            <Controller
              name={`attack.methods.list.${index}.${fieldConfig.key}`}
              control={formHook.control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  {...field}
                  onChange={(e) => onChange(field, e)}
                />
              )}
            />
          </CustomLabel>
        ))}
        <Loads
          index={index}
          name={`attack.methods.list.${index}.loads`}
          amount={5}
          formHook={formHook}
          onChange={onChange}
          defaultValue={{ checked: true }}
        />
      </Box>
    </Box>
  );
}

import { Box } from "@mui/material";

import type { DefaultFormComponentProps } from "../../../../types/default-form-section-props.type.ts";
import type {
  AttackMethod,
  FormType,
} from "../../../../types/form/form.type.ts";
import Loads from "./Loads.tsx";
import BaseField from "../../../components/BaseField.tsx";

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
      <BaseField
        fieldName={`attack.methods.list.${index}.name`}
        label={{
          text: "Название",
        }}
        orientation="row"
      />

      <Box
        display="flex"
        sx={{
          gap: "0.2em",
        }}
      >
        {fieldConfigList.map((fieldConfig) => (
          <BaseField
            fieldName={`attack.methods.list.${index}.${fieldConfig.key}`}
            key={fieldConfig.key}
            label={{
              text: fieldConfig.label,
              color: "secondary",
              size: "body2",
            }}
            orientation="column"
          />
        ))}
        <Loads
          index={index}
          name={`attack.methods.list.${index}.loads`}
          amount={5}
          formHook={formHook}
          onChange={onChange}
          defaultValue={{ checked: false }}
        />
      </Box>
    </Box>
  );
}

import { Box } from "@mui/material";

import type {
  AttackMethod,
  FormType,
} from "../../../../types/form/form.type.ts";
import Loads from "./Loads.tsx";
import BaseField from "../../../components/BaseField.tsx";

interface Props {
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

export default function DamageMethodItem({ index }: Props) {
  return (
    <Box key={index}>
      <BaseField
        fieldName={`attack.methods.list.${index}.name`}
        label={{
          text: "Название",
        }}
        fieldType="text"
        orientation="row"
      />

      <Box
        display="flex"
        sx={{
          gap: "0.2em",
          flexWrap: "wrap",
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
          defaultValue={{ checked: false }}
        />
      </Box>
    </Box>
  );
}

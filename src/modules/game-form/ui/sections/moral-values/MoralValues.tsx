import { Box } from "@mui/material";

import type { FieldPath } from "react-hook-form";
import type { FormType } from "../../../types/form/form.type.ts";
import BaseField from "../../components/BaseField.tsx";
import { slotStyles } from "../styles.ts";

interface MoralValuesItem {
  label: string;
  fieldName: FieldPath<FormType>;
}

const moralValueItems: MoralValuesItem[] = [
  {
    label: "Авторитет",
    fieldName: "moralValue.authority",
  },
  {
    label: "Гордыня",
    fieldName: "moralValue.pride",
  },
  {
    label: "Соперничество",
    fieldName: "moralValue.rivalry",
  },
  {
    label: "Идеализм",
    fieldName: "moralValue.idealism",
  },
  {
    label: "Личность",
    fieldName: "moralValue.individualism",
  },
];

export default function MoralValues() {
  return (
    <Box
      sx={{
        maxHeight: "100vh",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {moralValueItems.map((item) => (
          <BaseField
            key={item.fieldName}
            fieldName={item.fieldName}
            label={{
              text: item.label,
            }}
            sxSlotProps={slotStyles}
            fieldType="text"
            multiline={{ isMultiline: true, rows: 4 }}
          />
        ))}
      </Box>
    </Box>
  );
}

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { FieldPath } from "react-hook-form";
import type { FormType } from "../../../types/form/form.type.ts";
import BaseField from "../../components/fields/BaseField.tsx";
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

// todo поменять на CustomTextField

export default function MoralValues() {
  const theme = useTheme();
  return (
    <Box>
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
            sxSlotProps={{
              ...slotStyles,
              backgroundColor: theme.palette.base.surfaceBase,
            }}
            fieldType="text"
            multiline={{ isMultiline: true, rows: 4 }}
          />
        ))}
      </Box>
    </Box>
  );
}

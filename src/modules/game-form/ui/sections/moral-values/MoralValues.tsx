import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { FieldPath } from "react-hook-form";
import type { FormType } from "../../../types/form/form.type.ts";

import { slotStyles } from "../styles.ts";
import CustomTextField from "../../components/fields/custom-text-field/CustomTextField.tsx";
import BaseSectionCard from "../../components/section/BaseSectionCard.tsx";

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
    <BaseSectionCard>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {moralValueItems.map((item) => (
          <CustomTextField
            key={item.fieldName}
            textField={{
              fieldName: item.fieldName,
              fieldType: "text",
              multiline: { isMultiline: true, rows: 4 },
              sxSlotProps: {
                ...slotStyles,
                backgroundColor: theme.palette.base.surfaceBase,
              },
            }}
            wrapper={{ direction: "column" }}
            title={item.label}
          />
        ))}
      </Box>
    </BaseSectionCard>
  );
}

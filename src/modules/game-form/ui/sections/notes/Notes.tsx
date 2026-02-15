import { useTheme } from "@mui/material/styles";

import { slotStyles } from "../styles.ts";
import CustomTextField from "../../components/fields/custom-text-field/CustomTextField.tsx";
import BaseSectionCard from "../../components/section/BaseSectionCard.tsx";

export default function Notes() {
  const theme = useTheme();
  return (
    <BaseSectionCard>
      <CustomTextField
        textField={{
          fieldName: "notes.text",
          fieldType: "text",
          multiline: { isMultiline: true, rows: 24 },
          sxSlotProps: {
            ...slotStyles,
            backgroundColor: theme.palette.base.surfaceBase,
          },
        }}
      />
    </BaseSectionCard>
  );
}

import { useTheme } from "@mui/material/styles";

import { slotStyles } from "../styles.ts";
import CustomTextField from "../../components/fields/custom-text-field/CustomTextField.tsx";
import BaseSectionCard from "../../components/section/BaseSectionCard.tsx";
import PrintOn from "../../../../../common/components/print/PrintOn.tsx";
import SectionHeader from "../../components/section/SectionHeader.tsx";

export default function Notes() {
  const theme = useTheme();
  return (
    <BaseSectionCard>
      <PrintOn>
        <SectionHeader
          title="Заметки"
          dividerColor={theme.palette.base.outline}
        />
      </PrintOn>
      <CustomTextField
        textField={{
          fieldName: "notes.text",
          fieldType: "text",
          additionalClassName: "print-fillable",
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

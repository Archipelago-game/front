import BaseField from "../../components/fields/BaseField.tsx";
import { slotStyles } from "../styles.ts";

export default function Notes() {
  return (
    <BaseField
      fieldName="notes.text"
      label={{
        text: "Заметки",
      }}
      fieldType="text"
      sxSlotProps={slotStyles}
      multiline={{ isMultiline: true, rows: 4 }}
    />
  );
}

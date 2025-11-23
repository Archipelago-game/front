import BaseField from "../../components/BaseField.tsx";
import { slotStyles } from "../styles.ts";

export default function Pride() {
  return (
    <BaseField
      fieldName="moralValue.pride"
      label={{
        text: "Гордыня",
      }}
      fieldType="text"
      sxSlotProps={slotStyles}
      multiline={{ isMultiline: true, rows: 2 }}
    />
  );
}

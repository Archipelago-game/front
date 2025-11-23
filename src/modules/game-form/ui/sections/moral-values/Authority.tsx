import BaseField from "../../components/BaseField.tsx";
import { slotStyles } from "../styles.ts";

export default function Authority() {
  return (
    <BaseField
      fieldName="moralValue.authority"
      label={{
        text: "Авторитет",
      }}
      sxSlotProps={slotStyles}
      fieldType="text"
      multiline={{ isMultiline: true, rows: 2 }}
    />
  );
}

import BaseField from "../../components/BaseField.tsx";
import { slotStyles } from "../styles.ts";

export default function Individualism() {
  return (
    <BaseField
      fieldName="moralValue.individualism"
      label={{
        text: "Личность",
      }}
      fieldType="text"
      sxSlotProps={slotStyles}
      multiline={{ isMultiline: true, rows: 2 }}
    />
  );
}

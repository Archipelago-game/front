import BaseField from "../../components/BaseField.tsx";
import { slotStyles } from "../styles.ts";

export default function Idealism() {
  return (
    <BaseField
      fieldName="moralValue.idealism"
      label={{
        text: "Идеализм",
      }}
      fieldType="text"
      sxSlotProps={slotStyles}
      multiline={{ isMultiline: true, rows: 2 }}
    />
  );
}

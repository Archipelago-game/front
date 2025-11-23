import BaseField from "../../components/BaseField.tsx";
import { slotStyles } from "../styles.ts";

export default function Rivalry() {
  return (
    <BaseField
      fieldName="moralValue.rivalry"
      label={{
        text: "Соперничество",
      }}
      fieldType="text"
      sxSlotProps={slotStyles}
      multiline={{ isMultiline: true, rows: 2 }}
    />
  );
}

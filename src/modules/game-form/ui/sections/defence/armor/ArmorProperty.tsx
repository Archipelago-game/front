import type { DefaultFormComponentProps } from "../../../../types/default-form-section-props.type.ts";
import BaseField from "../../../components/BaseField.tsx";

export default function ArmorProperty({
  formHook,
  onChange,
}: DefaultFormComponentProps) {
  return (
    <BaseField
      label={{
        text: "Свойства брони",
      }}
      fieldType="text"
      formHook={formHook}
      onChange={onChange}
      fieldName="defence.armor.property"
    />
  );
}

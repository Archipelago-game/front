import BaseField from "../../../components/BaseField.tsx";

export default function ArmorProperty() {
  return (
    <BaseField
      label={{
        text: "Свойства брони",
      }}
      fieldType="text"
      fieldName="defence.armor.property"
    />
  );
}

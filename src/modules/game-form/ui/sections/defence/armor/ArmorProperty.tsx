import CustomTextField from "../../../components/fields/custom-text-field/CustomTextField.tsx";

export default function ArmorProperty() {
  return (
    <CustomTextField
      title="Свойства брони"
      orientation="column"
      textField={{ fieldName: "defence.armor.property", fieldType: "text" }}
    />
  );
}

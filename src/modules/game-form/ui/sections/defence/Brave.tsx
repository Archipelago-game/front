import CustomTextField from "../../components/fields/custom-text-field/CustomTextField.tsx";

export default function Brave() {
  return (
    <CustomTextField
      title="Отвага"
      textField={{ fieldName: "defence.brave" }}
    />
  );
}

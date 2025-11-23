import BaseField from "../../components/BaseField.tsx";

export default function Rivalry() {
  return (
    <BaseField
      fieldName="moralValue.rivalry"
      label={{
        text: "Соперничество",
      }}
      fieldType="text"
      multiline={{ isMultiline: true, rows: 2 }}
    />
  );
}

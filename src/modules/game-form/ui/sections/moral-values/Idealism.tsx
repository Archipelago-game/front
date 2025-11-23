import BaseField from "../../components/BaseField.tsx";

export default function Idealism() {
  return (
    <BaseField
      fieldName="moralValue.idealism"
      label={{
        text: "Идеализм",
      }}
      fieldType="text"
      multiline={{ isMultiline: true, rows: 2 }}
    />
  );
}

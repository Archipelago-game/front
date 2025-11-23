import BaseField from "../../components/BaseField.tsx";

export default function Individualism() {
  return (
    <BaseField
      fieldName="moralValue.individualism"
      label={{
        text: "Личность",
      }}
      fieldType="text"
      multiline={{ isMultiline: true, rows: 2 }}
    />
  );
}

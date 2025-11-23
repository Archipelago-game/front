import BaseField from "../../components/BaseField.tsx";

export default function Authority() {
  return (
    <BaseField
      fieldName="moralValue.authority"
      label={{
        text: "Авторитет",
      }}
      fieldType="text"
      multiline={{ isMultiline: true, rows: 2 }}
    />
  );
}

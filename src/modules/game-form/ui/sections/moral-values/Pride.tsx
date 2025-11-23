import BaseField from "../../components/BaseField.tsx";

export default function Pride() {
  return (
    <BaseField
      fieldName="moralValue.pride"
      label={{
        text: "Гордыня",
      }}
      fieldType="text"
      multiline={{ isMultiline: true, rows: 2 }}
    />
  );
}

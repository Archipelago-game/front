import BaseField from "../../components/BaseField.tsx";

export default function Notes() {
  return (
    <BaseField
      fieldName="notes.text"
      label={{
        text: "Заметки",
      }}
      fieldType="text"
      multiline={{ isMultiline: true, rows: 4 }}
    />
  );
}

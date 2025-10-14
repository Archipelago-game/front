import BaseField from "../../components/BaseField.tsx";

export default function Brave() {
  return (
    <BaseField
      fieldName="defence.brave"
      label={{
        color: "primary",
        text: "Отвага",
      }}
      orientation="row"
      sx={{
        flex: "0 1 0",
      }}
    />
  );
}

import BaseField from "../../components/BaseField.tsx";

export default function Wallet() {
  return (
    <BaseField
      fieldName={"inventory.wallet"}
      label={{
        text: "Деньги",
      }}
    />
  );
}

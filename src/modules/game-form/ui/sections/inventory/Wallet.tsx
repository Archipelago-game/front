import BaseField from "../../components/fields/BaseField.tsx";

export default function Wallet() {
  return (
    <BaseField
      fieldName={"inventory.wallet"}
      label={{
        text: "Деньги",
      }}
      isShowChangeValueBtn={true}
    />
  );
}

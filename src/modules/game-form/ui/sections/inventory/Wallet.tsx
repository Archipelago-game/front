import CustomTextField from "../../components/fields/custom-text-field/CustomTextField.tsx";

export default function Wallet() {
  return (
    <CustomTextField
      title="Деньги"
      textField={{
        fieldName: "inventory.wallet",
        showChangeValueBtn: true,
        fullWidth: true,
      }}
    />
  );
}

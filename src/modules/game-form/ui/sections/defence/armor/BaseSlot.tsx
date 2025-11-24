import CustomLabel from "../../../components/CustomLabel.tsx";

import BaseField from "../../../components/BaseField.tsx";

import type { DefaultFieldControllerProps } from "../../../components/controllers/TextFieldController.tsx";

interface Props extends DefaultFieldControllerProps {
  primaryText: string;
  secondaryText: string;
}

export default function BaseSlot(props: Props) {
  const { primaryText, secondaryText, fieldName } = props;
  return (
    <CustomLabel
      label={{
        color: "primary",
        text: primaryText,
      }}
    >
      <BaseField
        label={{
          color: "secondary",
          text: secondaryText,
        }}
        fieldName={fieldName}
      />
    </CustomLabel>
  );
}

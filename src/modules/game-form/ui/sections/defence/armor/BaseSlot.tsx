import type { DefaultFormComponentProps } from "../../../../types/default-form-section-props.type.ts";
import CustomLabel from "../../../components/CustomLabel.tsx";

import BaseField from "../../../components/BaseField.tsx";

import type { FormNestedKeys } from "../../../../types/form-nested-keys.type.ts";

interface Props extends DefaultFormComponentProps {
  primaryText: string;
  secondaryText: string;
  propName: FormNestedKeys;
}

export default function BaseSlot(props: Props) {
  const { primaryText, secondaryText, propName, onChange, formHook } = props;
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
        fieldName={propName}
        onChange={onChange}
        formHook={formHook}
      />
    </CustomLabel>
  );
}

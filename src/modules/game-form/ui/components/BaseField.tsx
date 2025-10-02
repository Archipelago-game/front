import CustomLabel, { type CustomLabelProps } from "./CustomLabel.tsx";

import TextFieldController, {
  type DefaultFieldControllerProps,
} from "./TextFieldController.tsx";

type Props = DefaultFieldControllerProps & Omit<CustomLabelProps, "children">;

export default function BaseField(props: Props) {
  const { fieldName, fieldType, onChange, formHook } = props;

  return (
    <CustomLabel
      label={props.label}
      orientation={props.orientation}
      sx={props.sx}
    >
      <TextFieldController
        fieldName={fieldName}
        fieldType={fieldType}
        formHook={formHook}
        onChange={onChange}
      />
    </CustomLabel>
  );
}

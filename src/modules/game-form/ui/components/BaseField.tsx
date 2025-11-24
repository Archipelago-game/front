import CustomLabel, { type CustomLabelProps } from "./CustomLabel.tsx";

import TextFieldController, {
  type DefaultFieldControllerProps,
} from "./controllers/TextFieldController.tsx";

type Props = DefaultFieldControllerProps & Omit<CustomLabelProps, "children">;

export default function BaseField(props: Props) {
  return (
    <CustomLabel
      label={props.label}
      orientation={props.orientation}
      sx={props.sx}
    >
      <TextFieldController {...props} />
    </CustomLabel>
  );
}

import TextFieldControllerNew, {
  type DefaultFieldControllerProps,
} from "../../controllers/TextFieldControllerNew.tsx";

import CustomTextFieldLabel from "./CustomTextFieldLabel.tsx";
import CustomTextFieldWrapper from "./CustomTextFieldWrapper.tsx";

interface Props {
  title: string;
  textField: DefaultFieldControllerProps;
  orientation?: "column" | "row";
}

export default function CustomTextField({
  title,
  textField,
  orientation = "row",
}: Props) {
  return (
    <CustomTextFieldWrapper orientation={orientation}>
      <CustomTextFieldLabel title={title} />
      <TextFieldControllerNew {...textField} />
    </CustomTextFieldWrapper>
  );
}

import TextFieldControllerNew, {
  type DefaultFieldControllerProps,
} from "../../controllers/TextFieldControllerNew.tsx";

import CustomTextFieldLabel from "./CustomTextFieldLabel.tsx";
import CustomTextFieldWrapper from "./CustomTextFieldWrapper.tsx";

interface Props {
  title: string;
  textField: DefaultFieldControllerProps;
}

export default function CustomTextField({ title, textField }: Props) {
  return (
    <CustomTextFieldWrapper>
      <CustomTextFieldLabel title={title} />
      <TextFieldControllerNew {...textField} />
    </CustomTextFieldWrapper>
  );
}

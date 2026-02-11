import TextFieldControllerNew, {
  type DefaultFieldControllerProps,
} from "../../controllers/TextFieldControllerNew.tsx";

import CustomTextFieldLabel from "./CustomTextFieldLabel.tsx";
import CustomTextFieldWrapper from "./CustomTextFieldWrapper.tsx";
import type { StackProps } from "@mui/material/Stack";

interface Props {
  title?: string;
  textField: DefaultFieldControllerProps;
  wrapper?: StackProps;
}

export default function CustomTextField({ title, textField, wrapper }: Props) {
  return (
    <CustomTextFieldWrapper stackProps={wrapper}>
      {title && <CustomTextFieldLabel title={title} />}
      <TextFieldControllerNew {...textField} />
    </CustomTextFieldWrapper>
  );
}

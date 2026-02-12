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

/**
 * @description
 * ширина по умолчанию "кнопки" 54 + поле 35 = 89*
 * Кастомное текстовое поле с интеграцией react-hook-form.
 */

export default function CustomTextField({ title, textField, wrapper }: Props) {
  return (
    <CustomTextFieldWrapper stackProps={wrapper}>
      {title && <CustomTextFieldLabel title={title} />}
      <TextFieldControllerNew {...textField} />
    </CustomTextFieldWrapper>
  );
}

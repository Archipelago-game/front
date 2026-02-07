import { Stack } from "@mui/material";

import TextFieldControllerNew, {
  type DefaultFieldControllerProps,
} from "../../controllers/TextFieldControllerNew.tsx";

import CustomTextFieldLabel from "./CustomTextFieldLabel.tsx";

interface Props {
  title: string;
  textField: DefaultFieldControllerProps;
}

export default function CustomTextField({ title, textField }: Props) {
  return (
    <Stack direction="row" spacing={1}>
      <CustomTextFieldLabel title={title} />
      <TextFieldControllerNew {...textField} />
    </Stack>
  );
}

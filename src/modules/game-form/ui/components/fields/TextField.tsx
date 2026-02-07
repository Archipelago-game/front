import { Box, Stack } from "@mui/material";

import TextFieldControllerNew, {
  type DefaultFieldControllerProps,
} from "../controllers/TextFieldControllerNew.tsx";
import { useTheme } from "@mui/material/styles";

interface Props {
  title: string;
  textField: DefaultFieldControllerProps;
}

export default function TextField({ title, textField }: Props) {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={1}>
      <Box component="span" color={theme.palette.base.text.primary}>
        {title}:
      </Box>
      <TextFieldControllerNew {...textField} />
    </Stack>
  );
}

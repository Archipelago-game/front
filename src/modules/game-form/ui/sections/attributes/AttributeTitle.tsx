import { Box, Divider, Stack } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import SubTitle from "../../components/section/SubTitle.tsx";
import TextFieldControllerNew from "../../components/controllers/TextFieldControllerNew.tsx";
import type { DefaultFieldControllerProps } from "../../components/controllers/type.ts";

interface Props extends DefaultFieldControllerProps {
  title: string;
}

export default function AttributeTitle({ fieldName, title }: Props) {
  const theme = useTheme();
  return (
    <Box mb={2}>
      <Stack
        direction="row"
        spacing={1}
        mb={1}
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <SubTitle title={title.toUpperCase()} />
        <TextFieldControllerNew fieldName={fieldName} />
      </Stack>
      <Divider sx={{ borderColor: theme.palette.base.accent }} />
    </Box>
  );
}

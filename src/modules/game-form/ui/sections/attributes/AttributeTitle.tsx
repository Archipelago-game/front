import { Box, Divider, Stack } from "@mui/material";

import { type DefaultFieldControllerProps } from "../../components/controllers/TextFieldController.tsx";
import { useTheme } from "@mui/material/styles";
import SubTitle from "../../components/section/SubTitle.tsx";
import TextFieldControllerNew from "../../components/controllers/TextFieldControllerNew.tsx";

interface Props extends DefaultFieldControllerProps {
  title: string;
}

export default function AttributeTitle({ fieldName, title }: Props) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Stack direction="row" spacing={1}>
        <SubTitle title={title} />
        <TextFieldControllerNew fieldName={fieldName} />
      </Stack>
      <Divider sx={{ backgroundColor: theme.palette.base.outlineStrong }} />
    </Box>
  );
}

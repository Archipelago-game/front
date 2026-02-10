import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
  title: string;
}
export default function CustomTextFieldLabel({ title }: Props) {
  const theme = useTheme();
  return (
    <Box component="span" color={theme.palette.base.text.primary}>
      {title}
    </Box>
  );
}

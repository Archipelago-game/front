import { Box, Typography } from "@mui/material";
import { defaultLabelTextStyles } from "../../components/styles/label.styles.ts";

import TextFieldController, {
  type DefaultFieldControllerProps,
} from "../../components/controllers/TextFieldController.tsx";
import { useTheme } from "@mui/material/styles";

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
      <Box sx={{ flexGrow: 1, ...defaultLabelTextStyles(theme, "primary") }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: {
              xs: ".9em", // <600px
              sm: "1em",
              md: "1em", // ≥960px
            },
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box>
        <TextFieldController fieldName={fieldName} orientation="row" />
      </Box>
    </Box>
  );
}

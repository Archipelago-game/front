import { Box, Typography } from "@mui/material";
import { defaultLabelTextStyles } from "./styles/label.styles.ts";
import { theme } from "../../../../common/styles/theme/custom-theme.ts";
import TextFieldController, {
  type DefaultFieldControllerProps,
} from "./TextFieldController.tsx";

interface Props extends DefaultFieldControllerProps {
  title: string;
}

export default function StatTitle({ fieldName, title }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box sx={{ flexGrow: 1, ...defaultLabelTextStyles(theme, "primary") }}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box>
        <TextFieldController fieldName={fieldName} />
      </Box>
    </Box>
  );
}

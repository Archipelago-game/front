import { Box } from "@mui/material";

import TextFieldController from "../../components/TextFieldController.tsx";

export default function Notes() {
  return (
    <Box>
      <TextFieldController
        name="notes"
        multiline={{ isMultiline: true, rows: 4 }}
      />
    </Box>
  );
}

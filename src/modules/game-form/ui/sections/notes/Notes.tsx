import { useTheme } from "@mui/material/styles";

import BaseField from "../../components/fields/BaseField.tsx";
import { slotStyles } from "../styles.ts";

// todo поменять на CustomTextField
export default function Notes() {
  const theme = useTheme();
  return (
    <BaseField
      fieldName="notes.text"
      label={{ text: "" }}
      fieldType="text"
      sxSlotProps={{
        ...slotStyles,
        backgroundColor: theme.palette.base.surfaceBase,
      }}
      multiline={{ isMultiline: true, rows: 24 }}
    />
  );
}

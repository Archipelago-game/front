import { Box } from "@mui/material";
import TextFieldControllerNew from "../../../components/controllers/TextFieldControllerNew.tsx";
import type { FieldPath } from "react-hook-form";
import type { FormType } from "../../../../types/form/form.type.ts";
import { useTheme } from "@mui/material/styles";

interface SlotProps {
  top: string;
  left: string;
  fieldName: FieldPath<FormType>;
}

export default function Slot({ top, left, fieldName }: SlotProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "absolute",
        top,
        left,
        transform: "translate(-50%, -50%)",
        width: "35px",
        backgroundColor: theme.palette.base.surfaceBase,
      }}
    >
      <TextFieldControllerNew fieldName={fieldName} />
    </Box>
  );
}

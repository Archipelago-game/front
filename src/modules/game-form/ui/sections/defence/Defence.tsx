import type { DefaultFormComponentProps } from "../../../types/default-form-section-props.type.ts";
import { Box, Typography } from "@mui/material";

export default function Defence({
  formHook,
  onChange,
}: DefaultFormComponentProps) {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
        }}
      >
        Защита
      </Typography>
      <Box>TESt</Box>
    </>
  );
}

import type { DefaultFormComponentProps } from "../../../types/default-form-section-props.type.ts";
import { Box, Typography } from "@mui/material";
import Brave from "./Brave.tsx";
import Armor from "./armor/Armor.tsx";
import ArmorProperty from "./armor/ArmorProperty.tsx";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Brave formHook={formHook} onChange={onChange} />
        <Armor formHook={formHook} onChange={onChange} />
        <ArmorProperty formHook={formHook} onChange={onChange} />
      </Box>
    </>
  );
}

import type { DefaultFormComponentProps } from "../../../../types/default-form-section-props.type.ts";
import CustomLabel from "../../../components/CustomLabel.tsx";
import { Box } from "@mui/material";
import Head from "./Head.tsx";

export default function Armor({
  formHook,
  onChange,
}: DefaultFormComponentProps) {
  return (
    <CustomLabel
      label={{
        text: "Броня",
      }}
      orientation="column"
    >
      <Box>
        <Head formHook={formHook} onChange={onChange} />
      </Box>
    </CustomLabel>
  );
}

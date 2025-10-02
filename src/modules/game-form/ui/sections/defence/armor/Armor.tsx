import type { DefaultFormComponentProps } from "../../../../types/default-form-section-props.type.ts";
import CustomLabel from "../../../components/CustomLabel.tsx";
import { Box } from "@mui/material";
import Head from "./Head.tsx";
import RightHand from "./RightHand.tsx";
import LeftHand from "./LeftHand.tsx";
import LeftLeg from "./LeftLeg.tsx";
import RightLeg from "./LeftLeg.tsx";
import Body from "./Body.tsx";

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
        <RightHand formHook={formHook} onChange={onChange} />
        <LeftHand formHook={formHook} onChange={onChange} />
        <LeftLeg formHook={formHook} onChange={onChange} />
        <RightLeg formHook={formHook} onChange={onChange} />
        <Body formHook={formHook} onChange={onChange} />
      </Box>
    </CustomLabel>
  );
}

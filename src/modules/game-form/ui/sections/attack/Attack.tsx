import { Typography } from "@mui/material";

import type { DefaultFormSectionProps } from "../../../types/default-form-section-props.type.ts";

import DamageBonus from "./damage-bonus/DamageBonus.tsx";
import DamageMethods from "./damage-methods/DamageMethods.tsx";

export default function Attack({
  formHook,
  onChange,
}: DefaultFormSectionProps) {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
        }}
      >
        Атака
      </Typography>
      <DamageBonus formHook={formHook} onChange={onChange} />
      <DamageMethods formHook={formHook} onChange={onChange} name="attack" />
    </>
  );
}

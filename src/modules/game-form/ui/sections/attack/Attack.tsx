import { Box, Typography } from "@mui/material";

import type { DefaultFormComponentProps } from "../../../types/default-form-section-props.type.ts";

import DamageBonus from "./damage-bonus/DamageBonus.tsx";
import DamageMethods from "./damage-methods/DamageMethods.tsx";
import type { FormType } from "../../../types/form/form.type.ts";

const defaultValues = {
  name: "",
  distance: 0,
  half: 0,
  size: 0,
  damage: 0,
  loads: {
    amount: 5,
    list: [{ checked: false }],
  },
  properties: "",
};

interface Props extends DefaultFormComponentProps {
  values: FormType;
}

export default function Attack({ formHook, onChange, values }: Props) {
  return (
    <>
      {/* todo вынести в отдельный компонент */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
        }}
      >
        Атака
      </Typography>
      <Box mb={1}>
        <DamageBonus />
      </Box>
      <DamageMethods
        formHook={formHook}
        onChange={onChange}
        name="attack.methods"
        amount={2}
        values={values}
        defaultValue={defaultValues}
      />
    </>
  );
}

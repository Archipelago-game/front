import { Box } from "@mui/material";

import DamageBonus from "./damage-bonus/DamageBonus.tsx";
import DamageMethods from "./damage-methods/DamageMethods.tsx";
import type { FormType } from "../../../types/form/form.type.ts";
import SectionTitle from "../../components/SectionTitle.tsx";

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

interface Props {
  values: FormType;
}

export default function Attack({ values }: Props) {
  return (
    <Box>
      <SectionTitle title="Атака" />
      <Box mb={1}>
        <DamageBonus />
      </Box>
      <DamageMethods
        name="attack.methods"
        amount={2}
        values={values}
        defaultValue={defaultValues}
      />
    </Box>
  );
}

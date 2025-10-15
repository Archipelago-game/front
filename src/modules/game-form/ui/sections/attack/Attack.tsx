import { Box } from "@mui/material";

import type { DefaultFormComponentProps } from "../../../types/default-form-section-props.type.ts";

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

interface Props extends DefaultFormComponentProps {
  values: FormType;
}

export default function Attack({ formHook, onChange, values }: Props) {
  return (
    <Box>
      <SectionTitle title="Атака" />
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
    </Box>
  );
}

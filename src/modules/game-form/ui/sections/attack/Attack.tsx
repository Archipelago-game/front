import { Stack } from "@mui/material";

import SectionCard from "../../components/section/SectionCard.tsx";
import SubTitle from "../../components/section/SubTitle.tsx";
import CustomTextField from "../../components/fields/custom-text-field/CustomTextField.tsx";
import DamageMethodsNew from "./damage-methods/DamageMethodsNew.tsx";

export default function Attack() {
  return (
    <SectionCard title="Атака">
      <SubTitle title="Бонусы к урону" />
      <Stack direction="row" columnGap={3} rowGap={1} mb={2}>
        <CustomTextField
          title="Физический"
          textField={{ fieldName: "attack.damageBonus.physical" }}
        />
        <CustomTextField
          title="Ментальный"
          textField={{ fieldName: "attack.damageBonus.mental" }}
        />
      </Stack>

      <DamageMethodsNew />
    </SectionCard>
  );
}

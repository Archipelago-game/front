import { Box } from "@mui/system";

import SubTitle from "../../../components/section/SubTitle.tsx";
import { Stack } from "@mui/material";
import CustomTextField from "../../../components/fields/custom-text-field/CustomTextField.tsx";

export default function DamageBonus() {
  return (
    <Box>
      <SubTitle title="Бонусы к урону" />
      <Stack direction="row" columnGap={3} rowGap={1} flexWrap="wrap">
        <CustomTextField
          title="Физический"
          textField={{ fieldName: "attack.damageBonus.physical" }}
        />
        <CustomTextField
          title="Ментальный"
          textField={{ fieldName: "attack.damageBonus.mental" }}
        />
      </Stack>
    </Box>
  );
}

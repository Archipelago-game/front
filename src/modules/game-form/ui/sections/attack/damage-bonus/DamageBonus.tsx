import CustomLabel from "../../../components/CustomLabel.tsx";
import { Box } from "@mui/system";

import BaseField from "../../../components/BaseField.tsx";

export default function DamageBonus() {
  return (
    <CustomLabel
      label={{
        text: "Бонусы к урону",
        size: "h6",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.2em",
        }}
      >
        <BaseField
          fieldName="attack.damageBonus.physical"
          label={{
            color: "secondary",
            text: "Физический",
          }}
          orientation="row"
        />

        <BaseField
          fieldName="attack.damageBonus.mental"
          label={{
            color: "secondary",
            text: "Ментальный",
          }}
          orientation="row"
        />
      </Box>
    </CustomLabel>
  );
}

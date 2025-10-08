import CustomLabel from "../../components/CustomLabel.tsx";

import { Box } from "@mui/material";
import BaseField from "../../components/BaseField.tsx";

export default function Experience() {
  return (
    <>
      <CustomLabel label={{ text: "Опыт" }} sx={{ flex: "1 0 1" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.2em",
            width: "300px",
          }}
        >
          <BaseField
            fieldName="experience.total"
            label={{
              color: "secondary",
              text: "Всего",
            }}
            orientation="row"
          />

          <BaseField
            fieldName="experience.used"
            label={{
              color: "secondary",
              text: "Исп.",
            }}
            orientation="row"
          />
        </Box>
      </CustomLabel>
    </>
  );
}

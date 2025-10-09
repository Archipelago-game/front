import { Box, Grid } from "@mui/material";
import CustomLabel from "../../components/CustomLabel.tsx";

import BaseField from "../../components/BaseField.tsx";

export default function BaseInfo() {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <BaseField
          fieldName="name"
          label={{
            text: "Имя персонажа",
          }}
          fieldType="text"
        />
      </Grid>
      <Grid size={8}>
        <CustomLabel>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.2em",
            }}
          >
            <BaseField
              fieldName="age"
              label={{
                color: "secondary",
                text: "Возраст",
              }}
              orientation="row"
            />

            <BaseField
              fieldName="homeland"
              label={{
                color: "secondary",
                text: "Родина",
              }}
              orientation="row"
              fieldType="text"
            />

            <Box
              sx={{
                width: "100%",
              }}
            >
              <BaseField
                fieldName="languages"
                label={{
                  color: "secondary",
                  text: "Языки",
                }}
                orientation="row"
                fieldType="text"
              />
            </Box>
          </Box>
        </CustomLabel>
      </Grid>
    </Grid>
  );
}

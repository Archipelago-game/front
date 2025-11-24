import { Box, Grid } from "@mui/material";
import CustomLabel from "../../components/CustomLabel.tsx";

import BaseField from "../../components/BaseField.tsx";
import SectionTitle from "../../components/SectionTitle.tsx";
import Immortal from "./Immortal.tsx";

export default function BaseInfo() {
  return (
    <>
      <SectionTitle title="Персонаж" />

      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 4 }}>
          <BaseField
            fieldName="name"
            label={{
              text: "Имя персонажа",
            }}
            fieldType="text"
          />
          <Immortal />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
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
    </>
  );
}

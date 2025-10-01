import { Box, Grid, TextField } from "@mui/material";
import CustomLabel from "../../components/CustomLabel.tsx";
import { Controller } from "react-hook-form";

import type { DefaultFormSectionProps } from "../../../types/default-form-section-props.type.ts";

export default function BaseInfo({
  formHook,
  onChange,
}: DefaultFormSectionProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <CustomLabel
          label={{
            text: "Имя персонажа",
          }}
        >
          <Controller
            name="name"
            control={formHook.control}
            render={({ field }) => (
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                {...field}
                onChange={(e) => onChange(field, e)}
              />
            )}
          />
        </CustomLabel>
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
            <CustomLabel
              label={{
                color: "secondary",
                text: "Возраст",
              }}
              orientation="row"
            >
              <Controller
                name="age"
                control={formHook.control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    type="number"
                    {...field}
                    onChange={(e) => onChange(field, e)}
                  />
                )}
              />
            </CustomLabel>
            <CustomLabel
              label={{
                color: "secondary",
                text: "Родина",
              }}
              orientation="row"
            >
              <Controller
                name="homeland"
                control={formHook.control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    {...field}
                    onChange={(e) => onChange(field, e)}
                  />
                )}
              />
            </CustomLabel>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <CustomLabel
                label={{
                  color: "secondary",
                  text: "Языки",
                }}
                orientation="row"
              >
                <Controller
                  name="languages"
                  control={formHook.control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      {...field}
                      onChange={(e) => onChange(field, e)}
                    />
                  )}
                />
              </CustomLabel>
            </Box>
          </Box>
        </CustomLabel>
      </Grid>
    </Grid>
  );
}

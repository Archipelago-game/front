import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import type { DefaultFormSectionProps } from "../../../types/default-form-section.props.ts";
import CustomLabel from "../../components/CustomLabel.tsx";
import { Controller } from "react-hook-form";

export default function Attack({
  formHook,
  onChange,
}: DefaultFormSectionProps) {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
        }}
      >
        Атака
      </Typography>
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
              text: "Физический",
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
              text: "Ментальный",
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
        </Box>
      </CustomLabel>
    </>
  );
}

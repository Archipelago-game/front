import type { DefaultFormSectionProps } from "../../types/default-form-section.props.ts";
import CustomLabel from "../components/CustomLabel.tsx";
import { Controller } from "react-hook-form";
import { Box, TextField } from "@mui/material";

export default function Experience({
  formHook,
  onChange,
}: DefaultFormSectionProps) {
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
          <CustomLabel
            label={{
              color: "secondary",
              text: "Всего",
            }}
            orientation="row"
          >
            <Controller
              name="experience.total"
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
              text: "Исп.",
            }}
            orientation="row"
          >
            <Controller
              name="experience.used"
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
        </Box>
      </CustomLabel>
    </>
  );
}

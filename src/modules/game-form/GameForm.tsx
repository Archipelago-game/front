import { useFormCustom } from "./hooks/use-form-values.hook.ts";

import { api } from "../../api/api.ts";

import { Box, Grid } from "@mui/material";
import BaseInfo from "./ui/sections/base-info/BaseInfo.tsx";
import { type ControllerRenderProps } from "react-hook-form";
import type { FormValues } from "./types/form-values.type.ts";
import { type ChangeEvent } from "react";
import Luck from "./ui/sections/luck/Luck.tsx";
import Experience from "./ui/sections/experience/Experience.tsx";
import Attack from "./ui/sections/attack/Attack.tsx";

export default function GameForm() {
  const { methods: formHook, values } = useFormCustom();

  const onChange = async (
    field: ControllerRenderProps<FormValues>,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    field.onChange(e);
    await api.save(formHook.getValues());
  };

  return (
    <Grid container spacing={5}>
      <Grid size={4}>
        <Attack formHook={formHook} onChange={onChange} />
      </Grid>
      <Grid size={8}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <BaseInfo formHook={formHook} onChange={onChange} />
          </Grid>
          <Grid size={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Luck values={values} formHook={formHook} onChange={onChange} />
              <Experience formHook={formHook} onChange={onChange} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

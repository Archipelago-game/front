import { useFormCustom } from "./hooks/use-form-values.hook.ts";

import { api } from "../../api/api.ts";

import { Box, Grid } from "@mui/material";
import BaseInfo from "./ui/sections/base-info/BaseInfo.tsx";
import { type ControllerRenderProps } from "react-hook-form";
import type { FormValues } from "./types/form-values.type.ts";
import { type ChangeEvent } from "react";
import Luck from "./ui/sections/Luck/Luck.tsx";

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
      <Grid size={3}>
        <Box>Атака</Box>
      </Grid>
      <Grid size={9}>
        <BaseInfo formHook={formHook} onChange={onChange} />
      </Grid>
      <Grid size={6}>
        <Luck values={values} formHook={formHook} onChange={onChange} />
      </Grid>
    </Grid>
  );
}

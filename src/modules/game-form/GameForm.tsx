import { Box, Grid } from "@mui/material";

import BaseInfo from "./sections/base-info/BaseInfo.tsx";
import { type ControllerRenderProps, useForm } from "react-hook-form";
import type { FormValues } from "./types/form-values.type.ts";
import { FORM_DEFAULT_VALUES } from "./consts/form-default-values.const.ts";
import type { ChangeEvent } from "react";
import { api } from "../../api/api.ts";

export default function GameForm() {
  const formHook = useForm<FormValues>({
    defaultValues: FORM_DEFAULT_VALUES,
  });

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
    </Grid>
  );
}

import { useFormCustom } from "./hooks/use-form-values.hook.ts";

import { api } from "../../api/api.ts";

import { Box, Grid } from "@mui/material";
import BaseInfo from "./ui/sections/base-info/BaseInfo.tsx";
import { type ControllerRenderProps } from "react-hook-form";
import type { FormType } from "./types/form.type.ts";
import { useEffect, type ChangeEvent } from "react";
import Luck from "./ui/sections/luck/Luck.tsx";
import Experience from "./ui/sections/experience/Experience.tsx";
import Attack from "./ui/sections/attack/Attack.tsx";
import Defence from "./ui/sections/defence/Defence.tsx";
import { useFormContext } from "./providers/use-context-form.hook.ts";

export default function GameForm() {
  const { methods, values } = useFormCustom();
  const formContext = useFormContext();

  const handleOnChange = async (
    field: ControllerRenderProps<FormType>,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    field.onChange(e);
    await api.save(methods.getValues());
  };

  useEffect(() => {
    if (formContext) {
      formContext.formHook?.set(methods);
      formContext.onChange?.set(handleOnChange);
    }
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid size={4}>
        <Attack values={values} formHook={methods} onChange={handleOnChange} />
        <Defence formHook={methods} onChange={handleOnChange} />
      </Grid>
      <Grid size={8}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <BaseInfo formHook={methods} onChange={handleOnChange} />
          </Grid>
          <Grid size={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Luck
                values={values}
                formHook={methods}
                onChange={handleOnChange}
              />
              <Experience formHook={methods} onChange={handleOnChange} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

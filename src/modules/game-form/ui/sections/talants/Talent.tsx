import { Box, Grid } from "@mui/material";
import BaseField from "../../components/BaseField.tsx";

import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";

export default function Talent() {
  const { methods, values } = useCustomFormContext();

  const { fields, replace } = useFieldArray({
    name: "talents.list",
    control: methods.control,
  });

  useEffect(() => {
    if (values) {
      replace(values.talents.list);
    }
  }, [values?.talents.list, methods]);

  return (
    <Grid container gap={2}>
      {fields.map((field, i) => (
        <Box key={field.id}>
          <Grid container key={field.id}>
            <Grid size={8}>
              <BaseField
                fieldName={`talents.list.${i}.name`}
                label={{
                  text: "Название",
                }}
                orientation="row"
                fieldType="text"
              />
            </Grid>
            <Grid size={4}>
              <BaseField
                fieldName={`talents.list.${i}.branch`}
                label={{
                  text: "Ветка",
                  color: "secondary",
                }}
                orientation="row"
                fieldType="text"
              />
            </Grid>
            <Grid size={9}>
              <BaseField
                fieldName={`talents.list.${i}.effect`}
                label={{
                  text: "Эффект",
                  color: "secondary",
                }}
                orientation="row"
                fieldType="text"
              />
            </Grid>
            <Grid size={3}>
              <BaseField
                fieldName={`talents.list.${i}.rang`}
                label={{
                  text: "Ранг",
                  color: "secondary",
                }}
                orientation="row"
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Grid>
  );
}

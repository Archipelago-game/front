import { Box, Button, Grid } from "@mui/material";
import BaseField from "../../components/BaseField.tsx";

import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { defaultTalent } from "../../../consts/talents-default.const.ts";

export default function Talent() {
  const { methods, values } = useCustomFormContext();

  const { fields, replace, append } = useFieldArray({
    name: "talents.list",
    control: methods.control,
  });

  const addTalent = () => {
    append(defaultTalent);
  };

  useEffect(() => {
    if (values) {
      replace(values.talents.list);
    }
  }, [values?.talents.list, methods]);

  return (
    <Box width={"fit-content"}>
      <Grid container gap={2} justifyContent={"flex-end"}>
        {fields.map((field, i) => (
          <Box key={field.id}>
            <Grid container key={field.id} wrap={"wrap"}>
              <Grid size={{ xs: 12, md: 8 }}>
                <BaseField
                  fieldName={`talents.list.${i}.name`}
                  label={{
                    text: "Название",
                  }}
                  orientation="row"
                  fieldType="text"
                />
              </Grid>
              <Grid size={{ xs: 8, md: 4 }}>
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
              <Grid size={{ xs: 12, md: 9 }} order={{ xs: 4, md: 3 }}>
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
              <Grid size={{ xs: 4, md: 3 }} order={{ xs: 3, md: 4 }}>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={addTalent}>Добавить</Button>
      </Box>
    </Box>
  );
}

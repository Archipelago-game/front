import { Box, Button, Grid, IconButton } from "@mui/material";
import BaseField from "../../components/BaseField.tsx";

import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { defaultTalent } from "../../../consts/talents-default.const.ts";
import TooltipWrapper from "../../components/TooltipWrapper.tsx";
import { Delete } from "@mui/icons-material";

const LABEL_STYLES = {
  sx: { width: "4rem" },
};

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
      <Grid container gap={2} justifyContent={"flex-end"} mb={1}>
        {fields.map((field, i) => (
          <Box
            key={field.id}
            sx={{
              position: "relative",
              paddingLeft: "20px",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -2,
                left: 0,
              }}
            >
              {/* todo стили для hover */}
              <IconButton sx={{ padding: 0, margin: "0 auto" }}>
                <Delete fontSize="small" />
              </IconButton>
            </Box>
            <Grid container key={field.id} wrap={"wrap"}>
              <Grid size={{ xs: 12, md: 8 }}>
                <BaseField
                  fieldName={`talents.list.${i}.name`}
                  label={{
                    text: "Название",
                    ...LABEL_STYLES,
                  }}
                  orientation="row"
                  fieldType="text"
                  disabled={true}
                />
              </Grid>
              <Grid size={{ xs: 8, md: 4 }}>
                <BaseField
                  fieldName={`talents.list.${i}.branch`}
                  label={{
                    text: "Ветка",
                    color: "secondary",
                    ...LABEL_STYLES,
                  }}
                  orientation="row"
                  fieldType="text"
                  disabled={true}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 10 }} order={{ xs: 4, md: 3 }}>
                <TooltipWrapper text={field.effect}>
                  <BaseField
                    fieldName={`talents.list.${i}.effect`}
                    label={{
                      text: "Эффект",
                      color: "secondary",
                      ...LABEL_STYLES,
                    }}
                    orientation="row"
                    fieldType="text"
                    disabled={true}
                  />
                </TooltipWrapper>
              </Grid>
              <Grid size={{ xs: 4, md: 2 }} order={{ xs: 3, md: 4 }}>
                <BaseField
                  fieldName={`talents.list.${i}.rang`}
                  label={{
                    text: "Ранг",
                    color: "secondary",
                  }}
                  orientation="row"
                  disabled={true}
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

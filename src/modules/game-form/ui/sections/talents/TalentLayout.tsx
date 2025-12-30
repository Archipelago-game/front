import { Box, Grid, IconButton } from "@mui/material";

import { Delete } from "@mui/icons-material";
import BaseField from "../../components/BaseField.tsx";
import TooltipWrapper from "../../../../../common/components/tooltip-wrapper/TooltipWrapper.tsx";

import { buttonDeleteStyles } from "../../../../../common/styles/button-delete-styles.css.ts";

import type { FormType } from "../../../types/form/form.type.ts";
import { type FieldArrayWithId } from "react-hook-form";

const LABEL_STYLES = {
  sx: { width: "4rem" },
};

interface Props {
  fields: FieldArrayWithId<FormType, "talents.list", "id">[];
  onDelete: (index: number, name: string) => void;
}

export default function TalentsView({ fields, onDelete }: Props) {
  return (
    <Grid container gap={2} justifyContent={"flex-end"} mb={1}>
      {fields.map((field, index) => (
        <Box
          key={field.id}
          sx={{
            position: "relative",
            paddingLeft: "25px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -2,
              left: 1,
            }}
          >
            <IconButton
              onClick={() => onDelete(index, field.name)}
              sx={{ padding: 0, margin: "0 auto", ...buttonDeleteStyles }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
          <Grid container key={field.id} wrap={"wrap"}>
            <Grid size={{ xs: 12, md: 8 }}>
              <BaseField
                fieldName={`talents.list.${index}.name`}
                label={{
                  text: "Название",
                  ...LABEL_STYLES,
                }}
                orientation="row"
                fieldType="text"
              />
            </Grid>
            <Grid size={{ xs: 8, md: 4 }}>
              <BaseField
                fieldName={`talents.list.${index}.branch`}
                label={{
                  text: "Ветка",
                  color: "secondary",
                  ...LABEL_STYLES,
                }}
                orientation="row"
                fieldType="text"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 10 }} order={{ xs: 4, md: 3 }}>
              <TooltipWrapper text={field.effect}>
                <BaseField
                  fieldName={`talents.list.${index}.effect`}
                  label={{
                    text: "Эффект",
                    color: "secondary",
                    ...LABEL_STYLES,
                  }}
                  orientation="row"
                  fieldType="text"
                />
              </TooltipWrapper>
            </Grid>
            <Grid size={{ xs: 4, md: 2 }} order={{ xs: 3, md: 4 }}>
              <BaseField
                fieldName={`talents.list.${index}.rang`}
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

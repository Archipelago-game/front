import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import BaseField from "../../components/BaseField.tsx";
import TooltipWrapper from "../../../../../common/components/tooltip-wrapper/TooltipWrapper.tsx";
import { buttonDeleteStyles } from "../../../../../common/styles/button-delete-styles.css.ts";
import type { TalentGroup as TalentGroupType } from "./group-talents-by-branch.utils.ts";

const LABEL_STYLES = {
  sx: { width: "4rem" },
};

interface Props {
  group: TalentGroupType;
  onDelete: (index: number, name: string) => void;
}

export default function TalentGroup({ group, onDelete }: Props) {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Заголовок группы */}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "bold",
          mb: 1,
          pb: 0.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {group.branch}
      </Typography>

      {/* Таланты группы */}
      <Grid container gap={2}>
        {group.talents.map(({ talent, index }) => (
          <Box
            key={talent.id}
            sx={{
              position: "relative",
              paddingLeft: "25px",
              width: "100%",
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
                onClick={() => onDelete(index, talent.name)}
                sx={{ padding: 0, margin: "0 auto", ...buttonDeleteStyles }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
            <Grid container wrap={"wrap"}>
              <Grid size={{ xs: 12, md: 8 }}>
                <BaseField
                  fieldName={`talents.list.${index}.name`}
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
                <TooltipWrapper text={talent.effect}>
                  <BaseField
                    fieldName={`talents.list.${index}.effect`}
                    orientation="row"
                    fieldType="text"
                    multiline={{ isMultiline: true, rows: 5 }}
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
    </Box>
  );
}

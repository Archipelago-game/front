import { Box, Button, Grid, IconButton } from "@mui/material";
import BaseField from "../../components/BaseField.tsx";

import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";

import TooltipWrapper from "../../../../../common/components/tooltip-wrapper/TooltipWrapper.tsx";
import { Delete } from "@mui/icons-material";
import { buttonDeleteStyles } from "../../../../../common/styles/button-delete-styles.css.ts";
import { useConfirmDialogContext } from "../../../../confirm-dialog/use-confirm-dialog.hook.ts";
import { useModal } from "../../../../../app/providers/global-modal/use-modal.hook.ts";
import TalentsGuide from "./TalentsGuide.tsx";
import type { TalentGuideType } from "../../../../../data/talents-guide.ts";

const LABEL_STYLES = {
  sx: { width: "4rem" },
};

export default function Talent() {
  const { methods, values, onChange } = useCustomFormContext();
  const { open } = useConfirmDialogContext();
  const { openModal, closeModal } = useModal();

  const { fields, replace, append, remove } = useFieldArray({
    name: "talents.list",
    control: methods.control,
  });

  const onChoose = (talent: TalentGuideType) => {
    append({
      name: talent.name,
      branch: talent.branch,
      effect: talent.description,
      rang: talent.rang,
    });
    onChange();
    closeModal();
  };

  const content = () => {
    return <TalentsGuide onChoose={onChoose} />;
  };

  const addTalent = () => {
    openModal({
      content,
      title: "Таланты",
    });
  };

  const deleteTalent = (talentIndex: number, talentName: string) => {
    open({
      message: `ты действительно хочешь удалить талант ${talentName}?`,
      onConfirm: () => {
        remove(talentIndex);
        onChange();
      },
    });
  };

  useEffect(() => {
    if (values) {
      replace(values.talents.list);
    }
  }, [values?.talents.list]);

  return (
    <Box width={"fit-content"}>
      <Grid container gap={2} justifyContent={"flex-end"} mb={1}>
        {fields.map((field, i) => (
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
                onClick={() => deleteTalent(i, field.name)}
                sx={{ padding: 0, margin: "0 auto", ...buttonDeleteStyles }}
              >
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

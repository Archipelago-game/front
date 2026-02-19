import {
  Box,
  Divider,
  Collapse,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { buttonDeleteStyles } from "../../../../../common/styles/button-delete-styles.css.ts";
import type { TalentGroup as TalentGroupType } from "./group-talents-by-branch.utils.ts";

import SubTitle from "../../components/section/SubTitle.tsx";
import SubSection from "../../components/section/SubSection.tsx";
import CustomTextField from "../../components/fields/custom-text-field/CustomTextField.tsx";
import { useState } from "react";
import AccordionHeader from "../../components/section/AccordionHeader.tsx";

interface Props {
  group: TalentGroupType;
  onDelete: (index: number, name: string) => void;
}

export default function TalentGroup({ group, onDelete }: Props) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ mb: 3 }} width="100%">
      {/* Заголовок группы */}
      <Box mb={1} sx={{ position: "relative" }}>
        <AccordionHeader onClick={() => setOpen((v) => !v)} isExpanded={open}>
          <SubTitle title={group.branch} />
        </AccordionHeader>
        <Divider sx={{ borderColor: theme.palette.base.accent }} />
      </Box>

      {/* Таланты группы */}

      <Stack rowGap={1} className="no-breake">
        {group.talents.map(({ talent, index }) => (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <SubSection card={{ sx: { paddingTop: "20px" } }}>
              <Box
                sx={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                }}
              >
                <IconButton
                  onClick={() => onDelete(index, talent.name)}
                  sx={{ padding: 0, margin: "0 auto", ...buttonDeleteStyles }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>

              <Stack
                direction="row"
                columnGap={3}
                rowGap="4px"
                mb={1}
                flexWrap="wrap"
              >
                <CustomTextField
                  textField={{
                    fieldName: `talents.list.${index}.name`,
                    fieldType: "text",
                  }}
                  wrapper={{ flexWrap: "wrap", width: "100%" }}
                />

                <CustomTextField
                  title="Ранг"
                  textField={{
                    fieldName: `talents.list.${index}.rang`,
                  }}
                />

                <CustomTextField
                  title="Ветка"
                  textField={{
                    fieldName: `talents.list.${index}.branch`,
                    fieldType: "text",
                  }}
                  wrapper={{ flexGrow: 1 }}
                />
              </Stack>
              <CustomTextField
                textField={{
                  fieldName: `talents.list.${index}.effect`,
                  fieldType: "text",
                  multiline: { isMultiline: true, rows: 5 },
                }}
                wrapper={{ flexGrow: 1 }}
              />
            </SubSection>
          </Collapse>
        ))}
      </Stack>
    </Box>
  );
}

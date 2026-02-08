import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";

import TextFieldController from "../../../components/controllers/TextFieldController.tsx";

import type { BaseSkill } from "../../../../types/form/attributes.type.ts";
import type { FieldPath } from "react-hook-form";
import type { FormType } from "../../../../types/form/form.type.ts";
import { Fragment } from "react";
import OZDisplay from "./OZDisplay.tsx";
import { type AttributeType } from "./OZ-calc.hook.ts";
import { useTheme } from "@mui/material/styles";
import SubTitle from "../../../components/section/SubTitle.tsx";
import CustomTextField from "../../../components/fields/custom-text-field/CustomTextField.tsx";

import CustomTextFieldLabel from "../../../components/fields/custom-text-field/CustomTextFieldLabel.tsx";
import CustomTextFieldWrapper from "../../../components/fields/custom-text-field/CustomTextFieldWrapper.tsx";

export interface SkillItem<T extends string> extends BaseSkill<T> {
  fieldName: FieldPath<FormType>;
}

export interface SkillGroup<T extends string> {
  name: string;

  expertiseFieldName: FieldPath<FormType>;
  OZFieldName: FieldPath<FormType>;
  skills: SkillItem<T>[];
}

interface Props<T extends string> {
  statValueName: FieldPath<FormType>;
  skillGroups: SkillGroup<T>[];
}

// Экс, Фок, О.З.

/**
 * Определяет тип характеристики по имени поля
 * @param statValueName - имя поля характеристики
 * @returns тип характеристики (physical или mental)
 */
function getAttributeType(statValueName: string): AttributeType {
  // Физические характеристики
  if (
    statValueName.includes("strength") ||
    statValueName.includes("dexterity") ||
    statValueName.includes("coordination")
  ) {
    return "physical";
  }

  // Ментальные характеристики
  if (
    statValueName.includes("intelligence") ||
    statValueName.includes("insight") ||
    statValueName.includes("willpower")
  ) {
    return "mental";
  }

  // Дефолт (не должно случиться, но для безопасности)
  return "physical";
}

export default function SkillsTable<T extends string>({
  statValueName,
  skillGroups,
}: Props<T>) {
  const theme = useTheme();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ "& .MuiTableCell-root": { padding: "2px" } }}>
        <TableBody>
          {skillGroups.map((group) => (
            <Fragment key={group.expertiseFieldName}>
              <TableRow key={group.name}>
                <TableCell sx={{ width: "100%" }} colSpan={4}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <SubTitle title={group.name} />
                    <CustomTextField
                      title="Экс"
                      textField={{ fieldName: group.expertiseFieldName }}
                    />
                    <CustomTextFieldWrapper>
                      <CustomTextFieldLabel title="О.З." />
                      <OZDisplay
                        statValueName={statValueName}
                        expertiseFieldName={group.expertiseFieldName}
                        attributeType={getAttributeType(statValueName)}
                      />
                    </CustomTextFieldWrapper>
                  </Stack>
                </TableCell>
              </TableRow>

              {group.skills.map((skill, index) => (
                <TableRow key={skill.id}>
                  {skill.name !== "" && (
                    <TableCell
                      sx={{
                        fontSize: {
                          xs: ".8em", // <600px
                          sm: ".8em",
                          md: "0.8em", // ≥960px
                        },
                      }}
                    >
                      <SubTitle title={skill.name} />
                    </TableCell>
                  )}
                  {skill.name === "" && (
                    <TableCell>
                      {
                        <TextFieldController
                          fieldType="text"
                          fieldName={
                            `stats.intelligence.craft.skills.${skill.id}.name ` as FieldPath<FormType>
                          }
                        />
                      }
                    </TableCell>
                  )}

                  {index === 0 && (
                    <TableCell rowSpan={group.skills.length} align="center">
                      <TextFieldController
                        fieldName={group.expertiseFieldName}
                      />
                    </TableCell>
                  )}

                  <TableCell>
                    <TextFieldController fieldName={skill.fieldName} />
                  </TableCell>

                  {index === 0 && (
                    <TableCell rowSpan={group.skills.length} align="center">
                      <OZDisplay
                        statValueName={statValueName}
                        expertiseFieldName={group.expertiseFieldName}
                        attributeType={getAttributeType(statValueName)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Stack,
} from "@mui/material";

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
import SectionTitle from "../../../components/section/SectionTitle.tsx";
import TextFieldControllerNew from "../../../components/controllers/TextFieldControllerNew.tsx";

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
    <TableContainer>
      {skillGroups.map((group) => (
        <Table
          key={group.expertiseFieldName}
          sx={{ "& .MuiTableCell-root": { padding: "2px" }, marginBottom: 2 }}
        >
          <TableBody>
            <Fragment key={group.expertiseFieldName}>
              <TableRow key={group.name}>
                <TableCell
                  sx={{
                    width: "100%",
                    borderBottomColor: theme.palette.base.outline,
                  }}
                  colSpan={2}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="flex-start"
                    justifyContent="space-between"
                  >
                    <SectionTitle title={group.name} />
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{
                        gap: 1,
                        padding: "4px",
                        borderRadius: "4px",
                        backgroundColor:
                          theme.palette.base.conditions[
                            getAttributeType(statValueName)
                          ].background,
                      }}
                    >
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
                  </Stack>
                </TableCell>
              </TableRow>

              {group.skills.map((skill) => (
                <TableRow key={skill.id}>
                  {skill.name !== "" && (
                    <TableCell
                      sx={{
                        fontSize: {
                          xs: ".8em", // <600px
                          sm: ".8em",
                          md: "0.8em", // ≥960px
                        },
                        borderBottomColor: theme.palette.base.outlineSoft,
                      }}
                    >
                      <SubTitle title={skill.name} />
                    </TableCell>
                  )}
                  {skill.name === "" && (
                    <TableCell>
                      {
                        <TextFieldControllerNew
                          fieldType="text"
                          fieldName={
                            `stats.intelligence.craft.skills.${skill.id}.name ` as FieldPath<FormType>
                          }
                        />
                      }
                    </TableCell>
                  )}

                  <TableCell
                    sx={{
                      width: "1%",
                      whiteSpace: "nowrap",
                      borderBottomColor: theme.palette.base.outlineSoft,
                    }}
                  >
                    <TextFieldControllerNew fieldName={skill.fieldName} />
                  </TableCell>
                </TableRow>
              ))}
            </Fragment>
          </TableBody>
        </Table>
      ))}
    </TableContainer>
  );
}

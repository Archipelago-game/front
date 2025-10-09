import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import TextFieldController from "../../../components/TextFieldController.tsx";
import { theme } from "../../../../../../common/styles/theme/custom-theme.ts";
import type { BaseSkill } from "../../../../types/form/attributes.type.ts";
import type { FieldPath } from "react-hook-form";
import type { FormType } from "../../../../types/form/form.type.ts";

export type SkillListWithField<T extends string> = {
  [K in T]: BaseSkill<T> & { fieldName: FieldPath<FormType> };
};

export interface SkillGroup<T extends string> {
  name: string;
  expertiseFieldName: FieldPath<FormType>;
  OZFieldName: FieldPath<FormType>;
  skills: SkillListWithField<T>[];
}

interface Props<T extends string> {
  skillGroups: SkillGroup<T>[];
}
// todo разораться с key

export default function SkillsTable<T extends string>({
  skillGroups,
}: Props<T>) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: theme.palette.label.background.secondary,
            }}
          >
            <TableCell
              sx={{
                width: "100%",
                color: theme.palette.label.text.secondary,
              }}
            >
              Навык
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.label.text.secondary,
              }}
              align={"center"}
            >
              Экс
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.label.text.secondary,
              }}
              align={"center"}
            >
              Фок
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.label.text.secondary,
              }}
              align={"center"}
            >
              О.З.
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skillGroups.map((group) => (
            <>
              <TableRow key={group.name}>
                <TableCell sx={{ width: "100%" }} colSpan={4}>
                  <strong>{group.name}</strong>
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
                      {skill.name}
                    </TableCell>
                  )}
                  {skill.name === "" && (
                    <TableCell>
                      {
                        // todo типизация fieldName
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
                      <TextFieldController fieldName={group.OZFieldName} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

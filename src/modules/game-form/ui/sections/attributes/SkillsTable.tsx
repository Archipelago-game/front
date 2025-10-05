import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import type { FormNestedKeys } from "../../../types/form-nested-keys.type.ts";

import TextFieldController from "../../components/TextFieldController.tsx";
import { theme } from "../../../../../common/styles/theme/custom-theme.ts";
import type { BaseSkill } from "../../../types/form/attributes.type.ts";

export interface SkillItem extends BaseSkill {
  fieldName: FormNestedKeys;
}

export interface SkillGroup {
  name: string;
  expertiseFieldName: FormNestedKeys;
  OZFieldName: FormNestedKeys;
  skills: SkillItem[];
}

interface Props {
  skillGroups: SkillGroup[];
}
// todo разораться с key
export default function SkillsTable({ skillGroups }: Props) {
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
            >
              Экс
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.label.text.secondary,
              }}
            >
              Фок
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.label.text.secondary,
              }}
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
                  {skill.name !== "" && <TableCell>{skill.name}</TableCell>}
                  {skill.name === "" && (
                    <TableCell>
                      {
                        // todo типизация fieldName
                        <TextFieldController
                          fieldType="text"
                          fieldName={`stats.intelligence.craft.skills.${skill.id}.name`}
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

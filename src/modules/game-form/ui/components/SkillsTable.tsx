import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import type { FormNestedKeys } from "../../types/form-nested-keys.type.ts";

import TextFieldController from "./TextFieldController.tsx";
import { theme } from "../../../../common/styles/theme/custom-theme.ts";

interface SkillItem {
  name: string;
  fieldName: FormNestedKeys;
}

interface SkillGroup {
  name: string;
  experienceFieldName: FormNestedKeys;
  OZFieldName: FormNestedKeys;
  skills: SkillItem[];
}

const traditional: SkillItem[] = [
  { name: "Ближний бой", fieldName: "stats.dexterity.traditional.melee" },
  { name: "Лук", fieldName: "stats.dexterity.traditional.archery" },
  {
    name: "Боевый искусства",
    fieldName: "stats.dexterity.traditional.martialArts",
  },
];

const mobility: SkillItem[] = [
  {
    name: "Акробатика",
    fieldName: "stats.dexterity.mobility.acrobatics",
  },
  {
    name: "Скрытность",
    fieldName: "stats.dexterity.mobility.stealth",
  },
];

const skillGroups: SkillGroup[] = [
  {
    name: "Традиционные",
    experienceFieldName: "stats.dexterity.traditional.experience",
    OZFieldName: "stats.dexterity.traditional.OZ",
    skills: traditional,
  },
  {
    name: "Подвижность",
    experienceFieldName: "stats.dexterity.mobility.experience",
    OZFieldName: "stats.dexterity.mobility.OZ",
    skills: mobility,
  },
];

export default function SkillsTable() {
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
                <TableRow key={skill.name}>
                  <TableCell>{skill.name}</TableCell>
                  {index === 0 && (
                    <TableCell rowSpan={group.skills.length} align="center">
                      <TextFieldController
                        fieldName={group.experienceFieldName}
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

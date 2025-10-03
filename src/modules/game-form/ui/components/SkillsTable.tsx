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
          <TableRow>
            <TableCell sx={{ width: "100%" }}>Навык</TableCell>
            <TableCell>Экс</TableCell>
            <TableCell>Фок</TableCell>
            <TableCell>О.З.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skillGroups.map((group) => (
            <>
              <TableRow key={group.name}>
                <TableCell sx={{ width: "100%" }}>{group.name}</TableCell>
                <TableCell rowSpan={group.skills.length + 1} align="center">
                  {group.experienceFieldName}
                </TableCell>
                <TableCell />
                <TableCell rowSpan={group.skills.length + 1} align="center">
                  {group.OZFieldName}
                </TableCell>
              </TableRow>

              {group.skills.map((skill) => (
                <TableRow key={skill.name}>
                  <TableCell>{skill.name}</TableCell>
                  <TableCell>{skill.fieldName}</TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

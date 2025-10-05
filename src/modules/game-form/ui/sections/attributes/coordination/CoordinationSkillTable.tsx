import SkillsTable, {
  type SkillGroup,
  type SkillItem,
} from "../skill-table/SkillsTable.tsx";

const firearms: SkillItem[] = [
  { name: "Пистолеты", fieldName: "stats.coordination.firearms.pistols" },
  { name: "Аркебузы", fieldName: "stats.coordination.firearms.arquebuses" },
  {
    name: "Царица полей",
    fieldName: "stats.coordination.firearms.fieldsQueen",
  },
];

const seafaring: SkillItem[] = [
  { name: "Рулевой", fieldName: "stats.coordination.seafaring.helmsman" },
  { name: "Боцман", fieldName: "stats.coordination.seafaring.boatswain" },
];

const defense: SkillItem[] = [
  { name: "Парирование", fieldName: "stats.coordination.defense.parry" },
  { name: "Укрытие", fieldName: "stats.coordination.defense.cover" },
];

const coordinationSkillGroups: SkillGroup[] = [
  {
    name: "Огнестрельное",
    expertiseFieldName: "stats.coordination.firearms.expertise",
    OZFieldName: "stats.coordination.firearms.OZ",
    skills: firearms,
  },
  {
    name: "Мореплавание",
    expertiseFieldName: "stats.coordination.seafaring.expertise",
    OZFieldName: "stats.coordination.seafaring.OZ",
    skills: seafaring,
  },
  {
    name: "Защита",
    expertiseFieldName: "stats.coordination.defense.expertise",
    OZFieldName: "stats.coordination.defense.OZ",
    skills: defense,
  },
];

export default function CoordinationSkillTable() {
  return <SkillsTable skillGroups={coordinationSkillGroups} />;
}

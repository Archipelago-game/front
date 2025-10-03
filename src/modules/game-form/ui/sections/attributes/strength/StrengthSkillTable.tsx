import SkillsTable, { type SkillGroup, type SkillItem } from "../SkillsTable";
const endurance: SkillItem[] = [
  { name: "Атлетика", fieldName: "stats.strength.endurance.athletics" },
  { name: "Сопротивление", fieldName: "stats.strength.endurance.resistance" },
];

const strengthSkillGroups: SkillGroup[] = [
  {
    name: "Выносливость",
    expertiseFieldName: "stats.strength.endurance.expertise",
    OZFieldName: "stats.strength.endurance.OZ",
    skills: endurance,
  },
];

export default function StrengthSkillTable() {
  return <SkillsTable skillGroups={strengthSkillGroups} />;
}

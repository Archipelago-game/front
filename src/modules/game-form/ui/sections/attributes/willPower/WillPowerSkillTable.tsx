import SkillsTable, {
  type SkillGroup,
  type SkillItem,
} from "../SkillsTable.tsx";

const discipline: SkillItem[] = [
  { name: "Порядок", fieldName: "stats.willpower.discipline.order" },
  { name: "Навигация", fieldName: "stats.willpower.discipline.navigation" },
  { name: "Вера", fieldName: "stats.willpower.discipline.faith" },
];

const willpowerSkillGroups: SkillGroup[] = [
  {
    name: "Дисциплина",
    expertiseFieldName: "stats.willpower.discipline.expertise",
    OZFieldName: "stats.willpower.discipline.OZ",
    skills: discipline,
  },
];

export default function WillPowerSkillTable() {
  return <SkillsTable skillGroups={willpowerSkillGroups} />;
}

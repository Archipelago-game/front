import SkillsTable, {
  type SkillGroup,
  type SkillItem,
} from "../SkillsTable.tsx";

const social: SkillItem[] = [
  { name: "Убеждение", fieldName: "stats.insight.social.persuasion" },
  { name: "Манипуляция", fieldName: "stats.insight.social.manipulation" },
];

const presence: SkillItem[] = [
  { name: "Командование", fieldName: "stats.insight.presence.leadership" },
  {
    name: "Общение с животными",
    fieldName: "stats.insight.presence.animalHandling",
  },
];

const perception: SkillItem[] = [
  { name: "Наблюдательность", fieldName: "stats.insight.perception.awareness" },
  { name: "Понимание", fieldName: "stats.insight.perception.insight" },
  { name: "Воровство", fieldName: "stats.insight.perception.thievery" },
];

const insightSkillGroups: SkillGroup[] = [
  {
    name: "Социальные",
    expertiseFieldName: "stats.insight.social.expertise",
    OZFieldName: "stats.insight.social.OZ",
    skills: social,
  },
  {
    name: "Присутствие",
    expertiseFieldName: "stats.insight.presence.expertise",
    OZFieldName: "stats.insight.presence.OZ",
    skills: presence,
  },
  {
    name: "Чувства",
    expertiseFieldName: "stats.insight.perception.expertise",
    OZFieldName: "stats.insight.perception.OZ",
    skills: perception,
  },
];

export default function InsightSkillsTable() {
  return <SkillsTable skillGroups={insightSkillGroups} />;
}

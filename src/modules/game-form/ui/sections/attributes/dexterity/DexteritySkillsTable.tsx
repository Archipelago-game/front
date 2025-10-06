import SkillsTable, {
  type SkillGroup,
  type SkillItem,
} from "../skill-table/SkillsTable.tsx";

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
    expertiseFieldName: "stats.dexterity.traditional.expertise",
    OZFieldName: "stats.dexterity.traditional.OZ",
    skills: traditional,
  },
  {
    name: "Подвижность",
    expertiseFieldName: "stats.dexterity.mobility.expertise",
    OZFieldName: "stats.dexterity.mobility.OZ",
    skills: mobility,
  },
];

export default function DexteritySkillsTable() {
  return <SkillsTable skillGroups={skillGroups} />;
}

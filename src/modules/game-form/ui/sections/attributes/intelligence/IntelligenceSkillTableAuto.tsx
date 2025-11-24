import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";

import SkillsTable, { type SkillGroup } from "../skill-table/SkillsTable.tsx";

export default function IntelligenceSkillTableAuto() {
  const { values } = useCustomFormContext();

  if (!values) return null;

  const intelligence = values.stats.intelligence;

  const intelligenceSkillGroups: SkillGroup<string>[] = [
    {
      name: intelligence.craft.name,
      expertiseFieldName: "stats.intelligence.craft.expertise",
      OZFieldName: "stats.intelligence.craft.OZ",
      skills: [
        {
          ...intelligence.craft.skills.craft1,
          fieldName: "stats.intelligence.craft.skills.craft1.focus",
        },
        {
          ...intelligence.craft.skills.craft2,
          fieldName: "stats.intelligence.craft.skills.craft2.focus",
        },
      ],
    },
    {
      name: intelligence.knowledge.name,
      expertiseFieldName: "stats.intelligence.knowledge.expertise",
      OZFieldName: "stats.intelligence.knowledge.OZ",
      skills: [
        {
          ...intelligence.knowledge.skills.civilization,
          fieldName: "stats.intelligence.knowledge.skills.civilization.focus",
        },
        {
          ...intelligence.knowledge.skills.medicine,
          fieldName: "stats.intelligence.knowledge.skills.medicine.focus",
        },
        {
          ...intelligence.knowledge.skills.strategy,
          fieldName: "stats.intelligence.knowledge.skills.strategy.focus",
        },
        {
          ...intelligence.knowledge.skills.nature,
          fieldName: "stats.intelligence.knowledge.skills.nature.focus",
        },
      ],
    },
  ];

  return (
    <SkillsTable
      statValueName={"stats.intelligence.value"}
      skillGroups={intelligenceSkillGroups}
    />
  );
}

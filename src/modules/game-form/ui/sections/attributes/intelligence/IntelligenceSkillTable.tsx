import SkillsTable from "../SkillsTable.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";

export default function IntelligenceSkillTable() {
  const { values } = useCustomFormContext();

  if (!values) {
    return null;
  }

  return (
    <SkillsTable
      skillGroups={[
        {
          name: values.stats.intelligence.craft.name,
          expertiseFieldName: "stats.intelligence.craft.expertise",
          OZFieldName: "stats.intelligence.craft.OZ",
          skills: [
            {
              fieldName: "stats.intelligence.craft.skills.craft1.focus",
              ...values.stats.intelligence.craft.skills.craft1,
            },
            {
              fieldName: "stats.intelligence.craft.skills.craft2.focus",
              ...values.stats.intelligence.craft.skills.craft2,
            },
          ],
        },
        {
          name: values.stats.intelligence.knowledge.name,
          expertiseFieldName: "stats.intelligence.knowledge.expertise",
          OZFieldName: "stats.intelligence.knowledge.OZ",
          skills: [
            {
              fieldName:
                "stats.intelligence.knowledge.skills.civilization.focus",
              ...values.stats.intelligence.knowledge.skills.civilization,
            },
            {
              fieldName: "stats.intelligence.knowledge.skills.medicine.focus",
              ...values.stats.intelligence.knowledge.skills.medicine,
            },
            {
              fieldName: "stats.intelligence.knowledge.skills.strategy.focus",
              ...values.stats.intelligence.knowledge.skills.strategy,
            },
            {
              fieldName: "stats.intelligence.knowledge.skills.nature.focus",
              ...values.stats.intelligence.knowledge.skills.nature,
            },
          ],
        },
      ]}
    />
  );
}

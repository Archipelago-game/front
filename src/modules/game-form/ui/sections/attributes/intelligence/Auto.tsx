import SkillsTable from "../SkillsTable.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";

export default function IntelligenceSkillTableTest() {
  const { values } = useCustomFormContext();

  if (!values) return null;

  const intelligence = values.stats.intelligence;

  // 🔧 Автоматическая сборка SkillGroup[]
  const skillGroups = Object.entries(intelligence)
    // отфильтруем, чтобы не брать base-поля BaseAttribute (name, value)
    .filter(([key]) => key !== "name" && key !== "value")
    .map(([groupKey, group]) => {
      const basePath = `stats.intelligence.${groupKey}`;
      const skills = Object.entries(group.skills).map(([skillKey, skill]) => ({
        fieldName: `${basePath}.skills.${skillKey}.focus`,
        ...skill,
      }));

      return {
        name: group.name,
        expertiseFieldName: `${basePath}.expertise`,
        OZFieldName: `${basePath}.OZ`,
        skills,
      };
    });

  return <SkillsTable skillGroups={skillGroups} />;
}

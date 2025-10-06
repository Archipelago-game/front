import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";

import { buildSkillGroups } from "../skill-table/build-skill-groups.util.ts";
import SkillsTable from "../skill-table/SkillsTable.tsx";

export default function IntelligenceSkillTableAuto() {
  const { values } = useCustomFormContext();

  if (!values) return null;

  const intelligence = values.stats.intelligence;

  const groups = buildSkillGroups(intelligence);

  return <SkillsTable skillGroups={groups} />;
}

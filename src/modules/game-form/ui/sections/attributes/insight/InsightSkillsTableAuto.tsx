import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";

import { buildSkillGroups } from "../skill-table/build-skill-groups.util.ts";
import SkillsTable from "../skill-table/SkillsTable.tsx";

export default function InsightSkillTableAuto() {
  const { values } = useCustomFormContext();

  if (!values) return null;

  const insight = values.stats.insight;

  const groups = buildSkillGroups("insight", insight);

  return <SkillsTable skillGroups={groups} />;
}

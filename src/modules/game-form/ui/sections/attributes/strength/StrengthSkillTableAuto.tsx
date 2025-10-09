import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";

import { buildSkillGroups } from "../skill-table/build-skill-groups.util.ts";
import SkillsTable from "../skill-table/SkillsTable.tsx";

export default function StrengthSkillTableAuto() {
  const { values } = useCustomFormContext();

  if (!values) return null;

  const strength = values.stats.strength;

  const groups = buildSkillGroups("strength", strength);

  return <SkillsTable skillGroups={groups} />;
}

import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";

import { buildSkillGroups } from "../skill-table/build-skill-groups.util.ts";
import SkillsTable from "../skill-table/SkillsTable.tsx";

export default function WillPowerSkillTableAuto() {
  const { values } = useCustomFormContext();

  if (!values) return null;

  const willpower = values.stats.willpower;

  const groups = buildSkillGroups(willpower);

  return <SkillsTable skillGroups={groups} />;
}

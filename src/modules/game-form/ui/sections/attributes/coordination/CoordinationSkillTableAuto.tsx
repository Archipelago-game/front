import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { buildSkillGroups } from "../skill-table/build-skill-groups.util.ts";
import SkillsTable from "../skill-table/SkillsTable.tsx";

export default function CoordinationSkillTableAuto() {
  const { values } = useCustomFormContext();

  if (!values) return null;

  const coordination = values.stats.coordination;

  const groups = buildSkillGroups("coordination", coordination);

  return <SkillsTable skillGroups={groups} />;
}

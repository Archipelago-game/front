import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { buildSkillGroups } from "../skill-table/build-skill-groups.util.ts";
import SkillsTable from "../skill-table/SkillsTable.tsx";

export default function DexteritySkillTableAuto() {
  const { values } = useCustomFormContext();

  if (!values) return null;

  const dexterity = values.stats.dexterity;

  const groups = buildSkillGroups("dexterity", dexterity);

  return <SkillsTable skillGroups={groups} />;
}

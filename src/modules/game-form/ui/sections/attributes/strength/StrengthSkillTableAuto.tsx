import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";

import SkillsTable, { type SkillGroup } from "../skill-table/SkillsTable.tsx";

export default function StrengthSkillTableAuto() {
  const { values } = useCustomFormContext();

  if (!values) return null;

  const strength = values.stats.strength;

  const strengthSkillGroups: SkillGroup<string>[] = [
    {
      name: strength.endurance.name,
      expertiseFieldName: "stats.strength.endurance.expertise",
      OZFieldName: "stats.strength.endurance.OZ",
      skills: [
        {
          ...strength.endurance.skills.athletics,
          fieldName: "stats.strength.endurance.skills.athletics.focus",
        },
        {
          ...strength.endurance.skills.resistance,
          fieldName: "stats.strength.endurance.skills.resistance.focus",
        },
      ],
    },
  ];

  return <SkillsTable skillGroups={strengthSkillGroups} />;
}

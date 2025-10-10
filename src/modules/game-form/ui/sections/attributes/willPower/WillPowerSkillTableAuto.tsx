import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";

import SkillsTable, { type SkillGroup } from "../skill-table/SkillsTable.tsx";

export default function WillPowerSkillTableAuto() {
  const { values } = useCustomFormContext();

  if (!values) return null;

  const willpower = values.stats.willpower;

  const willPowerSkillGroups: SkillGroup<string>[] = [
    {
      name: willpower.discipline.name,
      expertiseFieldName: "stats.willpower.discipline.expertise",
      OZFieldName: "stats.willpower.discipline.OZ",
      skills: [
        {
          ...willpower.discipline.skills.order,
          fieldName: "stats.willpower.discipline.skills.order.focus",
        },
        {
          ...willpower.discipline.skills.navigation,
          fieldName: "stats.willpower.discipline.skills.navigation.focus",
        },
        {
          ...willpower.discipline.skills.faith,
          fieldName: "stats.willpower.discipline.skills.faith.focus",
        },
      ],
    },
  ];

  return <SkillsTable skillGroups={willPowerSkillGroups} />;
}

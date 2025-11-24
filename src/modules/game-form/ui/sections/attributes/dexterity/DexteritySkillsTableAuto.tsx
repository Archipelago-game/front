import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";

import SkillsTable, { type SkillGroup } from "../skill-table/SkillsTable.tsx";

export default function DexteritySkillTableAuto() {
  const { values } = useCustomFormContext();

  if (!values) return null;

  const dexterity = values.stats.dexterity;
  const dexteritySkillGroups: SkillGroup<string>[] = [
    {
      name: dexterity.traditional.name,
      expertiseFieldName: "stats.dexterity.traditional.expertise",
      OZFieldName: "stats.dexterity.traditional.OZ",
      skills: [
        {
          ...dexterity.traditional.skills.melee,
          fieldName: "stats.dexterity.traditional.skills.melee.focus",
        },
        {
          ...dexterity.traditional.skills.archery,
          fieldName: "stats.dexterity.traditional.skills.archery.focus",
        },
        {
          ...dexterity.traditional.skills.martialArts,
          fieldName: "stats.dexterity.traditional.skills.martialArts.focus",
        },
      ],
    },
    {
      name: dexterity.mobility.name,
      expertiseFieldName: "stats.dexterity.mobility.expertise",
      OZFieldName: "stats.dexterity.mobility.OZ",
      skills: [
        {
          ...dexterity.mobility.skills.acrobatics,
          fieldName: "stats.dexterity.mobility.skills.acrobatics.focus",
        },
        {
          ...dexterity.mobility.skills.stealth,
          fieldName: "stats.dexterity.mobility.skills.stealth.focus",
        },
      ],
    },
  ];

  return (
    <SkillsTable
      statValueName={"stats.dexterity.value"}
      skillGroups={dexteritySkillGroups}
    />
  );
}

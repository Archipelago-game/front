import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";

import SkillsTable, { type SkillGroup } from "../skill-table/SkillsTable.tsx";

export default function CoordinationSkillTableAuto() {
  const { values } = useCustomFormContext();

  if (!values) return null;

  const coordination = values.stats.coordination;
  const coordinationSkillGroups: SkillGroup<string>[] = [
    {
      name: coordination.firearms.name,

      expertiseFieldName: "stats.coordination.firearms.expertise",
      OZFieldName: "stats.coordination.firearms.OZ",
      skills: [
        {
          ...coordination.firearms.skills.pistols,
          fieldName: "stats.coordination.firearms.skills.pistols.focus",
        },
        {
          ...coordination.firearms.skills.arquebuses,
          fieldName: "stats.coordination.firearms.skills.arquebuses.focus",
        },
        {
          ...coordination.firearms.skills.fieldsQueen,
          fieldName: "stats.coordination.firearms.skills.fieldsQueen.focus",
        },
      ],
    },
    {
      name: coordination.seafaring.name,
      expertiseFieldName: "stats.coordination.seafaring.expertise",
      OZFieldName: "stats.coordination.seafaring.OZ",
      skills: [
        {
          ...coordination.seafaring.skills.helmsman,
          fieldName: "stats.coordination.seafaring.skills.helmsman.focus",
        },
        {
          ...coordination.seafaring.skills.boatswain,
          fieldName: "stats.coordination.seafaring.skills.boatswain.focus",
        },
      ],
    },
    {
      name: coordination.defense.name,
      expertiseFieldName: "stats.coordination.defense.expertise",
      OZFieldName: "stats.coordination.defense.OZ",
      skills: [
        {
          ...coordination.defense.skills.parry,
          fieldName: "stats.coordination.defense.skills.parry.focus",
        },
        {
          ...coordination.defense.skills.cover,
          fieldName: "stats.coordination.defense.skills.cover.focus",
        },
      ],
    },
  ];

  return (
    <SkillsTable
      statValueName={"stats.coordination.value"}
      skillGroups={coordinationSkillGroups}
    />
  );
}

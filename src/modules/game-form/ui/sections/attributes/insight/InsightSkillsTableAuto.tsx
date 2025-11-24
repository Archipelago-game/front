import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";

import SkillsTable, { type SkillGroup } from "../skill-table/SkillsTable.tsx";

export default function InsightSkillTableAuto() {
  const { values } = useCustomFormContext();

  if (!values) return null;

  const insight = values.stats.insight;

  const insightSkillGroups: SkillGroup<string>[] = [
    {
      name: insight.social.name,
      expertiseFieldName: "stats.insight.social.expertise",
      OZFieldName: "stats.insight.social.OZ",
      skills: [
        {
          ...insight.social.skills.persuasion,
          fieldName: "stats.insight.social.skills.persuasion.focus",
        },
        {
          ...insight.social.skills.manipulation,
          fieldName: "stats.insight.social.skills.manipulation.focus",
        },
      ],
    },
    {
      name: insight.presence.name,
      expertiseFieldName: "stats.insight.presence.expertise",
      OZFieldName: "stats.insight.presence.OZ",
      skills: [
        {
          ...insight.presence.skills.leadership,
          fieldName: "stats.insight.presence.skills.leadership.focus",
        },
        {
          ...insight.presence.skills.animalHandling,
          fieldName: "stats.insight.presence.skills.animalHandling.focus",
        },
      ],
    },
    {
      name: insight.perception.name,
      expertiseFieldName: "stats.insight.perception.expertise",
      OZFieldName: "stats.insight.perception.OZ",
      skills: [
        {
          ...insight.perception.skills.awareness,
          fieldName: "stats.insight.perception.skills.awareness.focus",
        },
        {
          ...insight.perception.skills.insight,
          fieldName: "stats.insight.perception.skills.insight.focus",
        },
        {
          ...insight.perception.skills.thievery,
          fieldName: "stats.insight.perception.skills.thievery.focus",
        },
      ],
    },
  ];

  return (
    <SkillsTable
      statValueName={"stats.insight.value"}
      skillGroups={insightSkillGroups}
    />
  );
}

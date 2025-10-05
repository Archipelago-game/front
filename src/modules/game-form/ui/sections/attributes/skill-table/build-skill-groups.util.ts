import type {
  BaseSkill,
  Stats,
} from "../../../../types/form/attributes.type.ts";

export function buildSkillGroups<T extends keyof Stats>(stat: Stats[T]) {
  return (
    Object.entries(stat)
      // отфильтруем, чтобы не брать base-поля BaseAttribute (name, value)
      .filter(([key]) => key !== "name" && key !== "value")
      .map(([groupKey, group]) => {
        const basePath = `stats.intelligence.${groupKey}`;
        const skills = Object.entries<BaseSkill>(group.skills).map(
          ([skillKey, skill]) => ({
            fieldName: `${basePath}.skills.${skillKey}.focus`,
            ...skill,
          }),
        );

        return {
          name: group.name,
          expertiseFieldName: `${basePath}.expertise`,
          OZFieldName: `${basePath}.OZ`,
          skills,
        };
      })
  );
}

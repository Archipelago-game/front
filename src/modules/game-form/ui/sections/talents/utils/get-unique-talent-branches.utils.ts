import type { TalentGuideType } from "../../../../../../data/talents-guide.ts";

export function getUniqueTalentBranches(talents: TalentGuideType[]) {
  const branches = new Set<string>();
  for (const talent of talents) {
    branches.add(talent.branch);
  }
  return Array.from(branches);
}

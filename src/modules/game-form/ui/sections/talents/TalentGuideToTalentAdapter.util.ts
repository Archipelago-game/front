import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import type { Talent } from "../../../types/form/form.type.ts";

export function adaptTalentGuideToTalent(guide: TalentGuideType): Talent {
  return {
    name: guide.name,
    branch: guide.branch,
    effect: guide.description,
    rang: guide.rang,
  };
}

import type { Talent, Talents } from "../types/form/form.type.ts";

const defaultTalent: Talent = {
  name: "",
  branch: "",
  effect: "",
  rang: 0,
};

export const defaultTalents: Talents = {
  amount: 3,
  list: [defaultTalent, defaultTalent, defaultTalent],
};

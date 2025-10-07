import type { Talent } from "../types/form/form.type.ts";

const defaultTalent = {
  name: "",
  branch: "",
  effect: "",
  rang: 0,
};

export const defaultTalents: Talent[] = [defaultTalent, defaultTalent];

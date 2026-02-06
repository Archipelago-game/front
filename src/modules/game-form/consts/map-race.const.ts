import type { Race } from "../types/form/form.type.ts";
type MapRaceType = Record<Race, string>;
export const mapRace: MapRaceType = {
  human: "человек",
  immortal: "бессмертный",
  cat: "кот",
};

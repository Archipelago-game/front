import type {
  FormType,
  Wound,
} from "../../modules/game-form/types/form/form.type.ts";
import clonedeep from "lodash.clonedeep";
import type { ApplyUtilFunc } from "./migration.type.ts";

export type PatchUtil = Record<string, ApplyUtilFunc<FormType>>;

export const CharacterFormPatch: PatchUtil = {
  threeStatesWound(character: FormType) {
    const newList: Wound[] = character.defence.physical.wounds.list.map(
      (item) =>
        "checked" in item ? { value: item.checked ? "full" : "empty" } : item,
    );
    const characterClone = clonedeep(character);
    characterClone.defence.physical.wounds = { list: newList };
    return characterClone;
  },

  threeStateInjure(character: FormType) {
    const newList: Wound[] = character.defence.mental.injuries.list.map(
      (item) =>
        "checked" in item ? { value: item.checked ? "full" : "empty" } : item,
    );
    const characterClone = clonedeep(character);
    characterClone.defence.mental.injuries = { list: newList };
    return characterClone;
  },

  replaceImmortalWithRace(character: FormType) {
    const characterClone = clonedeep(character);
    characterClone.race = character.immortal ? "immortal" : "human";
    return characterClone;
  },
};

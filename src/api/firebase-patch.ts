import type { FormType } from "../modules/game-form/types/form/form.type.ts";

export const FirebasePatch = {
  threeStatesWoundPatch(character: FormType) {
    for (const wound of character.defence.physical.wounds.list) {
      if (Object.hasOwn(wound, "checked")) {
        const temporaryWound = wound as unknown as { checked: boolean };
        wound.value = temporaryWound.checked ? "full" : "empty";
      }
    }
  },
};

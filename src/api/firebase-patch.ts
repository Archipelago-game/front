import type {
  FormType,
  Wound,
} from "../modules/game-form/types/form/form.type.ts";

export const FirebasePatch = {
  threeStatesWoundPatch(character: FormType, userId: number) {
    const newList: Wound[] = character.defence.physical.wounds.list.map(
      (item) =>
        "checked" in item ? { value: item.checked ? "full" : "empty" } : item,
    );

    character.defence.physical.wounds = { list: newList };
    character._migration.woundsThreeState = {
      migratedAt: Date.now(),
      migratedBy: userId,
    };
  },
};

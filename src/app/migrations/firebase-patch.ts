import type {
  FormType,
  Wound,
} from "../../modules/game-form/types/form/form.type.ts";

export const FirebasePatch = {
  threeStatesWound(character: FormType) {
    const newList: Wound[] = character.defence.physical.wounds.list.map(
      (item) =>
        "checked" in item ? { value: item.checked ? "full" : "empty" } : item,
    );
    character.defence.physical.wounds = { list: newList };
  },
};

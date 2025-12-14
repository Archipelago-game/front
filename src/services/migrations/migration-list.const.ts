import type { MigrationDefinition } from "./migration.type.ts";
import { CharacterFormPatch } from "./character-form-patch.ts";
import type { FormType } from "../../modules/game-form/types/form/form.type.ts";

export const THREE_STATE_WOUND: MigrationDefinition<FormType> = {
  version: 1,
  name: "threeStatesWound",
  apply: (character) => CharacterFormPatch.threeStatesWound(character),
};

export const THREE_STATE_INJURE: MigrationDefinition<FormType> = {
  version: 2,
  name: "threeStateInjure",
  apply: (character) => CharacterFormPatch.threeStateInjure(character),
};

export const CHARACTER_FORM_MIGRATION_LIST: MigrationDefinition<FormType>[] = [
  THREE_STATE_WOUND,
  THREE_STATE_INJURE,
];

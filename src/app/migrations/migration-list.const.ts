import type { MigrationDefinition } from "./migration.type.ts";
import { FirebasePatch } from "./firebase-patch.ts";
import type { FormType } from "../../modules/game-form/types/form/form.type.ts";

export const THREE_STATE_WOUND: MigrationDefinition<FormType> = {
  version: 1,
  name: "threeStatesWound",
  apply: (character) => FirebasePatch.threeStatesWound(character),
};

export const CHARACTER_FORM_MIGRATION_LIST: MigrationDefinition<FormType>[] = [
  THREE_STATE_WOUND,
];

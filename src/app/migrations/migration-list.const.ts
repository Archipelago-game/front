import type { MigrationDefinition } from "./migration.type.ts";
import { FirebasePatch } from "./firebase-patch.ts";

export const THREE_STATE_WOUND: MigrationDefinition = {
  version: 1,
  name: "threeStatesWound",
  apply: (character) => FirebasePatch.threeStatesWound(character),
};

export const MIGRATION_LIST: MigrationDefinition[] = [THREE_STATE_WOUND];

import type { FirebasePatch } from "./firebase-patch.ts";
import type { FormType } from "../../modules/game-form/types/form/form.type.ts";
import type {
  CharacterDocument,
  Meta,
} from "../../api/firebase-characters-service.ts";

export type MigrationKey = keyof typeof FirebasePatch;

export interface MigrationTechnicalInfo {
  name: MigrationKey;
  version: number;
}

export type MigrationDefinition = MigrationTechnicalInfo & {
  apply: (character: FormType) => void;
};

export interface MigrationPersonalInfo {
  migratedAt: number;
  migratedBy: string;
}

export type MigrationInfo = Omit<MigrationDefinition, "apply"> &
  MigrationPersonalInfo;

export interface MigrationState {
  appliedVersion: number;
  list: MigrationInfo[];
}

export function hasMigration(
  c: CharacterDocument,
): c is CharacterDocument & { meta: Meta } {
  return "_migration" in c;
}

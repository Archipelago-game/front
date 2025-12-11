import type { FirebasePatch } from "./firebase-patch.ts";

import type {
  CharacterDocument,
  Meta,
} from "../../api/firebase-characters-service.ts";

export type MigrationKey = keyof typeof FirebasePatch;

export interface MigrationTechnicalInfo {
  name: MigrationKey;
  version: number;
}

export type ApplyUtilFunc<T> = (obj: Readonly<T>) => T;
export interface ApplyUtil<T> {
  apply: ApplyUtilFunc<T>;
}

export type MigrationDefinition<T> = MigrationTechnicalInfo & ApplyUtil<T>;

export interface MigrationPersonalInfo {
  migratedAt: number;
  migratedBy: string;
}

export type MigrationInfo = MigrationTechnicalInfo & MigrationPersonalInfo;

export interface MigrationState {
  appliedVersion: number;
  list: MigrationInfo[];
}

export function hasCharacterFormMigration(
  c: CharacterDocument,
): c is CharacterDocument & { meta: Meta } {
  return (
    c.meta !== undefined &&
    c.meta.characterFormMigration !== undefined &&
    Array.isArray(c.meta.characterFormMigration.list)
  );
}

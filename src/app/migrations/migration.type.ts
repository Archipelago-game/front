import type { FirebasePatch } from "./firebase-patch.ts";
import type { FormType } from "../../modules/game-form/types/form/form.type.ts";

export type MigrationKey = keyof typeof FirebasePatch;

export interface MigrationDefinition {
  name: MigrationKey;
  version: number;
  apply: (character: FormType) => void;
}

export type MigrationTechnicalInfo = Omit<MigrationDefinition, "apply">;

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
  c: FormType,
): c is FormType & { _migration: MigrationState } {
  return "_migration" in c;
}

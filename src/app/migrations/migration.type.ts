import type { FirebasePatch } from "./firebase-patch.ts";

export type MigrationKey = keyof typeof FirebasePatch;

export interface MigrationTechnicalInfo {
  name: MigrationKey;
  version: number;
}
export interface MigrationPersonalInfo {
  migratedAt: number;
  migratedBy: number;
}
export type MigrationItem = MigrationTechnicalInfo & MigrationPersonalInfo;

export interface Migration {
  currentVersion: number;
  list: MigrationItem[];
}

export interface MigrationValue {
  migratedAt: number;
  migratedBy: number;
}

export type MigrationKey = "woundsThreeState";
export type Migration = Record<MigrationKey, MigrationValue>;

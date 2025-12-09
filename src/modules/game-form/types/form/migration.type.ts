export interface MigrationValue {
  migratedAt: number;
  migratedBy: number;
}

export type MigrationKey = "threeStateWound";
export type Migration = Record<MigrationKey, MigrationValue>;

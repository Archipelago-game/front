import type {
  Migration,
  MigrationItem,
  MigrationTechnicalInfo,
} from "./migration.type.ts";
import { MIGRATION_LIST } from "./migration-list.const.ts";
import type { FormType } from "../../modules/game-form/types/form/form.type.ts";
import { FirebasePatch } from "./firebase-patch.ts";

export const MigrationUtils = {
  migrate(userId: number, character: FormType) {
    if (!("_migration" in character)) {
      this.runMigrations(userId, character, MIGRATION_LIST);
      return;
    }

    if (this.isMigrationsUpToDate(character._migration)) {
      return;
    }

    const migrationsToRun = this.getMigrationsToRun(character._migration);
    this.runMigrations(userId, character, migrationsToRun);
  },

  getMigrationsToRun(migration: Migration) {
    const appliedMigration = migration.list[migration.list.length - 1];
    const appliedVersion = appliedMigration.version;
    const appliedMigrationIndex = MIGRATION_LIST.findIndex(
      (migration) => migration.version === appliedVersion,
    );
    return MIGRATION_LIST.slice(appliedMigrationIndex + 1);
  },

  isMigrationsUpToDate(migration: Migration) {
    const actualMigration = this.actualMigrationInfo;
    return migration.currentVersion < actualMigration.version;
  },

  runMigrations(
    userId: number,
    character: FormType,
    migrationList: MigrationTechnicalInfo[],
  ) {
    migrationList.forEach((migration) => {
      FirebasePatch[migration.name](character);
      this.setMigrationInfo(userId, character, migration);
    });
  },

  setMigrationInfo(
    userId: number,
    character: FormType,
    data: MigrationTechnicalInfo,
  ) {
    const migration = this._migrationFactory(userId, data);
    character._migration.list.push(migration);
    character._migration.currentVersion = this.actualMigrationInfo.version;
  },

  get actualMigrationInfo() {
    return MIGRATION_LIST[MIGRATION_LIST.length - 1];
  },

  _migrationFactory(
    userId: number,
    data: MigrationTechnicalInfo,
  ): MigrationItem {
    return {
      migratedAt: Date.now(),
      migratedBy: userId,
      ...data,
    };
  },
};
